const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'template', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

function r(from, to) { html = html.split(from).join(to); }

// ═══════════════════════════════════════════════════════════════════════
// 1. HERO SLIDER — exact slogan from ad + new images
// ═══════════════════════════════════════════════════════════════════════

// Slide 1 (hero1 — consultant with elderly couple)
r('data-background="images/wp-content_uploads_2020_03_slide01.jpg"',
  'data-background="images/chayce-hero1.jpg"');
r('background-image: url(&quot;images/wp-content_uploads_2020_03_slide01.jpg&quot;)',
  'background-image: url("images/chayce-hero1.jpg")');
r('<span>Chayce</span> Properties Ltd',
  '<span>Downsizing</span> &amp; Relocation');
r('Guiding your next chapter with grace &amp; ease',
  'Experts in Senior Home Moves Across the UK');

// Slide 2 (hero2 — luxury UK house)
r('data-background="images/wp-content_uploads_2020_03_slide02.jpg"',
  'data-background="images/chayce-hero2.jpg"');
r('background-image: url(&quot;images/wp-content_uploads_2020_03_slide02.jpg&quot;)',
  'background-image: url("images/chayce-hero2.jpg")');
r('<span>Discreet.</span> Dignified.',
  '<span>Bespoke</span> Moving Plans');
r('Designed for you — bespoke relocation for seniors',
  'Elegant Home Staging &amp; Full Concierge Support');

// Slide 3 (hero3 — professional movers)
r('data-background="images/wp-content_uploads_2020_03_slide03.jpg"',
  'data-background="images/chayce-hero3.jpg"');
r('background-image: url(&quot;images/wp-content_uploads_2020_03_slide03.jpg&quot;)',
  'background-image: url("images/chayce-hero3.jpg")');
r('<span>The UK&rsquo;s Premier</span> Luxury Relocation',
  '<span>Guiding</span> Your Next Chapter');
r('From sorting &amp; packing to settling in — we manage it all',
  'With Grace &amp; Ease &mdash; Discreet, Dignified, Designed for You');

// ═══════════════════════════════════════════════════════════════════════
// 2. SECTION 01 — about image + exact ad copy
// ═══════════════════════════════════════════════════════════════════════
r('src="images/wp-content_uploads_2020_03_side-image01.jpg" alt="side-image01"',
  'src="images/chayce-about.jpg" alt="Senior relocation consultation"');

r('<h2><em>Chayce</em> Properties Ltd</h2>\n  \t<h3>\n  The UK\'s Premier Luxury Senior Relocation Specialists  </h3>',
  '<h2><em>Chayce</em> Properties Ltd</h2>\n  \t<h3>\n  The UK\'s Premier Luxury Senior Relocation Specialists  </h3>');

// Replace placeholder body text with exact ad copy
r('Moving home is one of life\'s most significant transitions — and for seniors, it deserves to be handled with the utmost care, dignity, and discretion. We are a full-service relocation partner dedicated to guiding our clients through their next chapter with grace and compassion.</p>\n<p>&#9830; Bespoke Moving Plans &nbsp; &#9830; Elegant Home Staging &nbsp; &#9830; Full Concierge Support',
  'Moving home is one of life\'s most significant transitions — and for seniors, it deserves to be handled with the utmost care, dignity, and discretion. At Chayce Properties Ltd, we have built our entire service around that belief. We are not simply a removal company. We are a full-service relocation partner, dedicated to guiding our clients through their next chapter with grace, compassion, and unparalleled attention to detail.</p>\n<p>&#9830; Bespoke Moving Plans &nbsp;&nbsp; &#9830; Elegant Home Staging &nbsp;&nbsp; &#9830; Full Concierge Support</p>\n<p>&#9830; Property Preparation, Sales Support and Relocation Concierge Services');

