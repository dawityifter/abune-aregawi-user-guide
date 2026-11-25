// Captures MEMBER-facing screens in English and Tigrigna from a SYNTHETIC demo environment.
//
//   PERSONA=member|newuser|admin APP_URL=http://127.0.0.1:3055 node scripts/capture-member.mjs [scene ...]
//
// The demo backend decides who is signed in (its DEMO_PHONE), so start it for the
// persona you capture: member = a household head, newuser = a number with no
// member record, admin = the demo administrator. Each scene is saved twice:
//   public/images/<name>.png        English
//   public/images/ti/<name>.png     Tigrigna
//
// NEVER point APP_URL at production or at a copy of real data: every screenshot
// is published on the internet. See README.md → "Screenshots".
import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';

const APP = process.env.APP_URL || 'http://127.0.0.1:3055';
const PERSONA = process.env.PERSONA || 'member';
const LANGS = (process.env.LANGS || 'en,ti').split(',');
if (/abune-aregawi-church-app\.web\.app|abunearegawi\.church/.test(APP)) {
  console.error('Refusing to capture from the production site.');
  process.exit(1);
}
const OUT = new URL('../public/images/', import.meta.url).pathname;

const DESKTOP = { width: 1440, height: 960 };
const PHONE = { width: 390, height: 844 };

const hideChrome = (p) =>
  p.addStyleTag({ content: '#chatbase-bubble-button,#chatbase-bubble-window,iframe[src*="chatbase"],[id^="chatbase"]{display:none!important}' }).catch(() => {});

const settle = async (p, wait = 1800) => {
  await p.waitForLoadState('networkidle').catch(() => {});
  await hideChrome(p);
  await p.waitForTimeout(wait);
  // The demo sign-in carries a fixed demo email; show an invented one instead.
  await rewriteText(p, 'demo@admin.com', 'mehari.teklemariam@example.org').catch(() => {});
};
const go = async (p, path, wait) => { await p.goto(`${APP}${path}`); await settle(p, wait); };

// Move to another page without reloading, as a member does by tapping a link.
// (A reload of /donate while signed in is sent on to the Dashboard by the app.)
const spa = async (p, path, wait = 3000) => {
  await p.evaluate((u) => { window.history.pushState({}, '', u); window.dispatchEvent(new PopStateEvent('popstate')); }, path);
  await settle(p, wait);
};


