# Wave SS-2.4 — Self-Study dashboard redesign (Live-style format)

**Shipped:** May 4, 2026
**Scope:** Repaint the Self-Study dashboard with the same navy + gold + cream institutional treatment Live uses. Same structural format as Live; Self-Study-specific surfaces; emphasis on what's AVAILABLE rather than what's reserved for Live.

## What changed

The Wave SS-1 dashboard was cream-dominant with restrained gold cameo — the original "lighter than Live" interpretation of the spec. Per your landing-page direction (more sizzle, navy treatment, gold accents), the dashboard now matches that institutional weight.

### Visual treatment

- **Background:** navy (was cream)
- **Hero:** navy gradient with gold-bright accents (matches Live hero pattern)
- **Cards:** `#1f315a` navy-soft surfaces with `rgba(184, 148, 90, 0.18)` gold-alpha borders
- **Eyebrows:** gold throughout
- **Italic accents:** gold-bright on display headlines
- **Footer:** navy-deep with gold-tinted Mastery Self-Study wordmark
- **Nav:** repaints to white via the `live-dashboard-active` body class (same trick as Live)

### Surfaces (top to bottom)

1. **Access-pending banner** — gold-bordered navy gradient when `!hasAccess`
2. **Welcome hero** — navy gradient · cohort-progress framing · "you're 25% in" italic gold-bright accent · "Resume program" gold CTA
3. **Billing strip** — your plan + renewal date + the year-1 → $99/month framing + Manage billing button
4. **UpgradeCard** — gold-bordered, post-Module-1 trigger (preserved from Wave SS-1)
5. **Progress + Toolkit tiles** (side-by-side grid):
   - Progress tile shows three stats: modules complete (e.g. 3/8), curriculum percentage (e.g. 25%), total topics in curriculum (60)
   - Toolkit tile lists templates/PDFs with gold "Open toolkit" CTA
6. **Curriculum** — H2 reads "Mastery Self-Study · 60 topics across 8 modules" with italic gold accent · 8-module grid with progressive locks · same gold-left-border module cards as Live
7. **Weekly reads strip** — curated Tuesdays, three article cards with source / title / why-it-matters · same pattern as Live's weekly reads (Self-Study members get [SS]-tagged articles from the Tuesday cron)
8. **Available in Mastery Live** panel — gold-bordered navy gradient · the 4 reserved modules listed with gold dots · "Inquire about Mastery Live →" gold CTA at the bottom
9. **Admin tools** — gold-bordered navy card with member-management link (admin only)
10. **Footer** — navy-deep with mono "Rescia Properties · Mastery Self-Study" header

### What's available · made prominent

- **8 modules · 60 topics** (called out in curriculum H2)
- **Progress stats** (modules complete · curriculum % · total topics)
- **Toolkit access** (Excel templates · PDFs)
- **Weekly curated reads** (Tuesday cron output)
- **12-month access** (billing strip)
- **Year-1 → $99/month continuation path** (billing strip)
- **Upgrade-to-Live with $1,997 credit** (multiple cross-sell surfaces)

### What's NOT on Self-Study (Live exclusives properly absent)

- ❌ Coaching call card
- ❌ AI tutor card
- ❌ Your-deal workspace
- ❌ Deal memos from Rescia desk

These show only on the Live dashboard. On Self-Study they appear as "Available in Mastery Live" upsell signal — buyers see what they'd unlock but can't access.

## Files changed

```
src/pages/dashboard.tsx     ← REBUILT · 641 lines · Live-style navy/gold treatment
```

Single file. No new components, no new routes, no schema changes. The existing `UpgradeCard` component carries over, `Card`/`Button`/`ProgressBar` reused, hooks unchanged.

## Files unchanged

```
src/components/UpgradeCard.tsx   (Wave SS-1)
src/data/courses.ts              (Wave SS-2.1 — Module 1 content)
src/pages/index.tsx              (Wave SS-1.4 landing redesign)
src/pages/inquire-about-live.tsx (Wave SS-1)
src/pages/login.tsx              (Wave SS-2.2 branding fix)
src/pages/signup.tsx             (Wave SS-2.2 branding fix)
all hooks, libs, Netlify functions
```

## Deploy commands

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-2.4-hotfix.zip

rsync -av ~/Downloads/wave-ss-2-4-hotfix/src/pages/dashboard.tsx \
          ~/Documents/mastery-self-study/src/pages/dashboard.tsx

cp ~/Downloads/wave-ss-2-4-hotfix/CHANGES-WAVE-SS-2.4.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/pages/dashboard.tsx CHANGES-WAVE-SS-2.4.md
git commit -m "Wave SS-2.4: Self-Study dashboard redesign — Live-style navy/gold treatment"
git push
```

## How to evaluate after deploy

1. Log in at `selfstudy.resciapropertiesmentorship.com`
2. Land on `/dashboard` — should render in navy + gold (not cream)
3. Verify: nav repaints to white when on this route, returns to cream when navigating elsewhere
4. With access granted: hero shows progress, billing strip shows plan, progress + toolkit tiles render side-by-side, curriculum grid shows 8 modules with module 1 marked in-progress
5. Without access: only access-pending banner + welcome hero + locked curriculum preview
6. Mark Module 1 complete (manually via admin) → upgrade card appears above the curriculum
7. "Available in Mastery Live" panel renders as the bottom-of-page upsell with the gold CTA

## What's still ahead in Wave SS-2

- **Wave SS-2.3 Calendly integration** — popup widget on "Inquire about Mastery Live" CTAs (waiting on your Calendly URL)
- **Modules 2-8 content writing** — 7 modules × ~7 topics each ≈ 52 more topics
