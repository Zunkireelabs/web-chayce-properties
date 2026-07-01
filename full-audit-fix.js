const fs   = require('fs');
const path = require('path');
const TMPL = path.join(__dirname, 'template');

// ── 1. NEW LOGO SVG ────────────────────────────────────────────────────────────
// Dark circular heraldic emblem + "CHAYCE / PROPERTIES" wordmark
const logoSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="290" height="72" viewBox="0 0 290 72">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#2e2b24"/>
      <stop offset="100%" stop-color="#14120e"/>
    </radialGradient>
  </defs>

  <!-- ── Emblem circle ── -->
  <circle cx="36" cy="36" r="34" fill="url(#bgGrad)"/>
  <!-- outer gold ring -->
  <circle cx="36" cy="36" r="33.5" fill="none" stroke="#c8a96e" stroke-width="1.2"/>
  <!-- inner ring -->
  <circle cx="36" cy="36" r="28" fill="none" stroke="#c8a96e" stroke-width="0.5" opacity="0.45"/>

  <!-- ── Left laurel branch (leaves radiating from bottom-left up to top-left) ── -->
  <g transform="translate(36,36)">
    <line x1="-14" y1="18" x2="-22" y2="-17" stroke="#c8a96e" stroke-width="0.9"/>
    <!-- 7 leaves, spaced up the stem -->
    <ellipse rx="5.5" ry="2"  fill="#c8a96e" transform="translate(-15, 18) rotate(-40)"/>
    <ellipse rx="5.5" ry="2"  fill="#c8a96e" transform="translate(-19, 13) rotate(-52)"/>
    <ellipse rx="5.5" ry="2"  fill="#c8a96e" transform="translate(-22,  7) rotate(-68)"/>
    <ellipse rx="5.5" ry="2"  fill="#c8a96e" transform="translate(-23,  1) rotate(-88)"/>
    <ellipse rx="5.5" ry="2"  fill="#c8a96e" transform="translate(-22, -6) rotate(-108)"/>
    <ellipse rx="5.5" ry="2"  fill="#c8a96e" transform="translate(-19,-12) rotate(-124)"/>
    <ellipse rx="5.5" ry="2"  fill="#c8a96e" transform="translate(-14,-18) rotate(-140)"/>
    <!-- small tip leaf -->
    <ellipse rx="4"   ry="1.5" fill="#c8a96e" transform="translate(-10,-22) rotate(-155)"/>
  </g>

  <!-- ── Right laurel branch (mirror) ── -->
  <g transform="translate(36,36)">
    <line x1="14" y1="18" x2="22" y2="-17" stroke="#c8a96e" stroke-width="0.9"/>
    <ellipse rx="5.5" ry="2"  fill="#c8a96e" transform="translate( 15, 18) rotate( 40)"/>
    <ellipse rx="5.5" ry="2"  fill="#c8a96e" transform="translate( 19, 13) rotate( 52)"/>
    <ellipse rx="5.5" ry="2"  fill="#c8a96e" transform="translate( 22,  7) rotate( 68)"/>
    <ellipse rx="5.5" ry="2"  fill="#c8a96e" transform="translate( 23,  1) rotate( 88)"/>
    <ellipse rx="5.5" ry="2"  fill="#c8a96e" transform="translate( 22, -6) rotate(108)"/>
    <ellipse rx="5.5" ry="2"  fill="#c8a96e" transform="translate( 19,-12) rotate(124)"/>
    <ellipse rx="5.5" ry="2"  fill="#c8a96e" transform="translate( 14,-18) rotate(140)"/>
    <ellipse rx="4"   ry="1.5" fill="#c8a96e" transform="translate( 10,-22) rotate(155)"/>
  </g>

  <!-- ── Central "C" monogram ── -->
  <!-- shadow/depth -->
  <text x="37.5" y="48.5" font-family="Georgia,'Times New Roman',serif"
        font-size="36" font-weight="700" fill="#0a0906" text-anchor="middle" opacity="0.6">C</text>
  <!-- main letter -->
  <text x="36" y="47" font-family="Georgia,'Times New Roman',serif"
        font-size="36" font-weight="700" fill="#c8a96e" text-anchor="middle">C</text>

  <!-- ── Wordmark: CHAYCE ── -->
  <text x="80" y="31" font-family="Georgia,'Times New Roman',serif"
        font-size="25" font-weight="700" fill="#ffffff" letter-spacing="5">CHAYCE</text>
  <!-- gold rule -->
  <line x1="80" y1="37" x2="288" y2="37" stroke="#c8a96e" stroke-width="0.8"/>
  <!-- sub-text -->
  <text x="80" y="52" font-family="Georgia,'Times New Roman',serif"
        font-size="10.5" font-weight="400" fill="#c8a96e" letter-spacing="5.5">PROPERTIES</text>
