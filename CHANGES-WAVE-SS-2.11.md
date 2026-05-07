# Wave SS-2.11 — Module 8 · Property Management (final module)

**Shipped:** May 7, 2026
**Scope:** Final module of Mastery Self-Study curriculum. 6 topics covering the post-close operational craft from PM hiring through transition. **The 60-topic curriculum is now complete.**

## What ships

`src/data/courses.ts` Module 8 entry now populated with all 6 topics, 5 quiz items, 4 mistakes, and the Live-upsell sidebar embedded in Topic 6 (firing the PM — the highest operational-risk decision in the module).

### 6 topics

```
pm-t01-operational-partner   PM as the operational partner
pm-t02-rfp                   Hiring a PM · the RFP and selection process
pm-t03-contract              The PM contract · structure and incentives
pm-t04-variance-review       The monthly variance review
pm-t05-cadence               Operating cadence · the ongoing PM relationship
pm-t06-firing                Firing the PM · transition without disruption  ◆
```

### Live-upsell sidebar on Topic 6

> **◆ Mastery Live members workshop this on a real deal.**
> PM termination decisions are where coaching saves the most operational risk. Self-Study gives you the framework. Live members bring their underperforming PM situations to the monthly call and Diva and Lou pressure-test the diagnosis with them — flagging when the PM is recoverable versus structurally wrong, when the timing of transition matters, and when 'fire and replace' is actually the wrong call. The framework is the same. The difference is having a seasoned operator across the table when you're staring at a $200K NOI variance and trying to decide whether to give the PM another quarter or pull the trigger now.

### 5 quiz items

1. PM model selection — first-time syndicator self-management decision (Topic 1, operator)
2. RFP evaluation — submarket fit vs lowest fee (Topic 2, operator)
3. Contract termination — for-cause vs for-convenience (Topic 3, operator)
4. Variance review interpretation — concession-supported occupancy (Topic 4, application)
5. PM transition timing during lease-up (Topic 6, operator)

### 4 common mistakes

1. Selecting PM on lowest fee (→ Topic 2)
2. Skipping for-convenience termination clause (→ Topic 3)
3. Skipping monthly variance reviews when "things are going well" (→ Topic 4)
4. Treating PM termination as failure (→ Topic 6)

---

## ◆ The 60-topic curriculum is COMPLETE

```
Module 1 · Submarket Intelligence       8 topics  ✓ (Wave SS-2.1)
Module 2 · Deal Sourcing                7 topics  ✓ (Wave SS-2.5)
Module 3 · Underwriting                10 topics  ✓ (Wave SS-2.6)
Module 4 · Stress Testing & CapEx       7 topics  ✓ (Wave SS-2.7)
Module 5 · Debt Sourcing                8 topics  ✓ (Wave SS-2.8)
Module 6 · LOI                          6 topics  ✓ (Wave SS-2.9)
Module 7 · PSA & DD                     8 topics  ✓ (Wave SS-2.10)
Module 8 · Property Management          6 topics  ✓ (Wave SS-2.11) ← THIS WAVE
─────────────────────────────────────────────────────────
                                       60 topics complete
```

### Curriculum totals

- **60 topics** across 8 modules
- **8 Live-upsell sidebars** placed at each module's highest-judgment moment
- **40 quiz items** (5 per module · multiple choice with why/trap explanations)
- **32 common mistakes** (4 per module · trap/why/fix structure)
- **~38,000 words** of total curriculum content (body + examples + pitfalls + quiz/mistake explanations)

### Voice consistency markers maintained across all 8 modules

- Operator-first framing throughout ("we passed Tucson," "we LOI'd at $32.7M," "we retraded $200K")
- Specific dollar amounts on every example
- Real-deal references: Plano, Phoenix West Valley, Mesa, DFW, Tampa, Tucson — Sun Belt operator geography
- Concrete numerical bands and rules of thumb
- Active voice, no hype, no marketing language
- Cycle history references where relevant: 2008-09, 2022-23 bridge debt blowup, Sun Belt rent declines

### The upgrade story works on every module

Each Live-upsell sidebar lands at the highest-judgment moment in that module — the place where coaching most demonstrably saves money or operational risk:

- M1 walk-away decisions
- M2 qualifying before LOI
- M3 bear case discipline
- M4 capital call risk
- M5 bridge debt structure
- M6 counter-offer mechanics
- M7 retrade strategy
- M8 PM termination

The framing is consistent: *Self-Study gives you the framework. Live members bring their actual deals to a monthly call and Diva and Lou pressure-test the read with them. The frameworks are the same. The difference is having a seasoned operator across the table when [the specific decision is on the line].*

## Files changed

```
src/data/courses.ts     ← Module 8 full content · curriculum complete
```

## Deploy

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-2.11.zip

rsync -av ~/Downloads/wave-ss-2-11/src/data/courses.ts \
          ~/Documents/mastery-self-study/src/data/courses.ts

cp ~/Downloads/wave-ss-2-11/CHANGES-WAVE-SS-2.11.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/data/courses.ts CHANGES-WAVE-SS-2.11.md
git commit -m "Wave SS-2.11: Module 8 · Property Management — final module · curriculum COMPLETE"
git push
```

## What's still ahead post-curriculum

The curriculum is complete. The remaining production threads to make Self-Study a fully transactable product:

- **Wave SS-3** — Inquire-about-live Netlify Function (Calendly handles primary path; this captures form-fallback inquiries server-side)
- **Wave SS-4** — Stripe products + checkout + upgrade-to-Live coupon redemption
- **Wave SS-5** — Final go-live verification + cross-product nav links from Live and Foundations landing pages

Plus the parallel work threads:

- Foundations curriculum content (#71)
- Foundations PDFs (#72)
- Foundations dashboard integration (#74)
- Foundations Stripe checkout (#75)
- Foundations email lifecycle (#76)
- Foundations subdomain infrastructure (#79)
- Mastery Live pricing-coherence (#85)

But the heaviest single chunk of the Self-Study build — writing 60 topics of Diva-voiced, operator-grade curriculum content — is done.
