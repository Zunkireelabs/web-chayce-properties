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
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Referer': 'https://hompark.themenewsify.com/'
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
        file.close();
        fs.unlink(dest, () => {});
        const redirectUrl = response.headers.location;
        if (redirectUrl && redirectUrl !== fileUrl) {
          return downloadFile(redirectUrl.startsWith('http') ? redirectUrl : new URL(redirectUrl, fileUrl).href, dest).then(resolve).catch(reject);
        }
        return reject(new Error('redirect loop'));
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
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function sanitizeName(urlStr) {
  try {
    const u = new URL(urlStr);
    let p = u.pathname;
    p = p.replace(/[?#].*$/, '');
    const parts = p.split('/').filter(Boolean);
    if (parts.length === 0) return 'index';
    const last = parts[parts.length - 1];
    return last.replace(/[<>:"|*\\]/g, '_').slice(0, 100);
  } catch(e) {
    return 'asset_' + Date.now();
  }
}

async function scrapeSite(browser, siteUrl, outputDir) {
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true
  });

  const page = await context.newPage();

  // Intercept and collect all asset URLs
  const cssFiles = new Map(); // url -> filename
  const jsFiles = new Map();
  const imageFiles = new Map();
  const fontFiles = new Map();
  const otherFiles = new Map();

  page.on('response', async (response) => {
    const resUrl = response.url();
    if (resUrl.startsWith('data:') || resUrl.startsWith('blob:')) return;
    const ct = response.headers()['content-type'] || '';
    const status = response.status();
    if (status >= 400) return;

    if (ct.includes('text/css') || resUrl.match(/\.css(\?|$)/)) {
      const name = sanitizeName(resUrl);
      cssFiles.set(resUrl, name.endsWith('.css') ? name : name + '.css');
    } else if (ct.includes('javascript') || resUrl.match(/\.js(\?|$)/)) {
      const name = sanitizeName(resUrl);
      jsFiles.set(resUrl, name.endsWith('.js') ? name : name + '.js');
    } else if (ct.includes('image/') || resUrl.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)(\?|$)/i)) {
      const name = sanitizeName(resUrl);
      imageFiles.set(resUrl, name);
    } else if (ct.includes('font/') || resUrl.match(/\.(woff2?|ttf|eot|otf)(\?|$)/i)) {
      const name = sanitizeName(resUrl);
      fontFiles.set(resUrl, name.endsWith('.woff2') || name.endsWith('.woff') || name.endsWith('.ttf') || name.endsWith('.eot') ? name : name + '.woff2');
    }
  });

  console.log(`Navigating to: ${siteUrl}`);
  const response = await page.goto(siteUrl, {
    waitUntil: 'networkidle',
    timeout: 60000
  });

  if (!response || response.status() >= 400) {
    console.log(`Failed to load: ${response?.status()}`);
    await context.close();
    return false;
  }

  console.log(`Page loaded: ${response.status()}`);

  // Scroll to trigger lazy loading
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2000);

  // Screenshot
  await page.screenshot({ path: path.join(outputDir, 'preview.png'), fullPage: true });
  console.log('Screenshot saved');

  // Get HTML
  let html = await page.content();
  console.log(`HTML size: ${html.length} chars`);

  await context.close();

  // Create directories
  const dirs = { css: cssFiles, js: jsFiles, images: imageFiles, fonts: fontFiles, other: otherFiles };
  for (const dir of Object.keys(dirs)) {
    const dp = path.join(outputDir, dir);
    if (!fs.existsSync(dp)) fs.mkdirSync(dp, { recursive: true });
  }

  console.log(`\nCollected assets: ${cssFiles.size} CSS, ${jsFiles.size} JS, ${imageFiles.size} images, ${fontFiles.size} fonts`);

  // Download all assets
  async function downloadAll(fileMap, subDir) {
    for (const [fileUrl, filename] of fileMap.entries()) {
      const localPath = path.join(outputDir, subDir, filename);
      process.stdout.write(`  [${subDir}] ${filename}... `);
      try {
        await downloadFile(fileUrl, localPath);
        console.log('ok');
        // Replace in HTML
        html = html.split(fileUrl).join(`${subDir}/${filename}`);
        // Also replace relative paths
        try {
          const parsed = new URL(fileUrl);
          const relativePath = parsed.pathname + parsed.search;
          html = html.split(relativePath).join(`${subDir}/${filename}`);
          html = html.split(parsed.pathname).join(`${subDir}/${filename}`);
        } catch(e) {}
      } catch(e) {
        console.log(`FAILED: ${e.message}`);
      }
    }
  }

  await downloadAll(cssFiles, 'css');
  await downloadAll(jsFiles, 'js');
  await downloadAll(imageFiles, 'images');
  await downloadAll(fontFiles, 'fonts');

  // Fix remaining absolute URLs to the origin
  try {
    const baseOrigin = new URL(siteUrl).origin;
    html = html.split(`href="${baseOrigin}/`).join('href="');
    html = html.split(`src="${baseOrigin}/`).join('src="');
    html = html.split(`href='${baseOrigin}/`).join("href='");
    html = html.split(`src='${baseOrigin}/`).join("src='");
  } catch(e) {}

  // Remove <base> tags that would break local paths
  html = html.replace(/<base[^>]*>/gi, '');

  fs.writeFileSync(path.join(outputDir, 'index.html'), html);
  console.log('\nSaved index.html');
  return true;
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  const outputDir = path.join(__dirname, 'template');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // Try multiple known demo URLs for Hompark Real Estate template
  const urls = [
    'https://preview.themeforest.net/item/hompark-real-estate-luxury-homes/full_screen_preview/23955202',
    'https://hompark.themenewsify.com/',
    'https://hompark.demo.themenewsify.com/',
    'https://bdevs.net/wp/hompark/',
    'https://hompark.bdevs.net/',
  ];

  let success = false;
  for (const siteUrl of urls) {
    try {
      console.log('\n' + '='.repeat(60));
      console.log(`Trying: ${siteUrl}`);
      const result = await scrapeSite(browser, siteUrl, outputDir);
      if (result) {
        success = true;
        console.log(`\nSuccessfully scraped: ${siteUrl}`);
        break;
      }
    } catch(e) {
      console.log(`Error with ${siteUrl}: ${e.message}`);
    }
  }

  await browser.close();

  if (success) {
    console.log('\nTemplate scraped successfully!');
    console.log('Files saved to ./template/');
    console.log('Check ./template/preview.png for a screenshot');
  } else {
    console.log('\nAll URLs failed. The template may require authentication or login.');
  }
}

main().catch(console.error);
