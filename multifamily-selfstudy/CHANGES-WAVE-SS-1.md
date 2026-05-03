# Wave SS-1 — Mastery Self-Study scaffold

**Shipped:** May 1, 2026
**Scope:** Stand up the Self-Study codebase as a separate Netlify site at `selfstudy.resciapropertiesmentorship.com`. Working empty product — auth + billing + admin all wired, curriculum shells in place, dashboard renders cream/navy with the post-Module-1 upgrade card mechanic ready. Wave SS-2 fills in module content; Wave SS-4 wires Stripe; Wave SS-5 ships the landing page + go-live.

## What this wave delivers

A Mastery Self-Study Next.js project — cloned from the current Mastery Live codebase (Wave 13.1 state), stripped of Live exclusives, branded for Self-Study, ready to deploy as its own Netlify site at `selfstudy.resciapropertiesmentorship.com`.

### New files

```
src/components/UpgradeCard.tsx           ← post-Module-1 upgrade trigger card
src/pages/inquire-about-live.tsx         ← upgrade inquiry form
CHANGES-WAVE-SS-1.md                     ← this file
```

### Files modified vs the cloned Live codebase

```
src/lib/api.ts                  ← TOKEN_KEY: mfm_token → mss_token (own session scope)
src/components/Navigation.tsx   ← wordmark line: "Rescia Properties · Mastery Self-Study"
src/pages/_app.tsx              ← <title> + meta description rewritten for Self-Study
src/pages/dashboard.tsx         ← Self-Study skin (cream + navy + gold cameo on UpgradeCard)
src/data/courses.ts             ← REPLACED · 8-module Self-Study curriculum SHELLS
package.json                    ← name: multifamily-platform → mastery-self-study
```

### Files removed

```
src/pages/live/                 ← Live route directory (Self-Study has no /live route)
src/data/live.ts                ← Live mock data (no Live exclusives on Self-Study)
src/data/foundations.ts         ← Foundations data (Foundations is its own product)
```

### Files unchanged (carry over verbatim from Live)

```
src/components/Card.tsx
src/components/Button.tsx
src/components/ProgressBar.tsx
src/components/Input.tsx
src/components/TopicAccordion.tsx
src/components/UpsellModal.tsx       (Wave SS-3 may retire or repurpose)
src/components/AskAboutTopic.tsx     (Wave SS-2 decides remove vs repurpose)
src/hooks/*
netlify/functions/auth-*
netlify/functions/progress-*
netlify/functions/admin-*
netlify/functions/_lib/*
src/styles/globals.css
src/styles/landing.css
public/rescia-mark.png
public/rescia-logo.png
public/templates/*               (Wave SS-2 swaps in Self-Study versions)
```

## Dashboard surfaces shipped

The `/dashboard` page renders correctly in three states:

