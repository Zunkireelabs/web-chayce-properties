const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE_URL = 'http://hompark.themezinho.net/';
const OUTPUT_DIR = path.join(__dirname, 'template');

async function downloadFile(fileUrl, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = fileUrl.startsWith('https') ? https : http;
    const req = protocol.get(fileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': BASE_URL
      }
    }, (response) => {
      if ([301, 302, 307, 308].includes(response.statusCode)) {
        file.close();
        fs.unlink(dest, () => {});
        const loc = response.headers.location;
        if (!loc || loc === fileUrl) return reject(new Error('redirect loop'));
        const next = loc.startsWith('http') ? loc : new URL(loc, fileUrl).href;
        return downloadFile(next, dest).then(resolve).catch(reject);
      }
      if (response.statusCode >= 400) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`HTTP ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      file.close();
      try { fs.unlink(dest, () => {}); } catch(e) {}
      reject(err);
    });
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function getExt(urlStr, contentType) {
  const u = new URL(urlStr);
  const p = u.pathname;
  const ext = path.extname(p).toLowerCase();
  if (ext) return ext;
  if (contentType.includes('text/css')) return '.css';
  if (contentType.includes('javascript')) return '.js';
  if (contentType.includes('image/png')) return '.png';
  if (contentType.includes('image/jpeg')) return '.jpg';
  if (contentType.includes('image/svg')) return '.svg';
  if (contentType.includes('image/webp')) return '.webp';
  if (contentType.includes('font/woff2')) return '.woff2';
  if (contentType.includes('font/woff')) return '.woff';
  return '';
}

function safeFilename(urlStr) {
  try {
    const u = new URL(urlStr);
    let p = u.pathname.replace(/^\//, '').replace(/\//g, '_');
    if (!p || p === '_') p = 'file';
    return p.replace(/[<>:"|*?\\]/g, '_').slice(0, 120);
  } catch(e) {
    return 'file_' + Math.abs(urlStr.hashCode?.() || Date.now());
  }
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  ['css', 'js', 'images', 'fonts', 'vendor'].forEach(d => {
    const dp = path.join(OUTPUT_DIR, d);
    if (!fs.existsSync(dp)) fs.mkdirSync(dp, { recursive: true });
  });

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true
  });

  const page = await context.newPage();

  // Track all network responses
  const cssMap = new Map();
  const jsMap = new Map();
  const imgMap = new Map();
  const fontMap = new Map();

  page.on('response', (response) => {
    const resUrl = response.url();
    if (resUrl.startsWith('data:') || resUrl.startsWith('blob:')) return;
    const ct = response.headers()['content-type'] || '';
    const status = response.status();
    if (status >= 400) return;

    const ext = getExt(resUrl, ct).toLowerCase();
    const name = safeFilename(resUrl);

    if (ct.includes('text/css') || ext === '.css') {
      cssMap.set(resUrl, name.endsWith('.css') ? name : name + '.css');
    } else if (ct.includes('javascript') || ext === '.js') {
      jsMap.set(resUrl, name.endsWith('.js') ? name : name + '.js');
    } else if (ct.includes('image/') || ['.jpg','.jpeg','.png','.gif','.webp','.svg','.ico'].includes(ext)) {
      imgMap.set(resUrl, name);
    } else if (ct.includes('font/') || ['.woff2','.woff','.ttf','.eot','.otf'].includes(ext)) {
      fontMap.set(resUrl, name);
    }
  });

  console.log(`Loading: ${BASE_URL}`);
  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  } catch(e) {
    console.log('First load attempt result:', e.message);
    // Try with domcontentloaded
    try {
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch(e2) {
      console.log('Second load attempt failed:', e2.message);
    }
  }

  await page.waitForTimeout(5000);

  // Scroll down slowly to trigger lazy loading
  console.log('Scrolling to trigger lazy images...');
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let y = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 150);
    });
  });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  // Take screenshot
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'preview.png'), fullPage: true });
  console.log('Screenshot saved to template/preview.png');

  let html = await page.content();
  console.log(`HTML: ${Math.round(html.length/1024)}KB, CSS: ${cssMap.size}, JS: ${jsMap.size}, Images: ${imgMap.size}, Fonts: ${fontMap.size}`);

  await context.close();
  await browser.close();

  // Download everything
  async function downloadMap(map, subDir, label) {
    let ok = 0, fail = 0;
    for (const [fileUrl, filename] of map.entries()) {
      const dest = path.join(OUTPUT_DIR, subDir, filename);
      process.stdout.write(`  [${label}] ${filename.slice(0, 50)}... `);
      try {
        await downloadFile(fileUrl, dest);
        console.log('ok');
        ok++;
        // Replace absolute URLs in HTML
        html = html.split(fileUrl).join(`${subDir}/${filename}`);
        // Also replace just the path
        try {
          const u = new URL(fileUrl);
          if (u.origin === new URL(BASE_URL).origin) {
            html = html.split(`"${u.pathname}"`).join(`"${subDir}/${filename}"`);
            html = html.split(`'${u.pathname}'`).join(`'${subDir}/${filename}'`);
          }
        } catch(e) {}
      } catch(e) {
        console.log(`FAIL: ${e.message}`);
        fail++;
      }
    }
    console.log(`  ${label}: ${ok} ok, ${fail} failed`);
  }

  console.log('\nDownloading assets...');
  await downloadMap(cssMap, 'css', 'CSS');
  await downloadMap(jsMap, 'js', 'JS');
  await downloadMap(imgMap, 'images', 'IMG');
  await downloadMap(fontMap, 'fonts', 'Font');

  // Clean up absolute URLs pointing to the base origin
  try {
    const origin = new URL(BASE_URL).origin;
    html = html
      .replace(new RegExp(`(href|src)="${origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/`, 'g'), '$1="')
      .replace(new RegExp(`(href|src)='${origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/`, 'g'), "$1='")
      .replace(/<base[^>]*>/gi, '');
  } catch(e) {}

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), html);
  console.log('\nSaved template/index.html');
  console.log('Done! Run: node server.js');
}

main().catch(console.error);
