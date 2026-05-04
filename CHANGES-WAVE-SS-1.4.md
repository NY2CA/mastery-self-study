# Wave SS-1.4 — Topic count, hero kicker, ladder bullet, Live emphasis

**Shipped:** May 4, 2026
**Scope:** Lou's iteration on Wave SS-1.3.

## What changed

### 1. Topic count locked at 60

`TOTAL_TOPICS = 60` distributed across the 8 Self-Study modules:

| Module | Topics |
|---|---|
| 1 · Submarket Intelligence | 8 |
| 2 · Deal Sourcing | 7 |
| 3 · Underwriting | 10 |
| 4 · Stress Testing & CapEx | 7 |
| 5 · Debt Sourcing | 8 |
| 6 · LOI | 6 |
| 7 · PSA & DD | 8 |
| 8 · Property Management | 6 |
| **Total** | **60** |

Math: 60 / 126 ≈ 48% of Live's topic count, but Self-Study covers 8 of Live's 12 modules — so per retained module, Self-Study runs ~70% depth, consistent with the production spec. Wave SS-2 will write topics[] arrays matching these counts.

### 2. Curriculum section now leads with the topic count

```
60 topics · 8 modules · self-paced.
```

Replaces the bland "Eight modules. Self-paced." headline. "60 topics" italicized in gold-deep — the kind of number that makes a $2K product feel substantial.

Each module card now displays its individual topic count alongside the module number and duration:

```
MODULE 3 · 3 HRS · 10 TOPICS
Underwriting
```

### 3. Self-Study ladder card 1st bullet now includes topic count

Was: `8 modules · submarket through property management`
Now: `8 modules · 60 topics · submarket through property management`

Symmetrical with the Live ladder card's `12 modules · 126 real-world topics` bullet.

### 4. Hero kicker is bigger

The "Mastery Self-Study · The self-paced track" line at the top of the hero now:

- Font size: 11px → `clamp(13px, 1.4vw, 16px)` (responsive 13-16px)
- Letter-spacing: 0.22em → 0.24em
- Font weight: 400 → 600
- Margin below: 24px → 28px
- Wrapped with a closing ◆ symbol so it reads as a contained label, not a half-finished line

```
◆  MASTERY SELF-STUDY  ·  THE SELF-PACED TRACK  ◆
```

### 5. Removed Artifacts bullet from Live exclusives · replaced with topic curriculum depth

Lou's call: "There is so much more value that Live provides" than physical artifacts. The artifacts bullet undersold Live's coaching/curriculum depth.

**Before:**
- Monthly coaching calls
- AI tutor in every module
- Deal memos from the Rescia desk
- Your-deal workspace
- The 4 advanced modules
- Physical artifacts ← removed

**After:**
- Monthly coaching calls (expanded copy)
- AI tutor in every module (expanded copy)
- Deal memos from the Rescia desk (expanded copy)
- Your-deal workspace (expanded copy)
- The 4 advanced modules
- **The full 126-topic curriculum** ← new · "Twice the depth of Self-Study's 60 topics"

The replacement directly contrasts the curricular depth — 126 vs 60 — so the buyer can do the math themselves on what Live's "more" actually is. Each retained bullet got its body copy expanded to make the value land harder.

The physical artifacts still exist in the product (the spec keeps them in the Live onboarding experience), they just don't lead the upsell conversation on the Self-Study landing page.

## Files changed

```
src/pages/index.tsx     ← topic count lookup, curriculum section, ladder card bullet, hero kicker, Live exclusives reshuffle
```

Single file. No data file changes (topic counts live in landing page; Wave SS-2 will mirror them in courses.ts).

## Deploy

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-1.4-hotfix.zip

rsync -av ~/Downloads/wave-ss-1-4-hotfix/src/pages/index.tsx \
          ~/Documents/mastery-self-study/src/pages/index.tsx

cp ~/Downloads/wave-ss-1-4-hotfix/CHANGES-WAVE-SS-1.4.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/pages/index.tsx CHANGES-WAVE-SS-1.4.md
git commit -m "Wave SS-1.4: 60-topic count, larger hero kicker, ladder bullet, Live curriculum-depth emphasis"
git push
```

## Verification checklist after deploy

- [ ] Hero kicker reads larger and more prominent — closing ◆ visible after "self-paced track"
- [ ] Curriculum section H2 reads "60 topics · 8 modules · self-paced"
- [ ] Each module card shows the per-module topic count (8, 7, 10, 7, 8, 6, 8, 6 respectively)
- [ ] Self-Study ladder card 1st bullet reads "8 modules · 60 topics · submarket through property management"
- [ ] Live exclusives section no longer mentions physical artifacts
- [ ] Live exclusives section last item reads "The full 126-topic curriculum · Twice the depth of Self-Study's 60 topics"
