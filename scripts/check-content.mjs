// Checks the guide's Markdown content:
//   - every internal link (#/section/page and ?h=heading) points at something real
//   - every :::screenshot file exists in public/ (lists the ones still to capture)
//   - every page has the required front matter
//   - nothing that looks like a secret or a real phone number slipped in
// Run: npm run check:content   (exit code 1 if a link or front-matter error is found)
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const contentDir = join(root, 'src/content');
const slugify = (s) => s.toLowerCase()
  .replace(/\*\*|`|_/g, '')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/&[a-z]+;/g, '')
  .replace(/[’'"“”]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const pages = new Map(); // slug -> { file, headings:Set, body, meta }
for (const section of readdirSync(contentDir)) {
  for (const f of readdirSync(join(contentDir, section)).filter((n) => n.endsWith('.md'))) {
    const raw = readFileSync(join(contentDir, section, f), 'utf8');
    const end = raw.indexOf('\n---', 3);
    const meta = Object.fromEntries(raw.slice(3, end).split('\n').filter((l) => l.includes(':')).map((l) => [l.slice(0, l.indexOf(':')).trim(), l.slice(l.indexOf(':') + 1).trim()]));
    // Ignore code samples: they may show block syntax as an example.
    const body = raw.slice(end + 4).replace(/^\s*```[\s\S]*?^\s*```/gm, '');
    const headings = new Set();
    for (const m of body.matchAll(/^#{2,4}\s+(.+)$/gm)) headings.add(slugify(m[1]));
    pages.set(`${section}/${f.replace(/\.md$/, '')}`, { file: `${section}/${f}`, headings, body, meta });
  }
}

const errors = [];
const warnings = [];
const shots = [];
for (const [slug, p] of pages) {
  for (const key of ['title', 'summary', 'audience', 'updated']) if (!p.meta[key]) errors.push(`${p.file}: missing front matter "${key}"`);
  for (const rel of (p.meta.related || '').split(',').map((s) => s.trim()).filter(Boolean)) {
    if (!pages.has(rel)) errors.push(`${p.file}: related page "${rel}" does not exist`);
  }
  for (const m of p.body.matchAll(/\]\(#\/([^)\s?#]+)(?:\?h=([^)\s]+))?\)/g)) {
    const [, target, h] = m;
    if (target.split('/').length === 1) continue; // section index page
    const t = pages.get(target);
    if (!t) errors.push(`${p.file}: link to missing page #/${target}`);
    else if (h && !t.headings.has(h)) errors.push(`${p.file}: #/${target}?h=${h} — no such heading (have: ${[...t.headings].join(', ')})`);
  }
  for (const m of p.body.matchAll(/\]\(#([a-z0-9-]+)\)/g)) {
    if (!p.headings.has(m[1])) errors.push(`${p.file}: in-page link #${m[1]} — no such heading`);
  }
  for (const m of p.body.matchAll(/^:::screenshot\s+(\S+)\s*\|\s*(.*)$/gm)) {
    shots.push({ page: slug, path: m[1], caption: m[2], exists: existsSync(join(root, 'public', m[1])) });
  }
  // Guard rails: secrets and real-looking phone numbers
  if (/sk_live_|pk_live_|AIza[0-9A-Za-z_-]{20,}|-----BEGIN|postgres(ql)?:\/\/[^<\s]*:[^<\s]*@/.test(p.body)) errors.push(`${p.file}: looks like it contains a secret`);
  for (const m of p.body.matchAll(/\(?\b\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b/g)) {
    if (!/555[-. ]01\d\d/.test(m[0])) warnings.push(`${p.file}: phone-like number "${m[0]}" — use 555-01xx`);
  }
}

console.log(`${pages.size} pages checked.`);
const missing = shots.filter((s) => !s.exists);
console.log(`${shots.length} screenshots referenced, ${shots.length - missing.length} present, ${missing.length} still to capture.`);
if (process.argv.includes('--shots')) for (const s of shots) console.log(`${s.exists ? 'OK  ' : 'TODO'}  public/${s.path}  (${s.page}) — ${s.caption}`);
for (const w of warnings) console.log('WARN', w);
for (const e of errors) console.log('ERROR', e);
process.exit(errors.length ? 1 : 0);
