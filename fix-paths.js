const fs = require('fs');
const path = require('path');

const TEMPLATE_DIR = path.join(__dirname, 'template');
const BASE_ORIGIN = 'http://hompark.themezinho.net';

function fixContent(content, fileRelativeToTemplate, fileType) {
  // Determine path prefix to get back to template root
  const depth = fileRelativeToTemplate.split('/').length - 1;
  const prefix = '../'.repeat(depth);

  // Replace absolute origin URLs
  content = content
    .replace(new RegExp(BASE_ORIGIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '/', 'g'), prefix || './')
    .replace(/https:\/\/hompark\.themezinho\.net\//g, prefix || './')
    .replace(/http:\/\/hompark\.themezinho\.net\//g, prefix || './');

  // Fix url() references in CSS that still point to wp-content
  if (fileType === 'css') {
    // Find all url(...) occurrences and check if they reference local files
    content = content.replace(/url\(['"]?((?:\.\.\/)*wp-[^'")\s]+|(?:\.\.\/)*fonts\/[^'")\s]+)['"]?\)/g, (match, p1) => {
      return `url('${p1}')`;
    });

    // Remaining absolute wp-content URLs
    content = content.replace(/url\(['"]?(?:https?:\/\/hompark\.themezinho\.net)?\/wp-content\/themes\/hompark\/fonts\/([^'")\s]+)['"]?\)/g,
      (match, p1) => `url('../fonts/${path.basename(p1)}')`
    );
    content = content.replace(/url\(['"]?(?:https?:\/\/hompark\.themezinho\.net)?\/wp-content\/themes\/hompark\/images\/([^'")\s]+)['"]?\)/g,
      (match, p1) => `url('../images/${path.basename(p1)}')`
    );
    content = content.replace(/url\(['"]?(?:https?:\/\/hompark\.themezinho\.net)?\/wp-content\/uploads\/[^/]+\/([^'")\s]+)['"]?\)/g,
      (match, p1) => `url('../images/${path.basename(p1)}')`
    );
  }

  return content;
}

// Fix CSS files
const cssDir = path.join(TEMPLATE_DIR, 'css');
for (const file of fs.readdirSync(cssDir)) {
  if (!file.endsWith('.css')) continue;
  const filePath = path.join(cssDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  content = fixContent(content, `css/${file}`, 'css');
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed CSS: ${file}`);
  }
}

// Fix HTML
const htmlPath = path.join(TEMPLATE_DIR, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Fix any remaining wp-content paths that weren't caught
html = html
  .replace(/["']https?:\/\/hompark\.themezinho\.net\/wp-content\/uploads\/\d+\/\d+\/([^'"]+)['"]/g,
    (match, p1) => `"images/${path.basename(p1)}"`)
  .replace(/["']https?:\/\/hompark\.themezinho\.net\/wp-content\/themes\/hompark\/images\/([^'"]+)['"]/g,
    (match, p1) => `"images/${path.basename(p1)}"`)
  .replace(/["']https?:\/\/hompark\.themezinho\.net\/wp-content\/themes\/hompark\/fonts\/([^'"]+)['"]/g,
    (match, p1) => `"fonts/${path.basename(p1)}"`)
  .replace(/https?:\/\/hompark\.themezinho\.net\//g, '');

// Remove WordPress admin bar
html = html.replace(/<div[^>]*id=["']wpadminbar["'][^>]*>[\s\S]*?<\/div>/g, '');

// Remove WordPress-specific scripts (nonces, ajaxurl, etc.)
html = html.replace(/<script[^>]*>[\s\S]*?var _wpcf7[\s\S]*?<\/script>/g, '');

fs.writeFileSync(htmlPath, html);
console.log('Fixed index.html');

console.log('\nAll paths fixed. Run: node server.js');
