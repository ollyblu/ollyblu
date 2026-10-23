// Generates the animated SVGs for the GitHub profile README.
// Usage: node scripts/gen-svg.mjs assets
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const out = process.argv[2];
mkdirSync(out, { recursive: true });

const CYAN = '#00f3ff';
const PINK = '#ec4899';
const BG = '#050505';
const MONO = "'JetBrains Mono','Cascadia Code','Fira Code',Consolas,'Courier New',monospace";
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// deterministic RNG so regenerating gives the same art
let seed = 42;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const REDUCED = `@media (prefers-reduced-motion: reduce){*{animation:none!important}}`;

// ─── HEADER ────────────────────────────────────────────────────────────────
function header() {
  const W = 1200, H = 340;
  const CHARS = 'ATCGATCG01アイウエオカキクケコ';
  let rain = '';
  for (let x = 12; x < W; x += 30) {
    const len = 6 + Math.floor(rnd() * 8);
    let col = '';
    for (let j = 0; j < len; j++) {
      const ch = CHARS[Math.floor(rnd() * CHARS.length)];
      const op = (0.15 + (j / len) * 0.85).toFixed(2);
      col += `<text x="${x}" y="${j * 18}" fill-opacity="${op}">${ch}</text>`;
    }
    const dur = (5 + rnd() * 7).toFixed(1);
    const delay = (-rnd() * 12).toFixed(1);
    rain += `<g class="drop" style="animation-duration:${dur}s;animation-delay:${delay}s">${col}</g>`;
  }

  let grid = '';
  for (let i = -12; i <= 12; i++) grid += `<line x1="${600 + i * 30}" y1="250" x2="${600 + i * 160}" y2="${H}"/>`;
  for (const y of [258, 270, 288, 312, 340]) grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Alexander Sadhana — IT &amp; Genomics Enthusiast, Developer">
<defs>
  <linearGradient id="bar" x1="0" x2="1"><stop offset="0" stop-color="${CYAN}"/><stop offset="1" stop-color="${PINK}"/></linearGradient>
  <radialGradient id="glow" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="${CYAN}" stop-opacity=".16"/><stop offset="1" stop-color="${CYAN}" stop-opacity="0"/></radialGradient>
  <linearGradient id="fadeGrid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${BG}" stop-opacity="1"/><stop offset="1" stop-color="${BG}" stop-opacity="0"/></linearGradient>
  <radialGradient id="hush"><stop offset=".55" stop-color="${BG}" stop-opacity=".92"/><stop offset="1" stop-color="${BG}" stop-opacity="0"/></radialGradient>
  <pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="2" fill="#000" fill-opacity=".35"/></pattern>
  <clipPath id="frame"><rect width="${W}" height="${H}" rx="16"/></clipPath>
</defs>
<style>
  text{font-family:${MONO}}
  .rain text{fill:${CYAN};font-size:15px}
  .drop{animation:fall linear infinite}
  @keyframes fall{from{transform:translateY(-280px)}to{transform:translateY(${H + 40}px)}}
  .grid line{stroke:${PINK};stroke-opacity:.35;stroke-width:1}
  .name{font-size:76px;font-weight:800;letter-spacing:-2px}
  .g1{fill:${CYAN};animation:g1 4s steps(1) infinite;opacity:.85}
  .g2{fill:${PINK};animation:g2 4s steps(1) infinite;opacity:.85}
  @keyframes g1{0%,100%{transform:translate(0,0)}8%{transform:translate(-5px,2px)}10%{transform:translate(4px,-2px)}12%{transform:translate(0,0)}62%{transform:translate(6px,0)}64%{transform:translate(-3px,1px)}66%{transform:translate(0,0)}}
  @keyframes g2{0%,100%{transform:translate(0,0)}8%{transform:translate(5px,-2px)}10%{transform:translate(-4px,2px)}12%{transform:translate(0,0)}62%{transform:translate(-6px,0)}64%{transform:translate(3px,-1px)}66%{transform:translate(0,0)}}
  .flick{animation:flick 6s infinite}
  @keyframes flick{0%,100%{opacity:1}31%{opacity:1}32%{opacity:.55}33%{opacity:1}78%{opacity:1}79%{opacity:.7}80%{opacity:1}}
  .beam{animation:beam 5s linear infinite}
  @keyframes beam{from{transform:translateY(-60px)}to{transform:translateY(${H + 60}px)}}
  .blink{animation:blink 1s steps(1) infinite}
  @keyframes blink{50%{opacity:0}}
  .type{animation:type 2.4s steps(52) .6s both}
  @keyframes type{from{transform:translateX(0)}99%{transform:translateX(470px);opacity:1}to{transform:translateX(470px);opacity:0}}
  .pulse{animation:pulse 2s ease-in-out infinite}
  @keyframes pulse{50%{opacity:.35}}
  ${REDUCED}
</style>
<g clip-path="url(#frame)">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g class="rain">${rain}</g>
  <ellipse cx="600" cy="160" rx="520" ry="105" fill="url(#hush)"/>
  <g class="grid">${grid}</g>
  <rect y="245" width="${W}" height="40" fill="url(#fadeGrid)"/>
  <rect width="${W}" height="4" fill="url(#bar)"/>

  <text x="600" y="92" text-anchor="middle" font-size="14" fill="${CYAN}" letter-spacing="4">// SYSTEM_PROFILE · ALEXANDER_OS v2.6</text>
  <g class="flick">
    <text class="name g1" x="600" y="178" text-anchor="middle">ALEXANDER SADHANA</text>
    <text class="name g2" x="600" y="178" text-anchor="middle">ALEXANDER SADHANA</text>
    <text class="name" x="600" y="178" text-anchor="middle" fill="#fff">ALEXANDER SADHANA</text>
  </g>
  <text x="600" y="218" text-anchor="middle" font-size="17" fill="${PINK}" letter-spacing="6">IT &amp; GENOMICS ENTHUSIAST // DEVELOPER</text>

  <g font-size="13">
    <text x="36" y="312" fill="${CYAN}">&gt; GENOMICS_ENGINE: CONNECTED · AI_CORE: SYNCHRONIZED</text>
    <rect class="type" x="36" y="298" width="470" height="20" fill="${BG}"/>
    <text x="${W - 36}" y="312" text-anchor="end" fill="#a1a1aa">LOC: BANTUL, DIY, INDONESIA <tspan class="pulse" fill="${PINK}">●</tspan></text>
  </g>

  <rect class="beam" y="0" width="${W}" height="60" fill="${CYAN}" fill-opacity=".05"/>
  <rect width="${W}" height="${H}" fill="url(#scan)"/>
</g>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="16" fill="none" stroke="${CYAN}" stroke-opacity=".3"/>
</svg>`;
}

// ─── TERMINAL (whoami) ─────────────────────────────────────────────────────
function terminal() {
  const W = 900, LH = 24, X = 28, CW = 9.8, FS = 15;
  const script = [
    ['cmd', 'whoami'],
    ['out', [['#fff', 'alexander_sadhana'], ['#71717a', '  // IT & genomics enthusiast, developer']]],
    ['cmd', 'cat about.txt'],
    ['out', [['#d4d4d8', 'I love working with people who pay attention to the little']]],
    ['out', [['#d4d4d8', 'things and put in the extra effort. Every project is a way to']]],
    ['out', [['#d4d4d8', 'learn something new and make technology feel natural to use.']]],
    ['cmd', 'ls ./focus'],
    ['out', [[CYAN, 'artificial_intelligence/  genomics/  fullstack_dev/']]],
    ['out', [[CYAN, 'iot_arduino/  ai_cinema/  game_dev/  photography/']]],
    ['cmd', 'cat status.log'],
    ['out', [['#4ade80', '● '], ['#d4d4d8', 'tinkering since the 2020 lockdown, starting with Arduino']]],
    ['out', [['#4ade80', '● '], ['#d4d4d8', 'based in Bantul, Yogyakarta, Indonesia']]],
    ['out', [[PINK, '● '], ['#d4d4d8', 'open to collaboration: AI, bioinformatics, web']]],
  ];

  const top = 64;
  const H = top + script.length * LH + 30;
  let body = '', css = '', t = 0.5, i = 0;
  const prompt = (y) => `<tspan fill="${PINK}">➜</tspan> <tspan fill="${CYAN}">~</tspan>`;

  script.forEach(([kind, payload], n) => {
    const y = top + n * LH;
    if (kind === 'cmd') {
      const startX = X + 4 * CW;
      const w = payload.length * CW + 12;
      const dur = Math.max(0.25, payload.length * 0.055);
      body += `<g class="in" style="animation-delay:${t.toFixed(2)}s"><text x="${X}" y="${y}">${prompt(y)} <tspan fill="#fff">${esc(payload)}</tspan></text>`;
      body += `<rect class="cov c${i}" x="${startX - 2}" y="${y - 17}" width="${w}" height="${LH}" fill="#0b0b10"/></g>`;
      css += `.c${i}{animation:t${i} ${dur.toFixed(2)}s steps(${payload.length}) ${t.toFixed(2)}s both}@keyframes t${i}{to{transform:translateX(${w}px)}}`;
      t += dur + 0.35;
      i++;
    } else {
      const spans = payload.map(([c, s]) => `<tspan fill="${c}">${esc(s)}</tspan>`).join('');
      body += `<text class="in" x="${X}" y="${y}" style="animation-delay:${t.toFixed(2)}s">${spans}</text>`;
      t += 0.12;
    }
  });
  const lastY = top + script.length * LH;
  body += `<g class="in" style="animation-delay:${t.toFixed(2)}s"><text x="${X}" y="${lastY}">${prompt(lastY)} </text><rect class="blink" x="${X + 4 * CW}" y="${lastY - 15}" width="9" height="18" fill="${CYAN}"/></g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Terminal: whoami — Alexander Sadhana, IT and genomics enthusiast and developer from Bantul, Yogyakarta">
<style>
  text{font-family:${MONO};font-size:${FS}px;white-space:pre}
  .in{opacity:0;animation:show .01s linear both}
  @keyframes show{to{opacity:1}}
  .blink{animation:blink 1s steps(1) infinite}
  @keyframes blink{50%{opacity:0}}
  ${css}
  @media (prefers-reduced-motion: reduce){.in,.cov{animation:none!important}.in{opacity:1}.cov{display:none}}
</style>
<defs><linearGradient id="bar" x1="0" x2="1"><stop offset="0" stop-color="${CYAN}"/><stop offset="1" stop-color="${PINK}"/></linearGradient></defs>
<rect width="${W}" height="${H}" rx="14" fill="#0b0b10"/>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="14" fill="none" stroke="${CYAN}" stroke-opacity=".28"/>
<path d="M14 0.5H${W - 14}A13.5 13.5 0 0 1 ${W - 0.5} 14V36H0.5V14A13.5 13.5 0 0 1 14 0.5Z" fill="#131318"/>
<circle cx="24" cy="18" r="6" fill="#ff5f57"/><circle cx="44" cy="18" r="6" fill="#febc2e"/><circle cx="64" cy="18" r="6" fill="#28c840"/>
<text x="${W / 2}" y="23" text-anchor="middle" font-size="13" fill="#71717a">alexander@ollyblu: ~/profile</text>
<rect y="36" width="${W}" height="2" fill="url(#bar)" opacity=".7"/>
${body}
</svg>`;
}

// ─── DNA HELIX ─────────────────────────────────────────────────────────────
function dna() {
  const W = 1200, H = 150, A = 42, N = 42;
  const step = (W - 80) / (N - 1);
  const BASES = ['A', 'T', 'C', 'G'];
  let pairs = '';
  for (let k = 0; k < N; k++) {
    const x = (40 + k * step).toFixed(1);
    const d = (-k * 0.14).toFixed(2);
    const b = BASES[k % 4];
    pairs += `<g transform="translate(${x} ${H / 2})">`
      + `<line class="rung" y1="${-A}" y2="${A}" style="animation-delay:${d}s"/>`
      + `<circle class="top" r="5" style="animation-delay:${d}s"/>`
      + `<circle class="bot" r="5" style="animation-delay:${d}s"/>`
      + (k % 7 === 3 ? `<text class="base" y="${A + 26}" text-anchor="middle">${b}</text>` : '')
      + `</g>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Animated DNA double helix">
<style>
  .rung{stroke:url(#rg);stroke-width:2;stroke-opacity:.45;animation:flip 1.6s ease-in-out infinite alternate}
  .top{fill:${CYAN};animation:up 1.6s ease-in-out infinite alternate}
  .bot{fill:${PINK};animation:down 1.6s ease-in-out infinite alternate}
  @keyframes flip{from{transform:scaleY(1)}to{transform:scaleY(-1)}}
  @keyframes up{from{transform:translateY(${-A}px)}50%{opacity:.45}to{transform:translateY(${A}px)}}
  @keyframes down{from{transform:translateY(${A}px)}50%{opacity:.45}to{transform:translateY(${-A}px)}}
  .base{font-family:${MONO};font-size:11px;fill:#52525b}
  .label{font-family:${MONO};font-size:12px;letter-spacing:3px}
  ${REDUCED}
</style>
<defs><linearGradient id="rg" gradientUnits="userSpaceOnUse" x1="0" y1="${-A}" x2="0" y2="${A}"><stop offset="0" stop-color="${CYAN}"/><stop offset="1" stop-color="${PINK}"/></linearGradient></defs>
${pairs}
</svg>`;
}

// ─── DIVIDER ───────────────────────────────────────────────────────────────
function divider() {
  const W = 1200, H = 16;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="presentation">
<defs>
  <linearGradient id="l" x1="0" x2="1"><stop offset="0" stop-color="${CYAN}" stop-opacity="0"/><stop offset=".5" stop-color="${CYAN}" stop-opacity=".5"/><stop offset="1" stop-color="${PINK}" stop-opacity="0"/></linearGradient>
  <radialGradient id="p"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${PINK}"/><stop offset="1" stop-color="${PINK}" stop-opacity="0"/></radialGradient>
</defs>
<style>.dot{animation:run 4s cubic-bezier(.6,0,.4,1) infinite}@keyframes run{from{transform:translateX(-80px)}to{transform:translateX(${W + 80}px)}}${REDUCED}</style>
<rect y="7.5" width="${W}" height="1" fill="url(#l)"/>
<ellipse class="dot" cx="0" cy="8" rx="60" ry="5" fill="url(#p)"/>
</svg>`;
}

writeFileSync(join(out, 'header.svg'), header());
writeFileSync(join(out, 'terminal.svg'), terminal());
writeFileSync(join(out, 'dna.svg'), dna());
writeFileSync(join(out, 'divider.svg'), divider());
console.log('ok');
