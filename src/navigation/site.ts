// Site-wide contact details shown in the footer and on the home page.
// Change them here; nothing else needs editing.
export const SITE = {
  appUrl: 'https://abunearegawi.church',
  feedbackEmail: 'abune.aregawi.dev@gmail.com',
};

export const feedbackMailto = (pageTitle?: string) =>
  `mailto:${SITE.feedbackEmail}?subject=${encodeURIComponent(`Handbook feedback${pageTitle ? `: ${pageTitle}` : ''}`)}`;
