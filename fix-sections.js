const fs   = require('fs');
const path = require('path');
const file = path.join(__dirname, 'template', 'index.html');
let html   = fs.readFileSync(file, 'utf8');

// ─────────────────────────────────────────────────────────────────────────────
// 1.  SECTION 05 — remove right-side duplicate tab links, wire left tabs to
//     floor plan switching so one click controls both package rows + floor plan
// ─────────────────────────────────────────────────────────────────────────────

// Remove the right-column plan-tab-lnk div (keep floor plan panels beneath it)
html = html.replace(
  /\s*<!-- plan selector tabs -->\s*<div[^>]*>[\s\S]*?<\/div>\s*\n(\s*<!-- floor plan panels -->)/,
  '\n      <!-- floor plan panels -->'
);

// Rewrite pkgSwitch so clicking a left tab also switches the floor plan
const oldPkgSwitch =
`  function pkgSwitch(btn, grp) {
    document.querySelectorAll('#section-packages .pkg-tab-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('#section-packages .pkg-row').forEach(function(r){
      r.classList.toggle('dimmed', r.dataset.group !== grp);
    });
  }
  window.pkgSwitch = pkgSwitch;`;

const newPkgSwitch =
`  var grpToPlan = {bs:'plan-one', gp:'plan-two', pb:'plan-three'};
  function pkgSwitch(btn, grp) {
    // update left-column tab buttons
    document.querySelectorAll('#section-packages .pkg-tab-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    // dim non-active package rows
    document.querySelectorAll('#section-packages .pkg-row').forEach(function(r){
      r.classList.toggle('dimmed', r.dataset.group !== grp);
    });
    // switch floor plan panel
    ['plan-one','plan-two','plan-three'].forEach(function(id){
      document.getElementById(id).style.display = 'none';
    });
    var planId = grpToPlan[grp];
    if (planId) document.getElementById(planId).style.display = 'block';
  }
  window.pkgSwitch = pkgSwitch;`;

html = html.replace(oldPkgSwitch, newPkgSwitch);

// ─────────────────────────────────────────────────────────────────────────────
// 2.  SECTION 06 — replace with luxury gold two-column CTA
//     (Hompark consultation-box layout: uses the original CSS class + structure
//      but adapted to full-width gold card with right-side bullet content)
// ─────────────────────────────────────────────────────────────────────────────

const ctaStart  = html.indexOf('<section data-stellar-background-ratio');
const afterNews = html.indexOf('<section class="content-section">', ctaStart + 10);
const ctaEnd    = html.lastIndexOf('</section>', afterNews) + '</section>'.length;

