const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'template', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// ─── Helper ──────────────────────────────────────────────────────────────────
function r(from, to) {
  html = html.split(from).join(to);
}
function re(pattern, to) {
  html = html.replace(pattern, to);
}

// ─── 1. Title & Head ─────────────────────────────────────────────────────────
r('Hompark | Real Estate &amp; Luxury Homes Theme – Just another WordPress site',
  'Chayce Properties Ltd | Luxury Senior Relocation Specialists');
r('Hompark | Real Estate &amp; Luxury Homes Theme',
  'Chayce Properties Ltd');
r('Hompark | Real Estate &amp; Luxury Homes Theme » Feed',
  'Chayce Properties Ltd » Feed');
r('Hompark | Real Estate &amp; Luxury Homes Theme » Comments Feed',
  'Chayce Properties Ltd » Comments Feed');

// ─── 2. Logo img → branded text logo ─────────────────────────────────────────
const textLogo = `<a href="" class="chayce-logo-link" style="text-decoration:none;display:inline-flex;align-items:center;gap:10px;">
  <span style="display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border:2px solid #b49a5e;border-radius:50%;color:#b49a5e;font-size:22px;font-weight:700;font-family:Georgia,serif;">C</span>
  <span style="display:flex;flex-direction:column;line-height:1.1;">
    <span style="font-family:Georgia,serif;font-size:18px;font-weight:700;color:#1a1a1a;letter-spacing:2px;">CHAYCE</span>
    <span style="font-family:Georgia,serif;font-size:9px;letter-spacing:3px;color:#b49a5e;font-weight:400;">PROPERTIES LTD</span>
  </span>
</a>`;

// Navbar logo
r(`<div class="logo"><a href=""><img src="images/wp-content_uploads_2020_03_logo.png" srcset="images/wp-content_uploads_2020_03_logo@2x.png" alt="Hompark | Real Estate &amp; Luxury Homes Theme"></a></div>`,
  `<div class="logo">${textLogo}</div>`);

// Side nav logo figure
r(`<figure> <img src="images/wp-content_uploads_2020_03_logo.png" alt="Image"> </figure>`,
  `<figure style="padding:10px 0;">${textLogo}</figure>`);

// Footer logo
r(`<img src="images/wp-content_uploads_2020_03_logo@2x.png" alt="Image" class="logo">`,
  `<div style="margin-bottom:16px;">${textLogo.replace('color:#1a1a1a', 'color:#fff').replace('color:#b49a5e;letter-spacing:3px', 'color:#b49a5e;letter-spacing:3px').replace('color:#1a1a1a', 'color:#fff')}</div>`);

// Preloader alt
r('alt="Hompark | Real Estate &amp; Luxury Homes Theme"', 'alt="Chayce Properties Ltd"');

// ─── 3. Navbar contact ────────────────────────────────────────────────────────
r('+380(98)298-59-73', '07708 925 432');
r('hello@homepark.com.ua', 'joyce@chayceproperties.com');
r('href="tel:+380(98)298-59-73"', 'href="tel:07708925432"');
r('href="mailto:hello@homepark.com.ua"', 'href="mailto:joyce@chayceproperties.com"');

// ─── 4. Navigation menu labels ───────────────────────────────────────────────
r('title="HOMEPARK" href="#" class="nav-link" data-text="HOMEPARK">HOMEPARK',
  'title="CHAYCE" href="#" class="nav-link" data-text="CHAYCE">CHAYCE');
