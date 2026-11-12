---
title: Screenshot checklist
order: 3
audience: Technical administrator, guide maintainers
summary: Which application screenshots are in the guide, which still need capturing, and how to capture them safely with invented data.
updated: 2026-11-11
related: about/maintaining-this-guide, about/completeness-checklist
---

:::danger Screenshots are published on the internet
Never take a screenshot from the live application or from any copy of real church data. Every image in this guide comes from a **separate demo environment filled with invented people and amounts**. Phone numbers are in the fictional range 555-0100–0199, and emails use example.org.
:::

## How the screenshots were made

1. A separate, empty local database (`aa_guide_demo`) was created from the application’s **schema only** (structure, no rows).
2. It was filled with invented members, payments, pledges, expenses, Zelle and Square items by a seed script. A synthetic Chase CSV and a synthetic Benevity report were then uploaded **through the real screens**.
3. The application’s own backend and frontend ran locally in **demo mode**, with every outside service (Gmail, Google Sheets, Twilio, Stripe, Square, Sentry, email) switched off.
4. `scripts/capture-app.mjs` in this repository opened each screen and saved the image to `public/images/`.

The demo environment files (seed script, synthetic CSVs, settings) are not in this repository. Ask the technical administrator, or rebuild them by following the steps above.

## Captured automatically

| Image | Page |
|---|---|
| `getting-started/sign-in.png` | [Signing in](#/getting-started/signing-in) |
| `getting-started/dashboard.png` | [Finding your way](#/getting-started/finding-your-way) |
| `dashboard/treasurer-tabs.png` | [Finding your way](#/getting-started/finding-your-way) |
| `dashboard/financial-overview.png` | [Financial Overview](#/dashboard/financial-overview) |
| `dashboard/sunday-deposit-check.png` | [Sunday Deposit Check](#/dashboard/sunday-deposit-check) |
| `donations/add-payment.png` | [Cash and checks](#/donations/cash-and-check) |
| `donations/member-payments.png` | [Correcting a payment](#/donations/correcting-a-payment) |
| `zelle/zelle-review.png` | [Zelle](#/donations/zelle) |
| `square/square-review.png` | [Square](#/donations/square) |
| `benevity/benevity-preview.png` | [Benevity](#/donations/benevity) |
| `reconciliation/bank-upload.png` | [Uploading the bank statement](#/reconciliation/uploading-the-bank-statement) |
| `reconciliation/bank-transactions.png` | [Reviewing bank transactions](#/reconciliation/reviewing-bank-transactions) |
| `expenses/add-expense.png` | [Recording expenses](#/expenses/recording-expenses) |
| `members/member-list.png` | [Managing members](#/members/managing-members) |
| `members/member-dues-viewer.png` | [Member financial record](#/members/member-financial-record) |
| `reports/weekly-collection-report.png` | [Weekly Collection Report](#/reports/weekly-collection-report) |
| `reports/ledger-backup.png` | [Ledger backup](#/reports/ledger-backup) |
| `administration/role-management.png` | [Assigning roles](#/administration/roles-and-permissions) |
| `administration/sms.png` | [SMS](#/administration/sms-communications) |

## Still to capture by hand

These screens read the Firebase sign-in directly, which demo mode does not provide, so they show “User not authenticated” there. Capture them by signing in with a real test account **on a local environment holding only invented data**. A Firebase test phone number, set up in the Firebase console under Authentication → Sign-in method → Phone → test numbers, avoids real text messages.

| Save as `public/…` | Screen and what it should show | Page |
|---|---|---|
| `images/pledges/treasurer-pledges.png` | Treasurer → Pledges: the pledge list with Pledged/Paid/Outstanding, **Record Pledge**, Edit and Cancel pledge | [Managing pledges](#/pledges/managing-pledges) |
| `images/pledges/pledge-dashboard.png` | Top of Treasurer → Pledges: Received, Still owed, goal progress, fulfilment, monthly collections | [Pledge Dashboard](#/pledges/pledge-dashboard) |
| `images/pledges/fundraising-campaigns.png` | Admin Panel → Fundraising: a drive card with totals, **New Campaign**, View donors, Edit, Close campaign | [Pledge drives](#/pledges/pledge-drives) |

## Worth adding later (no placeholder yet)

| Screen | Why it helps |
|---|---|
| Zelle Review → “This payment may already be recorded” with **Attach to this entry** | The most important duplicate warning |
| **Who is the sender?** choice (Zelle or bank) | Explains on-behalf payments visually |
| Bank line **Possible Existing Entry → Link to this entry** | Prevents double counting |
| **Missing Receipt Numbers** window with Void selected | Receipt audit |
| **Record older {company} charges?** window | Expense rules |
| Benevity **Import complete** summary | Confirms the result |
| Payment Details → **Edit** form | Corrections |
| Edit Member window (four tabs) | Member edits |
| Loans tab, Expense Report, Board Summary | Reports |
| Outreach dashboard, Voicemail inbox | Administration |
| The **Give** page (card form) | Member giving |

When you add an image: save it under `public/images/<section>/`, add a `:::screenshot` block to the page (see [Maintaining this guide](#/about/maintaining-this-guide)), run `npm run check:content`, and look at the page to place the numbered markers.
