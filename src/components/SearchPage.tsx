import { Link, useSearchParams } from 'react-router-dom';
import { search, highlight } from '../lib/search';
import { SECTIONS } from '../navigation/sections';

export function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const hits = search(q, 50);
  document.title = `Search: ${q} · Abune Aregawi Handbook`;

  return (
    <div className="article narrow">
      <header className="article-head">
        <h1>Search results</h1>
        <p className="lede">{hits.length} page{hits.length === 1 ? '' : 's'} match “{q}”.</p>
      </header>
      {hits.length === 0 && (
        <p>Try fewer or different words — for example “receipt”, “duplicate”, “pledge”, or “sign in”. The <Link to="/help/faq">FAQ</Link> answers the most common questions.</p>
      )}
      <ul className="results">
        {hits.map((h) => (
          <li key={h.page.slug}>
            <Link to={`/${h.page.slug}${h.headingId ? `?h=${h.headingId}` : ''}`}>
              <span className="hit-section">{SECTIONS.find((s) => s.id === h.page.section)?.label}</span>
              <span className="hit-title" dangerouslySetInnerHTML={{ __html: highlight(h.page.title, q) }} />
              <span className="hit-snippet" dangerouslySetInnerHTML={{ __html: highlight(h.snippet, q) }} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
