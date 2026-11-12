import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { search, highlight } from '../lib/search';
import { SECTIONS } from '../navigation/sections';
import { Icon } from './Icon';

const sectionLabel = (id: string) => SECTIONS.find((s) => s.id === id)?.label ?? id;

export function SearchBox() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const hits = useMemo(() => search(q, 8), [q]);

  // "/" focuses search from anywhere, as in most documentation sites.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (i: number) => {
    const h = hits[i];
    if (h) navigate(`/${h.page.slug}${h.headingId ? `?h=${h.headingId}` : ''}`);
    else if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className="search" role="search">
      <Icon name="search" className="search-icon" />
      <input
        ref={inputRef}
        type="search"
        placeholder="Search the guide — try “Zelle duplicate”"
        aria-label="Search the guide"
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, hits.length - 1)); }
          if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
          if (e.key === 'Enter') { e.preventDefault(); go(active); }
          if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
        }}
      />
      <kbd className="search-kbd" aria-hidden="true">/</kbd>
      {open && q.trim().length > 1 && (
        <div className="search-pop" role="listbox">
          {hits.length === 0 && <div className="search-empty">No pages match “{q}”.</div>}
          {hits.map((h, i) => (
            <button
              key={h.page.slug}
              type="button"
              role="option"
              aria-selected={i === active}
              className={`search-hit${i === active ? ' active' : ''}`}
              onMouseDown={(e) => { e.preventDefault(); go(i); }}
              onMouseEnter={() => setActive(i)}
            >
              <span className="hit-section">{sectionLabel(h.page.section)}</span>
              <span className="hit-title" dangerouslySetInnerHTML={{ __html: highlight(h.page.title, q) }} />
              <span className="hit-snippet" dangerouslySetInnerHTML={{ __html: highlight(h.snippet, q) }} />
            </button>
          ))}
          {hits.length > 0 && (
            <button type="button" className="search-all" onMouseDown={(e) => { e.preventDefault(); navigate(`/search?q=${encodeURIComponent(q.trim())}`); setOpen(false); }}>
              See all results
            </button>
          )}
        </div>
      )}
    </div>
  );
}
