# Wave SS-2.5 — Module 2 · Deal Sourcing (full content)

**Shipped:** May 4, 2026
**Scope:** Module 2 of Mastery Self-Study curriculum lands with full Diva-voiced content. Same template as Module 1 (Wave SS-2.1).

## What ships

`src/data/courses.ts` Module 2 entry now populated:

### 7 topics (60-topic count distributed: 7 here)

```
sourcing-t01-funnel-math               The deal-sourcing math (100 → 20 → 5 → 1)
sourcing-t02-broker-relationships      Broker relationships · the long game
sourcing-t03-on-market                 On-market deals · when they're worth the time
sourcing-t04-off-market                Off-market deals · how brokers actually share them
sourcing-t05-reading-om                Reading the offering memo
sourcing-t06-pipeline-tracker          The deal pipeline tracker
sourcing-t07-qualifying                Qualifying before LOI  ◆
```

Each topic: title + summary + ~280-310 word body + worked example + 4-5 pitfalls + related topic backlinks.

### Live-upsell sidebar on Topic 7 (qualifying before LOI)

Same pattern as Module 1's Topic 8 — placed at the highest-judgment moment in the module (the LOI/pass decision):

> **◆ Mastery Live members workshop this on a real deal.**
> The qualifying decision is where coaching earns its keep. Self-Study gives you the six-gate screen. Live members bring their actual OMs to a monthly call and Diva and Lou run the screen with them — pressure-testing the read, surfacing what they missed, and deciding LOI / pass on a real timeline. The framework is the same. The difference is having a seasoned operator across the table when you're trying to decide whether to commit $50K of earnest money.

### 5 quiz items (multiple choice)

1. Funnel math diagnosis (50 OMs / 1 close — Topic 1)
2. Broker relationship continuity at month 14 (Topic 2)
3. On-market opportunity reading on a 5-month-stale listing (Topic 3)
4. OM with broker refusing P&L detail (Topic 5)
5. The qualifying screen with one failed gate (Topic 7)

Difficulty mix: 2 application, 3 operator.

### 4 common mistakes

1. Treating off-market as secret inventory (→ Topic 4)
2. Skipping the qualifying screen on "obviously good" deals (→ Topic 7)
3. Underwriting from pro forma instead of actual T-12 P&L (→ Topic 5)
4. Letting your pipeline tracker decay (→ Topic 6)

### Voice + depth markers

- Operator-first ("we tracked our funnel," "we passed," "we underwrote")
- Specific dollar amounts and ratios ($17.5M → $13.9M, 134/27/8/4/1, 100 → 20 → 5 → 1, $50K earnest money)
- Real deal references (DFW 96-unit, Tampa 168-unit, Phoenix Mesa 144-unit, Tampa 240-unit)
- Concrete frameworks: 6-gate qualifying screen, 4-pattern broker relationship arc, 5 LoopNet patterns worth your time, 6-step OM read order, weekly Monday review discipline
- Active voice, no hype, "Brokers remember." cadence
- ~2,800 words of body copy across 7 topics + worked examples + pitfalls + quiz/mistake explanations ≈ ~5,200 words total module content

## Files changed

```
src/data/courses.ts     ← Module 2 full content (Module 1 + Modules 3-8 unchanged)
```

Single file. No other changes.

## Deploy

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-2.5.zip

rsync -av ~/Downloads/wave-ss-2-5/src/data/courses.ts \
          ~/Documents/mastery-self-study/src/data/courses.ts

cp ~/Downloads/wave-ss-2-5/CHANGES-WAVE-SS-2.5.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/data/courses.ts CHANGES-WAVE-SS-2.5.md
git commit -m "Wave SS-2.5: Module 2 · Deal Sourcing — full content (7 topics, 5 quiz, 4 mistakes, Live sidebar)"
git push
```

## How to evaluate after deploy

1. Log in at `selfstudy.resciapropertiesmentorship.com`
2. Navigate to `/course/sourcing` (or click Module 2 from `/dashboard`)
3. The TopicAccordion should render all 7 topics — click each to expand
4. Verify the example callouts render in highlighted boxes
5. Verify the pitfalls render as bullet lists
6. Topic 7: scroll to the bottom of the body — the "**◆ Mastery Live members workshop this on a real deal**" sidebar should land
7. Take the 5-question quiz
8. Read the 4 common mistakes for tone consistency

## Modules remaining (5)

Same template, scaling across:

- **Wave SS-2.6** → Module 3 · Underwriting · 10 topics (longest module — the core craft)
- **Wave SS-2.7** → Module 4 · Stress Testing & CapEx · 7 topics
- **Wave SS-2.8** → Module 5 · Debt Sourcing · 8 topics
- **Wave SS-2.9** → Module 6 · LOI · 6 topics
- **Wave SS-2.10** → Module 7 · PSA & DD · 8 topics
- **Wave SS-2.11** → Module 8 · Property Management · 6 topics

Total remaining: 45 topics across 6 modules. Module 3 (Underwriting) is the deepest single module; everything else is sized similar to Module 1 or 2.
