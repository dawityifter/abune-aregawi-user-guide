// Take a screenshot of a URL: node scripts/shot.mjs <url> <out.png> [width] [height] [--full]
// Used to preview this guide during development and to capture application
// screens from a SYNTHETIC demo environment (see docs/SCREENSHOTS.md).
import { chromium } from 'playwright';

const [url, out, w = '1280', h = '860', ...flags] = process.argv.slice(2);
if (!url || !out) {
  console.error('usage: node scripts/shot.mjs <url> <out.png> [width] [height] [--full] [--dark]');
  process.exit(1);
}
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 2,
  colorScheme: flags.includes('--dark') ? 'dark' : 'light',
});
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
await page.screenshot({ path: out, fullPage: flags.includes('--full') });
if (errors.length) console.log('page errors:\n' + errors.join('\n'));
await browser.close();
console.log('saved', out);