1. **No access** (admin hasn't granted) — access-pending banner, welcome hero with "Buy Self-Study · $1,997" CTA, locked curriculum preview
2. **Active access, Module 1 not yet complete** — welcome hero with "Resume program" CTA, renewal banner showing year-1 access, 8-module curriculum, "Available in Mastery Live" sidebar showing the 4 reserved modules, toolkit, footer cross-sell
3. **Active access, Module 1 complete** — adds the gold-bordered UpgradeCard above the curriculum

Dismissal mechanic: "Not right now (hide for 30 days)" sets `mss_upgrade_dismissed_until` in localStorage. v2 (Wave SS-3) promotes this to the user record server-side for cross-device persistence.

## Self-Study curriculum (locked from spec)

```
1. Submarket Intelligence       2.5 hrs
2. Deal Sourcing                2.5 hrs
3. Underwriting                 3 hrs
4. Stress Testing & CapEx       2.5 hrs
5. Debt Sourcing                3 hrs
6. LOI                          2 hrs
7. PSA & DD                     2.5 hrs
8. Property Management          2 hrs
```

Reserved for Mastery Live (visible on the Self-Study dashboard as "Available in Mastery Live"):

```
9.  Capital Raising
10. PPM & Legal
11. Asset Management
12. Exit
```

## What's NOT here (intentional)

- ❌ No coaching call card
- ❌ No AI tutor card
- ❌ No Your-deal workspace
- ❌ No deal memos card
- ❌ No weekly reads strip
- ❌ No cohort sidebar nav

These are Mastery Live exclusives. Their absence from the Self-Study dashboard IS the upgrade story.

## Deploy steps (one-time setup)

1. **Create new GitHub repo** for Self-Study (e.g., `mastery-self-study`).
2. **Initialize repo from this folder:**
   ```bash
   cd ~/Documents/mastery-self-study   # after copying this scaffold
   git init
   git add .
   git commit -m "Wave SS-1: Self-Study scaffold from Live codebase"
   git remote add origin git@github.com:NY2CA/mastery-self-study.git
   git push -u origin main
   ```
3. **Create new Netlify site** linked to that repo (Netlify dashboard → Add new site → Import from Git → select repo).
4. **Add CNAME on `resciapropertiesmentorship.com` zone** pointing `selfstudy` → Netlify auto-DNS target. Netlify dashboard → Domain management → Add custom domain → `selfstudy.resciapropertiesmentorship.com`.
5. **Set Netlify env vars** (Site configuration → Environment variables):
   - `JWT_SECRET` — fresh 32+ char random string (different from Live's)
   - `STRIPE_SECRET_KEY` — same Stripe account, different products (created in Wave SS-4)
   - `STRIPE_WEBHOOK_SECRET` — generated when you create the Self-Study webhook in Stripe
   - `RESEND_API_KEY` — same Resend account, sender = `selfstudy@resciaproperties.com` (or similar)
   - `ADMIN_EMAILS` — `lou@resciaproperties.com` (and any others)
   - `STRIPE_PRICE_SELFSTUDY_ANNUAL` — populate after Wave SS-4
   - `STRIPE_PRICE_SELFSTUDY_CONTINUATION` — populate after Wave SS-4
6. **First deploy** — Netlify auto-builds on push. After deploy succeeds, visit `selfstudy.resciapropertiesmentorship.com` and verify:
   - Landing page renders (still showing Live copy — Wave SS-5 replaces it)
   - `/login` works (signup → login → /dashboard)
   - `/dashboard` renders in cream/navy with the 8-module curriculum (modules locked behind quiz/access for now)
   - `/admin/members` works (you can grant access to a test account)
   - Admin granted user lands on dashboard, sees curriculum, can navigate into a module (course pages render but content is empty — that's Wave SS-2)

## Known gaps · ship anyway

- **Module content is empty** — Wave SS-2 fills topics[], quiz[], and mistakes[] with the Diva-voiced narrative copy. Course pages render the empty modules cleanly (existing UI handles empty topics arrays).
- **Stripe products don't exist yet** — Wave SS-4 creates them. Until then, `/pricing` will show the layout but checkout buttons will fail. Use `/admin/members` to grant test access.
- **Inquire-about-live form posts to a non-existent endpoint** — soft-fails to a confirmation screen. Wave SS-3 wires the Netlify Function that notifies Lou via Resend.
- **Landing page (`/`) still shows Live marketing copy** — Wave SS-5 replaces it with Self-Study-specific copy parallel to the Foundations landing.
- **`AskAboutTopic` component still imported by course pages** — clicking the AI tutor button inside a module will fail (no `/api/ai-ask` Function on Self-Study). Wave SS-2 either removes the component from course pages or stubs the Function.
- **No Foundations / Live cross-product nav** — each subdomain is its own world in v1. Cross-product nav is a v2 problem.

## Wave plan ahead

- **Wave SS-2** · Curriculum content (8 modules of Diva-voiced copy + quizzes + mistakes + PDFs + Excel templates) — biggest single chunk · 1-2 weeks
- **Wave SS-3** · Inquire-about-live Function · upgrade-card dismissal persistence · cross-sell footer card
- **Wave SS-4** · Stripe products + checkout + upgrade coupon
- **Wave SS-5** · Self-Study landing page + go-live verification
