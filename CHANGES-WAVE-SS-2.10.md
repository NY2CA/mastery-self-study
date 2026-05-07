# Wave SS-2.10 — Module 7 · PSA & DD (full content)

**Shipped:** May 6, 2026
**Scope:** Module 7 of Mastery Self-Study lands with full Diva-voiced content. 8 topics covering the PSA negotiation and DD craft from contract through retrade.

## What ships

`src/data/courses.ts` Module 7 entry now populated with all 8 topics, 5 quiz items, 4 mistakes, and the Live-upsell sidebar embedded in Topic 8 (retrade strategy — the highest-judgment moment in the module, where coaching saves the most money).

### 8 topics

```
psa-t01-loi-to-psa            From LOI to PSA · the transition
psa-t02-clauses               PSA clauses to read carefully
psa-t03-dd-checklist          The DD checklist · what to inspect
psa-t04-property-inspection   Property inspection · what to look for
psa-t05-financial-dd          Financial DD · validating T-12
psa-t06-environmental         Environmental DD · Phase I and Phase II
psa-t07-title-survey          Title and survey
psa-t08-retrade               Retrade strategy · using DD findings  ◆
```

### Live-upsell sidebar on Topic 8

> **◆ Mastery Live members workshop this on a real deal.**
> Retrade decisions are where coaching saves the most money. Self-Study gives you the framework. Live members bring their DD findings and proposed retrades to the monthly call and Diva and Lou pressure-test the approach with them — flagging when the retrade ask is too large (deal-killer), when it's too small (eating cost), when the framing will damage the relationship, and when walking is the right call. The framework is the same. The difference is having a seasoned operator across the table when DD just surfaced $400K in unexpected capex and you're trying to decide between retrading, walking, or eating it.

### 5 quiz items

1. PSA reps and "actual knowledge" qualifiers (Topic 2, operator)
2. DD team coverage gaps (Topic 3, operator)
3. Phase II environmental triggers — adjacent dry cleaner (Topic 6, application)
4. Financial DD revenue variance reconciliation (Topic 5, application)
5. Retrade ask sizing on $292K of findings (Topic 8, operator)

### 4 common mistakes

1. Skipping attorney review on "standard" PSA clauses (→ Topic 2)
2. Underestimating physical inspection time (→ Topic 4)
3. Accepting "to seller's knowledge" qualifiers reflexively (→ Topic 2)
4. Retrading too aggressively or not at all (→ Topic 8)

### Voice + depth markers

- Operator-first ("we documented each, framed retrade at $250K," "we retraded $625K based on cap-rate math")
- Specific dollar amounts: $185K HVAC retrade, $32K Phase II, $292K total findings, $24K title premium, $668K rep cap, $300K cap difference
- Real deals: Mesa 144-unit (HVAC + dry cleaner + concession bake-ins, retraded $200K of $292K findings — 80% recovery), Phoenix 220-unit (PSA cap negotiation), DFW 192-unit (DD checklist 67 line items, 14 surfaced issues), Plano 192-unit (financial DD revealed $80K revenue gap, retraded $400K)
- Concrete frameworks: 4-category DD checklist (physical/financial/legal/market), 5-step retrade conversation, 80-90% retrade ask discipline, knowledge-qualifier negotiation
- ~3,400 words body + worked examples + pitfalls; ~6,200 words total module content

## Files changed

```
src/data/courses.ts     ← Module 7 full content (Modules 1-6 + 8 unchanged)
```

## Deploy

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-2.10.zip

rsync -av ~/Downloads/wave-ss-2-10/src/data/courses.ts \
          ~/Documents/mastery-self-study/src/data/courses.ts

cp ~/Downloads/wave-ss-2-10/CHANGES-WAVE-SS-2.10.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/data/courses.ts CHANGES-WAVE-SS-2.10.md
git commit -m "Wave SS-2.10: Module 7 · PSA & DD — full content"
git push
```

## Modules remaining (1)

```
Wave SS-2.11  →  Module 8 · Property Management    (6 topics)
```

**54 of 60 topics now in production — 90% of the curriculum complete.** One module to close out the curriculum.
