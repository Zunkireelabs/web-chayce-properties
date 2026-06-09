const fs   = require('fs');
const path = require('path');
const file = path.join(__dirname, 'template', 'index.html');
let html   = fs.readFileSync(file, 'utf8');

// ── RESTORE SECTION 01 ───────────────────────────────────────────────────────
// Replace the current flex split-screen with the original scraped side-image-left HTML

const sec01Old = `<section class="content-section no-spacing" style="overflow:hidden;">
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

const sec01New = `<section class="content-section no-spacing"><div class="container"><div class="vc_row wpb_row vc_row-fluid vc_row-o-content-middle vc_row-flex"><div class="wpb_column vc_column_container vc_col-sm-12 vc_col-md-6"><div class="vc_column-inner"><div class="wpb_wrapper">

                <figure class="side-image-left ">
					 <div class="pattern-bg" data-stellar-ratio="1.07" style="top: -32.8438px;"></div>
          <!-- end pattern-bg -->
					 <div class="holder" data-stellar-ratio="1.10" style="top: 0px;">  <img decoding="async" src="images/chayce-about.jpg" alt="Senior relocation consultation" style="width:100%;height:100%;object-fit:cover;"></div>
          <!-- end holder -->

                </figure>



		</div></div></div><div class="wpb_column vc_column_container vc_col-sm-12 vc_col-md-6"><div class="vc_column-inner vc_custom_1584953605262"><div class="wpb_wrapper"><div class="section-titles

			 wow fadeInUp" style="visibility: visible; animation-name: fadeInUp;">

	  <b>
  01  </b>




    <h2><em>Chayce</em> Properties Ltd</h2>

  <h3>
  The UK's Premier Luxury Senior Relocation Specialists  </h3>




	</div>
		<div class="side-image-right wow fadeInUp" style="visibility: visible; animation-name: fadeInUp;">
			<p>Moving home is one of life's most significant transitions — and for seniors, it deserves to be handled with the utmost care, dignity, and discretion. At Chayce Properties Ltd, we have built our entire service around that belief. We are not simply a removal company. We are a full-service relocation partner, dedicated to guiding our clients through their next chapter with grace, compassion, and unparalleled attention to detail.</p>
<p>&#9830; Bespoke Moving Plans &nbsp;&nbsp; &#9830; Elegant Home Staging &nbsp;&nbsp; &#9830; Full Concierge Support</p>
<p>&#9830; Property Preparation, Sales Support and Relocation Concierge Services</p>

            		</div>
		</div></div></div></div></div></section>`;

if (html.includes(sec01Old)) {
  html = html.replace(sec01Old, sec01New);
  console.log('✓ Section 01 restored to original side-image-left layout');
} else {
  console.error('✗ Section 01 old string not matched — check whitespace');
}

// ── RESTORE SECTION 06 ───────────────────────────────────────────────────────
// Find the gold CTA section we added and replace with the original consultation-box

const sec06Start = html.indexOf('<section id="section-cta"');
const sec06End   = html.indexOf('</section>', sec06Start) + '</section>'.length;

const sec06New = `<section data-stellar-background-ratio="0.9" class="content-section bg-image no-spacing" style="background: url(&quot;images/chayce-bg.jpg&quot;) 50% 50% no-repeat; background-size: cover;"><div class="container"><div class="vc_row wpb_row vc_row-fluid vc_custom_1584771006452"><div class="wpb_column vc_column_container vc_col-sm-8 vc_col-md-6"><div class="vc_column-inner"><div class="wpb_wrapper">		<div class="consultation-box wow fadeInUp" style="visibility: visible; animation-name: fadeInUp;">




				  <b>
  06  </b>

				  <h4>
  <em>Chayce</em> Properties Ltd  </h4>

				  <h3>
  Guiding Your Next Chapter with Grace &amp; Ease  </h3>








			<p>Discreet. Dignified. Designed for you. Whether you need a Discovery Consultation or a fully bespoke Platinum service, our dedicated team is here to make your move seamless.</p>

                                <a href="contact/" title="BOOK A CONSULTATION">
                        BOOK A CONSULTATION <i class="fas fa-caret-right"></i>
                    </a>

            		</div>
		</div></div></div><div class="wpb_column vc_column_container vc_col-sm-6"><div class="vc_column-inner"><div class="wpb_wrapper"></div></div></div></div></div></section>`;

if (sec06Start !== -1) {
  html = html.substring(0, sec06Start) + sec06New + html.substring(sec06End);
  console.log('✓ Section 06 restored to original consultation-box layout');
} else {
  console.error('✗ Section 06 (section-cta) not found');
}

fs.writeFileSync(file, html);
console.log('Done — both sections restored.');
