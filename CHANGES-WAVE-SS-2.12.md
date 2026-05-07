# Wave SS-2.12 — Reframe coaching commitment · ongoing monthly (not time-bounded)

**Shipped:** May 7, 2026
**Scope:** Replace all "60+ hours" coaching references on the Self-Study site with "ongoing monthly coaching" framing. Removes the time-quantified commitment so Live engagements aren't held to a specific hour count.

## Why

Lou flagged that "60+ hours of coaching" on the three-rung ladder Live card commits Diva and Lou to a specific time allocation. The honest framing is "ongoing monthly coaching with Diva and Lou" — captures the cadence (monthly calls with the Live cohort) without setting an arithmetic expectation that a buyer can audit.

## Five user-facing references updated (all on Self-Study site)

### Landing page · `src/pages/index.tsx`

**1. Mentor section subhead**
- Before: *"...adds Diva and Lou alongside, **60 hours of monthly coaching** across the engagement,..."*
- After: *"...adds Diva and Lou alongside, **ongoing monthly coaching** with Diva and Lou,..."*

**2. "What Mastery Live adds" stat strip · LiveStat n=**
- Before: `"60+ hrs"` / "Coaching with Diva and Lou across the 12-month engagement"
- After: `"Monthly"` / "Ongoing coaching with Diva and Lou across the engagement"

**3. Mastery Live exclusives · LiveExclusive body**
- Before: *"60+ hours total · Diva and Lou pressure-test your assumptions on a real deal in real time."*
- After: *"Ongoing · Diva and Lou pressure-test your assumptions on a real deal in real time."*

**4. Three-rung ladder · Mastery Live card bullet**
- Before: *"60+ hours coaching with Diva and Lou"*
- After: *"Ongoing monthly coaching with Diva and Lou"*

### Dashboard · `src/pages/dashboard.tsx`

**5. "Available in Mastery Live" panel description**
- Before: *"Mastery Live extends the curriculum into four areas... and adds **60+ hours of monthly coaching with Diva and Lou**, an AI tutor, and deal..."*
- After: *"Mastery Live extends the curriculum into four areas... and adds **ongoing monthly coaching with Diva and Lou**, an AI tutor, and deal..."*

## What stays time-quantified

The **126 topics** stat remains — that's a real, auditable count of curriculum content. Same with the **12 modules** stat. Both are objective measures, not commitment promises.

The **"Monthly coaching calls"** title in the Live exclusives panel remains — that's a description of the cadence (monthly), not a commitment to a specific total time investment.

## Files changed

```
src/pages/index.tsx          ← 4 user-facing references + 1 file-header comment
src/pages/dashboard.tsx      ← 1 user-facing reference
```

## Files unchanged

```
src/data/courses.ts          (curriculum content unaffected)
all other files
```

## Deploy

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-2.12.zip

rsync -av ~/Downloads/wave-ss-2-12/src/pages/ \
          ~/Documents/mastery-self-study/src/pages/

cp ~/Downloads/wave-ss-2-12/CHANGES-WAVE-SS-2.12.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/pages/index.tsx src/pages/dashboard.tsx CHANGES-WAVE-SS-2.12.md
git commit -m "Wave SS-2.12: Reframe coaching as ongoing monthly (not 60+ hours)"
git push
```

## Verification after deploy

- [ ] Three-rung ladder Live card · second bullet reads "Ongoing monthly coaching with Diva and Lou"
- [ ] "What Mastery Live adds" stat strip · first stat reads "Monthly" with label "Ongoing coaching with Diva and Lou across the engagement"
- [ ] Live exclusives panel · "Monthly coaching calls" body reads "Ongoing · Diva and Lou pressure-test..."
- [ ] FAQ "How is this different from Mastery Live?" answer references "ongoing monthly coaching" not "60 hours"
- [ ] Dashboard "Available in Mastery Live" panel reads "ongoing monthly coaching with Diva and Lou"
- [ ] No remaining "60 hours" or "60+ hrs" anywhere on the Self-Study site