// ═══════════════════════════════════════════════════════════════════════
// 3. SECTION 02 — section heading
// ═══════════════════════════════════════════════════════════════════════
r('<h2><em>Why Choose</em> Chayce?</h2>\n  \t<h3>\n  Trusted by Families Across the UK  </h3>',
  '<h2><em>Why Choose</em> Chayce?</h2>\n  \t<h3>\n  Trusted by Families Across the UK  </h3>');

// ═══════════════════════════════════════════════════════════════════════
// 4. SECTION 03 — gallery images
// ═══════════════════════════════════════════════════════════════════════
r('src="images/wp-content_uploads_2020_03_gallery-thumb01.jpg" alt="Image"',
  'src="images/chayce-gallery1.jpg" alt="Beautifully staged living room"');
r('src="images/wp-content_uploads_2020_03_gallery-thumb02.jpg" alt="Image"',
  'src="images/chayce-gallery2.jpg" alt="Professional careful packing"');
r('src="images/wp-content_uploads_2020_03_gallery-thumb03.jpg" alt="Image"',
  'src="images/chayce-gallery3.jpg" alt="Happy senior couple in new home"');

r('<h2><em>Our Work</em> in Pictures</h2>\n  \t<h3>\n  A glimpse into the moves we manage with care  </h3>',
  '<h2><em>Our Work</em> in Pictures</h2>\n  \t<h3>\n  A glimpse into the moves we manage with care  </h3>');

// ═══════════════════════════════════════════════════════════════════════
// 5. SECTION 04 — second about image + exact second ad paragraph
// ═══════════════════════════════════════════════════════════════════════
r('src="images/wp-content_uploads_2020_03_side-image02.jpg" alt="side-image02"',
  'src="images/chayce-about2.jpg" alt="Professional home staging"');

r('From the moment you engage us, a dedicated team of specialists works around you — managing everything from sorting and packing to property staging, estate agent coordination, and settling you into your beautiful new home.</p>\n<p style="font-style:italic;border-left:3px solid #b49a5e;padding-left:12px;">&ldquo;From sorting and packing to selling and settling in — we manage it all, so you don\'t have to.&rdquo;</p>\n<p><a href="#">&#9830; Book a Free Discovery Consultation</a>',
  'From the moment you engage us, a dedicated team of specialists works around you — managing everything from sorting and packing to property staging, estate agent coordination, and settling you into your beautiful new home. Whether you require a straightforward assisted move or a fully bespoke white-glove service, we have a package crafted precisely for your needs.</p>\n<p style="font-style:italic;border-left:3px solid #b49a5e;padding-left:12px;margin:20px 0;">&ldquo;From sorting and packing to selling and settling in — we manage it all, so you don&rsquo;t have to.&rdquo;</p>\n<p><a href="contact/index.html">&#9830; Book a Free Discovery Consultation</a>');

// ═══════════════════════════════════════════════════════════════════════
// 6. SECTION 05 — packages table with exact ad prices & descriptions
// ═══════════════════════════════════════════════════════════════════════
r('<td>&#9670; Discovery Consultation</td>\n<td>From £150</td>',
  '<td><strong>Discovery Consultation</strong> — Expert guidance and a personalised move plan.</td>\n<td>From £150</td>');
r('<td>&#9670; Bronze Essentials</td>\n<td>From £995</td>',
  '<td><strong>Bronze Essentials</strong> — Packing, removals and light cleaning.</td>\n<td>From £995</td>');
r('<td>&#9670; Silver Comfort</td>\n<td>From £1,850</td>',
  '<td><strong>Silver Comfort</strong> — Full-service move with a dedicated coordinator.</td>\n<td>From £1,850</td>');
r('<td>&#9670; Gold Prestige</td>\n<td>From £3,250</td>',
  '<td><strong>Gold Prestige</strong> — Chauffeur viewings, staging, legal coordination &amp; more.</td>\n<td>From £3,250</td>');
r('<td>&#9670; Platinum Bespoke</td>\n<td>From £6,500</td>',
  '<td><strong>Platinum Bespoke</strong> — Complete white-glove service for discerning clients.</td>\n<td>From £6,500</td>');

