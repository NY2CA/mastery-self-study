/**
 * Mastery Self-Study · curriculum
 * ─────────────────────────────────────────────────────────────────────
 * 8-module operator's execution toolkit. Lighter than Mastery Live (12 modules)
 * — Capital Raising, PPM & Legal, Asset Management, and Exit are intentionally
 * reserved for Live since they involve securities law, ongoing operations, or
 * cycle-timing judgment that benefits materially from coaching alongside.
 *
 * Module content depth is roughly 70% of Live's. Same topics covered, same
 * frameworks, but without the operator-judgment commentary that Live members
 * get from the Rescia desk. Each module includes one "Live members would
 * workshop this..." sidebar at the highest-judgment moment — these are the
 * upgrade triggers (placed during Wave SS-2 content authoring).
 *
 * Quiz length: 4-5 items per module (vs Live's 10).
 * PDFs: view+print only. Excel templates: input-only with R/Y/G.
 *
 * Wave SS-1 ships this file with module SHELLS only (id, title, duration,
 * description, empty topics[]). Wave SS-2 fills in topics[], quiz[], common
 * mistakes, and the Diva-voiced narrative copy.
 *
 * Type interfaces preserved verbatim from the Live codebase so the existing
 * components (`TopicAccordion`, quiz UI, etc.) work without modification.
 */

// ─────────────────────────────────────────────────────────────────────
// Type interfaces — identical to Live so shared components Just Work
// ─────────────────────────────────────────────────────────────────────

export interface Topic {
  id: string;
  title: string;
  summary: string;
  body: string;
  example?: string;
  pitfalls?: string[];
  related?: string[];
}

export interface QuizItem {
  q: string;
  a: string;
  why?: string;
  trap?: string;
  topicId?: string;
  difficulty?: 'foundation' | 'application' | 'operator';
  choices?: string[];
  correctIndex?: number;
}

export type Mistake =
  | string
  | {
      trap: string;
      why: string;
      fix: string;
      topicId?: string;
    };

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  topics?: Topic[];
  deepDive: string[];
  quiz: QuizItem[];
  mistakes: Mistake[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  modules: Module[];
}

// ─────────────────────────────────────────────────────────────────────
// Modules reserved for Mastery Live — referenced on the Self-Study
// dashboard sidebar as a visible "what you get when you upgrade" surface.
// Self-Study members see these listed (gold-dotted) but cannot access them.
// ─────────────────────────────────────────────────────────────────────

export const liveOnlyModules = [
  { num: 9, title: 'Capital Raising', reason: 'Securities law sensitivity · requires coaching judgment' },
  { num: 10, title: 'PPM & Legal', reason: 'Securities documents · requires hands-on review' },
  { num: 11, title: 'Asset Management', reason: 'Ongoing operations · benefits from cycle-by-cycle coaching' },
  { num: 12, title: 'Exit', reason: 'Cycle-timing judgment · refinance vs sell vs recap depends on read' },
] as const;

// ─────────────────────────────────────────────────────────────────────
// The 8 Self-Study modules. Wave SS-1 ships shells; Wave SS-2 fills in
// topics[], quiz[], and mistakes[] with Diva-voiced narrative copy.
// ─────────────────────────────────────────────────────────────────────

