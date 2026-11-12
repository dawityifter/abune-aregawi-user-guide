import { Link, useParams } from 'react-router-dom';
import { AUDIENCE_LABEL, SECTIONS } from '../navigation/sections';
import { pagesInSection } from '../lib/content';
import { Icon } from './Icon';
import { NotFound } from './NotFound';

export function SectionPage() {
  const { section = '' } = useParams();
  const sec = SECTIONS.find((s) => s.id === section);
  const pages = pagesInSection(section);
  if (!sec || !pages.length) return <NotFound />;
  document.title = `${sec.label} · Abune Aregawi Handbook`;

  return (
    <div className="article narrow">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <Icon name="chev" size={12} />
        <span aria-current="page">{sec.label}</span>
      </nav>
      <header className="article-head">
        <h1>{sec.label}</h1>
        <p className="lede">{sec.blurb}</p>
        <div className="meta"><span className="badge">Mainly for: {AUDIENCE_LABEL[sec.audience]}</span></div>
      </header>
      <ol className="section-list">
        {pages.map((p, i) => (
          <li key={p.slug}>
            <Link to={`/${p.slug}`} className="section-item">
              <span className="si-num">{i + 1}</span>
              <span className="si-text">
                <span className="si-title">{p.title}</span>
                {p.summary && <span className="si-sum">{p.summary}</span>}
                {p.audience && <span className="si-aud">For: {p.audience}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
