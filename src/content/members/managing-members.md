---
title: Finding, adding and editing members
order: 1
audience: Secretary, Admin
summary: Using Manage Members to search, add a member, edit their details, and deactivate a record.
updated: 2026-11-11
related: members/households-and-dependents, members/duplicate-and-incorrect-records, administration/roles-and-permissions
---

The member list lives in **Admin Panel → Manage Members**. Secretaries reach it at the `/admin` address, because their Dashboard has no link (see [Finding your way](#/getting-started/finding-your-way)).

:::admin Who can do what here
- **View the list:** Admin, Treasurer, Church Leadership, Secretary
- **Add and edit members:** Admin, Secretary
- **Deactivate (“delete”) a member:** Admin only
:::

## The member list

At the top are counts: **Total Households** (registered members), **Total Dependents** (family members), and **Total Congregation** (households + dependents).

Below them you can:

- **Search** by name, email or phone.
- Filter by **Role**, by **Status** (Active / Inactive), and by **Address** (Missing address / Has address). Use **Missing address** to find records that need completing before statements go out.
- Use **Previous** / **Next** to page through results.

:::screenshot images/members/member-list.png | Manage Members: totals, filters, and the member table
1 @ 87,25 Add Member
2 @ 30,39 Household and congregation totals
3 @ 22,59 Search and filters, including Address: Missing address
4 @ 23,84 “No address” warning on a record
5 @ 87,83 Actions: edit, dependents, finances, deactivate
:::

## Adding a member

Use this when someone cannot register themselves, for example an older member without a smartphone.

:::steps
1. Click **Add Member**.
2. Enter the **Phone Number** first. The form checks whether it is already used (“Checking phone…”). **If it is already in use, stop:** the person is probably already registered. Search for them instead.
3. Fill in **First Name** and **Last Name** (required), plus any of Title, Middle Name, Email, Gender, Baptism Name, Repentance Father, Interested in Serving, Yearly Pledge and address.
4. Click save.
5. Search for the new member to confirm they appear.
:::

:::note Add Member always creates a head of household
To add a spouse or child to an existing household, find the head of household and use **Add Dependent** instead. See [Households and dependents](#/members/households-and-dependents).
:::

:::tip The phone number is the sign-in
The member will sign in with exactly the phone number you enter. Use their **own mobile number**, not a relative’s.
:::

### The Yearly Pledge field

**Yearly Pledge** is the member’s membership-dues commitment for the year. The Dues page and the dues reports are calculated from it, starting from the **Date Joined Parish**. A member with no pledge shows as **Not Dues-Tracked**.

## Editing a member

:::steps
1. Find the member and click **Edit**.
2. The **Edit Member** window has four tabs: **Basic Info**, **Contact Info**, **Spiritual Info**, **Family Info**.
3. Change what is needed, then click **Save Changes**.
:::

| Tab | Fields |
|---|---|
| **Basic Info** | Title, names, email, role (display), status (Active/Inactive), gender, date of birth, marital status, Yearly Pledge |
| **Contact Info** | Phone number, emergency contact and phone, street address, city, state, postal code, country |
| **Spiritual Info** | Date Joined Parish, Baptism Name, Repentance Father, Interested in Serving |
| **Family Info** | Household ID and the household’s dependents, with Add / Edit / Delete and **Promote** |

:::warning Changing a phone number changes how that person signs in
After you change a member’s phone number, they must sign in with the **new** number. If they sign in with the old one, the application will not find them and will offer to register them again, creating a duplicate.
:::

:::warning Roles are changed in Role Management, not here
The Role shown in Edit Member is for display. Use **Role Management** to change roles (Admin only). See [Assigning roles](#/administration/roles-and-permissions).
:::

## Deactivating a member (“Delete”)

Deleting a member does **not** erase them. It marks the record **Inactive**. Their payments, pledges and history stay in the books, and they no longer count as an active member. To bring them back, edit the member and set **Status** to **Active**.

Use this when a member has left the parish or passed away. Do **not** use it to remove a duplicate registration. A duplicate needs its payments moved first. See [Duplicate and incorrect records](#/members/duplicate-and-incorrect-records).

## Common mistakes

| Mistake | What happens | Fix |
|---|---|---|
| Registering someone who already exists | Two records; their payments split between them; dues look short on both | See [Duplicate records](#/members/duplicate-and-incorrect-records) |
| Using a spouse’s phone for both spouses | Only one of them can sign in; the second registration fails or duplicates | Give each adult their own number. A spouse without a phone can be a dependent of the head of household. |
| Missing **Date Joined Parish** | Dues are calculated from the wrong start | Set it under **Spiritual Info** |
| Missing address | Statements and directory are incomplete | Use the **Missing address** filter regularly |
