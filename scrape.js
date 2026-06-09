const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

async function downloadFile(fileUrl, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = fileUrl.startsWith('https') ? https : http;
    const req = protocol.get(fileUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlink(dest, () => {});
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
    req.setTimeout(15000, () => { req.abort(); reject(new Error('timeout')); });
  });
}

function sanitizePath(p) {
  return p.replace(/[?#].*$/, '').replace(/[<>:"|*]/g, '_');
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 }
  });

  const outputDir = path.join(__dirname, 'template');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // Step 1: Check ThemeForest page for preview link
  console.log('Checking ThemeForest page...');
  const tfPage = await context.newPage();
  let previewUrl = null;

  try {
    await tfPage.goto('https://themeforest.net/item/hompark-real-estate-luxury-homes/23955202', {
      waitUntil: 'domcontentloaded', timeout: 30000
    });
    await tfPage.waitForTimeout(3000);
    await tfPage.screenshot({ path: 'themeforest-screenshot.png' });

    previewUrl = await tfPage.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]'));
      for (const link of links) {
        const href = link.href;
        const text = (link.textContent || '').toLowerCase();
        if (text.includes('preview') || text.includes('demo') || text.includes('live')) {
          if (!href.includes('themeforest.net/item')) return href;
        }
      }
      // Look for external URLs that might be demos
      for (const link of links) {
        const href = link.href;
        if (href && !href.includes('themeforest.net') && !href.includes('envato') && href.startsWith('http')) {
          return href;
        }
      }
      return null;
    });
    console.log('ThemeForest preview URL found:', previewUrl);
  } catch(e) {
    console.log('ThemeForest page error:', e.message);
  }
  await tfPage.close();

  // Step 2: Try known preview URLs for Hompark
  const candidateUrls = [
    previewUrl,
    'https://preview.themeforest.net/item/hompark-real-estate-luxury-homes/full_screen_preview/23955202',
    'https://hompark.themenewsify.com/',
    'https://hompark.demo.themenewsify.com/',
  ].filter(Boolean);

  console.log('\nCandidate URLs to try:', candidateUrls);

  let successUrl = null;
  let html = null;
  const page = await context.newPage();

  // Collect all network requests
  const assetUrls = new Set();
  page.on('response', async (response) => {
    const resUrl = response.url();
    const contentType = response.headers()['content-type'] || '';
    if (
      contentType.includes('text/css') ||
      contentType.includes('javascript') ||
      contentType.includes('image/') ||
      contentType.includes('font/')
    ) {
      assetUrls.add(resUrl);
    }
  });

  for (const candidateUrl of candidateUrls) {
    try {
      console.log(`\nTrying: ${candidateUrl}`);
      const response = await page.goto(candidateUrl, {
        waitUntil: 'networkidle', timeout: 45000
      });
      if (response && response.status() < 400) {
        await page.waitForTimeout(5000);
        successUrl = candidateUrl;
        html = await page.content();
        await page.screenshot({ path: path.join(outputDir, 'preview.png'), fullPage: true });
        console.log('Success! Got page content.');
        break;
      }
    } catch(e) {
      console.log(`  Failed: ${e.message}`);
    }
  }

  if (!html || !successUrl) {
    console.log('\nCould not access any preview URL.');
    await browser.close();
    return;
  }

  // Step 3: Download all assets
  const baseUrl = new URL(successUrl);

  // Extract all asset URLs from the HTML
  const cssUrls = [...html.matchAll(/href=["']([^"']*\.css[^"']*)/g)].map(m => m[1]);
  const jsUrls = [...html.matchAll(/src=["']([^"']*\.js[^"']*)/g)].map(m => m[1]);
  const imgUrls = [...html.matchAll(/(?:src|data-src|data-lazy-src)=["']([^"']*\.(?:jpg|jpeg|png|gif|webp|svg)[^"']*)/g)].map(m => m[1]);
  const fontUrls = [...assetUrls].filter(u => u.includes('.woff') || u.includes('.ttf') || u.includes('.eot') || u.includes('.otf'));

  console.log(`\nFound: ${cssUrls.length} CSS, ${jsUrls.length} JS, ${imgUrls.length} images, ${fontUrls.length} fonts`);

  // Create dirs
  ['css', 'js', 'images', 'fonts', 'vendor'].forEach(d => {
    const dp = path.join(outputDir, d);
    if (!fs.existsSync(dp)) fs.mkdirSync(dp, { recursive: true });
  });

  let modifiedHtml = html;

  // Download CSS
  for (const cssUrl of [...new Set(cssUrls)]) {
    try {
      const absUrl = new URL(cssUrl, successUrl).href;
      const parsed = new URL(absUrl);
      const filename = path.basename(sanitizePath(parsed.pathname)) || 'style.css';
      const localPath = path.join(outputDir, 'css', filename);
      process.stdout.write(`  CSS: ${filename}... `);
      await downloadFile(absUrl, localPath).then(() => console.log('ok')).catch(e => console.log('failed: ' + e.message));
      modifiedHtml = modifiedHtml.split(cssUrl).join(`css/${filename}`);
    } catch(e) {}
  }

  // Download JS
  for (const jsUrl of [...new Set(jsUrls)]) {
    try {
      const absUrl = new URL(jsUrl, successUrl).href;
      const parsed = new URL(absUrl);
      const filename = path.basename(sanitizePath(parsed.pathname)) || 'script.js';
      const localPath = path.join(outputDir, 'js', filename);
      process.stdout.write(`  JS: ${filename}... `);
      await downloadFile(absUrl, localPath).then(() => console.log('ok')).catch(e => console.log('failed: ' + e.message));
      modifiedHtml = modifiedHtml.split(jsUrl).join(`js/${filename}`);
    } catch(e) {}
  }

  // Download images
  for (const imgUrl of [...new Set(imgUrls)]) {
    try {
      if (imgUrl.startsWith('data:')) continue;
      const absUrl = new URL(imgUrl, successUrl).href;
      const parsed = new URL(absUrl);
      const filename = path.basename(sanitizePath(parsed.pathname)) || 'image.jpg';
      const localPath = path.join(outputDir, 'images', filename);
      process.stdout.write(`  IMG: ${filename}... `);
      await downloadFile(absUrl, localPath).then(() => console.log('ok')).catch(e => console.log('failed: ' + e.message));
      modifiedHtml = modifiedHtml.split(imgUrl).join(`images/${filename}`);
    } catch(e) {}
  }

  // Download fonts
  for (const fontUrl of [...new Set(fontUrls)]) {
    try {
      const absUrl = new URL(fontUrl, successUrl).href;
      const parsed = new URL(absUrl);
      const filename = path.basename(sanitizePath(parsed.pathname));
      const localPath = path.join(outputDir, 'fonts', filename);
      process.stdout.write(`  Font: ${filename}... `);
      await downloadFile(absUrl, localPath).then(() => console.log('ok')).catch(e => console.log('failed: ' + e.message));
      modifiedHtml = modifiedHtml.split(fontUrl).join(`fonts/${filename}`);
    } catch(e) {}
  }

  // Save final HTML
  fs.writeFileSync(path.join(outputDir, 'index.html'), modifiedHtml);
  console.log('\nDone! Files saved to ./template/');
  console.log('Run: node server.js to start on port 3000');

  await browser.close();
}

main().catch(console.error);
