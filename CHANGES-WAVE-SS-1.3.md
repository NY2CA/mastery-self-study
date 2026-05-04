# Wave SS-1.3 — Self-Study landing redesign

**Shipped:** May 4, 2026
**Scope:** Address Lou's four feedback items on the Wave SS-1.2 landing — sizzle, page flow, Live emphasis, and co-equal mentor billing.

## What changed

### 1. More sizzle in the design

**Hero.** Cream → navy. Big difference. The hero now sits on a navy background with a subtle gold radial glow at the top edge, larger headline (clamps up to 76px), gold accent on the italic word *"execution toolkit,"* and a gold-bordered hairline gradient at the section bottom. Reads as institutional and substantial — the visual register that earns a $2K price.

**Firm stats strip directly below the hero.** Navy-deep band with four credentials in gold display type:
- $700M+ closed transactions in last 3 years
- 3,387+ units managed
- $989M current AUM
- 45+ years combined experience

This anchors credibility before any value claim.

**More gold throughout.** Diamond bullets (◆) instead of plain dots, gold accent on every section eyebrow, gold-bordered card tops on modules + value-prop cards + mentor cards, gold-gradient hairline dividers separating the navy "What Mastery Live adds" section and the final pricing CTA from the cream sections around them.

**Bigger type, more whitespace.** Section headlines clamp 32-48px (was 28-40px). Section padding 96px vertical (was 80px). Cards have more internal padding. The page breathes.

### 2. Page flow restructured

**New order:**

1. Marketing nav
2. Hero · navy · value-driven CTA "Begin Self-Study →" (no $1,997 in primary CTA)
3. Firm stats strip ($700M+ / 3,387+ / $989M / 45+)
4. **What you'll be able to do** · 6 outcome cards numbered 01-06 — the value proposition section that was missing
5. Curriculum · 8 modules
6. What's included · 6 cards
7. **What Mastery Live adds** · the upsell hook (was "What's NOT included" — reframed)
8. Mentors · full Diva + Lou bios
9. **Three-rung ladder · NO PRICING on cards** · moved further down
10. FAQ
11. Pricing CTA · the only place pricing appears prominently — final purchase moment
12. Footer

The pricing-first problem is gone. Buyers see the value, the curriculum, the credentials, the mentors, and the upgrade story BEFORE the page asks them to buy. By the time pricing lands at the bottom, they're either ready or they've self-selected out.

### 3. Three-rung ladder cards have NO pricing

Cards now show:
- **Tier name** (e.g. "Mastery Self-Study")
- **Taught by** line (Diva / Diva & Lou / both alongside)
- **One-line value prop**
- **4 feature bullets**
- **CTA only on the current tier and Mastery Live**

No "$99," no "$1,997," no "by inquiry" pricing string. Pricing is shown elsewhere on the page at the moments it matters (hero CTA copy, final pricing CTA section).

The Foundations card no longer compares $99 against $1,997 — solves the bad optics issue Lou flagged.

### 4. "What Mastery Live adds" replaces "What's NOT included"

Repositioned as a positive Live-emphasis section, not a list of what Self-Study lacks. Lives on a navy background with gold gradient borders top and bottom — visually distinct from cream sections.

**Headline differentiators (large gold display type):**
- **60+ hrs** · Coaching with Diva and Lou across the 12-month engagement
- **126** · Real-world topics across the full 12-module curriculum
- **12** · Modules · including Capital Raising, PPM, Asset Management, Exit
- **AI tutor** · Trained on the Mastery curriculum + Rescia's deal-by-deal commentary

**Mastery Live exclusives** card with 6 items:
- Monthly coaching calls (60+ hours total)
- AI tutor in every module
- Deal memos from the Rescia desk
- Your-deal workspace
- The 4 advanced modules
- Physical artifacts (hardcover book + leather binder)

**"Inquire about Mastery Live →"** CTA at the bottom of the section in gold — direct path to upsell.

### 5. Co-equal mentor billing

**Diva first, Lou second** — co-equal Co-Founder · Managing Partner billing for both.

**Full bios lifted verbatim from the Mastery Live landing** so the brand voice is identical across products. Each mentor card shows:
- Monogram (DR / LL) in navy gradient with gold-bright type
- Role: "Co-Founder · Managing Partner"
- Name (Diva Rescia / Lou Lopez)
- Title (CBRE Multifamily Investment Specialist / 25+ Years Corporate & Investment Leadership)
- Two paragraphs of bio
- 5 credential bullets

**Diva's bio includes:** principal investor since age 17, 20+ years experience, CBRE Multifamily Specialist (Fortune 150), mentored by Grant Cardone, value-add and institutional multifamily strategies specialist.

**Lou's bio includes:** 25 years Fortune 100 corporate leadership, 15+ years with PE firms / RIAs / broker dealers, 20+ years real estate, mentored by Tony Robbins and Grant Cardone, big-data analysis discipline.

Both bios position the Self-Study buyer to imagine Mastery Live — these are the people who'd be alongside if they upgraded. The mentor section is now a curiosity-and-upsell hook, not a generic "meet the team" footer.

## Files changed

```
src/pages/index.tsx     ← REPLACED · Wave SS-1.3 (893 lines)
```

Single file. No CSS changes. No data file changes. No new dependencies.

## What's still ahead

- **Wave SS-2** — write the actual 8 modules of curriculum content
- **Wave SS-3** — wire `/inquire-about-live` to a real Netlify Function
- **Wave SS-4** — Stripe products + checkout + upgrade coupon
- **Wave SS-5** — go-live verification + cross-product nav links

## Deploy

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-1.3-hotfix.zip

rsync -av ~/Downloads/wave-ss-1-3-hotfix/src/pages/index.tsx \
          ~/Documents/mastery-self-study/src/pages/index.tsx

cp ~/Downloads/wave-ss-1-3-hotfix/CHANGES-WAVE-SS-1.3.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/pages/index.tsx CHANGES-WAVE-SS-1.3.md
git commit -m "Wave SS-1.3: Self-Study landing redesign — sizzle, restructure, Live emphasis, co-equal mentors"
git push
```

After Netlify rebuild goes green, hard-refresh `selfstudy.resciapropertiesmentorship.com` and verify the new structure.
