---
title: Screenshot checklist
order: 3
audience: Technical administrator, guide maintainers
summary: Which application screenshots are in the guide, how each was captured, and how to capture them safely with invented data.
updated: 2026-11-15
related: about/maintaining-this-guide, about/completeness-checklist
---

:::danger Screenshots are published on the internet
Never take a screenshot from the live application or from any copy of real church data. Almost every image in this guide comes from a **separate demo environment filled with invented people and amounts**. The three pledge screens below were taken locally with every name replaced first (see “Captured by hand” below). Phone numbers are in the fictional range 555-0100–0199, and emails use example.org.
:::

## How the screenshots were made

1. A separate, empty local database (`aa_guide_demo`) was created from the application’s **schema only** (structure, no rows).
2. It was filled with invented members, payments, pledges, expenses, Zelle and Square items by a seed script. A synthetic Chase CSV and a synthetic Benevity report were then uploaded **through the real screens**.
3. The application’s own backend and frontend ran locally in **demo mode**, with every outside service (Gmail, Google Sheets, Twilio, Stripe, Square, Sentry, email) switched off.
4. `scripts/capture-app.mjs` in this repository opened each screen and saved the image to `public/images/`.

Member-facing screens (joining, the Dashboard, Profile, Dues, Give, family, calendar, phone layouts) are captured by `scripts/capture-member.mjs`. It signs in with the application’s built-in demo sign-in, serves the profile of an **invented** household head (or an invented new visitor for the join screens), and saves every screen **twice**: `public/images/<name>.png` in English and `public/images/ti/<name>.png` with the application switched to **Tigrigna**. It also measures where the numbered markers go on each screen. Run it against the local demo environment only; it refuses the real site.

The demo environment files (seed script, synthetic CSVs, settings) are not in this repository. Ask the technical administrator, or rebuild them by following the steps above.

## Needs recapturing

| Image | Why |
|---|---|
| `getting-started/dashboard.png` | The staff view of the Dashboard. A **Finish your profile** card can now appear under the greeting (2026-11-14). The member view is covered by `member/dashboard-more.png`. |

The Treasurer, Admin, SMS and Outreach screens cannot be captured with the demo sign-in: several panels read the Firebase sign-in directly, which demo mode does not provide, so they show “User not authenticated” or “Access Denied”. Retaking them needs the Firebase sign-in emulator, which the application is not set up for yet.

## Screenshots with a Tigrigna twin

Each pair is the same screen, in English and in Tigrigna. The guide shows an **English / ትግርኛ** switch above the picture, and remembers the choice for the whole guide. The numbered markers are placed on the English picture and hidden in the Tigrigna view, because the Tigrigna text can change the layout.

| Image (English; Tigrigna is the same path under `ti/`) | Page |
|---|---|
| `join/sign-in.png`, `join/code.png` | [Signing in](#/getting-started/signing-in) |
| `join/step-name.png`, `join/step-household.png`, `join/step-address.png`, `join/step-family.png`, `join/welcome.png` | [Signing in](#/getting-started/signing-in) |
| `member/dashboard.png`, `member/dashboard-more.png`, `mobile/dashboard.png`, `mobile/more.png`, `mobile/giving.png` | [Finding your way](#/getting-started/finding-your-way) |
| `member/profile.png`, `member/profile-complete.png`, `member/dues.png`, `member/pay-dues.png`, `member/giving.png`, `member/pledge.png`, `member/my-service.png`, `member/calendar.png` | [What members can do themselves](#/members/member-self-service) |
| `member/give.png`, `mobile/give.png` | [Online giving with Stripe](#/donations/online-giving-stripe) |
| `member/family.png` | [Households and dependents](#/members/households-and-dependents) |

The Apple Pay and Google Pay button does not appear in these pictures: it only shows on a device that has a wallet, once the church’s domain is registered with Stripe.

## Captured automatically

| Image | Page |
|---|---|
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

## Captured by hand

These screens read the Firebase sign-in directly, which demo mode does not provide, so they show “User not authenticated” there. They were captured on 2026-11-11 from a local environment signed in as an administrator, using the browser’s zoom capture. Because that environment held real data, **every donor name, the signed-in user’s name and the welcome email were replaced in the page with invented ones** (“Abel Example”, “Demo User”, admin@example.org) before each capture. Nothing was saved back to the database.

| Image | Screen | Page |
|---|---|---|
| `pledges/treasurer-pledges.png` | Treasurer → Pledges: the pledge list with **Record Pledge**, Edit and Cancel pledge | [Managing pledges](#/pledges/managing-pledges) |
| `pledges/pledge-dashboard.png` | Top of Treasurer → Pledges, with Monthly collections opened | [Pledge Dashboard](#/pledges/pledge-dashboard) |
| `pledges/fundraising-campaigns.png` | Admin Panel → Fundraising: drive cards with **New Campaign**, View donors, Edit, Activate, Close campaign | [Pledge drives](#/pledges/pledge-drives) |

To retake them, prefer a local environment with only invented data. If you must use real data, replace every name, phone number and email on screen first, and crop out anything you could not replace.

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
| Outreach dashboard, Voicemail inbox (need the Firebase sign-in emulator, see above) | Administration |

When you add an image: save it under `public/images/<section>/`, add a `:::screenshot` block to the page (see [Maintaining this guide](#/about/maintaining-this-guide)), run `npm run check:content`, and look at the page to place the numbered markers.
