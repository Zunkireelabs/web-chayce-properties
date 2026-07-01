const fs = require('fs');
const path = require('path');

// 1. Copy the icon for refurbishment
const imgDir = path.join(__dirname, 'template', 'images');
const sourceIcon = path.join(imgDir, 'wp-content_uploads_2020_03_services-icon08.png');
const targetIcon = path.join(imgDir, 'wp-content_uploads_2020_03_services-icon13.png');

try {
  fs.copyFileSync(sourceIcon, targetIcon);
  console.log('✓ Copied refurbishment icon services-icon13.png');
} catch (err) {
  console.error('Failed to copy icon:', err);
}

// Helper to remove Ltd and update email
function applyGlobalReplacements(content) {
  // Replace joyce@chayceproperties.com with info@chayceproperties.com
  content = content.replace(/joyce@chayceproperties\.com/g, 'info@chayceproperties.com');
  
  // Replace Properties Ltd with Properties (case variants)
  content = content.replace(/Properties\s+Ltd/g, 'Properties');
  content = content.replace(/PROPERTIES\s+LTD/g, 'PROPERTIES');
  content = content.replace(/properties\s+ltd/g, 'properties');
  
  content = content.replace(/Properties(<\/span>|<\/em>)\s*Ltd/g, 'Properties$1');
  content = content.replace(/PROPERTIES(<\/span>|<\/em>)\s*LTD/g, 'PROPERTIES$1');
  content = content.replace(/properties(<\/span>|<\/em>)\s*ltd/g, 'properties$1');
  
  return content;
}

