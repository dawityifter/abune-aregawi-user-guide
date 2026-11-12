import { SECTIONS } from '../navigation/sections';
import { renderMarkdown, type Heading } from './markdown';

/**
 * Every Markdown file under src/content/<section>/<page>.md becomes a page at
 * #/<section>/<page>. Front matter (between the first two `---` lines) holds:
 *
 *   title:    Page title (required)
 *   order:    Position within the section (number, lower first)
 *   audience: Who the page is for, shown as a badge
 *   summary:  One-sentence description for search results and cards
 *   updated:  Date the page was last checked against the application (YYYY-MM-DD)
 *   related:  Comma-separated list of other pages, e.g. donations/zelle, help/faq
 *   status:   Optional. "verified" (default) or "needs-confirmation"
 */

export interface Page {
  slug: string; // e.g. "donations/zelle"
  section: string;
  title: string;
  order: number;
  audience: string;
  summary: string;
  updated: string;
  related: string[];
  status: 'verified' | 'needs-confirmation';
  html: string;
  headings: Heading[];
  plainText: string;
}

const files = import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function parseFrontMatter(raw: string): { meta: Record<string, string>; body: string } {
  const meta: Record<string, string> = {};
  if (!raw.startsWith('---')) return { meta, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { meta, body: raw };
  for (const line of raw.slice(3, end).split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: raw.slice(end + 4).replace(/^\s*\n/, '') };
}

function toPlainText(md: string): string {
  return md
    .replace(/^:::.*$/gm, ' ')
    .replace(/`{3}[\s\S]*?`{3}/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function build(): Page[] {
  const pages: Page[] = [];
  for (const [path, raw] of Object.entries(files)) {
    const m = path.match(/content\/([^/]+)\/([^/]+)\.md$/);
    if (!m) continue;
    const [, section, name] = m;
    const { meta, body } = parseFrontMatter(raw);
    const { html, headings } = renderMarkdown(body);
    pages.push({
      slug: `${section}/${name}`,
      section,
      title: meta.title || name,
      order: Number(meta.order ?? 99),
      audience: meta.audience || '',
      summary: meta.summary || '',
      updated: meta.updated || '',
      related: (meta.related || '').split(',').map((s) => s.trim()).filter(Boolean),
      status: meta.status === 'needs-confirmation' ? 'needs-confirmation' : 'verified',
      html,
      headings,
      plainText: toPlainText(body),
    });
  }
  const sectionIndex = (id: string) => {
    const i = SECTIONS.findIndex((s) => s.id === id);
    return i === -1 ? 999 : i;
  };
  return pages.sort((a, b) => sectionIndex(a.section) - sectionIndex(b.section) || a.order - b.order || a.title.localeCompare(b.title));
}

export const PAGES: Page[] = build();

export const pageBySlug = (slug: string) => PAGES.find((p) => p.slug === slug);

export const pagesInSection = (sectionId: string) => PAGES.filter((p) => p.section === sectionId);

/** The most recent `updated` date across all pages — shown in the header. */
export const LAST_UPDATED = PAGES.reduce((max, p) => (p.updated > max ? p.updated : max), '');