// Where numbered markers go on a screenshot (English capture): Playwright selectors, in marker order.
// The script prints each one's position as a percentage of the image, ready to paste into the guide.
const PINS = {
  'join/sign-in': ['input >> nth=0', 'button:has-text("Text me a code")'],
  'join/code': ['input[autocomplete="one-time-code"]', 'text=Send again', 'text=Use a different number'],
  'join/step-name': ['#join-firstName', '#join-baptismName', 'button.btn-primary', 'text=Not now'],
  'join/step-household': ['text=/registering my household/', 'text=/joining a household already registered/', 'text=/add my spouse and children/'],
  'join/step-address': ['#join-streetLine1', '#join-email', 'button.btn-primary'],
  'join/step-family': ['text=Add New Dependent', 'button:has-text("Add Dependent")'],
  'join/welcome': ['text=/Welcome to/', 'text=NEXT SERVICE', 'text=/Add your family/', 'text=/Go to my dashboard/'],
  'member/dashboard': ['text=This week at the parish', 'text=Add to my calendar >> nth=0', 'text=NEXT SERVICE'],
  'member/dashboard-more': ['text=Finish your profile', 'text=Complete my profile', 'text=Not now', 'text=Dues >> nth=0', 'text=Give >> nth=0'],
  'member/profile-complete': ['[name="emergencyContact"]', '[name="maritalStatus"]'],
  'member/dues': ['text=Pay my dues', 'text=Monthly Status', 'text=Payment History'],
  'member/pay-dues': ['text=Paying your 2026 membership dues', 'text=Give a donation instead', 'input[type="number"], input[inputmode="decimal"] >> nth=0'],
  'member/give': ['text=Online Donation', 'text=Payment Method', 'text=Card Information'],
  'member/giving': ['text=My dues', 'text=Statements', 'text=Make a Pledge'],
  'member/family': ['button:has-text("Add Dependent")', 'text=Edit >> nth=0'],
  'member/calendar': ['text=Upcoming at the parish', 'text=Add to my calendar >> nth=0'],
  'outreach/pending': ['button:has-text("Mark Welcomed") >> nth=0', 'button:has-text("Already Welcomed")', 'button:has-text("Public Announcements")', 'button:has-text("Events") >> nth=0', 'button[role="switch"]'],
  'outreach/welcome-note': ['textarea', 'button:has-text("Save")'],
  'outreach/welcomed': ['th:has-text("Welcomed By")', 'th:has-text("Welcome Note")'],
  'outreach/announcements': ['button:has-text("Add Announcement")', 'button:has-text("Expired")', 'button:has-text("Cancel Announcement") >> nth=0'],
  'outreach/announcement-form': ['text=Add Tigrinya Translation', 'button:has-text("Save")'],
  'outreach/events': ['button:has-text("Add event")', 'button:has-text("Upcoming")', 'button:has-text("Cancel event") >> nth=0'],
  'outreach/event-form': ['text=Leave the times empty', 'text=Title in Tigrigna'],
  'outreach/tv': ['button[role="switch"]', '.fa-cog, .fa-gear'],
  'mobile/more': ['text=English', 'text=My Profile', 'text=Make a Pledge'],
  'mobile/giving': ['text=Give >> nth=0', 'text=My dues'],
};
const measure = async (p, name) => {
  const out = [];
  const vp = p.viewportSize();
  for (const [i, sel] of PINS[name].entries()) {
    const loc = p.locator(sel).first();
    const box = await loc.boundingBox().catch(() => null);
    const control = await loc.evaluate((e) => e.matches('input,select,textarea,button,[role="button"]')).catch(() => false);
    // Beside the element, not on it: at the right edge of fields and buttons, left of small links.
    if (box) { const wide = control && box.width > vp.width * 0.12; const x = wide ? box.x + box.width - 18 : box.x - 18; out.push(`${i + 1} @ ${Math.min(96, Math.max(3, (x / vp.width) * 100)).toFixed(0)},${(((box.y + box.height / 2) / vp.height) * 100).toFixed(0)}`); }
    else out.push(`${i + 1} @ ?,?  (${sel} not found)`);
  }
  console.log(`PINS ${name}: ${out.join(' | ')}`);
};

const save = async (p, name, lang, opts = {}) => {
  const file = (lang === 'ti' ? 'ti/' : '') + name + '.png';
  mkdirSync(dirname(OUT + file), { recursive: true });
  await p.waitForTimeout(opts.wait ?? 600);
  if (!opts.full && !opts.locator && !opts.keep) {
    // Crop empty space under short pages: fit the window to the content, up to its full height.
    const vh = p.viewportSize().height;
    const bottom = await p.evaluate(() => {
      let m = 0;
      for (const el of document.body.querySelectorAll('*')) {
        const r = el.getBoundingClientRect();
        if (r.height > 0 && r.height < innerHeight * 0.9 && r.bottom > m && r.top >= 0) m = r.bottom;
      }
      return m;
    });
    const want = Math.min(vh, Math.max(520, Math.ceil(bottom + 56)));
    if (want < vh) { await p.setViewportSize({ width: p.viewportSize().width, height: want }); await p.waitForTimeout(300); }
  }
  if (opts.locator) await p.locator(opts.locator).first().screenshot({ path: OUT + file });
  else if (!process.env.PINS_ONLY) await p.screenshot({ path: OUT + file, fullPage: !!opts.full });
  console.log(process.env.PINS_ONLY ? 'measured' : 'saved', file);
  if (lang === 'en' && PINS[name]) await measure(p, name);
};

const click = (p, name, opts = {}) => p.getByRole(opts.role || 'button', { name, exact: !!opts.exact }).first().click({ timeout: 4000 }).catch(() => {});

// Replace text on the page (invented data only: used where the demo's own sign-in
// number would otherwise appear on screen).
function rewriteText(p, from, to) { return p.evaluate(([a, b]) => {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) if (n.nodeValue.includes(a)) n.nodeValue = n.nodeValue.split(a).join(b);
}, [from, to]); }