</svg>`;

fs.writeFileSync(path.join(TMPL, 'images', 'chayce-logo.svg'), logoSVG);
console.log('✓ Logo SVG updated');

// ── 2. HELPER: strip HTML tags (for use in <title>) ───────────────────────────
function stripTags(s) { return s.replace(/<[^>]+>/g, ''); }

// ── 3. FIX HOMEPAGE (index.html) ──────────────────────────────────────────────
let home = fs.readFileSync(path.join(TMPL, 'index.html'), 'utf8');

// Remove /index.html from ALL internal href links (keep mailto/tel/http/# untouched)
home = home.replace(/href="([^"#?:]+)\/index\.html"/g, 'href="$1/"');
// Root-level "index.html" → "/"
home = home.replace(/href="index\.html"/g, 'href="/"');

fs.writeFileSync(path.join(TMPL, 'index.html'), home);
console.log('✓ Homepage links cleaned');

// ── 4. FIX generate-pages.js ──────────────────────────────────────────────────
// Update navbar() and footer() link patterns so regenerated pages also use clean URLs
let gpjs = fs.readFileSync(path.join(__dirname, 'generate-pages.js'), 'utf8');

// Replace all href="${p}xxx/index.html" → href="${p}xxx/"
gpjs = gpjs.replace(/href="\$\{p\}([^"]+)\/index\.html"/g, 'href="${p}$1/"');
// Replace href="${p}index.html" → href="${p}"  (root link from sub-page)
gpjs = gpjs.replace(/href="\$\{p\}index\.html"/g, 'href="${p}"');

// Fix breadcrumb href in hero() function
gpjs = gpjs.replace(/href="\$\{p\}index\.html">Home/g, 'href="${p}">Home');

// Fix title generation: strip HTML tags so <title> contains plain text
// The buildPage title param already has <em> etc – strip when writing <title>
gpjs = gpjs.replace(
  /return `<!DOCTYPE html>/,
  `return \`<!DOCTYPE html>`
);
// Patch the <title> line inside head() to strip tags
gpjs = gpjs.replace(
  '<title>${title} | Chayce Properties</title>',
  '<title>${title.replace(/<[^>]+>/g, \'\')} | Chayce Properties</title>'
);

fs.writeFileSync(path.join(__dirname, 'generate-pages.js'), gpjs);
console.log('✓ generate-pages.js link patterns & title fixed');

// ── 5. PAGE DEFINITIONS: correct titles & subtitles ──────────────────────────
// Re-require a fresh copy of the updated generate-pages to get the functions,
// but actually we'll just directly invoke it as a child process after patching.
// Instead, run the page generation inline here:

const PAGES = [
  { slug:'about-chayce',      title:'<em>About</em> Chayce Properties',
    sub:'The UK\'s Premier Luxury Senior Relocation Specialists',
    bg:'wp-content_uploads_2020_03_slide01.jpg' },
  { slug:'our-services',      title:'<em>Our</em> Concierge Services',
    sub:'Property Preparation, Sales Support &amp; Relocation Concierge',
    bg:'chayce-gallery1.jpg' },
  { slug:'packages',          title:'<em>Relocation</em> Packages',
    sub:'Five tailored tiers — from Discovery to Platinum Bespoke',
    bg:'chayce-packages.jpg' },
  { slug:'discovery',         title:'<em>Discovery</em> Consultation',
    sub:'Expert guidance and a personalised move plan — From £150',
    bg:'chayce-hero1.jpg' },
  { slug:'bronze-essentials', title:'<em>Bronze</em> Essentials',
    sub:'Packing, removals and light cleaning — From £995',
    bg:'chayce-gallery2.jpg' },
  { slug:'silver-comfort',    title:'<em>Silver</em> Comfort',
    sub:'Full-service move with a dedicated coordinator — From £1,850',
    bg:'chayce-about.jpg' },
  { slug:'gold-prestige',     title:'<em>Gold</em> Prestige',
    sub:'Chauffeur viewings, staging, legal coordination &amp; more — From £3,250',
    bg:'chayce-hero2.jpg' },
  { slug:'platinum-bespoke',  title:'<em>Platinum</em> Bespoke',
    sub:'Complete white-glove service for discerning clients — From £6,500',
    bg:'chayce-hero3.jpg' },
  { slug:'news',              title:'<em>Latest</em> News &amp; Insights',
    sub:'Advice, stories and updates from Chayce Properties',
    bg:'chayce-news1.jpg' },
  { slug:'contact',           title:'<em>Contact</em> Us',
    sub:'Book a free consultation or simply get in touch',
    bg:'chayce-contact.jpg' },
  { slug:'photo-gallery',     title:'<em>Photo</em> Gallery',
    sub:'A glimpse into the moves we manage with care',
    bg:'chayce-gallery3.jpg' },
  { slug:'faq',               title:'Frequently Asked <em>Questions</em>',
    sub:'Everything you need to know about our services',
    bg:'chayce-about2.jpg' },
  { slug:'sales-team',        title:'<em>Meet</em> the Team',
    sub:'Dedicated specialists committed to your next chapter',
    bg:'chayce-hero1.jpg' },
];

