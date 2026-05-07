/**
 * Mastery Self-Study · Landing page
 * ─────────────────────────────────────────────────────────────────────
 * Wave SS-1.3 — restructured per Lou's feedback:
 *   1. More sizzle in the design (navy hero, gold accents, stats strip)
 *   2. Page flow: value proposition first, three-rung ladder moved down,
 *      pricing removed from ladder cards (we show pricing elsewhere)
 *   3. "What Mastery Live adds" replaces the bland "What's NOT included" —
 *      emphasizes ongoing monthly coaching, 126 real-world topics, etc.
 *   4. Full Diva + Lou bios with Co-Founder · Managing Partner billing,
 *      lifted verbatim from the Mastery Live landing for brand consistency.
 *      Co-equal billing — Diva first, both treated as parallel principals.
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { COURSES, liveOnlyModules } from '@/data/courses';
import { openCalendly } from '@/lib/calendly';

const selfStudy = COURSES[0];

/**
 * Topic counts per module. Locked at the spec level — Wave SS-2 will write
 * the actual topics[] arrays to match these counts. Total: 60 topics across
 * 8 modules (~70% of Live's 126 topics, consistent with the lighter depth
 * ratio in the production spec).
 */
const TOPIC_COUNTS: Record<string, number> = {
  submarket: 8,
  sourcing: 7,
  underwriting: 10,
  stress: 7,
  debt: 8,
  loi: 6,
  psa: 8,
  pm: 6,
};
const TOTAL_TOPICS = Object.values(TOPIC_COUNTS).reduce((a, b) => a + b, 0); // 60

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
        Lou alongside, <strong>ongoing monthly coaching</strong> with Diva and Lou,
        an AI tutor trained on the Mastery curriculum, deal memos from the Rescia desk,
        and four additional modules (Capital Raising, PPM &amp; Legal, Asset Management,
        Exit) that benefit from coaching judgment. <strong>126 real-world topics</strong> in
        the full curriculum vs Self-Study&rsquo;s focused operator essentials.
      </>
    ),
  },
  {
    q: 'Can I upgrade to Mastery Live later?',
    a: (
      <>
        Yes — and your Self-Study tuition credits toward Live if you upgrade within your
        12-month access window. After Module 1, the dashboard surfaces an upgrade
        option so you can decide once you&rsquo;ve felt the program.
      </>
    ),
  },
  {
    q: 'What is your refund policy?',
    a: (
      <>
        Three days after marking Module 1 complete. If the first module doesn&rsquo;t
        land for you, email <a href="mailto:rescia@resciaproperties.com" style={{ color: 'var(--gold-deep)' }}>rescia@resciaproperties.com</a> within
        72 hours and we&rsquo;ll refund in full.
      </>
    ),
  },
  {
    q: 'How long do I have access?',
    a: (
      <>
        12 months from purchase. After that, you can continue at $99/month
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
          content="The operator's execution toolkit. Eight modules covering submarket through property management. The self-paced track from Diva and Lou Lopez — Co-Founders of Rescia Properties — with $700M+ in closed transactions and 3,387+ units managed."
        />
      </Head>

      {/* ─── MARKETING NAV ──────────────────────────────────── */}
      <nav style={navStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px', maxWidth: 1200, margin: '0 auto' }}>
          <a href="#top" style={brandStyle}>
            <img src="/rescia-mark.png" alt="" style={{ height: 40, width: 'auto', display: 'block' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--display)', fontSize: 18, color: 'var(--navy)', letterSpacing: '0.01em', fontWeight: 500 }}>
                Rescia Properties
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold-deep)', marginTop: 2 }}>
                Mastery Self-Study
              </span>
            </div>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <a href="#curriculum" style={navLink}>Curriculum</a>
            <a href="#mentor" style={navLink}>Mentors</a>
            <a href="#faq" style={navLink}>FAQ</a>
            {user ? (
              <Link href="/dashboard" style={navCtaStyle}>Dashboard</Link>
            ) : (
              <Link href="/login" style={navCtaStyle}>Sign In</Link>
            )}
          </div>
        </div>
      </nav>

      <main id="top">

        {/* ─── HERO · navy with gold accents ─────────────────── */}
        <section style={heroSection}>
          <div style={heroOverlay}>
            <div style={{ maxWidth: 980, margin: '0 auto', padding: '120px 32px 100px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(13px, 1.4vw, 16px)', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold-bright)', marginBottom: 28, fontWeight: 600 }}>
                ◆&nbsp;&nbsp;Mastery Self-Study&nbsp;&nbsp;·&nbsp;&nbsp;The self-paced track&nbsp;&nbsp;◆
              </div>
              <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(40px, 7vw, 76px)', fontWeight: 500, color: 'var(--cream)', lineHeight: 1.05, margin: '0 0 28px', letterSpacing: '-0.015em' }}>
                The operator&rsquo;s <em style={{ fontStyle: 'italic', color: 'var(--gold-bright)', fontWeight: 400 }}>execution toolkit.</em>
              </h1>
              <p style={{ fontSize: 'clamp(18px, 2vw, 21px)', color: 'rgba(250, 247, 242, 0.85)', lineHeight: 1.55, margin: '0 auto 44px', maxWidth: 720, fontWeight: 300 }}>
                Eight modules of institutional-grade multifamily curriculum. Submarket selection
                through property management. The same frameworks Diva Rescia and Lou Lopez
                teach in Mastery Live — distilled for self-paced operators who learn by doing.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href={user ? '/dashboard' : '/pricing'} style={ctaPrimaryHero}>
                  {user ? 'Open dashboard →' : 'Begin Self-Study →'}
                </Link>
                <a href="#curriculum" style={ctaSecondaryHero}>See the curriculum</a>
              </div>
              <div style={{ marginTop: 36, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(212, 177, 118, 0.75)', textTransform: 'uppercase' }}>
                12 months of access &nbsp;·&nbsp; 3-day refund window &nbsp;·&nbsp; Tuition credits toward Mastery Live
              </div>
            </div>
          </div>
        </section>

        {/* ─── FIRM STATS STRIP ──────────────────────────────── */}
        <section style={{ background: 'var(--navy-deep)', padding: '36px 24px', borderBottom: '1px solid rgba(184, 148, 90, 0.2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, textAlign: 'center' }}>
            <FirmStat n="$700M+" l="Closed transactions · last 3 years" />
            <FirmStat n="3,387+" l="Units managed" />
            <FirmStat n="$989M" l="Current AUM" />
            <FirmStat n="45+" l="Years of combined experience" />
          </div>
        </section>

        {/* ─── VALUE PROPOSITION · what you'll know how to do ─ */}
        <section style={{ background: 'var(--cream)', padding: '96px 24px' }}>
          <div style={{ maxWidth: 920, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={eyebrowStyle}>What you&rsquo;ll be able to do</div>
              <h2 style={sectionH2}>Walk away with the operator&rsquo;s playbook.</h2>
              <p style={sectionLede}>
                Self-Study isn&rsquo;t theory. By Module 8, you&rsquo;ll have actually built the
                models, written the LOIs, and run the diligence checklists Diva and Lou
                use on every Rescia transaction.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              <ValueCard
                num="01"
                title="Underwrite a real multifamily deal"
                body="From rent comps to exit cap. Defend every assumption. Walk away when the numbers say so."
              />
              <ValueCard
                num="02"
                title="Read a submarket the right way"
                body="Population, employment, supply pipeline, rent trajectory — triangulated from public data alone."
              />
              <ValueCard
                num="03"
                title="Source deals brokers actually call you about"
                body="Email cadence, off-market positioning, and how to read what an offering memo isn&rsquo;t telling you."
              />
              <ValueCard
                num="04"
                title="Match debt to the deal"
                body="Agency, bank, bridge. Term sheet review. DSCR + LTV math. Refinance optionality."
              />
              <ValueCard
                num="05"
                title="Write an LOI that gets accepted"
                body="Clause-by-clause through the Rescia LOI template, with the negotiation moves that matter."
              />
              <ValueCard
                num="06"
                title="Run a diligence cycle that surfaces surprises"
                body="Inspections, leases, T-12, environmental, title — what to look for and how to retrade when something is off."
              />
            </div>
          </div>
        </section>

        {/* ─── CURRICULUM ─────────────────────────────────── */}
        <section id="curriculum" style={{ background: 'var(--cream-warm)', padding: '96px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={eyebrowStyle}>Curriculum</div>
              <h2 style={sectionH2}>
                <em style={{ fontStyle: 'italic', color: 'var(--gold-deep)' }}>{TOTAL_TOPICS} topics</em> · 8 modules · self-paced.
              </h2>
              <p style={sectionLede}>
                Work them in sequence — the preferred course progression — or jump ahead.
                Each module is built around a real decision the operator has to make on a real deal.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {selfStudy.modules.map((m, i) => (
                <div key={m.id} style={moduleCard}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-deep)', fontWeight: 600 }}>
                      Module {i + 1}
                    </span>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)' }} aria-hidden />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-mute)' }}>{m.duration}</span>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)' }} aria-hidden />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--gold-deep)', fontWeight: 600 }}>
                      {TOPIC_COUNTS[m.id] ?? '—'} topics
                    </span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--display)', fontSize: 19, color: 'var(--navy)', margin: '0 0 10px', fontWeight: 500, lineHeight: 1.25 }}>
                    {m.title.replace(/^Module \d+\s·\s/, '')}
                  </h4>
                  <p style={{ color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHAT'S INCLUDED ────────────────────────────── */}
        <section style={{ background: 'var(--cream)', padding: '96px 24px' }}>
          <div style={{ maxWidth: 920, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={eyebrowStyle}>What you get</div>
              <h2 style={sectionH2}>The toolkit, the templates, the time.</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              <IncludedItem title="8 modules" body="Submarket Intelligence, Deal Sourcing, Underwriting, Stress Testing & CapEx, Debt Sourcing, LOI, PSA & DD, Property Management." />
              <IncludedItem title="4–5 question quizzes" body="Multiple choice with explanations. Pass to unlock the next module." />
              <IncludedItem title="Reference PDFs" body="View+print one-pagers per module. Foundational concepts always at hand." />
              <IncludedItem title="Excel templates" body="Underwriting model, investor pipeline CRM, CapEx tracker, distribution waterfall, LP report, LOI, PSA + DD checklists, PM RFP. Input-only with R/Y/G indicators." />
              <IncludedItem title="12 months of access" body="Self-paced, no deadlines. Continue at $99/month after the year if you want." />
              <IncludedItem title="Upgrade credit toward Live" body="If you decide to step up to Mastery Live within your access window, your tuition credits toward Live." />
            </div>
          </div>
        </section>

        {/* ─── WHAT MASTERY LIVE ADDS · the upsell hook ───── */}
        <section style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '96px 24px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold) 0%, var(--gold-bright) 50%, var(--gold) 100%)' }} aria-hidden />
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ ...eyebrowStyle, color: 'var(--gold-bright)' }}>If you want more</div>
              <h2 style={{ ...sectionH2, color: 'var(--cream)' }}>
                What <em style={{ fontStyle: 'italic', color: 'var(--gold-bright)' }}>Mastery Live</em> adds.
              </h2>
              <p style={{ ...sectionLede, color: 'rgba(250, 247, 242, 0.78)' }}>
                Self-Study is the toolkit. Mastery Live is the toolkit plus the people — Diva
                and Lou alongside, working through your actual deals. If you&rsquo;re acquiring,
                Live is built for you.
              </p>
            </div>

            {/* Live's headline differentiators */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 56 }}>
              <LiveStat n="Monthly" l="Ongoing coaching with Diva and Lou across the engagement" />
              <LiveStat n="126" l="Real-world topics across the full 12-module curriculum" />
              <LiveStat n="12" l="Modules · including Capital Raising, PPM, Asset Management, Exit" />
              <LiveStat n="AI tutor" l="Trained on the Mastery curriculum + Rescia&rsquo;s deal-by-deal commentary" />
            </div>

            {/* Live exclusives list */}
            <div style={{ background: 'var(--navy-soft)', border: '1px solid rgba(184, 148, 90, 0.25)', borderRadius: 4, padding: 36 }}>
              <div style={{ ...eyebrowStyle, color: 'var(--gold-bright)', marginBottom: 20 }}>Mastery Live exclusives</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                <LiveExclusive title="Monthly coaching calls" body="Ongoing · Diva and Lou pressure-test your assumptions on a real deal in real time." />
                <LiveExclusive title="AI tutor in every module" body="Trained on the full Mastery curriculum and Rescia&rsquo;s deal-by-deal commentary. Ask anything from &lsquo;explain reversion cap rate&rsquo; to &lsquo;stress my exit at a 50bp cap expansion.&rsquo;" />
                <LiveExclusive title="Deal memos from the Rescia desk" body="Why we passed, what we underwrote, what we&rsquo;re watching — every month, the live read on what Diva and Lou are working on." />
                <LiveExclusive title="Your-deal workspace" body="A live tracker for your active acquisition. Coaching focuses where you focus. Diva and Lou see your numbers; the cohort sees your wins." />
                <LiveExclusive title="The 4 advanced modules" body="Capital Raising · PPM &amp; Legal · Asset Management · Exit. The cycle-judgment work that requires a coach alongside." />
                <LiveExclusive title="The full 126-topic curriculum" body="Twice the depth of Self-Study&rsquo;s 60 topics. Every framework, every worked example, every operator-level edge case." />
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link href="/inquire-about-live" onClick={openCalendly} style={ctaGold}>
                Inquire about Mastery Live →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── MENTORS · co-equal Diva + Lou ──────────────── */}
        <section id="mentor" style={{ background: 'var(--cream)', padding: '96px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={eyebrowStyle}>Meet your mentors</div>
              <h2 style={sectionH2}>You&rsquo;re not buying a course. You&rsquo;re learning from <em style={{ fontStyle: 'italic', color: 'var(--gold-deep)' }}>operators.</em></h2>
              <p style={sectionLede}>
                Rescia Properties is led by a seasoned partnership with over 45 years of combined
                experience across multifamily investing, institutional leadership, and large-scale
                portfolio growth.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 28 }}>

              {/* Diva first · co-equal billing */}
              <MentorCard
                monogram="DR"
                role="Co-Founder · Managing Partner"
                name="Diva Rescia"
                title="CBRE Multifamily Investment Specialist"
                bios={[
                  <>
                    A <strong>principal investor in real estate since age 17</strong>, Diva brings over 20 years of
                    experience and institutional-grade expertise to every investor relationship.
                    As a Multifamily Investment Specialist at CBRE — a Fortune 150 company and the
                    world&rsquo;s largest commercial real estate brokerage — she doesn&rsquo;t just advise.
                    She structures, underwrites, and executes alongside the investors she partners with.
                  </>,
                  <>
                    Mentored by <strong>Grant Cardone</strong> and specializing in value-add and institutional
                    multifamily strategies, Diva helps high-income earners and sophisticated investors access
                    opportunities typically reserved for the largest institutional players.
                  </>,
                ]}
                creds={[
                  '20+ years of real estate experience',
                  '$700M+ closed transactions in last 3 years',
                  'CBRE Multifamily Specialist · Fortune 150',
                  'Mentored by Grant Cardone',
                  'Specialist in value-add & institutional strategies',
                ]}
              />

              <MentorCard
                monogram="LL"
                role="Co-Founder · Managing Partner"
                name="Lou Lopez"
                title="25+ Years Corporate & Investment Leadership"
                bios={[
                  <>
                    Lou spent <strong>25 years in corporate leadership</strong> at Fortune 100 companies — holding
                    senior roles from global sales to Corporate EVP and multiple board positions. Within
                    that tenure, he accumulated over 15 years working with private equity firms, registered
                    investment advisers, and broker dealers on fund formation, regulatory compliance,
                    operations, and investor relations.
                  </>,
                  <>
                    With 20+ years in real estate and significant investment in advanced education through
                    <strong> Tony Robbins and Grant Cardone</strong> programs, Lou continues to be mentored by
                    billionaire real estate titans. His affinity for big data analysis and best-practices
                    approach powers Rescia&rsquo;s disciplined investment framework.
                  </>,
                ]}
                creds={[
                  '25+ years corporate & investment leadership',
                  '20+ years real estate investing experience',
                  '15+ years with PE firms, RIAs & broker dealers',
                  'Fortune 100 executive & board experience',
                  'Mentored by Grant Cardone & Tony Robbins',
                ]}
              />
            </div>
          </div>
        </section>

        {/* ─── THREE-RUNG LADDER · NO PRICING ──────────────── */}
        <section style={{ background: 'var(--cream-warm)', padding: '96px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={eyebrowStyle}>The three rungs</div>
              <h2 style={sectionH2}>Where Self-Study sits in the program ladder.</h2>
              <p style={sectionLede}>
                Three products, one curriculum spine. Pick the rung that matches where you are
                and how much of the program you want alongside you.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              <LadderCard
                tier="Foundations"
                taughtBy="Taught by Diva Rescia"
                lede="Decide if multifamily is the path for you."
                bullets={[
                  'Decision-craft modules · entry tier',
                  'For aspiring or first-deal investors',
                  '1 year of access',
                  'Credit toward Self-Study if you upgrade',
                ]}
                cta={null}
              />
              <LadderCard
                tier="Mastery Self-Study"
                taughtBy="Taught by Diva Rescia & Lou Lopez"
                lede="The operator's execution toolkit. Self-paced."
                bullets={[
                  `8 modules · ${TOTAL_TOPICS} topics · submarket through property management`,
                  '4–5 question quizzes · view+print PDFs · Excel templates',
                  '12 months of access',
                  'Tuition credits toward Mastery Live',
                ]}
                cta={{ label: user ? 'Open dashboard →' : 'Begin Self-Study →', href: user ? '/dashboard' : '/pricing' }}
                isCurrent
              />
              <LadderCard
                tier="Mastery Live"
                taughtBy="Diva Rescia & Lou Lopez · alongside"
                lede="Coaching, AI tutor, the full 12-module program."
                bullets={[
                  '12 modules · 126 real-world topics',
                  'Ongoing monthly coaching with Diva and Lou',
                  'AI tutor, deal memos, your-deal workspace',
                  'Physical artifacts · 12-month engagement',
                ]}
                cta={{ label: 'Inquire about Live →', href: '/inquire-about-live', onClick: openCalendly }}
              />
            </div>
          </div>
        </section>

        {/* ─── FAQ ────────────────────────────────────────── */}
        <section id="faq" style={{ background: 'var(--cream)', padding: '96px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
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
                        padding: '22px 0',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'var(--display)',
                        fontSize: 19,
                        color: 'var(--navy)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 16,
                        fontWeight: 500,
                      }}
                    >
                      <span>{item.q}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 22, color: 'var(--gold-deep)', flexShrink: 0, fontWeight: 300 }}>{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div style={{ paddingBottom: 24, color: 'var(--ink-dim)', lineHeight: 1.65, fontSize: 15 }}>
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── PRICING CTA · the only place pricing appears ── */}
        <section style={{ background: 'linear-gradient(135deg, var(--navy-soft) 0%, var(--navy) 100%)', color: 'var(--cream)', padding: '96px 24px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold) 0%, var(--gold-bright) 50%, var(--gold) 100%)' }} aria-hidden />
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ ...eyebrowStyle, color: 'var(--gold-bright)' }}>Ready when you are</div>
            <h2 style={{ ...sectionH2, color: 'var(--cream)' }}>
              Mastery Self-Study · <em style={{ fontStyle: 'italic', color: 'var(--gold-bright)' }}>$1,997</em>
            </h2>
            <p style={{ ...sectionLede, color: 'rgba(250, 247, 242, 0.78)', marginBottom: 36 }}>
              Eight modules. Twelve months of access. The operator&rsquo;s execution toolkit.
              Three-day refund window after Module 1 if it doesn&rsquo;t land.
            </p>
            <Link href={user ? '/dashboard' : '/pricing'} style={ctaGold}>
              {user ? 'Open dashboard →' : 'Begin Self-Study · $1,997'}
            </Link>
            <p style={{ marginTop: 20, fontSize: 13, color: 'rgba(250, 247, 242, 0.55)' }}>
              Or <Link href="/inquire-about-live" onClick={openCalendly} style={{ color: 'var(--gold-bright)', textDecoration: 'underline' }}>inquire about Mastery Live</Link> if you want a coach alongside.
            </p>
          </div>
        </section>

        {/* ─── FOOTER ──────────────────────────────────────── */}
        <footer style={{ padding: '40px 24px', borderTop: '1px solid rgba(184, 148, 90, 0.2)', background: 'var(--navy-deep)', color: 'rgba(250, 247, 242, 0.55)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
              Rescia Properties · Mastery Self-Study
            </div>
            <div style={{ fontSize: 11, color: 'rgba(250, 247, 242, 0.45)' }}>
              &copy; 2026 Rescia Properties · Not a securities offering · Past performance not indicative of future results
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Style helpers
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
  background: 'var(--navy)',
  color: 'var(--cream)',
  position: 'relative',
  overflow: 'hidden',
};

const heroOverlay: React.CSSProperties = {
  background:
    'radial-gradient(ellipse at top, rgba(184, 148, 90, 0.18) 0%, transparent 60%), linear-gradient(180deg, var(--navy-soft) 0%, var(--navy) 50%, var(--navy-deep) 100%)',
  position: 'relative',
  borderBottom: '2px solid rgba(184, 148, 90, 0.3)',
};

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--gold-deep)',
  marginBottom: 16,
};

const sectionH2: React.CSSProperties = {
  fontFamily: 'var(--display)',
  fontSize: 'clamp(32px, 4.5vw, 48px)',
  fontWeight: 500,
  color: 'var(--navy)',
  margin: '0 0 20px',
  lineHeight: 1.1,
  letterSpacing: '-0.015em',
};

const sectionLede: React.CSSProperties = {
  fontSize: 17,
  color: 'var(--ink-dim)',
  lineHeight: 1.6,
  maxWidth: 620,
  margin: '0 auto',
};

const ctaPrimaryHero: React.CSSProperties = {
  display: 'inline-block',
  background: 'var(--gold)',
  color: 'var(--navy)',
  padding: '16px 32px',
  borderRadius: 2,
  textDecoration: 'none',
  fontFamily: 'var(--mono)',
  fontSize: 13,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 600,
  boxShadow: '0 10px 30px -10px rgba(184, 148, 90, 0.6)',
};

const ctaSecondaryHero: React.CSSProperties = {
  display: 'inline-block',
  color: 'var(--gold-bright)',
  padding: '16px 32px',
  textDecoration: 'none',
  fontFamily: 'var(--mono)',
  fontSize: 13,
  letterSpacing: '0.12em',
  fontWeight: 500,
  border: '1px solid var(--gold)',
  borderRadius: 2,
};

const ctaGold: React.CSSProperties = {
  display: 'inline-block',
  background: 'var(--gold)',
  color: 'var(--navy)',
  padding: '16px 32px',
  borderRadius: 2,
  textDecoration: 'none',
  fontFamily: 'var(--mono)',
  fontSize: 13,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 600,
};

const moduleCard: React.CSSProperties = {
  padding: 26,
  background: '#fff',
  border: '1px solid var(--line)',
  borderTop: '3px solid var(--gold)',
  borderRadius: 4,
  boxShadow: 'var(--shadow-soft)',
};

// ─── Sub-components ─────────────────────────────────────────────

function FirmStat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(28px, 3vw, 38px)', color: 'var(--gold-bright)', fontWeight: 500, lineHeight: 1.1 }}>
        {n}
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250, 247, 242, 0.62)', marginTop: 8 }}>
        {l}
      </div>
    </div>
  );
}

