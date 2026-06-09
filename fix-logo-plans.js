const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'template', 'index.html');
const gpjs = path.join(__dirname, 'generate-pages.js');

// ── 1. LOGO: swap SVG → PNG in index.html and generate-pages.js ─────────────
let html = fs.readFileSync(file, 'utf8');
html = html.replace(
  'src="images/chayce-logo.svg" alt="Chayce Properties Ltd" style="height:54px;width:auto;"',
  'src="images/chayce-logo.png" alt="Chayce Properties Ltd" style="height:58px;width:auto;"'
);
console.log('✓ Logo updated in index.html');

let gp = fs.readFileSync(gpjs, 'utf8');
gp = gp.replace(
  'src="${p}images/chayce-logo.svg" alt="Chayce Properties Ltd" style="height:54px;width:auto;"',
  'src="${p}images/chayce-logo.png" alt="Chayce Properties Ltd" style="height:58px;width:auto;"'
);
fs.writeFileSync(gpjs, gp);
console.log('✓ Logo updated in generate-pages.js');

// ── 2. FLOOR PLANS: replace all three with clearly distinct layouts ──────────

// ── Plan One: Bronze & Silver — compact 1-bed flat ──────────────────────────
// Layout: large open living/dining left, kitchen bottom-left,
//         bedroom top-right, bathroom bottom-right, hall centre
const plan1 = `<svg viewBox="0 0 400 270" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
  <rect width="400" height="270" fill="#faf8f4"/>
  <!-- outer walls -->
  <rect x="12" y="12" width="376" height="246" fill="none" stroke="#B8935A" stroke-width="3"/>
  <!-- vertical split: left zone | right zone at x=245 -->
  <line x1="245" y1="12" x2="245" y2="258" stroke="#B8935A" stroke-width="2"/>
  <!-- left zone horizontal: living | kitchen at y=170 -->
  <line x1="12" y1="170" x2="245" y2="170" stroke="#B8935A" stroke-width="2"/>
  <!-- right zone horizontal: bedroom | bath+wc at y=178 -->
  <line x1="245" y1="178" x2="388" y2="178" stroke="#B8935A" stroke-width="2"/>
  <!-- bathroom vertical: bath | wc at x=330 -->
  <line x1="330" y1="178" x2="330" y2="258" stroke="#B8935A" stroke-width="2"/>
  <!-- hall divider at x=160 from y=170 -->
  <line x1="160" y1="170" x2="160" y2="258" stroke="#B8935A" stroke-width="2"/>

  <!-- LIVING ROOM furniture: sofa + coffee table -->
  <rect x="26" y="28" width="100" height="46" rx="3" fill="none" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <rect x="26" y="26" width="16" height="50" rx="2" fill="none" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <rect x="110" y="26" width="16" height="50" rx="2" fill="none" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <rect x="50" y="80" width="56" height="22" rx="2" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.35"/>
  <!-- TV unit -->
  <rect x="26" y="112" width="180" height="10" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.3"/>
  <!-- dining table -->
  <rect x="148" y="28" width="72" height="48" rx="2" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <rect x="148" y="22" width="14" height="10" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>
  <rect x="170" y="22" width="14" height="10" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>
  <rect x="192" y="22" width="14" height="10" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>

  <!-- KITCHEN furniture -->
  <rect x="18" y="176" width="134" height="14" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <rect x="18" y="176" width="14" height="76" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <circle cx="60" cy="184" r="5" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <circle cx="80" cy="184" r="5" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <circle cx="100" cy="184" r="5" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>

  <!-- BEDROOM furniture: bed + wardrobe -->
  <rect x="255" y="22" width="90" height="56" rx="3" fill="none" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <line x1="300" y1="22" x2="300" y2="78" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>
  <rect x="255" y="22" width="90" height="18" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.35"/>
  <rect x="255" y="92" width="40" height="80" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.35"/>
  <rect x="303" y="92" width="40" height="80" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.35"/>
  <line x1="275" y1="92" x2="255" y2="132" stroke="#B8935A" stroke-width="0.5" opacity="0.25"/>
  <line x1="323" y1="92" x2="343" y2="132" stroke="#B8935A" stroke-width="0.5" opacity="0.25"/>

  <!-- BATHROOM: bath tub -->
  <rect x="254" y="188" width="66" height="62" rx="6" fill="none" stroke="#B8935A" stroke-width="0.8" opacity="0.45"/>
  <rect x="257" y="191" width="60" height="56" rx="5" fill="none" stroke="#B8935A" stroke-width="0.5" opacity="0.25"/>
  <circle cx="274" cy="204" r="4" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <!-- WC -->
  <rect x="338" y="186" width="42" height="30" rx="12" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <line x1="340" y1="196" x2="378" y2="196" stroke="#B8935A" stroke-width="0.5" opacity="0.3"/>

  <!-- doors -->
  <!-- main entrance -->
  <line x1="12" y1="226" x2="12" y2="248" stroke="#fff" stroke-width="3"/>
  <path d="M 12 226 A 22 22 0 0 0 34 226" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="12" y1="226" x2="34" y2="226" stroke="#B8935A" stroke-width="1"/>
  <!-- living to bedroom -->
  <line x1="245" y1="68" x2="245" y2="90" stroke="#fff" stroke-width="3"/>
  <path d="M 245 68 A 22 22 0 0 1 223 68" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="223" y1="68" x2="245" y2="68" stroke="#B8935A" stroke-width="1"/>
  <!-- hall to bathroom -->
  <line x1="245" y1="210" x2="245" y2="230" stroke="#fff" stroke-width="3"/>
  <path d="M 245 210 A 20 20 0 0 1 265 210" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="245" y1="210" x2="265" y2="210" stroke="#B8935A" stroke-width="1"/>

  <!-- room labels -->
  <text x="128" y="98" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8.5" letter-spacing="1.8" opacity="0.85">LIVING / DINING</text>
  <text x="85" y="222" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.8" opacity="0.85">KITCHEN</text>
  <text x="200" y="222" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.8" opacity="0.85">HALL</text>
  <text x="300" y="105" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8.5" letter-spacing="1.8" opacity="0.85">BEDROOM</text>
  <text x="287" y="226" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.8" opacity="0.85">BATH</text>
  <text x="355" y="226" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.8" opacity="0.85">WC</text>
  <!-- north + scale -->
  <text x="384" y="26" text-anchor="end" fill="#B8935A" font-family="Georgia,serif" font-size="9" opacity="0.6" letter-spacing="1">N ↑</text>
  <line x1="18" y1="263" x2="68" y2="263" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <line x1="18" y1="260" x2="18" y2="266" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <line x1="68" y1="260" x2="68" y2="266" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <text x="43" y="259" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="7" opacity="0.55" letter-spacing="1">5m</text>
</svg>`;

