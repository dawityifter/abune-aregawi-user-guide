---
title: Finding your way around
order: 3
audience: Everyone
summary: The Dashboard, the top menu, the phone menu at the bottom, the Treasurer and Admin dashboards, and switching language.
updated: 2026-11-23
related: getting-started/roles-and-permissions, dashboard/financial-overview, administration/roles-and-permissions
---

## The top menu

The bar at the top of every page shows the church name (a link to the home page), **Dashboard** once you are signed in, **Make a Pledge** while a pledge drive is running, the **EN / ትግ** language switch, **Help**, and **Sign in or join** or **Sign Out**. On the home page, visitors who are not signed in also see **Become a member**, which opens the same sign-in page.

**Help** (ሓገዝ in Tigrigna) opens this guide in a new browser tab, so you can read the instructions while the application stays open.

## The Dashboard

After you sign in you land on the **Dashboard**. From the top it shows:

1. **Your greeting**, then **today in the Church** (the feast, fast or commemoration) and **the next service**.
2. **This week at the parish**: up to three parish events in the next seven days, each with **Add to my calendar**. It does not appear when no events are planned.
3. **Your standing**: membership dues for the year (with **Pay my dues** and **See your dues** when a balance is due) and what you have given this year. A member with a pledge in the running drive also sees **how much of the pledge has been given** and **Pay toward my pledge**, which opens the give page with **Apply to my pledge** already ticked.
4. **Finish your profile**, if details are still missing, then parish news.

:::screenshot images/member/dashboard.png | The top of a member’s Dashboard: today in the Church, the next service, this week at the parish
ti: images/ti/member/dashboard.png
1 @ 5,58 **This week at the parish**: events staff have published
2 @ 6,74 **Add to my calendar** downloads the event for your phone’s calendar
3 @ 7,44 **Next service**, with **Directions**
:::

:::screenshot images/member/dashboard-more.png | Further down: your standing and the Finish your profile card
ti: images/ti/member/dashboard-more.png
1 @ 6,61 **Finish your profile** lists what is still missing
2 @ 6,74 **Complete my profile** opens your profile with the first missing item selected
3 @ 30,74 **Not now** hides the card
:::

Below that, on a computer, are two lists of links. On a phone there are four quick links instead (**Family**, **My Service**, **Gallery**, **Help**), because the rest are in the **Give** tab and **More** menu described below.

**Your church** — everyone who is signed in sees these:

| Link | Opens | What it is for |
|---|---|---|
| **Profile** | `/profile` | Your name, contact details, address, baptism name |
| **Dues** | `/dues` | Your household’s membership dues, payment history and yearly statement |
| **Give** | `/donate` | Online giving by card, bank account, Apple Pay or Google Pay |
| **Children & Dependents** | `/dependents` | Your spouse and children (heads of household only) |
| **My Service** | `/departments` | Departments and ministries you belong to |
| **Photo Gallery** | `/gallery` | Photos from church events |
| **Church Leadership** | `/board-members` | The current board |
| **Church Bylaw** | `/church-bylaw` | The bylaws, in English and Tigrigna |

**Church administration** — only appears if your role allows it:

| Link | Who sees it | Opens |
|---|---|---|
| **Communications** | Admin, Church Leadership, Secretary | SMS sending page (`/sms`) |
| **Relationship Department** | Admin, Relationship, Church Leadership, Secretary (announcements and events only) | Outreach dashboard (`/outreach`) |
| **Treasurer** | Every finance role, plus Church Leadership (view) | Treasurer Dashboard (`/treasurer`) |
| **Admin Panel** | Admin, Church Leadership, Treasurer, Bookkeeper, Budget Committee, Auditor, AR Team, AP Team, Secretary, Relationship | Admin Dashboard (`/admin`) |


:::screenshot images/getting-started/dashboard.png | The Dashboard’s link lists. Staff also see “Church administration”
1 @ 22,14 Your church: links every member has
2 @ 22,66 Church administration: depends on your role
:::

### On a phone

On a phone the same Dashboard is one column, with four tabs at the bottom: **Today**, **Calendar**, **Giving** and **More**. **More** holds the language choice, your profile, family, departments, gallery, board, bylaw, **Make a Pledge**, **Help** and **Sign Out**.

:::screenshot images/mobile/dashboard.png | A phone’s Dashboard, with the four tabs at the bottom
ti: images/ti/mobile/dashboard.png
:::