// 2. Modify template/index.html
const indexHtmlPath = path.join(__dirname, 'template', 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Apply Ltd and email replacements
indexHtml = applyGlobalReplacements(indexHtml);

// Remove Section 09 (Our Accreditations)
const accredPattern = /<\/section><section class="content-section"><div class="container"><div class="vc_row wpb_row vc_row-fluid vc_row-o-content-middle vc_row-flex"><div class="wpb_column vc_column_container vc_col-sm-12 vc_col-md-4"><div class="vc_column-inner"><div class="wpb_wrapper"><div class="section-titles[\s\S]*?<\/section>/;
if (accredPattern.test(indexHtml)) {
  indexHtml = indexHtml.replace(accredPattern, '</section>');
  console.log('✓ Removed Accreditations section from homepage');
} else {
  console.log('⚠ Could not find Accreditations section in homepage');
}

// Add Refurbishment to homepage services grid
const lastServicePattern = /(<figcaption>Concierge Support<\/figcaption>[\s\S]*?<\/figure>\s*<\/div><\/div><\/div><\/div>)/;
const refurbishmentCol = `\n<div class="vc_row wpb_row vc_inner vc_row-fluid" style="justify-content: center; display: flex;">\n  <div class="wpb_column vc_column_container vc_col-sm-4 vc_col-md-2 vc_col-xs-6"><div class="vc_column-inner"><div class="wpb_wrapper">\n    <figure class="icon-box wow fadeInUp" data-wow-delay="0s" data-toggle="tooltip" data-placement="top" title="" data-original-title="Professional relocation service by Chayce Properties">\n      <img decoding="async" src="images/wp-content_uploads_2020_03_services-icon13.png" alt="">\n      <figcaption>Refurbishment</figcaption>\n    </figure>\n  </div></div></div>\n</div>`;

if (indexHtml.includes('Refurbishment')) {
  console.log('✓ Refurbishment already exists on homepage');
} else if (lastServicePattern.test(indexHtml)) {
  indexHtml = indexHtml.replace(lastServicePattern, `$1${refurbishmentCol}`);
  console.log('✓ Added Refurbishment to homepage services');
} else {
  console.log('⚠ Could not find Ongoing Concierge / last service block in homepage');
}

fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log('✓ Saved template/index.html');


// 3. Modify generate-pages.js
const genPagesPath = path.join(__dirname, 'generate-pages.js');
let genPages = fs.readFileSync(genPagesPath, 'utf8');

// Apply replacements
genPages = applyGlobalReplacements(genPages);

// Add Refurbishment to Services page array
const servicesArrayStr = `['Ongoing Concierge','Post-move support — we&rsquo;re still here after moving day if you need us.','wp-content_uploads_2020_03_services-icon12.png'],`;
const refurbishmentService = `\n        ['Ongoing Concierge','Post-move support — we&rsquo;re still here after moving day if you need us.','wp-content_uploads_2020_03_services-icon12.png'],\n        ['Refurbishment','Coordination of light repairs, decoration, and home improvements to prepare your property for sale.','wp-content_uploads_2020_03_services-icon13.png'],`;

if (genPages.includes('Refurbishment')) {
  console.log('✓ Refurbishment already exists in generate-pages.js');
} else if (genPages.includes(servicesArrayStr)) {
  genPages = genPages.replace(servicesArrayStr, refurbishmentService);
  console.log('✓ Added Refurbishment to services array in generate-pages.js');
}

// Comment out certificates page generation
const certsGenPattern = /(\/\/ Certificates \/ Accreditations[\s\S]*?buildPage\('certificates'[\s\S]*?\);\n)/;
if (certsGenPattern.test(genPages)) {
  genPages = genPages.replace(certsGenPattern, '/*\n$1*/\n');
  console.log('✓ Commented out certificates page generation in generate-pages.js');
}

fs.writeFileSync(genPagesPath, genPages, 'utf8');
console.log('✓ Saved generate-pages.js');


// 4. Modify full-audit-fix.js
const fullAuditPath = path.join(__dirname, 'full-audit-fix.js');
let fullAudit = fs.readFileSync(fullAuditPath, 'utf8');

// Apply replacements
fullAudit = applyGlobalReplacements(fullAudit);

// Remove certificates from PAGES array
const certsPagePattern = /\s*\{\s*slug:\s*'certificates',[\s\S]*?bg:\s*'chayce-bg\.jpg'\s*\},\s*\n/;
if (certsPagePattern.test(fullAudit)) {
  fullAudit = fullAudit.replace(certsPagePattern, '\n');
  console.log('✓ Removed certificates page definition from full-audit-fix.js');
}

// Add Refurbishment to our-services page in full-audit-fix.js
const lastCardBox = `        <div class="col-lg-4"><div class="card-box"><h4><em>Settling-In</em> Support</h4><p>We unpack, arrange furniture and help you feel at home from the very first day.</p></div></div>`;
const refurbishmentCardBox = `        <div class="col-lg-4"><div class="card-box"><h4><em>Settling-In</em> Support</h4><p>We unpack, arrange furniture and help you feel at home from the very first day.</p></div></div>\n        <div class="col-lg-4"><div class="card-box"><h4><em>Refurbishment</em></h4><p>Coordination of light repairs, decoration, and home improvements to maximize property value.</p></div></div>`;

if (fullAudit.includes('Refurbishment')) {
  console.log('✓ Refurbishment already exists in full-audit-fix.js');
} else if (fullAudit.includes(lastCardBox)) {
  fullAudit = fullAudit.replace(lastCardBox, refurbishmentCardBox);
  console.log('✓ Added Refurbishment card to our-services in full-audit-fix.js');
}

fs.writeFileSync(fullAuditPath, fullAudit, 'utf8');
console.log('✓ Saved full-audit-fix.js');


// 5. Clean up old certificates directory
const certsDir = path.join(__dirname, 'template', 'certificates');
if (fs.existsSync(certsDir)) {
  try {
    fs.rmSync(certsDir, { recursive: true, force: true });
    console.log('✓ Removed old template/certificates directory');
  } catch (err) {
    console.error('Failed to remove template/certificates directory:', err);
  }
}

// 6. Modify SVG logo
const logoSvgPath = path.join(__dirname, 'template', 'images', 'chayce-logo.svg');
if (fs.existsSync(logoSvgPath)) {
  try {
    let logoSvg = fs.readFileSync(logoSvgPath, 'utf8');
    logoSvg = applyGlobalReplacements(logoSvg);
    fs.writeFileSync(logoSvgPath, logoSvg, 'utf8');
    console.log('✓ Saved template/images/chayce-logo.svg');
  } catch (err) {
    console.error('Failed to modify logo SVG:', err);
  }
}
