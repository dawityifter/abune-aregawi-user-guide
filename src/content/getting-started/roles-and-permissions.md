---
title: Roles — who can do what
order: 4
audience: Everyone
summary: The twelve roles in the application, what each one is for, and how they combine.
updated: 2026-11-21
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
| **AR Team (Income)** | Income side: record and edit payments, pledges and dues; reads member records and every financial transaction | Finance volunteer for income |
| **AP Team (Expenses)** | Expense side: record and edit expenses; reads member records and every financial transaction | Finance volunteer for bills |
| **Budget Committee** | Read financial records and reports; budget approval | Budget committee members |
| **Auditor/Reviewer** | **View-only** access to the books, member records and activity logs | Internal auditor |
| **Church Leadership** | **View-only** oversight of members, finances, departments, merchandise and activity logs; sends SMS to the congregation and publishes announcements and events | Board members, priest |
| **Secretary** | Member registration and edits, SMS, documentation | Church secretary |
| **🤝 Relationship Department** | Welcoming new members; adding and editing member records; announcements and events | Relationship department |
| **Member** | Own profile, household, dues and giving; give online | Every registered member |
| **Guest** | Public pages only | Not signed in |

## Church Leadership is view-only

Church Leadership can open the **Admin Panel** and the **Treasurer Dashboard** and see everything there, but cannot add, change or delete records. Both dashboards show this notice to a Church Leadership or Auditor user:

> **View-only access.** You can view and monitor all activity, but you can't add, change or delete records. If something needs changing, contact the responsible role: the Treasurer for finances, the Secretary for member records, or the Administrator for roles and settings.

Edit buttons are hidden from Church Leadership on Manage Members, Departments, Merchandise and the Gallery, and throughout the Treasurer Dashboard:

- **Payments:** the details panel has no **Edit** button.
- **Loans:** sees the loans list, but no **Record Loan** or **Repayment** buttons.
- **Bank:** no statement upload, no **Import Benevity Donations**, no **Auto-reconcile pending**, no selection checkboxes or **Undo**. A bank line's details show no actions.
- **Zelle:** sees the **Zelle Review** list, but no **Sync Now**. Payments not yet recorded show **Not matched yet** instead of the matching form.
- **Square:** sees the **Square Review** list, but no date range or **Sync from Square**, no selection, and no action row under each payment.
- **Backups:** the tab is hidden; ledger backup settings are for Admin and Treasurer only.
- **Payments**, **Pledges**, **Expenses**, **Employees** and **Vendors** already showed their add and edit buttons only to the roles that can use them.

If they try a change anyway, the server refuses it with the same message.

## Auditor is view-only too

**Auditor/Reviewer** works exactly like Church Leadership above: the same notice, the same hidden buttons, the same refusals. It sees:

- **Treasurer Dashboard:** every tab except **Backups**, including **Loans**, **Employees**, **Vendors** and the **Zelle** and **Square** review lists.
- **Admin Panel:** **Manage Members** (read-only), **Fundraising** (read-only) and **Activity Logs**.

Unlike Church Leadership, Auditor has **no exceptions**: it cannot send SMS, publish announcements or events, promote dependents or archive voicemails. Someone who holds Auditor and another staff role, such as Treasurer, keeps that role's rights; for a real check of the books, give Auditor to someone who does not also record the money.

Church Leadership **can still**:

- **Send SMS** to members, groups, departments or the whole congregation.
- **Email meeting minutes** to a department.
- **Promote a dependent** to their own member account.
- **Archive voicemails.**
- **Publish public announcements and parish events**: add, edit and cancel them, and set the TV rotation, on the **Outreach** page. There it also sees the **Pending Welcomes** and **Already Welcomed** lists, but cannot mark anyone welcomed.
- Do everything a **Member** can for themselves: their own profile, giving, pledges and household.
- Manage meetings, tasks and members in a **department they lead or belong to**, with the rights of their role in that department.

:::note Holding a second role
The view-only rule applies only when Church Leadership is a person's **only** staff role. A board member who is also, say, **Secretary** or **Treasurer** keeps everything that role allows and does not see the notice.
:::

