/**
 * Mastery Self-Study · Landing page
 * ─────────────────────────────────────────────────────────────────────
 * Wave SS-1.2 — replaces the cloned Live marketing copy with Self-Study-
 * specific positioning. Cream-dominant skin, navy text, gold reserved as
 * a cameo for the upgrade-to-Live cross-sell. Parallels the Foundations
 * landing pattern with the three-rung product ladder.
 *
 * Sections (top to bottom):
 *   1. Marketing nav (logo + Sign In / Dashboard depending on auth state)
 *   2. Hero — "The operator's execution toolkit"
 *   3. Three-rung product ladder (Foundations · Self-Study · Mastery Live)
 *   4. Curriculum — 8 modules
 *   5. What's included
 *   6. What's NOT included (the differentiator vs Live)
 *   7. Mentor — Diva and Lou
 *   8. FAQ
 *   9. Pricing CTA
 *  10. Footer
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { COURSES, liveOnlyModules } from '@/data/courses';

const selfStudy = COURSES[0];

const FAQ_ITEMS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'What is included with my purchase?',
    a: (
      <>
        Eight modules of Mastery curriculum (Submarket through Property Management),
        4–5 question quizzes per module, view+print reference PDFs, the full Rescia
        Excel templates with R/Y/G indicators (underwriting model, investor pipeline,
        CapEx tracker, distribution waterfall, LP report, LOI, PSA + DD checklists,
        PM RFP), and 12 months of access. After the year, continue at $99/month
        if you want.
      </>
    ),
  },
  {
    q: 'How is this different from Mastery Live?',
    a: (
      <>
        Self-Study is the curriculum without the people. Mastery Live adds Diva and
        Lou alongside, monthly coaching, an AI tutor trained on the Mastery curriculum,
        deal memos from the Rescia desk, and four additional modules (Capital Raising,
        PPM &amp; Legal, Asset Management, Exit) that benefit from coaching judgment.
        Self-Study is the operator&rsquo;s execution toolkit at $1,997.
        Live is the bespoke 12-month engagement, by inquiry.
      </>
    ),
  },
  {
    q: 'Can I upgrade to Mastery Live later?',
    a: (
      <>
        Yes — and your $1,997 credits toward Live tuition if you upgrade within your
        12-month access window. After Module 1, the dashboard surfaces an upgrade
        card so you can decide once you&rsquo;ve felt the program.
      </>
    ),
  },
  {
    q: 'What is your refund policy?',
    a: (
      <>
        Three days after marking Module 1 complete. If the first module doesn&rsquo;t
        land for you, email <a href="mailto:rescia@resciaproperties.com">rescia@resciaproperties.com</a> within
        72 hours and we&rsquo;ll refund the full $1,997.
      </>
    ),
  },
  {
    q: 'How long do I have access?',
    a: (
      <>
        12 months from purchase. After that, you can either continue at $99/month
        (auto-renews monthly until you cancel) or let access expire. There&rsquo;s no
        commitment beyond the first year.
      </>
    ),
  },
  {
    q: 'Will I get to talk to Diva or Lou?',
    a: (
      <>
        Not as part of Self-Study. Coaching with Diva and Lou is reserved for
        Mastery Live members. If you want a coach alongside you on a real deal,
        Self-Study is the wrong product — inquire about Mastery Live.
      </>
    ),
  },
  {
    q: 'Is there an AI tutor?',
    a: (
      <>
        Not on Self-Study. The AI tutor (trained on the Mastery curriculum and
        Rescia&rsquo;s deal-by-deal commentary) is a Mastery Live exclusive.
      </>
    ),
  },
];

export default function SelfStudyLanding() {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Mastery Self-Study · Rescia Properties</title>
        <meta
          name="description"
          content="The operator's execution toolkit. Eight modules covering submarket through property management. $1,997 for one year of access. The self-paced track — for buyers who want the curriculum without the coaching."
        />
      </Head>

      {/* ─── MARKETING NAV ──────────────────────────────────── */}
      <nav style={navStyle}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px', maxWidth: 1200, margin: '0 auto' }}>
          <a href="#top" style={brandStyle}>
            <img src="/rescia-mark.png" alt="" style={{ height: 40, width: 'auto', display: 'block' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--display)', fontSize: 18, color: 'var(--navy)', letterSpacing: '0.01em' }}>
                Rescia Properties
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold-deep)', marginTop: 2 }}>
                Mastery Self-Study
              </span>
            </div>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <a href="#curriculum" style={navLink}>Curriculum</a>
            <a href="#mentor" style={navLink}>Mentor</a>
            <a href="#faq" style={navLink}>FAQ</a>
            {user ? (
              <Link href="/dashboard" style={navCtaStyle}>Dashboard</Link>
            ) : (
              <Link href="/login" style={navCtaStyle}>Sign In</Link>
            )}
          </div>
        </div>
      </nav>

      <main id="top" style={{ background: 'var(--cream)', color: 'var(--ink)' }}>

        {/* ─── HERO ───────────────────────────────────────── */}
        <section style={heroSection}>
          <div className="container" style={{ maxWidth: 920, margin: '0 auto', padding: '120px 32px 80px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-deep)', marginBottom: 16 }}>
              The self-paced track
            </div>
            <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 500, color: 'var(--navy)', lineHeight: 1.1, margin: '0 0 24px', letterSpacing: '-0.01em' }}>
              The operator&rsquo;s <em style={{ fontStyle: 'italic', color: 'var(--gold-deep)' }}>execution toolkit.</em>
            </h1>
            <p style={{ fontSize: 'clamp(17px, 2vw, 19px)', color: 'var(--ink-dim)', lineHeight: 1.5, margin: '0 auto 40px', maxWidth: 640 }}>
              Eight modules of Mastery curriculum. Submarket through property management.
              The same frameworks Diva and Lou teach in Mastery Live — without the coaching,
              without the AI tutor, at $1,997 for a year of access.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={user ? '/dashboard' : '/pricing'} style={ctaPrimary}>
                Buy Self-Study · $1,997
              </Link>
              <Link href="#curriculum" style={ctaSecondary}>See the curriculum →</Link>
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-mute)', marginTop: 28, fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>
              12 months of access · 3-day refund window after Module 1 · $1,997 credits toward Mastery Live
            </p>
          </div>
        </section>

        {/* ─── THREE-RUNG PRODUCT LADDER ─────────────────── */}
        <section style={{ background: 'var(--cream-warm)', padding: '80px 24px' }}>
          <div className="container" style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={eyebrowStyle}>The three rungs</div>
              <h2 style={sectionH2}>Where Self-Study sits in the program ladder.</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              <LadderCard
                tier="Foundations"
                price="$99"
                lede="Decide if multifamily is the path for you."
                bullets={[
                  '6 decision-craft modules',
                  'For aspiring or first-deal investors',
                  '1 year of access',
                  '$99 credit toward Self-Study',
                ]}
                cta={null}
              />
              <LadderCard
                tier="Mastery Self-Study"
                price="$1,997 / year"
                lede="The operator&rsquo;s execution toolkit. Self-paced, no coaching."
                bullets={[
                  '8 modules · submarket through property management',
                  '4–5 question quizzes · view+print PDFs · Excel templates',
                  '12 months access · $99/mo continuation',
                  '$1,997 credits toward Mastery Live',
                ]}
                cta={{ label: user ? 'Open dashboard →' : 'Buy now →', href: user ? '/dashboard' : '/pricing' }}
                isCurrent
              />
              <LadderCard
                tier="Mastery Live"
                price="by inquiry"
                lede="Diva and Lou alongside — through your actual deals."
                bullets={[
                  '12 modules · the full curriculum',
                  'Monthly coaching · AI tutor · deal memos',
                  '12-month engagement · physical artifacts',
                  'A few things we&rsquo;d rather walk you through directly',
                ]}
                cta={{ label: 'Inquire about Live →', href: '/inquire-about-live' }}
              />
            </div>
          </div>
        </section>

        {/* ─── CURRICULUM ─────────────────────────────────── */}
        <section id="curriculum" style={{ padding: '80px 24px' }}>
          <div className="container" style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={eyebrowStyle}>Curriculum</div>
              <h2 style={sectionH2}>Eight modules. Self-paced.</h2>
              <p style={sectionLede}>
                Work them in sequence — the preferred course progression — or jump ahead.
                Each module is built around a decision the operator has to make on a real deal.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {selfStudy.modules.map((m, i) => (
                <div key={m.id} style={moduleCard}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-deep)', marginBottom: 8 }}>
                    Module {i + 1} · {m.duration}
                  </div>
                  <h4 style={{ fontFamily: 'var(--display)', fontSize: 18, color: 'var(--navy)', margin: '0 0 8px', fontWeight: 500, lineHeight: 1.3 }}>
                    {m.title.replace(/^Module \d+\s·\s/, '')}
                  </h4>
                  <p style={{ color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.5, margin: 0 }}>
                    {m.description}
                  </p>
                </div>
              ))}
            </div>

            {/* "Available in Mastery Live" */}
            <div style={{ marginTop: 40, padding: 28, border: '1px solid var(--line)', borderLeft: '3px solid var(--gold)', borderRadius: 4, background: '#fff' }}>
              <div style={eyebrowStyle}>Available in Mastery Live</div>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--navy)', margin: '4px 0 8px', fontWeight: 500 }}>
                Four more modules — and the people alongside.
              </h3>
              <p style={{ color: 'var(--ink-dim)', fontSize: 14, marginBottom: 16, maxWidth: 560 }}>
                Mastery Live extends the curriculum into four areas that need a coach
                alongside you — and adds monthly coaching, AI tutor, and deal memos
                from the Rescia desk.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {liveOnlyModules.map((m) => (
                  <li key={m.num} style={{ padding: '10px 0', borderTop: '1px solid var(--line)', display: 'flex', gap: 12, alignItems: 'baseline' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: 7 }} aria-hidden />
                    <div>
                      <div style={{ fontFamily: 'var(--display)', fontSize: 16, color: 'var(--navy)' }}>
                        Module {m.num} · {m.title}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--ink-dim)' }}>{m.reason}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── WHAT'S INCLUDED ────────────────────────────── */}
        <section style={{ background: 'var(--cream-warm)', padding: '80px 24px' }}>
          <div className="container" style={{ maxWidth: 920, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={eyebrowStyle}>What you get</div>
              <h2 style={sectionH2}>$1,997 buys you the operator&rsquo;s toolkit.</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              <IncludedItem title="8 modules" body="Submarket Intelligence, Deal Sourcing, Underwriting, Stress Testing & CapEx, Debt Sourcing, LOI, PSA & DD, Property Management." />
              <IncludedItem title="4–5 question quizzes" body="Multiple choice with explanations. Pass to unlock the next module." />
              <IncludedItem title="Reference PDFs" body="View+print one-pagers per module. Foundational concepts at your fingertips." />
              <IncludedItem title="Excel templates" body="Underwriting model, investor pipeline CRM, CapEx tracker, distribution waterfall, LP report, LOI, PSA + DD checklists, PM RFP. Input-only with R/Y/G indicators." />
              <IncludedItem title="12 months of access" body="Self-paced, no deadlines. Continue at $99/month after the year if you want." />
              <IncludedItem title="$1,997 upgrade credit" body="If you decide to step up to Mastery Live within your access window, your $1,997 credits toward Live tuition." />
            </div>
          </div>
        </section>

        {/* ─── WHAT'S NOT INCLUDED ─────────────────────────── */}
        <section style={{ padding: '80px 24px' }}>
          <div className="container" style={{ maxWidth: 920, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ ...eyebrowStyle, color: 'var(--ink-dim)' }}>Honest about what this isn&rsquo;t</div>
              <h2 style={sectionH2}>What Self-Study does <em style={{ fontStyle: 'italic', color: 'var(--gold-deep)' }}>not</em> include.</h2>
              <p style={sectionLede}>
                Self-Study is the solo track, by design. If any of the below are non-negotiable
                for you, Self-Study is the wrong product — inquire about Mastery Live.
              </p>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 auto', maxWidth: 640 }}>
              <NotIncluded item="Live coaching" detail="No 1:1 calls or cohort sessions with Diva or Lou. Coaching is reserved for Mastery Live." />
              <NotIncluded item="AI tutor" detail="No in-module AI assistant trained on the Mastery curriculum. AI tutor is a Live exclusive." />
              <NotIncluded item="Deal memos from the Rescia desk" detail="No monthly deal-by-deal commentary on what we passed on, what we underwrote, what we&rsquo;re watching." />
              <NotIncluded item="Your-deal workspace" detail="No tracker for an active acquisition you&rsquo;re working — that&rsquo;s where Live coaching lives." />
              <NotIncluded item="Capital Raising · PPM &amp; Legal · Asset Management · Exit modules" detail="These four modules involve securities law, ongoing operations, or cycle-timing judgment that benefit materially from coaching alongside." />
              <NotIncluded item="Physical artifacts" detail="No hardcover welcome book or leather-bound binder. Those are part of the Mastery Live onboarding experience." />
            </ul>
          </div>
        </section>

        {/* ─── MENTOR ────────────────────────────────────── */}
        <section id="mentor" style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '80px 24px' }}>
          <div className="container" style={{ maxWidth: 920, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ ...eyebrowStyle, color: 'var(--gold-bright)' }}>The curriculum is taught by</div>
              <h2 style={{ ...sectionH2, color: 'var(--cream)' }}>Diva Rescia and Lou Lopez.</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
              <div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--gold-bright)', marginBottom: 6, fontWeight: 500 }}>Diva Rescia</div>
                <p style={{ color: 'rgba(250, 247, 242, 0.78)', lineHeight: 1.6, fontSize: 15 }}>
                  Founder of Rescia Properties. Multifamily operator with deep expertise in
                  submarket selection, underwriting, and the on-the-ground operational discipline
                  that separates institutional-grade portfolios from amateur ones. Diva is the
                  pedagogical lead on the Mastery curriculum — every framework is hers, refined
                  across years of real deals.
                </p>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--gold-bright)', marginBottom: 6, fontWeight: 500 }}>Lou Lopez</div>
                <p style={{ color: 'rgba(250, 247, 242, 0.78)', lineHeight: 1.6, fontSize: 15 }}>
                  Co-mentor and principal at Rescia Properties. Lou brings the operator&rsquo;s lens
                  on capital markets, debt structuring, and the strategic decisions that shape a
                  portfolio cycle-by-cycle. In Mastery Live, Lou and Diva work alongside members
                  through their actual deals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ────────────────────────────────────────── */}
        <section id="faq" style={{ padding: '80px 24px' }}>
          <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={eyebrowStyle}>Frequently asked</div>
              <h2 style={sectionH2}>Questions, answered.</h2>
            </div>
            <div>
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} style={{ borderTop: '1px solid var(--line)' }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '20px 0',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'var(--display)',
                        fontSize: 18,
                        color: 'var(--navy)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 16,
                        fontWeight: 500,
                      }}
                    >
                      <span>{item.q}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 18, color: 'var(--gold-deep)', flexShrink: 0 }}>{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div style={{ paddingBottom: 24, color: 'var(--ink-dim)', lineHeight: 1.6, fontSize: 15 }}>
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── PRICING CTA ─────────────────────────────────── */}
        <section style={{ background: 'var(--cream-warm)', padding: '80px 24px', borderTop: '1px solid var(--line)' }}>
          <div className="container" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <div style={eyebrowStyle}>Ready when you are</div>
            <h2 style={{ ...sectionH2, marginBottom: 16 }}>Mastery Self-Study · $1,997</h2>
            <p style={{ ...sectionLede, marginBottom: 32 }}>
              Eight modules. Twelve months of access. The operator&rsquo;s execution toolkit.
              Three-day refund window after Module 1 if it doesn&rsquo;t land for you.
            </p>
            <Link href={user ? '/dashboard' : '/pricing'} style={ctaPrimary}>
              {user ? 'Open dashboard →' : 'Buy Self-Study · $1,997'}
            </Link>
            <p style={{ marginTop: 20, fontSize: 13, color: 'var(--ink-mute)' }}>
              Or <Link href="/inquire-about-live" style={{ color: 'var(--gold-deep)', textDecoration: 'underline' }}>inquire about Mastery Live</Link> if you want a coach alongside you.
            </p>
          </div>
        </section>

        {/* ─── FOOTER ──────────────────────────────────────── */}
        <footer style={{ padding: '40px 24px', borderTop: '1px solid var(--line)', background: 'var(--cream)' }}>
          <div className="container" style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-dim)', marginBottom: 6 }}>
              Rescia Properties · Mastery Self-Study
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>
              &copy; 2026 Rescia Properties · Not a securities offering · Past performance not indicative of future results
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Style helpers (kept in-file so the landing is one import)
// ─────────────────────────────────────────────────────────────────────

const navStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 50,
  background: 'rgba(250, 247, 242, 0.95)',
  backdropFilter: 'saturate(140%) blur(14px)',
  borderBottom: '1px solid var(--line)',
};

const brandStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  textDecoration: 'none',
  color: 'inherit',
};

const navLink: React.CSSProperties = {
  fontSize: 14,
  color: 'var(--navy)',
  textDecoration: 'none',
  fontWeight: 500,
};

const navCtaStyle: React.CSSProperties = {
  background: 'var(--navy)',
  color: 'var(--cream)',
  padding: '10px 18px',
  borderRadius: 2,
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 500,
};

const heroSection: React.CSSProperties = {
  background: 'var(--cream)',
  borderBottom: '1px solid var(--line)',
};

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--gold-deep)',
  marginBottom: 12,
};

const sectionH2: React.CSSProperties = {
  fontFamily: 'var(--display)',
  fontSize: 'clamp(28px, 4vw, 40px)',
  fontWeight: 500,
  color: 'var(--navy)',
  margin: '0 0 16px',
  lineHeight: 1.15,
  letterSpacing: '-0.01em',
};

const sectionLede: React.CSSProperties = {
  fontSize: 16,
  color: 'var(--ink-dim)',
  lineHeight: 1.6,
  maxWidth: 600,
  margin: '0 auto',
};