const newCTA = `<section id="section-cta" class="content-section no-spacing" style="background:#8B6914;overflow:hidden;position:relative;">
  <!-- geometric background shapes -->
  <div aria-hidden="true" style="pointer-events:none;position:absolute;inset:0;overflow:hidden;">
    <div style="position:absolute;top:-120px;right:-80px;width:480px;height:480px;border-radius:50%;border:1px solid rgba(255,255,255,0.07);"></div>
    <div style="position:absolute;bottom:-160px;right:60px;width:360px;height:360px;border-radius:50%;border:1px solid rgba(255,255,255,0.05);"></div>
    <div style="position:absolute;top:0;left:0;width:0;height:0;border-style:solid;border-width:340px 0 0 260px;border-color:transparent transparent transparent rgba(255,255,255,0.04);"></div>
    <div style="position:absolute;bottom:0;right:0;width:0;height:0;border-style:solid;border-width:0 0 200px 180px;border-color:transparent transparent rgba(255,255,255,0.04) transparent;"></div>
  </div>

  <div class="container" style="position:relative;z-index:1;">
    <div class="row" style="padding:90px 0;align-items:center;">

      <!-- LEFT: headline + CTA -->
      <div class="col-lg-6" style="padding-right:60px;">
        <b style="display:block;font-size:32px;font-weight:800;color:rgba(255,255,255,0.15);letter-spacing:3px;line-height:1;margin-bottom:8px;font-family:'Playfair',Georgia,serif;">06</b>
        <p style="font-family:'Poppins',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:14px;">
          <span style="opacity:0.6;">Chayce</span> &nbsp;<span style="font-weight:600;color:rgba(255,255,255,0.9);">Properties Ltd</span>
        </p>
        <h3 style="font-family:'Playfair',Georgia,serif;font-size:38px;font-weight:700;color:#fff;line-height:1.25;margin-bottom:22px;">Guiding your next chapter<br>with grace &amp; ease</h3>
        <p style="color:rgba(255,255,255,0.78);font-size:15px;line-height:1.8;margin-bottom:38px;max-width:430px;">Discreet. Dignified. Designed for you. Whether you need a Discovery Consultation or a fully bespoke Platinum service, our dedicated team is here to make your move seamless.</p>
        <a href="contact/"
           style="display:inline-flex;align-items:center;gap:14px;height:58px;padding:0 38px;background:#1a1a1a;color:#fff;text-decoration:none;font-family:'Poppins',sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;font-weight:600;box-shadow:0 10px 28px rgba(0,0,0,0.35);transition:.25s;"
           onmouseover="this.style.background='#fff';this.style.color='#8B6914';"
           onmouseout="this.style.background='#1a1a1a';this.style.color='#fff';">
          <span style="display:inline-block;width:7px;height:7px;background:currentColor;flex-shrink:0;"></span>
          Book a Consultation
        </a>
      </div>

      <!-- RIGHT: bullets + contact -->
      <div class="col-lg-6" style="padding-left:60px;border-left:1px solid rgba(255,255,255,0.18);">
        <div style="display:flex;flex-direction:column;gap:22px;margin-bottom:38px;">

          <div style="display:flex;gap:18px;align-items:flex-start;">
            <span style="width:7px;height:7px;border-radius:50%;background:#fff;margin-top:7px;flex-shrink:0;opacity:0.9;"></span>
            <div>
              <div style="color:#fff;font-weight:600;font-size:13.5px;letter-spacing:.3px;font-family:'Poppins',sans-serif;margin-bottom:3px;">Bespoke moving plans</div>
              <div style="color:rgba(255,255,255,0.6);font-size:13px;font-family:'Poppins',sans-serif;">Tailored to your exact needs</div>
            </div>
          </div>

          <div style="display:flex;gap:18px;align-items:flex-start;">
            <span style="width:7px;height:7px;border-radius:50%;background:#fff;margin-top:7px;flex-shrink:0;opacity:0.9;"></span>
            <div>
              <div style="color:#fff;font-weight:600;font-size:13.5px;letter-spacing:.3px;font-family:'Poppins',sans-serif;margin-bottom:3px;">Elegant home staging</div>
              <div style="color:rgba(255,255,255,0.6);font-size:13px;font-family:'Poppins',sans-serif;">Present your property at its finest</div>
            </div>
          </div>

          <div style="display:flex;gap:18px;align-items:flex-start;">
            <span style="width:7px;height:7px;border-radius:50%;background:#fff;margin-top:7px;flex-shrink:0;opacity:0.9;"></span>
            <div>
              <div style="color:#fff;font-weight:600;font-size:13.5px;letter-spacing:.3px;font-family:'Poppins',sans-serif;margin-bottom:3px;">Full concierge support</div>
              <div style="color:rgba(255,255,255,0.6);font-size:13px;font-family:'Poppins',sans-serif;">From first call to final key</div>
            </div>
          </div>

          <div style="display:flex;gap:18px;align-items:flex-start;">
            <span style="width:7px;height:7px;border-radius:50%;background:#fff;margin-top:7px;flex-shrink:0;opacity:0.9;"></span>
            <div>
              <div style="color:#fff;font-weight:600;font-size:13.5px;letter-spacing:.3px;font-family:'Poppins',sans-serif;margin-bottom:3px;">Property &amp; sales coordination</div>
              <div style="color:rgba(255,255,255,0.6);font-size:13px;font-family:'Poppins',sans-serif;">Estate agents, legal &amp; more handled for you</div>
            </div>
          </div>

        </div>

        <!-- divider + contact -->
        <div style="border-top:1px solid rgba(255,255,255,0.22);padding-top:30px;display:flex;gap:36px;flex-wrap:wrap;align-items:center;">
          <a href="tel:07708925432"
             style="color:#fff;text-decoration:none;font-family:'Playfair',Georgia,serif;font-size:17px;font-weight:700;letter-spacing:.5px;">
            07708 925 432
          </a>
          <a href="mailto:joyce@chayceproperties.com"
             style="color:rgba(255,255,255,0.65);text-decoration:none;font-family:'Poppins',sans-serif;font-size:12.5px;transition:.2s;"
             onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">
            joyce@chayceproperties.com
          </a>
        </div>
      </div>

    </div>
  </div>
</section>`;

