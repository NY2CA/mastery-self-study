# Wave SS-4 — Self-Study weekly reads cross-site fetch

**Shipped:** May 8, 2026
**Scope:** Companion to Wave 16.1 (Mastery side). Self-Study dashboard now fetches the same admin-curated weekly reads blob from Mastery's public `/api/weekly-reads` endpoint, so editorial updates land on both surfaces from one Publish action.

## Problem this fixes

Self-Study's weekly reads card was hidden in Wave SS-3 because it was rendering hardcoded placeholder URLs. With Wave 16.1 building the editorial system on the Mastery side, this companion wires Self-Study to consume the same content — single Publish → both dashboards refresh.

## What's new · `src/pages/dashboard.tsx`

- New TypeScript interfaces · `WeeklyReadArticle` and `WeeklyReadsBlob`, mirroring Mastery's storage schema
- New constant · `MASTERY_API_URL` (defaults to `https://resciapropertiesmentorship.com`, override via `NEXT_PUBLIC_MASTERY_API_URL` env var if you ever stage a separate Mastery API)
- New `useEffect` that fetches `/api/weekly-reads` on mount · silent-fail on network error so the dashboard doesn't break if Mastery's site is down
- The legacy `SHOW_MOCK_FEEDS`-gated weekly reads block (with hardcoded CBRE/MFE/Bisnow URLs) is replaced with a live-data version that only renders when there's a published blob with at least one article

The card sits exactly where it did before — right under the curriculum module grid — so the dashboard layout doesn't shift.

## Files changed

```
src/pages/dashboard.tsx     ← cross-site fetch + live render of admin-curated weekly reads
```

## Files unchanged

```
All Functions, hooks, components, course data.
No backend changes on Self-Study — this purely consumes Mastery's public API.
```

## Deploy order

**Important: deploy Mastery (Wave 16.1) FIRST, then this Self-Study wave.** The Self-Study fetch will return null/empty until Mastery's `/api/weekly-reads` endpoint exists. Once Mastery is live and you've published your first batch via `/admin/weekly-reads`, the Self-Study card will populate on the next page load.

```bash
cd ~/Downloads
unzip -o multifamily-selfstudy-wave-ss-4.zip

rsync -av ~/Downloads/wave-ss-4/src/ \
          ~/Documents/mastery-self-study/src/

cp ~/Downloads/wave-ss-4/CHANGES-WAVE-SS-4.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/pages/dashboard.tsx CHANGES-WAVE-SS-4.md
git commit -m "Wave SS-4: weekly reads cross-site fetch from Mastery"
git push
```

(Note: Self-Study repo path is `~/Documents/mastery-self-study/`, NOT `~/Documents/multifamily-selfstudy/`.)

## Verification after Self-Study deploy

(Assumes Mastery Wave 16.1 is already live and you've published at least one batch of articles.)

- [ ] Hard-refresh the Self-Study `/dashboard`
- [ ] Weekly reads card renders right under the curriculum modules · same layout as Mastery
- [ ] Same articles you published on Mastery are showing on Self-Study
- [ ] Click an article · opens the link in a new tab
- [ ] Update the articles on Mastery's `/admin/weekly-reads`, click Publish, hard-refresh Self-Study after ~60 seconds · new articles appear

## What if no articles are published yet?

The card stays hidden — same as before deploying. Self-Study dashboard renders cleanly without it. As soon as you publish on Mastery, both dashboards light up.

## Optional · `NEXT_PUBLIC_MASTERY_API_URL` env var

The Self-Study site fetches Mastery's API at the production domain by default (`https://resciapropertiesmentorship.com`). If you ever stage a non-production environment of Mastery and want Self-Study to fetch from there, set `NEXT_PUBLIC_MASTERY_API_URL` in Netlify Site settings → Environment variables. NEXT_PUBLIC_* vars are baked into the static bundle at build time, so trigger a redeploy after setting.

For everyone else: leave it unset. The hardcoded default is correct.

## Net result

- ❌ No more dashboard hole where weekly reads used to be
- ✅ Same content as Mastery dashboard — single editorial source
- ✅ Updates propagate within 60 seconds of an Admin Publish on Mastery
- ✅ Falls back gracefully if Mastery API is unavailable (card hides, no error)
- ✅ Five-minute Tuesday workflow remains on the Mastery side · Self-Study just consumes
