---
title: Troubleshooting guide
order: 2
audience: Treasurer, administrators, technical administrator
summary: Symptom-by-symptom diagnosis, from “one number looks wrong” to “the whole site is down”, with copyable steps.
updated: 2026-11-11
related: help/faq, technical/logs-and-monitoring, help/incident-history
---

## The books don’t match the bank

:::copy Ledger and bank disagree — checklist
1. Upload the latest Chase CSV (Bank Integration → Upload & Process).
2. Clear every Pending Review line (approve, link, mark reconciled, or record as expense).
3. Clear Zelle Review and Square Review.
4. Check Member Payments → Show Skipped Receipt Numbers, and Expenses → Show Skipped Check Numbers.
5. Look for duplicates: same member, same amount, a few days apart; two bank lines on one date and amount.
6. Re-check the Overview message: note Ledger, Bank and Difference with today's date.
7. If a difference remains, send it to the technical administrator with the date range.
:::

## A Sunday doesn’t match its deposit

See [Sunday Deposit Check](#/dashboard/sunday-deposit-check?h=when-a-sunday-doesnt-match).

## Totals on a report look wrong

| Symptom | Likely cause |
|---|---|
| A member’s dues look short | Payment under another household member or a duplicate record; wrong Yearly Pledge or join date |
| A category is too large | Payments recorded with the wrong type; fix with Edit → Payment Type |
| “Uncategorized / Needs Review” in the Expense Report | Bank debits with no category; click **Review these** |
| Salary month at $0 | Two months paid together. Normal |
| Pledge drive Received lower than expected | Pledge Drive payments not credited to a pledge |
| Board Summary shows an Unexplained difference | Pending bank lines, duplicates or uncategorized spending. Work the “To resolve” list |

## The website or the API is down

:::copy Outage — first checks (anyone)
1. Try the site on another device or network (phone data instead of Wi-Fi).
2. Open https://api.abunearegawi.church/api/ready — note what it says (or that it does not load).
3. Note the time and the exact error message or a screenshot.
4. Send these to the technical administrator.
5. Keep working on paper: write receipts as usual and enter them when the site is back.
:::

:::copy Outage — technical administrator
1. /api/ready: if it fails or times out, check Supabase dashboard (paused? quota? credentials?).
2. SSH to the server: pm2 status ; pm2 logs abune-aregawi-backend --lines 200
3. sudo tail -n 100 /var/log/nginx/error.log
4. GitHub → Actions: did a deploy just run or fail?
5. Status pages: Firebase, Supabase, Oracle Cloud.
6. If the backend crashed on start-up after a deploy, read the first error in pm2 logs (missing setting, failed migration).
7. Restart: pm2 restart abune-aregawi-backend  (or reboot the instance from the OCI console).
:::

## One feature stopped working

| Feature | Most likely cause | Where to look |
|---|---|---|
| Zelle Review not filling | Gmail token expired / Google password changed | pm2 logs; renew `GMAIL_REFRESH_TOKEN` |
| Online giving failing | Stripe keys or webhook secret wrong | Stripe → Webhooks; frontend must use a live key |
| Online gifts taken but not recorded | Webhook deliveries failing | Stripe → Webhooks → failed events → resend after fixing |
| Square Review empty | Square webhook or token | Square Developer → Webhooks; **Sync from Square** |
| SMS not sending | Twilio balance, number or credentials | Twilio console |
| Photo gallery empty | Google Drive token | `GALLERY_DRIVE_*` |
| Ledger backup failing | Google token or export disabled | Ledger Backup → Last Run; `LEDGER_SHEETS_*` |
| Live-stream banner missing | YouTube key, or the stream isn’t live | `YOUTUBE_*` |
| Sign-in fails for everyone | Firebase outage, SMS quota, or domain not authorized | Firebase console → Authentication |
| Bank upload says “CORS error” | Request took over 60 seconds | nginx error log; split the CSV into a shorter date range |

## Escalation

For problems with this guide itself, such as a wrong instruction or an out-of-date screenshot, write to **[abune.aregawi.dev@gmail.com](mailto:abune.aregawi.dev@gmail.com)**.

When you escalate, always include: **what you were doing**, **the screen**, **the exact message** (a screenshot is best), **the time**, and for money **the member, amount, date and receipt/reference**. Never include card numbers or bank account numbers.
