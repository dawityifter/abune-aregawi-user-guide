import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { PAGES, pageBySlug } from '../lib/content';
import { SECTIONS } from '../navigation/sections';
import { formatDate } from '../lib/format';
import { Icon } from './Icon';
import { NotFound } from './NotFound';

const PLACEHOLDER = (path: string) => `
  <div class="shot-missing" role="img" aria-label="Screenshot not yet captured">
    <strong>Screenshot to be captured</strong>
    <span>File: <code>public/${path}</code></span>
    <span>See <a href="#/about/screenshot-checklist">the screenshot checklist</a> for what this image should show.</span>
  </div>`;

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export function ArticlePage() {
  const { section = '', page = '' } = useParams();
  const { search } = useLocation();
  const doc = pageBySlug(`${section}/${page}`);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>('');

  // Enhance the rendered Markdown: copy buttons, missing-screenshot placeholders.
  useEffect(() => {
    const root = bodyRef.current;
    if (!root || !doc) return;
    document.title = `${doc.title} · Abune Aregawi Handbook`;

    root.querySelectorAll<HTMLButtonElement>('[data-copy-target]').forEach((btn) => {
      btn.onclick = async () => {
        const body = btn.closest('.callout')?.querySelector('.co-body') as HTMLElement | null;
        const ok = body ? await copyText(body.innerText.trim()) : false;
        btn.textContent = ok ? 'Copied' : 'Copy failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
      };
    });

    root.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn pre-copy';
      btn.textContent = 'Copy';
      btn.onclick = async () => {
        const ok = await copyText(pre.querySelector('code')?.innerText ?? pre.innerText);
        btn.textContent = ok ? 'Copied' : 'Copy failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
      };
      pre.appendChild(btn);
    });

    root.querySelectorAll<HTMLElement>('figure.shot').forEach((fig) => {
      const img = fig.querySelector('img');
      const frame = fig.querySelector('.shot-frame') as HTMLElement | null;
      if (!img || !frame) return;
      const fail = () => { frame.outerHTML = PLACEHOLDER(fig.dataset.src || ''); fig.classList.add('pending'); };
      if (img.complete && img.naturalWidth === 0) fail();
      else img.addEventListener('error', fail, { once: true });
    });
  }, [doc]);

  // Scroll to a heading (?h=id from search or the table of contents), else the top.
  useEffect(() => {
    const h = new URLSearchParams(search).get('h');
    const el = h ? document.getElementById(h) : null;
    if (el) el.scrollIntoView({ block: 'start' });
    else window.scrollTo(0, 0);
  }, [doc, search]);

  // Highlight the table-of-contents entry for the heading in view.
  useEffect(() => {
    if (!doc) return;
    const els = doc.headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActiveId(vis[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [doc]);

  if (!doc) return <NotFound />;

  const sec = SECTIONS.find((s) => s.id === doc.section);
  const i = PAGES.indexOf(doc);
  const prev = PAGES[i - 1];
  const next = PAGES[i + 1];
  const related = doc.related.map(pageBySlug).filter(Boolean);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#/${doc.slug}?h=${id}`);
  };

  return (
    <div className="article-layout">
      <article className="article">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <Icon name="chev" size={12} />
          {sec ? <Link to={`/${sec.id}`}>{sec.label}</Link> : <span>{doc.section}</span>}
          <Icon name="chev" size={12} />
          <span aria-current="page">{doc.title}</span>
        </nav>

        <header className="article-head">
          <h1>{doc.title}</h1>
          {doc.summary && <p className="lede">{doc.summary}</p>}
          <div className="meta">
            {doc.audience && <span className="badge">For: {doc.audience}</span>}
            {doc.status === 'needs-confirmation' && <span className="badge badge-amber">Contains items that need confirmation</span>}
            {doc.updated && <span className="meta-date">Checked against the application {formatDate(doc.updated)}</span>}
            <button type="button" className="ghost-btn" onClick={() => window.print()}>
              <Icon name="print" size={16} /> Print
            </button>
          </div>
        </header>

        <div className="prose" ref={bodyRef} dangerouslySetInnerHTML={{ __html: doc.html }} />

        {related.length > 0 && (
          <section className="related" aria-label="Related topics">
            <h2>Related topics</h2>
            <div className="related-grid">
              {related.map((r) => r && (
                <Link key={r.slug} to={`/${r.slug}`} className="related-card">
                  <span className="rc-title">{r.title}</span>
                  {r.summary && <span className="rc-sum">{r.summary}</span>}
                </Link>
              ))}
            </div>
          </section>
        )}

        <nav className="pager" aria-label="Previous and next pages">
          {prev ? (
            <Link to={`/${prev.slug}`} className="pager-link">
              <span className="pager-dir"><Icon name="arrowL" size={14} /> Previous</span>
              <span className="pager-title">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/${next.slug}`} className="pager-link next">
              <span className="pager-dir">Next <Icon name="arrowR" size={14} /></span>
              <span className="pager-title">{next.title}</span>
            </Link>
          ) : <span />}
        </nav>
      </article>

      {doc.headings.length > 2 && (
        <aside className="toc" aria-label="On this page">
          <div className="toc-inner">
            <p className="toc-title">On this page</p>
            <ul>
              {doc.headings.map((h) => (
                <li key={h.id} className={`lvl-${h.level}${activeId === h.id ? ' active' : ''}`}>
                  <button type="button" onClick={() => jump(h.id)}>{h.text}</button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}