// ── 6. SHARED NAVBAR / FOOTER / HEAD builders ─────────────────────────────────
function head(title, depth = 1) {
  const p = '../'.repeat(depth);
  const plainTitle = title.replace(/<[^>]+>/g, '');
  return `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${plainTitle} | Chayce Properties</title>
<link rel="stylesheet" href="${p}css/wp-content_themes_hompark_css_bundle.min.css">
<link rel="stylesheet" href="${p}css/wp-content_themes_hompark_css_bootstrap.min.css">
<link rel="stylesheet" href="${p}css/wp-content_themes_hompark_css_style.css">
<link rel="stylesheet" href="${p}css/wp-content_themes_hompark_css_fontawesome.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:400,600,800">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Playfair">
<style>
.chayce-logo-link{text-decoration:none!important}
.page-hero{background:#3d4558;padding:120px 0 80px;text-align:center;position:relative;overflow:hidden}
.page-hero::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(30,35,50,.85),rgba(61,69,88,.7));z-index:1}
.page-hero .container{position:relative;z-index:2}
.page-hero h1{color:#fff;font-size:48px;font-weight:700;margin-bottom:10px;font-family:'Playfair',serif}
.page-hero h1 em{color:#c8a96e;font-style:normal}
.page-hero .breadcrumb{color:#c8a96e;font-size:13px;letter-spacing:2px;text-transform:uppercase}
.page-hero .breadcrumb a{color:#fff;text-decoration:none}
.page-section{padding:80px 0}
.page-section.grey{background:#f9f9f9}
.card-box{background:#fff;border:1px solid #eee;padding:36px;margin-bottom:30px;transition:.3s}
.card-box:hover{box-shadow:0 8px 30px rgba(0,0,0,.08);transform:translateY(-3px)}
.card-box h4{color:#1a1a1a;font-family:'Playfair',serif;margin-bottom:10px}
.card-box h4 em{color:#c8a96e;font-style:normal}
.card-box p{color:#666;line-height:1.7;font-size:15px}
.card-box .price{font-size:22px;font-weight:700;color:#c8a96e;margin:12px 0}
.card-box .btn-chayce{display:inline-block;padding:10px 28px;background:#c8a96e;color:#fff;text-decoration:none;font-size:13px;letter-spacing:1px;text-transform:uppercase;margin-top:12px}
.card-box .btn-chayce:hover{background:#1a1a1a}
.icon-row{display:flex;flex-wrap:wrap;gap:24px;margin-top:30px}
.icon-item{flex:0 0 calc(33.333% - 16px);background:#fff;padding:30px 24px;border:1px solid #eee;text-align:center}
.icon-item img{width:50px;height:50px;object-fit:contain;margin-bottom:14px}
.icon-item h6{font-size:13px;font-weight:600;color:#1a1a1a;letter-spacing:1px;text-transform:uppercase}
.quote-block{border-left:4px solid #c8a96e;padding:20px 28px;background:#f9f5ef;font-style:italic;font-size:17px;color:#3d4558;margin:30px 0;font-family:'Playfair',serif}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px}
.contact-info h5{color:#c8a96e;text-transform:uppercase;letter-spacing:2px;font-size:12px;margin-bottom:8px}
.contact-info h3{color:#1a1a1a;font-size:28px;margin-bottom:20px;font-family:'Playfair',serif}
.contact-info p{color:#666;line-height:1.8}
.contact-info a{color:#c8a96e}
.form-group{margin-bottom:18px}
.form-group input,.form-group textarea,.form-group select{width:100%;padding:12px 16px;border:1px solid #ddd;font-size:14px;font-family:'Poppins',sans-serif;outline:none}
.form-group input:focus,.form-group textarea:focus{border-color:#c8a96e}
.form-group textarea{min-height:130px;resize:vertical}
.btn-submit{background:#c8a96e;color:#fff;border:none;padding:14px 36px;font-size:13px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;width:100%}
.btn-submit:hover{background:#1a1a1a}
.news-card figure{overflow:hidden;margin-bottom:16px}
.news-card figure img{width:100%;height:220px;object-fit:cover;transition:.4s}
.news-card figure:hover img{transform:scale(1.05)}
.news-card span{color:#c8a96e;font-size:12px;letter-spacing:1px;text-transform:uppercase}
.news-card h5{margin:8px 0;font-family:'Playfair',serif}
.news-card h5 a{color:#1a1a1a;text-decoration:none}
.news-card h5 a:hover{color:#c8a96e}
.news-card p{color:#666;font-size:14px;line-height:1.7}
.team-card{text-align:center;padding:30px 20px;border:1px solid #eee}
.team-card .avatar{width:90px;height:90px;border-radius:50%;background:#c8a96e;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:32px;color:#fff;font-family:'Playfair',serif}
.team-card h5{font-family:'Playfair',serif;color:#1a1a1a;margin-bottom:4px}
.team-card p{color:#c8a96e;font-size:12px;letter-spacing:2px;text-transform:uppercase}
.faq-item{border-bottom:1px solid #eee;padding:20px 0}
.faq-item h5{color:#1a1a1a;font-size:16px;cursor:pointer}
.faq-item p{color:#666;font-size:14px;line-height:1.7;margin-top:10px}
table.pkg-table{width:100%;border-collapse:collapse}
table.pkg-table th{background:#3d4558;color:#fff;padding:12px 16px;font-size:13px;letter-spacing:1px;text-align:left}
table.pkg-table td{padding:12px 16px;border-bottom:1px solid #eee;font-size:14px;color:#444}
table.pkg-table tr:hover td{background:#fafafa}
table.pkg-table td.gold{color:#c8a96e;font-weight:700}
@media(max-width:768px){.contact-grid{grid-template-columns:1fr}.icon-item{flex:0 0 100%}}
</style>
<script src="${p}js/wp-includes_js_jquery_jquery.min.js"></script>
<script src="${p}js/wp-includes_js_jquery_jquery-migrate.min.js"></script>
</head>`;
}

