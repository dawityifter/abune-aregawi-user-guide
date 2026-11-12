---
title: Assigning roles (Role Management)
order: 1
audience: Admin
summary: Giving and removing roles, combining roles, and handling a staff member’s arrival and departure.
updated: 2026-11-11
related: getting-started/roles-and-permissions, continuity/account-recovery, administration/activity-logs
---

**Admin Panel → Role Management** (“Manage member roles and permissions”). Only **Admin** sees this tab.

## Giving someone a role

:::steps
1. The person must be **registered** and able to sign in. See [Signing in](#/getting-started/signing-in).
2. **Admin Panel → Role Management**. Use **Search**, or filter by **Role**, to find them.
3. Click **Change Role** on their row.
4. In **Updating role for {name}**, tick every role they should have under **New Role**. A person can hold several, for example *Treasurer* and *Secretary*. Each role’s description is shown beside it.
5. Click **Update Role**. You can’t remove every role; at least one must stay, normally **Member**.
6. Ask the person to **sign out and sign in again**, then check they can see their new screens.
:::

:::screenshot images/administration/role-management.png | Role Management: how many people hold each role, and the Update Role list
1 @ 46,38 Number of people holding each role
2 @ 22,90 Search for the person, then Change Role
:::

## When someone joins or leaves a role

| Event | Do this |
|---|---|
| New treasurer | Give **Treasurer** (keep **Member**). Walk them through [A new treasurer’s first week](#/getting-started/treasurer-first-week). |
| Treasurer steps down | On their last day, untick **Treasurer**. Check the new treasurer has it first. |
| Volunteer helps with Sunday entry only | **AR Team** |
| Auditor reviewing the year | **Auditor/Reviewer** for the review period, then remove it |
| Admin leaves | Make sure at least **two other** Admins exist before removing theirs |

## Annual role review

Once a year, filter **Role Management** by each role other than *Member* and confirm every person still needs it. Record the review in the church minutes.

:::danger Never leave the church with one Admin
Only an Admin can change roles. If the only Admin is unavailable, nobody can give the next treasurer access without a developer changing the database directly. Keep **two** Admins at all times. See [Account recovery](#/continuity/account-recovery).
:::

:::note Role changes are logged
Every role change is written to the **Activity Logs**. The server accepts role changes only from an Admin.
:::
