// Fails if any built page scrolls sideways at common phone widths.
// Usage: npm run build && npm run check:mobile
import fs from 'fs';
import http from 'http';
import path from 'path';
import { chromium } from 'playwright';

const root = path.resolve('_site');
const widths = [320, 360, 390, 430];
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };

const pages = [];
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name === 'index.html') pages.push('/' + path.relative(root, path.dirname(p)).replace(/\\/g, '/') + '/');
  }
})(root);

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(root, p);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const base = `http://localhost:${server.address().port}`;

const browser = await chromium.launch();
const problems = [];
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  for (const u of pages) {
    await page.goto(base + (u === '//' ? '/' : u), { waitUntil: 'load' }).catch(() => {});
    const r = await page.evaluate((w) => ({
      over: document.documentElement.scrollWidth - w,
      viewport: !!document.querySelector('meta[name=viewport]'),
    }), w);
    if (r.over > 1) problems.push(`${u} at ${w}px: ${r.over}px too wide`);
    if (!r.viewport) problems.push(`${u}: missing viewport meta tag`);
  }
  await ctx.close();
}
await browser.close();
server.close();
console.log(`${pages.length} pages x ${widths.length} widths checked`);
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('Mobile check passed: no horizontal overflow.');