r('title="About Hompark"', 'title="About Us"');
r('data-text="About Hompark">About Hompark', 'data-text="About Us">About Us');
r('title="Hompark Blocks"', 'title="Our Services"');
r('data-text="Hompark Blocks">Hompark Blocks', 'data-text="Our Services">Our Services');
r('title="APARTMENTS"', 'title="PACKAGES"');
r('data-text="APARTMENTS">APARTMENTS', 'data-text="PACKAGES">PACKAGES');
r('title="1 Room 47m²"', 'title="Discovery Consultation"');
r('data-text="1 Room 47m²">1 Room 47m²', 'data-text="Discovery">Discovery');
r('title="2 Rooms 65m²"', 'title="Bronze & Silver"');
r('data-text="2 Rooms 65m²">2 Rooms 65m²', 'data-text="Bronze &amp; Silver">Bronze &amp; Silver');
r('title="3 Rooms 90m²"', 'title="Gold Prestige"');
r('data-text="3 Rooms 90m²">3 Rooms 90m²', 'data-text="Gold Prestige">Gold Prestige');
r('title="4 Room 110m²"', 'title="Platinum Bespoke"');
r('data-text="4 Room 110m%c2%b2">4 Room 110m²', 'data-text="Platinum">Platinum');
r('data-text="4 Room 110m²">4 Room 110m²', 'data-text="Platinum">Platinum');
r('title="FACILITIES"', 'title="SERVICES"');
r('data-text="FACILITIES">FACILITIES', 'data-text="SERVICES">SERVICES');
r('title="NEWS"', 'title="NEWS"');

// ─── 5. Side nav description & address ───────────────────────────────────────
r('By aiming to take the life quality to an upper level with the whole realized Projects, Homepark continues to be the address of luxury.',
  'Guiding your next chapter with grace &amp; ease. Discreet, dignified, designed for you. The UK&rsquo;s premier luxury senior relocation specialists.');
r('Kyiv | G. Stalingrada Avenue, 6 \n    Vilnius | Antakalnio St. 17',
  'United Kingdom\n    chayceproperties.com');

// ─── 6. Preloader text rotater ────────────────────────────────────────────────
r('<span style="display: none;">Homepark</span>',  '<span style="display: none;">Chayce</span>');
r('<span style="display: inline;">Elements</span>', '<span style="display: inline;">Properties</span>');
r('<span style="display: none;">Loading</span>',   '<span style="display: none;">Loading</span>');

// ─── 7. Hero Slider ───────────────────────────────────────────────────────────
// Slide 1 (Udført / slide01)
r('<span>Udført</span> Luxury Residences',    '<span>Chayce</span> Properties Ltd');
r('Living Spaces in Pecherska - Kiev',         'Guiding your next chapter with grace &amp; ease');

// Slide 2 (Oxøme / slide02)
r('<span>Oxøme</span> Premium Flats',          '<span>Discreet.</span> Dignified.');
r('Provide a decent level of comfort',          'Designed for you — bespoke relocation for seniors');

// Slide 3 (Hømepark / slide03) — appears twice (original + duplicate)
r('<span>Hømepark</span> Elite Residences',    '<span>The UK&rsquo;s Premier</span> Luxury Relocation');
r('We build your dream house',                  'From sorting &amp; packing to settling in — we manage it all');

// CTA buttons
r('title="GET A CONSULTATION"> GET A CONSULTATION', 'title="GET A FREE CONSULTATION"> GET A FREE CONSULTATION');

// ─── 8. Section 01 — About ───────────────────────────────────────────────────
r('<h2><em>Pozniaky</em> Construction LLC</h2>\n  \t<h3>\n  Living spaces for creative peoples  </h3>',
  '<h2><em>Chayce</em> Properties Ltd</h2>\n  \t<h3>\n  The UK\'s Premier Luxury Senior Relocation Specialists  </h3>');

r('The smaller male cones release pollen,<br>\nwhich fertilizes the female</p>\n<p><a href="#"><img decoding="async" src="images/wp-content_uploads_2020_03_icon-m2.png" alt="Image">See our projects</a>',
  'Moving home is one of life\'s most significant transitions — and for seniors, it deserves to be handled with the utmost care, dignity, and discretion. We are a full-service relocation partner dedicated to guiding our clients through their next chapter with grace and compassion.</p>\n<p><a href="#">&#9830; Bespoke Moving Plans &nbsp; &#9830; Elegant Home Staging &nbsp; &#9830; Full Concierge Support</a>');

// ─── 9. Section 02 — Stats / Icon counters ───────────────────────────────────
r('alt="Near to Subway"', 'alt="Happy Clients"');
r('<h6>Near to Subway</h6>', '<h6>Happy Clients</h6>');
r('data-count="28"', 'data-count="98"');

r('alt="Spaces in Pozniaky"', 'alt="Packages Available"');
r('<h6>Spaces in Pozniaky</h6>', '<h6>Packages</h6>');
r('data-count="32"', 'data-count="5"');

