---
title: Other parts of the website
order: 8
audience: Admin, Secretary
summary: Public pages and features beyond membership and finance — calendar, live stream, gallery, bylaws, leadership page, survey, chat assistant.
updated: 2026-11-11
related: continuity/integrations, administration/outreach-and-announcements
---

| Feature | Where | What it does | Depends on |
|---|---|---|---|
| **Home page** | `/` | Next service, today’s liturgical day, fasting seasons, announcements, newcomer information | Built-in calendar data; announcements |
| **Calendar** | `/calendar` | Orthodox (Ethiopian) calendar with feasts and fasts, and the service schedule | Built-in data in the application |
| **Live stream** | Home page banner | Shows the church’s **YouTube** live stream when it is live | YouTube channel settings on the server |
| **Photo Gallery** | `/gallery` (signed-in) | Photos from church events, read from a **Google Drive** folder | Google Drive access token on the server |
| **Church Leadership** | `/board-members` | The current board | — |
| **Church Bylaw** | `/church-bylaw` | The bylaws in English and Tigrigna | Built into the application |
| **Survey** | `/survey` | The Church Services Survey | — |
| **Parish Pulse sign-up** | `/parish-pulse-sign-up` | Sign-up for parish updates | — |
| **Chat assistant** | The chat bubble on the site | An automated question-and-answer assistant | **Chatbase**, an outside service |
| **Privacy** | `/privacy` | The privacy notice | — |
| **Install as an app** | More menu on phones | Installs the site on a phone’s home screen; it updates itself (“Refresh” notice) | — |

:::note Changing built-in content
The service schedule, calendar rules, bylaws and some page text are part of the application’s code. Changing them needs a developer. Announcements, departments and pledge drives can be changed on screen.
:::

:::confirm Content ownership
Confirm who maintains the **YouTube channel**, the **Google Drive photo folder** and the **Chatbase** assistant’s content and account. List them in the [ownership matrix](#/continuity/ownership-matrix).
:::
