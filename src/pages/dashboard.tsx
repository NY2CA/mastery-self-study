import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import UpgradeCard from '@/components/UpgradeCard';
import { useAuth } from '@/hooks/useAuth';
import { useCourse } from '@/hooks/useCourse';
import { useBilling } from '@/hooks/useBilling';
import { liveOnlyModules } from '@/data/courses';

/**
 * Mastery Self-Study · member dashboard.
 *
 * Lighter-intensity sibling of the Mastery Live dashboard. Cream surface,
 * navy text, gold reserved exclusively for the post-Module-1 upgrade card
 * and the "Available in Mastery Live" sidebar dots. No coaching-call card,
 * no AI tutor card, no Your-deal workspace, no deal memos, no weekly reads.
 *
 * Surfaces (top to bottom):
 *   1. Access-pending banner (when admin hasn't granted access)
 *   2. Welcome hero (cream + navy)
 *   3. Renewal banner (days remaining in year-1 access window)
 *   4. UpgradeCard · ONLY visible after Module 1 is complete (gold cameo)
 *   5. Curriculum (8 modules · progressive locks)
 *   6. "Available in Mastery Live" panel (the 4 reserved modules)
 *   7. Models & templates toolkit
 *   8. Cross-sell footer card · "Inquire about Live"
 *   9. Admin tools (admin only)
 */
