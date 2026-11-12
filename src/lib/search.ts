import { PAGES, type Page } from './content';

export interface SearchHit {
  page: Page;
  score: number;
  snippet: string;
  headingId?: string;
}

const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

/**
 * Small, dependency-free search. Every word of the query must appear somewhere
 * in the page; titles and headings weigh more than body text.
 */
export function search(query: string, limit = 12): SearchHit[] {
  const words = norm(query).split(/\s+/).filter((w) => w.length > 1);
  if (!words.length) return [];
  const hits: SearchHit[] = [];

  for (const page of PAGES) {
    const title = norm(page.title);
    const summary = norm(page.summary);
    const body = norm(page.plainText);
    const heads = page.headings.map((h) => ({ ...h, n: norm(h.text) }));

    let score = 0;
    let ok = true;
    for (const w of words) {
      const inTitle = title.includes(w);
      const inHead = heads.some((h) => h.n.includes(w));
      const inSummary = summary.includes(w);
      const inBody = body.includes(w);
      if (!inTitle && !inHead && !inSummary && !inBody) { ok = false; break; }
      score += (inTitle ? 10 : 0) + (inHead ? 5 : 0) + (inSummary ? 3 : 0) + (inBody ? 1 : 0);
    }
    if (!ok) continue;
    if (title.includes(norm(query))) score += 15;

    const heading = heads.find((h) => words.every((w) => h.n.includes(w))) ?? heads.find((h) => words.some((w) => h.n.includes(w)));
    const first = body.indexOf(words[0]);
    const start = Math.max(0, first - 60);
    const raw = page.plainText.slice(start, start + 180);
    const snippet = (start > 0 ? '…' : '') + raw + (start + 180 < page.plainText.length ? '…' : '');

    hits.push({ page, score, snippet, headingId: heading?.id });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** Wrap matched words in <mark>, escaping everything else. */
export function highlight(text: string, query: string): string {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const words = query.split(/\s+/).filter((w) => w.length > 1).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!words.length) return esc;
  return esc.replace(new RegExp(`(${words.join('|')})`, 'gi'), '<mark>$1</mark>');
}