function ValueCard({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div style={{ padding: 28, background: '#fff', border: '1px solid var(--line)', borderRadius: 4, boxShadow: 'var(--shadow-soft)', position: 'relative' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--gold)', marginBottom: 14, fontWeight: 600 }}>
        {num}
      </div>
      <h4 style={{ fontFamily: 'var(--display)', fontSize: 19, color: 'var(--navy)', margin: '0 0 10px', fontWeight: 500, lineHeight: 1.3 }}>
        {title}
      </h4>
      <p style={{ color: 'var(--ink-dim)', fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
        {body}
      </p>
    </div>
  );
}

function IncludedItem({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ padding: 22, background: '#fff', border: '1px solid var(--line)', borderRadius: 4, boxShadow: 'var(--shadow-soft)' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: 7 }} aria-hidden />
        <h4 style={{ fontFamily: 'var(--display)', fontSize: 17, color: 'var(--navy)', margin: 0, fontWeight: 500 }}>{title}</h4>
      </div>
      <p style={{ color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.55, margin: '0 0 0 17px' }}>{body}</p>
    </div>
  );
}

function LiveStat({ n, l }: { n: string; l: string }) {
  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(32px, 3.5vw, 44px)', color: 'var(--gold-bright)', fontWeight: 500, lineHeight: 1.05, marginBottom: 8, fontStyle: 'italic' }}>
        {n}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(250, 247, 242, 0.78)', lineHeight: 1.5 }}>
        {l}
      </div>
    </div>
  );
}

