/*
 * Build-time generator for the social (Open Graph / X) preview images in
 * public/og/. This is a one-off tool, NOT part of the app build and NOT a
 * project dependency. To run it:
 *
 *   mkdir /tmp/ogen && cd /tmp/ogen
 *   npm install @resvg/resvg-js @expo-google-fonts/pt-serif
 *   cp node_modules/@expo-google-fonts/pt-serif/400Regular/PTSerif_400Regular.ttf fonts/
 *   cp node_modules/@expo-google-fonts/pt-serif/700Bold/PTSerif_700Bold.ttf fonts/
 *   OUT_DIR=/path/to/public/og FONTS_DIR=./fonts node generate-og.mjs
 *
 * PT Serif TTFs come from the Expo Google Fonts package because the raw font
 * CDNs are blocked on this network. The committed PNGs are the real output.
 */
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";
import path from "node:path";

const W = 1200;
const H = 630;
const BG = "#F5F1E6";
const INK = "#141414";
const CRIMSON = "#B31217";
const MUTED = "#666666";
const MARGIN = 100;

const FONTS_DIR = process.env.FONTS_DIR || "./fonts";
const OUT_DIR = process.env.OUT_DIR || "./og";
const FONTS = [
  path.resolve(FONTS_DIR, "PTSerif_400Regular.ttf"),
  path.resolve(FONTS_DIR, "PTSerif_700Bold.ttf"),
];

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const wrap = (text, fontSize, maxWidth, emFactor = 0.5) => {
  const maxChars = Math.floor(maxWidth / (fontSize * emFactor));
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
};

const textEl = (x, y, size, weight, fill, content) =>
  `<text x="${x}" y="${y}" font-family="PT Serif" font-weight="${weight}" ` +
  `font-size="${size}" fill="${fill}">${esc(content)}</text>`;

const frame = (inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
  `<rect width="${W}" height="${H}" fill="${BG}"/>` +
  inner +
  `</svg>`;

const defaultSvg = frame(
  textEl(MARGIN, 300, 96, 700, INK, "Armaan Singla") +
    `<rect x="${MARGIN + 2}" y="330" width="104" height="5" fill="${CRIMSON}"/>` +
    textEl(MARGIN, 404, 46, 400, MUTED, "AI, Agents & Security") +
    textEl(MARGIN, 560, 30, 400, CRIMSON, "armaansingla.me"),
);

const riemannTitle =
  "If AI Solves the Riemann Hypothesis, Will Humans Understand the Answer?";
const titleSize = 54;
const titleLineH = 70;
const titleTop = 250;
const titleLines = wrap(riemannTitle, titleSize, W - MARGIN * 2);
let inner = "";
titleLines.forEach((ln, i) => {
  inner += textEl(MARGIN, titleTop + i * titleLineH, titleSize, 700, INK, ln);
});
const afterTitleY = titleTop + (titleLines.length - 1) * titleLineH;
inner += `<rect x="${MARGIN + 2}" y="${afterTitleY + 34}" width="104" height="5" fill="${CRIMSON}"/>`;
inner += textEl(MARGIN, afterTitleY + 112, 34, 400, MUTED, "Armaan Singla");
inner += textEl(MARGIN, 560, 30, 400, CRIMSON, "armaansingla.me");
const riemannSvg = frame(inner);

const render = (svg, file) => {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: W },
    font: {
      fontFiles: FONTS,
      loadSystemFonts: false,
      defaultFontFamily: "PT Serif",
    },
  });
  const png = resvg.render().asPng();
  fs.writeFileSync(path.join(OUT_DIR, file), png);
  console.log(`wrote ${file} (${png.length} bytes)`);
};

fs.mkdirSync(OUT_DIR, { recursive: true });
render(defaultSvg, "og-default.png");
render(riemannSvg, "og-riemann.png");
