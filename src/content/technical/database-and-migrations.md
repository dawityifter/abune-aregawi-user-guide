---
title: Database and migrations
order: 5
audience: Technical administrator, developers
summary: The production database, the two migration systems, and the safety rules for touching production data.
updated: 2026-11-11
related: technical/data-corrections, continuity/backup-and-recovery, technical/hosting-and-deployment
---

## The production database

- **PostgreSQL** hosted by **Supabase** (free tier when last documented), reached through Supabase’s connection pooler.
- The connection string is the `DATABASE_URL` GitHub secret. It gives **full** access to every member and financial record.

:::danger Rules for the production database
1. **Read before you write.** Use read-only queries to look; change nothing by hand.
2. **Never** run a destructive command or script against production without a second person agreeing, and a backup taken that day.
3. Develop and test every data fix on a **local copy**, never on production first. Row IDs differ between copies, so re-check IDs on production before running a fix there.
4. Fixes use the prepared scripts, **dry run first**, then `--apply`. See [Data corrections](#/technical/data-corrections).
5. Never copy production data into code, tests, documents or chat.
:::

## Two migration systems

| Folder | What it is | Use it? |
|---|---|---|
| `backend/migrations/` | **The real one.** `sequelize-cli` migrations, tracked in the `SequelizeMeta` table, **run automatically by every backend deploy** | Yes, for every schema change |
| `backend/src/database/migrations/` | Old ad-hoc scripts run by hand, not tracked | No; legacy only |

A new migration must be **safe to run twice** and must work on PostgreSQL, not just the SQLite used by tests. The deploy runs it against production the moment `main` is pushed.

## Working locally

```bash
cd backend
npx sequelize-cli db:migrate:status   # what has run
npx sequelize-cli db:migrate          # catch up a local database
DATABASE_URL=sqlite::memory: NODE_ENV=test npx jest <test file>   # tests use in-memory SQLite
```

After restoring or refreshing a local database from a copy, **re-run `db:migrate`**. A copy taken before a migration silently rolls the local schema back.

The application repository includes a step-by-step skill for schema changes at `.claude/skills/db-migrations/SKILL.md`.
