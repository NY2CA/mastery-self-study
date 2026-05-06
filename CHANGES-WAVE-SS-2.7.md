# Wave SS-2.7 — Module 4 · Stress Testing & CapEx (full content)

**Shipped:** May 6, 2026
**Scope:** Module 4 of Mastery Self-Study curriculum lands with full Diva-voiced content. Same Module 1/2/3 template — body + worked example + pitfalls per topic, plus quiz/mistakes and Live-upsell sidebar.

## What ships

`src/data/courses.ts` Module 4 entry now populated with all 7 topics, 5 quiz items, 4 mistakes, plus the Live-upsell sidebar embedded in Topic 7 (the highest-judgment moment in the module — capital call risk detection).

### 7 topics

```
stress-t01-four-scenarios          Stress testing · the four scenarios that matter
stress-t02-rent                    Rent stress · 0% growth and the absorption-cliff scenario
stress-t03-vacancy                 Vacancy stress · the lease-up risk
stress-t04-cap-rate                Cap rate stress · the exit-cycle reality
stress-t05-deferred-maintenance    CapEx · the deferred maintenance audit
stress-t06-reserves                CapEx · ongoing reserves vs renovation budgets
stress-t07-capital-call            The capital call risk model  ◆
```

Each topic: title + summary + ~280-310 word body + worked example + 4-5 pitfalls + related-topic backlinks.

### Live-upsell sidebar on Topic 7

Topic 7's body ends with the Live sidebar — placed at the highest-judgment moment in the module:

> **◆ Mastery Live members workshop this on a real deal.**
> The capital call risk model is where coaching saves the most money. Self-Study gives you the framework. Live members bring their actual stress tests to a monthly call and Diva and Lou pressure-test the assumptions with them — surfacing where the bear case isn't bear enough, where the refinance assumption is fragile, where the model is hiding a year-3 capital call. The frameworks are the same. The difference is having a seasoned operator across the table when your model says 'marginal' and you're trying to decide whether to commit $1M of LP capital to it.

### 5 quiz items

1. Combined-stress vs single-variable threshold (Topic 1, operator)
2. IRR fragility to rent growth (Topic 2, operator)
3. Cap rate +100bps stress with negative IRR (Topic 4, operator)
4. CapEx underbudgeting against PCR audit (Topic 5, application)
5. Capital call detection from NOI/debt service ratio (Topic 7, operator)

### 4 common mistakes

1. Treating stress test as compliance theater (→ Topic 1)
2. Underbudgeting CapEx by skipping the PCR (→ Topic 5)
3. Single-variable stress instead of combined (→ Topic 1)
4. Forgetting that ongoing reserves continue after renovation (→ Topic 6)

### Voice + depth markers

- Operator-first ("we evaluated," "we passed Tucson," "we LOI'd at $32.7M")
- Specific dollar amounts ($1.4M roof replacement, $4.2M equity gap, $850K seller pro forma vs $1.9M honest underwrite, $1M LP capital)
- Real deals: Tampa 168-unit, Plano 192-unit, Mesa 144-unit, DFW 144-unit + 192-unit, Phoenix 220-unit, Tucson 200-unit
- Cycle history references: 2008-09, 2022-23, Phoenix West Valley 2024 rent declines
- Concrete frameworks: 4-scenario stress framework, NOI/debt service ratio threshold (1.10), CapEx 80-150% under-budgeting pattern
- ~3,200 words body + worked examples + pitfalls; ~5,800 words total module content

## Files changed

```
src/data/courses.ts     ← Module 4 full content (Modules 1-3 + 5-8 unchanged)
```

## Deploy

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-2.7.zip

rsync -av ~/Downloads/wave-ss-2-7/src/data/courses.ts \
          ~/Documents/mastery-self-study/src/data/courses.ts

cp ~/Downloads/wave-ss-2-7/CHANGES-WAVE-SS-2.7.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/data/courses.ts CHANGES-WAVE-SS-2.7.md
git commit -m "Wave SS-2.7: Module 4 · Stress Testing & CapEx — full content"
git push
```

## Modules remaining (4)

```
Wave SS-2.8  →  Module 5 · Debt Sourcing            (8 topics)
Wave SS-2.9  →  Module 6 · LOI                      (6 topics)
Wave SS-2.10 →  Module 7 · PSA & DD                 (8 topics)
Wave SS-2.11 →  Module 8 · Property Management      (6 topics)
```

28 topics across 4 modules remaining. Half the curriculum is now in production.
