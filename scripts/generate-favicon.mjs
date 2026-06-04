// Renders favicon.svg to PNGs at several sizes and packs them into favicon.ico.
// Usage: node scripts/generate-favicon.mjs
import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'public/favicon.svg'), 'utf8');
const sizes = [16, 32, 48, 64, 180];

// Prefer Puppeteer's bundled Chromium; fall back to a system Chrome install
// (the bundled download is sometimes incomplete).
let browser;
try {
  browser = await puppeteer.launch({ args: ['--no-sandbox'] });
} catch {
  browser = await puppeteer.launch({ channel: 'chrome', args: ['--no-sandbox'] });
}
const page = await browser.newPage();
await page.setContent(
  `<style>*{margin:0;padding:0}</style>${svg}`,
  { waitUntil: 'networkidle0' }
);
const el = await page.$('svg');

const pngs = {};
for (const size of sizes) {
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  await page.evaluate((s) => {
    const svg = document.querySelector('svg');
    svg.setAttribute('width', s);
    svg.setAttribute('height', s);
  }, size);
  pngs[size] = await el.screenshot({ omitBackground: true, type: 'png' });
}
await browser.close();

// Apple touch icon + a couple of standalone PNGs
writeFileSync(join(root, 'public/apple-touch-icon.png'), pngs[180]);
writeFileSync(join(root, 'public/favicon-32x32.png'), pngs[32]);
writeFileSync(join(root, 'public/favicon-16x16.png'), pngs[16]);

// Build .ico (embeds PNG data — supported by all modern browsers/OSes).
const icoSizes = [16, 32, 48];
const count = icoSizes.length;
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(count, 4);

const entries = [];
const images = [];
let offset = 6 + count * 16;
for (const size of icoSizes) {
  const data = pngs[size];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2);  // palette
  entry.writeUInt8(0, 3);  // reserved
  entry.writeUInt16LE(1, 4);  // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(data.length, 8);
  entry.writeUInt32LE(offset, 12);
  entries.push(entry);
  images.push(data);
  offset += data.length;
}
writeFileSync(join(root, 'public/favicon.ico'), Buffer.concat([header, ...entries, ...images]));

console.log('Generated favicon.ico, apple-touch-icon.png, favicon-16x16.png, favicon-32x32.png');
