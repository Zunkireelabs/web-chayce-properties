const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'template/index.html'), 'utf8');

// Locate section 05: the <section class="content-section"> immediately before the CTA section
const ctaMarker = '<section data-stellar-background-ratio';
const ctaIdx    = html.indexOf(ctaMarker);

const sec05End   = html.lastIndexOf('</section>', ctaIdx) + '</section>'.length;
const sec05Start = html.lastIndexOf('<section class="content-section">', ctaIdx);

const before = html.substring(0, sec05Start);
const after  = html.substring(sec05End);

/* ─── Inline SVG floor plan (gold line style) ──────────────────────────── */
function floorPlanSVG(variant) {
  /* variant 1 = basic layout, 2 = extended, 3 = full estate */
  const rooms = [
    // living room - large left
    { x:12, y:12, w:198, h:178, label:'LIVING ROOM', lx:111, ly:106 },
    // kitchen
    { x:12, y:190, w:128, h:68, label:'KITCHEN', lx:76,  ly:229 },
    // entrance hall
    { x:140, y:190, w:70, h:68, label:'HALL', lx:175, ly:229 },
    // master bedroom
    { x:210, y:12, w:178, h:143, label:'MASTER BEDROOM', lx:299, ly:89 },
    // bedroom 2
    { x:210, y:155, w:100, h:103, label:'BEDROOM 2', lx:260, ly:210 },
    // bathroom
    { x:310, y:155, w:78, h:103, label:'BATHROOM', lx:349, ly:210 },
  ];

  if (variant >= 2) {
    rooms.push({ x:210, y:190, w:70, h:68, label:'STUDY', lx:245, ly:229 });
  }

  const wallLines = [
    // vertical main split
    `<line x1="210" y1="12" x2="210" y2="258" stroke="#B8935A" stroke-width="2"/>`,
    // living / kitchen
    `<line x1="12" y1="190" x2="210" y2="190" stroke="#B8935A" stroke-width="2"/>`,
    // kitchen / hall
    `<line x1="140" y1="190" x2="140" y2="258" stroke="#B8935A" stroke-width="2"/>`,
    // bed1 / bed2+bath
    `<line x1="210" y1="155" x2="388" y2="155" stroke="#B8935A" stroke-width="2"/>`,
    // bed2 / bath
    `<line x1="310" y1="155" x2="310" y2="258" stroke="#B8935A" stroke-width="2"/>`,
  ];

  const doors = [
    // main entrance (bottom of hall)
    `<line x1="140" y1="258" x2="162" y2="258" stroke="#B8935A" stroke-width="2"/>
     <path d="M 140 258 A 22 22 0 0 1 162 236" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>`,
    // living → kitchen gap
    `<line x1="12" y1="212" x2="12" y2="232" stroke="#fff" stroke-width="3"/>
     <path d="M 12 212 A 20 20 0 0 0 32 212" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
     <line x1="12" y1="212" x2="32" y2="212" stroke="#B8935A" stroke-width="1"/>`,
    // master bedroom door
    `<line x1="210" y1="88" x2="210" y2="110" stroke="#fff" stroke-width="3"/>
     <path d="M 210 88 A 22 22 0 0 1 232 88" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
     <line x1="210" y1="88" x2="210" y2="110" stroke="#B8935A" stroke-width="0.5"/>`,
    // bathroom door
    `<line x1="310" y1="175" x2="310" y2="193" stroke="#fff" stroke-width="3"/>
     <path d="M 310 175 A 18 18 0 0 0 292 175" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
     <line x1="292" y1="175" x2="310" y2="175" stroke="#B8935A" stroke-width="1"/>`,
  ];

  const furniture = [
    // sofa (living room, bottom)
    `<rect x="28" y="155" width="90" height="24" rx="2" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.45"/>
     <rect x="26" y="153" width="14" height="28" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.45"/>
     <rect x="104" y="153" width="14" height="28" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.45"/>`,
    // coffee table
    `<rect x="48" y="138" width="50" height="14" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.35"/>`,
    // kitchen counter L
    `<rect x="18" y="196" width="114" height="14" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
     <rect x="18" y="196" width="14" height="56" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>`,
    // sink circle
    `<circle cx="80" cy="203" r="6" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>`,
    // master bed
    `<rect x="226" y="22" width="80" height="110" rx="2" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.45"/>
     <rect x="226" y="22" width="80" height="20" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.45"/>
     <circle cx="266" cy="34" r="5" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.35"/>
     <circle cx="282" cy="34" r="5" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.35"/>`,
    // bath tub
    `<rect x="318" y="220" width="62" height="30" rx="12" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>`,
    // toilet
    `<rect x="318" y="162" width="26" height="20" rx="4" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>`,
  ];

  const roomLabels = rooms.map(r =>
    `<text x="${r.lx}" y="${r.ly}" text-anchor="middle" fill="#B8935A"
      font-family="Georgia,serif" font-size="8" letter-spacing="1.8" opacity="0.85">${r.label}</text>`
  ).join('\n  ');

  return `<svg viewBox="0 0 400 270" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
  <rect width="400" height="270" fill="#faf8f4"/>
  <!-- outer walls -->
  <rect x="12" y="12" width="376" height="246" fill="none" stroke="#B8935A" stroke-width="3"/>
  <!-- internal walls -->
  ${wallLines.join('\n  ')}
  <!-- furniture -->
  ${furniture.join('\n  ')}
  <!-- doors -->
  ${doors.join('\n  ')}
  <!-- room labels -->
  ${roomLabels}
  <!-- north indicator -->
  <text x="384" y="26" text-anchor="end" fill="#B8935A" font-family="Georgia,serif" font-size="9" opacity="0.6" letter-spacing="1">N ↑</text>
  <!-- scale bar -->
  <line x1="18" y1="262" x2="78" y2="262" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <line x1="18" y1="258" x2="18" y2="266" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <line x1="78" y1="258" x2="78" y2="266" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <text x="48" y="258" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="7.5" opacity="0.55" letter-spacing="1">5m</text>
</svg>`;
}

