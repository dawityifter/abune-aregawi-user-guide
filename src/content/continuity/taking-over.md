---
title: Taking over — if the original developer is unavailable
order: 1
audience: Church leadership, replacement technical administrator
summary: What to do, in order, if the person who built and runs the application can no longer help — starting tomorrow.
updated: 2026-11-11
status: needs-confirmation
related: continuity/integrations, continuity/account-recovery, continuity/backup-and-recovery, continuity/developer-onboarding, continuity/ownership-matrix
---

This page assumes the original developer and technical administrator is **unavailable from tomorrow** and can’t answer questions. The church must be able to keep the application running, keep the books, and hand it to someone new.

:::note The good news
**Day-to-day church work does not need a developer.** The treasurer, secretary and administrators can carry on with every task in this guide. What needs attention is *ownership*: the accounts, keys and servers that keep the application alive.
:::

## The first week

:::steps
1. **Keep working normally.** Treasurers keep recording and reconciling as in [the treasurer’s routine](#/getting-started/treasurer-first-week). Nothing stops working because the developer is away.
2. **Don’t change anything technical** (servers, settings, code) until someone qualified is in place. The system is designed to run unattended.
3. **Check two Admins exist** in the application (Admin Panel → Role Management). If not, see [Account recovery](#/continuity/account-recovery).
4. **Find the password manager entries** for each service in the [integration inventory](#/continuity/integrations). Note which ones only the developer could open; those are the urgent recoveries.
5. **Write down every service’s renewal or billing date** you can find: domain, Twilio balance, Supabase, Firebase. A lapsed payment is the most likely way the system stops.
6. **Appoint an interim technical contact**: a volunteer or paid developer who will read [Developer onboarding](#/continuity/developer-onboarding).
:::

## The first month

:::steps
1. **Recover or transfer ownership** of every critical account, in this order: **GitHub** (the code and the deployment), **Supabase** (the database: all records), **Oracle Cloud** (the server running the API), **Firebase / Google Cloud** (website hosting and sign-in), the **domain registrar** for `abunearegawi.church`, then **Stripe**, **Square** and **Twilio**, and the **Google / Gmail** account that receives Zelle emails and holds Drive and Sheets.
2. **Secure a database backup off the server.** A nightly dump is already taken on the API server (`/var/www/backup/`, about 4 days kept). Copy the newest one, encrypted, to church-owned storage. See [Backup and recovery](#/continuity/backup-and-recovery).
3. **Give the new technical administrator access** through each service’s own user management, never by sharing one login.
4. **Make two church people administrators** of every service. See the [ownership matrix](#/continuity/ownership-matrix).
5. **Record everything** in the password manager and update this guide’s [open questions](#/about/open-questions).
:::

## A. Application ownership — GitHub

| Item | Current state | What the church should do |
|---|---|---|
| Source code | Repository `abune-aregawi` on GitHub, under the **developer’s personal account** | Create a **GitHub organization** owned by the church (two church owners) and **transfer** the repository to it: repository Settings → General → Danger Zone → *Transfer ownership*. Needs the current owner, or GitHub Support if the owner can’t be reached |
| Visibility | **Private** (must stay private) | Never make it public |
| Deployment secrets | GitHub Actions secrets in the repository | Move with the repository. After a transfer, check every secret is still present and redeploy |
| This guide | Planned separate repository `abune-aregawi-user-guide` | Keep in the same church organization |
| Adding a developer | Repository → Settings → Collaborators (or organization Teams) | Give **Write** for development; only owners get **Admin**. Remove access when they leave |

:::warning GitHub Pages and privacy
This guide is published with GitHub Pages, which on standard plans makes the site **public**, even from a private repository on a paid plan. The guide therefore contains no secrets, member data or server addresses. Keep it that way.
:::

## B. Infrastructure and hosting

| Piece | Provider | How to check it | Dashboard |
|---|---|---|---|
| Website | Firebase Hosting (Google) | Website loads | console.firebase.google.com → project `abune-aregawi-church-app` → Hosting |
| API server | Oracle Cloud (OCI) VM | `https://api.abunearegawi.church/api/ready` | cloud.oracle.com → Compute → Instances |
| Database | Supabase | `/api/ready` returns ready | supabase.com/dashboard |
| Domain and DNS | **Unknown registrar**; needs confirmation | `api.abunearegawi.church` resolves | Registrar’s website |
| Code and deploys | GitHub | Actions tab | github.com |

To **redeploy** after recovering access, see [Hosting and deployment](#/technical/hosting-and-deployment). To **rebuild** the API server from nothing, see [Backup and recovery](#/continuity/backup-and-recovery?h=rebuilding-the-api-server).

## Further pages

- [Integration inventory](#/continuity/integrations): every outside service, what it does, and how to restore it
- [Account recovery](#/continuity/account-recovery): getting back into each account
- [Backup and disaster recovery](#/continuity/backup-and-recovery): the nightly database dump, and what it doesn’t cover
- [Developer onboarding](#/continuity/developer-onboarding): the checklist for a replacement developer
- [Ownership matrix](#/continuity/ownership-matrix): who should own what
