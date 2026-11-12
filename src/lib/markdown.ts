import { Marked } from 'marked';

/**
 * Markdown with a few guide-specific blocks. A block opens with a line
 * `:::kind optional title` and closes with a line containing only `:::`.
 *
 *   :::tip / :::note / :::warning / :::danger / :::success   Callouts
 *   :::admin Title        Action that needs a specific role
 *   :::example Title      A worked, realistic example
 *   :::confirm Title      Information the church still has to confirm
 *   :::copy Title         Text with a Copy button (troubleshooting steps, commands)
 *   :::steps              Numbered instructions, shown as large step cards
 *   :::screenshot images/zelle/review.png | Caption
 *   1 @ 72,8 Sync Now     (optional) numbered marker at x%,y% with its label
 *   :::
 *
 * Blocks do not nest. Ordinary Markdown (tables, lists, links) works inside.
 */

export interface Heading { id: string; text: string; level: 2 | 3 }

const CALLOUT_TITLES: Record<string, string> = {
  tip: 'Tip',
  note: 'Note',
  warning: 'Warning',
  danger: 'Stop — read this first',
  success: 'What success looks like',
  admin: 'Requires permission',
  example: 'Example',
  confirm: 'Needs confirmation',
  copy: 'Copy these steps',
};

const ICONS: Record<string, string> = {
  tip: 'M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3zm-2.5 15h5v2h-5z',
  note: 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5',
  warning: 'M12 3 2 20h20L12 3zm0 6v5m0 3h.01',
  danger: 'M8 3h8l5 5v8l-5 5H8l-5-5V8zM12 8v5m0 3h.01',
  success: 'M4 12l5 5L20 6',
  admin: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  example: 'M4 5h16v14H4zM8 9h8M8 13h5',
  confirm: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 5a2.5 2.5 0 0 1 1 4.8V14m0 3h.01',
  copy: 'M8 8h11v12H8zM5 4h11v2M5 4v12h2',
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const slugify = (s: string) =>
  s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const base = (import.meta.env?.BASE_URL as string | undefined) ?? '/';

function icon(kind: string) {
  return `<svg class="co-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[kind] ?? ICONS.note}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

export function renderMarkdown(source: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const used = new Map<string, number>();

  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading(text: string, level: number) {
        let id = slugify(text) || 'section';
        const n = used.get(id) ?? 0;
        used.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        if (level === 2 || level === 3) headings.push({ id, text: text.replace(/<[^>]+>/g, ''), level });
        return `<h${level} id="${id}">${text}</h${level}>\n`;
      },
      table(header: string, body: string) {
        return `<div class="table-wrap"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>\n`;
      },
      link(href: string, title: string | null | undefined, text: string) {
        const external = /^https?:\/\//.test(href);
        const t = title ? ` title="${escapeHtml(title)}"` : '';
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${text}<span class="ext" aria-hidden="true">↗</span></a>`
          : `<a href="${href}"${t}>${text}</a>`;
      },
    },
  });

  const inline = (md: string) => marked.parse(md) as string;

  const lines = source.split('\n');
  const out: string[] = [];
  let buffer: string[] = [];
  const flush = () => {
    if (buffer.length) out.push(inline(buffer.join('\n')));
    buffer = [];
  };

  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    // Lines inside ``` code fences are shown literally, even if they start with :::
    if (/^\s*```/.test(lines[i])) inFence = !inFence;
    const open = inFence ? null : lines[i].match(/^:::(\w+)\s*(.*)$/);
    if (!open) { buffer.push(lines[i]); continue; }
    flush();
    const [, kind, rest] = open;
    const inner: string[] = [];
    i++;
    while (i < lines.length && lines[i].trim() !== ':::') inner.push(lines[i++]);
    out.push(renderBlock(kind, rest.trim(), inner, inline));
  }
  flush();
  return { html: out.join('\n'), headings };
}

function renderBlock(kind: string, rest: string, inner: string[], inline: (md: string) => string): string {
  if (kind === 'steps') {
    return `<div class="steps">${inline(inner.join('\n'))}</div>`;
  }

  if (kind === 'diagram') {
    // :::diagram diagrams/architecture.html | Caption | images/technical/architecture.png
    // Interactive Archify diagram in a frame; the optional image is used when printing.
    // The page shows the still image (readable in the article column); clicking it,
    // or the caption link, opens the full interactive diagram.
    const [path, caption = '', image = ''] = rest.split('|').map((s) => s.trim());
    const src = `${base}${path.replace(/^\/+/, '')}`;
    const note = inner.join('\n').trim() ? `<div class="shot-note">${inline(inner.join('\n'))}</div>` : '';
    const visual = image
      ? `<a class="diagram-link" href="${src}" target="_blank" rel="noopener noreferrer" aria-label="Open the interactive diagram"><img src="${base}${image.replace(/^\/+/, '')}" alt="${escapeHtml(caption)}" loading="lazy" /></a>`
      : `<div class="diagram-frame"><iframe src="${src}" title="${escapeHtml(caption)}" loading="lazy"></iframe></div>`;
    return `<figure class="diagram">
  ${visual}
  <figcaption>${escapeHtml(caption)} · <a href="${src}" target="_blank" rel="noopener noreferrer">Open the interactive diagram<span class="ext" aria-hidden="true">↗</span></a></figcaption>${note}
</figure>`;
  }

  if (kind === 'screenshot') {
    const [path, caption = ''] = rest.split('|').map((s) => s.trim());
    const markers: { n: string; x: number; y: number; label: string }[] = [];
    const body: string[] = [];
    for (const line of inner) {
      const mk = line.match(/^\s*(\d+)\s*@\s*([\d.]+)\s*,\s*([\d.]+)\s+(.+)$/);
      if (mk) markers.push({ n: mk[1], x: Number(mk[2]), y: Number(mk[3]), label: mk[4] });
      else body.push(line);
    }
    const src = `${base}${path.replace(/^\/+/, '')}`;
    const pins = markers
      .map((m) => `<span class="pin" style="left:${m.x}%;top:${m.y}%" aria-hidden="true">${m.n}</span>`)
      .join('');
    const legend = markers.length
      ? `<ol class="shot-legend">${markers.map((m) => `<li><span class="pin-inline">${m.n}</span>${inline(m.label).replace(/^<p>|<\/p>\s*$/g, '')}</li>`).join('')}</ol>`
      : '';
    const extra = body.join('\n').trim() ? `<div class="shot-note">${inline(body.join('\n'))}</div>` : '';
    return `<figure class="shot" data-src="${escapeHtml(path)}">
  <div class="shot-frame"><img src="${src}" alt="${escapeHtml(caption)}" loading="lazy" />${pins}</div>
  <figcaption>${escapeHtml(caption)}</figcaption>${legend}${extra}
</figure>`;
  }

  const title = rest || CALLOUT_TITLES[kind] || kind;
  const copyBtn = kind === 'copy'
    ? `<button type="button" class="copy-btn" data-copy-target>Copy</button>`
    : '';
  return `<aside class="callout callout-${escapeHtml(kind)}" role="note">
  <div class="co-head">${icon(kind)}<span class="co-title">${inline(title).replace(/^<p>|<\/p>\s*$/g, '')}</span>${copyBtn}</div>
  <div class="co-body">${inline(inner.join('\n'))}</div>
</aside>`;
}
