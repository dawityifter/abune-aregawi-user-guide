---
title: Account recovery
order: 3
audience: Church leadership, technical administrator
summary: How the church regains control of each account if the person holding it leaves, loses access, or cannot be reached.
updated: 2026-11-11
related: continuity/integrations, continuity/taking-over, administration/roles-and-permissions
---

The safest recovery is the one you never need: **two church administrators on every account**, recorded in the password manager. Where that wasn’t done, here is what to do.

| Situation | What to do | Needs the provider’s help? |
|---|---|---|
| **Nobody is an Admin in the application** | A technical administrator with database access gives one trusted member the `admin` role directly in the database (the member’s role fields in the `members` table). That Admin then uses Role Management for everyone else | No, but needs the database |
| **The original developer is unavailable** | Follow [Taking over](#/continuity/taking-over); recover each account below | Often |
| **A GitHub owner leaves** | If another owner exists, they remove the person and add a new owner. If the repository is in the developer’s personal account and they can’t be reached, contact **GitHub Support** with proof the church owns the code; it may not succeed. Act early: transfer the repository to a church organization **now** | Yes, if no other owner |
| **Hosting credentials lost (Oracle Cloud)** | Use the account’s recovery (email/phone on the tenancy). If only the developer’s email is on it, contact **Oracle Support**. As a fallback, build a new server and point DNS at it ([Backup and recovery](#/continuity/backup-and-recovery?h=rebuilding-the-api-server)) | Usually |
| **Database account lost (Supabase)** | Organization owners can invite members. Otherwise **Supabase Support**. Keep regular backups so the data never depends on one login | Yes, if no other owner |
| **Firebase / Google Cloud** | Project **Owners** can add new owners (IAM). If none remain, Google Cloud support or account recovery | Yes, if no other owner |
| **Domain registrar inaccessible** | The registrar’s account recovery; proof of identity or organization may be needed. If the domain lapses, renew immediately; most registrars give a short grace period | Yes |
| **An integration token expires** (Gmail, Drive, Square, Stripe) | Create a new token in the service, update the GitHub secret, redeploy. See [Configuration and secrets](#/technical/configuration-and-secrets) | No |
| **A payment provider needs re-authorization** (Stripe or Square identity checks, bank re-verification) | Must be done by an **authorized church representative** on the account, often with church documents (EIN letter, bank details) | Yes |
| **The database administrator is unavailable** | Anyone holding the `DATABASE_URL` GitHub secret can reach the database, which is why GitHub access must be controlled | — |
| **A staff member loses their phone** | They get a new SIM with the same number from their carrier, then sign in as normal. If the number changes, the Secretary updates it on their member record (Edit Member) | No |

:::tip Recovery kit for the password manager
For each service, record: the login email (a **church** address, not a personal one), who the two administrators are, the recovery phone and email, any backup codes for two-step sign-in, the billing method, and the renewal date.
:::
