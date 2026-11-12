import { Link } from 'react-router-dom';
import { SECTIONS } from '../navigation/sections';
import { pagesInSection } from '../lib/content';
import { Icon } from './Icon';
import { SITE, feedbackMailto } from '../navigation/site';

const TASKS: { label: string; to: string }[] = [
  { label: 'Record a cash or check payment', to: '/donations/cash-and-check' },
  { label: 'Review this week’s Zelle payments', to: '/donations/zelle' },
  { label: 'Upload the Chase bank statement', to: '/reconciliation/uploading-the-bank-statement' },
  { label: 'Match Square card-reader payments', to: '/donations/square' },
  { label: 'Import a Benevity report', to: '/donations/benevity' },
  { label: 'Print the Weekly Collection Report', to: '/reports/weekly-collection-report' },
  { label: 'Give someone the Treasurer role', to: '/administration/roles-and-permissions' },
  { label: 'Someone cannot sign in', to: '/help/faq?h=access-and-sign-in' },
];

const ROLES: { who: string; start: string; to: string }[] = [
  { who: 'New treasurer', start: 'Start with the treasurer’s first week', to: '/getting-started/treasurer-first-week' },
  { who: 'Church administrator or secretary', start: 'Start with managing members', to: '/members/managing-members' },
  { who: 'Church leadership', start: 'Start with who owns what', to: '/continuity/ownership-matrix' },
  { who: 'Replacement developer', start: 'Start with taking over administration', to: '/continuity/taking-over' },
];

export function HomePage() {
  document.title = 'Abune Aregawi Handbook';
  return (
    <div className="home">
      <section className="hero">
        <p className="eyebrow">Debre Tsehay Abune Aregawi Tigray Orthodox Tewahedo Church · Dallas</p>
        <h1>The church application handbook</h1>
        <p className="hero-lede">
          How to use, run and look after the church’s member, giving and finance application, written so that a new
          treasurer, administrator or developer can carry on without having to ask anyone.
        </p>
        <p className="hero-links">
          Open the application at <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer">{SITE.appUrl.replace('https://', '')}</a>
          {' · '}Feedback on this guide: <a href={feedbackMailto()}>{SITE.feedbackEmail}</a>
        </p>
        <div className="hero-roles">
          {ROLES.map((r) => (
            <Link key={r.who} to={r.to} className="role-card">
              <span className="rc-who">{r.who}</span>
              <span className="rc-start">{r.start} <Icon name="arrowR" size={14} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-block" aria-labelledby="tasks-h">
        <h2 id="tasks-h">Common tasks</h2>
        <div className="task-grid">
          {TASKS.map((t) => (
            <Link key={t.to} to={t.to} className="task">{t.label}<Icon name="arrowR" size={14} /></Link>
          ))}
        </div>
      </section>

      <section className="home-block" aria-labelledby="sections-h">
        <h2 id="sections-h">Everything in this guide</h2>
        <div className="section-grid">
          {SECTIONS.map((s) => {
            const n = pagesInSection(s.id).length;
            if (!n) return null;
            return (
              <Link key={s.id} to={`/${s.id}`} className="section-card">
                <span className="sc-icon"><Icon name={s.icon} size={22} /></span>
                <span className="sc-title">{s.label}</span>
                <span className="sc-blurb">{s.blurb}</span>
                <span className="sc-count">{n} page{n === 1 ? '' : 's'}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-note">
        <Icon name="shield" size={20} />
        <p>
          <strong>This guide contains no member information and no passwords.</strong> All names, phone numbers and
          amounts shown are invented examples. Account passwords and keys belong in the church’s password manager,
          never in this guide. See <Link to="/continuity/integrations">the integration inventory</Link> for where each
          one is kept.
        </p>
      </section>
    </div>
  );
}