r('alt="Key Delivery"', 'alt="Years Experience"');
r('<h6>Key Delivery</h6>', '<h6>Years Experience</h6>');
r('data-count="25"', 'data-count="12"');

r('alt="Clean Structure"', 'alt="5-Star Reviews"');
r('<h6>Clean Structure</h6>', '<h6>5-Star Reviews</h6>');
r('data-count="3"', 'data-count="4"');

r('alt="Size of flat"', 'alt="Clients Relocated"');
r('<h6>Size of flat</h6>', '<h6>Clients Relocated</h6>');
r('data-count="89"', 'data-count="650"');

r('<h2><em>Homepark</em> Property</h2>\n  \t<h3>\n  Decorated Flats in Pozniaky - Kiev  </h3>',
  '<h2><em>Why Choose</em> Chayce?</h2>\n  \t<h3>\n  Trusted by Families Across the UK  </h3>');

// ─── 10. Section 03 — Gallery ────────────────────────────────────────────────
r('<h2><em>Property</em> Inner Gallery</h2>\n  \t<h3>\n  Lux Living Spaces in Pozniaky - Kiev  </h3>',
  '<h2><em>Our Work</em> in Pictures</h2>\n  \t<h3>\n  A glimpse into the moves we manage with care  </h3>');

// ─── 11. Section 04 — Second about block ─────────────────────────────────────
r('<h2><em>Pozniaky</em> Construction LLC</h2>\n  \t<h3>\n  Living spaces for creative peoples  </h3>',
  '<h2><em>Our</em> Relocation Service</h2>\n  \t<h3>\n  A dedicated team working around you  </h3>');

r('The smaller male cones release pollen,<br>\nwhich fertilizes the female</p>\n<ul>\n<li><img decoding="async" src="images/wp-content_uploads_2020_03_bank-logos01.jpg" alt=""></li>\n<li><img decoding="async" src="images/wp-content_uploads_2020_03_bank-logos02.jpg" alt=""></li>\n</ul>\n<p><a href="#"><img decoding="async" src="images/wp-content_uploads_2020_03_icon-calculator.png" alt="">Living Space Calculator</a>',
  'From the moment you engage us, a dedicated team of specialists works around you — managing everything from sorting and packing to property staging, estate agent coordination, and settling you into your beautiful new home.</p>\n<p style="font-style:italic;border-left:3px solid #b49a5e;padding-left:12px;">&ldquo;From sorting and packing to selling and settling in — we manage it all, so you don\'t have to.&rdquo;</p>\n<p><a href="#">&#9830; Book a Free Discovery Consultation</a>');

// ─── 12. Section 05 — Packages (replaces floor plans tabs) ──────────────────
r('<h2><em>Homepark</em> Living Spaces</h2>\n  \t<h3>\n  Decorated Flats in Pozniaky - Kiev  </h3>',
  '<h2><em>Our</em> Relocation Packages</h2>\n  \t<h3>\n  Crafted precisely for your needs  </h3>');

r(`<p>We are waiting for you in our sales office for having all these opportunities with affordable prices and appropriate payment opportunities..</p>
<table>
<tbody>
<tr>
<td>Total area:</td>
<td>680 metre square</td>
</tr>
<tr>
<td>Total Floor:</td>
<td>24 Floor</td>
</tr>
<tr>
<td>Parking Lot:</td>
<td>5 Large</td>
</tr>
<tr>
<td>Social Area:</td>
<td>860 m²</td>
</tr>
</tbody>
</table>`,
  `<p>We offer five tailored packages so every senior has the right level of support for their unique journey.</p>
<table>
<tbody>
<tr>
<td>&#9670; Discovery Consultation</td>
<td>From £150</td>
</tr>
<tr>
<td>&#9670; Bronze Essentials</td>
<td>From £995</td>
</tr>
<tr>
<td>&#9670; Silver Comfort</td>
<td>From £1,850</td>
</tr>
<tr>
<td>&#9670; Gold Prestige</td>
<td>From £3,250</td>
</tr>
<tr>
<td>&#9670; Platinum Bespoke</td>
<td>From £6,500</td>
</tr>
</tbody>
</table>`);