function navbar(depth = 1) {
  const p = '../'.repeat(depth);
  return `<nav class="navbar">
  <div class="container">
    <div class="upper-side">
      <div class="logo"><a href="${p || '/'}"><img src="${p}images/chayce-logo.svg" alt="Chayce Properties" style="height:54px;width:auto;"></a></div>
      <div class="phone-email">
        <h4><a href="tel:07708925432">07708 925 432</a></h4>
        <small><a href="mailto:info@chayceproperties.com">info@chayceproperties.com</a></small>
      </div>
      <figure class="phone-email-icon"><img src="${p}images/wp-content_uploads_2020_03_icon-phone.png" alt="Image"></figure>
      <div class="hamburger"><span></span><span></span><span></span><span></span></div>
    </div>
    <div class="menu">
      <div class="menu-main-menu-container"><ul id="menu-main-menu-1" class="menu-horizontal">
        <li class="nav-item"><a href="${p || '/'}" class="nav-link" data-text="START">START</a></li>
        <li class="nav-item"><a href="${p}about-chayce/" class="nav-link" data-text="ABOUT US">ABOUT US</a></li>
        <li class="nav-item"><a href="${p}packages/" class="nav-link" data-text="PACKAGES">PACKAGES</a></li>
        <li class="nav-item"><a href="${p}our-services/" class="nav-link" data-text="SERVICES">SERVICES</a></li>
        <li class="nav-item"><a href="${p}news/" class="nav-link" data-text="NEWS">NEWS</a></li>
        <li class="nav-item"><a href="${p}contact/" class="nav-link" data-text="CONTACT">CONTACT</a></li>
      </ul></div>
    </div>
  </div>
</nav>`;
}

function footer(depth = 1) {
  const p = '../'.repeat(depth);
  return `<section class="footer-bar" style="background:#26282b">
  <div class="container">
    <div class="inner">
      <div class="row">
        <div class="col-lg-4">
          <figure><img src="${p}images/wp-content_uploads_2020_03_footer-icon01.png" alt="Address"></figure>
          <h3>Our Address</h3><p>United Kingdom<br>chayceproperties.com</p>
        </div>
        <div class="col-lg-4">
          <figure><img src="${p}images/wp-content_uploads_2020_03_footer-icon02.png" alt="Hours"></figure>
          <h3>Working Hours</h3><p>Monday to Friday <strong>09:00</strong> to <strong>17:30</strong><br>Saturday by appointment</p>
        </div>
        <div class="col-lg-4">
          <figure><img src="${p}images/wp-content_uploads_2020_03_footer-icon03.png" alt="Contact"></figure>
          <h3>Contact Us</h3><p>t: 07708 925 432<br>e: info@chayceproperties.com</p>
        </div>
      </div>
    </div>
  </div>
</section>
<footer class="footer" style="background:#26282b">
  <div class="container">
    <div class="row">
      <div class="col-lg-4">
        <p style="color:#aaa;line-height:1.8">Guiding your next chapter with grace &amp; ease. Discreet, dignified, designed for you &mdash; The UK&rsquo;s premier luxury senior relocation specialists.</p>
      </div>
      <div class="col-lg-2 col-6">
        <ul class="footer-menu">
          <li><a href="${p}about-chayce/">About Us</a></li>
          <li><a href="${p}our-services/">Services</a></li>
          <li><a href="${p}news/">News</a></li>
          <li><a href="${p}contact/">Contact</a></li>
        </ul>
      </div>
      <div class="col-lg-2 col-6">
        <ul class="footer-menu">
          <li><a href="${p}discovery/">Discovery</a></li>
          <li><a href="${p}bronze-essentials/">Bronze Essentials</a></li>
          <li><a href="${p}silver-comfort/">Silver Comfort</a></li>
          <li><a href="${p}gold-prestige/">Gold Prestige</a></li>
          <li><a href="${p}platinum-bespoke/">Platinum Bespoke</a></li>
        </ul>
      </div>
      <div class="col-lg-4">
        <div class="contact-box">
          <h5>CONTACT US</h5>
          <h3>07708 925 432</h3>
          <p><a href="mailto:info@chayceproperties.com">info@chayceproperties.com</a></p>
          <ul>
            <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
            <li><a href="#"><i class="fab fa-instagram"></i></a></li>
            <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
          </ul>
        </div>
      </div>
      <div class="col-12">
        <div class="footer-bottom">
          <span class="copyright">&copy; 2026 Chayce Properties &mdash; All rights reserved.</span>
          <span class="creation">w: <a href="https://chayceproperties.com">chayceproperties.com</a></span>
        </div>
      </div>
    </div>
  </div>
</footer>`;
}

function scripts(depth = 1) {
  const p = '../'.repeat(depth);
  return `<script src="${p}js/wp-content_themes_hompark_js_popper.min.js"></script>
<script src="${p}js/wp-content_themes_hompark_js_bootstrap.min.js"></script>
<script src="${p}js/wp-content_themes_hompark_js_bundle.js"></script>
<script src="${p}js/wp-content_themes_hompark_js_scripts.js"></script>`;
}

function hero(title, subtitle, bgImg, depth = 1) {
  const p = '../'.repeat(depth);
  const bg = bgImg ? `background-image:url(${p}images/${bgImg});background-size:cover;background-position:center;` : '';
  const plainTitle = title.replace(/<[^>]+>/g, '');
  return `<div class="page-hero" style="${bg}">
  <div class="container">
    <p class="breadcrumb"><a href="${p || '/'}">Home</a> / ${plainTitle}</p>
    <h1>${title}</h1>
    ${subtitle ? `<p style="color:#ccc;margin-top:10px;font-size:16px;">${subtitle}</p>` : ''}
  </div>
</div>`;
}

