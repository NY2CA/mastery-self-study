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
import { openCalendly } from '@/lib/calendly';

/**
 * Mastery Self-Study · member dashboard.
 *
 * Wave SS-2.4: visual treatment now matches Live's navy + gold + cream
 * institutional surface. Same structural format (welcome hero, progress
 * tracking, modules grid, toolkit, weekly reads). Self-Study-specific
 * surfaces emphasize what's AVAILABLE (the 8 modules · 60 topics · quizzes
 * · PDFs · Excel templates · weekly reads) rather than absence of Live
 * exclusives.
 *
 * Surfaces (top to bottom):
 *   1. Access-pending banner (when admin hasn't granted access)
 *   2. Welcome hero · navy + gold accents · progress framing
 *   3. Billing strip ("Your plan", renewal, manage billing)
 *   4. UpgradeCard · ONLY visible after Module 1 is complete (gold cameo)
 *   5. Quiz progress tile + Toolkit access tile (side-by-side)
 *   6. Curriculum (8 modules · 60 topics · progressive locks)
 *   7. Weekly reads · curated Tuesdays (Self-Study tagged articles)
 *   8. "Available in Mastery Live" panel (the 4 reserved modules + upsell)
 *   9. Admin tools (admin only)
 *  10. Navy footer
 */
