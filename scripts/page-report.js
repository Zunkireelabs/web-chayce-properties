#!/usr/bin/env node
// Client-facing page health report. Checks only real pages listed in the
// live sitemap (never junk URLs like /?h=...) and writes docs/page-report.md.
// Usage: node scripts/page-report.js [origin]   (default https://chayceproperties.com)

const fs = require('fs');
const path = require('path');

const ORIGIN = (process.argv[2] || 'https://chayceproperties.com').replace(/\/$/, '');
const OUT = path.join(__dirname, '..', 'docs', 'page-report.md');

const pick = (re, s) => (s.match(re) || [])[1];

async function checkPage(url) {
  const res = await fetch(url, { redirect: 'manual' });
  const html = res.status === 200 ? await res.text() : '';
  const issues = [];

  if (res.status !== 200) issues.push(`Returns HTTP ${res.status}`);
  if (html) {
    const title = pick(/<title[^>]*>([^<]*)<\/title>/i, html) || '';
    const desc = pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i, html) || '';
    const canonical = pick(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i, html);
    const h1s = (html.match(/<h1[\s>]/gi) || []).length;
    const noindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
    const schema = /application\/ld\+json/i.test(html);
    const noAlt = (html.match(/<img\b(?![^>]*\balt=)[^>]*>/gi) || []).length;

    if (!title) issues.push('Missing title');
    else if (title.length > 65) issues.push(`Title too long (${title.length} chars)`);
    if (!desc) issues.push('Missing meta description');
    else if (desc.length > 160) issues.push(`Meta description too long (${desc.length} chars)`);
    if (!canonical) issues.push('Missing canonical tag');
    else if (canonical.replace(/\/$/, '') !== url.replace(/\/$/, '')) issues.push(`Canonical points elsewhere (${canonical})`);
    if (h1s !== 1) issues.push(`${h1s} H1 headings (should be 1)`);
    if (noindex) issues.push('Page is set to noindex');
    if (!schema) issues.push('No structured data (JSON-LD)');
    if (noAlt) issues.push(`${noAlt} image(s) without alt text`);
  }
  return { url, status: res.status, issues };
}

(async () => {
  const sitemap = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const results = [];
  for (const u of urls) results.push(await checkPage(u));

  const bad = results.filter((r) => r.issues.length);
  const today = new Date().toISOString().slice(0, 10);
  let md = `# Page health report\n\nSite: ${ORIGIN}  \nChecked: ${today}  \nScope: the ${results.length} pages listed in the sitemap. Junk or parameter URLs are not counted.\n\n`;
  md += `**${results.length - bad.length} of ${results.length} pages pass every check.** ${bad.length ? `${bad.length} need attention:` : 'Nothing needs attention.'}\n\n`;
  if (bad.length) {
    md += '| Page | Issue |\n|---|---|\n';
    for (const r of bad) for (const i of r.issues) md += `| ${r.url.replace(ORIGIN, '') || '/'} | ${i} |\n`;
  }
  md += '\n## Checks run per page\nHTTP 200, title, meta description, canonical, single H1, indexable, structured data, image alt text.\n';

  fs.writeFileSync(OUT, md);
  console.log(md);
})();
