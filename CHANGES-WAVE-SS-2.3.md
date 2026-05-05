# Wave SS-2.3 — Calendly popup integration

**Shipped:** May 4, 2026
**Scope:** Replace the "Inquire about Mastery Live" form-page flow with Calendly's popup widget. Click → schedule directly into the calendar. No email round-trip.

## What changed

### New file · `src/lib/calendly.ts`

Small helper exporting:

- `CALENDLY_URL` — pulled from `process.env.NEXT_PUBLIC_CALENDLY_URL` with a placeholder default
- `openCalendly(e?)` — onClick handler that fires `window.Calendly.initPopupWidget({ url: CALENDLY_URL })`, with fallback to `/inquire-about-live` form page if the widget script didn't load (slow network, ad blocker, JS disabled)

The TypeScript declares `window.Calendly` as a global so type-check passes.

### `src/pages/_document.tsx`

Loads the Calendly widget globally on every page:

- `<link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css">` in `<Head>`
- `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>` at end of `<body>`

By the time any "Inquire about Mastery Live" CTA is clicked, the script has loaded and `window.Calendly` is ready.

### Five CTAs wired

All five "Inquire about Mastery Live" CTAs across the Self-Study site now fire the Calendly popup on click instead of navigating to the form page:

```
src/pages/index.tsx        landing — Live exclusives section gold CTA
src/pages/index.tsx        landing — three-rung ladder Live card CTA
src/pages/index.tsx        landing — final pricing CTA microcopy link
src/pages/dashboard.tsx    "Available in Mastery Live" panel CTA
src/components/UpgradeCard.tsx  post-Module-1 upgrade card CTA
```

Each CTA: `onClick={openCalendly}` on the existing `<Link>` — Calendly intercepts the click, opens the popup, the link's `href="/inquire-about-live"` becomes the fallback if Calendly fails to load.

### Form page kept as fallback

`/inquire-about-live` still exists. It renders if:
- The Calendly script doesn't load (network / ad blocker / no JS)
- A user navigates to that URL directly (e.g. saved bookmark)
- A search engine crawls the URL

So no leads fall through the cracks, ever.

## Setting your Calendly URL

The `NEXT_PUBLIC_CALENDLY_URL` env var controls which Calendly URL the popup opens.

### One-time setup in Netlify

1. Go to your Self-Study Netlify site → **Site configuration → Environment variables**
2. Click **Add a variable** (or **Edit variables**)
3. Add:
   - **Key:** `NEXT_PUBLIC_CALENDLY_URL`
   - **Value:** your Calendly event URL (e.g. `https://calendly.com/diva-rescia/mastery-live-strategy-call`)
4. Save
5. Trigger a new deploy: **Deploys → Trigger deploy → Deploy site**

`NEXT_PUBLIC_*` env vars are baked into the static bundle at build time, so a redeploy is required after changing the URL — but only one redeploy.

### What the Calendly URL looks like

After you create your event in Calendly, the URL takes one of these shapes:
- `https://calendly.com/your-handle/event-slug`
- `https://calendly.com/team-handle/event-slug`

Whichever one Calendly gives you is fine — the popup widget accepts any valid Calendly event URL.

### If you don't set the env var

The placeholder default is `https://calendly.com/rescia-properties/strategy-call`. If that URL doesn't resolve to a real event, clicks will navigate to the `/inquire-about-live` form page instead (the fallback path).

## Files changed

```
src/lib/calendly.ts                  ← NEW · helper utility
src/pages/_document.tsx              ← script + stylesheet load
src/pages/index.tsx                  ← 3 CTAs wired
src/pages/dashboard.tsx              ← 1 CTA wired
src/components/UpgradeCard.tsx       ← 1 CTA wired
```

## Files unchanged

```
src/pages/inquire-about-live.tsx     ← fallback form page (still works)
src/data/courses.ts                  ← Module 1 content
src/pages/login.tsx · signup.tsx     ← Wave SS-2.2 branding
```

## Deploy

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-2.3-hotfix.zip

rsync -av ~/Downloads/wave-ss-2-3-hotfix/src/ \
          ~/Documents/mastery-self-study/src/

cp ~/Downloads/wave-ss-2-3-hotfix/CHANGES-WAVE-SS-2.3.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/lib/calendly.ts src/pages/_document.tsx src/pages/index.tsx \
        src/pages/dashboard.tsx src/components/UpgradeCard.tsx \
        CHANGES-WAVE-SS-2.3.md
git commit -m "Wave SS-2.3: Calendly popup integration on all Inquire about Live CTAs"
git push
```

After the Netlify build lands green:
1. Set `NEXT_PUBLIC_CALENDLY_URL` env var with your real Calendly URL
2. Trigger a fresh deploy so the env var is picked up
3. Hard-refresh the landing page and click any "Inquire about Mastery Live" CTA — Calendly's scheduling widget should open in a popup overlay

## Verification checklist

- [ ] Build succeeds on Netlify after the push
- [ ] After setting `NEXT_PUBLIC_CALENDLY_URL` and redeploying, clicking any "Inquire about Mastery Live" CTA opens the Calendly popup
- [ ] Popup closes cleanly when user dismisses it
- [ ] Popup books an event into your Calendly when user confirms
- [ ] Direct navigation to `/inquire-about-live` still renders the form page (fallback)
- [ ] No JS console errors related to Calendly
