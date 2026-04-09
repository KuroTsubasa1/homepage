import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.resolve(__dirname, '../public/cv.html');
const outputPath = path.resolve(__dirname, '../cv.pdf');

async function generatePdf() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Set viewport to match target width
  await page.setViewport({ width: 720, height: 800 });

  // Load the HTML file
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Wait for fonts
  await page.evaluateHandle('document.fonts.ready');

  // Measure the full content height at 720px width
  const contentHeight = await page.evaluate(() => {
    document.body.style.width = '720px';
    return document.body.scrollHeight;
  });

  // Inject a @page rule that matches content exactly
  const pageHeight = contentHeight + 20;
  await page.addStyleTag({
    content: `@page { size: 720px ${pageHeight}px; margin: 0; }`
  });

  await page.pdf({
    path: outputPath,
    width: `720px`,
    height: `${pageHeight}px`,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();

  const stats = fs.statSync(outputPath);
  const info = `${(stats.size / 1024).toFixed(1)} KB`;
  console.log(`CV generated: ${outputPath} (${info})`);
}

generatePdf().catch((err) => {
  console.error('Failed to generate CV:', err);
  process.exit(1);
});