/* ─── New section HTML ──────────────────────────────────────────────────── */
const newSection = `<section id="section-packages" style="padding:90px 0 80px;background:#fff;overflow:hidden;">
<style>
#section-packages .pkg-tab-btn{background:none;border:none;padding:11px 20px 13px;font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:#bbb;cursor:pointer;border-bottom:2px solid transparent;transition:.25s;font-family:'Poppins',sans-serif;font-weight:600;margin-bottom:-1px}
#section-packages .pkg-tab-btn.active,#section-packages .pkg-tab-btn:hover{color:#B8935A;border-bottom-color:#B8935A}
#section-packages .pkg-row{display:flex;align-items:baseline;padding:15px 0;border-bottom:1px solid #f0ece5;gap:12px;transition:opacity .3s}
#section-packages .pkg-row:last-child{border-bottom:none}
#section-packages .pkg-row.dimmed{opacity:.22}
#section-packages .pkg-name{font-weight:700;color:#B8935A;font-size:11px;letter-spacing:.8px;text-transform:uppercase;min-width:148px;flex-shrink:0;line-height:1.45;font-family:'Poppins',sans-serif}
#section-packages .pkg-desc{color:#aaa;font-size:13px;line-height:1.55;flex:1;font-family:'Poppins',sans-serif}
#section-packages .pkg-price{color:#26282b;font-weight:700;font-size:13.5px;white-space:nowrap;margin-left:auto;padding-left:18px;font-family:'Playfair',Georgia,serif;letter-spacing:.5px}
#section-packages .stat-card{text-align:center;padding:24px 10px;border:1px solid #e8e2d8;background:#fff;transition:.2s}
#section-packages .stat-card:hover{border-color:#B8935A}
#section-packages .stat-num{font-size:34px;font-weight:700;color:#B8935A;font-family:'Playfair',Georgia,serif;line-height:1;display:block}
#section-packages .stat-lbl{font-size:9.5px;letter-spacing:2.5px;text-transform:uppercase;color:#bbb;margin-top:6px;display:block;font-family:'Poppins',sans-serif}
#section-packages .plan-tab-lnk{font-size:10.5px;letter-spacing:2px;text-transform:uppercase;font-weight:600;font-family:'Poppins',sans-serif;cursor:pointer;transition:color .2s}
</style>
<div class="container">
  <div style="display:flex;gap:60px;align-items:flex-start;flex-wrap:wrap;">

    <!-- ── LEFT: section header + tabs + packages ── -->
    <div style="flex:1;min-width:280px;max-width:46%;">
      <div class="section-titles wow fadeInUp" style="visibility:visible;animation-name:fadeInUp;">
        <b>05</b>
        <h2><em>Chayce Properties Ltd</em> Living Spaces</h2>
        <h3>We offer five tailored packages so every senior has the right level of support</h3>
      </div>

      <!-- package tier tabs -->
      <div style="display:flex;border-bottom:1px solid #e8e2d8;margin:30px 0 0;gap:0;">
        <button class="pkg-tab-btn active" onclick="pkgSwitch(this,'bs')">Bronze &amp; Silver</button>
        <button class="pkg-tab-btn" onclick="pkgSwitch(this,'gp')">Gold Prestige</button>
        <button class="pkg-tab-btn" onclick="pkgSwitch(this,'pb')">Platinum Bespoke</button>
      </div>

      <!-- package rows (all visible; non-active tier is dimmed) -->
      <div>
        <div class="pkg-row" data-group="bs">
          <span class="pkg-name">Discovery<br>Consultation</span>
          <span class="pkg-desc">Expert guidance and a personalised move plan.</span>
          <span class="pkg-price">From £150</span>
        </div>
        <div class="pkg-row" data-group="bs">
          <span class="pkg-name">Bronze Essentials</span>
          <span class="pkg-desc">Packing, removals and light cleaning.</span>
          <span class="pkg-price">From £995</span>
        </div>
        <div class="pkg-row" data-group="bs">
          <span class="pkg-name">Silver Comfort</span>
          <span class="pkg-desc">Full-service move with a dedicated coordinator.</span>
          <span class="pkg-price">From £1,850</span>
        </div>
        <div class="pkg-row dimmed" data-group="gp">
          <span class="pkg-name">Gold Prestige</span>
          <span class="pkg-desc">Chauffeur viewings, staging, legal coordination &amp; more.</span>
          <span class="pkg-price">From £3,250</span>
        </div>
        <div class="pkg-row dimmed" data-group="pb">
          <span class="pkg-name">Platinum Bespoke</span>
          <span class="pkg-desc">Complete white-glove service for discerning clients.</span>
          <span class="pkg-price">From £6,500</span>
        </div>
      </div>

      <a href="contact/index.html"
         style="display:inline-block;margin-top:34px;padding:14px 36px;background:#B8935A;color:#fff;text-decoration:none;font-size:10.5px;letter-spacing:2.5px;text-transform:uppercase;font-weight:600;transition:.2s;font-family:'Poppins',sans-serif;"
         onmouseover="this.style.background='#26282b'" onmouseout="this.style.background='#B8935A'">
        Book a Free Consultation
      </a>
    </div>

    <!-- ── RIGHT: plan tabs + floor plan + stats ── -->
    <div style="flex:1;min-width:280px;max-width:50%;">

      <!-- plan selector tabs -->
      <div style="display:flex;justify-content:flex-end;gap:28px;margin-bottom:18px;align-items:center;">
        <span class="plan-tab-lnk" style="color:#B8935A;" onclick="planSwitch(this,'plan-one')">Bronze &amp; Silver</span>
        <span class="plan-tab-lnk" style="color:#ccc;" onclick="planSwitch(this,'plan-two')">Gold Prestige</span>
        <span class="plan-tab-lnk" style="color:#ccc;" onclick="planSwitch(this,'plan-three')">Platinum Bespoke</span>
      </div>

      <!-- floor plan panels -->
      <div style="background:#faf8f4;border:1px solid #e5dfd5;padding:30px 26px;">
        <div id="plan-one">
          ${floorPlanSVG(1)}
        </div>
        <div id="plan-two" style="display:none;">
          ${floorPlanSVG(2)}
        </div>
        <div id="plan-three" style="display:none;">
          ${floorPlanSVG(3)}
        </div>
      </div>

      <!-- stat cards -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:20px;">
        <div class="stat-card">
          <span class="stat-num">5</span>
          <span class="stat-lbl">Packages</span>
        </div>
        <div class="stat-card">
          <span class="stat-num" style="font-size:26px;">£150</span>
          <span class="stat-lbl">From</span>
        </div>
        <div class="stat-card">
          <span class="stat-num" style="font-size:22px;letter-spacing:1px;">UK</span>
          <span class="stat-lbl">Nationwide</span>
        </div>
      </div>

    </div>
  </div>
</div>

<script>
(function(){
  function pkgSwitch(btn, grp) {
    document.querySelectorAll('#section-packages .pkg-tab-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('#section-packages .pkg-row').forEach(function(r){
      r.classList.toggle('dimmed', r.dataset.group !== grp);
    });
  }
  window.pkgSwitch = pkgSwitch;

  function planSwitch(el, planId) {
    ['plan-one','plan-two','plan-three'].forEach(function(id){
      document.getElementById(id).style.display = 'none';
    });
    document.getElementById(planId).style.display = 'block';
    el.closest('div').querySelectorAll('.plan-tab-lnk').forEach(function(s){ s.style.color = '#ccc'; });
    el.style.color = '#B8935A';
    // sync left-column tabs too
    var grpMap = {'plan-one':'bs','plan-two':'gp','plan-three':'pb'};
    var tabMap = {'bs':0,'gp':1,'pb':2};
    var btns = document.querySelectorAll('#section-packages .pkg-tab-btn');
    var grp = grpMap[planId];
    btns.forEach(function(b){ b.classList.remove('active'); });
    btns[tabMap[grp]].classList.add('active');
    document.querySelectorAll('#section-packages .pkg-row').forEach(function(r){
      r.classList.toggle('dimmed', r.dataset.group !== grp);
    });
  }
  window.planSwitch = planSwitch;
})();
</script>
</section>`;

html = before + newSection + after;
fs.writeFileSync(path.join(__dirname, 'template/index.html'), html);
console.log('Section 05 rebuilt successfully.');