// ── Plan Two: Gold Prestige — 2-bed with study, L-shaped ────────────────────
// Layout: Left column kitchen+dining stacked; centre large living room;
//         right column study (top), bedroom2 (mid), master (spans right bottom)
const plan2 = `<svg viewBox="0 0 400 270" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
  <rect width="400" height="270" fill="#faf8f4"/>
  <!-- outer walls: L-shape achieved by a notch top-left -->
  <path d="M 12 90 L 12 258 L 388 258 L 388 12 L 110 12 L 110 90 Z"
        fill="none" stroke="#B8935A" stroke-width="3"/>
  <!-- vertical: kitchen+dining | living at x=110 (full height from y=90) -->
  <line x1="110" y1="90" x2="110" y2="258" stroke="#B8935A" stroke-width="2"/>
  <!-- vertical: living | right zone at x=272 -->
  <line x1="272" y1="12" x2="272" y2="258" stroke="#B8935A" stroke-width="2"/>
  <!-- horizontal: kitchen | dining at y=165 (left of x=110) -->
  <line x1="12" y1="165" x2="110" y2="165" stroke="#B8935A" stroke-width="2"/>
  <!-- horizontal: study | bed2 at y=100 (right of x=272) -->
  <line x1="272" y1="100" x2="388" y2="100" stroke="#B8935A" stroke-width="2"/>
  <!-- horizontal: bed2 | master at y=185 (right of x=272) -->
  <line x1="272" y1="185" x2="388" y2="185" stroke="#B8935A" stroke-width="2"/>
  <!-- horizontal: hall+bath divider at y=210 across bottom of living -->
  <line x1="110" y1="210" x2="272" y2="210" stroke="#B8935A" stroke-width="2"/>
  <!-- vertical: hall | bathroom at x=192 from y=210 -->
  <line x1="192" y1="210" x2="192" y2="258" stroke="#B8935A" stroke-width="2"/>

  <!-- KITCHEN: worktop L-shape -->
  <rect x="18" y="98" width="84" height="12" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <rect x="18" y="98" width="12" height="60" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <circle cx="44" cy="106" r="4" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <circle cx="60" cy="106" r="4" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <circle cx="76" cy="106" r="4" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>

  <!-- DINING: round table + 4 chairs -->
  <ellipse cx="60" cy="210" rx="32" ry="24" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <rect x="46" y="238" width="14" height="10" rx="2" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>
  <rect x="68" y="238" width="14" height="10" rx="2" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>
  <rect x="14" y="204" width="10" height="14" rx="2" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>
  <rect x="98" y="204" width="10" height="14" rx="2" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>

  <!-- LIVING ROOM: large sofa + coffee table + armchairs -->
  <rect x="126" y="100" width="120" height="52" rx="3" fill="none" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <rect x="124" y="98" width="18" height="56" rx="2" fill="none" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <rect x="228" y="98" width="18" height="56" rx="2" fill="none" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <rect x="148" y="160" width="70" height="24" rx="2" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.35"/>
  <rect x="120" y="48" width="140" height="8" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>

  <!-- STUDY: desk -->
  <rect x="280" y="20" width="80" height="18" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <rect x="280" y="20" width="18" height="72" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>

  <!-- BEDROOM 2: single bed + wardrobe -->
  <rect x="282" y="114" width="70" height="46" rx="3" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.45"/>
  <rect x="282" y="114" width="70" height="14" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.35"/>
  <rect x="282" y="166" width="34" height="14" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>
  <rect x="322" y="166" width="34" height="14" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>

  <!-- MASTER BEDROOM: double bed + en-suite hint -->
  <rect x="282" y="200" width="96" height="48" rx="3" fill="none" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <rect x="282" y="200" width="96" height="16" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.35"/>
  <line x1="330" y1="200" x2="330" y2="248" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>

  <!-- HALL: runner -->
  <rect x="118" y="218" width="66" height="32" rx="2" fill="none" stroke="#B8935A" stroke-width="0.5" opacity="0.2"/>

  <!-- BATHROOM: bath + wc -->
  <rect x="200" y="218" width="62" height="32" rx="5" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.45"/>
  <rect x="202" y="220" width="58" height="28" rx="4" fill="none" stroke="#B8935A" stroke-width="0.4" opacity="0.25"/>
  <circle cx="218" cy="230" r="4" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.35"/>

  <!-- doors -->
  <!-- main front door -->
  <line x1="12" y1="130" x2="12" y2="152" stroke="#fff" stroke-width="3"/>
  <path d="M 12 130 A 22 22 0 0 0 34 130" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="12" y1="130" x2="34" y2="130" stroke="#B8935A" stroke-width="1"/>
  <!-- kitchen to hall -->
  <line x1="68" y1="258" x2="90" y2="258" stroke="#fff" stroke-width="3"/>
  <path d="M 68 258 A 22 22 0 0 0 68 236" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="68" y1="236" x2="68" y2="258" stroke="#B8935A" stroke-width="1"/>
  <!-- living to master -->
  <line x1="272" y1="218" x2="272" y2="240" stroke="#fff" stroke-width="3"/>
  <path d="M 272 218 A 22 22 0 0 1 250 218" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="250" y1="218" x2="272" y2="218" stroke="#B8935A" stroke-width="1"/>
  <!-- hall to bathroom -->
  <line x1="210" y1="210" x2="230" y2="210" stroke="#fff" stroke-width="3"/>
  <path d="M 210 210 A 20 20 0 0 1 210 230" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="210" y1="210" x2="210" y2="230" stroke="#B8935A" stroke-width="1"/>

  <!-- room labels -->
  <text x="60" y="130" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.5" opacity="0.85">KITCHEN</text>
  <text x="60" y="200" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.5" opacity="0.85">DINING</text>
  <text x="191" y="148" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8.5" letter-spacing="1.8" opacity="0.85">LIVING ROOM</text>
  <text x="330" y="62" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.5" opacity="0.85">STUDY</text>
  <text x="330" y="148" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.5" opacity="0.85">BEDROOM 2</text>
  <text x="330" y="226" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.5" opacity="0.85">MASTER BED</text>
  <text x="151" y="240" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.5" opacity="0.85">HALL</text>
  <text x="231" y="240" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.5" opacity="0.85">BATHROOM</text>
  <!-- north + scale -->
  <text x="384" y="26" text-anchor="end" fill="#B8935A" font-family="Georgia,serif" font-size="9" opacity="0.6" letter-spacing="1">N ↑</text>
  <line x1="18" y1="263" x2="68" y2="263" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <line x1="18" y1="260" x2="18" y2="266" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <line x1="68" y1="260" x2="68" y2="266" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <text x="43" y="259" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="7" opacity="0.55" letter-spacing="1">5m</text>
</svg>`;