let browser;
const open = async (lang, { signedIn = true, viewport = DESKTOP, newUser = false } = {}) => {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
  await ctx.addInitScript(([l, s, nu]) => {
    try {
      localStorage.setItem('app.lang', l);
      if (s) localStorage.setItem(nu ? 'magic_new_user_mode' : 'magic_demo_mode', 'true');
      localStorage.setItem('welcomeSeen', 'true');
    } catch { /* ignore */ }
  }, [lang, signedIn, newUser]);
  // The demo backend answers the demo sign-in with a hard-coded administrator. For a
  // household screen, serve the real profile of an invented member instead (built by
  // running the backend's own handler against the demo database).
  if (process.env.PROFILE_JSON && signedIn && !newUser) {
    const profile = JSON.parse(readFileSync(process.env.PROFILE_JSON, 'utf8'));
    profile.data.member.firebaseUid = 'magic-demo-uid';
    await ctx.route('**/api/members/profile/firebase/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(profile) }));
  }
  const p = await ctx.newPage();
  return { ctx, p };
};

const SCENES = {

  // ---------- signed out: sign in ----------
  'join/sign-in': { persona: 'newuser', ctx: { signedIn: false }, run: async (p, l) => {
    await go(p, '/login', 2500);
    // The demo number clears the robot check (which cannot load offline); then an invented number is shown.
    await p.getByRole('textbox').first().fill('4699078229'); await p.waitForTimeout(1500);
    await p.getByRole('textbox').first().fill('2145550142'); await p.waitForTimeout(800);
    // Offline, the robot check cannot load and the page says so; online it does not. Remove that notice.
    await p.evaluate(() => { for (const e of document.querySelectorAll('[role="alert"]')) e.remove(); });
    await save(p, 'join/sign-in', l); } },
  'join/code': { persona: 'newuser', ctx: { signedIn: false }, run: async (p, l) => {
    await go(p, '/login', 2500);
    // The demo's own sign-in number is hard-coded in the app; its last four digits are rewritten below.
    await p.getByRole('textbox').first().fill('4699078229'); await p.waitForTimeout(1500);
    await p.locator('button[type=submit]').first().click();
    await p.locator('input[autocomplete="one-time-code"]').waitFor({ timeout: 10000 });
    await p.locator('input[autocomplete="one-time-code"]').fill('123456');
    await rewriteText(p, '8229', '0142');
    await save(p, 'join/code', l); } },

  // ---------- new visitor: Join the parish ----------
  'join/step-name': { persona: 'newuser', ctx: { newUser: true }, run: async (p, l) => {
    await go(p, '/dashboard', 3500);
    await p.fill('#join-firstName', 'Tigist'); await p.fill('#join-lastName', 'Haile'); await p.fill('#join-baptismName', 'Mariam');
    await save(p, 'join/step-name', l); } },
  'join/step-household': { persona: 'newuser', ctx: { newUser: true }, run: async (p, l) => {
    await go(p, '/dashboard', 3500);
    await p.fill('#join-firstName', 'Tigist'); await p.fill('#join-lastName', 'Haile');
    await p.locator('button.btn-primary').last().click(); await p.waitForTimeout(1200);
    await p.locator('#join-hasDependents').check();
    await save(p, 'join/step-household', l); } },
  'join/step-address': { persona: 'newuser', ctx: { newUser: true }, run: async (p, l) => {
    await go(p, '/dashboard', 3500);
    await p.fill('#join-firstName', 'Tigist'); await p.fill('#join-lastName', 'Haile');
    await p.locator('button.btn-primary').last().click(); await p.waitForTimeout(1000);
    await p.locator('button.btn-primary').last().click(); await p.waitForTimeout(1000);
    await p.fill('#join-streetLine1', '114 Example Lane'); await p.fill('#join-city', 'Garland'); await p.fill('#join-postalCode', '75040'); await p.fill('#join-email', 'tigist.haile@example.org');
    await rewriteText(p, '(469) 907-8230', '(214) 555-0142');
    await save(p, 'join/step-address', l); } },
  // The page a new member lands on once, after joining. Registration leaves a one-time note in the
  // browser's session storage, so it is set here; the profile is that of an invented new member.
  'join/welcome': { persona: 'welcome', run: async (p, l) => {
    await go(p, '/dashboard', 1500);
    await p.evaluate(() => sessionStorage.setItem('join.justJoined', '1'));
    await p.goto(`${APP}/welcome`); await settle(p, 3500);
    await save(p, 'join/welcome', l); } },
  'join/step-family': { persona: 'newuser', ctx: { newUser: true }, run: async (p, l) => {
    await go(p, '/dashboard', 3500);
    await p.fill('#join-firstName', 'Tigist'); await p.fill('#join-lastName', 'Haile');
    await p.locator('button.btn-primary').last().click(); await p.waitForTimeout(1000);
    await p.locator('#join-hasDependents').check();
    await p.locator('button.btn-primary').last().click(); await p.waitForTimeout(1000);
    await p.fill('#join-streetLine1', '114 Example Lane'); await p.fill('#join-city', 'Garland'); await p.fill('#join-postalCode', '75040');
    await p.locator('button.btn-primary').last().click(); await p.waitForTimeout(1500);
    await rewriteText(p, '(469) 907-8230', '(214) 555-0142');
    await save(p, 'join/step-family', l); } },

  // ---------- member on a phone ----------
  'mobile/dashboard': { persona: 'member', ctx: { viewport: PHONE }, run: async (p, l) => { await go(p, '/dashboard', 3500); await save(p, 'mobile/dashboard', l, { keep: true }); } },
  'mobile/more': { persona: 'member', ctx: { viewport: PHONE }, run: async (p, l) => {
    await go(p, '/dashboard', 3500); await p.getByRole('button', { name: /^(More|ተወሳኺ)$/ }).last().click(); await p.waitForTimeout(900);
    await save(p, 'mobile/more', l, { keep: true }); } },
  'mobile/giving': { persona: 'member', ctx: { viewport: PHONE }, run: async (p, l) => { await go(p, '/dashboard', 2000); await spa(p, '/giving', 2500); await save(p, 'mobile/giving', l, { keep: true }); } },
  'mobile/give': { persona: 'member', ctx: { viewport: PHONE }, run: async (p, l) => { await go(p, '/dashboard', 2000); await spa(p, '/donate', 3500); await save(p, 'mobile/give', l, { keep: true }); } },

  // ---------- member (household head) ----------
  'member/dashboard': { persona: 'member', run: async (p, l) => { await go(p, '/dashboard', 3000); await save(p, 'member/dashboard', l); } },
  'member/dashboard-more': { persona: 'member', run: async (p, l) => { await go(p, '/dashboard', 3000); await p.mouse.wheel(0, 760); await save(p, 'member/dashboard-more', l); } },
  'member/profile': { persona: 'member', run: async (p, l) => { await go(p, '/profile', 2500); await save(p, 'member/profile', l); } },
  'member/profile-complete': { persona: 'member', run: async (p, l) => { await go(p, '/profile?complete=emergencyContact', 3000);
    const f = p.locator('[name="emergencyContact"]').first(); await f.scrollIntoViewIfNeeded(); await f.focus(); await p.waitForTimeout(500);
    await save(p, 'member/profile-complete', l, { keep: true }); } },
  'member/dues': { persona: 'member', run: async (p, l) => { await go(p, '/dues', 3500); await save(p, 'member/dues', l); } },
  'member/pay-dues': { persona: 'member', run: async (p, l) => { await go(p, '/dashboard', 1500); await spa(p, '/donate?dues=1&year=2026', 3500); await save(p, 'member/pay-dues', l); } },
  'member/give': { persona: 'member', run: async (p, l) => { await go(p, '/dashboard', 1500); await spa(p, '/donate', 3500); await save(p, 'member/give', l); } },
  'member/giving': { persona: 'member', run: async (p, l) => { await go(p, '/giving', 2500); await save(p, 'member/giving', l); } },
  'member/pledge': { persona: 'member', run: async (p, l) => { await go(p, '/pledge', 3000); await save(p, 'member/pledge', l); } },
  'member/family': { persona: 'member', run: async (p, l) => { await go(p, '/dependents', 3000); await save(p, 'member/family', l); } },
  'member/calendar': { persona: 'member', run: async (p, l) => { await go(p, '/calendar', 3000); await save(p, 'member/calendar', l); } },
  'member/my-service': { persona: 'member', run: async (p, l) => { await go(p, '/departments', 3000); await save(p, 'member/my-service', l); } },
  'member/home': { persona: 'member', run: async (p, l) => { await go(p, '/', 3000); await save(p, 'member/home', l); } },

  // ---------- Relationship Department (Outreach & Member Relations) ----------
  // Start the demo backend with DEMO_PHONE of an invented member holding the Relationship
  // role, and PROFILE_JSON with that member's profile. Tabs are found by English label,
  // then the page switches language before the picture.
  'outreach/pending': { persona: 'relationship', navEn: true, run: async (p, l, toLang) => {
    await go(p, '/outreach', 3000); await toLang(); await save(p, 'outreach/pending', l); } },
  'outreach/welcome-note': { persona: 'relationship', navEn: true, run: async (p, l, toLang) => {
    await go(p, '/outreach', 3000);
    // Switch language first: the open window covers the language button.
    await toLang(); await p.locator('tbody button').first().click(); await p.waitForTimeout(1200);
    await p.locator('textarea').first().fill('Called after Sunday liturgy. Family of four, interested in Sunday school.');
    await save(p, 'outreach/welcome-note', l, { keep: true }); } },
  'outreach/welcomed': { persona: 'relationship', navEn: true, run: async (p, l, toLang) => {
    await go(p, '/outreach', 3000); await click(p, 'Already Welcomed'); await settle(p, 1800);
    await toLang(); await save(p, 'outreach/welcomed', l); } },
  'outreach/announcements': { persona: 'relationship', navEn: true, run: async (p, l, toLang) => {
    await go(p, '/outreach', 3000); await click(p, 'Public Announcements'); await settle(p, 1800);
    await toLang(); await save(p, 'outreach/announcements', l); } },
  'outreach/announcement-form': { persona: 'relationship', navEn: true, run: async (p, l, toLang) => {
    await go(p, '/outreach', 3000); await click(p, 'Public Announcements'); await settle(p, 1500);
    await toLang(); await p.locator('button:has(i.fa-plus)').first().click(); await p.waitForTimeout(1000);
    await save(p, 'outreach/announcement-form', l, { keep: true }); } },
  'outreach/events': { persona: 'relationship', navEn: true, run: async (p, l, toLang) => {
    await go(p, '/outreach', 3000); await click(p, 'Events'); await settle(p, 1800);
    await toLang(); await save(p, 'outreach/events', l); } },
  'outreach/event-form': { persona: 'relationship', navEn: true, run: async (p, l, toLang) => {
    await go(p, '/outreach', 3000); await click(p, 'Events'); await settle(p, 1500);
    await toLang(); await p.locator('button:has(i.fa-plus)').first().click(); await p.waitForTimeout(1000);
    await save(p, 'outreach/event-form', l, { keep: true }); } },
  'outreach/tv': { persona: 'relationship', navEn: true, run: async (p, l, toLang) => {
    await go(p, '/outreach', 3000); await toLang();
    await p.locator('button[role="switch"]').first().click(); await p.waitForTimeout(2500);
    await save(p, 'outreach/tv', l, { keep: true }); } },
};

const want = process.argv.slice(2);
browser = await chromium.launch();
for (const [name, scene] of Object.entries(SCENES)) {
  if (scene.persona !== PERSONA) continue;
  if (want.length && !want.includes(name)) continue;
  for (const lang of LANGS) {
    // Staff scenes find their tabs by English label, so they open in English and switch language at the end.
    const { ctx, p } = await open(scene.navEn ? 'en' : lang, scene.ctx || {});
    const toLang = async () => { if (lang === 'ti') { await p.getByRole('button', { name: 'ትግ', exact: true }).first().click(); await p.waitForTimeout(1500); } };
    try { await scene.run(p, lang, toLang); } catch (e) { console.log('FAILED', name, lang, String(e).split('\n')[0]); }
    await ctx.close();
  }
}
await browser.close();
