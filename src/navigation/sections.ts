// The order of sections in the sidebar. Pages inside a section are ordered by
// the `order` field in each Markdown file's front matter.
//
// To add a section: add it here, then create src/content/<id>/ and put
// Markdown files in it. Nothing else needs to change.

export interface SectionDef {
  id: string;
  label: string;
  /** One line shown on the home page card. */
  blurb: string;
  /** Who mainly reads this section. */
  audience: 'everyone' | 'finance' | 'admin' | 'technical' | 'leadership';
  icon: IconName;
}

export type IconName =
  | 'compass' | 'gauge' | 'people' | 'handshake' | 'coins' | 'scale'
  | 'receipt' | 'chart' | 'shield' | 'wrench' | 'lifebuoy' | 'question'
  | 'book' | 'clipboard';

export const SECTIONS: SectionDef[] = [
  { id: 'getting-started', label: 'Getting Started', blurb: 'What the application is, how to sign in, and how to find your way around.', audience: 'everyone', icon: 'compass' },
  { id: 'dashboard', label: 'Treasurer Dashboard', blurb: 'Reading the Financial Overview, the bank balance, and the Sunday Deposit Check.', audience: 'finance', icon: 'gauge' },
  { id: 'members', label: 'Members', blurb: 'Finding, adding and correcting member and household records.', audience: 'admin', icon: 'people' },
  { id: 'pledges', label: 'Pledges', blurb: 'Pledge drives, recording pledges, and checking what is still owed.', audience: 'finance', icon: 'handshake' },
  { id: 'donations', label: 'Donations & Payments', blurb: 'Every way money arrives: cash, check, card, Zelle, Square and Benevity.', audience: 'finance', icon: 'coins' },
  { id: 'reconciliation', label: 'Bank Reconciliation', blurb: 'Uploading the Chase statement and matching every line to the books.', audience: 'finance', icon: 'scale' },
  { id: 'expenses', label: 'Expenses', blurb: 'Recording what the church spends, checks, payroll and vendors.', audience: 'finance', icon: 'receipt' },
  { id: 'reports', label: 'Reports', blurb: 'Weekly, monthly and yearly reports, tax statements and the ledger backup.', audience: 'leadership', icon: 'chart' },
  { id: 'administration', label: 'Administration', blurb: 'Roles and permissions, departments, SMS, outreach and other modules.', audience: 'admin', icon: 'shield' },
  { id: 'technical', label: 'Technical Administration', blurb: 'Architecture, hosting, deployment, configuration, logs and data repairs.', audience: 'technical', icon: 'wrench' },
  { id: 'continuity', label: 'Operational Continuity', blurb: 'What to do if the original developer is unavailable.', audience: 'leadership', icon: 'lifebuoy' },
  { id: 'help', label: 'FAQ & Troubleshooting', blurb: 'Answers to real problems that have happened, and how they were fixed.', audience: 'everyone', icon: 'question' },
  { id: 'about', label: 'About This Guide', blurb: 'Keeping the guide accurate: screenshot checklist, coverage and open questions.', audience: 'technical', icon: 'clipboard' },
];

export const AUDIENCE_LABEL: Record<SectionDef['audience'], string> = {
  everyone: 'Everyone',
  finance: 'Treasurer & finance team',
  admin: 'Administrators',
  technical: 'Technical administrator',
  leadership: 'Church leadership',
};