// Tab labels → package names
r('<a class="nav-link active" data-toggle="pill" href="#tab-one">1 Room 47m²</a>',
  '<a class="nav-link active" data-toggle="pill" href="#tab-one">Bronze &amp; Silver</a>');
r('<a class="nav-link" data-toggle="pill" href="#tab-two" role="tab">2 Rooms 65m²</a>',
  '<a class="nav-link" data-toggle="pill" href="#tab-two" role="tab">Gold Prestige</a>');
r('<a class="nav-link" data-toggle="pill" href="#tab-three" role="tab">3 Rooms 90m²</a>',
  '<a class="nav-link" data-toggle="pill" href="#tab-three" role="tab">Platinum Bespoke</a>');

// ─── 13. Section 06 — Consultation CTA ───────────────────────────────────────
r('<h4>\n  <em>Homepark</em> Living Spaces  </h4>',
  '<h4>\n  <em>Chayce</em> Properties Ltd  </h4>');
r('<h3>\n  Are you interested to Homepark  </h3>',
  '<h3>\n  Ready to begin your next chapter?  </h3>');
r('The sun collectors, shall provide the electricity of the social areas of the site and shall do its part for protecting the environment.',
  'Our team is here to guide you every step of the way. From the initial consultation to the final unpack, we handle everything with care, compassion, and total discretion.');
r('title="SCHEDULE A VISIT">\n                        SCHEDULE A VISIT',
  'title="BOOK A CONSULTATION">\n                        BOOK A CONSULTATION');

// ─── 14. Section 07 — News ───────────────────────────────────────────────────
r('<h2><em>Homepark</em> Recent News</h2>',
  '<h2><em>Chayce</em> Latest News</h2>');
r('<small>\n  SMALLER MALE CONES  </small>',
  '<small>\n  UPDATES &amp; INSIGHTS  </small>');

r('Henry C. Turner Prize for Innovation in Construction Company',
  'How to Plan a Stress-Free Senior Move in 2026');
r('The Center for Construction Research and Training to Receive 2020 Award',
  'Top 5 Tips for Downsizing Your Family Home with Dignity');
r('50th Anniversary of the Turner School of Construction Management',
  'Why a Professional Relocation Partner Makes All the Difference');
r('<span>March 17, 2020</span>', '<span>June 2026</span>');

// ─── 15. Section 08 — Services icons ─────────────────────────────────────────
r('<h2><em>Homepark</em> Living Spaces</h2>\n  \t<h3>\n  Are you interested to Homepark  </h3>',
  '<h2><em>Our</em> Concierge Services</h2>\n  \t<h3>\n  Every detail handled with precision  </h3>');

// Row 1 service icons
r('<figcaption>Water Taps</figcaption>',   '<figcaption>Home Sorting</figcaption>');
r('<figcaption>Furniture</figcaption>',    '<figcaption>Packing &amp; Removals</figcaption>');
r('<figcaption>Electricity</figcaption>',  '<figcaption>Property Staging</figcaption>');
r('<figcaption>Wood Edition</figcaption>', '<figcaption>Estate Agent Liaison</figcaption>');
r('<figcaption>Ceramics</figcaption>',     '<figcaption>Legal Coordination</figcaption>');
r('<figcaption>Pipelines</figcaption>',    '<figcaption>Deep Cleaning</figcaption>');

// Row 2 service icons
r('<figcaption>Cimento</figcaption>',      '<figcaption>Chauffeur Viewings</figcaption>');
r('<figcaption>Hummer</figcaption>',       '<figcaption>Furniture Placement</figcaption>');
r('<figcaption>Digging</figcaption>',      '<figcaption>Unpacking &amp; Setup</figcaption>');
r('<figcaption>Raiser</figcaption>',       '<figcaption>Utility Transfers</figcaption>');
r('<figcaption>Screwsrive</figcaption>',   '<figcaption>Storage Solutions</figcaption>');
r('<figcaption>Blueprint</figcaption>',    '<figcaption>Concierge Support</figcaption>');

// Tooltip descriptions
html = html.replace(/data-original-title="The smaller male cones release pollen, which fertilizes"/g,
  'data-original-title="Professional relocation service by Chayce Properties Ltd"');

