# Wave SS-1.2 — Self-Study landing page

**Shipped:** May 3, 2026
**Scope:** Replace the cloned Mastery Live marketing copy at `/` on the Self-Study subdomain with proper Self-Study-specific positioning. Implements task #88 (landing page).

## What changed

`src/pages/index.tsx` — full replacement. The 800-line Live marketing landing has been swapped for a 647-line Self-Study landing that mirrors the Foundations landing pattern (per the production spec).

### Sections (top to bottom)

1. **Marketing nav** — Rescia logo + "Mastery Self-Study" tagline + Curriculum / Mentor / FAQ / Sign In (or Dashboard if logged in)
2. **Hero** — *"The operator's execution toolkit."* · 8 modules · $1,997 · self-paced framing
3. **Three-rung product ladder** — Foundations / Mastery Self-Study (highlighted as "You are here") / Mastery Live · with the upgrade-credit hooks
4. **Curriculum** — pulls live from `data/courses.ts` to render the 8 modules with durations + descriptions; below it, the "Available in Mastery Live" panel showing the 4 reserved modules with gold dots
5. **What's included** — 6 cards covering modules, quizzes, PDFs, Excel templates, 12 months access, $1,997 upgrade credit
6. **What's NOT included** — explicit list (no live coaching, no AI tutor, no deal memos, no Your-deal workspace, no Live-reserved modules, no physical artifacts) — the differentiator section that filters for buyer fit
7. **Mentor** — Diva Rescia + Lou Lopez bios on a navy background
8. **FAQ** — 7 accordion items covering inclusions, differences from Live, upgrade mechanics, refund policy, access duration, coaching expectation, AI tutor
9. **Pricing CTA** — final purchase call-to-action with the "or inquire about Live" alternative path
10. **Footer** — Rescia Properties · Mastery Self-Study disclaimer

### Visual treatment

- Cream-dominant background (`--cream`, `--cream-warm` for section alternation)
- Navy text and CTAs throughout
- Gold (`--gold`, `--gold-deep`, `--gold-bright`) reserved as cameo for: ladder card "you are here" badge, "Available in Mastery Live" gold dots, dot bullets in "What's included," eyebrow color throughout, mentor section gold-bright accents on navy hero
- Same Playfair / Inter / JetBrains Mono typography stack as Live
- Sticky nav with subtle backdrop blur
- Three-rung ladder card uses navy fill on the "You are here" card to signal current product

### Filtering language

The "What's NOT included" section explicitly tells buyers what they don't get with Self-Study, and the FAQ entry "Will I get to talk to Diva or Lou?" plainly says: *"If you want a coach alongside you on a real deal, Self-Study is the wrong product — inquire about Mastery Live."* This is intentional — we're filtering for fit, not maximizing checkout conversion. Buyers who need coaching find their way to Live without having to discover that mid-program.

## Files changed

```
src/pages/index.tsx     ← REPLACED · Self-Study landing (647 lines)
```

Single file. No CSS changes (everything inline or via existing CSS custom properties). No new dependencies. No data file changes.

## Files unchanged

```
src/styles/landing.css  (Live-era styles — unused by new landing, kept for compatibility with any not-yet-replaced surfaces)
src/data/courses.ts     (Wave SS-1.1 state)
src/components/*        (all existing components)
src/pages/dashboard.tsx (Wave SS-1)
src/pages/inquire-about-live.tsx (Wave SS-1)
```

## Deploy

Same git-push flow:

```bash
cd ~/Downloads
unzip -o mastery-selfstudy-wave-ss-1.2-hotfix.zip

rsync -av ~/Downloads/wave-ss-1-2-hotfix/src/pages/index.tsx \
          ~/Documents/mastery-self-study/src/pages/index.tsx

cp ~/Downloads/wave-ss-1-2-hotfix/CHANGES-WAVE-SS-1.2.md \
   ~/Documents/mastery-self-study/

cd ~/Documents/mastery-self-study
git add src/pages/index.tsx CHANGES-WAVE-SS-1.2.md
git commit -m "Wave SS-1.2: Self-Study landing page replaces cloned Live copy"
git push
```

Netlify rebuilds on push. After deploy goes green, hard-refresh `https://selfstudy.resciapropertiesmentorship.com` and the new landing renders.

## Verification checklist

- [ ] Hero copy reads "The operator's execution toolkit" — not Live coaching language
- [ ] Three-rung ladder shows Foundations / Self-Study / Mastery Live — middle card has "You are here" gold pill
- [ ] Curriculum renders all 8 Self-Study modules pulled from `data/courses.ts` (Submarket through Property Management)
- [ ] "Available in Mastery Live" panel shows the 4 reserved modules with gold dots
- [ ] "What's NOT included" section is present with 6 explicit cards
- [ ] FAQ accordion expands/collapses
- [ ] Pricing CTA at bottom links to `/pricing` (logged out) or `/dashboard` (logged in)
- [ ] Sign In button in nav swaps to "Dashboard" when authenticated
- [ ] All other routes (`/dashboard`, `/login`, `/admin/members`, `/inquire-about-live`) still work — landing change is isolated to `/`

## What's still ahead

- **Wave SS-2** — write the actual 8 modules of curriculum content (topics, quizzes, mistakes, Diva voice)
- **Wave SS-3** — wire `/inquire-about-live` to a real Netlify Function that notifies you via Resend; promote upgrade-card dismissal from localStorage to user record
- **Wave SS-4** — Stripe products + checkout + upgrade coupon
- **Wave SS-5** — go-live verification + cross-product nav links from Live and Foundations landing pages
