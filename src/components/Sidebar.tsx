import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SECTIONS } from '../navigation/sections';
import { pagesInSection } from '../lib/content';
import { Icon } from './Icon';

const STORE_KEY = 'guide.nav.open';

function loadOpen(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch { return {}; }
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const current = pathname.split('/')[1] || '';
  const [open, setOpen] = useState<Record<string, boolean>>(loadOpen);

  // The section you are reading is always expanded.
  useEffect(() => {
    if (current && !open[current]) setOpen((o) => ({ ...o, [current]: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(open)); } catch { /* storage unavailable */ }
  }, [open]);

  return (
    <nav className="sidebar-nav" aria-label="Guide sections">
      <NavLink to="/" end className={({ isActive }) => `nav-home${isActive ? ' active' : ''}`} onClick={onNavigate}>
        <Icon name="home" /> Home
      </NavLink>
      {SECTIONS.map((s) => {
        const pages = pagesInSection(s.id);
        if (!pages.length) return null;
        const isOpen = !!open[s.id];
        return (
          <div key={s.id} className={`nav-group${current === s.id ? ' current' : ''}`}>
            <button
              type="button"
              className="nav-group-btn"
              aria-expanded={isOpen}
              onClick={() => setOpen((o) => ({ ...o, [s.id]: !isOpen }))}
            >
              <Icon name={s.icon} />
              <span>{s.label}</span>
              <Icon name="chev" size={14} className={`chev${isOpen ? ' open' : ''}`} />
            </button>
            {isOpen && (
              <ul>
                {pages.map((p) => (
                  <li key={p.slug}>
                    <NavLink to={`/${p.slug}`} className={({ isActive }) => (isActive ? 'active' : '')} onClick={onNavigate}>
                      {p.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