export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { course, modules, progress, isComplete } = useCourse('multifamily-mastery');
  const { status: billing, openPortal, startCheckout } = useBilling({ enabled: Boolean(user) });

  const [upgradeDismissedUntil, setUpgradeDismissedUntil] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  // Toggle the global white-nav class while on this dashboard so the
  // shared Navigation banner repaints to white against our navy page.
  useEffect(() => {
    document.body.classList.add('live-dashboard-active');
    return () => {
      document.body.classList.remove('live-dashboard-active');
    };
  }, []);

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
      <main className="page page-center" style={{ background: 'var(--navy)' }}>
        <div className="container text-center" style={{ color: 'rgba(250, 247, 242, 0.62)' }}>
          Loading…
        </div>
      </main>
    );
  }

  const resume = modules.find((m) => !isComplete(m.id)) ?? modules[0];
  const hasAccess = billing?.hasAccess ?? false;
  const firstName = user.name.split(' ')[0];
  const completedModules = modules.filter((m) => isComplete(m.id)).length;
  // Self-Study has 8 modules · 60 topics · 4-5 quizzes per module.
  const TOTAL_TOPICS = 60;
  const TOTAL_QUIZZES = modules.length;

  const module1Done = isComplete('submarket');
  const upgradeCardVisible =
    hasAccess &&
    module1Done &&
    (!upgradeDismissedUntil || Date.now() > upgradeDismissedUntil);

  return (
    <>
      {/* Scoped global override: repaint the shared <Navigation /> banner
          to white while this dashboard is mounted. */}
      <style jsx global>{`
        body.live-dashboard-active .nav {
          background: #ffffff !important;
          border-bottom-color: rgba(184, 148, 90, 0.18) !important;
        }
        body.live-dashboard-active .nav .brand,
        body.live-dashboard-active .nav .links a {
          color: var(--navy);
        }
      `}</style>

      <main className="page" style={{ background: 'var(--navy)', color: 'var(--cream)' }}>
        <div className="container grid gap-12">

          {/* ─── ACCESS-PENDING BANNER ─────────────────────────── */}
          {billing && !hasAccess && (
            <Card
              variant="offer"
              style={{
                background: 'linear-gradient(135deg, var(--navy-soft) 0%, #1f315a 100%)',
                border: '1px solid var(--gold)',
                color: 'var(--cream)',
              }}
            >
              <div className="flex flex-col gap-3">
                <span className="eyebrow" style={{ color: 'var(--gold-bright)' }}>Access pending</span>
                <h3 className="font-display" style={{ fontSize: 24, color: 'var(--cream)', margin: 0, fontWeight: 500 }}>
                  Welcome — your Self-Study membership is under review.
                </h3>
                <p style={{ color: 'rgba(250, 247, 242, 0.78)', maxWidth: 560, margin: 0 }}>
                  Rescia Properties will reach out to confirm enrollment and activate your access.
                  If you haven&rsquo;t heard from us within one business day, email{' '}
                  <a
                    href="mailto:rescia@resciaproperties.com"
                    style={{ color: 'var(--gold-bright)', textDecoration: 'underline' }}
                  >
                    rescia@resciaproperties.com
                  </a>.
                </p>
              </div>
            </Card>
          )}

          {/* ─── WELCOME HERO ───────────────────────────────────── */}
          <Card
            variant="hero"
            style={{ background: 'linear-gradient(135deg, var(--navy-soft) 0%, var(--navy) 100%)' }}
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-2">
                <span className="eyebrow" style={{ color: 'var(--gold-bright)' }}>
                  Mastery Self-Study · Member dashboard
                </span>
                <h3
                  className="font-display font-medium"
                  style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--cream)', lineHeight: 1.15 }}
                >
                  Welcome back, {firstName}
                  {hasAccess && progress.percentage > 0 && progress.percentage < 100 ? (
                    <>
                      {' '}— <em style={{ fontStyle: 'italic', color: 'var(--gold-bright)', fontWeight: 400 }}>
                        you&rsquo;re {progress.percentage}% in.
                      </em>
                    </>
                  ) : (
                    '.'
                  )}
                </h3>
                <p style={{ color: 'rgba(250, 247, 242, 0.72)', maxWidth: 560, lineHeight: 1.55 }}>
                  {!hasAccess
                    ? 'Preview the curriculum below. Unlock the program to start Module 1.'
                    : progress.percentage === 100
                    ? "You've completed every Self-Study module. Inquire about Mastery Live to take this further."
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
                    Buy Self-Study
                  </Link>
                )}
              </div>
            </div>
          </Card>

          {/* ─── BILLING STRIP · access-only ────────────────────── */}
          {billing && hasAccess && (
            <Card
              variant="offer"
              style={{
                background: '#1f315a',
                border: '1px solid rgba(184, 148, 90, 0.18)',
                color: 'var(--cream)',
              }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-1">
                  <span className="eyebrow" style={{ color: 'var(--gold)' }}>Your access</span>
                  <p className="font-display" style={{ fontSize: 19, color: 'var(--cream)', margin: 0, fontWeight: 500 }}>
                    {billing.lifetime
                      ? 'Lifetime · paid in full'
                      : billing.plan
                      ? `${billing.plan[0].toUpperCase()}${billing.plan.slice(1)}`
                      : 'Active'}
                  </p>
                  {billing.currentPeriodEnd && !billing.lifetime && (
                    <p style={{ fontSize: 13, color: 'rgba(250, 247, 242, 0.62)', margin: 0 }}>
                      {billing.cancelAtPeriodEnd ? 'Ends on' : 'Renews on'}{' '}
                      {new Date(billing.currentPeriodEnd).toLocaleDateString()}
                      {' · '}Continue at $99/month or upgrade to Mastery Live with $1,997 credit.
                    </p>
                  )}
                </div>
                {!billing.lifetime && billing.hasBillingAccount && (
                  <Button
                    variant="secondary"
                    style={{ borderColor: 'var(--gold)', color: 'var(--gold-bright)' }}
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

          {/* ─── PROGRESS + TOOLKIT TILES (access-only) ────────── */}
          {hasAccess && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quiz / topic progress tile */}
              <Card
                variant="offer"
                style={{
                  background: '#1f315a',
                  border: '1px solid rgba(184, 148, 90, 0.18)',
                  color: 'var(--cream)',
                }}
              >
                <div className="flex flex-col gap-3">
                  <span className="eyebrow" style={{ color: 'var(--gold)' }}>Your progress</span>
                  <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginTop: 4 }}>
                    <ProgressStat n={`${completedModules}/${modules.length}`} l="Modules complete" />
                    <ProgressStat n={`${progress.percentage}%`} l="Curriculum progress" />
                    <ProgressStat n={String(TOTAL_TOPICS)} l="Topics in your curriculum" />
                  </div>
                  <p style={{ color: 'rgba(250, 247, 242, 0.62)', fontSize: 13, margin: '8px 0 0' }}>
                    Each module ends with a 4-5 question quiz. Pass to unlock the next module.
                  </p>
                </div>
              </Card>

              {/* Toolkit tile · models, templates, PDFs */}
              <Card
                variant="offer"
                style={{
                  background: '#1f315a',
                  border: '1px solid rgba(184, 148, 90, 0.18)',
                  color: 'var(--cream)',
                }}
              >
                <div className="flex flex-col gap-3">
                  <span className="eyebrow" style={{ color: 'var(--gold)' }}>Toolkit</span>
                  <h3 className="font-display" style={{ fontSize: 19, color: 'var(--cream)', margin: 0, fontWeight: 500 }}>
                    Models &amp; templates
                  </h3>
                  <p style={{ color: 'rgba(250, 247, 242, 0.62)', margin: 0, fontSize: 13.5, lineHeight: 1.55 }}>
                    Underwriting model · Investor pipeline CRM · CapEx tracker · Distribution
                    waterfall · LP report · LOI · PSA &amp; DD checklists · PM RFP. Input-only Excel
                    templates with R/Y/G indicators plus view+print reference PDFs.
                  </p>
                  <div style={{ marginTop: 6 }}>
                    <Link
                      href="/templates"
                      className="btn-secondary"
                      style={{ borderColor: 'var(--gold)', color: 'var(--gold-bright)' }}
                    >
                      Open toolkit
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* ─── CURRICULUM ─────────────────────────────────────── */}
          <section>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow" style={{ color: 'var(--gold)' }}>Your curriculum</span>
              <h2 style={{ fontSize: 28, color: 'var(--cream)' }}>
                {course.title}{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold-bright)', fontWeight: 400, fontSize: 22 }}>
                  · {TOTAL_TOPICS} topics across 8 modules
                </em>
              </h2>
              <p style={{ color: 'rgba(250, 247, 242, 0.62)', maxWidth: 640 }}>
                Work them in sequence — the preferred course progression — or jump ahead.
                Each module is built around a real decision the operator has to make on a real deal.
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
                const status: 'complete' | 'in-progress' | 'available' | 'locked' = !hasAccess
                  ? 'locked'
                  : done
                  ? 'complete'
                  : m.id === resume.id
                  ? 'in-progress'
                  : 'available';
                const href = hasAccess ? `/course/${m.id}` : '/pricing';
                return (
                  <Link
                    key={m.id}
                    href={href}
                    className="module"
                    style={{
                      ...moduleCardStyle(status),
                      textDecoration: 'none',
                    }}
                  >
                    <span className="num" style={{ color: 'var(--gold)' }}>
                      Module {i + 1} · {m.duration}
                    </span>
                    <h4 style={{ color: 'var(--cream)' }}>
                      {m.title.replace(/^Module \d+\s·\s/, '')}
                    </h4>
                    <p style={{ color: 'rgba(250, 247, 242, 0.62)' }}>{m.description}</p>
                    <span
                      className="status"
                      style={{ color: moduleStatusColor(status) }}
                    >
                      {status === 'complete'
                        ? 'Complete'
                        : status === 'in-progress'
                        ? 'In progress'
                        : status === 'locked'
                        ? 'Locked'
                        : 'Available'}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ─── WEEKLY READS · curated Tuesdays (access-only) ──── */}
          {hasAccess && (
            <Card
              variant="offer"
              style={{
                background: '#1f315a',
                border: '1px solid rgba(184, 148, 90, 0.18)',
                color: 'var(--cream)',
              }}
            >
              <div className="flex flex-col gap-3">
                <span className="eyebrow" style={{ color: 'var(--gold)' }}>
                  This week&rsquo;s reads · curated Tuesdays
                </span>
                <h3 className="font-display" style={{ fontSize: 20, color: 'var(--cream)', margin: 0, fontWeight: 500 }}>
                  What we&rsquo;re reading this week.
                </h3>
                <p style={{ color: 'rgba(250, 247, 242, 0.62)', fontSize: 13.5, margin: '4px 0 8px', maxWidth: 560 }}>
                  Three to five multifamily articles every Tuesday — institutional research, debt
                  market reads, and operator signal — curated for Self-Study members.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginTop: 6 }}>
                  <ReadCard
                    src="CBRE · Apr 29"
                    title="Multifamily Cap Rates Compress in Sun Belt Submarkets"
                    why="A 10-min read before your next underwrite — the Sun Belt cap rate trajectory matters for exit pricing."
                    url="https://www.cbre.com/insights"
                  />
                  <ReadCard
                    src="Multifamily Executive · Apr 27"
                    title="Bridge Lender Spreads Tighten 35bp Across Q1"
                    why="If you're financing in the next 90 days, this changes your debt math."
                    url="https://www.multifamilyexecutive.com/"
                  />
                  <ReadCard
                    src="Bisnow Multifamily · Apr 26"
                    title="Texas Property Tax Reform — What Operators Should Watch in 2026"
                    why="Texas exposure means this is your tax line on every model."
                    url="https://www.bisnow.com/multifamily"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* ─── AVAILABLE IN MASTERY LIVE · upsell preview ───── */}
          <Card
            variant="offer"
            style={{
              background: 'linear-gradient(135deg, var(--navy-soft) 0%, #1f315a 100%)',
              border: '1px solid var(--gold)',
              color: 'var(--cream)',
            }}
          >
            <div className="flex flex-col gap-4">
              <span className="eyebrow" style={{ color: 'var(--gold-bright)' }}>
                Available in Mastery Live
              </span>
              <h3 className="font-display" style={{ fontSize: 22, color: 'var(--cream)', margin: 0, fontWeight: 500 }}>
                Four more modules — and the people alongside.
              </h3>
              <p style={{ color: 'rgba(250, 247, 242, 0.78)', maxWidth: 600, margin: 0, fontSize: 14.5 }}>
                Mastery Live extends the curriculum into four areas that need a coach alongside —
                and adds 60+ hours of monthly coaching with Diva and Lou, an AI tutor, and deal
                memos from the Rescia desk.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0 0' }}>
                {liveOnlyModules.map((m, i) => (
                  <li
                    key={m.num}
                    style={{
                      padding: '12px 0',
                      borderTop: i === 0 ? '1px solid rgba(184, 148, 90, 0.25)' : '1px solid rgba(250, 247, 242, 0.08)',
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
                      <div style={{ fontFamily: 'var(--display)', fontSize: 16, color: 'var(--gold-bright)', fontWeight: 500 }}>
                        Module {m.num} · {m.title}
                      </div>
                      <div style={{ fontSize: 13, color: 'rgba(250, 247, 242, 0.62)' }}>{m.reason}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 8 }}>
                <Link
                  href="/inquire-about-live"
                  onClick={openCalendly}
                  className="btn-primary"
                  style={{ background: 'var(--gold)', borderColor: 'var(--gold)', color: 'var(--navy)' }}
                >
                  Inquire about Mastery Live →
                </Link>
              </div>
            </div>
          </Card>

          {/* ─── ADMIN SHORTCUT ─────────────────────────────────── */}
          {user.isAdmin && (
            <Card
              variant="offer"
              style={{
                background: '#1f315a',
                border: '1px solid var(--gold)',
                color: 'var(--cream)',
              }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-2">
                  <span className="eyebrow" style={{ color: 'var(--gold-bright)' }}>Admin tools</span>
                  <h3 className="font-display" style={{ fontSize: 19, color: 'var(--cream)', margin: 0, fontWeight: 500 }}>
                    Member management
                  </h3>
                  <p style={{ color: 'rgba(250, 247, 242, 0.62)', maxWidth: 520, margin: 0 }}>
                    Grant or revoke Self-Study access for partners, vendors, and beta members
                    — independent of Stripe billing.
                  </p>
                </div>
                <Link
                  href="/admin/members"
                  className="btn-secondary"
                  style={{ borderColor: 'var(--gold)', color: 'var(--gold-bright)' }}
                >
                  Open admin
                </Link>
              </div>
            </Card>
          )}

        </div>
      </main>

      {/* Footer · navy variant for visual continuity */}
      <footer style={{ background: 'var(--navy-deep)', color: 'rgba(250, 247, 242, 0.6)', padding: '32px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 4,
              color: 'var(--gold)',
            }}
          >
            Rescia Properties · Mastery Self-Study
          </div>
          <div style={{ fontSize: 11, color: 'rgba(250, 247, 242, 0.45)' }}>
            &copy; 2026 Rescia Properties · Not a securities offering · Past performance not indicative of future results
          </div>
        </div>
      </footer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Style helpers
// ─────────────────────────────────────────────────────────────────────

function moduleCardStyle(
  status: 'complete' | 'in-progress' | 'available' | 'locked'
): React.CSSProperties {
  return {
    background: '#1f315a',
    border: '1px solid rgba(184, 148, 90, 0.18)',
    borderLeft: `3px solid ${
      status === 'in-progress'
        ? 'var(--gold-bright)'
        : status === 'locked'
        ? 'rgba(184, 148, 90, 0.35)'
        : 'var(--gold)'
    }`,
    borderRadius: 4,
    opacity: status === 'locked' ? 0.7 : 1,
  };
}

function moduleStatusColor(
  status: 'complete' | 'in-progress' | 'available' | 'locked'
): string {
  if (status === 'in-progress') return 'var(--gold-bright)';
  if (status === 'complete') return 'rgba(250, 247, 242, 0.62)';
  if (status === 'locked') return 'rgba(250, 247, 242, 0.42)';
  return 'rgba(250, 247, 242, 0.42)';
}

function ProgressStat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--display)',
          fontSize: 28,
          color: 'var(--gold-bright)',
          fontWeight: 500,
          lineHeight: 1.1,
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(250, 247, 242, 0.62)',
          marginTop: 4,
        }}
      >
        {l}
      </div>
    </div>
  );
}

