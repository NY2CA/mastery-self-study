import Link from 'next/link';
import Card from '@/components/Card';
import { useAuth } from '@/hooks/useAuth';
import { useBilling } from '@/hooks/useBilling';
import { openCalendly, CALENDLY_URL } from '@/lib/calendly';

/**
 * Self-Study Site · /pricing — the three-tier ladder
 *
 * Wave F-1.1.1 · rewritten from the legacy Monthly/Annual/Lifetime
 * Mastery layout (which was a copy-paste artifact when this site was
 * scaffolded from Mastery's repo). Now mirrors the canonical three-tier
 * ladder used on the Mastery /pricing page, with Self-Study highlighted
 * as the rung the visitor is currently considering.
 *
 * Each card hands off to the right destination:
 *   - Multifamily 101 → external Multifamily 101 site (when stood up)
 *   - Self-Study      → /signup (new visitor) or /dashboard (logged-in member)
 *   - Mastery Live    → Calendly strategy-call (existing openCalendly helper)
 *
 * Bullets and copy match the LadderCard on the Self-Study landing page
 * (`src/pages/index.tsx`) so a visitor sees the same description in both
 * places.
 */

// ──────────────────────────────────────────────────────────────────
// Configuration · same constants pattern as the Mastery /pricing page.
// Update in one place when domains change.
// ──────────────────────────────────────────────────────────────────

const FOUNDATIONS_URL = 'https://foundations.resciaproperties.com';

interface PlanCard {
  id: 'foundations' | 'self-study' | 'live';
  eyebrow: string;
  label: string;
  price: string;
  cadence: string;
  blurb: string;
  bullets: string[];
  ctaLabel: string;
  /** Either an internal route or an external URL. */
  ctaUrl: string;
  /** Only relevant for the Live card · routes through openCalendly() handler. */
  ctaCalendly?: boolean;
  ctaExternal: boolean;
  highlight?: boolean;
}

const PLANS: PlanCard[] = [
  {
    id: 'foundations',
    eyebrow: 'Earlier on the path',
    label: 'Multifamily 101',
    price: '$99',
    cadence: 'one-time',
    blurb:
      'For readers still deciding whether multifamily is the right vehicle. Six self-paced modules in Diva’s voice — terminology, market basics, and the math behind returns.',
    bullets: [
      'Six modules · ~10 hours of focused content',
      'Self-paced · 1 year of access',
      'Glossary, returns calculator, deal anatomy',
      'Self-assessment + module one-pagers',
      'Upgrade credit toward Self-Study available',
    ],
    ctaLabel: 'Start with Multifamily 101 →',
    ctaUrl: FOUNDATIONS_URL,
    ctaExternal: true,
  },
  {
    id: 'self-study',
    eyebrow: 'You are here',
    label: 'Mastery · Self-Study',
    price: '$1,997',
    cadence: 'one-time',
    blurb:
      'The operator’s execution toolkit. Self-paced. Eight modules across the full multifamily cycle, taught by Diva Rescia and Lou Lopez.',
    bullets: [
      'Eight modules · 60 topics · submarket through property management',
      '4–5 question quizzes · view+print PDFs · Excel templates',
      'Underwriting model, LOI, PPM outline, DD checklists',
      '12 months of access',
      'Tuition credits toward Mastery Live',
    ],
    ctaLabel: 'Begin Self-Study →',
    ctaUrl: '/signup',
    ctaExternal: false,
    highlight: true,
  },
  {
    id: 'live',
    eyebrow: 'Coaching tier',
    label: 'Mastery Live',
    price: 'By inquiry',
    cadence: 'application',
    blurb:
      'The full curriculum plus ongoing monthly coaching with Diva Rescia and Lou Lopez. Submit deals for review; we work them with you call by call.',
    bullets: [
      'Everything in Self-Study',
      'Ongoing monthly coaching with Diva and Lou',
      'Submit deals through the member dashboard for review',
      'Diva and Lou pressure-test your underwriting and notes',
      'Selective enrollment via free 30-minute strategy call',
    ],
    ctaLabel: 'Book a strategy call →',
    ctaUrl: CALENDLY_URL,
    ctaExternal: true,
    ctaCalendly: true,
  },
];