## Relationship manages members

The **Relationship** department welcomes newcomers and keeps member records up to date:

- **Admin Panel → Manage Members** is open to Relationship, with **Add Member** and **Edit** for every member, including dependents. It is the only Admin Panel tab Relationship sees.
- Relationship cannot **delete** a member or **change anyone's role**; those stay with the Administrator.
- Member finances (pledges, dues) are not shown to Relationship in the member list.
- On the **Outreach** page it welcomes new members and publishes announcements and events, as before.

## AR Team and AP Team

The two finance-team roles split the work by direction of money, and both can see the whole picture:

- **Both** read the member list (Admin Panel → **Manage Members**, read-only) and every financial screen on the Treasurer Dashboard: payments, pledges, member dues, expenses, bank lines, Zelle, Square, loans, employees, vendors and reports. On the screens they cannot act on, they see no action buttons.
- **AR Team** records and edits **payments** with **Add Payment** and **Edit**, and records pledges and dues. It does not match Zelle or Square payments; that stays with the Treasurer.
- **AP Team** records and edits **expenses** with **Add Expense** and **Edit**, picking the payee from the employee and vendor lists. Adding or changing an employee or vendor stays with the Administrator.
- Neither reconciles the bank, sends SMS or changes member records.

## What each role can do — at a glance

✔ = allowed, ◐ = view only, blank = not allowed. The server enforces these limits.

| Task | Admin | Treasurer | Bookkeeper | AR | AP | Budget | Auditor | Leadership | Secretary | Relationship |
|---|---|---|---|---|---|---|---|---|---|---|
| View the member list | ✔ | ◐ | | ◐ | ◐ | | ◐ | ◐ | ✔ | ✔ |
| Add and edit members | ✔ | | | | | | | | ✔ | ✔ |
| Delete members, change roles | ✔ | | | | | | | | | |
| Record and edit payments | ✔ | ✔ | ✔ | ✔ | | | | | | |
| View payments, expenses and reports | ✔ | ✔ | ✔ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | |
| Bank reconciliation | ✔ | ✔ | ✔ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | |
| Zelle, Square, Benevity, Loans | ✔ | ✔ | | ◐ Zelle, Square, Loans | ◐ Zelle, Square, Loans | | ◐ Zelle, Square, Loans | ◐ Zelle, Square, Loans | | |
| Record and edit expenses | ✔ | ✔ | ✔ | | ✔ | | | | | |
| Create and edit pledge drives | ✔ | | | | | | | | | |
| Record pledges | ✔ | ✔ | ✔ | ✔ | | | | | | |
| Send SMS | ✔ | | | | | | | ✔ | ✔ | |
| Welcome new members | ✔ | | | | | | | ◐ | | ✔ |
| Announcements and events | ✔ | | | | | | | ✔ | | ✔ |
| Activity logs | ✔ | | | | | | ◐ | ◐ | | |
| Delete payments or expenses | ✔ (by a technical administrator) | | | | | | | | | |

:::note Where this table comes from
It reflects the checks in the application’s code as of the date at the top of this page: `frontend/src/utils/roles.ts` and the role lists on each backend route. If the two ever disagree, the **server** decides. A button that appears but returns “Access denied” means the server refused.
:::

:::warning Known gaps between what you see and what is allowed
- **Secretary** can open the Admin Dashboard at `/admin`, but the Dashboard shows no link to it.
- **Bookkeeper** is described as able to view all members, but the member list does not load for that role.

These are recorded in [open questions](#/about/open-questions) for the developer.
:::

## Principles for giving out roles

1. **Give the smallest role that does the job.** A volunteer who only enters Sunday cash needs **AR Team**, not **Treasurer**.
2. **Have at least two Admins.** If the only Admin leaves, nobody can change roles. See [Account recovery](#/continuity/account-recovery).
3. **Separate recording from checking.** The person who records money should not be the only person reviewing it. Give the reviewer **Auditor**.
4. **Remove roles promptly** when someone steps down, the same week they leave.
5. **Review roles every year.** At the annual handover, go through Role Management and confirm every non-Member role is still needed.
