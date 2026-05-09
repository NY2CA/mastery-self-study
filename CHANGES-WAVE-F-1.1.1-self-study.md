# Wave F-1.1.1 · Self-Study companion · /pricing rewrite

**Shipped:** May 8, 2026
**Scope:** Replace the legacy Mastery pricing layout still serving on Self-Study `/pricing` with the canonical three-tier ladder, Self-Study highlighted as "You are here".

## Problem this fixes

When Self-Study was scaffolded from the Mastery codebase, the `/pricing` page came along as a copy. It still showed the legacy Monthly $39 / Annual $400 / Lifetime $2,500 layout (the original Multifamily Mastery pricing tiers, since retired on the Mastery side in Wave 15.1). Bullets referenced "12-week Multifamily Mastery program" and "Quarterly live Q&A with Diva and Lou" — neither of which describes Self-Study. The page was misleading anyone landing on `selfstudy.resciapropertiesmentorship.com/pricing`.

## What's new · `src/pages/pricing.tsx`

Full rewrite. Now serves the three-tier ladder shared with Mastery's `/pricing`, with Self-Study highlighted as the rung the visitor is currently on:

| Card | Price | Status | CTA |
|---|---|---|---|
| Multifamily 101 | $99 | Earlier on the path | `Start with Multifamily 101 →` (external) |
| **Mastery · Self-Study** *(highlighted)* | **$1,997** | **You are here** | `Begin Self-Study →` (signup) / `Open dashboard →` (logged-in member) |
| Mastery Live | By inquiry | Coaching tier | `Book a strategy call →` (Calendly) |

Bullets on the Self-Study card match the LadderCard description on Self-Study's landing page (`src/pages/index.tsx`). Visitor sees the same description in both surfaces.

The Live card uses the existing `openCalendly` helper from `src/lib/calendly.ts` — same booking flow used everywhere else on the Self-Study site.

The "You already have Self-Study access" banner stays for logged-in members (with updated copy that no longer references the retired plan tiers).

## Files changed

```
src/pages/pricing.tsx     ← full rewrite · 3-tier ladder with Self-Study highlighted
```

## Deploy

Self-Study repo:

```bash
cd ~/Downloads
unzip -o multifamily-selfstudy-wave-f-1.1.1.zip

rsync -av ~/Downloads/wave-f-1.1.1-self-study/src/ \
          ~/Documents/mastery-self-study/src/

cp ~/Downloads/wave-f-1.1.1-self-study/CHANGES-WAVE-F-1.1.1-self-study.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/pages/pricing.tsx CHANGES-WAVE-F-1.1.1-self-study.md
git commit -m "Wave F-1.1.1 · Self-Study /pricing rewrite to canonical three-tier ladder"
git push
```

## Verification

- [ ] Hard-refresh `selfstudy.resciapropertiesmentorship.com/pricing` (private window)
- [ ] Three cards visible: Multifamily 101 (left, $99), Mastery Self-Study (middle, gold-bordered, "You are here" eyebrow, $1,997), Mastery Live (right, "By inquiry")
- [ ] Self-Study card bullets match the LadderCard on the landing page (8 modules, 60 topics, 12 months access, tuition credits toward Live)
- [ ] Click **Begin Self-Study** as a signed-out visitor · routes to `/signup`
- [ ] Click **Open dashboard** as Lou (admin) · routes to `/dashboard`
- [ ] Click **Start with Multifamily 101** · opens the Multifamily 101 site in a new tab
- [ ] Click **Book a strategy call** · Calendly popup opens at `mastery-live-strategy-call`
- [ ] Old Monthly $39 / Annual $400 / Lifetime $2,500 cards are gone
- [ ] No more references to "12-week Multifamily Mastery program" or "Quarterly live Q&A"
