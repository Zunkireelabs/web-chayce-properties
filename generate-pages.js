const fs = require('fs');
const path = require('path');

const TEMPLATE = path.join(__dirname, 'template');

// ── Shared head (CSS/JS with ../ prefix for subdirectory pages) ──────────────
function head(title, depth = 1) {
  const p = '../'.repeat(depth);
  return `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Google Analytics (prod only: chayceproperties.com) -->
<script>
if (/^(www\\.)?chayceproperties\\.com$/.test(location.hostname)) {
  var ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-QL886WKCTL';
  document.head.appendChild(ga);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-QL886WKCTL');
}
</script>
<title>${title.replace(/<[^>]+>/g, '')} | Chayce Properties</title>
<link rel="icon" type="image/png" href="${p}images/favicon.png">
<link rel="stylesheet" href="${p}css/wp-content_themes_hompark_css_bundle.min.css">
<link rel="stylesheet" href="${p}css/wp-content_themes_hompark_css_bootstrap.min.css">
<link rel="stylesheet" href="${p}css/wp-content_themes_hompark_css_style.css">
<link rel="stylesheet" href="${p}css/wp-content_themes_hompark_css_fontawesome.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:400,600,800">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Playfair">
<style>
.chayce-logo-link{text-decoration:none!important}
.navbar .container .upper-side .logo{margin-left:80px!important}
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

// ── Navbar (depth-aware links) ────────────────────────────────────────────────
function navbar(depth = 1) {
  const p = '../'.repeat(depth);
  return `<nav class="navbar">
  <div class="container">
    <div class="upper-side">
      <div class="logo"><a href="${p}" style="text-decoration:none;display:inline-flex;align-items:center;gap:10px;"><img src="${p}images/chayce-logo.png" alt="Chayce Properties" style="height:58px;width:auto;"><span style="display:flex;flex-direction:column;line-height:1.15;"><span style="font-family:Georgia,serif;font-size:15px;font-weight:700;color:#fff;letter-spacing:2.5px;">CHAYCE</span><span style="font-family:Georgia,serif;font-size:8px;letter-spacing:3px;color:#b49a5e;font-weight:400;">PROPERTIES</span></span></a></div>
      <div class="phone-email">
        <h4><a href="tel:07708925432">07708 925 432</a></h4>
        <small><a href="mailto:info@chayceproperties.com">info@chayceproperties.com</a></small>
      </div>
      <figure class="phone-email-icon"><img src="${p}images/wp-content_uploads_2020_03_icon-phone.png" alt="Image"></figure>
      <div class="hamburger"><span></span><span></span><span></span><span></span></div>
    </div>
    <div class="menu">
      <div class="menu-main-menu-container"><ul id="menu-main-menu-1" class="menu-horizontal">
        <li class="nav-item"><a href="${p}" class="nav-link" data-text="START">START</a></li>
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

// ── Footer ────────────────────────────────────────────────────────────────────
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

// ── Scripts ───────────────────────────────────────────────────────────────────
function scripts(depth = 1) {
  const p = '../'.repeat(depth);
  return `<script src="${p}js/wp-content_themes_hompark_js_popper.min.js"></script>
<script src="${p}js/wp-content_themes_hompark_js_bootstrap.min.js"></script>
<script src="${p}js/wp-content_themes_hompark_js_bundle.js"></script>
<script src="${p}js/wp-content_themes_hompark_js_scripts.js"></script>`;
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function hero(title, subtitle, bgImg = null, depth = 1) {
  const p = '../'.repeat(depth);
  const bg = bgImg ? `background-image:url(${p}images/${bgImg});background-size:cover;background-position:center;` : '';
  return `<div class="page-hero" style="${bg}">
  <div class="container">
    <p class="breadcrumb"><a href="${p}">Home</a> / ${title}</p>
    <h1>${title}</h1>
    ${subtitle ? `<p style="color:#ccc;margin-top:10px;font-size:16px;">${subtitle}</p>` : ''}
  </div>
</div>`;
}

// ── Page builder ──────────────────────────────────────────────────────────────
function buildPage(slug, title, subtitle, bgImg, content, depth = 1) {
  const dir = path.join(TEMPLATE, slug);
  fs.mkdirSync(dir, { recursive: true });
  const html = [
    head(title, depth),
    '<body class="page-template page-loaded">',
    navbar(depth),
    hero(title, subtitle, bgImg, depth),
    content,
    footer(depth),
    scripts(depth),
    '</body></html>'
  ].join('\n');
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`Built: ${slug}/index.html`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

// 1. ABOUT CHAYCE
buildPage('about-chayce', '<em>About</em> Chayce Properties', 'The UK\'s Premier Luxury Senior Relocation Specialists',
  'wp-content_uploads_2020_03_slide01.jpg',
  `<section class="page-section">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="section-titles wow fadeInUp">
          <b>01</b>
          <h2><em>Who</em> We Are</h2>
          <h3>Moving home, handled with heart</h3>
        </div>
        <p style="color:#666;line-height:1.9;margin-top:20px">Moving home is one of life&rsquo;s most significant transitions &mdash; and for seniors, it deserves to be handled with the utmost care, dignity, and discretion. At Chayce Properties, we have built our entire service around that belief.</p>
        <p style="color:#666;line-height:1.9">We are not simply a removal company. We are a full-service relocation partner, dedicated to guiding our clients through their next chapter with grace, compassion, and unparalleled attention to detail.</p>
        <div class="quote-block">&ldquo;From sorting and packing to selling and settling in &mdash; we manage it all, so you don&rsquo;t have to.&rdquo;</div>
      </div>
      <div class="col-md-6">
        <img src="../images/wp-content_uploads_2020_03_side-image01.jpg" alt="About Chayce" style="width:100%;height:400px;object-fit:cover;">
      </div>
    </div>
    <div class="row" style="margin-top:60px">
      <div class="col-md-4">
        <div class="card-box">
          <h4>&#9830; Bespoke Moving Plans</h4>
          <p>Every move is unique. We create a tailored plan crafted precisely around your timeline, budget, and personal needs.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card-box">
          <h4>&#9830; Elegant Home Staging</h4>
          <p>We present your home at its best to achieve the best possible sale price &mdash; beautifully styled by our experts.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card-box">
          <h4>&#9830; Full Concierge Support</h4>
          <p>From the first consultation to final unpacking, your dedicated coordinator is with you every step of the way.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="page-section grey">
  <div class="container" style="text-align:center">
    <div class="section-titles center wow fadeInUp"><b>02</b><h2><em>Our</em> Values</h2></div>
    <div class="row" style="margin-top:40px">
      <div class="col-md-3"><h4 style="color:#c8a96e">Grace</h4><p style="color:#666">Every interaction handled with warmth and sensitivity.</p></div>
      <div class="col-md-3"><h4 style="color:#c8a96e">Dignity</h4><p style="color:#666">Your home, your memories &mdash; treated with total respect.</p></div>
      <div class="col-md-3"><h4 style="color:#c8a96e">Discretion</h4><p style="color:#666">Completely confidential, professional at every stage.</p></div>
      <div class="col-md-3"><h4 style="color:#c8a96e">Excellence</h4><p style="color:#666">White-glove standards across every service we provide.</p></div>
    </div>
  </div>
</section>`
);

// 2. OUR SERVICES
buildPage('our-services', '<em>Our</em> Services', 'Everything managed, so you don\'t have to',
  'wp-content_uploads_2020_03_slide02.jpg',
  `<section class="page-section">
  <div class="container">
    <div class="section-titles center wow fadeInUp"><b>01</b><h2><em>Concierge</em> Services</h2><h3>A complete relocation solution</h3></div>
    <div class="row" style="margin-top:50px">
      ${[
        ['Home Sorting','We carefully sort, categorise and organise the entire contents of your home.','wp-content_uploads_2020_03_services-icon01.png'],
        ['Packing & Removals','Professional packing with premium materials. Safe, insured removal to your new home.','wp-content_uploads_2020_03_services-icon02.png'],
        ['Property Staging','Expert staging to maximise your sale price. Furniture arrangement, styling and photography.','wp-content_uploads_2020_03_services-icon03.png'],
        ['Estate Agent Liaison','We liaise with agents on your behalf — viewings, negotiations, and sale progression.','wp-content_uploads_2020_03_services-icon04.png'],
        ['Legal Coordination','We coordinate with your solicitor to keep your sale on track and stress-free.','wp-content_uploads_2020_03_services-icon05.png'],
        ['Deep Cleaning','Full deep-clean of your old and new property, leaving everything spotless.','wp-content_uploads_2020_03_services-icon06.png'],
        ['Chauffeur Viewings','We arrange and accompany you to viewings in comfort and style.','wp-content_uploads_2020_03_services-icon07.png'],
        ['Furniture Placement','We place, assemble and arrange your furniture exactly as you wish.','wp-content_uploads_2020_03_services-icon08.png'],
        ['Unpacking & Setup','Full unpacking and home setup so you can walk in and feel at home immediately.','wp-content_uploads_2020_03_services-icon09.png'],
        ['Utility Transfers','We handle all utility transfers, redirections and account changes.','wp-content_uploads_2020_03_services-icon10.png'],
        ['Storage Solutions','Secure storage arranged for items you&rsquo;re not ready to part with yet.','wp-content_uploads_2020_03_services-icon11.png'],
        
        ['Ongoing Concierge','Post-move support — we&rsquo;re still here after moving day if you need us.','wp-content_uploads_2020_03_services-icon12.png'],
        ['Refurbishment','Coordination of light repairs, decoration, and home improvements to prepare your property for sale.','wp-content_uploads_2020_03_services-icon13.png'],
      ].map(([name, desc, icon]) => `<div class="col-md-4 col-6" style="margin-bottom:30px">
        <div class="card-box" style="text-align:center;padding:28px 20px">
          <img src="../images/${icon}" alt="${name}" style="width:52px;height:52px;object-fit:contain;margin-bottom:14px">
          <h4 style="font-size:15px">${name}</h4>
          <p style="font-size:13px">${desc}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`
);

// 3. PACKAGES overview
buildPage('packages', '<em>Our</em> Relocation Packages', 'Crafted precisely for your needs',
  'wp-content_uploads_2020_03_slide03.jpg',
  `<section class="page-section">
  <div class="container">
    <div class="section-titles center wow fadeInUp"><b>01</b><h2><em>Choose</em> Your Package</h2><h3>Five levels of support, one standard of excellence</h3></div>
    <div style="overflow-x:auto;margin-top:50px">
      <table class="pkg-table">
        <tr><th>Package</th><th>What&rsquo;s Included</th><th>Price</th><th></th></tr>
        <tr><td class="gold">Discovery Consultation</td><td>Expert guidance &amp; a personalised move plan</td><td class="gold">From £150</td><td><a href="../discovery/index.html" class="card-box btn-chayce" style="margin:0;padding:8px 18px;font-size:12px">Learn More</a></td></tr>
        <tr><td class="gold">Bronze Essentials</td><td>Packing, removals and light cleaning</td><td class="gold">From £995</td><td><a href="../bronze-essentials/index.html" class="card-box btn-chayce" style="margin:0;padding:8px 18px;font-size:12px">Learn More</a></td></tr>
        <tr><td class="gold">Silver Comfort</td><td>Full-service move with a dedicated coordinator</td><td class="gold">From £1,850</td><td><a href="../silver-comfort/index.html" class="card-box btn-chayce" style="margin:0;padding:8px 18px;font-size:12px">Learn More</a></td></tr>
        <tr><td class="gold">Gold Prestige</td><td>Chauffeur viewings, staging, legal coordination &amp; more</td><td class="gold">From £3,250</td><td><a href="../gold-prestige/index.html" class="card-box btn-chayce" style="margin:0;padding:8px 18px;font-size:12px">Learn More</a></td></tr>
        <tr><td class="gold">Platinum Bespoke</td><td>Complete white-glove service for discerning clients</td><td class="gold">From £6,500</td><td><a href="../platinum-bespoke/index.html" class="card-box btn-chayce" style="margin:0;padding:8px 18px;font-size:12px">Learn More</a></td></tr>
      </table>
    </div>
    <div class="quote-block" style="margin-top:50px">&ldquo;From sorting and packing to selling and settling in &mdash; we manage it all, so you don&rsquo;t have to.&rdquo;</div>
  </div>
</section>`
);

// 4. Individual package pages
const packages = [
  { slug:'discovery', name:'Discovery Consultation', price:'£150', icon:'01', tagline:'Expert guidance and a personalised move plan', includes:['1-hour telephone or in-person consultation','Full assessment of your relocation needs','Personalised move plan document','Recommended timeline and budget breakdown','Priority access to our full-service packages'], ideal:'Families exploring their options and wanting expert advice before committing to a full move.', bg:'wp-content_uploads_2020_03_plan01.jpg' },
  { slug:'bronze-essentials', name:'Bronze Essentials', price:'£995', icon:'02', tagline:'Packing, removals and light cleaning', includes:['Professional packing of all rooms','Fully insured removal to your new home','Furniture reassembly at destination','Light cleaning of vacated property','Dedicated move coordinator'], ideal:'Clients who need practical moving help but wish to handle sorting and staging themselves.', bg:'wp-content_uploads_2020_03_plan02.jpg' },
  { slug:'silver-comfort', name:'Silver Comfort', price:'£1,850', icon:'03', tagline:'Full-service move with a dedicated coordinator', includes:['Everything in Bronze Essentials','Home sorting and declutter assistance','Property staging for sale','Utility transfer management','Deep clean of vacated property','Post-move unpacking and setup'], ideal:'Those who want a hands-off experience and comprehensive support throughout.', bg:'wp-content_uploads_2020_03_plan03.jpg' },
  { slug:'gold-prestige', name:'Gold Prestige', price:'£3,250', icon:'04', tagline:'Chauffeur viewings, staging, legal coordination & more', includes:['Everything in Silver Comfort','Chauffeur-driven property viewings','Estate agent liaison','Solicitor coordination','Full home staging with photography','Storage solutions (up to 6 weeks)','White-glove unpacking &amp; styling'], ideal:'Clients seeking a premium, all-inclusive experience with minimum personal effort.', bg:'wp-content_uploads_2020_03_side-image01.jpg' },
  { slug:'platinum-bespoke', name:'Platinum Bespoke', price:'£6,500', icon:'05', tagline:'Complete white-glove service for discerning clients', includes:['Everything in Gold Prestige','Fully bespoke &amp; unlimited scope','Personal lifestyle concierge','New area orientation &amp; introductions','Interior designer consultation','Ongoing post-move concierge support (3 months)','Dedicated senior coordinator throughout'], ideal:'The ultimate relocation experience — every detail handled to the very highest standard.', bg:'wp-content_uploads_2020_03_side-image02.jpg' },
];

packages.forEach(pkg => {
  buildPage(pkg.slug, `<em>${pkg.name}</em>`, pkg.tagline, pkg.bg,
    `<section class="page-section">
  <div class="container">
    <div class="row">
      <div class="col-md-7">
        <div class="section-titles wow fadeInUp"><b>0${pkg.icon}</b><h2><em>${pkg.name}</em></h2><h3>${pkg.tagline}</h3></div>
        <div class="price" style="font-size:36px;font-weight:700;color:#c8a96e;margin:24px 0">From ${pkg.price}</div>
        <h5 style="margin-bottom:14px;color:#3d4558;font-family:Playfair,serif">What&rsquo;s Included</h5>
        <ul style="list-style:none;padding:0;margin:0 0 28px">
          ${pkg.includes.map(i => `<li style="padding:9px 0;border-bottom:1px solid #eee;color:#444;font-size:14px">&#9670;&nbsp; ${i}</li>`).join('')}
        </ul>
        <div class="card-box" style="background:#f9f5ef;border-color:#c8a96e">
          <h4 style="font-size:14px;color:#3d4558">Ideal for</h4>
          <p>${pkg.ideal}</p>
        </div>
        <a href="../contact/index.html" class="btn-chayce" style="display:inline-block;margin-top:24px">Book a Consultation</a>
      </div>
      <div class="col-md-5">
        <img src="../images/${pkg.bg}" alt="${pkg.name}" style="width:100%;height:100%;min-height:350px;object-fit:cover;">
      </div>
    </div>
  </div>
</section>`
  );
});

// 5. NEWS
buildPage('news', '<em>News</em> &amp; Updates', 'Insights from Chayce Properties',
  'wp-content_uploads_2020_03_section-bg01.jpg',
  `<section class="page-section">
  <div class="container">
    <div class="row">
      ${[
        ['blog01','How to Plan a Stress-Free Senior Move in 2026','Practical steps and expert advice for planning a smooth, dignified relocation — from first consultation to final unpack.'],
        ['blog02','Top 5 Tips for Downsizing Your Family Home with Dignity','Moving from a large family home can feel overwhelming. Our specialists share their most valuable guidance for making it easier.'],
        ['blog03','Why a Professional Relocation Partner Makes All the Difference','When every detail matters, having a dedicated coordinator changes everything. Here&rsquo;s what our clients say.'],
      ].map(([img, title, excerpt]) => `<div class="col-md-4">
        <div class="news-card" style="margin-bottom:40px">
          <figure><img src="../images/wp-content_uploads_2020_03_${img}.jpg" alt="${title}"></figure>
          <span>June 2026</span>
          <h5><a href="#">${title}</a></h5>
          <p>${excerpt}</p>
          <a href="#" style="color:#c8a96e;font-size:13px;letter-spacing:1px;text-transform:uppercase;text-decoration:none">Read More &rsaquo;</a>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`
);

// 6. CONTACT
buildPage('contact', '<em>Contact</em> Us', 'Get in touch — we\'d love to hear from you',
  'wp-content_uploads_2020_03_slide02.jpg',
  `<section class="page-section">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info">
        <h5>Get In Touch</h5>
        <h3>We&rsquo;re here to help</h3>
        <p>Whether you&rsquo;re ready to book or just exploring your options, our team is delighted to answer any questions and guide you through the process.</p>
        <div style="margin-top:32px">
          <p>&#9830; <strong>Phone:</strong> <a href="tel:07708925432">07708 925 432</a></p>
          <p>&#9830; <strong>Email:</strong> <a href="mailto:info@chayceproperties.com">info@chayceproperties.com</a></p>
          <p>&#9830; <strong>Website:</strong> <a href="https://chayceproperties.com">chayceproperties.com</a></p>
        </div>
        <div class="quote-block" style="margin-top:40px">&ldquo;Guiding your next chapter with grace &amp; ease. Discreet, dignified, designed for you.&rdquo;</div>
      </div>
      <div>
        <form>
          <div class="form-group"><input type="text" placeholder="Your Full Name" required></div>
          <div class="form-group"><input type="email" placeholder="Email Address" required></div>
          <div class="form-group"><input type="tel" placeholder="Phone Number"></div>
          <div class="form-group">
            <select>
              <option value="">Interested Package</option>
              <option>Discovery Consultation — £150</option>
              <option>Bronze Essentials — £995</option>
              <option>Silver Comfort — £1,850</option>
              <option>Gold Prestige — £3,250</option>
              <option>Platinum Bespoke — £6,500</option>
            </select>
          </div>
          <div class="form-group"><textarea placeholder="How can we help you?"></textarea></div>
          <button type="submit" class="btn-submit">Send Enquiry</button>
        </form>
      </div>
    </div>
  </div>
</section>`
);

// 7. PAGES sub-pages
// Photo Gallery
buildPage('photo-gallery', '<em>Photo</em> Gallery', 'A glimpse into the moves we manage',
  'wp-content_uploads_2020_03_gallery-thumb01.jpg',
  `<section class="page-section">
  <div class="container">
    <div class="row">
      ${['gallery-thumb01','gallery-thumb02','gallery-thumb03','side-image01','side-image02','section-bg01'].map(img =>
        `<div class="col-md-4" style="margin-bottom:24px"><img src="../images/wp-content_uploads_2020_03_${img}.jpg" alt="" style="width:100%;height:260px;object-fit:cover;"></div>`
      ).join('')}
    </div>
  </div>
</section>`
);

/*
// Certificates / Accreditations
buildPage('certificates', '<em>Our</em> Accreditations', 'Trusted, certified and professionally recognised',
  'wp-content_uploads_2020_03_slide03.jpg',
  `<section class="page-section">
  <div class="container" style="text-align:center">
    <div class="section-titles center"><b>01</b><h2><em>Trusted</em> &amp; Certified</h2></div>
    <div class="row" style="margin-top:50px;justify-content:center">
      ${['certificate01','certificate02','certificate03','certificate04'].map(c =>
        `<div class="col-md-3 col-6" style="margin-bottom:30px">
          <div class="card-box" style="text-align:center">
            <img src="../images/wp-content_uploads_2020_03_${c}.png" alt="Accreditation" style="max-width:140px;height:auto">
          </div>
        </div>`
      ).join('')}
    </div>
  </div>
</section>`
);
*/

// FAQ
buildPage('faq', 'Frequently Asked <em>Questions</em>', 'Everything you need to know',
  'wp-content_uploads_2020_03_slide01.jpg',
  `<section class="page-section">
  <div class="container">
    <div class="col-md-8 mx-auto">
      ${[
        ['What areas do you cover?','We operate across the UK. Please contact us to confirm availability in your specific area.'],
        ['How early should I get in touch?','As early as possible &mdash; ideally 3 to 6 months before your intended move date. However, we can accommodate shorter timescales where needed.'],
        ['Can you help if I haven\'t sold my home yet?','Absolutely. We can assist with preparation and staging to help you achieve the best possible sale price before you move.'],
        ['What makes Chayce different from a regular removal company?','We are a full-service relocation partner, not just a removal company. We manage every aspect of your move &mdash; from sorting and packing to estate agent liaison, legal coordination, and post-move setup.'],
        ['Are your services just for seniors?','Our services are designed with seniors in mind, but we welcome anyone who values a premium, fully-managed relocation experience.'],
        ['How does the Discovery Consultation work?','We conduct a detailed 1-hour consultation (in person or by telephone) to understand your needs and deliver a personalised move plan, timeline and budget.'],
        ['Is my move fully insured?','Yes. All removals carried out by Chayce are fully insured. Full details are provided in your service agreement.'],
        ['Can I just book individual services?','Our packages are designed to give you the best value and experience, but we can discuss bespoke requirements. Contact us to find out more.'],
      ].map(([q, a]) => `<div class="faq-item"><h5>&#9830; ${q}</h5><p>${a}</p></div>`).join('')}
    </div>
  </div>
</section>`
);

// Sales Team / Our Team
buildPage('sales-team', '<em>Our</em> Team', 'The people behind your perfect move',
  'wp-content_uploads_2020_03_slide02.jpg',
  `<section class="page-section">
  <div class="container">
    <div class="section-titles center"><b>01</b><h2><em>Meet</em> The Team</h2><h3>Dedicated specialists who care</h3></div>
    <div class="row" style="margin-top:50px">
      ${[
        ['J','Joyce','Founder &amp; Lead Consultant'],
        ['R','Rachel','Senior Move Coordinator'],
        ['T','Thomas','Property Staging Specialist'],
        ['S','Sarah','Client Concierge'],
        ['M','Michael','Legal &amp; Estate Agent Liaison'],
        ['A','Anna','Removals &amp; Logistics Manager'],
      ].map(([initial, name, role]) => `<div class="col-md-4 col-6" style="margin-bottom:30px">
        <div class="team-card">
          <div class="avatar">${initial}</div>
          <h5>${name}</h5>
          <p>${role}</p>
        </div>
      </div>`).join('')}
    </div>
    <div class="quote-block" style="margin-top:20px">Every member of our team shares one goal: to make your move as smooth, stress-free and dignified as possible.</div>
  </div>
</section>`
);

console.log('\nAll pages generated successfully!');
