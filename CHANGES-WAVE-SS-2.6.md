# Wave SS-2.6 — Module 3 · Underwriting + clickable weekly reads

**Shipped:** May 6, 2026
**Scope:** Two changes packaged together for the Self-Study site:
1. Module 3 (Underwriting) full content — the deepest module in the curriculum at 10 topics
2. Weekly reads cards now clickable (Lou's observation — they were rendering without anchor tags)

## What ships

### 1. Module 3 · Underwriting (full content)

`src/data/courses.ts` Module 3 entry now populated with all 10 topics, 5 quiz items, 4 mistakes, and the Live-upsell sidebar embedded in Topic 10's body.

**The 10 topics:**

```
uw-t01-model-architecture     The underwriting model · architecture
uw-t02-as-is-noi              As-is NOI · the foundation
uw-t03-stabilized-noi         Stabilized NOI · the value-add path
uw-t04-rent-roll              The rent roll · what it tells you
uw-t05-expenses               Expense underwriting · the discipline that kills pro forma
uw-t06-vacancy                Vacancy and credit loss · physical vs economic
uw-t07-cap-rates              Cap rates · entry, exit, the spread
uw-t08-irr-moic               IRR and MOIC · what hits the model
uw-t09-waterfall              The waterfall · GP/LP economics
uw-t10-bear-case              The bear case discipline · sensitivity tables  ◆
```

Total module content: ~7,200 words across body copy, worked examples, pitfalls, and quiz/mistake explanations. Same Diva voice as Modules 1-2 — operator-first framing, specific dollar amounts, real-deal references (Tampa 168-unit, Plano 144-unit/192-unit, Mesa 144-unit, Phoenix 220-unit), concrete numerical bands and rules of thumb.

The Live-upsell sidebar is on Topic 10 (bear case discipline) — the highest-judgment moment in the module. Same pattern as Modules 1 and 2.

**5 quiz items** covering:
1. T-12 normalization with one-time items (Topic 2, application)
2. Cap compression in supply-heavy market (Topic 7, operator)
3. Bear case discipline with negative IRR (Topic 10, operator)
4. Property tax reassessment as biggest expense gap (Topic 5, application)
5. Waterfall reading — asset vs LP vs GP IRR (Topic 9, operator)

**4 common mistakes:**
1. Treating model as forecast vs defense system (→ Topic 1)
2. Underwriting from pro forma stabilized NOI (→ Topic 3)
3. Modeling cap compression without macro thesis (→ Topic 7)
4. Skipping or under-running the bear case (→ Topic 10)

### 2. Weekly reads cards · now clickable

Lou's observation: the weekly reads cards on the dashboard had no anchor tags — they showed source / title / why-it-matters but couldn't actually link to the source articles. Fixed.

**Changes:**

- `ReadCard` component on the dashboard now accepts an optional `url` prop
- When `url` is set, the card renders as an `<a target="_blank" rel="noopener noreferrer">` instead of a plain `<div>`
- A small gold "↗" indicator shows in the title when a URL is present, signaling clickability
- Hover state: card border brightens and background lifts slightly
- Backwards-compatible: cards without URL render exactly as before (no breaking change for any other Self-Study surface that uses ReadCard)

**Mock data updated** to point at the source publications:
- CBRE → https://www.cbre.com/insights
- Multifamily Executive → https://www.multifamilyexecutive.com/
- Bisnow Multifamily → https://www.bisnow.com/multifamily

When the Tuesday article curation cron starts feeding real articles into the dashboard (downstream wave), each article will have its own real URL. The infrastructure is now in place to receive them.

## Files changed

```
src/data/courses.ts              ← Module 3 full content (Modules 1-2 + 4-8 unchanged)
src/pages/dashboard.tsx          ← ReadCard accepts url prop + 3 mock cards now linked
```

## Deploy

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-2.6.zip

rsync -av ~/Downloads/wave-ss-2-6/src/ \
          ~/Documents/mastery-self-study/src/

cp ~/Downloads/wave-ss-2-6/CHANGES-WAVE-SS-2.6.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/data/courses.ts src/pages/dashboard.tsx CHANGES-WAVE-SS-2.6.md
git commit -m "Wave SS-2.6: Module 3 · Underwriting full content + clickable weekly reads"
git push
```

## Modules remaining (5)

```
Wave SS-2.7  →  Module 4 · Stress Testing & CapEx     (7 topics)
Wave SS-2.8  →  Module 5 · Debt Sourcing              (8 topics)
Wave SS-2.9  →  Module 6 · LOI                        (6 topics)
Wave SS-2.10 →  Module 7 · PSA & DD                   (8 topics)
Wave SS-2.11 →  Module 8 · Property Management        (6 topics)
```

35 topics remaining across 5 modules. Module 3 was the longest single module — everything from here is sized similar to Module 1 or 2.
