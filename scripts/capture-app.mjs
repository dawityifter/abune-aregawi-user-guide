// Captures application screenshots for the guide from a SYNTHETIC demo environment.
//
//   APP_URL=http://127.0.0.1:3055 node scripts/capture-app.mjs [name ...]
//
// NEVER point APP_URL at production or at a copy of real data: every screenshot
// is published on the internet. See README.md → "Screenshots".
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const APP = process.env.APP_URL || 'http://127.0.0.1:3055';
if (/abune-aregawi-church-app\.web\.app|abunearegawi\.church/.test(APP)) {
  console.error('Refusing to capture from the production site.');
  process.exit(1);
}
const OUT = new URL('../public/images/', import.meta.url).pathname;

const shot = async (page, file, opts = {}) => {
  mkdirSync(dirname(OUT + file), { recursive: true });
  await page.waitForTimeout(opts.wait ?? 900);
  if (opts.locator) await page.locator(opts.locator).first().screenshot({ path: OUT + file });
  else await page.screenshot({ path: OUT + file, fullPage: !!opts.full });
  console.log('saved', file);
};
const tab = async (page, name) => {
  await page.getByRole('button', { name, exact: false }).first().click();
  await page.waitForLoadState('networkidle').catch(() => {});
};

const DEMO = process.env.DEMO_FILES || '';
const hideChrome = async (p) => p.addStyleTag({ content: '#chatbase-bubble-button,#chatbase-bubble-window,iframe[src*="chatbase"],[id^="chatbase"]{display:none!important}' }).catch(() => {});
const go = async (p, path, wait = 2500) => { await p.goto(`${APP}${path}`); await p.waitForLoadState('networkidle').catch(() => {}); await hideChrome(p); await p.waitForTimeout(wait); };
const treasurer = async (p, tabName, wait = 2500) => { await go(p, '/treasurer', 2500); if (tabName) { await tab(p, tabName); await p.waitForTimeout(wait); await hideChrome(p); } };
const admin = async (p, tabName, wait = 2500) => { await go(p, '/admin', 2500); if (tabName) { await tab(p, tabName); await p.waitForTimeout(wait); await hideChrome(p); } await p.evaluate(() => window.scrollTo(0, 0)); };