const ctaPrimary: React.CSSProperties = {
  display: 'inline-block',
  background: 'var(--navy)',
  color: 'var(--cream)',
  padding: '14px 28px',
  borderRadius: 2,
  textDecoration: 'none',
  fontFamily: 'var(--mono)',
  fontSize: 13,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 600,
};

const ctaSecondary: React.CSSProperties = {
  display: 'inline-block',
  color: 'var(--navy)',
  padding: '14px 28px',
  textDecoration: 'none',
  fontFamily: 'var(--mono)',
  fontSize: 13,
  letterSpacing: '0.08em',
  fontWeight: 500,
  border: '1px solid var(--navy)',
  borderRadius: 2,
};

const moduleCard: React.CSSProperties = {
  padding: 24,
  background: '#fff',
  border: '1px solid var(--line)',
  borderRadius: 4,
};

// ─── Sub-components ─────────────────────────────────────────────

function LadderCard({
  tier,
  price,
  lede,
  bullets,
  cta,
  isCurrent,
}: {
  tier: string;
  price: string;
  lede: string;
  bullets: string[];
  cta: { label: string; href: string } | null;
  isCurrent?: boolean;
}) {
  return (
    <div
      style={{
        padding: 28,
        background: isCurrent ? 'var(--navy)' : '#fff',
        color: isCurrent ? 'var(--cream)' : 'var(--ink)',
        border: isCurrent ? '1px solid var(--gold)' : '1px solid var(--line)',
        borderRadius: 4,
        position: 'relative',
        boxShadow: isCurrent ? 'var(--shadow-card)' : 'var(--shadow-soft)',
      }}
    >
      {isCurrent && (
        <div style={{ position: 'absolute', top: -12, left: 24, fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '4px 10px', background: 'var(--gold)', color: 'var(--navy)', borderRadius: 2, fontWeight: 600 }}>
          You are here
        </div>
      )}
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: isCurrent ? 'var(--gold-bright)' : 'var(--gold-deep)', marginBottom: 8 }}>
        {tier}
      </div>
      <div style={{ fontFamily: 'var(--display)', fontSize: 24, color: isCurrent ? 'var(--cream)' : 'var(--navy)', margin: '0 0 12px', fontWeight: 500 }}>
        {price}
      </div>
      <p
        style={{
          fontSize: 14,
          color: isCurrent ? 'rgba(250, 247, 242, 0.78)' : 'var(--ink-dim)',
          lineHeight: 1.5,
          marginBottom: 16,
          minHeight: 42,
        }}
        dangerouslySetInnerHTML={{ __html: lede }}
      />
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
        {bullets.map((b, i) => (
          <li
            key={i}
            style={{
              fontSize: 13,
              color: isCurrent ? 'rgba(250, 247, 242, 0.85)' : 'var(--ink)',
              padding: '6px 0',
              borderTop: i === 0 ? 'none' : `1px solid ${isCurrent ? 'rgba(184, 148, 90, 0.18)' : 'var(--line)'}`,
            }}
            dangerouslySetInnerHTML={{ __html: b }}
          />
        ))}
      </ul>
      {cta && (
        <Link
          href={cta.href}
          style={{
            display: 'inline-block',
            background: isCurrent ? 'var(--gold)' : 'var(--navy)',
            color: isCurrent ? 'var(--navy)' : 'var(--cream)',
            padding: '10px 18px',
            borderRadius: 2,
            textDecoration: 'none',
            fontFamily: 'var(--mono)',
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}

function IncludedItem({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ padding: 20, background: '#fff', border: '1px solid var(--line)', borderRadius: 4 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: 7 }} aria-hidden />
        <h4 style={{ fontFamily: 'var(--display)', fontSize: 17, color: 'var(--navy)', margin: 0, fontWeight: 500 }}>{title}</h4>
      </div>
      <p style={{ color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.5, margin: '0 0 0 16px' }}>{body}</p>
    </div>
  );
}

function NotIncluded({ item, detail }: { item: string; detail: string }) {
  return (
    <li style={{ padding: '18px 0', borderTop: '1px solid var(--line)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 16, color: 'var(--ink-mute)', flexShrink: 0, marginTop: 2 }} aria-hidden>×</span>
      <div>
        <div style={{ fontFamily: 'var(--display)', fontSize: 17, color: 'var(--navy)', marginBottom: 4, fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: item }} />
        <div style={{ color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.5 }}>{detail}</div>
      </div>
    </li>
  );
}