// ── Plan Three: Platinum Bespoke — 3-bed luxury with en-suite ────────────────
// Wide rectangular plan with 3 columns
// Left col: kitchen (top) + utility (mid) + hall (bottom)
// Centre col: lounge (large top) + dining (mid) + library/snug (bottom)
// Right col: master+en-suite (top) + bed2 (mid) + bed3 (bottom)
const plan3 = `<svg viewBox="0 0 440 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
  <rect width="440" height="300" fill="#faf8f4"/>
  <!-- outer walls — wider viewbox for luxury scale -->
  <rect x="12" y="12" width="416" height="276" fill="none" stroke="#B8935A" stroke-width="3"/>
  <!-- vertical: left col | centre col at x=128 -->
  <line x1="128" y1="12" x2="128" y2="288" stroke="#B8935A" stroke-width="2"/>
  <!-- vertical: centre col | right col at x=288 -->
  <line x1="288" y1="12" x2="288" y2="288" stroke="#B8935A" stroke-width="2"/>
  <!-- left col horizontals -->
  <line x1="12" y1="110" x2="128" y2="110" stroke="#B8935A" stroke-width="2"/>
  <line x1="12" y1="200" x2="128" y2="200" stroke="#B8935A" stroke-width="2"/>
  <!-- centre col horizontals -->
  <line x1="128" y1="175" x2="288" y2="175" stroke="#B8935A" stroke-width="2"/>
  <line x1="128" y1="230" x2="288" y2="230" stroke="#B8935A" stroke-width="2"/>
  <!-- right col horizontals: master en-suite split at y=100 within top zone -->
  <line x1="288" y1="135" x2="428" y2="135" stroke="#B8935A" stroke-width="2"/>
  <line x1="288" y1="205" x2="428" y2="205" stroke="#B8935A" stroke-width="2"/>
  <!-- en-suite internal partition at x=368 from y=12 to y=135 -->
  <line x1="368" y1="12" x2="368" y2="135" stroke="#B8935A" stroke-width="2"/>

  <!-- KITCHEN: worktops on 3 sides -->
  <rect x="18" y="18" width="102" height="12" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <rect x="18" y="18" width="12" height="84" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <rect x="108" y="18" width="12" height="84" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <circle cx="44" cy="26" r="4" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <circle cx="60" cy="26" r="4" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <circle cx="76" cy="26" r="4" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <rect x="36" y="56" width="56" height="42" rx="2" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>

  <!-- UTILITY: sink + washer -->
  <rect x="18" y="116" width="102" height="12" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.35"/>
  <rect x="18" y="116" width="12" height="76" rx="1" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.35"/>
  <rect x="36" y="120" width="28" height="28" rx="2" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>
  <circle cx="50" cy="134" r="10" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>
  <rect x="72" y="120" width="28" height="28" rx="12" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>

  <!-- HALL: runner + stair indicator -->
  <rect x="26" y="210" width="90" height="70" fill="none" stroke="#B8935A" stroke-width="0.5" opacity="0.15"/>
  <line x1="26" y1="225" x2="116" y2="225" stroke="#B8935A" stroke-width="0.4" opacity="0.15"/>
  <line x1="26" y1="240" x2="116" y2="240" stroke="#B8935A" stroke-width="0.4" opacity="0.15"/>
  <line x1="26" y1="255" x2="116" y2="255" stroke="#B8935A" stroke-width="0.4" opacity="0.15"/>
  <line x1="26" y1="270" x2="116" y2="270" stroke="#B8935A" stroke-width="0.4" opacity="0.15"/>

  <!-- LOUNGE: large L-sofa + coffee table + armchairs -->
  <rect x="144" y="26" width="126" height="58" rx="3" fill="none" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <rect x="142" y="24" width="20" height="62" rx="2" fill="none" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <rect x="250" y="24" width="20" height="62" rx="2" fill="none" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <rect x="166" y="94" width="82" height="28" rx="2" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.35"/>
  <rect x="136" y="90" width="20" height="28" rx="2" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.35"/>
  <rect x="136" y="26" width="272" height="8" rx="1" fill="none" stroke="#B8935A" stroke-width="0.5" opacity="0.25"/>

  <!-- DINING: rectangular table + 6 chairs -->
  <rect x="148" y="188" width="120" height="54" rx="2" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.4"/>
  <rect x="160" y="182" width="18" height="8" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>
  <rect x="194" y="182" width="18" height="8" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>
  <rect x="228" y="182" width="18" height="8" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>
  <rect x="160" y="244" width="18" height="8" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>
  <rect x="194" y="244" width="18" height="8" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>
  <rect x="228" y="244" width="18" height="8" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.3"/>

  <!-- LIBRARY/SNUG: bookshelf + armchair -->
  <rect x="136" y="238" width="144" height="12" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.35"/>
  <rect x="136" y="238" width="12" height="42" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.35"/>
  <line x1="148" y1="250" x2="280" y2="250" stroke="#B8935A" stroke-width="0.4" opacity="0.2"/>
  <line x1="148" y1="264" x2="280" y2="264" stroke="#B8935A" stroke-width="0.4" opacity="0.2"/>

  <!-- MASTER BEDROOM: double bed -->
  <rect x="296" y="20" width="64" height="90" rx="3" fill="none" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <rect x="296" y="20" width="64" height="22" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.35"/>
  <line x1="328" y1="20" x2="328" y2="110" stroke="#B8935A" stroke-width="0.5" opacity="0.25"/>

  <!-- EN-SUITE: bath + wc + basin -->
  <rect x="376" y="20" width="44" height="60" rx="4" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.45"/>
  <rect x="378" y="22" width="40" height="56" rx="3" fill="none" stroke="#B8935A" stroke-width="0.4" opacity="0.25"/>
  <circle cx="392" cy="34" r="3.5" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.35"/>
  <rect x="376" y="86" width="44" height="20" rx="8" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.35"/>

  <!-- BEDROOM 2: single bed + wardrobe -->
  <rect x="296" y="148" width="130" height="48" rx="3" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.45"/>
  <rect x="296" y="148" width="130" height="16" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.35"/>

  <!-- BEDROOM 3: single bed + wardrobe -->
  <rect x="296" y="218" width="130" height="60" rx="3" fill="none" stroke="#B8935A" stroke-width="0.7" opacity="0.45"/>
  <rect x="296" y="218" width="130" height="18" rx="1" fill="none" stroke="#B8935A" stroke-width="0.6" opacity="0.35"/>
  <rect x="296" y="246" width="50" height="14" rx="1" fill="none" stroke="#B8935A" stroke-width="0.5" opacity="0.3"/>
  <rect x="352" y="246" width="50" height="14" rx="1" fill="none" stroke="#B8935A" stroke-width="0.5" opacity="0.3"/>

  <!-- doors -->
  <!-- front entrance -->
  <line x1="12" y1="250" x2="12" y2="272" stroke="#fff" stroke-width="3"/>
  <path d="M 12 250 A 22 22 0 0 0 34 250" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="12" y1="250" x2="34" y2="250" stroke="#B8935A" stroke-width="1"/>
  <!-- kitchen to hall -->
  <line x1="76" y1="200" x2="98" y2="200" stroke="#fff" stroke-width="3"/>
  <path d="M 76 200 A 22 22 0 0 1 76 222" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="76" y1="200" x2="76" y2="222" stroke="#B8935A" stroke-width="1"/>
  <!-- lounge to dining -->
  <line x1="174" y1="175" x2="196" y2="175" stroke="#fff" stroke-width="3"/>
  <path d="M 174 175 A 22 22 0 0 0 174 197" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="174" y1="175" x2="174" y2="197" stroke="#B8935A" stroke-width="1"/>
  <!-- hall to master bed -->
  <line x1="288" y1="248" x2="288" y2="270" stroke="#fff" stroke-width="3"/>
  <path d="M 288 248 A 22 22 0 0 0 266 248" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="266" y1="248" x2="288" y2="248" stroke="#B8935A" stroke-width="1"/>
  <!-- master to en-suite -->
  <line x1="368" y1="68" x2="368" y2="90" stroke="#fff" stroke-width="3"/>
  <path d="M 368 68 A 20 20 0 0 1 388 68" fill="none" stroke="#B8935A" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="368" y1="68" x2="388" y2="68" stroke="#B8935A" stroke-width="1"/>

  <!-- room labels -->
  <text x="70" y="65" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.5" opacity="0.85">KITCHEN</text>
  <text x="70" y="158" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.5" opacity="0.85">UTILITY</text>
  <text x="70" y="252" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.5" opacity="0.85">HALL</text>
  <text x="208" y="100" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="9" letter-spacing="1.8" opacity="0.85">LOUNGE</text>
  <text x="208" y="214" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8.5" letter-spacing="1.6" opacity="0.85">DINING ROOM</text>
  <text x="208" y="262" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.5" opacity="0.85">LIBRARY</text>
  <text x="328" y="72" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.5" opacity="0.85">MASTER</text>
  <text x="398" y="52" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="7.5" letter-spacing="1.2" opacity="0.85">EN-SUITE</text>
  <text x="361" y="172" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.5" opacity="0.85">BEDROOM 2</text>
  <text x="361" y="252" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="8" letter-spacing="1.5" opacity="0.85">BEDROOM 3</text>
  <!-- north + scale -->
  <text x="424" y="26" text-anchor="end" fill="#B8935A" font-family="Georgia,serif" font-size="9" opacity="0.6" letter-spacing="1">N ↑</text>
  <line x1="18" y1="292" x2="68" y2="292" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <line x1="18" y1="289" x2="18" y2="295" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <line x1="68" y1="289" x2="68" y2="295" stroke="#B8935A" stroke-width="0.8" opacity="0.5"/>
  <text x="43" y="288" text-anchor="middle" fill="#B8935A" font-family="Georgia,serif" font-size="7" opacity="0.55" letter-spacing="1">5m</text>
</svg>`;

// ── Now replace each plan's SVG in index.html ───────────────────────────────
function replacePlan(html, planId, newSvg) {
  const divOpen  = `<div id="${planId}"`;
  const start    = html.indexOf(divOpen);
  if (start === -1) { console.error(`✗ Could not find #${planId}`); return html; }
  // find the </svg> closing tag within this div
  const svgEnd   = html.indexOf('</svg>', start) + '</svg>'.length;
  // find the </div> immediately after that
  const divClose = html.indexOf('</div>', svgEnd);
  const newDiv   = `<div id="${planId}"${planId !== 'plan-one' ? ' style="display:none;"' : ''}>\n          ${newSvg}\n        `;
  return html.substring(0, start) + newDiv + html.substring(divClose);
}

html = replacePlan(html, 'plan-one', plan1);
html = replacePlan(html, 'plan-two', plan2);
html = replacePlan(html, 'plan-three', plan3);

fs.writeFileSync(file, html);
console.log('✓ All three floor plans replaced with distinct layouts');
console.log('Done.');
