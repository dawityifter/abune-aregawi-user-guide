---
title: Finding your way around
order: 3
audience: Everyone
summary: The Dashboard, the top menu, the phone menu at the bottom, the Treasurer and Admin dashboards, and switching language.
updated: 2026-11-11
related: getting-started/roles-and-permissions, dashboard/financial-overview, administration/roles-and-permissions
---

## The Dashboard

After you sign in you land on the **Dashboard**. It has two lists of links.

**Your church** — everyone who is signed in sees these:

| Link | Opens | What it is for |
|---|---|---|
| **Profile** | `/profile` | Your name, contact details, address, baptism name |
| **Dues** | `/dues` | Your household’s membership dues, payment history and yearly statement |
| **Give** | `/donate` | Online giving by card or bank account |
| **Children & Dependents** | `/dependents` | Your spouse and children (heads of household only) |
| **My Service** | `/departments` | Departments and ministries you belong to |
| **Photo Gallery** | `/gallery` | Photos from church events |
| **Church Leadership** | `/board-members` | The current board |
| **Church Bylaw** | `/church-bylaw` | The bylaws, in English and Tigrigna |

**Church administration** — only appears if your role allows it:

| Link | Who sees it | Opens |
|---|---|---|
| **Communications** | Admin, Church Leadership, Secretary (AR Team also sees the link, but sending is refused) | SMS sending page (`/sms`) |
| **Relationship Department** | Admin, Relationship | Outreach dashboard (`/outreach`) |
| **Treasurer** | Every finance role, plus Church Leadership and Secretary (view) | Treasurer Dashboard (`/treasurer`) |
| **Admin Panel** | Admin, Church Leadership, Treasurer, Bookkeeper, Budget Committee, Auditor, AR Team, AP Team | Admin Dashboard (`/admin`) |

:::warning Secretaries: the Admin Panel has no link for you
A **Secretary** may use the Admin Dashboard, but the Dashboard does not show the **Admin Panel** link for that role. Go to it by typing the address: add `/admin` to the end of the site address, for example `https://abunearegawi.church/admin`, and bookmark it. This is a known gap in the application.
:::

:::screenshot images/getting-started/dashboard.png | The Dashboard’s link lists. Staff also see “Church administration”
1 @ 22,14 Your church: links every member has
2 @ 22,66 Church administration: depends on your role
:::

## The Treasurer Dashboard

The Treasurer Dashboard is where nearly all financial work happens. It has two rows of tabs:

| Tab | What you do there | Guide page |
|---|---|---|
| **Overview** | Financial Overview: totals for the year, bank balance, dues status, the Sunday Deposit Check | [Financial Overview](#/dashboard/financial-overview) |
| **Member Payments** | Every recorded payment; search, view and correct; **Add Payment** | [Correcting a payment](#/donations/correcting-a-payment) |
| **Pledges** | The live pledge drive: pledges, amounts paid and owed | [Managing pledges](#/pledges/managing-pledges) |
| **Member Dues** | One household’s dues and full giving record; print a statement | [A member’s financial record](#/members/member-financial-record) |
| **Expenses** | Recorded expenses; **Add Expense** | [Recording expenses](#/expenses/recording-expenses) |
| **Loans (Not Donations)** | Money members lent the church, and repayments | [Member loans](#/donations/member-loans) |
| **Bank Integration** | Upload the Chase statement, import Benevity, reconcile | [Bank reconciliation](#/reconciliation) |
| **Reports** | Weekly Collection, Payment Reports, Expense Report, Board Summary | [Reports](#/reports) |
| **Employees** | Staff on the payroll | [Employees and vendors](#/expenses/employees-and-vendors) |
| **Vendors** | Companies and people the church pays | [Employees and vendors](#/expenses/employees-and-vendors) |
| **Zelle Review** | Zelle payments read from the church’s email | [Zelle](#/donations/zelle) |
| **Square Review** | Payments from the Square card reader | [Square](#/donations/square) |
| **Ledger Backup** | The Google Sheets copy of the ledger | [Ledger backup](#/reports/ledger-backup) |

:::screenshot images/dashboard/treasurer-tabs.png | Treasurer Dashboard tabs: Core Workflow and Admin & Maintenance
1 @ 12,46 Core Workflow tabs
2 @ 28,58 Admin & Maintenance tabs: Zelle Review, Square Review, Ledger Backup
:::

The tabs are in two rows, labelled **Core Workflow** and **Admin & Maintenance**. Everyone who can open the Treasurer Dashboard sees every tab. What a tab will *do* for you depends on your role, and the server enforces this:

| Work | Allowed roles |
|---|---|
| View payments, pledges, reports | Admin, Treasurer, Bookkeeper, AR Team, Auditor, Budget Committee, Church Leadership, Secretary (AP Team: payments and pledges only) |
| Add or edit payments and pledges | Admin, Treasurer, Bookkeeper, AR Team |
| Bank reconciliation (approve, link, record expenses) | Admin, Treasurer, Bookkeeper |
| Zelle Review, Square Review, Benevity import, Loans | Admin, Treasurer |
| Add or edit expenses | Admin, Treasurer, Bookkeeper, AP Team |
| Delete a payment or an expense | Admin only, and not from these screens. See [Correcting a payment](#/donations/correcting-a-payment) |

If you open a tab your role does not allow, it shows an error or “Access denied” and changes nothing.

## The Admin Dashboard (Admin Panel)

| Tab | What it is for | Who sees it | Guide page |
|---|---|---|---|
| **Manage Members** | Member list, add and edit members and dependents | Everyone who can open the panel | [Managing members](#/members/managing-members) |
| **Reports** | Membership summary, household directory, member information report | Admin only | [Member reports](#/reports/member-reports) |
| **Fundraising** | Pledge drives (campaigns). Only Admin can create or change them | Admin, finance roles, Leadership, Secretary | [Pledge drives](#/pledges/pledge-drives) |
| **Merchandise** | Event merchandise (t-shirt) orders and inventory | Admin, Treasurer, Bookkeeper, Leadership, Secretary | [Merchandise](#/administration/merchandise) |
| **Role Management** | Give people roles such as Treasurer or Secretary | Admin only | [Roles and permissions](#/administration/roles-and-permissions) |
| **Departments** | Departments, ministries, their members, meetings and tasks | Everyone who can open the panel | [Departments](#/administration/departments) |
| **Activity Logs** | Who changed what, and when | Admin, Church Leadership | [Activity logs](#/administration/activity-logs) |
| **Messages** | Voicemail inbox and volunteer requests | Everyone who can open the panel | [Voicemail and volunteers](#/administration/voicemail-and-volunteers) |
| **Survey Report** | Results of the church services survey | Admin, Secretary, Church Leadership | [Survey report](#/reports/survey-report) |

## On a phone

On a small screen, a bar at the bottom of the screen has four buttons: **Today** (your Dashboard), **Calendar**, **Give**, and **More**. **More** opens a menu with everything else, including **Sign Out**.

:::tip Treasurer work is easier on a computer
The Treasurer Dashboard works on a phone, but its tables are wide. Use a laptop or desktop for reconciliation and reports.
:::

## Switching language

Use the **language** button in the top menu to switch between **English** and **ትግርኛ (Tigrigna)**. The browser remembers your choice.

:::note Some screens are partly English
A few staff screens still show some English text in Tigrigna mode. Zelle Review is mostly English. This is a known gap, not an error.
:::
