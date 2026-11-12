---
title: Roles — who can do what
order: 4
audience: Everyone
summary: The twelve roles in the application, what each one is for, and how they combine.
updated: 2026-11-11
related: administration/roles-and-permissions, getting-started/finding-your-way, continuity/ownership-matrix
---

Every person in the application has at least one **role**. The role decides which screens appear and what the server will allow. A person can hold **several roles at once**. They then get everything any of their roles allows. For example, Treasurer plus Secretary.

New members automatically get the **Member** role when they register. Only an **Admin** can change roles; see [Assigning roles](#/administration/roles-and-permissions).

## The roles

| Role (as shown in the app) | Purpose | Typical person |
|---|---|---|
| **Admin/Super Admin** | Full access to everything, including roles and deletion | One or two trusted administrators |
| **Treasurer** | The main finance role: payments, expenses, pledges, bank reconciliation, Zelle, Square, Benevity, loans, reports | The treasurer |
| **Bookkeeper** | Day-to-day finance: record payments and expenses, reconcile the bank, run reports. No budget approval, no Zelle/Square/Benevity/Loans screens | Assistant treasurer |
| **AR Team (Income)** | Income side: record payments and pledges, track contributions, send receipts | Finance volunteer for income |
| **AP Team (Expenses)** | Expense side: record and edit expenses, manage vendors | Finance volunteer for bills |
| **Budget Committee** | Read financial records and reports; budget approval | Budget committee members |
| **Auditor/Reviewer** | Read-only view of financial records and activity logs | Internal auditor |
| **Church Leadership** | Members (view and edit), reports, events, communications, pledge drives (view) | Board members, priest |
| **Secretary** | Member registration and edits, SMS, documentation | Church secretary |
| **🤝 Relationship Department** | Welcoming new members, outreach dashboard, announcements | Relationship department |
| **Member** | Own profile, household, dues and giving; give online | Every registered member |
| **Guest** | Public pages only | Not signed in |

## What each role can do — at a glance

✔ = allowed, ◐ = view only, blank = not allowed. The server enforces these limits.

| Task | Admin | Treasurer | Bookkeeper | AR | AP | Budget | Auditor | Leadership | Secretary | Relationship |
|---|---|---|---|---|---|---|---|---|---|---|
| View the member list | ✔ | ◐ | | | | | | ◐ | ✔ | ◐ new members only |
| Edit members | ✔ | | | | | | | | ✔ | |
| Delete members, change roles | ✔ | | | | | | | | | |
| Record and edit payments | ✔ | ✔ | ✔ | ✔ | | | | | | |
| View payments and reports | ✔ | ✔ | ✔ | ✔ | ◐ | ◐ | ◐ | ◐ | ◐ | |
| Bank reconciliation | ✔ | ✔ | ✔ | | | | | | | |
| Zelle, Square, Benevity, Loans | ✔ | ✔ | | | | | | | | |
| Record and edit expenses | ✔ | ✔ | ✔ | | ✔ | | | | | |
| Create and edit pledge drives | ✔ | | | | | | | | | |
| Record pledges | ✔ | ✔ | ✔ | ✔ | | | | | | |
| Send SMS | ✔ | | | | | | | ✔ | ✔ | |
| Outreach & announcements | ✔ | | | | | | | | | ✔ |
| Activity logs | ✔ | | | | | | | ✔ | | |
| Delete payments or expenses | ✔ (by a technical administrator) | | | | | | | | | |

:::note Where this table comes from
It reflects the checks in the application’s code as of the date at the top of this page: `frontend/src/utils/roles.ts` and the role lists on each backend route. If the two ever disagree, the **server** decides. A button that appears but returns “Access denied” means the server refused.
:::

:::warning Known gaps between what you see and what is allowed
- **Church Leadership** and **Relationship** see member-edit buttons, but the server only accepts member edits from **Admin** and **Secretary**. Their saves fail with “Access denied”.
- **Secretary** can open the Admin Dashboard at `/admin`, but the Dashboard shows no link to it.
- **AR Team** sees the **Communications** link, but only Admin, Church Leadership and Secretary can actually send SMS.
- **Bookkeeper**, **AR Team** and **Auditor** are described as able to view all members, but the member list only loads for Admin, Treasurer, Church Leadership and Secretary.

These are recorded in [open questions](#/about/open-questions) for the developer.
:::

## Principles for giving out roles

1. **Give the smallest role that does the job.** A volunteer who only enters Sunday cash needs **AR Team**, not **Treasurer**.
2. **Have at least two Admins.** If the only Admin leaves, nobody can change roles. See [Account recovery](#/continuity/account-recovery).
3. **Separate recording from checking.** The person who records money should not be the only person reviewing it. Give the reviewer **Auditor**.
4. **Remove roles promptly** when someone steps down, the same week they leave.
5. **Review roles every year.** At the annual handover, go through Role Management and confirm every non-Member role is still needed.