// ── 7. PAGE CONTENT ────────────────────────────────────────────────────────────
function pageContent(slug, depth) {
  const p = '../'.repeat(depth);
  const contents = {
    'about-chayce': `
<section class="page-section">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6">
        <img src="${p}images/chayce-about.jpg" alt="Chayce Properties consultation" style="width:100%;height:400px;object-fit:cover;">
      </div>
      <div class="col-lg-6" style="padding-left:50px;">
        <h5 style="color:#c8a96e;letter-spacing:3px;font-size:12px;text-transform:uppercase;margin-bottom:12px;">Who We Are</h5>
        <h2 style="font-family:'Playfair',serif;font-size:36px;color:#1a1a1a;margin-bottom:20px;">The UK's Premier Luxury Senior Relocation Specialists</h2>
        <p style="color:#666;line-height:1.8;margin-bottom:16px;">Founded by Joyce Chayce, Chayce Properties was built on a single belief: that moving home in later life should be handled with the utmost care, dignity and discretion.</p>
        <p style="color:#666;line-height:1.8;margin-bottom:16px;">We are not simply a removal company. We are a full-service relocation partner — managing everything from sorting and packing to property staging, estate agent coordination, and settling you into your beautiful new home.</p>
        <div class="quote-block">&ldquo;From sorting and packing to selling and settling in &mdash; we manage it all, so you don&rsquo;t have to.&rdquo;</div>
        <a href="${p}contact/" style="display:inline-block;margin-top:20px;padding:13px 32px;background:#c8a96e;color:#fff;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Book a Free Consultation</a>
      </div>
    </div>
  </div>
</section>
<section class="page-section grey">
  <div class="container">
    <div style="text-align:center;max-width:680px;margin:0 auto 50px;">
      <h2 style="font-family:'Playfair',serif;font-size:34px;color:#1a1a1a;">Why Families Choose Chayce</h2>
    </div>
    <div class="row">
      <div class="col-lg-4"><div class="card-box"><h4><em>Discreet</em> &amp; Dignified</h4><p>We treat every client with the same care and sensitivity we would show our own family.</p></div></div>
      <div class="col-lg-4"><div class="card-box"><h4><em>Bespoke</em> Service</h4><p>Every move is uniquely planned around your needs, timeline and personal preferences.</p></div></div>
      <div class="col-lg-4"><div class="card-box"><h4><em>UK</em> Nationwide</h4><p>We operate across England, Scotland and Wales — wherever your next chapter begins.</p></div></div>
    </div>
  </div>
</section>`,

    'our-services': `
<section class="page-section">
  <div class="container">
    <div style="text-align:center;max-width:700px;margin:0 auto 50px;">
      <h2 style="font-family:'Playfair',serif;font-size:36px;color:#1a1a1a;">Everything Handled. Nothing Overlooked.</h2>
      <p style="color:#666;margin-top:14px;line-height:1.8;">From the first conversation to the final unpack, our specialist team manages every detail of your move with precision and care.</p>
    </div>
    <div class="row">
      <div class="col-lg-4"><div class="card-box"><h4><em>Sorting</em> &amp; Decluttering</h4><p>We help you lovingly sort decades of belongings — deciding what to keep, gift, donate or sell.</p></div></div>
      <div class="col-lg-4"><div class="card-box"><h4><em>Professional</em> Packing</h4><p>Our team packs with care and precision, ensuring every item arrives safely at your new home.</p></div></div>
      <div class="col-lg-4"><div class="card-box"><h4><em>Property</em> Staging</h4><p>We present your home in its best light to attract buyers and achieve the best possible price.</p></div></div>
      <div class="col-lg-4"><div class="card-box"><h4><em>Estate Agent</em> Coordination</h4><p>We liaise with your agent, solicitors and buyers on your behalf — removing all the stress.</p></div></div>
      <div class="col-lg-4"><div class="card-box"><h4><em>Chauffeur</em> Viewings</h4><p>We accompany you to view potential new homes and provide honest, caring guidance throughout.</p></div></div>
      <div class="col-lg-4"><div class="card-box"><h4><em>Settling-In</em> Support</h4><p>We unpack, arrange furniture and help you feel at home from the very first day.</p></div></div>
    </div>
  </div>
</section>`,

    'packages': `
<section class="page-section">
  <div class="container">
    <div style="text-align:center;max-width:680px;margin:0 auto 50px;">
      <h2 style="font-family:'Playfair',serif;font-size:36px;color:#1a1a1a;">Five Tiers. One Standard of Excellence.</h2>
      <p style="color:#666;margin-top:14px;line-height:1.8;">Every package is designed around the individual — choose the level of support that suits your needs and budget.</p>
    </div>
    <div class="row">
      <div class="col-lg-6 col-xl-4"><div class="card-box"><h4><em>Discovery</em> Consultation</h4><p>Expert guidance and a personalised move plan. The perfect first step before committing to a full package.</p><div class="price">From £150</div><a href="${p}discovery/" class="btn-chayce">Learn More</a></div></div>
      <div class="col-lg-6 col-xl-4"><div class="card-box"><h4><em>Bronze</em> Essentials</h4><p>Packing, removals and light cleaning. Everything you need for a smooth, straightforward move.</p><div class="price">From £995</div><a href="${p}bronze-essentials/" class="btn-chayce">Learn More</a></div></div>
      <div class="col-lg-6 col-xl-4"><div class="card-box"><h4><em>Silver</em> Comfort</h4><p>Full-service move with a dedicated coordinator — your personal point of contact throughout.</p><div class="price">From £1,850</div><a href="${p}silver-comfort/" class="btn-chayce">Learn More</a></div></div>
      <div class="col-lg-6 col-xl-4"><div class="card-box"><h4><em>Gold</em> Prestige</h4><p>Chauffeur viewings, home staging, legal coordination and more. The complete premium experience.</p><div class="price">From £3,250</div><a href="${p}gold-prestige/" class="btn-chayce">Learn More</a></div></div>
      <div class="col-lg-6 col-xl-4"><div class="card-box"><h4><em>Platinum</em> Bespoke</h4><p>Complete white-glove service for the most discerning clients. Every detail, fully managed.</p><div class="price">From £6,500</div><a href="${p}platinum-bespoke/" class="btn-chayce">Learn More</a></div></div>
      <div class="col-lg-6 col-xl-4"><div class="card-box" style="background:#f9f5ef;border-color:#c8a96e;"><h4>Not sure <em>which package?</em></h4><p>Start with a Discovery Consultation and we&rsquo;ll recommend the perfect level of support for your situation.</p><a href="${p}contact/" class="btn-chayce" style="margin-top:20px;">Talk to Us</a></div></div>
    </div>
  </div>
</section>`,

    'discovery': `<section class="page-section"><div class="container"><div class="row"><div class="col-lg-7"><h5 style="color:#c8a96e;letter-spacing:3px;font-size:12px;text-transform:uppercase;margin-bottom:12px;">Package One</h5><h2 style="font-family:'Playfair',serif;font-size:36px;color:#1a1a1a;margin-bottom:20px;">Discovery Consultation</h2><p style="color:#666;line-height:1.8;margin-bottom:16px;">The ideal starting point. Our senior relocation specialist visits you at home (or meets via video call) to discuss your situation, timeline, wishes and concerns in complete confidence.</p><p style="color:#666;line-height:1.8;margin-bottom:20px;">You receive a bespoke written move plan covering: recommended next steps, timescales, a package recommendation, and answers to all your questions.</p><div class="quote-block">&ldquo;It gave us the clarity and confidence to move forward with our plans.&rdquo; &mdash; Margaret, Surrey</div><a href="${p}contact/" style="display:inline-block;margin-top:24px;padding:13px 32px;background:#c8a96e;color:#fff;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Book Now &mdash; From £150</a></div><div class="col-lg-5"><img src="${p}images/chayce-hero1.jpg" alt="Discovery consultation" style="width:100%;height:380px;object-fit:cover;margin-top:10px;"></div></div></div></section>`,

    'bronze-essentials': `<section class="page-section"><div class="container"><div class="row"><div class="col-lg-7"><h5 style="color:#c8a96e;letter-spacing:3px;font-size:12px;text-transform:uppercase;margin-bottom:12px;">Package Two</h5><h2 style="font-family:'Playfair',serif;font-size:36px;color:#1a1a1a;margin-bottom:20px;">Bronze Essentials</h2><p style="color:#666;line-height:1.8;margin-bottom:16px;">Our entry-level full move package covers everything you need for a smooth, safe relocation. Ideal for clients who have family support but need professional hands on moving day.</p><ul style="color:#666;line-height:2;padding-left:20px;margin-bottom:20px;"><li>Professional packing of all rooms</li><li>Specialist removal vehicle &amp; crew</li><li>Light cleaning of vacated property</li><li>Unpacking of essentials at new home</li></ul><a href="${p}contact/" style="display:inline-block;margin-top:12px;padding:13px 32px;background:#c8a96e;color:#fff;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Enquire &mdash; From £995</a></div><div class="col-lg-5"><img src="${p}images/chayce-gallery2.jpg" alt="Bronze Essentials package" style="width:100%;height:380px;object-fit:cover;margin-top:10px;"></div></div></div></section>`,

    'silver-comfort': `<section class="page-section"><div class="container"><div class="row"><div class="col-lg-7"><h5 style="color:#c8a96e;letter-spacing:3px;font-size:12px;text-transform:uppercase;margin-bottom:12px;">Package Three</h5><h2 style="font-family:'Playfair',serif;font-size:36px;color:#1a1a1a;margin-bottom:20px;">Silver Comfort</h2><p style="color:#666;line-height:1.8;margin-bottom:16px;">A full end-to-end move service with a dedicated coordinator assigned solely to your move. Your coordinator is your single point of contact from initial consultation to settling-in day.</p><ul style="color:#666;line-height:2;padding-left:20px;margin-bottom:20px;"><li>Everything in Bronze Essentials</li><li>Dedicated personal move coordinator</li><li>Furniture placement plan &amp; layout advice</li><li>Full unpack and home set-up</li><li>First-night comfort kit provided</li></ul><a href="${p}contact/" style="display:inline-block;margin-top:12px;padding:13px 32px;background:#c8a96e;color:#fff;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Enquire &mdash; From £1,850</a></div><div class="col-lg-5"><img src="${p}images/chayce-about.jpg" alt="Silver Comfort package" style="width:100%;height:380px;object-fit:cover;margin-top:10px;"></div></div></div></section>`,

    'gold-prestige': `<section class="page-section"><div class="container"><div class="row"><div class="col-lg-7"><h5 style="color:#c8a96e;letter-spacing:3px;font-size:12px;text-transform:uppercase;margin-bottom:12px;">Package Four</h5><h2 style="font-family:'Playfair',serif;font-size:36px;color:#1a1a1a;margin-bottom:20px;">Gold Prestige</h2><p style="color:#666;line-height:1.8;margin-bottom:16px;">For clients who want a truly comprehensive, guided experience. Gold Prestige brings together every aspect of the move — from finding and viewing your ideal new home to legal coordination and elegant staging of your current property.</p><ul style="color:#666;line-height:2;padding-left:20px;margin-bottom:20px;"><li>Everything in Silver Comfort</li><li>Chauffeur-accompanied property viewings</li><li>Professional home staging for sale</li><li>Estate agent &amp; solicitor liaison</li><li>Decluttering &amp; valuation support</li><li>Dedicated concierge helpline (3 months)</li></ul><a href="${p}contact/" style="display:inline-block;margin-top:12px;padding:13px 32px;background:#c8a96e;color:#fff;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Enquire &mdash; From £3,250</a></div><div class="col-lg-5"><img src="${p}images/chayce-hero2.jpg" alt="Gold Prestige package" style="width:100%;height:380px;object-fit:cover;margin-top:10px;"></div></div></div></section>`,

    'platinum-bespoke': `<section class="page-section"><div class="container"><div class="row"><div class="col-lg-7"><h5 style="color:#c8a96e;letter-spacing:3px;font-size:12px;text-transform:uppercase;margin-bottom:12px;">Package Five</h5><h2 style="font-family:'Playfair',serif;font-size:36px;color:#1a1a1a;margin-bottom:20px;">Platinum Bespoke</h2><p style="color:#666;line-height:1.8;margin-bottom:16px;">The pinnacle of the Chayce experience. Platinum Bespoke is our fully tailored white-glove service — crafted uniquely for you. No two Platinum moves are alike, because no two clients are alike.</p><ul style="color:#666;line-height:2;padding-left:20px;margin-bottom:20px;"><li>Everything in Gold Prestige</li><li>Bespoke move plan reviewed weekly</li><li>Private chauffeur for all appointments</li><li>Fine art &amp; antique specialist handling</li><li>New home interior set-up to your specification</li><li>Ongoing concierge support (12 months)</li><li>Welcome hamper &amp; floral arrangement</li></ul><a href="${p}contact/" style="display:inline-block;margin-top:12px;padding:13px 32px;background:#c8a96e;color:#fff;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Enquire &mdash; From £6,500</a></div><div class="col-lg-5"><img src="${p}images/chayce-hero3.jpg" alt="Platinum Bespoke package" style="width:100%;height:380px;object-fit:cover;margin-top:10px;"></div></div></div></section>`,

    'news': `<section class="page-section"><div class="container"><div class="row"><div class="col-lg-4"><div class="news-card"><figure><img src="${p}images/chayce-news1.jpg" alt="Moving with confidence"></figure><span>June 2026 &mdash; Advice</span><h5><a href="#">Moving with Confidence: A Guide for Seniors &amp; Families</a></h5><p>Practical tips and reassuring advice for navigating the move to a smaller home or care setting.</p></div></div><div class="col-lg-4"><div class="news-card"><figure><img src="${p}images/chayce-news2.jpg" alt="Downsizing guide"></figure><span>May 2026 &mdash; Guide</span><h5><a href="#">The Art of Downsizing: What to Keep, What to Let Go</a></h5><p>Our specialists share their gentle approach to sorting a lifetime of cherished belongings.</p></div></div><div class="col-lg-4"><div class="news-card"><figure><img src="${p}images/chayce-news3.jpg" alt="Property staging"></figure><span>April 2026 &mdash; Tips</span><h5><a href="#">First Impressions: How Staging Sells Your Home Faster</a></h5><p>How professional presentation adds thousands to your sale price and reduces time on the market.</p></div></div></div></div></section>`,

    'contact': `<section class="page-section"><div class="container"><div class="contact-grid"><div class="contact-info"><h5>Get in Touch</h5><h3>Book a Free Discovery Consultation</h3><p>Whether you&rsquo;re just beginning to consider a move or ready to get started, we&rsquo;re here to listen. Call, email or complete the form and one of our senior specialists will be in touch within 24 hours.</p><p style="margin-top:16px;"><strong style="color:#c8a96e;">Telephone:</strong><br><a href="tel:07708925432">07708 925 432</a></p><p style="margin-top:10px;"><strong style="color:#c8a96e;">Email:</strong><br><a href="mailto:info@chayceproperties.com">info@chayceproperties.com</a></p><p style="margin-top:10px;"><strong style="color:#c8a96e;">Hours:</strong><br>Monday – Friday, 09:00 – 17:30<br>Saturday by appointment</p></div><div><form onsubmit="return false;"><div class="form-group"><input type="text" placeholder="Your Name"></div><div class="form-group"><input type="email" placeholder="Email Address"></div><div class="form-group"><input type="tel" placeholder="Telephone Number"></div><div class="form-group"><select><option>Select a Package</option><option>Discovery Consultation (£150)</option><option>Bronze Essentials (from £995)</option><option>Silver Comfort (from £1,850)</option><option>Gold Prestige (from £3,250)</option><option>Platinum Bespoke (from £6,500)</option></select></div><div class="form-group"><textarea placeholder="Tell us a little about your situation and how we can help…"></textarea></div><button class="btn-submit">Send Enquiry</button></form></div></div></div></section>`,

    'photo-gallery': `<section class="page-section"><div class="container"><div class="row" style="gap:0;"><div class="col-lg-4 col-md-6" style="padding:6px;"><img src="${p}images/chayce-gallery1.jpg" alt="Beautifully staged living room" style="width:100%;height:260px;object-fit:cover;"></div><div class="col-lg-4 col-md-6" style="padding:6px;"><img src="${p}images/chayce-gallery2.jpg" alt="Professional packing" style="width:100%;height:260px;object-fit:cover;"></div><div class="col-lg-4 col-md-6" style="padding:6px;"><img src="${p}images/chayce-gallery3.jpg" alt="Happy senior couple" style="width:100%;height:260px;object-fit:cover;"></div><div class="col-lg-4 col-md-6" style="padding:6px;"><img src="${p}images/chayce-about.jpg" alt="Consultation meeting" style="width:100%;height:260px;object-fit:cover;"></div><div class="col-lg-4 col-md-6" style="padding:6px;"><img src="${p}images/chayce-about2.jpg" alt="Home staging" style="width:100%;height:260px;object-fit:cover;"></div><div class="col-lg-4 col-md-6" style="padding:6px;"><img src="${p}images/chayce-hero2.jpg" alt="Luxury property" style="width:100%;height:260px;object-fit:cover;"></div></div></div></section>`,

    'certificates': `<section class="page-section"><div class="container"><div style="text-align:center;max-width:680px;margin:0 auto 50px;"><h2 style="font-family:'Playfair',serif;font-size:36px;color:#1a1a1a;">Our Accreditations</h2><p style="color:#666;margin-top:14px;line-height:1.8;">Chayce Properties operates to the highest professional standards. We are proud members of the following organisations:</p></div><div class="row"><div class="col-lg-4"><div class="card-box" style="text-align:center;"><div style="font-size:48px;color:#c8a96e;margin-bottom:16px;">&#9670;</div><h4><em>BAR</em> Member</h4><p>British Association of Removers — the UK&rsquo;s leading trade association for the removals industry.</p></div></div><div class="col-lg-4"><div class="card-box" style="text-align:center;"><div style="font-size:48px;color:#c8a96e;margin-bottom:16px;">&#9670;</div><h4><em>ARLA</em> Affiliated</h4><p>Association of Residential Letting Agents — ensuring the highest lettings and property standards.</p></div></div><div class="col-lg-4"><div class="card-box" style="text-align:center;"><div style="font-size:48px;color:#c8a96e;margin-bottom:16px;">&#9670;</div><h4>Fully <em>Insured</em></h4><p>All moves carried out by Chayce Properties are covered by comprehensive goods-in-transit insurance.</p></div></div></div></div></section>`,

    'faq': `<section class="page-section"><div class="container"><div style="max-width:760px;margin:0 auto;"><div class="faq-item"><h5>What areas do you cover?</h5><p>We operate across the whole of England, Scotland and Wales. We have successfully completed moves from Cornwall to the Highlands — wherever your next chapter begins, we can help.</p></div><div class="faq-item"><h5>How far in advance should I book?</h5><p>We recommend booking at least 6–8 weeks before your intended move date, though we do our best to accommodate shorter timescales for clients who need to move quickly.</p></div><div class="faq-item"><h5>Can you help if I haven't sold my house yet?</h5><p>Absolutely. A Discovery Consultation is the ideal first step — we can advise on the process, help you prepare your home for sale, and put everything in place for when you are ready.</p></div><div class="faq-item"><h5>What makes Chayce different from a regular removal company?</h5><p>We are a full-service relocation specialist. Unlike a removal company, we handle the entire process: decluttering, property staging, estate agent liaison, legal support, viewings, packing, moving, unpacking and settling you in.</p></div><div class="faq-item"><h5>Are my belongings insured during the move?</h5><p>Yes. All goods are covered by our comprehensive goods-in-transit insurance. Fine art, antiques and items of exceptional value can be additionally covered upon request (Platinum Bespoke package).</p></div><div class="faq-item"><h5>How much does it cost?</h5><p>Our packages start from £150 for a Discovery Consultation, rising to fully bespoke Platinum packages from £6,500. Every quote is tailored to your specific circumstances — please contact us for a no-obligation discussion.</p></div></div></div></section>`,

    'sales-team': `<section class="page-section"><div class="container"><div style="text-align:center;max-width:680px;margin:0 auto 50px;"><h2 style="font-family:'Playfair',serif;font-size:36px;color:#1a1a1a;">The People Behind Your Move</h2><p style="color:#666;margin-top:14px;line-height:1.8;">Our team of dedicated specialists brings decades of combined experience in senior care, property and logistics.</p></div><div class="row justify-content-center"><div class="col-lg-3 col-md-4"><div class="team-card"><div class="avatar">J</div><h5>Joyce Chayce</h5><p>Founder &amp; Director</p></div></div><div class="col-lg-3 col-md-4"><div class="team-card"><div class="avatar">S</div><h5>Sarah Mitchell</h5><p>Senior Relocation Specialist</p></div></div><div class="col-lg-3 col-md-4"><div class="team-card"><div class="avatar">R</div><h5>Richard Holt</h5><p>Logistics &amp; Operations Manager</p></div></div><div class="col-lg-3 col-md-4"><div class="team-card"><div class="avatar">A</div><h5>Amanda Pearce</h5><p>Client Care Coordinator</p></div></div></div></div></section>`,
  };
  return contents[slug] || `<section class="page-section"><div class="container"><p style="color:#666;">Content coming soon.</p></div></section>`;
}

// ── 8. REGENERATE ALL SUB-PAGES ───────────────────────────────────────────────
for (const pg of PAGES) {
  const depth = 1;
  const dir   = path.join(TMPL, pg.slug);
  fs.mkdirSync(dir, { recursive: true });
  const html = [
    head(pg.title, depth),
    '<body class="page-template page-loaded">',
    navbar(depth),
    hero(pg.title, pg.sub, pg.bg, depth),
    pageContent(pg.slug, depth),
    footer(depth),
    scripts(depth),
    '</body></html>',
  ].join('\n');
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`✓ ${pg.slug}/`);
}

console.log('\nAll done — logo updated, URLs cleaned, titles fixed, 14 pages regenerated.');
