# Wave SS-2.1 — Module 1 · Submarket Intelligence (full content)

**Shipped:** May 4, 2026
**Scope:** First module of Mastery Self-Study curriculum lands with full Diva-voiced content. Modules 2-8 stay as shells; subsequent waves scale this template across them.

## What ships

`src/data/courses.ts` is now populated with Module 1 in full:

### 8 topics (60-topic count distributed: 8 here)

```
submarket-t01-three-reads          The three reads that determine if a market works
submarket-t02-population           Population trajectory · what to look for
submarket-t03-employment           Employment diversity · the single-industry trap
submarket-t04-supply               Supply pipeline · permits today, deliveries in 24 months
submarket-t05-rent-trajectory      Rent trajectory · trailing-12 vs the forward read
submarket-t06-data-sources         Reading public data sources well
submarket-t07-submarket-vs-msa     Submarket vs MSA · the granularity that matters
submarket-t08-walk-away            Walk-away signals · when to pass on a market  ◆
```

Each topic includes:
- Title + summary
- ~280–340 word body (markdown-supported, with **bold** emphasis on key terms)
- Worked example with real-deal figures (Plano, Phoenix West Valley, Tampa, Tucson)
- 4–5 pitfalls
- `related[]` topic backlinks

### Live-upsell sidebar on Topic 8

The "**◆ Mastery Live members workshop this on a real deal**" sidebar is embedded at the end of the Topic 8 body — placed at the highest-judgment moment in the module (the walk-away decision). Reads:

> Walk-away decisions are where coaching earns its keep. Self-Study gives you the framework; Live members bring their actual deals to a monthly call and Diva and Lou pressure-test the read with them. The frameworks are the same — the difference is having someone seasoned in the room when you're staring at $30K of earnest money on the table and the broker is asking for an answer by Friday.

### 5 quiz items (multiple choice)

Each item: question, four choices, correctIndex, model answer, why explanation, trap explanation, topic backlink. Difficulty mix: 3 application, 2 operator.

1. Three-read evaluation on a 142-unit deal (Topic 1)
2. Population trajectory with household formation gap (Topic 2)
3. Employment diversity with sticky sectors leading (Topic 3)
4. Supply pipeline math vs absorption (Topic 4)
5. Walk-away decision with attractive basis but weak reads (Topic 8)

### 4 common mistakes

Each: trap statement, why operators fall for it, fix prescription, source topic backlink.

1. Trusting broker market summaries at face value (→ Topic 1)
2. Reading MSA-level data when you needed submarket-level (→ Topic 7)
3. Ignoring supply pipeline because the deal is "stabilized" (→ Topic 4)
4. Underwriting only the base case (→ Topic 8)

### Voice / depth markers (for sign-off)

- Operator-first framing — "we passed," "we underwrote," "we modeled three ways"
- Specific dollar amounts ($135K/door, $1,420 trailing rent, $30K earnest money)
- Real-deal references (Plano, Phoenix West Valley, Tucson, Tampa, DFW)
- Active voice, no hype, no marketing language
- Concrete numerical bands (1.5–2.5% population growth healthy, 4% supply rule of thumb, 35% concentration trap)
- ~3,300 words of body copy across 8 topics — the depth a $1,997 product earns

## Files changed

```
src/data/courses.ts     ← Module 1 full content + Modules 2-8 shells preserved
```

Single file. No new components, no new routes, no schema changes — the existing TopicAccordion + quiz UI render this content without modification.

## Files unchanged

```
src/components/*        (everything renders Module 1 via existing components)
src/pages/dashboard.tsx (Wave SS-1)
src/pages/index.tsx     (Wave SS-1.4)
all other routes
```

## Deploy

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-2.1.zip

rsync -av ~/Downloads/wave-ss-2-1/src/data/courses.ts \
          ~/Documents/mastery-self-study/src/data/courses.ts

cp ~/Downloads/wave-ss-2-1/CHANGES-WAVE-SS-2.1.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/data/courses.ts CHANGES-WAVE-SS-2.1.md
git commit -m "Wave SS-2.1: Module 1 · Submarket Intelligence — full content (8 topics, 5 quiz, 4 mistakes, Live sidebar)"
git push
```

## How to evaluate after deploy

1. Log in (admin) at `selfstudy.resciapropertiesmentorship.com`
2. Navigate to `/course/submarket` (or click Module 1 from `/dashboard`)
3. The TopicAccordion should render all 8 topics — click each to expand
4. Verify the example callouts render in highlighted boxes
5. Verify the pitfalls render as bullet lists
6. Topic 8: scroll to the bottom — the "**◆ Mastery Live members workshop this on a real deal**" sidebar should land
7. Take the 5-question quiz — multiple choice with correct/incorrect feedback + why/trap reveals
8. Read the 4 common mistakes — each should have trap / why / fix / topic backlink

## Next moves

Once you sign off on **voice** + **depth** + **sidebar placement** on Module 1:

- Wave SS-2.2 → Module 2 (Deal Sourcing) · 7 topics
- Wave SS-2.3 → Module 3 (Underwriting) · 10 topics — biggest module
- Wave SS-2.4 → Module 4 (Stress Testing & CapEx) · 7 topics
- Wave SS-2.5 → Module 5 (Debt Sourcing) · 8 topics
- Wave SS-2.6 → Module 6 (LOI) · 6 topics
- Wave SS-2.7 → Module 7 (PSA & DD) · 8 topics
- Wave SS-2.8 → Module 8 (Property Management) · 6 topics

Each subsequent module follows the Module 1 template — same depth ratio, same sidebar pattern, same quiz/mistake structure. Wave SS-2.3 (Underwriting) is the longest at 10 topics; everything else is similar to Module 1.

If voice or depth needs recalibration after Module 1 review, we re-spec before scaling.
