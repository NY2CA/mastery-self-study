# Wave SS-3 — Self-Study dashboard production polish

**Shipped:** May 7, 2026
**Scope:** Two production-ready fixes on the Mastery Self-Study site so the dashboard doesn't ship with the same mock-content + wrong-Calendly-URL issues we just fixed on Mastery Live. Closes the dashboard portion of task #91.

## Problem this fixes

After auditing the Self-Study dashboard end-to-end, the structure was solid (welcome hero, billing strip, upgrade card, progress + toolkit tiles, curriculum grid, "Available in Mastery Live" upsell, admin shortcut, footer). Two real production bugs hiding inside it:

1. **The "Weekly reads · curated Tuesdays" card** rendered three hardcoded URLs to CBRE, Multifamily Executive, and Bisnow as if they were that week's curated reading list. Same pattern Lou flagged on the Mastery Live dashboard in Wave 15.2 — fake content showing to every Self-Study member confuses students about what's a real curriculum surface.
2. **The Calendly fallback URL** in `src/lib/calendly.ts` defaulted to `https://calendly.com/rescia-properties/strategy-call` — wrong slug. Lou's actual Calendly is at `https://calendly.com/mastery-live-strategy-call`. The fallback is what ships if `NEXT_PUBLIC_CALENDLY_URL` isn't set as an env var on Netlify (which it isn't currently).

Net effect: clicking "Inquire about Mastery Live" → Calendly script attempts to open the popup at the wrong slug → 404s. (If the Calendly script fails to load entirely, fallback nav goes to `/inquire-about-live` which is its own form page — that path was working.)

## What's new

### Mock weekly reads hidden behind a flag · `src/pages/dashboard.tsx`

Single module-scope flag at the top:

```ts
const SHOW_MOCK_FEEDS = false;
```

The Weekly reads card is gated by it. When the Tuesday-articles cron is wired into a real CMS surface, flip to `true` and the card returns. Mirrors the same pattern Wave 15.2 used on the Mastery Live dashboard.

### Calendly fallback URL fixed · `src/lib/calendly.ts`

Default constant now points at `https://calendly.com/mastery-live-strategy-call` — the verified slug used everywhere else.

```ts
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  'https://calendly.com/mastery-live-strategy-call';
```

The `NEXT_PUBLIC_CALENDLY_URL` env var on Netlify still wins if you ever want to point a different surface at a different booking URL — but the hardcoded fallback is now correct, so the deploy is right out of the box.

### Layout uniformity for the bottom of the dashboard · `src/pages/dashboard.tsx`

Mirrors the Mastery Wave 15.3 pattern Lou liked. The "Available in Mastery Live" upsell card and the Admin shortcut were stacked as two separate full-width sections at the bottom — different heights, different visual weights, no rhythm. Restructured into a 2-col grid (when admin) so they sit side-by-side at matching density:

- **Available in Mastery Live** — 4-item bulleted module list, "Inquire about Mastery Live →" CTA at the bottom
- **Member management** (Admin) — 4-item bulleted feature list, "Open member management →" CTA at the bottom

Both cards use the same vertical layout (eyebrow → headline → body → bulleted list → bottom-anchored CTA), same gold-100 border, same internal padding. CSS grid `align-items: stretch` keeps them the same height; `marginTop: auto` on the CTA divs pushes the buttons to the bottom edge regardless of body length.

For non-admin members, the upsell card renders alone full-width as before — no admin tile to pair with.

The Member-management Admin tile copy is also fleshed out from the prior one-line description into a 4-point feature list (Grant access · Revoke access · Source labels · Filter & search) so the visual density matches the upsell card. CTA button promoted from `btn-secondary` to `btn-primary` (gold) so it carries equal weight visually.

## Files changed

```
src/pages/dashboard.tsx    ← SHOW_MOCK_FEEDS flag · Weekly reads gated · 2-col Available + Admin grid
src/lib/calendly.ts         ← fallback URL fixed
```

## Files unchanged

```
All Functions, schema, components, course data, other pages.
```

## What's NOT in this wave (intentionally)

- **Time-flexible admin grants on Self-Study.** The Mastery Live `/admin/members` page got duration-aware grants in Wave 15.2 (Indefinite / 1mo / 3mo / 6mo / 12mo / Custom). Self-Study has the identical Function and UI surface but still uses the indefinite-only grant flow. Per your call, deferring that port to a follow-up wave (Wave SS-3.1?) until there's a real Self-Study student who needs it.
- **`/api/inquire-about-live` Function wire-up.** The upgrade form on `/inquire-about-live` still POSTs to a Function that doesn't exist. Functionally low-impact because the dashboard CTA opens Calendly directly via popup (the form page is only the fallback if the Calendly script fails to load — rare). Logged as a follow-up.
- **Layout uniformity tweaks.** Self-Study already has Progress + Toolkit paired in a 2-col grid (which is the layout discipline you asked for on Mastery in Wave 15.3). The Admin shortcut sits as a separate full-width section, which is fine since the page doesn't suffer the same bottom-of-page disjunction Mastery did.

## Deploy

```bash
cd ~/Downloads
unzip -o multifamily-selfstudy-wave-ss-3.zip

rsync -av ~/Downloads/wave-ss-3/src/ \
          ~/Documents/multifamily-selfstudy/src/

cp ~/Downloads/wave-ss-3/CHANGES-WAVE-SS-3.md \
   ~/Documents/multifamily-selfstudy/

cd ~/Documents/multifamily-selfstudy
git add src/pages/dashboard.tsx src/lib/calendly.ts CHANGES-WAVE-SS-3.md
git commit -m "Wave SS-3: hide mock weekly reads + fix Calendly fallback URL"
git push
```

(Note: this is the Self-Study repo at `multifamily-selfstudy`, NOT the Mastery repo at `multifamily-platform`. Easy to mix up if you have multiple terminal tabs.)

## Verification after deploy

- [ ] Hard-refresh the Self-Study `/dashboard` as Lou (admin)
- [ ] Scroll past curriculum · the "What we're reading this week" card no longer renders
- [ ] Bottom of page · "Available in Mastery Live" and "Member management" sit **side-by-side** at matching density (gold-bordered, same height, both with bottom-anchored gold CTAs)
- [ ] Click **Inquire about Mastery Live** · Calendly popup opens at the correct slug (`/mastery-live-strategy-call`)
- [ ] Click **Open member management →** · routes to `/admin/members`
- [ ] Log in as a non-admin member (or test account) · Admin tile is gone, upsell card renders alone full-width
- [ ] Welcome hero, billing strip, progress + toolkit tiles, curriculum grid all still render correctly

## Net result

- ❌ No more fake CBRE/MFE/Bisnow placeholder articles confusing Self-Study members about what's a real curriculum surface
- ❌ No more Calendly popup landing on a 404'd booking page
- ✅ Dashboard ships clean to production with the structural surfaces that already worked
- ✅ Single flag flip brings the weekly reads back when there's a real CMS

Task #91 (Mastery Self-Study production dashboard) ready to mark complete pending your verification.
