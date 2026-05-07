# Wave SS-2.8 — Module 5 · Debt Sourcing (full content)

**Shipped:** May 6, 2026
**Scope:** Module 5 of Mastery Self-Study curriculum lands with full Diva-voiced content. 8 topics covering the debt landscape from agency to bridge.

## What ships

`src/data/courses.ts` Module 5 entry now populated with all 8 topics, 5 quiz items, 4 mistakes, plus the Live-upsell sidebar embedded in Topic 4 (bridge debt — the highest-stakes structural choice and the one that wiped out hundreds of operators in 2022-2023).

### 8 topics

```
debt-t01-landscape              The debt landscape · agency, bank, bridge
debt-t02-agency                 Agency debt · Fannie / Freddie / HUD
debt-t03-bank                   Bank debt · the relationship lender
debt-t04-bridge                 Bridge debt · short-term, higher-rate, value-add  ◆
debt-t05-term-sheet             Reading a term sheet
debt-t06-dscr-ltv               DSCR and LTV math
debt-t07-refinance              Refinance optionality
debt-t08-lender-conversation    The lender conversation
```

Each topic: title + summary + ~280-310 word body + worked example + 4-5 pitfalls + related-topic backlinks.

### Live-upsell sidebar on Topic 4 (bridge debt)

Bridge debt is the single highest-stakes structural choice an operator makes — and the topic where coaching saves the most money. Sidebar reads:

> **◆ Mastery Live members workshop this on a real deal.**
> Bridge debt decisions are where coaching saves the most money. Self-Study gives you the framework. Live members bring their bridge term sheets to a monthly call and Diva and Lou pressure-test the structure with them — flagging the extension terms that look fine but aren't, the rate cap costs that operators forget to negotiate, the prepay structures that lock you in if rates drop. Operators who took bridge in 2021 without coaching are now in workout. Operators who took bridge with coaching adjusted the structure and survived.

### 5 quiz items

1. Debt-to-plan match: 24-month renovation + 4-year hold (Topic 1, application)
2. Recourse negotiation on first deal (Topic 3, operator)
3. Bridge debt mismatch: 24-month loan on 36-month plan (Topic 4, operator)
4. DSCR vs LTV binding constraint math (Topic 6, application)
5. Refinance optionality: 10-year vs 7-year agency on 5-year hold (Topic 7, operator)

### 4 common mistakes

1. Picking debt before defining hold thesis (→ Topic 1)
2. Skipping bridge rate caps in rising-rate environments (→ Topic 4)
3. Anchoring on rate, ignoring fees and covenants (→ Topic 5)
4. Not building lender relationships before you need debt (→ Topic 8)

### Voice + depth markers

- Operator-first ("we pushed back," "we picked Fannie 7-year," "we sized the equity check at $9.6M")
- Specific dollar amounts ($26M bridge at 7.4% IO, $25K/year savings on 15bps, $40K rate cap, $250K origination on 1% of $25M)
- Real cycle history: 2021-2023 bridge debt blowup, 2022-2023 rate environment, Sun Belt operators in workout
- Real deals: Mesa 144-unit (bridge-to-agency 14.8% IRR), DFW 192-unit (Fannie 10-year at 5.45%), Phoenix 220-unit (4th deal with same bank, 35bps rate improvement)
- Concrete frameworks: 100/20/5/1 funnel ratios applied to lender relationships, +25bps rate × 3% loan-size impact rule, the bridge-to-agency two-leg model
- ~3,400 words body + worked examples + pitfalls; ~6,000 words total module content

## Files changed

```
src/data/courses.ts     ← Module 5 full content (Modules 1-4 + 6-8 unchanged)
```

## Deploy

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-2.8.zip

rsync -av ~/Downloads/wave-ss-2-8/src/data/courses.ts \
          ~/Documents/mastery-self-study/src/data/courses.ts

cp ~/Downloads/wave-ss-2-8/CHANGES-WAVE-SS-2.8.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/data/courses.ts CHANGES-WAVE-SS-2.8.md
git commit -m "Wave SS-2.8: Module 5 · Debt Sourcing — full content"
git push
```

## Modules remaining (3)

```
Wave SS-2.9   →  Module 6 · LOI                    (6 topics)
Wave SS-2.10  →  Module 7 · PSA & DD               (8 topics)
Wave SS-2.11  →  Module 8 · Property Management    (6 topics)
```

20 topics across 3 modules remaining. **40 of 60 topics now in production — two-thirds of the curriculum complete.**