html = html.substring(0, ctaStart) + newCTA + html.substring(ctaEnd);

// ─────────────────────────────────────────────────────────────────────────────
// 3.  SECTION 01 — about section: restore the Hompark original side-image look
//     using a clean flex split-screen (photo left, text right) with no broken
//     transforms. This gives the "just below the hero" side-image feel without
//     the overlap we had to fix earlier.
// ─────────────────────────────────────────────────────────────────────────────

// Find the about section bounds (section.content-section.no-spacing containing side-image-left)
const aboutStart = html.indexOf('<section class="content-section no-spacing"><div class="container"><div class="vc_row wpb_row vc_row-fluid vc_row-o-content-middle vc_row-flex"><div class="wpb_column vc_column_container vc_col-sm-12 vc_col-md-6"><div class="vc_column-inner"><div class="wpb_wrapper">       \n           \n                <figure class="side-image-left');

// find end of that section
const aboutSectionClose = html.indexOf('</section>', aboutStart) + '</section>'.length;

const newAbout = `<section class="content-section no-spacing" style="overflow:hidden;">
  <div style="display:flex;min-height:560px;align-items:stretch;">

    <!-- left: photo -->
    <div style="flex:0 0 50%;position:relative;overflow:hidden;min-height:500px;">
      <img src="images/chayce-about.jpg" alt="Senior relocation consultation"
           style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;">
      <!-- gold accent corner -->
      <div style="position:absolute;bottom:0;left:0;width:72px;height:72px;background:var(--color-brown);opacity:0.75;"></div>
    </div>

    <!-- right: text -->
    <div class="side-image-right wow fadeInUp" style="flex:0 0 50%;padding:72px 64px;display:flex;align-items:center;background:#fff;visibility:visible;animation-name:fadeInUp;">
      <div>
        <div class="section-titles" style="margin-bottom:24px;">
          <b style="font-size:30px;font-weight:800;opacity:0.12;display:block;color:var(--color-dark);">01</b>
          <h2 style="margin-top:6px;"><em>Chayce</em> Properties Ltd</h2>
          <h3 style="margin-top:8px;">The UK&rsquo;s Premier Luxury Senior Relocation Specialists</h3>
        </div>
        <p>Moving home is one of life&rsquo;s most significant transitions &mdash; and for seniors, it deserves to be handled with the utmost care, dignity, and discretion. At Chayce Properties Ltd, we have built our entire service around that belief. We are not simply a removal company. We are a full-service relocation partner, dedicated to guiding our clients through their next chapter with grace, compassion, and unparalleled attention to detail.</p>
        <p style="margin-top:16px;">&#9830; Bespoke Moving Plans &nbsp;&nbsp; &#9830; Elegant Home Staging &nbsp;&nbsp; &#9830; Full Concierge Support</p>
        <p style="margin-top:10px;">&#9830; Property Preparation, Sales Support and Relocation Concierge Services</p>
      </div>
    </div>

  </div>
</section>`;

html = html.substring(0, aboutStart) + newAbout + html.substring(aboutSectionClose);

fs.writeFileSync(file, html);
console.log('✓ Section 05 tabs fixed — left tabs now control floor plan');
console.log('✓ Section 06 replaced with gold two-column CTA');
console.log('✓ Section 01 about section restored to split-screen design');