function ReadCard({
  src,
  title,
  why,
  url,
}: {
  src: string;
  title: string;
  why: string;
  /** Optional external article URL. When provided, the card becomes a
      clickable anchor that opens the source article in a new tab. */
  url?: string;
}) {
  const cardStyles: React.CSSProperties = {
    background: 'var(--navy)',
    border: '1px solid rgba(184, 148, 90, 0.18)',
    borderRadius: 4,
    padding: '14px 16px',
    display: 'block',
    textDecoration: 'none',
    transition: 'border-color 160ms ease, background 160ms ease',
  };
  const inner = (
    <>
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: 4,
        }}
      >
        {src}
      </div>
      <div
        style={{
          fontFamily: 'var(--display)',
          fontSize: 14.5,
          color: 'var(--cream)',
          lineHeight: 1.3,
          marginBottom: 6,
        }}
      >
        {title}
        {url && (
          <span
            aria-hidden
            style={{
              marginLeft: 6,
              color: 'var(--gold-bright)',
              fontFamily: 'var(--mono)',
              fontSize: 11,
            }}
          >
            ↗
          </span>
        )}
      </div>
      <div style={{ color: 'rgba(250, 247, 242, 0.62)', fontSize: 12, lineHeight: 1.45 }}>
        {why}
      </div>
    </>
  );
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={cardStyles}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(184, 148, 90, 0.45)';
          e.currentTarget.style.background = '#102240';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(184, 148, 90, 0.18)';
          e.currentTarget.style.background = 'var(--navy)';
        }}
      >
        {inner}
      </a>
    );
  }
  return <div style={cardStyles}>{inner}</div>;
}