const SCENES = {
  'getting-started/sign-in.png': async () => {
    // Signed-out browser: a signed-in user is redirected away from /login.
    const c = await browser.newContext({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 2 });
    const q = await c.newPage(); await go(q, '/login', 2500); await shot(q, 'getting-started/sign-in.png'); await c.close();
  },
  'getting-started/dashboard.png': async (p) => { await go(p, '/dashboard'); await p.getByRole('button', { name: 'Not now' }).click().catch(() => {}); await p.mouse.wheel(0, 700); await shot(p, 'getting-started/dashboard.png'); },
  'reconciliation/bank-upload.png': async (p) => {
    await treasurer(p, 'Bank Integration');
    await p.locator('input[type=file]').first().setInputFiles(`${DEMO}/chase-demo.csv`);
    await p.getByRole('button', { name: /Upload & Process/ }).click();
    await p.getByText('Upload Successful!').waitFor({ timeout: 60000 });
    await shot(p, 'reconciliation/bank-upload.png', { wait: 800 });
  },
  'dashboard/financial-overview.png': async (p) => { await treasurer(p); await shot(p, 'dashboard/financial-overview.png'); },
  'dashboard/treasurer-tabs.png': async (p) => { await treasurer(p); await p.setViewportSize({ width: 1440, height: 760 }); await shot(p, 'dashboard/treasurer-tabs.png'); await p.setViewportSize({ width: 1440, height: 960 }); },
  'dashboard/sunday-deposit-check.png': async (p) => { await treasurer(p); await p.getByRole('button', { name: 'Review' }).first().click(); await shot(p, 'dashboard/sunday-deposit-check.png'); },
  'donations/member-payments.png': async (p) => { await treasurer(p, 'Member Payments', 3000); await p.getByRole('button', { name: 'Details' }).first().click().catch(() => {}); await shot(p, 'donations/member-payments.png'); },
  'donations/add-payment.png': async (p) => { await treasurer(p); await p.getByRole('button', { name: 'Add Payment' }).first().click(); await p.waitForTimeout(800);
    await p.getByPlaceholder('Search by name, email, or phone').fill('Lemlem').catch(() => {}); await p.waitForTimeout(1200);
    await shot(p, 'donations/add-payment.png'); },
  'pledges/treasurer-pledges.png': async (p) => { await treasurer(p, 'Pledges', 3500); await p.getByRole('button', { name: 'Record Pledge' }).scrollIntoViewIfNeeded().catch(() => {}); await shot(p, 'pledges/treasurer-pledges.png'); },
  'pledges/pledge-dashboard.png': async (p) => { await treasurer(p, 'Pledges', 3500); await p.evaluate(() => window.scrollTo(0, 420)); await shot(p, 'pledges/pledge-dashboard.png'); },
  'members/member-dues-viewer.png': async (p) => { await treasurer(p, 'Member Dues', 1500);
    const box = p.getByPlaceholder(/search/i).first(); await box.fill('Mehari'); await p.waitForTimeout(1500);
    await p.getByText(/Mehari/).first().click().catch(() => {}); await p.waitForTimeout(3000); await hideChrome(p); await shot(p, 'members/member-dues-viewer.png'); },
  'expenses/add-expense.png': async (p) => { await treasurer(p); await p.getByRole('button', { name: 'Add Expense' }).first().click(); await shot(p, 'expenses/add-expense.png'); },
  'reconciliation/bank-transactions.png': async (p) => { await treasurer(p, 'Bank Integration', 3000);
    await p.getByText('Bank Transactions').first().scrollIntoViewIfNeeded().catch(() => {}); await p.waitForTimeout(600);
    await p.getByText(/HELEN KAHSAY/).first().click().catch(() => {}); await shot(p, 'reconciliation/bank-transactions.png', { wait: 1500 }); },
  'benevity/benevity-preview.png': async (p) => { await treasurer(p, 'Bank Integration', 2500);
    const inputs = p.locator('input[type=file]'); await inputs.nth(1).setInputFiles(`${DEMO}/benevity-demo.csv`);
    await p.getByRole('button', { name: 'Preview' }).click(); await p.getByText('Personal donations to import').waitFor({ timeout: 30000 });
    await p.getByText('Personal donations to import').scrollIntoViewIfNeeded(); await shot(p, 'benevity/benevity-preview.png', { wait: 1000 }); },
  'zelle/zelle-review.png': async (p) => { await treasurer(p, 'Zelle Review', 3000); await shot(p, 'zelle/zelle-review.png'); },
  'square/square-review.png': async (p) => { await treasurer(p, 'Square Review', 3000); await shot(p, 'square/square-review.png'); },
  'reports/weekly-collection-report.png': async (p) => { await treasurer(p, 'Reports', 1500); await p.getByRole('button', { name: /Weekly Collection Report/ }).first().click().catch(() => {}); await p.waitForTimeout(1500);
    await p.getByRole('button', { name: /Previous Week/ }).click().catch(() => {}); await shot(p, 'reports/weekly-collection-report.png', { wait: 2000 }); },
  'reports/ledger-backup.png': async (p) => { await treasurer(p, 'Ledger Backup', 2500); await shot(p, 'reports/ledger-backup.png'); },
  'members/member-list.png': async (p) => { await admin(p, null, 3000); await shot(p, 'members/member-list.png'); },
  'pledges/fundraising-campaigns.png': async (p) => { await admin(p, 'Fundraising', 2500); await shot(p, 'pledges/fundraising-campaigns.png'); },
  'administration/role-management.png': async (p) => { await admin(p, 'Role Management', 2500); await shot(p, 'administration/role-management.png'); },
  'administration/sms.png': async (p) => { await go(p, '/sms', 2500); await p.getByText('Department', { exact: true }).first().click().catch(() => {}); await p.waitForTimeout(1200);
    await p.locator('textarea').first().fill('Hi {firstName}, choir practice moves to Saturday 5 PM this week. Thank you!').catch(() => {}); await shot(p, 'administration/sms.png', { full: true }); },
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 2 });
// Demo-mode gap in the app: getUserProfile() sends no token when there is no
// real Firebase user, so profile lookups fail and the Admin Panel denies access.
// Attach the local demo token to those requests (demo backend only).
await ctx.route('**/api/**', (route) => {
  const h = route.request().headers();
  if (h.authorization || !/localhost:5055|127\.0\.0\.1:5055/.test(route.request().url())) return route.continue();
  return route.continue({ headers: { ...h, authorization: 'Bearer MAGIC_DEMO_TOKEN' } });
});
const page = await ctx.newPage();
// Demo mode: the local demo backend accepts the demo token; production never does.
await page.goto(APP);
await page.evaluate(() => { localStorage.setItem('magic_demo_mode', 'true'); localStorage.setItem('app.lang', 'en'); });
if (!DEMO) console.log('Set DEMO_FILES to the folder with the synthetic CSVs for the upload scenes.');
const wanted = process.argv.slice(2);
for (const [name, run] of Object.entries(SCENES)) {
  if (wanted.length && !wanted.some((w) => name.includes(w))) continue;
  try { await run(page); } catch (e) { console.log('FAILED', name, e.message.split('\n')[0]); }
}
await browser.close();