// Section heading
r('<h2><em>Our</em> Relocation Packages</h2>\n  \t<h3>\n  Crafted precisely for your needs  </h3>',
  '<h2><em>Our</em> Relocation Packages</h2>\n  \t<h3>\n  Downsizing &amp; Relocation Packages  </h3>');

// ═══════════════════════════════════════════════════════════════════════
// 7. SECTION 06 — CTA background image + exact ad slogan
// ═══════════════════════════════════════════════════════════════════════
r('background: url(&quot;images/wp-content_uploads_2020_03_section-bg01.jpg&quot;) 50% 50% no-repeat',
  'background: url("images/chayce-bg.jpg") 50% 50% no-repeat; background-size: cover');

r('<h4>\n  <em>Chayce</em> Properties Ltd  </h4>',
  '<h4>\n  <em>Chayce</em> Properties Ltd  </h4>');
r('<h3>\n  Ready to begin your next chapter?  </h3>',
  '<h3>\n  Guiding Your Next Chapter with Grace &amp; Ease  </h3>');
r('Our team is here to guide you every step of the way. From the initial consultation to the final unpack, we handle everything with care, compassion, and total discretion.',
  'Discreet. Dignified. Designed for you. Whether you need a Discovery Consultation or a fully bespoke Platinum service, our dedicated team is here to make your move seamless.');

// ═══════════════════════════════════════════════════════════════════════
// 8. SECTION 07 — news images
// ═══════════════════════════════════════════════════════════════════════
r('src="images/wp-content_uploads_2020_03_blog01.jpg"',
  'src="images/chayce-news1.jpg"');
r('src="images/wp-content_uploads_2020_03_blog02.jpg"',
  'src="images/chayce-news2.jpg"');
r('src="images/wp-content_uploads_2020_03_blog03.jpg"',
  'src="images/chayce-news3.jpg"');

// ═══════════════════════════════════════════════════════════════════════
// 9. SECTION 08 — services icon titles match ad services exactly
// ═══════════════════════════════════════════════════════════════════════
r('<h2><em>Our</em> Concierge Services</h2>\n  \t<h3>\n  Every detail handled with precision  </h3>',
  '<h2><em>Our</em> Concierge Services</h2>\n  \t<h3>\n  Property Preparation, Sales Support &amp; Relocation Concierge  </h3>');

// ═══════════════════════════════════════════════════════════════════════
// 10. Fix logo SVG — add "CHAYCE" text (was cut off in SVG)
// ═══════════════════════════════════════════════════════════════════════

fs.writeFileSync(path.join(__dirname, 'template', 'images', 'chayce-logo.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" width="280" height="64" viewBox="0 0 280 64">
  <circle cx="32" cy="32" r="28" fill="none" stroke="#c8a96e" stroke-width="2"/>
  <text x="32" y="41" font-family="Georgia,serif" font-size="28" font-weight="700" fill="#c8a96e" text-anchor="middle">C</text>
  <line x1="8" y1="32" x2="17" y2="32" stroke="#c8a96e" stroke-width="0.8"/>
  <line x1="47" y1="32" x2="56" y2="32" stroke="#c8a96e" stroke-width="0.8"/>
  <text x="74" y="30" font-family="Georgia,serif" font-size="26" font-weight="700" fill="#ffffff" letter-spacing="4">CHAYCE</text>
  <line x1="74" y1="36" x2="272" y2="36" stroke="#c8a96e" stroke-width="0.7"/>
  <text x="74" y="52" font-family="Georgia,serif" font-size="11" font-weight="400" fill="#c8a96e" letter-spacing="5">PROPERTIES LTD</text>
</svg>`);

// ═══════════════════════════════════════════════════════════════════════
// 11. Fix navbar phone href (remove space)
// ═══════════════════════════════════════════════════════════════════════
r('href="tel:07708 925 432"', 'href="tel:07708925432"');

fs.writeFileSync(htmlPath, html);
console.log('Content audit + image update complete!');
