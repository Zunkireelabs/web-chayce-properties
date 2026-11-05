#!/usr/bin/env node
// Content consistency check for the blog and wording rules in docs/uk-keyword-plan.md.
// Run after `npm run build`:  node scripts/check-content.js
// Exits 1 when a rule is broken, so it can be added to CI later.

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const root = path.join(__dirname, '..');
const problems = [];
const fail = (where, msg) => problems.push(`${where}: ${msg}`);

// 1. Every blog post carries the same GEO / AEO building blocks.
const blogDir = path.join(root, 'src', 'blog');
for (const f of fs.readdirSync(blogDir).filter((n) => n.endsWith('.md'))) {
  const { data, content } = matter(fs.readFileSync(path.join(blogDir, f), 'utf8'));
  const w = `blog/${f}`;
  if (!data.title || data.title.length > 65) fail(w, `title missing or over 65 characters (${(data.title || '').length})`);
  if (!data.description || data.description.length > 160) fail(w, `description missing or over 160 characters (${(data.description || '').length})`);
  if (!data.dateModified) fail(w, 'missing dateModified');
  if (!data.featuredImageAlt) fail(w, 'missing featuredImageAlt');
  if (!(data.about || []).length) fail(w, 'needs at least one "about" entity (Wikipedia URL)');
  if ((data.sources || []).length < 3) fail(w, 'needs at least 3 "sources" (shown as citations on the page)');
  if ((data.faq || []).length < 3) fail(w, 'needs at least 3 FAQ items');
  if (!/^\*\*Short answer:\*\*/m.test(content)) fail(w, 'needs a "**Short answer:**" lead paragraph');
}

// 2. UK wording in the built site (visible text, titles, descriptions, alt text).
// Scripts are skipped: schema.org type names such as "Organization" are fixed US spellings.
const site = path.join(root, '_site');
const banned = [
  [/\bmovers?\b/i, 'use "removals firm / removals team"'],
  [/\bmoving compan(y|ies)\b/i, 'use "removals company"'],
  [/\brealtors?\b/i, 'use "estate agent"'],
  [/\bneighborhoods?\b|\bneighbors?\b/i, 'use UK spelling "neighbourhood / neighbour"'],
  [/\b(organiz|recogniz|prioritiz|personaliz|customiz|minimiz|maximiz|summariz|specializ|emphasiz|authoriz)\w*/i, 'use -ise spelling'],
  [/\blabeled\b|\bcozy\b|\bfavorite\b|\bcolor(s|ed)?\b|\bcenter(s|ed)?\b/i, 'use UK spelling'],
  [/\bseniors\b/i, 'use "older people"'],
];
const walk = (d) => fs.readdirSync(d).flatMap((n) => {
  const p = path.join(d, n);
  if (fs.statSync(p).isDirectory()) return ['images', 'css', 'js', 'fonts', 'videos'].includes(n) ? [] : walk(p);
  return /\.(html|txt|xml)$/.test(n) ? [p] : [];
});
if (fs.existsSync(site)) {
  for (const p of walk(site)) {
    let h = fs.readFileSync(p, 'utf8');
    if (p.endsWith('.html')) h = h.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<(?!meta)[^>]+>/g, ' ');
    h = h.replace(/https?:\/\/\S+/g, ' ');
    for (const [re, hint] of banned) {
      const m = h.match(re);
      if (m) fail('/' + path.relative(site, p), `"${m[0]}" found, ${hint}`);
    }
  }
} else {
  console.log('No _site folder; run `npm run build` first to include the wording check.');
}

if (problems.length) {
  console.log(problems.join('\n'));
  console.log(`\n${problems.length} problem(s) found.`);
  process.exit(1);
}
console.log('Content checks passed.');