export default function PricingPage() {
  const { user, loading: authLoading } = useAuth();
  const { status } = useBilling({ enabled: Boolean(user) });

  // Self-Study card CTA varies by auth state — logged-in members go to
  // their dashboard rather than the buy flow.
  const selfStudyHref = user ? '/dashboard' : '/signup';
  const selfStudyLabel = user ? 'Open dashboard →' : 'Begin Self-Study →';

  return (
    <main className="page">
      <div className="container grid gap-12">
        {/* ─── Header ──────────────────────────────────────────── */}
        <div className="section-head text-center" style={{ marginBottom: 0 }}>
          <span className="eyebrow">Pricing</span>
          <h1
            className="font-display font-medium"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            Three rungs. Pick the one that fits.
          </h1>
          <p
            className="text-ink-dim"
            style={{ maxWidth: 720, margin: '0 auto', lineHeight: 1.55 }}
          >
            Multifamily 101 if you’re still deciding. Self-Study if you’ve
            already chosen and want the operator playbook self-paced. Mastery
            Live if you want Diva and Lou alongside you on real deals.
          </p>
        </div>

        {/* ─── Already-a-member banner ─────────────────────────── */}
        {status?.hasAccess && (
          <Card variant="offer" className="text-center">
            <p className="text-navy font-display text-xl mb-2">
              You already have Self-Study access.
            </p>
            <p className="text-ink-dim mb-5">
              Pick up where you left off, or explore the next rung when you’re
              ready.
            </p>
            <div className="flex justify-center gap-3">
              <Link href="/dashboard" className="btn-primary">
                Go to dashboard
              </Link>
            </div>
          </Card>
        )}

        {/* ─── Cards ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <Card
              key={p.id}
              variant="offer"
              className={p.highlight ? 'border-gold' : ''}
              style={
                p.highlight
                  ? { borderColor: 'var(--gold)', borderWidth: 2 }
                  : undefined
              }
            >
              <span
                className="eyebrow"
                style={
                  p.highlight
                    ? {
                        color: 'var(--gold-deep)',
                        background: 'var(--gold-soft)',
                        padding: '4px 10px',
                        borderRadius: 999,
                        display: 'inline-block',
                        marginBottom: 8,
                      }
                    : { display: 'inline-block', marginBottom: 8 }
                }
              >
                {p.eyebrow}
              </span>
              <h3 className="font-display text-2xl text-navy">{p.label}</h3>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-display text-4xl text-navy">
                  {p.price}
                </span>
                <span className="text-ink-dim">{p.cadence}</span>
              </div>
              <p
                className="mt-3 text-ink-dim"
                style={{ minHeight: 96, lineHeight: 1.5 }}
              >
                {p.blurb}
              </p>
              <ul className="mt-6 space-y-2">
                {p.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-ink">
                    <span className="text-gold-deep">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {p.id === 'self-study' ? (
                  <Link
                    href={selfStudyHref}
                    className={p.highlight ? 'btn-primary' : 'btn-secondary'}
                    style={{
                      display: 'inline-flex',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    {selfStudyLabel}
                  </Link>
                ) : p.ctaCalendly ? (
                  <a
                    href={p.ctaUrl}
                    onClick={openCalendly}
                    className={p.highlight ? 'btn-primary' : 'btn-secondary'}
                    style={{
                      display: 'inline-flex',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    {p.ctaLabel}
                  </a>
                ) : p.ctaExternal ? (
                  <a
                    href={p.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={p.highlight ? 'btn-primary' : 'btn-secondary'}
                    style={{
                      display: 'inline-flex',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    {p.ctaLabel}
                  </a>
                ) : (
                  <Link
                    href={p.ctaUrl}
                    className={p.highlight ? 'btn-primary' : 'btn-secondary'}
                    style={{
                      display: 'inline-flex',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    {p.ctaLabel}
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* ─── Ladder logic copy ───────────────────────────────── */}
        <div
          className="text-center"
          style={{
            maxWidth: 720,
            margin: '0 auto',
            color: 'var(--ink-dim)',
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          <p>
            Most operators arrive at{' '}
            <strong style={{ color: 'var(--navy)' }}>Self-Study</strong> after
            deciding multifamily is the right vehicle and that they want the
            full playbook self-paced. If you’re earlier than that, start with{' '}
            <strong style={{ color: 'var(--navy)' }}>Multifamily 101</strong>.
            If you have a deal in flight or want a coach in the room, book a{' '}
            <strong style={{ color: 'var(--navy)' }}>strategy call for Live</strong>.
          </p>
        </div>

        {/* ─── Logged-in member nudge / signed-out signin link ── */}
        <div className="text-center" style={{ marginTop: 12 }}>
          {!authLoading && user ? (
            <Link
              href="/dashboard"
              className="text-navy underline underline-offset-2 text-sm"
            >
              Back to your dashboard
            </Link>
          ) : (
            <p className="text-ink-dim text-sm">
              Already a Self-Study member?{' '}
              <Link
                href="/login"
                className="text-navy underline underline-offset-2"
              >
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