function LiveExclusive({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ padding: '14px 0', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: 7 }} aria-hidden />
      <div>
        <div style={{ fontFamily: 'var(--display)', fontSize: 17, color: 'var(--gold-bright)', marginBottom: 4, fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: title }} />
        <div style={{ color: 'rgba(250, 247, 242, 0.78)', fontSize: 14, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </div>
  );
}

function MentorCard({
  monogram,
  role,
  name,
  title,
  bios,
  creds,
}: {
  monogram: string;
  role: string;
  name: string;
  title: string;
  bios: React.ReactNode[];
  creds: string[];
}) {
  return (
    <div style={{
      padding: 36,
      background: '#fff',
      border: '1px solid var(--line)',
      borderRadius: 4,
      boxShadow: 'var(--shadow-card)',
      borderTop: '3px solid var(--gold)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
        <div style={{
          width: 60, height: 60, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-soft) 100%)',
          color: 'var(--gold-bright)',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--display)', fontSize: 22, fontWeight: 500,
          flexShrink: 0,
          letterSpacing: '0.04em',
        }}>
          {monogram}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-deep)', fontWeight: 600, marginBottom: 4 }}>
            {role}
          </div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 26, color: 'var(--navy)', fontWeight: 500, lineHeight: 1.15 }}>
            {name}
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-dim)', marginTop: 2 }}>
            {title}
          </div>
        </div>
      </div>
      {bios.map((b, i) => (
        <p key={i} style={{ color: 'var(--ink-dim)', fontSize: 14.5, lineHeight: 1.65, marginBottom: 14 }}>
          {b}
        </p>
      ))}
      <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', borderTop: '1px solid var(--line)', paddingTop: 16 }}>
        {creds.map((c, i) => (
          <li key={i} style={{ padding: '6px 0', display: 'flex', gap: 10, alignItems: 'baseline', fontSize: 14, color: 'var(--ink)' }}>
            <span style={{ color: 'var(--gold)', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600 }} aria-hidden>◆</span>
            <span dangerouslySetInnerHTML={{ __html: c }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function LadderCard({
  tier,
  taughtBy,
  lede,
  bullets,
  cta,
  isCurrent,
}: {
  tier: string;
  taughtBy: string;
  lede: string;
  bullets: string[];
  cta: { label: string; href: string; onClick?: (e: React.MouseEvent) => void } | null;
  isCurrent?: boolean;
}) {
  return (
    <div
      style={{
        padding: 32,
        background: isCurrent ? 'var(--navy)' : '#fff',
        color: isCurrent ? 'var(--cream)' : 'var(--ink)',
        border: isCurrent ? '1px solid var(--gold)' : '1px solid var(--line)',
        borderRadius: 4,
        position: 'relative',
        boxShadow: isCurrent ? 'var(--shadow-card)' : 'var(--shadow-soft)',
      }}
    >
      {isCurrent && (
        <div style={{ position: 'absolute', top: -12, left: 24, fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '5px 11px', background: 'var(--gold)', color: 'var(--navy)', borderRadius: 2, fontWeight: 600 }}>
          You are here
        </div>
      )}
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: isCurrent ? 'var(--gold-bright)' : 'var(--gold-deep)', marginBottom: 10, fontWeight: 600 }}>
        {tier}
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: isCurrent ? 'rgba(250, 247, 242, 0.62)' : 'var(--ink-mute)', marginBottom: 16, letterSpacing: '0.04em' }}>
        {taughtBy}
      </div>
      <p
        style={{
          fontFamily: 'var(--display)',
          fontSize: 19,
          color: isCurrent ? 'var(--cream)' : 'var(--navy)',
          lineHeight: 1.3,
          marginBottom: 20,
          fontWeight: 500,
        }}
      >
        {lede}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
        {bullets.map((b, i) => (
          <li
            key={i}
            style={{
              fontSize: 13.5,
              color: isCurrent ? 'rgba(250, 247, 242, 0.85)' : 'var(--ink-dim)',
              padding: '8px 0',
              borderTop: i === 0 ? 'none' : `1px solid ${isCurrent ? 'rgba(184, 148, 90, 0.18)' : 'var(--line)'}`,
              display: 'flex',
              gap: 8,
              alignItems: 'baseline',
            }}
          >
            <span style={{ color: 'var(--gold)', fontSize: 9 }} aria-hidden>◆</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {cta && (
        <Link
          href={cta.href}
          onClick={cta.onClick}
          style={{
            display: 'inline-block',
            background: isCurrent ? 'var(--gold)' : 'transparent',
            color: isCurrent ? 'var(--navy)' : 'var(--navy)',
            border: isCurrent ? '1px solid var(--gold)' : '1px solid var(--navy)',
            padding: '11px 20px',
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