:::screenshot images/mobile/more.png | The More menu on a phone: language choice at the top, then the other pages
ti: images/ti/mobile/more.png
1 @ 45,41 **English / ትግርኛ**: the whole application, and these screenshots, switch language
2 @ 3,48 **My Profile** and the other pages
:::

:::screenshot images/mobile/giving.png | The Giving tab: Give, My dues, Statements and Make a Pledge
ti: images/ti/mobile/giving.png
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
| View payments, pledges, expenses, reports | Admin, Treasurer, Bookkeeper, AR Team, AP Team, Auditor, Budget Committee, Church Leadership |
| Add or edit payments and pledges | Admin, Treasurer, Bookkeeper, AR Team |
| Bank reconciliation (approve, link, record expenses) | Admin, Treasurer, Bookkeeper |
| Zelle Review, Square Review, Benevity import, Loans | Admin, Treasurer; Bookkeeper works Zelle and Square and reads Loans (Church Leadership, Auditor, AR Team and AP Team see Zelle, Square and Loans read-only) |
| Add or edit expenses | Admin, Treasurer, Bookkeeper, AP Team |
| Delete a payment or an expense | Admin only, and not from these screens. See [Correcting a payment](#/donations/correcting-a-payment) |

If you open a tab your role does not allow, it shows an error or “Access denied” and changes nothing.

## The Admin Dashboard (Admin Panel)

| Tab | What it is for | Who sees it | Guide page |
|---|---|---|---|
| **Manage Members** | Member list, add and edit members and dependents | Everyone who can open the panel | [Managing members](#/members/managing-members) |
| **Reports** | Membership summary, household directory, member information report | Admin, Secretary | [Member reports](#/reports/member-reports) |
| **Fundraising** | Pledge drives (campaigns). Only Admin can create or change them | Admin, finance roles, Leadership | [Pledge drives](#/pledges/pledge-drives) |
| **Merchandise** | Event merchandise (t-shirt) orders and inventory | Admin, Treasurer, Bookkeeper, Leadership, Secretary | [Merchandise](#/administration/merchandise) |
| **Role Management** | Give people roles such as Treasurer or Secretary | Admin only | [Roles and permissions](#/administration/roles-and-permissions) |
| **Departments** | Departments, ministries, their members, meetings and tasks | Admin, Church Leadership, Secretary, Treasurer | [Departments](#/administration/departments) |
| **Activity Logs** | Who changed what, and when | Admin, Church Leadership, Auditor, Secretary | [Activity logs](#/administration/activity-logs) |
| **Messages** | Voicemail inbox and volunteer requests | Admin, Church Leadership, Secretary | [Voicemail and volunteers](#/administration/voicemail-and-volunteers) |
| **Survey Report** | Results of the church services survey | Admin, Secretary, Church Leadership | [Survey report](#/reports/survey-report) |

## Long lists

Every long list (members, payments, expenses, bank lines, loans, activity logs and the rest) ends with the same bar:

- **“Showing 51–60 of 486”** says where you are.
- A few page numbers around the page you are on, with **…** for the pages in between. **‹** and **›** move one page; **«** and **»** jump to the first and last page.
- **Rows** chooses how many lines a page shows: 10, 20, 50 or 100. Each list remembers your choice on that browser.
- Changing a filter or a search goes back to the first page.

On a phone the bar shrinks to **‹ Page 6 of 49 ›**. To find one person or payment, use the list's search and filters rather than paging.

## On a phone

On a small screen, a bar at the bottom of the screen has four buttons: **Today** (your Dashboard), **Calendar**, **Giving**, and **More**. The top bar has no menu button of its own; **More** is the one phone menu. It holds your Profile, Family, Ministries, Gallery, leadership and bylaws, **Make a Pledge** (while a drive is running), the language choice, **Help** (this guide) and **Sign Out**.

**Giving** (when you are signed in) opens a short page with **Give**, **My dues**, **Statements** (last year’s contribution statement) and **Make a Pledge** while a drive is running. Visitors who are not signed in go straight to the give page.

The **Calendar** tab shows **Upcoming at the parish** (events) above the feasts-and-fasts calendar.

:::tip Treasurer work is easier on a computer
The Treasurer Dashboard works on a phone, but its tables are wide. Use a laptop or desktop for reconciliation and reports.
:::

## Switching language

Use the **language** button in the top menu to switch between **English** and **ትግርኛ (Tigrigna)**. The browser remembers your choice.

:::note Some screens are partly English
A few staff screens still show some English text in Tigrigna mode. Zelle Review is mostly English. This is a known gap, not an error.
:::