export const COURSES: Course[] = [
  {
    id: 'multifamily-mastery',
    title: 'Mastery Self-Study',
    category: 'Institutional Real Estate',
    description:
      "The operator's execution toolkit. Eight modules covering submarket through property management — the self-paced track for buyers who want the curriculum without the coaching.",
    modules: [
      {
        id: 'submarket',
        title: 'Module 1 · Submarket Intelligence',
        duration: '2.5 hrs',
        description:
          'Identify markets where the math actually works for the next 24 months. Population growth, employment diversity, supply pipeline, rent trajectory, and the read between the lines on submarket data.',
        topics: [],
        deepDive: [
          'Population, employment, and supply pipeline as the three reads that make or break a market',
          'How to triangulate a submarket from public data sources alone',
          'When to walk away from a market that looks great on the surface',
        ],
        quiz: [],
        mistakes: [],
      },
      {
        id: 'sourcing',
        title: 'Module 2 · Deal Sourcing',
        duration: '2.5 hrs',
        description:
          'Build the broker relationships and deal flow that surface real opportunities. On-market, off-market, and the email cadence that gets brokers to remember your name.',
        topics: [],
        deepDive: [
          'The broker-relationship arc — from first email to the third call where they show you something off-market',
          'On-market vs off-market: when each is worth the time',
          'How to read a broker offering memo and know what it is not telling you',
        ],
        quiz: [],
        mistakes: [],
      },
      {
        id: 'underwriting',
        title: 'Module 3 · Underwriting',
        duration: '3 hrs',
        description:
          'Build the model. Defend the assumptions. Walk away when the numbers say so. The core craft of multifamily — applied with the Rescia underwriting template.',
        topics: [],
        deepDive: [
          'The Rescia underwriting model walk-through — every assumption defended',
          'Stabilized vs as-is NOI — why the difference is where deals live or die',
          'The exit cap rate trap and how to set it honestly',
        ],
        quiz: [],
        mistakes: [],
      },
      {
        id: 'stress',
        title: 'Module 4 · Stress Testing & CapEx',
        duration: '2.5 hrs',
        description:
          'Sensitize for the bad case. Price the deferred maintenance accurately. The downside scenarios that separate operators who survive a cycle from operators who do not.',
        topics: [],
        deepDive: [
          'The four stress tests every deal must pass before LOI',
          'Pricing deferred maintenance from a property condition report — line-by-line',
          'Cap-ex reserves: why under-budgeting here is the most common operator mistake',
        ],
        quiz: [],
        mistakes: [],
      },
      {
        id: 'debt',
        title: 'Module 5 · Debt Sourcing',
        duration: '3 hrs',
        description:
          'Agency, bank, bridge — match the debt structure to the deal. Term sheet review, DSCR + LTV math, refinance optionality, and the conversation with a lender that actually moves the deal forward.',
        topics: [],
        deepDive: [
          'Agency vs bank vs bridge — the right debt for the right business plan',
          'Reading a term sheet: which terms are non-negotiable vs which are leverage',
          'Refinance optionality and why short-term debt traps operators in bad cycles',
        ],
        quiz: [],
        mistakes: [],
      },
      {
        id: 'loi',
        title: 'Module 6 · LOI',
        duration: '2 hrs',
        description:
          'Write the LOI that gets accepted and protects your downside. Clause-by-clause through the Rescia LOI template, with the negotiation moves that matter.',
        topics: [],
        deepDive: [
          'The Rescia LOI template — clause-by-clause walk-through',
          'Earnest money, due diligence period, and the protections every LOI must have',
          'Counter-offer mechanics: when to push, when to accept, when to walk',
        ],
        quiz: [],
        mistakes: [],
      },
      {
        id: 'psa',
        title: 'Module 7 · PSA & DD',
        duration: '2.5 hrs',
        description:
          'Negotiate the PSA. Run a DD that surfaces the surprises before close. Inspections, leases, financials, environmental, title — what to look for and what to do when something is off.',
        topics: [],
        deepDive: [
          'PSA red flags — the clauses that need amendment or removal',
          'Due diligence checklist: inspections, leases, T-12, environmental, title',
          'Retrade strategy: when DD findings justify a price reduction and how to ask for it',
        ],
        quiz: [],
        mistakes: [],
      },
      {
        id: 'pm',
        title: 'Module 8 · Property Management',
        duration: '2 hrs',
        description:
          'Hire it, fire it, hold it accountable. The PM RFP, the monthly variance review, and the operating rhythm that keeps a deal performing.',
        topics: [],
        deepDive: [
          'The PM RFP template — what to ask for and how to evaluate responses',
          'Monthly variance review: the four numbers that tell you if the PM is doing their job',
          'When to fire a PM and how to transition without disrupting operations',
        ],
        quiz: [],
        mistakes: [],
      },
    ],
  },
];
