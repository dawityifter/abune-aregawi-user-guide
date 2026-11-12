import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { SearchBox } from './SearchBox';
import { Icon } from './Icon';
import { LAST_UPDATED } from '../lib/content';
import { formatDate } from '../lib/format';
import { SITE, feedbackMailto } from '../navigation/site';

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <div className="shell">
      <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>Skip to content</a>
      <header className="topbar">
        <button type="button" className="menu-btn" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
          <Icon name="menu" size={22} />
        </button>
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="30" height="30"><rect width="64" height="64" rx="14" fill="currentColor" /><path d="M28 10h8v14h14v8H36v22h-8V32H14v-8h14z" fill="var(--gold)" /></svg>
          </span>
          <span className="brand-text">
            <span className="brand-name">Abune Aregawi Handbook</span>
            <span className="brand-sub">Church application user guide &amp; operations manual</span>
          </span>
        </Link>
        <SearchBox />
        {LAST_UPDATED && <span className="updated-pill" title="The most recent date any page was checked against the application">Updated {formatDate(LAST_UPDATED)}</span>}
      </header>

      <div className="body">
        <aside className={`sidebar${menuOpen ? ' open' : ''}`} aria-label="Navigation">
          <div className="sidebar-head">
            <span>Contents</span>
            <button type="button" className="icon-btn" aria-label="Close navigation" onClick={() => setMenuOpen(false)}>
              <Icon name="close" />
            </button>
          </div>
          <Sidebar onNavigate={() => setMenuOpen(false)} />
        </aside>
        {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} />}
        <main id="main" tabIndex={-1}>
          {children}
          <footer className="site-footer">
            <span>
              The church application: <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer">{SITE.appUrl.replace('https://', '')}</a>
            </span>
            <span>
              Feedback or corrections to this guide: <a href={feedbackMailto(pathname === '/' ? undefined : `#${pathname}`)}>{SITE.feedbackEmail}</a>
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