// ─── 16. Section 09 — Certificates ───────────────────────────────────────────
r('<h2><em>Property</em> Certificates</h2>',
  '<h2><em>Our</em> Accreditations</h2>');
r('<small>\n  SMALLER MALE CONES  </small>\n  \t\n\n</div>',
  '<small>\n  TRUSTED &amp; CERTIFIED  </small>\n  \t\n\n</div>');

// ─── 17. Footer bar (address strip) ──────────────────────────────────────────
r('<h3>Address Infos</h3>\n            <p>Kyiv | G. Stalingrada Avenue, 6<br>\nVilnius | Antakalnio St. 17</p>',
  '<h3>Our Address</h3>\n            <p>United Kingdom<br>\nchayceproperties.com</p>');

r('<h3>Working Hours</h3>\n            <p>Monday to Friday <strong>09:00</strong> to <strong>18:30</strong><br>\nSaturday we work until <strong>15:30</strong></p>',
  '<h3>Working Hours</h3>\n            <p>Monday to Friday <strong>09:00</strong> to <strong>17:30</strong><br>\nSaturday by appointment</p>');

r('<h3>Sales Office</h3>\n            <p>Boryssa Himry 124 B Block Pozniaky<br>\nKiev Oblast – Ukraine</p>',
  '<h3>Contact Us</h3>\n            <p>t: 07708 925 432<br>\ne: joyce@chayceproperties.com</p>');

// ─── 18. Footer widget ────────────────────────────────────────────────────────
r('By aiming to take the life quality to an upper level with the whole realized Projects, Homepark continues to be the address of luxury.',
  'Guiding your next chapter with grace &amp; ease. Discreet, dignified, designed for you &mdash; The UK&rsquo;s premier luxury senior relocation specialists.');

r('<li><a href="#">Homepark</a></li>',      '<li><a href="#">About Us</a></li>');
r('<li><a href="#">Apartments</a></li>\n          <li><a href="#">Facilities</a></li>',
  '<li><a href="#">Our Packages</a></li>\n          <li><a href="#">Services</a></li>');

r('<li><a href="#">Suites</a></li>',         '<li><a href="#">Discovery</a></li>');
r('<li><a href="#">Apartments</a></li>\n          <li><a href="#">Villas &amp; Houses</a></li>\n          <li><a href="#">Butique Room</a></li>\n          <li><a href="#">Buildings</a></li>',
  '<li><a href="#">Bronze Essentials</a></li>\n          <li><a href="#">Silver Comfort</a></li>\n          <li><a href="#">Gold Prestige</a></li>\n          <li><a href="#">Platinum Bespoke</a></li>');

r('<h5>CALL CENTER</h5>\n          <h3>+380(98)298-59-73</h3>\n          <p><a href="#">hello@homepark.com.ua</a></p>',
  '<h5>CONTACT US</h5>\n          <h3>07708 925 432</h3>\n          <p><a href="mailto:joyce@chayceproperties.com">joyce@chayceproperties.com</a></p>');

// ─── 19. Copyright ────────────────────────────────────────────────────────────
r('© 2026 Hompark - All rights reserved.',
  '© 2026 Chayce Properties Ltd — All rights reserved.');
r('Site created by <a href="https://www.themezinho.net">Themezinho</a>',
  'w: <a href="https://chayceproperties.com">chayceproperties.com</a>');

// ─── 20. Remaining stray "Hompark" / "Homepark" / "homepark" ─────────────────
r('Homepark', 'Chayce Properties Ltd');
r('Hompark',  'Chayce Properties Ltd');
r('homepark', 'chayceproperties');
r('Pozniaky - Kiev', 'United Kingdom');
r('Pozniaky', 'United Kingdom');

// ─── 21. Add custom CSS for text logo ────────────────────────────────────────
const customCss = `<style>
.chayce-logo-link { text-decoration: none !important; }
.chayce-logo-link:hover { opacity: 0.85; }
</style>`;
html = html.replace('</head>', customCss + '\n</head>');

fs.writeFileSync(htmlPath, html);
console.log('Rebranding complete! Open http://localhost:3000');