export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { course, modules, progress, isComplete } = useCourse('multifamily-mastery');
  const { status: billing, openPortal, startCheckout } = useBilling({ enabled: Boolean(user) });

  // Local state for the "hide upgrade card for 30 days" mechanic. v1 stores
  // the dismissal timestamp in localStorage; Wave SS-3 promotes it to the
  // user record via a Netlify Function for cross-device persistence.
  const [upgradeDismissedUntil, setUpgradeDismissedUntil] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const v = window.localStorage.getItem('mss_upgrade_dismissed_until');
    if (v) setUpgradeDismissedUntil(Number(v));
  }, []);

  function dismissUpgradeCard() {
    if (typeof window === 'undefined') return;
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const until = Date.now() + thirtyDaysMs;
    window.localStorage.setItem('mss_upgrade_dismissed_until', String(until));
    setUpgradeDismissedUntil(until);
  }

  if (loading || !user || !course) {
    return (
      <main className="page page-center">
        <div className="container text-center text-ink-dim">Loading…</div>
      </main>
    );
  }

  const resume = modules.find((m) => !isComplete(m.id)) ?? modules[0];
  const hasAccess = billing?.hasAccess ?? false;
  const firstName = user.name.split(' ')[0];

  // Module 1 = Submarket Intelligence. The post-Module-1 upgrade trigger.
  const module1Done = isComplete('submarket');
  const upgradeCardVisible =
    hasAccess &&
    module1Done &&
    (!upgradeDismissedUntil || Date.now() > upgradeDismissedUntil);

  return (
    <>
      <main className="page">
        <div className="container grid gap-12">

          {/* ─── ACCESS-PENDING BANNER ─────────────────────────── */}
          {billing && !hasAccess && (
            <Card variant="offer" style={{ borderColor: 'var(--gold)', borderWidth: 2 }}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="eyebrow" style={{ color: 'var(--gold-deep)' }}>Access pending</span>
                  <h3 className="font-display text-2xl text-navy mt-1">
                    Welcome — your Self-Study membership is under review.
                  </h3>
                  <p className="text-ink-dim mt-2" style={{ maxWidth: 560 }}>
                    Rescia Properties will reach out to confirm enrollment and activate your access.
                    If you haven&rsquo;t heard from us within one business day, email{' '}
                    <a href="mailto:rescia@resciaproperties.com" className="text-navy underline underline-offset-2">
                      rescia@resciaproperties.com
                    </a>.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* ─── WELCOME HERO ───────────────────────────────────── */}
          <Card variant="hero">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-2">
                <span className="eyebrow" style={{ color: 'var(--gold-bright)' }}>Member dashboard</span>
                <h3
                  className="font-display font-medium"
                  style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--cream)', lineHeight: 1.15 }}
                >
                  Welcome back, {firstName}
                  {hasAccess && progress.percentage > 0 && progress.percentage < 100
                    ? ` — you're ${progress.percentage}% in.`
                    : '.'}
                </h3>
                <p style={{ color: 'var(--cream-warm)', maxWidth: 540, lineHeight: 1.55 }}>
                  {!hasAccess
                    ? 'Preview the curriculum below. Unlock the program to start Module 1.'
                    : progress.percentage === 100
                    ? 'You have completed every Self-Study module. Inquire about Mastery Live to take this further.'
                    : progress.percentage === 0
                    ? 'Welcome aboard. Begin with Module 1 — Submarket Intelligence.'
                    : 'Resume where you left off. Self-paced, no deadlines.'}
                </p>
              </div>
              <div className="flex flex-col items-start gap-3" style={{ minWidth: 240 }}>
                <ProgressBar current={progress.completed} total={progress.total} />
                {hasAccess ? (
                  <Link
                    href={`/course/${resume.id}`}
                    className="btn-primary"
                    style={{ background: 'var(--gold)', borderColor: 'var(--gold)', color: 'var(--navy)' }}
                  >
                    {progress.percentage === 0
                      ? 'Start Module 1'
                      : progress.percentage === 100
                      ? 'Review program'
                      : 'Resume program'}
                  </Link>
                ) : (
                  <Link
                    href="/pricing"
                    className="btn-primary"
                    style={{ background: 'var(--gold)', borderColor: 'var(--gold)', color: 'var(--navy)' }}
                  >
                    Buy Self-Study · $1,997
                  </Link>
                )}
              </div>
            </div>
          </Card>

          {/* ─── RENEWAL BANNER · access-only ───────────────────── */}
          {billing && hasAccess && billing.currentPeriodEnd && (
            <Card variant="offer">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="eyebrow">Your access</span>
                  <p className="font-display text-xl text-navy mt-1">
                    {billing.cancelAtPeriodEnd ? 'Ends on' : 'Renews on'}{' '}
                    {new Date(billing.currentPeriodEnd).toLocaleDateString()}
                  </p>
                  <p className="text-ink-dim text-sm mt-1" style={{ maxWidth: 540 }}>
                    Continue access at <strong>$99/month</strong> after your year ends, or upgrade
                    to Mastery Live and credit your $1,997 against tuition.
                  </p>
                </div>
                {billing.hasBillingAccount && (
                  <Button
                    variant="secondary"
                    onClick={() =>
                      openPortal().catch((err: Error) => alert(err.message || 'Unable to open portal'))
                    }
                  >
                    Manage billing
                  </Button>
                )}
              </div>
            </Card>
          )}

          {/* ─── UPGRADE CARD · post-Module-1 trigger ───────────── */}
          {upgradeCardVisible && (
            <UpgradeCard firstName={firstName} onDismiss={dismissUpgradeCard} />
          )}

          {/* ─── CURRICULUM ─────────────────────────────────────── */}
          <section>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">Your curriculum</span>
              <h2 style={{ fontSize: 32 }}>{course.title}</h2>
              <p>
                Eight modules, self-paced. Work them in sequence — the preferred course
                progression — or jump ahead.
              </p>
            </div>
            <ProgressBar
              current={progress.completed}
              total={progress.total}
              showLabel
              className="mb-8"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((m, i) => {
                const done = isComplete(m.id);
                const status = !hasAccess ? 'Locked' : done ? 'Completed' : 'In progress';
                const cls = !hasAccess
                  ? 'module locked'
                  : done
                  ? 'module completed'
                  : 'module in-progress';
                const href = hasAccess ? `/course/${m.id}` : '/pricing';
                return (
                  <Link key={m.id} href={href} className={cls} style={{ textDecoration: 'none' }}>
                    <span className="num">Module {i + 1} · {m.duration}</span>
                    <h4>{m.title.replace(/^Module \d+\s·\s/, '')}</h4>
                    <p>{m.description}</p>
                    <span className="status">{status}</span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ─── AVAILABLE IN MASTERY LIVE · upgrade visibility ── */}
          <Card variant="offer">
            <div className="section-head" style={{ marginBottom: 16 }}>
              <span className="eyebrow" style={{ color: 'var(--gold-deep)' }}>Available in Mastery Live</span>
              <h3 className="font-display text-2xl">Four more modules — and the people alongside.</h3>
              <p className="text-ink-dim" style={{ maxWidth: 560 }}>
                Mastery Live extends the curriculum into the four areas that need a coach
                alongside you — and adds monthly coaching, an AI tutor, and deal memos
                from the Rescia desk.
              </p>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {liveOnlyModules.map((m) => (
                <li
                  key={m.num}
                  style={{
                    padding: '12px 0',
                    borderTop: '1px solid var(--line)',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'baseline',
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'var(--gold)',
                      flexShrink: 0,
                      marginTop: 6,
                    }}
                    aria-hidden
                  />
                  <div>
                    <div className="font-display text-lg text-navy">
                      Module {m.num} · {m.title}
                    </div>
                    <div className="text-ink-dim text-sm">{m.reason}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* ─── TOOLKIT ────────────────────────────────────────── */}
          <Card variant="offer">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-2">
                <span className="eyebrow">Toolkit</span>
                <h3 className="font-display text-2xl">Templates &amp; models</h3>
                <p className="text-ink-dim" style={{ maxWidth: 540 }}>
                  Underwriting model · Investor pipeline CRM · CapEx tracker · Distribution
                  waterfall · LP report · LOI · PSA &amp; DD checklists · PM RFP. View+print PDFs
                  and input-only Excel templates with R/Y/G indicators.
                </p>
              </div>
              {hasAccess ? (
                <Link href="/templates" className="btn-secondary">Open toolkit</Link>
              ) : (
                <Link href="/pricing" className="btn-secondary">Unlock toolkit</Link>
              )}
            </div>
          </Card>

          {/* ─── CROSS-SELL FOOTER CARD · Inquire about Live ──── */}
          {hasAccess && !upgradeCardVisible && (
            <Card variant="offer" style={{ borderLeftWidth: 4, borderLeftStyle: 'solid', borderLeftColor: 'var(--gold)' }}>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="eyebrow" style={{ color: 'var(--gold-deep)' }}>Mastery Live</span>
                  <h3 className="font-display text-xl mt-1">
                    Want a coach alongside you on a real deal?
                  </h3>
                  <p className="text-ink-dim text-sm mt-1" style={{ maxWidth: 540 }}>
                    Mastery Live adds Diva and Lou alongside, monthly coaching, AI tutor, and
                    the full 12-module curriculum. Your $1,997 credits toward tuition.
                  </p>
                </div>
                <Link href="/inquire-about-live" className="btn-secondary">
                  Inquire about Live
                </Link>
              </div>
            </Card>
          )}

          {/* ─── ADMIN SHORTCUT ─────────────────────────────────── */}
          {user.isAdmin && (
            <Card variant="offer" style={{ borderColor: 'var(--navy)', borderWidth: 1 }}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-2">
                  <span className="eyebrow" style={{ color: 'var(--navy)' }}>Admin tools</span>
                  <h3 className="font-display text-2xl">Member management</h3>
                  <p className="text-ink-dim" style={{ maxWidth: 520 }}>
                    Grant or revoke Self-Study access for partners, vendors, and beta members
                    — independent of Stripe billing.
                  </p>
                </div>
                <Link href="/admin/members" className="btn-secondary">Open admin</Link>
              </div>
            </Card>
          )}

        </div>
      </main>

      {/* Footer · Self-Study branded */}
      <footer style={{ marginTop: 48, padding: '32px 0', borderTop: '1px solid var(--line)', background: 'var(--cream-warm)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink-dim)',
              marginBottom: 6,
            }}
          >
            Rescia Properties · Mastery Self-Study
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>
            &copy; 2026 Rescia Properties · Not a securities offering · Past performance not indicative of future results
          </div>
        </div>
      </footer>
    </>
  );
}
