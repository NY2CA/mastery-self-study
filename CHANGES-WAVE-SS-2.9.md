# Wave SS-2.9 — Module 6 · LOI (full content)

**Shipped:** May 6, 2026
**Scope:** Module 6 of Mastery Self-Study lands with full Diva-voiced content. 6 topics covering the LOI craft from negotiation framework through counter-offer mechanics.

## What ships

`src/data/courses.ts` Module 6 entry now populated with all 6 topics, 5 quiz items, 4 mistakes, and the Live-upsell sidebar embedded in Topic 6 (counter-offer mechanics — the highest-stakes real-time decision in the LOI process).

### 6 topics

```
loi-t01-negotiation-doc       The LOI as a negotiation document
loi-t02-price                 The price line · making the offer that gets accepted
loi-t03-earnest-money         Earnest money and the deposit ladder
loi-t04-due-diligence         Due diligence period · what to negotiate
loi-t05-closing-timeline      Closing terms and the timeline
loi-t06-counter-offer         Counter-offer mechanics  ◆
```

### Live-upsell sidebar on Topic 6

The counter-offer decision is where coaching saves the most money. Sidebar lands at the highest-judgment moment:

> **◆ Mastery Live members workshop this on a real deal.**
> Counter-offer decisions are where coaching saves the most money. Self-Study gives you the framework. Live members bring their counter-offers to the monthly call and Diva and Lou pressure-test the response with them — flagging the deals where the broker is pushing for a 'split the difference' that takes the buyer above their max, the deals where walking is the right call but emotional momentum says push, and the deals where the seller's counter signals they'll come down further if the buyer holds. The framework is the same. The difference is having a seasoned operator across the table when the broker is asking for a decision by Friday and you're trying to figure out if you should pay another $400K.

### 5 quiz items

1. LOI binding nature — the exclusivity clause (Topic 1, operator)
2. Pricing strategy — submit below max with reasoning (Topic 2, application)
3. Earnest money structure — counter aggressive go-hard timing (Topic 3, operator)
4. DD timeline on complex deal (Topic 4, application)
5. Counter-offer discipline — walk when counter exceeds max (Topic 6, operator)

### 4 common mistakes

1. Skipping exclusivity on the LOI (→ Topic 1)
2. Pre-writing the max only after the counter arrives (→ Topic 6)
3. Skipping retrade rights (→ Topic 4)
4. Reflexive split-the-difference negotiation (→ Topic 6)

### Voice + depth markers

- Operator-first ("we countered at $32.9M with explanation," "we retraded $150K")
- Specific dollar amounts ($150K initial / $400K go-hard, $900K savings vs max, $14K title insurance offset)
- Real deals: Plano 192-unit (counter saved $900K), DFW 96-unit (re-listing won at 13.7% below original ask), Phoenix 220-unit (deposit ladder structure), Mesa 144-unit (retrade right earned $150K), DFW 192-unit (close-date flexibility earned $14K + planning head start)
- Concrete frameworks: the push/accept/walk decision tree, the deposit ladder structure, the 6-gate qualifying screen referenced from Module 2, the pre-written max discipline
- ~2,800 words body + worked examples + pitfalls; ~5,000 words total module content

## Files changed

```
src/data/courses.ts     ← Module 6 full content (Modules 1-5 + 7-8 unchanged)
```

## Deploy

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-2.9.zip

rsync -av ~/Downloads/wave-ss-2-9/src/data/courses.ts \
          ~/Documents/mastery-self-study/src/data/courses.ts

cp ~/Downloads/wave-ss-2-9/CHANGES-WAVE-SS-2.9.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/data/courses.ts CHANGES-WAVE-SS-2.9.md
git commit -m "Wave SS-2.9: Module 6 · LOI — full content"
git push
```

## Modules remaining (2)

```
Wave SS-2.10  →  Module 7 · PSA & DD               (8 topics)
Wave SS-2.11  →  Module 8 · Property Management    (6 topics)
```

14 topics across 2 modules remaining. **46 of 60 topics now in production.**
