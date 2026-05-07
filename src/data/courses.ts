/**
 * Mastery Self-Study · curriculum
 * ─────────────────────────────────────────────────────────────────────
 * 8-module operator's execution toolkit. Wave SS-2 fills in Module 1
 * with full Diva-voiced content (8 topics, 5 quiz items, 4 common
 * mistakes, plus the Live-upsell sidebar on Topic 8). Modules 2-8
 * remain shells until Lou signs off on Module 1's voice and depth,
 * then Wave SS-2.2 onward scales the same template across them.
 *
 * Type interfaces are identical to the Live codebase so shared
 * components (TopicAccordion, quiz UI) work without modification.
 *
 * Topic count locked at 60 across 8 modules: 8 / 7 / 10 / 7 / 8 / 6 / 8 / 6.
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
// Modules reserved for Mastery Live
// ─────────────────────────────────────────────────────────────────────

export const liveOnlyModules = [
  { num: 9, title: 'Capital Raising', reason: 'Securities law sensitivity · requires coaching judgment' },
  { num: 10, title: 'PPM & Legal', reason: 'Securities documents · requires hands-on review' },
  { num: 11, title: 'Asset Management', reason: 'Ongoing operations · benefits from cycle-by-cycle coaching' },
  { num: 12, title: 'Exit', reason: 'Cycle-timing judgment · refinance vs sell vs recap depends on read' },
] as const;

/**
 * Lookup helper for the shared `useCourse` hook.
 */
export function getCourse(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

// ─────────────────────────────────────────────────────────────────────
// The 8 Self-Study modules.
//   Module 1: full content (Wave SS-2)
//   Modules 2-8: shells (filled in subsequent waves)
// ─────────────────────────────────────────────────────────────────────

export const COURSES: Course[] = [
  {
    id: 'multifamily-mastery',
    title: 'Mastery Self-Study',
    category: 'Institutional Real Estate',
    description:
      "The operator's execution toolkit. Eight modules covering submarket through property management — the self-paced track for buyers who want the curriculum without the coaching.",
    modules: [
      // ═══════════════════════════════════════════════════════════════════
      // MODULE 1 · Submarket Intelligence — full content (Wave SS-2)
      // ═══════════════════════════════════════════════════════════════════
      {
        id: 'submarket',
        title: 'Module 1 · Submarket Intelligence',
        duration: '2.5 hrs',
        description:
          'Identify markets where the math actually works for the next 24 months. Population, employment, supply pipeline, rent trajectory, and the read between the lines on submarket data — applied to real Sun Belt deals.',
        topics: [
          // ── Topic 1 ──────────────────────────────────────────────────
          {
            id: 'submarket-t01-three-reads',
            title: 'The three reads that determine if a market works',
            summary:
              'Every submarket evaluation rests on three diagnostics — population trajectory, employment diversity, and supply pipeline. Get all three right and the math lives. Miss one and the deal fights you for years.',
            body:
              "Multifamily lives or dies on demand. Demand is people. People are jobs. Jobs are concentrated in markets that grow them and stay diverse enough to survive a downturn. So when a broker pitches you a deal, the first three questions you ask are about the market — not the property.\n\nThe first read is **population**. Net migration is the cleanest signal. A submarket adding 1.5–2.5% population per year is healthy. Above 3% is hot but watch supply. Below 1% means you're competing for a shrinking pie. Look at trailing five years and the forward Census/BLS projections — and weight the forward read more heavily. Demographers are usually right within a 0.3% band on five-year horizons.\n\nThe second read is **employment diversity**. Single-industry submarkets are traps. If 35% of the jobs come from one employer, you don't own a multifamily deal — you own that company's stock with extra steps. The reads that matter: number of distinct industries with more than 5% employment share (you want at least four to five), white-collar vs blue-collar mix, and the trajectory of the anchor employers. Healthcare, education, and tech-enabled services are stickier than oil and gas or pure manufacturing.\n\nThe third read is **supply**. Permits filed today are units delivered in 18–30 months. If your business plan needs rent growth in year 2–3, look at what's coming online in those years. A submarket with 4%+ supply growth incoming will lease up your property only after the new builds absorb. Plan accordingly or pass.\n\nGet all three reads right and you have the foundation for a defensible underwrite. Miss one and you'll spend the next five years explaining variance reports.",
            example:
              "Two real DFW submarkets, same broker pitch package, different reads. **Plano:** 2.1% population growth, six industries above 5% employment share, 1.8% supply growth incoming. **Garland:** 1.6% population growth, four industries above 5%, 4.2% supply growth incoming. Same broker, same week. Plano works. Garland gets passed unless the basis is below replacement cost — which on this deal it wasn't. We passed.",
            pitfalls: [
              "Trusting the broker's market summary at face value — they're paid to make it look good.",
              "Reading population trajectory without checking employment trajectory — population can grow on retirees who don't pay market rent.",
              'Using MSA data when you should be using submarket data — a 15-mile MSA can be flat while your 3-mile submarket is hot or cold.',
              "Ignoring the supply pipeline because the deal is 'stabilized' — your refi or sale lands in 3-5 years; the pipeline matters for your exit, not just your underwrite.",
            ],
            related: ['submarket-t02-population', 'submarket-t03-employment', 'submarket-t04-supply'],
          },

          // ── Topic 2 ──────────────────────────────────────────────────
          {
            id: 'submarket-t02-population',
            title: 'Population trajectory · what to look for',
            summary:
              "Population growth is the cleanest demand signal in multifamily. But 'growth' alone is the lazy read — what matters is who's growing and whether they're going to pay your rent.",
            body:
              "Net migration is where you start. Population grows two ways — births (slow, regional) and migration (fast, submarket-level). For multifamily, migration is the signal. People moving in are people forming households, signing leases, and paying rent. People being born are 22 years away from your asset.\n\nThe healthy band for multifamily submarkets is 1.5–2.5% annual population growth, weighted toward in-migration not births. Above 3% is hot but you're racing supply. Below 1% means the renter pool is shrinking; you're competing for fewer leases each year.\n\nPull two reads: trailing five years from Census ACS (the actual data), and forward five-year projections from state demographers or BLS regional offices. Weight the forward read more heavily. Demographers are usually right within a 0.3% band on five-year horizons — better than most operators expect.\n\nThe deeper read is age cohort. The 22–34 cohort drives multifamily demand — they're the ones forming households out of college, transitioning out of roommate situations, marrying late, having their first kids in apartments not houses. If your submarket's growth is concentrated in retirees (65+), you have a different product — not necessarily bad, but not B-class workforce. Retirees in apartments tend to be price-sensitive and downsize-driven; they don't pay top-of-market.\n\nHousehold formation rate matters separately from population. A submarket can grow 2% but have household formation at 0.8% — meaning more people per household. That happens in markets where rents have outpaced wages and adult children stay home longer. It tells you renters can't afford to leave the parents' house. That's a market with rent ceiling problems.\n\nThe combination you want: 1.5–2.5% net migration, weighted to 22–34 cohort, with household formation rate matching or exceeding population growth. That's the demand profile a B-class deal needs to hit pro forma.",
            example:
              "Phoenix West Valley, 2019–2023 ACS data: 2.8% population growth, 3.1% household formation rate (households growing faster than population — couples splitting, adults moving out, divorces). 22–34 cohort up 4.2%. That's a market saying 'renters are forming faster than people are arriving.' We aggressively underwrote rent growth on a 144-unit deal in 2022 and it paid off through 2024 — even as in-migration slowed, household formation kept the renter pool tight.",
            pitfalls: [
              'Reading raw population growth without checking household formation — the two can diverge meaningfully.',
              'Trusting trailing-5 data without forward projections — a market that grew 3% from 2018-2023 may project 1.2% from 2024-2029.',
              'Looking at MSA-level data when the deal is in a 3-mile submarket.',
              'Conflating retiree-driven population growth with renter-driven growth — they buy condos, not apartments.',
              'Forgetting that household formation can DECLINE in a hot market where rents outpace wages.',
            ],
            related: ['submarket-t01-three-reads', 'submarket-t06-data-sources'],
          },

          // ── Topic 3 ──────────────────────────────────────────────────
          {
            id: 'submarket-t03-employment',
            title: 'Employment diversity · the single-industry trap',
            summary:
              "The submarket's employment mix is the rent-payment risk profile. Single-industry markets are stock picks dressed as real estate. Diverse markets survive cycles.",
            body:
              "Employment diversity is what separates deals that hold occupancy through downturns from deals that don't. The arithmetic is simple: if 35% of your submarket's jobs come from one employer and that employer has a bad year, you have a vacancy problem. If your jobs spread across six industries, no single employer's bad year sinks your occupancy.\n\nThe numerical read: count the industries with more than 5% employment share in your submarket. You want at least 4-5. Three or fewer is a single-industry-trap signal even if no single industry exceeds 35%. Six or more is a healthy diversified profile.\n\nBeyond count, mix matters. Healthcare, education, professional services, and tech-enabled services are stickier in downturns — they keep paying through cycles. Oil and gas, pure manufacturing, leisure and hospitality, and construction are more cyclical. A market that's 50% leisure and hospitality (looking at you, parts of Vegas and Orlando) gets hit hard the same week the macro turns.\n\nThe white-collar versus blue-collar mix maps onto rent class. White-collar markets support B+ and A-class deals — the renters can afford the rents you're underwriting. Blue-collar markets support B and C-class deals; underwriting B+ rents in a blue-collar submarket is how operators discover their pro forma was fiction.\n\nThe trajectory of anchor employers also matters. A submarket with three Fortune 500 anchors — all of which are growing payroll year over year — is structurally different from a submarket with one Fortune 500 anchor that's announced layoffs. Pull the press releases. Read the 10-Ks. The five minutes you spend on anchor employer financials tells you more about your submarket's 5-year rent trajectory than any market report will.",
            example:
              "DFW Plano: six industries above 5% (tech, financial services, healthcare, education, professional services, manufacturing). Anchor employers include Toyota North America HQ, JPMorgan Chase, Liberty Mutual. Healthy. Compare to a hypothetical North Dakota submarket: 38% energy & extraction, 12% government, 11% retail. One read of WTI crude prices tells you everything about that market's two-year rent trajectory. Plano you can underwrite. The North Dakota market is an oil-price call dressed as a real estate deal.",
            pitfalls: [
              'Counting industries without weighting them — three industries each at 30% is more concentrated than seven each at 8%.',
              'Ignoring the white-collar vs blue-collar split when underwriting B+/A-class rents.',
              "Treating 'logistics and warehousing' as diverse when it's really one Amazon distribution center plus contract carriers.",
              'Not pulling 10-Ks on anchor employers — material risks live there.',
              "Failing to ask 'what would a 30% downturn in [anchor industry] do to occupancy?'",
            ],
            related: ['submarket-t01-three-reads', 'submarket-t08-walk-away'],
          },

          // ── Topic 4 ──────────────────────────────────────────────────
          {
            id: 'submarket-t04-supply',
            title: 'Supply pipeline · permits today, deliveries in 24 months',
            summary:
              "What's getting built today is what's renting at the same time as your deal in 18-30 months. Read the pipeline or watch your pro forma underperform.",
            body:
              "Multifamily underwriting fails most often on supply, not demand. Operators get the demand reads right (population, employment, jobs all support rent growth) and then the deal underperforms because someone built 800 new units half a mile away during their lease-up.\n\nPermits filed today are units delivered in 18–30 months. Construction lead times in multifamily run roughly 18–24 months for stick-built and 24–30 months for podium or wrap product. So when you're underwriting a deal today, the supply pipeline that affects you starts with permits filed 18 months ago and extends to permits filed in the next 12 months.\n\nPull two numbers: total permitted units in your submarket over the trailing 24 months, and forward expected deliveries by quarter for the next 30 months. Cross-reference with absorption rates — units leased per month at recent comps. If permitted supply exceeds 24 months of trailing absorption, you're heading into oversupply.\n\nThe **4% rule of thumb**: if forward supply growth exceeds 4% of existing inventory annually for the next two years, expect rent concessions and lease-up extensions across the submarket. Your deal underwrites with concessions. Your deal underwrites with longer lease-up. Or you pass.\n\nCity permitting data is free and public — most municipalities post it weekly. CoStar and Yardi Matrix package it commercially with absorption forecasting. Either source works; you just need the data. The mistake is operators who skip this because the broker said 'supply isn't really an issue here.' Brokers are paid to close. Pull the data yourself.\n\nThe pipeline matters even on stabilized deals. Your refi cap rate or sale exit lands in 3-5 years. If supply spikes between today and your exit, your exit cap widens. The pipeline isn't just a lease-up question — it's an exit-pricing question.",
            example:
              "Phoenix West Valley, 2022 underwrite: trailing-24-month absorption was 1,200 units/year. Forward permitted supply: 4,800 units expected to deliver in the next 24 months. That's 4 years of absorption hitting in 2 years. The deal underwrote at 18% occupancy concessions and a 9-month lease-up. Eight months later, two adjacent projects pushed delivery, the absorption rate held, and the deal hit pro forma. Read the pipeline, plan for it.",
            pitfalls: [
              'Looking at MSA-level supply data when the deal is in a 3-mile submarket.',
              "Trusting broker representations of 'no significant supply coming' without pulling permit data.",
              'Underwriting rent growth in year 2-3 without checking what is delivering in year 2-3.',
              "Treating 'permitted but not started' as different from 'delivering soon' — most permitted projects do deliver, just on extended timelines.",
              'Forgetting that supply matters on exit, not just entry.',
            ],
            related: ['submarket-t01-three-reads', 'submarket-t05-rent-trajectory'],
          },

          // ── Topic 5 ──────────────────────────────────────────────────
          {
            id: 'submarket-t05-rent-trajectory',
            title: 'Rent trajectory · trailing-12 vs the forward read',
            summary:
              'Trailing-12 rent data is history. Forward rent reads — concession normalization, rent class compression, comp set lease velocity — are the underwrite.',
            body:
              "The most common mistake in multifamily underwriting is taking the trailing-12 rent number from CoStar at face value and projecting it forward at 3% per year. That's not underwriting; that's hoping.\n\nTrailing-12 rent is what comparable units leased for in the past year. It's a lagging indicator. By the time it shows up in CoStar, leases have been signed, concessions paid out, and tenants moved in. The forward read — what your unit will lease for in months 1-24 of your hold — depends on three things: the comp set's current asking rents minus current concessions, the trajectory of rent class compression in your submarket, and the absorption rate.\n\n**Concessions are the sleeper variable.** A 2-month free concession on a 12-month lease is effectively a 16.7% rent discount. CoStar's 'effective rent' includes concessions; 'asking rent' doesn't. Always underwrite from effective rent. And concessions don't normalize uniformly — they compress fastest in markets where supply is absorbed and slowest in markets where new supply keeps delivering.\n\n**Rent class compression** is the warning signal. When B-class rents narrow toward A-class rents (the spread shrinks below 12-15%), it's a signal that A-class is overbuilt and renters are trading down. Your B-class deal's rent ceiling just got lowered. Check the trailing 24 months of A vs B vs C class effective rents in your submarket — if the spread is compressing, your pro forma rent growth assumptions need a haircut.\n\n**Lease velocity** at the comp set tells you what your absorption will be. If similar properties are leasing 10-12 units per month, you can underwrite that. If they're leasing 4-6 per month, your stabilization timeline doubles and your concession line item triples. Pull lease velocity numbers from CoStar comp set reports, or call the property managers of comparable properties and ask. They'll tell you.",
            example:
              "A DFW deal in 2023: CoStar trailing-12 effective rent was $1,420 on the comp set. Asking rents were $1,495 with 1-month free concessions on 13-month leases — effective $1,380. The trailing number was already 3% off reality. Underwriting from $1,420 + 3% growth = $1,463 year-1 was a fantasy. Underwriting from $1,380 + 0% growth (concessions normalizing) = $1,380 was honest. The deal worked at $1,380. It would not have worked at $1,463. The honest read kept us out of a deal that closed at $1,463 and has since traded again.",
            pitfalls: [
              'Using asking rent instead of effective rent — concessions are the silent rent cut.',
              'Projecting trailing-12 + 3% growth without checking concession trajectory.',
              'Ignoring rent class compression as a warning signal of A-class oversupply pulling down B-class rents.',
              'Failing to call comp property managers for actual lease velocity data.',
              'Using one CoStar report as the rent thesis instead of triangulating with comp manager calls.',
            ],
            related: ['submarket-t04-supply', 'submarket-t06-data-sources'],
          },

          // ── Topic 6 ──────────────────────────────────────────────────
          {
            id: 'submarket-t06-data-sources',
            title: 'Reading public data sources well',
            summary:
              "You don't need a $30K Yardi Matrix subscription to read a market. You need to know what each data source actually tells you and how to triangulate.",
            body:
              "The data is mostly free or cheap. The skill is knowing what each source measures and how to combine them.\n\n**Population.** Census ACS (American Community Survey) is the gold standard. Free, updated annually, available at census-tract and block-group level. Pull the Detailed Tables for your submarket — population, age cohort, household composition, household income, rent burden. The 5-year ACS estimates are more reliable than the 1-year for non-major markets.\n\n**Employment.** BLS (Bureau of Labor Statistics) gives you sector mix and trajectory. Pull the QCEW (Quarterly Census of Employment and Wages) for industry breakdown at the county level. For submarket-level employment, county-level data is usually close enough; if not, state labor market information offices publish more granular data.\n\n**Supply.** City permitting data is free at most municipalities. Search '[city name] building permits' and you'll find a portal. Pull multifamily-permitted units by quarter for the trailing 24 months and forward 12. Cross-reference with CoStar or Yardi Matrix if you have access (they package permit data with absorption forecasting).\n\n**Rent comps.** CoStar is the most-used commercial source. Subscriptions run $5-15K annually depending on geography. Apartments.com (which CoStar owns) is the free public-facing version — useful for asking rents but not effective rents or absorption. Zillow Research and RealPage MPF publish free quarterly market reports that are decent for trend reads.\n\nThe key is **triangulation**. Never trust a single source. Pull Census + BLS + city permits + CoStar (or substitute) and look for where they agree and disagree. Disagreements are where the real risk lives. If Census says population is up 2% but BLS says employment is flat — what's growing? Retirees? Students? That changes your deal type.\n\nThe CBRE / JLL / Marcus & Millichap market reports are useful but biased. They're written by brokers; their job is selling. Read them, but read them as the seller's pitch, not the underwrite.",
            example:
              "In 2023 we evaluated a Tampa submarket where CoStar showed 2.4% population growth, 3.1% employment growth, and 4.8% supply growth incoming. Census ACS confirmed the population number. BLS confirmed employment. City permits confirmed supply. All four sources agreed — the supply was the deal-killer. Saved us a $200K LOI deposit on a deal that would have ground through 24 months of concessions. The data was free. The discipline was reading all four.",
            pitfalls: [
              'Trusting one data source as the whole picture.',
              'Reading CBRE / JLL / Marcus & Millichap reports as objective rather than as broker-pitch material.',
              "Skipping Census because it 'feels too academic' — it's the most reliable population data we have.",
              'Forgetting BLS QCEW gives industry breakdowns most operators never look at.',
              'Using MSA-level data when submarket-level is what underwrites the deal.',
            ],
            related: ['submarket-t02-population', 'submarket-t07-submarket-vs-msa'],
          },

          // ── Topic 7 ──────────────────────────────────────────────────
          {
            id: 'submarket-t07-submarket-vs-msa',
            title: 'Submarket vs MSA · the granularity that matters',
            summary:
              "MSAs are marketing geography. Submarkets are underwriting geography. Operators who can't tell the difference buy assets in the wrong neighborhoods at the wrong rents.",
            body:
              "The MSA — Metropolitan Statistical Area — is a Census Bureau construct. It bundles a central city with all economically integrated counties. The DFW MSA stretches across 11 counties. Phoenix MSA covers 14,500 square miles. Atlanta MSA includes 29 counties. These are huge geographies that average together hundreds of distinct submarkets, each with its own demand profile, rent class, and trajectory.\n\nWhen a broker says 'this market is hot' and points to MSA-level data, that's broker-speak for 'I'm not telling you what's happening in your specific submarket.' A 1.8% MSA-level rent growth number can include submarkets growing 6% and submarkets going negative. **Your deal lives in a submarket, not an MSA.**\n\nThe right granularity for underwriting is 3-5 mile rings or natural neighborhood boundaries. School district boundaries, transit corridors, and primary employer-to-residential commute patterns define real submarkets. Drive-time analysis — what's a reasonable commute from this asset to the major employment nodes — anchors the rent thesis.\n\nFor B-class workforce housing, the submarket is roughly the area within a 20-minute drive of major employment. For A-class, it's tighter — 15 minutes max, often defined by walkability or proximity to lifestyle amenities. For C-class, the rules are different — it's whoever can afford the unit count, which often means the renter pool comes from further out.\n\n**The discipline:** when you're evaluating a deal, draw a 3-mile ring around the property on a map, then a 5-mile ring. Pull demographics, employment, and supply for both rings. If the 3-mile and 5-mile rings tell different stories, the deal is in a transitional area — that can be opportunity or trap depending on which way the gradient is moving.\n\nThe MSA report tells you nothing about your specific deal. The submarket data tells you everything.",
            example:
              "DFW MSA, 2023: 1.7% rent growth average. Plano specifically (3-mile ring around a deal we were evaluating): 3.4% rent growth, household income up 4%, supply 2.1%. Plano was a different market than the MSA average. Same week, a deal in southeast Dallas (separate submarket): -1.8% rent growth, household income flat, supply 5.8%. Same MSA, opposite directions. The broker pitched both at 'DFW averaging 1.7%.' Both deals were sold at MSA assumptions. One worked. One didn't. Submarket reads called both correctly.",
            pitfalls: [
              'Using MSA-level reports as the underwriting basis instead of submarket-level.',
              'Ignoring drive-time analysis when defining the submarket boundary.',
              "Treating school district boundaries as real-estate-irrelevant — they're not, they shape which renters compete for your units.",
              'Forgetting that A-class, B-class, and C-class submarkets can be different shapes for the same physical address.',
              "Trusting the broker's submarket definition rather than drawing your own ring.",
            ],
            related: ['submarket-t01-three-reads', 'submarket-t06-data-sources'],
          },

          // ── Topic 8 · Walk-away · Live sidebar lives here ────────────
          {
            id: 'submarket-t08-walk-away',
            title: 'Walk-away signals · when to pass on a market',
            summary:
              'Most submarket evaluation work is teaching you to walk away. Knowing when to pass is the highest-leverage skill in multifamily — it preserves capital and reputation across cycles.',
            body:
              "The math of walking away is brutal. Operators who pass on 19 of 20 deals and execute well on the 1 they take typically outperform operators who execute on 5 of 20 deals across a cycle. **The walk-away decision is not pessimism; it's discipline.**\n\nThe clear walk-away signals from a submarket read:\n\n**All three demand reads negative.** Population below 1%, employment growth below 1%, supply above 4%. No basis saves you. Pass.\n\n**Single-industry concentration above 35%.** You don't own a multifamily deal; you own a stock pick. If you wouldn't buy that company's equity, don't buy this real estate. Pass.\n\n**Rent class compression accelerating.** B-class rents narrowing toward A-class below 12% spread, with the trajectory still narrowing. A-class oversupply is dragging down B-class rent ceilings. Your B-class deal's pro forma rents are fiction. Pass — or wait 24 months for A-class supply to absorb.\n\n**Anchor employer publicly distressed.** Layoff announcements, plant closures, M&A activity that's likely to consolidate operations elsewhere. The 5-year rent thesis depends on those jobs staying. They won't. Pass.\n\n**Forward supply incoming above 5% with trailing absorption below 2%.** Math doesn't work. Concessions will be deep, lease-up will be long, and the exit cap will widen. Pass.\n\nThe harder walk-away is the deal where one or two reads are weak but the basis is below replacement cost. The seductive logic: 'I'm getting it cheap enough that even with rent compression, I make money.' That's right sometimes. It's also the most expensive mistake operators make. A great basis on a structurally weak market still leaves you with the operations problem — vacancy, turnover, capital-expense reality — and the exit-pricing problem when the market remains weak through your hold.\n\nThe disciplined operator's walk-away conversation with the broker is short. 'The basis is attractive but the submarket fundamentals don't support our hold-period assumptions. We're going to pass. Please keep us on your distribution list.' Brokers respect this. They'll bring you better deals because they know you actually evaluate.\n\n---\n\n**◆ Mastery Live members workshop this on a real deal.**\n\nWalk-away decisions are where coaching earns its keep. Self-Study gives you the framework; Live members bring their actual deals to a monthly call and Diva and Lou pressure-test the read with them. The frameworks are the same — the difference is having someone seasoned in the room when you're staring at $30K of earnest money on the table and the broker is asking for an answer by Friday.",
            example:
              "A 2022 Tucson deal: 1.2% population growth (low), 28% concentration in mining and government (concerning), 5.4% supply growth incoming (high). Basis was below replacement cost — $135K/door on a $185K replacement market. Cap rate looked attractive at 5.6%. We modeled the deal three ways. Best case (rents grow with the broader Sun Belt): 12% IRR. Base case (rents flat as supply absorbs): 6% IRR. Bear case (rents -2% as supply oversaturates): negative IRR. We passed. Two years later, rents in the submarket were down 4% as the supply hit. The deal is owned by someone now wishing they'd passed.",
            pitfalls: [
              "Letting 'the basis is attractive' override structurally weak demand reads.",
              'Underwriting only the base case and skipping the bear case where two of three demand reads turn negative.',
              "Confusing operator skill with market gravity — your operations excellence doesn't fix a shrinking renter pool.",
              "Soft-walking ('we'd consider it at $X price') instead of hard-walking — leaves the door open for the broker to renegotiate at the same fundamentally bad market.",
              "Not telling the broker WHY you're passing — they will bring you the same kind of deal next time if you don't help them learn your filter.",
            ],
            related: ['submarket-t01-three-reads', 'submarket-t03-employment', 'submarket-t04-supply'],
          },
        ],
        deepDive: [
          'Population, employment, and supply pipeline as the three reads that make or break a market.',
          'How to triangulate a submarket from public data sources alone.',
          'When to walk away from a market that looks great on the surface.',
        ],
        quiz: [
          {
            q: 'A broker pitches a Class B 142-unit deal in a submarket showing 1.4% population growth, 35% employment concentration in one major employer, and 4.5% supply pipeline incoming over 24 months. What is the right read?',
            a: 'Walk away — the combination of low population growth, employment concentration, and oversupply is a structural problem.',
            why: 'All three diagnostics are flagging. Population at 1.4% is below the 1.5-2.5% healthy band. 35% employment concentration is a single-industry trap. 4.5% supply incoming will absorb your rent growth assumptions. Even with a great basis, this deal will fight you for the entire hold.',
            trap: "The common mistake is fixating on cap rate — 'if I buy at the right price, I'm protected.' On a structurally weak market read, no cap rate saves you. Rent growth turns negative, occupancy drops, your refi cap widens. Market read precedes the price discussion.",
            topicId: 'submarket-t01-three-reads',
            difficulty: 'application',
            choices: [
              'Strong deal — population is positive',
              'Acceptable if cap rate is right',
              'Walk away — supply pipeline alone is a deal-killer',
              'Walk away — the combination of low population growth, employment concentration, and oversupply is a structural problem',
            ],
            correctIndex: 3,
          },
          {
            q: 'A submarket shows 2.6% trailing-5-year population growth, but the forward 5-year projection is 1.1%. Household formation is at 0.7% — well below population growth. What is the read?',
            a: 'Walk away — household formation below population growth means demand is structurally weak.',
            why: 'Household formation below population growth signals more people living per household — typically because rents have outpaced wages and adult children are staying home longer. Even if population grows, the renter pool is not growing at the same rate. Forward projections at 1.1% (below the 1.5-2.5% healthy band) compound the problem.',
            trap: "Operators new to the craft fixate on trailing population growth as the demand signal. Trailing data is history; what matters is the renter pool over the hold period. A 2.6% trailing read with 1.1% forward and 0.7% household formation is a market saying 'the past three years were the high water mark.'",
            topicId: 'submarket-t02-population',
            difficulty: 'application',
            choices: [
              'Strong demand fundamentals — trailing population is positive',
              'Walk away — household formation below population growth means demand is structurally weak',
              'Acceptable demand profile if rents are below market',
              'Strong if employment is growing faster than population',
            ],
            correctIndex: 1,
          },
          {
            q: 'A submarket has 4 industries above 5% employment share, with healthcare at 18%, education at 12%, manufacturing at 8%, and retail at 7%. The other 55% is split across 12 industries each below 5%. What is the read?',
            a: 'Diversified and stable — well-distributed industry mix with sticky sectors leading.',
            why: 'Healthcare and education are sticky in downturns — they keep paying through cycles. Manufacturing and retail are more cyclical but at modest concentrations (8% and 7%) they do not dominate. The 55% spread across 12 sub-5% industries is what diversification actually looks like. This is a healthy employment mix.',
            trap: "The lazy read is 'only 4 industries above 5%' and walks away. The numerical count matters less than the trajectory and stickiness of the leading sectors. Healthcare + education at 30% combined is a stability anchor.",
            topicId: 'submarket-t03-employment',
            difficulty: 'operator',
            choices: [
              'Concentrated — only 4 industries above 5%',
              'Diversified and stable — well-distributed industry mix with sticky sectors leading',
              'Risky — too much retail',
              'Strong if rents support the deal',
            ],
            correctIndex: 1,
          },
          {
            q: 'Your target submarket has trailing-24-month absorption of 800 units/year and forward permitted supply of 2,000 units delivering in the next 18 months. What is the underwriting implication?',
            a: 'Concessions will be deep and lease-up will be extended; underwrite accordingly or pass.',
            why: '2,000 units in 18 months equates to 1,333/year — 67% above absorption. Markets where supply outpaces absorption see deep concessions (often 2-3 months free), extended lease-up timelines (12+ months), and rent flatlines or declines as new supply pulls renters from existing properties. Your deal underwrites with concessions and longer lease-up, or you pass.',
            trap: "'My deal is stabilized so supply doesn't matter.' Wrong on two fronts — supply affects rent growth at renewal (you can't push rents 3% when down the street has 2 months free), AND supply affects your exit cap. The 5-year hold gets compressed by the supply cycle on both ends.",
            topicId: 'submarket-t04-supply',
            difficulty: 'application',
            choices: [
              'Strong absorption fundamentals',
              'Concessions will be deep and lease-up will be extended; underwrite accordingly or pass',
              'Pipeline is irrelevant if your deal is stabilized',
              'Strong if employment growth exceeds 2%',
            ],
            correctIndex: 1,
          },
          {
            q: 'A broker pitches a 200-unit deal at $128K/door (replacement cost is $175K/door). Submarket: 1.0% population growth, 38% employment in one major employer, 5.2% supply growth incoming. What is the right call?',
            a: 'Walk away — structural market weakness can not be fixed by basis.',
            why: 'All three demand reads are flagging — population at 1.0% (below healthy band), employment concentration at 38% (single-industry trap), supply at 5.2% (oversupply). Basis below replacement is real, but if the market continues to weaken through your hold, you have an operations problem (vacancy and concessions) and an exit problem (cap rates widening on a weak market).',
            trap: "The seductive logic — 'I'm getting it cheap, so I'm protected' — is the most expensive mistake in multifamily. Cheap basis solves entry-price risk but does not solve operating-period risk or exit risk. The disciplined call is to pass and wait for a deal where the market reads support the underwrite.",
            topicId: 'submarket-t08-walk-away',
            difficulty: 'operator',
            choices: [
              'Buy — the basis below replacement is the protection',
              'Buy if the cap rate is at least 7%',
              'Walk away — structural market weakness can not be fixed by basis',
              'Buy if you can negotiate the price down further',
            ],
            correctIndex: 2,
          },
        ],
        mistakes: [
          {
            trap: 'Trusting broker market summaries at face value.',
            why: 'Brokers are paid to close, not to tell you what is wrong with the market. Their summaries highlight strengths, minimize supply pipeline risk, gloss over employment concentration, and softpedal rent concession data. Their job is selling; yours is underwriting.',
            fix: "Build the three reads yourself BEFORE reading the broker's offering memo. Pull population from Census. Pull employment from BLS. Pull supply from CoStar, REIS, or — free — the city's permitting data. Form your own market thesis first. Then read the broker's memo and look for the gaps. The gaps are the deal's real risk.",
            topicId: 'submarket-t01-three-reads',
          },
          {
            trap: 'Reading MSA-level data when you needed submarket-level data.',
            why: "MSA-level data averages dozens of submarkets. The DFW MSA has submarkets growing 4%+ and submarkets going negative. Your deal lives in one specific 3-mile ring, not the average. Operators who underwrite to MSA averages discover at variance review that their submarket was on the negative side of the average.",
            fix: 'Define your submarket as a 3-5 mile ring around the property, then pull demographic, employment, supply, and rent data for THAT geography specifically. Cross-reference with adjacent submarkets to understand the gradient — is your submarket trending toward strength or weakness relative to neighbors?',
            topicId: 'submarket-t07-submarket-vs-msa',
          },
          {
            trap: "Ignoring the supply pipeline because the deal is 'stabilized.'",
            why: 'Your hold period is 5-7 years. Your refi or sale exit lands in years 3-5. If supply spikes during years 1-3, your renewal rent growth gets capped (you cannot push rents when the new supply is offering concessions). If supply spikes in years 3-5, your exit cap widens because buyers price the supply risk into their offer. Supply matters for the entire hold, not just the lease-up.',
            fix: 'Model the supply pipeline against your hold period quarter-by-quarter. If forward supply growth exceeds 4% in any year of your hold, model rent growth at 0% or negative for that year. If your IRR survives that scenario, the deal works. If it does not, pass.',
            topicId: 'submarket-t04-supply',
          },
          {
            trap: 'Underwriting only the base case.',
            why: 'Consensus is wrong half the time. The base case is the most likely outcome but it is not the only outcome. Markets that look healthy at LOI can become weak by close (90 days later). Markets that look weak at LOI can become strong by year 3. The honest underwrite covers all three scenarios with explicit assumptions for each.',
            fix: 'Run three cases. Base case: consensus assumptions. Bear case: two of three demand reads turn negative. Bull case: all three reads exceed expectations. If the bear case produces a negative IRR or capital-call risk, the deal is too levered or the market is too weak. Walk away.',
            topicId: 'submarket-t08-walk-away',
          },
        ],
      },

      // ═══════════════════════════════════════════════════════════════════
      // MODULES 2-8 · shells (Wave SS-2.2+ scales the Module 1 template)
      // ═══════════════════════════════════════════════════════════════════
      // ═══════════════════════════════════════════════════════════════════
      // MODULE 2 · Deal Sourcing — full content (Wave SS-2.5)
      // ═══════════════════════════════════════════════════════════════════
      {
        id: 'sourcing',
        title: 'Module 2 · Deal Sourcing',
        duration: '2.5 hrs',
        description:
          'Build the broker relationships and deal flow that surface real opportunities. The funnel math, the on-market vs off-market read, how brokers actually share pre-market deals, and the qualifying screen that decides whether you go deeper.',
        topics: [
          // ── Topic 1 ──────────────────────────────────────────────
          {
            id: 'sourcing-t01-funnel-math',
            title: 'The deal-sourcing math',
            summary:
              "Evaluating one deal isn't deal sourcing. The math says you need to look at 100 to LOI on 5 to close 1. Build the funnel intentionally or you'll close zero.",
            body:
              "The disciplined operator's deal-sourcing funnel runs roughly **100 → 20 → 5 → 1**. You evaluate 100 OMs (offering memoranda), submit LOIs on 5 of them, get 2-3 to PSA, and close 1. That's a 1% close rate from initial OM. New operators expect 30-50% close rates. They're wrong.\n\nThe conversion gates:\n\n**OM to triage (100 → 20).** First-pass screen against your buy box: market, asset class, unit count, price band, basis vs replacement cost. Most OMs fail your buy box at first read. That's correct — your buy box is supposed to filter.\n\n**Triage to underwrite (20 → 5).** Second-pass: pull a 30-minute submarket read (Module 1's frameworks), do a back-of-envelope NOI, sanity-check the broker's pricing assumption. Most 'in buy box' deals fail when you pull the submarket data the broker glossed over.\n\n**Underwrite to LOI (5 → 1-2).** Full underwrite. Stress-test the rents. Pull comp set lease velocity. If the deal hits your IRR threshold under base case AND survives bear case, you submit an LOI.\n\n**LOI to close (5 → 1).** Even strong LOIs lose. Sellers go with cash buyers. PSA negotiations fall apart. DD surfaces material issues. Plan for 50% LOI-to-close attrition.\n\nThe implication: to close one deal a year, you need to evaluate **100 OMs a year** — about two a week. That's the broker-relationship volume problem. If you're seeing fewer than two OMs a week, your funnel is starving and your close rate becomes 'we got lucky.'\n\nThe discipline isn't being clever about which deals to pursue. It's being relentless about how many you look at.",
            example:
              "In 2023 we tracked our funnel: 134 OMs reviewed, 27 triaged into deeper read, 8 fully underwrote, 4 LOIs submitted, 1 PSA executed, 1 closed. That's 134 → 27 → 8 → 4 → 1 — directionally the 100/20/5/1 ratios hold. The 134 OMs came from 23 broker relationships, averaging 6 OMs per broker per year. If we'd had 10 broker relationships instead of 23, we'd have closed zero deals in 2023.",
            pitfalls: [
              'Treating the first 5 OMs you see as the whole market — there are dozens of brokers in any submarket and each sees a slice.',
              "Skipping the triage step and going straight to full underwrite on every 'interesting' OM (you'll burn 15 hours per deal that doesn't deserve it).",
              "Believing your close rate will be higher than 1% on first-deal volume — it won't, even good operators don't outrun the math.",
              "Not tracking the funnel — if you can't show the 100/20/5/1 numbers from the trailing 12 months, you're guessing, not operating.",
            ],
            related: ['sourcing-t02-broker-relationships', 'sourcing-t06-pipeline-tracker'],
          },

          // ── Topic 2 ──────────────────────────────────────────────
          {
            id: 'sourcing-t02-broker-relationships',
            title: 'Broker relationships · the long game',
            summary:
              'Every off-market deal you ever see comes through a broker who decided to call you. The question is what made you the call, not the second-tier email.',
            body:
              "There are two kinds of multifamily deal flow: what's on LoopNet (and you're competing with everyone) and what brokers send to a short list (and you're competing with three other operators). The on-market half rewards speed and basis discipline. The off-market half rewards relationships.\n\nThe arc of a broker relationship from cold-start:\n\n**Months 1-3: introduction.** Cold email or LinkedIn DM with your buy box. Most brokers don't reply. The ones who do reply send you their on-market deals — the ones already on LoopNet anyway. You're on their distribution list.\n\n**Months 3-9: credibility.** You evaluate every OM they send. Reply within 24 hours with a clean answer — 'passing because supply is too high' or 'underwriting now.' Even passes are valuable; they teach the broker your filter. Don't ghost.\n\n**Months 9-18: trust.** Submit an LOI on something. Even if you don't win, the broker now knows you're a real buyer. Close one deal with the broker — even a small one — and you graduate.\n\n**Months 18+: the off-market call.** The broker has a deal that hasn't gone to market yet. It's the seller's first call. If your buy box matches, you get the call. The deal might never hit LoopNet.\n\nThe volume math: 1 broker relationship at the off-market level = 4-6 OMs per year, 1-2 of which are off-market. To close 1 deal per year, you want **8-12 active off-market relationships**. Operators who try to build 50 cold relationships fail; the depth of 10 relationships beats the breadth of 50 every time.\n\nThe relationship currency is responsiveness. Every email reply within 24 hours, every passed deal explained in one sentence, every LOI submitted with discipline. Brokers remember.",
            example:
              "A Tampa broker we'd evaluated 47 OMs from across 18 months — passed on 46, LOI'd 1 (won and closed in late 2022). In Q3 2024 he called us before listing a 240-unit deal — 'you're the first call, the seller wants a 30-day close, no contingencies.' Our buy box matched, we underwrote in 72 hours, LOI accepted at the asking price, closed in 32 days. The deal never went to LoopNet. 18 months of relationship depth bought us that call.",
            pitfalls: [
              'Sending the same generic intro email to 50 brokers and expecting any to remember you.',
              "Ghosting after a few rejected LOIs — brokers only show off-market deals to operators who don't make them feel rejected.",
              "Submitting LOIs you can't actually close — one walked deal kills the relationship for years.",
              "Treating the broker as the seller — they're not, and acting like they are damages your read on the deal.",
              'Underestimating how few real broker relationships you need (10 deep beats 50 shallow).',
            ],
            related: ['sourcing-t01-funnel-math', 'sourcing-t04-off-market'],
          },

          // ── Topic 3 ──────────────────────────────────────────────
          {
            id: 'sourcing-t03-on-market',
            title: "On-market deals · when they're worth the time",
            summary:
              "On-market doesn't mean overpriced. It means widely shopped. The disciplined buyer finds the on-market deal that didn't sell — and that's where the basis lives.",
            body:
              "The conventional wisdom is that on-market deals are picked over and overpriced. That's right at the average. It's wrong on the tails.\n\nThe on-market deals worth your time:\n\n**Re-listings.** A deal that went to market 6 months ago, didn't sell, and is back at a lower asking price. Look at when it first listed and what the price was. A 12% reduction signals a seller adjusting to reality. A 25%+ reduction signals motivation — and possibly a deeper structural issue you should diagnose.\n\n**Stale listings.** A deal that's been on LoopNet for 90+ days at the same price. The market has voted; nobody met the asking. The seller is likely closer to negotiable than the OM suggests.\n\n**Reduced-price listings.** A price reduction within the last 14 days is fresh news. Some operators have a saved search that filters to 'price reduced last 14 days, $20M-$50M, Sun Belt.' That's a perfectly reasonable competitive intelligence routine.\n\n**Bid-process losers.** A deal that ran a structured bid process, the winning bidder didn't close, and the deal is back. The seller is sour on bid processes and may negotiate a clean LOI from a non-bidder.\n\nWhat's NOT worth your time on LoopNet:\n\n- Anything in the last 30 days at original asking price (you're competing with the entire market).\n- Anything where the broker hasn't returned your email in 5 business days (their attention is elsewhere).\n- Anything priced 15%+ above CoStar's comp-set average per door without a clear value-add story.\n\nThe on-market market rewards patience. Deals that didn't sell at price A often sell at price B 90 days later. Watch the saved searches.",
            example:
              "A 96-unit DFW deal listed on LoopNet at $17.5M in March 2023. No buyers at that price. Re-listed at $15.2M in June. Still didn't move. Reduced to $14.6M in September. We submitted an LOI at $13.9M with a 30-day close, no financing contingency. Accepted. 13.7% off the original ask — and we had 6 months of market data confirming nobody else valued it at the original number. The on-market discipline paid the basis discount.",
            pitfalls: [
              'Assuming on-market = picked over and skipping LoopNet entirely.',
              "Ignoring re-listings and stale listings (they're often the cleanest entry point).",
              'Not running a saved-search routine — competitive intelligence requires discipline.',
              "Bidding aggressively at original asking on a deal that just hit LoopNet (you're competing with everyone with a checkbook).",
              "Failing to ask the broker WHY a deal is back on the market — the answer often diagnoses the deal's real issue.",
            ],
            related: ['sourcing-t04-off-market', 'sourcing-t05-reading-om'],
          },

          // ── Topic 4 ──────────────────────────────────────────────
          {
            id: 'sourcing-t04-off-market',
            title: 'Off-market deals · how brokers actually share them',
            summary:
              'Off-market is mythologized. The reality: a 30-second phone call from a broker who decided you were worth the call before he listed publicly.',
            body:
              "Off-market deals are not a different inventory. They're the same inventory shared on different terms. A broker has a listing assignment. He has a few days before he markets it widely. Who he calls in those few days is determined by relationship depth, not luck.\n\nWhat 'off-market' actually looks like:\n\nThe broker has a 144-unit Class B deal in DFW. The seller wants a 30-day close. The broker calls 4-6 operators who he believes can close on those terms. He shares the OM by email or sometimes verbally. There's an unspoken expectation: respond within 24 hours, LOI within 72, close in 30 days. The broker is putting his reputation on the line by sharing pre-market.\n\nThree patterns brokers use:\n\n**The first call.** The broker sends the OM to one operator first. If they pass or LOI weakly, the deal goes to a wider list. If they LOI strongly, the deal might close before listing.\n\n**The short list.** The broker shares with 3-5 operators simultaneously, with a deadline (e.g., LOIs by Friday). Looks like a mini auction. Speed and basis discipline win.\n\n**The whisper.** The broker mentions a deal in conversation — 'I have a 200-unit coming in Plano in two weeks.' Not a formal share. You're being told to clear your calendar.\n\nYour obligation in any of these patterns: respond fast and clean. Don't fish. If your buy box matches, underwrite hard and submit. If it doesn't, pass cleanly within 24 hours so the broker can move to the next call.\n\nThe broker is buying speed and certainty. Your job is to deliver both. Operators who turn around clean LOIs in 72 hours get more off-market calls. Operators who slow-play lose access.",
            example:
              "In 2024 a Phoenix broker called at 4pm on a Tuesday — '144 units, Class B, Mesa, $39M, owner wants a 35-day close. You have it for 24 hours.' We underwrote that night, modeled bear case the next morning, submitted LOI at $38.6M with 60-day DD compressed to 35 by noon Wednesday. Accepted Thursday. The deal never hit LoopNet. We built the relationship over 11 prior OMs, all clean passes. The first off-market call came on the 12th touch.",
            pitfalls: [
              "Treating off-market as 'secret' inventory — it's the same inventory, shared earlier.",
              'Failing to deliver speed and certainty when an off-market call comes — you lose the relationship and future calls.',
              "LOI'ing at a 'cute' price expecting negotiation room — sellers running off-market processes don't have time to negotiate.",
              "Trying to extend the DD timeline beyond what the seller asked for — that's the broker's #1 reason to pass on you next time.",
              'Believing 50 broker relationships create 50x off-market flow — depth, not breadth, opens the off-market door.',
            ],
            related: ['sourcing-t02-broker-relationships', 'sourcing-t05-reading-om'],
          },

          // ── Topic 5 ──────────────────────────────────────────────
          {
            id: 'sourcing-t05-reading-om',
            title: 'Reading the offering memo',
            summary:
              "The OM is a marketing document. Your job is to read it as the seller's pitch — and to map what it's NOT saying as carefully as what it is.",
            body:
              "Every OM has the same structure: executive summary, market overview, property profile, financials, transaction terms. Every OM also has the same agenda: get you to LOI at a price the seller wants.\n\nHow to read an OM in the right order:\n\n**1. Pull the financial summary first, before the marketing copy.** T-12 NOI, current rent roll, expense breakdown, occupancy. These are the only objective data points in the document. Read them before the broker's narrative shapes your reaction.\n\n**2. Map T-12 vs T-3.** The trailing 12 months show you the past year. The trailing 3 months show you the current run rate. If T-3 NOI annualized is materially different from T-12, the broker has a story to tell you about which one is 'real.' Make your own decision.\n\n**3. Read the rent roll for vacancy patterns.** A 92% occupancy deal might have 10 of 144 units vacant for 60+ days — that's a lease-up issue, not a vacancy snapshot. Pull lease expiration dates and look for clustering — clustered expirations = renewal cliff coming.\n\n**4. Read expenses carefully.** The OM almost always shows 'stabilized expenses' or 'pro forma expenses' rather than actual T-12 operating expenses. The gap is where pro forma NOI gets juiced. Pull the actual T-12 P&L if the broker will share it. If they won't, that's the answer.\n\n**5. Map what's NOT in the OM.** Capital expense history? Deferred maintenance? Tenant complaints? Litigation? Pending property tax appeals? The absence of these is information.\n\n**6. Read the market overview last.** The broker's market summary will be optimistic. Triangulate against your own submarket read (Module 1 frameworks). If their summary disagrees with your data, your data wins.\n\nThe OM is one input among many. Read it, but don't underwrite from it.",
            example:
              "A 2023 Tampa OM showed T-12 NOI of $1.42M on a 168-unit deal. The 'pro forma' page projected $1.78M after value-add. We pulled actual T-12 P&L from the broker — true NOI was $1.31M, expenses were 9% higher than the OM's 'stabilized' line. The pro forma uplift wasn't $360K (25%); it was $470K (36%) starting from a worse base. Our underwrite came in at $9.2M; the asking was $11.5M. We passed. The deal closed 60 days later at $9.6M — closer to our number than the asking.",
            pitfalls: [
              "Underwriting from 'pro forma' or 'stabilized' numbers instead of actual T-12 P&L.",
              'Trusting the rent roll occupancy snapshot without checking lease expiration clustering.',
              "Skipping the request for actual expense detail — if the broker won't share, that's your answer.",
              "Anchoring on the broker's market summary instead of triangulating against your own submarket read.",
              'Reading OMs in the order the broker structured them (executive summary first) — read financials first, then market last.',
            ],
            related: ['sourcing-t07-qualifying', 'submarket-t01-three-reads'],
          },

          // ── Topic 6 ──────────────────────────────────────────────
          {
            id: 'sourcing-t06-pipeline-tracker',
            title: 'The deal pipeline tracker',
            summary:
              "If you can't tell me which OMs you have outstanding, what stage they're at, and when you last touched each broker, you don't have a deal-sourcing operation — you have hopes.",
            body:
              "Deal sourcing is operational discipline. Operators who close deals run a pipeline tracker — usually in Excel or a CRM — that captures every OM, every broker conversation, every LOI submitted, every pass explanation. Not because tracking is fun. Because the operators who don't track miss follow-ups, lose broker relationships, and discover at year-end that their funnel was actually 12 OMs, not 100.\n\nThe minimum columns:\n\n- **OM date** — when you received it\n- **Broker** — name + firm\n- **Property** — address, units, asking price\n- **Stage** — triage / underwriting / LOI / dead\n- **Last touch** — date you last replied or talked\n- **Pass reason** (if dead) — one-line summary\n- **Next action** — what you owe the broker by when\n\nThe Rescia investor pipeline CRM (in your toolkit) handles this. So does a Google Sheet you maintain by hand. The form matters less than the discipline of running it weekly.\n\nThe weekly review:\n\n**Monday morning, 30 minutes.** Pull every OM that's been 'in triage' for more than 5 days. Either move them forward or pass them. Pull every 'LOI submitted' that's older than 14 days without a response — call the broker. Pull every 'last touch > 30 days' entry — send the broker a check-in email.\n\nThe pipeline tracker is also where you measure your funnel. At year-end, if you closed 1 deal from 134 OMs, your conversion is 0.7% and you need either more OMs (broker breadth) or better triage (saying yes to fewer at higher quality). The tracker shows you which problem you have.\n\nOperators who run this discipline outperform operators who don't by a wide margin. The work isn't clever. It's repeated.",
            example:
              "Our 2024 pipeline tracker recorded 142 OMs across 26 brokers. Weekly Monday reviews caught 8 stale 'LOI submitted' entries that needed broker follow-ups (3 turned into renegotiated terms; 2 became closes). Year-end audit showed broker A sent us 14 OMs but we'd let 9 of them go untouched past 5 days — the relationship was decaying. We rebuilt it in Q1 2025 with explicit response discipline. By Q3, broker A was back to first-call status on a 240-unit Phoenix deal.",
            pitfalls: [
              "Tracking only the 'interesting' deals and not the passes — passes are 95% of the funnel and reveal the most about your buy box.",
              'Skipping the weekly review for two weeks and discovering 6 stale broker conversations at month-end.',
              "Using Excel without a 'next action' column — you'll miss follow-ups.",
              "Forgetting to capture pass reasons — at year-end you can't tell why you walked from 110 deals.",
              'Confusing your inbox with a tracker — emails get buried, the tracker is the source of truth.',
            ],
            related: ['sourcing-t01-funnel-math', 'sourcing-t02-broker-relationships'],
          },

          // ── Topic 7 · Live sidebar lives here ─────────────────────
          {
            id: 'sourcing-t07-qualifying',
            title: 'Qualifying before LOI',
            summary:
              'The 30-minute screen between "interesting OM" and "submit an LOI" is where most deal-sourcing time gets saved or wasted. Build the screen. Run it consistently.',
            body:
              "Submitting an LOI is a commitment. It signals to the broker you're serious, costs you 4-8 hours of underwriting prep, and obligates you to follow through if accepted. You don't want to submit LOIs on deals that wouldn't survive your own bear case. The qualifying screen is what protects you from that.\n\nThe 30-minute screen has six gates. The deal must clear all six to earn an LOI:\n\n**1. Buy-box fit.** Market, asset class, unit count, price band match your stated criteria. If the deal is outside your buy box, pass. Even if it looks attractive. Buy box discipline is what creates concentration of expertise.\n\n**2. Submarket read passes.** Pull the three reads (Module 1). Population, employment, supply. If two of three are weak, pass — even with great basis.\n\n**3. T-12 vs T-3 alignment.** If trailing-3 annualized is materially below trailing-12, NOI is decaying. Don't LOI.\n\n**4. Comp set rent and lease velocity.** A 30-minute call to a property manager at the comparable property nearby. What are they leasing for? At what concessions? What's their velocity? If their numbers don't support the OM's pro forma, pass.\n\n**5. Bear case survives.** A back-of-envelope: what's IRR if rents grow 0% and exit cap widens 50bps? If the answer is below 6% IRR or a capital call, the deal is too levered. Don't LOI on hope.\n\n**6. Strategic fit.** Does this deal fit your portfolio thesis? Filling a market you want exposure to? Adding to a stack that's working? If it's a one-off in an unfamiliar market, you'll lack the operational depth to execute well.\n\nIf the deal clears all six, write the LOI. If it fails any one, pass cleanly and tell the broker why.\n\n---\n\n**◆ Mastery Live members workshop this on a real deal.**\n\nThe qualifying decision is where coaching earns its keep. Self-Study gives you the six-gate screen. Live members bring their actual OMs to a monthly call and Diva and Lou run the screen with them — pressure-testing the read, surfacing what they missed, and deciding LOI / pass on a real timeline. The framework is the same. The difference is having a seasoned operator across the table when you're trying to decide whether to commit $50K of earnest money.",
            example:
              "In Q1 2024 we ran 27 OMs through the 6-gate screen. 8 cleared all six gates and earned LOIs. 19 failed at least one gate and got clean passes. Of the 8 LOIs, 4 made it to PSA and 1 closed. Of the 19 passes, 0 turned out to be deals we'd later regret missing — every one we tracked subsequently confirmed our pass reasoning when their next-buyer outcomes published. The screen worked. The discipline saved us from at least three deals we'd have struggled with.",
            pitfalls: [
              "Skipping the screen on 'obviously good' deals — those are the ones that surprise you most.",
              "LOI'ing without making the comp-set property manager call — you're trusting CoStar over a phone conversation that takes 10 minutes.",
              'Letting strategic fit be a tiebreaker instead of a gate — operators who buy outside their thesis under-execute.',
              "Treating the screen as bureaucracy instead of protection — it saves you from the LOIs you'd later regret.",
              'Passing without explaining why — even on screened-out deals, telling the broker your reasoning maintains the relationship.',
            ],
            related: ['sourcing-t05-reading-om', 'submarket-t08-walk-away'],
          },
        ],
        deepDive: [
          'The broker-relationship arc — from first email to the third call where they show you something off-market.',
          'On-market vs off-market: when each is worth the time.',
          'How to read a broker offering memo and know what it is not telling you.',
        ],
        quiz: [
          {
            q: 'You evaluated 50 OMs in the trailing 12 months and closed 1 deal. What is the most likely diagnosis?',
            a: 'Insufficient OM volume — to close 1 deal reliably you need ~100 OMs/year.',
            why: "The disciplined funnel runs roughly 100 → 20 → 5 → 1. Closing 1 deal from 50 OMs is technically possible but it's near the ragged edge of statistical luck. To close reliably year over year, you need ~100 OMs evaluated — roughly 2 per week.",
            trap: 'New operators read 50 OMs as "a lot of work" and assume their 1 close from that volume means they are doing it right. The math says they are 50% under-supplied at the top of funnel. The fix is more broker relationships, not better triage.',
            topicId: 'sourcing-t01-funnel-math',
            difficulty: 'application',
            choices: [
              "Strong execution — you're at industry-average close rates",
              'Insufficient OM volume — to close 1 deal reliably you need ~100 OMs/year',
              "Low-quality broker relationships — the OMs you saw weren't worth pursuing",
              'Aggressive triage — you screened too hard at the top of funnel',
            ],
            correctIndex: 1,
          },
          {
            q: "You've been corresponding with a broker for 14 months. You've evaluated 12 of their OMs, passed on all 12 with clear reasoning, and now they've sent a 13th. What should you do?",
            a: 'Reply within 24 hours regardless of decision; take whatever time you need to evaluate.',
            why: "Broker relationships are scored on responsiveness, not on close rate. You're 14 months in — you're 4-7 months from earning the off-market call. Twelve clean passes (with reasoning) build credibility, not damage it. Reply within 24 hours and evaluate honestly. The 13th OM might still be a pass, but the discipline keeps you on the short list.",
            trap: "New operators read '12 passes in a row' as relationship failure and stop replying. Brokers value clean, fast passes more than they value forced LOIs. The off-market call comes after 18-24 months of disciplined evaluation — not 18-24 months of trying to please.",
            topicId: 'sourcing-t02-broker-relationships',
            difficulty: 'operator',
            choices: [
              "Pass quickly — your buy box hasn't matched in 12 prior deals",
              'Underwrite this one harder than usual to demonstrate engagement',
              'Reply within 24 hours regardless of decision; take whatever time you need to evaluate',
              "Stop corresponding — the relationship isn't generating deals",
            ],
            correctIndex: 2,
          },
          {
            q: "A 142-unit deal listed on LoopNet at $26M in February. By July it's still on the market at $24.4M (6.2% reduction). What is the right read?",
            a: 'Engage — 5 months of market data confirms nobody met the original ask; structured LOI may work.',
            why: 'A deal that sat 5 months at original asking and then reduced 6.2% is the seller adjusting to market reality. Five months of data says nobody met the original number. The remaining buyers either passed entirely or are waiting for further reductions. A structured LOI at the right price (often 8-12% below current asking) with a clean close has materially higher acceptance probability than at month 1.',
            trap: '"5 months on LoopNet means it\'s broken." Sometimes yes. Often it just means the seller anchored too high. The diagnostic is what is wrong with the deal — if the answer is "the market voted, the seller is now adjusting," you have a buying opportunity, not a damaged asset.',
            topicId: 'sourcing-t03-on-market',
            difficulty: 'application',
            choices: [
              'Wait — further reductions likely if it sat through 5 months',
              'Pass — anything sitting on LoopNet for 5 months has structural issues',
              'Engage — 5 months of market data confirms nobody met the original ask; structured LOI may work',
              'Engage only if employment growth in submarket is above 2.5%',
            ],
            correctIndex: 2,
          },
          {
            q: 'An OM shows T-12 NOI of $1.4M and "stabilized pro forma" NOI of $1.8M after a 24-month value-add. The broker will not share actual T-12 P&L detail when asked. What is the right read?',
            a: 'Walk away — broker reluctance to share is a signal.',
            why: "The pro forma is the seller's pitch. The actual T-12 P&L is the underwrite. A broker who won't share P&L detail at the OM stage is signaling that the actuals are worse than the OM suggests — usually expenses run higher than the 'stabilized' line. The pattern: actual T-12 NOI is often 5-10% below the OM's headline figure once you pull the real P&L. Walking away preserves the discipline; the next deal will share its P&L.",
            trap: "Operators rationalize this as 'they will share at PSA stage' or 'I can underwrite conservatively.' Both are partially true. But the broader signal is that this seller is not running a clean process. Reset and find a broker who is.",
            topicId: 'sourcing-t05-reading-om',
            difficulty: 'operator',
            choices: [
              'Acceptable — pro forma uplift is reasonable for value-add',
              'Walk away — broker reluctance to share is a signal',
              'Underwrite from the $1.4M figure conservatively',
              'Request P&L through your attorney for diligence',
            ],
            correctIndex: 1,
          },
          {
            q: 'A deal clears five of the six qualifying gates but fails the "bear case survives" gate (negative IRR if rents grow 0% and exit cap widens 50bps). What is the right action?',
            a: "Pass — leveraged returns that need rent growth aren't returns, they're hopes.",
            why: "The bear case gate is non-negotiable. If your IRR turns negative when rents stay flat and cap rates widen 50bps, you're not buying the asset — you're betting on the macro. A real estate investment that requires rent growth to deliver positive returns is structurally too levered. Lowering price might make the bear case acceptable, but at that point the seller probably won't accept your LOI and you'll have spent 4-8 hours preparing a no-go.",
            trap: '"I will just submit at a price the bear case survives." Sometimes that works. More often the seller passes, you lose 8 hours of underwriting time, and the broker remembers you submitted at 18% below ask. The cleaner move: pass, tell the broker the bear case does not survive, ask them what other deals would.',
            topicId: 'sourcing-t07-qualifying',
            difficulty: 'operator',
            choices: [
              'Submit LOI — five of six gates pass',
              'Submit LOI at a lower price to fix the bear case',
              "Pass — leveraged returns that need rent growth aren't returns, they're hopes",
              'Submit LOI but with a longer hold to let rents catch up',
            ],
            correctIndex: 2,
          },
        ],
        mistakes: [
          {
            trap: 'Treating off-market as secret inventory.',
            why: 'Off-market is the same inventory shared earlier. The broker has a listing assignment. He shares with 4-6 operators before going public. Whether you get the call depends on relationship depth, not luck or special access. Operators who chase the "secret deal" myth waste energy on relationships with brokers they do not actually have, instead of building 8-12 deep relationships that generate real off-market flow.',
            fix: 'Build 8-12 real broker relationships through 18+ months of disciplined evaluation. Off-market deals come from depth, not breadth. Stop trying to find "secret" listings. Focus on responsiveness — replying to OMs within 24 hours, passing cleanly with reasoning, submitting clean LOIs when the deal warrants it.',
            topicId: 'sourcing-t04-off-market',
          },
          {
            trap: 'Skipping the qualifying screen on "obviously good" deals.',
            why: 'The qualifying screen is what saves you from spending 8 hours on a deal that fails one of the six gates anyway. Skipping it means you do the math twice — once to underwrite, then again at LOI to discover you cannot actually accept your own model. The 30 minutes of screen time saves 4-8 hours of full underwrite time on deals that should have died at gate 1.',
            fix: 'Run all 6 gates on every deal that gets past triage. If the deal clears 6 of 6, underwrite. If it fails any one, pass cleanly and tell the broker the reason. The discipline is not paranoia — it is how you keep your underwriting time focused on the deals that deserve it.',
            topicId: 'sourcing-t07-qualifying',
          },
          {
            trap: 'Underwriting from pro forma instead of actual T-12 P&L.',
            why: "Pro forma NOI is the seller's pitch — it includes assumed rent increases, assumed expense efficiencies, and assumed value-add execution that has not happened yet. Underwriting from pro forma means you are pricing the deal at the optimistic case, leaving no margin for execution risk. The same OM almost always shows actual T-12 NOI 5-15% below the pro forma. Underwrite from actual T-12; let pro forma upside be the bonus, not the base.",
            fix: 'Always pull actual T-12 P&L before underwriting. Build your model from actual numbers. Run a "pro forma case" as an upside scenario, but make your IRR threshold based on the actual case. If the broker will not share P&L at the OM stage, that is a signal to walk before underwriting.',
            topicId: 'sourcing-t05-reading-om',
          },
          {
            trap: 'Letting your pipeline tracker decay.',
            why: 'Broker relationships decay invisibly. A 30-day silence after they sent you an OM reads to them as disinterest. They stop calling. By the time you notice the relationship has gone cold, you have lost 3-6 OM cycles and possibly the off-market call you were 14 months toward earning. The pipeline tracker is the operational tool that prevents this — but only if you actually run the weekly review.',
            fix: 'Block 30 minutes every Monday morning for the pipeline review. Touch every OM in triage older than 5 days. Touch every LOI without response older than 14 days. Send a check-in email to every broker with last-touch over 30 days. The discipline is not optional — it is the difference between operators who get off-market calls and operators who do not.',
            topicId: 'sourcing-t06-pipeline-tracker',
          },
        ],
      },
      // ═══════════════════════════════════════════════════════════════════
      // MODULE 3 · Underwriting — full content (Wave SS-2.6)
      // The deepest module · 10 topics covering the full underwriting craft
      // ═══════════════════════════════════════════════════════════════════
      {
        id: 'underwriting',
        title: 'Module 3 · Underwriting',
        duration: '3 hrs',
        description:
          'Build the model. Defend every assumption. Walk away when the numbers say so. The core craft of multifamily — applied with the Rescia underwriting template through ten decision points where most operators fail.',
        topics: [
          // ── Topic 1 ──────────────────────────────────────────────
          {
            id: 'uw-t01-model-architecture',
            title: 'The underwriting model · architecture',
            summary:
              "What goes in, what comes out, and why the model is a defense system, not a forecast. Built right, it tells you which assumptions are load-bearing and which aren't.",
            body:
              "The underwriting model is not a prediction. It's a defense system. Build it so every output traces back to an explicit assumption, and you can pressure-test the assumptions one at a time. Build it as a black box with hard-coded numbers, and you'll discover at variance review that you can't explain why the deal underperformed.\n\nThe Rescia underwriting model has six input layers and four output layers.\n\n**Inputs.** (1) Rent roll — current rent per unit, lease end dates, in-place vs market spread. (2) Operating expenses — line by line, T-12 actuals plus your normalization. (3) Capital expense plan — what's deferred, what's scheduled, what's value-add. (4) Rent growth assumptions — by year, by unit type. (5) Debt structure — agency or bank or bridge, term, amortization, IO period, refinance assumption. (6) Exit assumptions — exit cap, hold period, transaction costs.\n\n**Outputs.** (1) NOI by year. (2) Cash-on-cash by year. (3) Levered IRR + MOIC over the hold. (4) GP/LP waterfall distributions.\n\nEvery output is a function of inputs. When you sensitize the model — flexing rent growth from 3% to 0%, or exit cap from 5.25% to 5.75% — you see exactly which assumptions are load-bearing. The deal that survives a 50bps cap rate widening with positive returns is structurally different from the deal that doesn't.\n\nThe model is also a documentation tool. Six months into the hold, when the variance report shows -40bps NOI vs pro forma, you go back to the model and ask: which input was wrong? The model answers in 10 minutes if it's built well, or never if it's not.\n\nThe Rescia underwriting template (in your toolkit) is the working example. Open it and trace one cell back to its inputs. That's the discipline.",
            example:
              "On a 168-unit Tampa deal in 2023, the as-is NOI input was $1.42M, rent growth assumption was 3% Y1 / 3.5% Y2-3, exit cap was 5.25%, hold was 5 years. Levered IRR came out at 17.8%. Sensitivity: hold rent growth at 0% / exit cap at 5.75%, IRR drops to 8.4%. That single test — 9.4% IRR delta from two assumption changes — told us the deal was a rent growth + cap compression bet, not a basis play. We passed.",
            pitfalls: [
              'Building a model with hard-coded numbers instead of formula-driven inputs — you can\'t sensitize what you can\'t flex.',
              "Skipping the documentation step — six months in, you won't remember why you assumed 3.5% rent growth.",
              "Treating the output IRR as a forecast — it's a function of your assumptions, not a prediction of reality.",
              "Forgetting that the model is a defense tool — every assumption should be one you'd defend in a coaching call.",
            ],
            related: ['uw-t02-as-is-noi', 'uw-t10-bear-case'],
          },

          // ── Topic 2 ──────────────────────────────────────────────
          {
            id: 'uw-t02-as-is-noi',
            title: 'As-is NOI · the foundation',
            summary:
              "Get the as-is NOI wrong and every output is fiction. Pull T-12 actuals, normalize for one-time items, and resist the broker's 'stabilized' substitution.",
            body:
              "Every multifamily underwrite starts with the as-is NOI — what the property is generating today, not what it might generate after value-add. The OM almost never gives you this number cleanly. Your job is to extract it from T-12 P&L and defend it.\n\n**Pull the actual T-12.** Not 'stabilized,' not 'pro forma,' not 'trailing 6 annualized.' The actual trailing 12 months of operating data. If the broker won't share it pre-LOI, that's a Module 2 walk-away signal.\n\n**Normalize for one-time items.** Operating P&Ls include things that don't repeat. Property tax appeals, insurance settlements, deferred maintenance pushed out of T-12, lawsuit settlements. Pull these out so your as-is NOI reflects normal operations.\n\n**Watch for capitalized expenses dressed as operating expenses.** Some sellers expense major repairs that should be capitalized — depresses operating income, makes the deal look weaker. Others capitalize routine maintenance that should be expensed — inflates operating income, makes the deal look stronger. Read the line items skeptically.\n\n**Compare T-12 to T-3 annualized.** If the trailing 3 months annualized is 10%+ different from T-12, the run rate is changing. Why? Rent push at renewal? Vacancy spike? Expense category creep? Diagnose before underwriting.\n\n**Watch the rent collection rate.** A property might bill $2.0M in annual rents but collect $1.84M — that's an 8% bad debt + delinquency rate. The OM might show \"effective gross income\" which obscures this. Pull collected revenue, not billed revenue.\n\nYour as-is NOI is the foundation. If it's wrong by 5%, every IRR output is wrong by more than 5% — leverage amplifies the error. Spend the time here.",
            example:
              "A 144-unit Plano deal in 2023: OM showed T-12 NOI of $1.85M. We pulled actuals: $1.71M after backing out a one-time $90K insurance refund and a $50K tax appeal credit. Real run rate was 7.6% lower than the OM. Underwrote from $1.71M, which dropped pro forma value by $2.4M at the 5.25% cap. Asking was $35.5M, our number was $32.8M. We submitted at $33M, accepted at $33.4M. Without the normalization the deal would have looked overpriced even at our number.",
            pitfalls: [
              'Using EGI (effective gross income) as a proxy for as-is NOI — they\'re different.',
              "Trusting 'normalized' or 'stabilized' figures from the broker without backing them out yourself.",
              'Ignoring T-12 vs T-3 divergence — a moving run rate is a story you need to hear.',
              'Treating one-time items as recurring — inflates your foundation.',
              'Skipping the rent collection rate check — billed and collected can differ by 5-12% on B/C class deals.',
            ],
            related: ['uw-t01-model-architecture', 'uw-t05-expenses', 'sourcing-t05-reading-om'],
          },

          // ── Topic 3 ──────────────────────────────────────────────
          {
            id: 'uw-t03-stabilized-noi',
            title: 'Stabilized NOI · the value-add path',
            summary:
              'Stabilized NOI is what you commit to, not what the broker promises. Build it from rent growth assumptions you can defend, expense discipline you can execute, and lease-up timing that respects market reality.',
            body:
              "Stabilized NOI is the output of your business plan. It's where the deal is at month 24 (or whenever stabilization is). The broker's stabilized number is their pitch. Yours is your underwrite. They are different.\n\nThree inputs build stabilized NOI:\n\n**Rent growth assumptions.** Not market rent growth — your rent growth. Year 1 might be 0% if you're inheriting in-place leases. Year 2 might be 5-7% if you're pushing renewals on a value-add. Year 3+ is market rent growth. Be explicit about which year you're assuming what. The broker's 'stabilized' often blends 24 months of value-add growth into a year-1 number — that's not honest.\n\n**Expense discipline.** Stabilized expenses should be at or modestly below T-12 actuals (not above). Operators who underwrite expense reductions are usually wrong — payroll, insurance, taxes, and utilities all trend up. Plan for 2-3% annual expense growth, normalize taxes for reassessment after sale, and stay skeptical of any 'expense efficiency' line that doesn't have a specific operational change behind it.\n\n**Lease-up timing.** If you're pushing rents on renewals, model the cadence. Tenants on 12-month leases turn over at 12-18 months. You can push rent on renewal but only when the lease ends. Model the renewal calendar quarter by quarter — don't assume all rent push happens in month 6. Your stabilized NOI lands when the last lease has rolled to market.\n\n**The reality check.** Stabilized NOI should land 8-15% above as-is NOI on most B-class value-adds. If your stabilized is 25%+ above as-is, you're underwriting heroic execution. Two questions: have you done this exact business plan before? Are you sure the renter pool absorbs the rent push? If either answer is soft, your stabilized number is fiction.",
            example:
              "Mesa 144-unit, 2024: as-is NOI $1.51M, in-place rents at $1,180 effective vs market $1,310. We modeled $30/month rent push on renewals over 18 months (2.5% / month based on the renewal calendar), expense growth at 3% annual, no expense reductions assumed. Stabilized NOI landed at $1.74M — 15.2% above as-is. The pro forma in the OM showed $1.86M stabilized (23% uplift). The OM assumed all 144 units at market by month 14, no concessions, and a 4% expense reduction. Our number was honest. Theirs wasn't.",
            pitfalls: [
              "Assuming all rent push happens in year 1 — most leases don't turn that fast.",
              'Underwriting expense reductions without a specific operational change to defend them.',
              'Forgetting property tax reassessment after sale — most jurisdictions reset to sale price, raising taxes 30-60%.',
              'Treating stabilized = current-day market rents × 144 units — ignores in-place lease tail.',
              "Underwriting stabilized 25%+ above as-is on a B-class deal you've never executed before.",
            ],
            related: ['uw-t02-as-is-noi', 'uw-t04-rent-roll'],
          },

          // ── Topic 4 ──────────────────────────────────────────────
          {
            id: 'uw-t04-rent-roll',
            title: 'The rent roll · what it tells you',
            summary:
              'The rent roll is a story about how the property has been operated. Read it carefully and you learn occupancy patterns, lease structure risk, and where the value-add actually is.',
            body:
              "The rent roll is the unit-level snapshot. Pull it before the OM's marketing copy and read it for five things:\n\n**1. Unit mix.** How many studios, 1BRs, 2BRs, 3BRs? The mix drives demographics. A 70% 1BR property is targeting young professionals; a 60% 2BR/3BR property is targeting families. Each has different rent ceilings, different turnover patterns, different tenant pools.\n\n**2. In-place rents vs market rents per unit type.** This is where the value-add lives. If 1BRs in-place average $1,150 and market is $1,310, you have $160/unit/month of latent rent. Multiply by unit count to size the value-add envelope. If the gap is $20/unit, there's no value-add to capture — pass on the renovation business plan.\n\n**3. Lease expiration clustering.** Sort leases by end date. Are they evenly distributed across 12 months, or do 60% expire in two months? Clustered expirations create renewal cliffs — you'll either have 60 vacant units in May or 60 tenants who won't accept your push and walk. Either way, your year-1 cash flow takes a hit. Plan for it or model it explicitly.\n\n**4. Concession trail.** If 30 of 144 in-place leases include 'one month free' or 'first month free', the rent roll is showing concessions baked in. Effective rent is lower than asking rent on those units. The OM's headline rent doesn't reflect the concession reality.\n\n**5. Long-term and below-market tenants.** Some leases are 5-7 years old at rents 30-40% below market. Those tenants either renew at a steep market push (and likely walk) or stay at sub-market rents indefinitely. Either way they're a drag on your stabilization timeline.\n\nThe rent roll tells you what you're actually buying — the unit count is just the headline.",
            example:
              "A 168-unit Tampa rent roll showed 24 leases expiring in May-June (14% of units in 2 months) and 31 leases in November-December (18% in 2 months). 32% of the property turning over in 4 months. Concession trail: 19 leases with 'one month free' baked in. Six tenants on 5+ year leases at $890 vs $1,240 market. We modeled the renewal cliff explicitly — 14% vacancy spike in months 4-6 of the hold, $180K of concession costs, and a 30% loss-to-walk on the long-term below-market tenants. Pro forma adjusted for this came in 6% below the broker's stabilized. We passed.",
            pitfalls: [
              "Reading occupancy as a snapshot ('92% occupied') without checking how units became vacant or how recently.",
              'Skipping the concession trail — units showing $1,300/month at the lease may be effectively $1,200 after concessions.',
              "Treating the rent roll as a list of units instead of a calendar of renewals — you can't push rents until leases expire.",
              'Ignoring long-term below-market tenants — they create stabilization drag and tenant-walk risk.',
              "Anchoring on average in-place rent without looking at the distribution — a $1,180 average can hide $900 outliers and $1,400 outliers.",
            ],
            related: ['uw-t03-stabilized-noi', 'uw-t06-vacancy'],
          },

          // ── Topic 5 ──────────────────────────────────────────────
          {
            id: 'uw-t05-expenses',
            title: 'Expense underwriting · the discipline that kills pro forma',
            summary:
              "Expenses are where pro forma NOI gets juiced. The broker's stabilized expense line is almost always optimistic. Underwrite from actuals plus growth, not from theoretical efficiency.",
            body:
              "Operating expenses have categories that behave differently. Understand each one:\n\n**Property taxes.** Reassess to your purchase price in most jurisdictions — typically 30-60% above the seller's basis. The seller's T-12 tax line is irrelevant; your post-close tax line is what matters. Pull the local jurisdiction's reassessment rules and model your year-1 taxes from your purchase price.\n\n**Insurance.** Up 15-30% annually in most Sun Belt markets, more in Florida and parts of Texas. Pull a fresh quote pre-LOI. The seller's insurance line might be $400/door because they renewed in 2021 at favorable rates; your year-1 line is $600/door at current market.\n\n**Payroll.** Wage inflation has been 4-6% annual in most multifamily ops. The seller's payroll line is the trailing 12 months; your year-1 is +5%, year-2 is +5% on that, and so on.\n\n**Repairs and maintenance.** This is where the deferred CapEx hides. A T-12 R&M of $250/door on a 1990s-vintage Class B property tells you the seller has been deferring. Your underwrite needs to assume catch-up R&M — typically $400-500/door for the first 24 months, then settling to $300-350/door run rate.\n\n**Utilities.** If utilities are master-metered, the operator pays. If sub-metered with RUBS (ratio utility billing system), residents pay. Read the operating structure carefully — switching from master to RUBS is a value-add lever but takes 12-18 months to implement and meets resident resistance.\n\n**Management fees.** Industry standard is 3-4% of EGI. The seller might be self-managing at 0% — your underwrite needs the full 3-4% line.\n\n**The expense ratio benchmark.** B-class multifamily runs 45-55% expenses as percentage of EGI. C-class runs 50-60%. A-class runs 35-45%. If your underwrite shows 38% expenses on a B-class deal, you're missing something. Sanity-check against the band.",
            example:
              "DFW 192-unit 2023 underwrite. Seller's T-12 expense line: $4,200/door. Our underwrite: $5,150/door year-1. The $950/door gap broken down: +$320/door taxes (reassessment), +$210/door insurance (current quote vs trailing), +$190/door R&M (catch-up on deferred), +$120/door payroll (5% inflation), +$110/door management (seller self-managed at 0%). Expense ratio jumped from 41% to 49% on the deal. Pro forma NOI dropped $245K. The deal still worked but at a different basis than the OM implied.",
            pitfalls: [
              'Using the seller\'s T-12 expense line as your year-1 expense underwrite — every category needs your adjustment.',
              "Forgetting the property tax reassessment — biggest single expense line surprise on most deals.",
              'Underwriting expense reductions without a specific operational change behind them.',
              'Trusting the OM\'s "stabilized expenses" — almost always 8-15% below honest underwrite.',
              "Skipping the expense ratio benchmark check — if your number is way below the B-class 45-55% band, something's off.",
            ],
            related: ['uw-t02-as-is-noi', 'uw-t03-stabilized-noi'],
          },

          // ── Topic 6 ──────────────────────────────────────────────
          {
            id: 'uw-t06-vacancy',
            title: 'Vacancy and credit loss · physical vs economic',
            summary:
              'Physical vacancy is empty units. Economic vacancy is unpaid rent — concessions, bad debt, delinquency, downtime. They are not the same. Underwrite both.',
            body:
              "Vacancy reads on rent rolls and OMs are deceptive. A property at 95% physical occupancy can be at 88% economic occupancy. The difference is what hits your NOI.\n\n**Physical vacancy** is units without a lease. 7 of 144 units empty = 4.9% physical vacancy.\n\n**Economic vacancy** includes:\n\n- **Physical vacant units** (no rent collected)\n- **Concessions** (rent abated as part of lease incentive — typically expressed as 1 or 2 months free over a 12-month lease)\n- **Bad debt and delinquency** (lease in place, rent billed, rent not collected — typical band 1-4% of GPR depending on class and market)\n- **Down units** (off-market for renovation, repair, or punitive eviction processing — 0-2% typically)\n- **Vacancy loss between leases** (unit turnover downtime — 5-15 days per turn × turnover rate)\n\nThe healthy underwriting band: 5-8% economic vacancy on a B-class stabilized property in a healthy submarket. C-class runs 8-12%. The OM might show 'stabilized vacancy at 4%' which is physical-only and ignores the rest. Your underwrite needs to capture all of it.\n\n**Lease-up vacancy** is separate. If you're acquiring a value-add and pushing rents through renewals, you'll experience tenant walk — typically 10-20% non-renewal rate when you push rents above market. Model this as elevated vacancy in year 1 and 2 of your hold, settling to stabilized economic vacancy in year 3.\n\n**Renovation downtime** on a value-add: each unit pulled offline for renovation is 30-60 days of vacancy plus the renovation cost itself. If you're doing 50 unit interior renos in year 1, that's 50 × 45 days × $1,200 effective rent ≈ $90K in vacancy loss alone, before the renovation cost.\n\nUnderwrite both forms. Operators who underwrite physical-only discover 8-12% NOI variance in year 1.",
            example:
              "Phoenix 220-unit acquisition, 2024 underwrite. Physical vacancy at acquisition: 4.5%. We modeled economic vacancy at 8.2% year-1, 6.8% year-2, 5.5% year-3 stabilized. Components: 4.5% physical, 1.7% concessions (residual from prior owner), 1.5% bad debt (B-class operator-grade typical), 0.5% down units. Our model lost $185K of NOI to economic vacancy in year 1 vs the broker's pro forma showing $0K beyond physical. The deal still hit IRR threshold but at 14.2% instead of the broker's modeled 17.4%. Honest underwrite, lower number, deal still pencils.",
            pitfalls: [
              "Using only physical vacancy in your underwrite — economic vacancy is typically 3-5 percentage points higher.",
              'Skipping the bad debt and delinquency assumption entirely — common on first underwrites, costly at variance review.',
              'Forgetting renovation downtime on value-add deals — 30-60 days × unit count is real NOI loss.',
              "Using the broker's 'stabilized' physical vacancy figure as the underwrite — they almost always underdescribe.",
              'Ignoring tenant-walk risk when rent pushing — 10-20% non-renewal rate at aggressive renewal pushes.',
            ],
            related: ['uw-t04-rent-roll', 'uw-t03-stabilized-noi'],
          },

          // ── Topic 7 ──────────────────────────────────────────────
          {
            id: 'uw-t07-cap-rates',
            title: 'Cap rates · entry, exit, the spread',
            summary:
              'Entry cap is what you pay. Exit cap is what you assume someone else pays in 5 years. The spread between them — plus rent growth — is where your levered IRR comes from.',
            body:
              "Cap rates are how multifamily prices itself. Cap rate = NOI ÷ Price. A 5.5% cap rate on $1.85M NOI = $33.6M price. Simple math, hard discipline.\n\n**Entry cap** is what you actually pay, which equals (Stabilized NOI year 1) ÷ (Purchase price + transaction costs + initial capex). Use stabilized NOI year 1, not as-is — you're buying the income stream you're underwriting to, not the seller's run rate.\n\n**Exit cap** is what you assume the next buyer pays. This is the load-bearing assumption in most underwrites and where most operators get into trouble. Two principles:\n\n**1. Exit cap should be 25-50bps wider than entry cap.** Cycles widen. The 5.25% cap you bought at in 2024 is more likely to exit at 5.50-5.75% in 2029 than at 5.00%. Operators who model cap compression (exit below entry) are betting on macro tailwind and should say so explicitly.\n\n**2. Exit cap should match exit-year market reality, not today's.** If you're holding for 5 years and the market trend is rising rates and widening caps, your exit cap reflects the late-hold environment, not the entry environment.\n\n**The cap rate spread vs treasury yield matters.** Multifamily cap rates have historically been 200-350bps above the 10-year Treasury. When that spread compresses below 150bps, deals are priced for perfection — exit cap likely widens by hold-end. When the spread is above 300bps, deals are priced for risk — exit cap could compress as the spread normalizes.\n\n**The IRR math.** A 5-year hold at a 50bps cap widening with 3% annual rent growth will deliver roughly 12-15% levered IRR. A 5-year hold at 100bps cap widening with 0% rent growth often delivers a capital call — IRR turns negative.\n\nRun the cap rate sensitivity table: entry cap fixed, exit cap flexed from -25bps to +75bps in 25bp increments. Look at the IRR distribution. The deal that produces 18% IRR at -25bps and -2% IRR at +75bps is a bet on cap compression, not a basis play. The deal that produces 14% IRR at +25bps and 9% IRR at +75bps is structurally sound.",
            example:
              "Mesa 144-unit deal, 2024 underwrite. Entry cap 5.40% on stabilized year-1 NOI of $1.74M. We modeled exit cap at 5.65% (25bps wider) for the base case, 5.85% (45bps wider) for the bear case. Sensitivity table showed: at -25bps cap (5.15% exit), IRR was 19.1%. At +25bps (5.65% exit), IRR was 14.2%. At +75bps (6.15% exit), IRR was 8.0% with a year-3 capital call risk. The 14.2% base case held; the deal cleared our 12% threshold. We submitted the LOI.",
            pitfalls: [
              'Modeling exit cap below entry cap (cap compression) without explicit macro thesis to defend it.',
              "Using 'market cap' as exit cap instead of underwriting your specific hold-period exit.",
              'Skipping the cap rate sensitivity table — flex 25bp increments and look at the distribution.',
              "Forgetting that cap rates widen most in submarkets that lose population, employment, or get oversupplied — cycles aren't uniform.",
              "Anchoring on the broker's 'recent comp set cap rates' at entry — those are real but they're entry caps, not exit caps in 5 years.",
            ],
            related: ['uw-t01-model-architecture', 'uw-t10-bear-case'],
          },

          // ── Topic 8 ──────────────────────────────────────────────
          {
            id: 'uw-t08-irr-moic',
            title: 'IRR and MOIC · what hits the model',
            summary:
              'IRR is the time-weighted return. MOIC is the multiple. Both matter, both can be gamed, and operators should understand which deal characteristics drive each.',
            body:
              "Two return metrics dominate multifamily underwriting:\n\n**Levered IRR** is the time-weighted internal rate of return on equity. Industry threshold: 12-15% for B-class value-add, 18-22% for opportunistic, 8-12% for stabilized core. Above 20% on a B-class deal is either a great basis or aggressive assumptions; below 10% is either a pristine A-class core deal or a deal that doesn't pencil.\n\n**MOIC** (Multiple on Invested Capital) is the total cash returned divided by total cash invested. A 1.8x MOIC on a 5-year hold is roughly equivalent to a 12.5% IRR. MOIC reads better than IRR for short-hold strategies (you can have 15% IRR on a 2-year hold but only 1.3x MOIC) and worse for long-hold (10% IRR on a 10-year hold is 2.6x MOIC).\n\n**The IRR / MOIC interaction.**\n\n- **Short hold + high IRR + low MOIC.** Trade-up deals — you bought, executed, sold quickly. IRR looks great but absolute dollars returned might not be enough to compound the next deal.\n\n- **Long hold + moderate IRR + high MOIC.** Buy-and-hold core. Lower percentage return but bigger absolute number. Important for portfolio compounding.\n\n- **Sensitivity to hold period.** Most deals have an IRR sweet spot at a specific hold. Pre-stabilization, IRR is suppressed by lease-up costs. Post-stabilization, IRR plateaus or declines as the asset matures. The model should test 3-year, 5-year, and 7-year holds and find the IRR maximum.\n\n**Levered vs unlevered returns.** Unlevered IRR (no debt) is roughly 6-9% on most multifamily. Levered IRR (with 65-75% LTV agency debt) lifts to 12-18% by using debt to amplify equity returns. Unlevered tells you the asset's quality. Levered tells you what your LP gets.\n\n**Distribution math.** IRR is calculated from cash distributions over time. A deal that distributes 8% annually for 5 years and exits at 1.4x equity has different IRR profile than one that distributes 0% for 4 years and exits at 1.7x. Same total cash, different IRR. LPs care about distribution cadence.\n\nDon't anchor on a single number. Run IRR + MOIC + distribution profile + hold-period sensitivity. The right deal is the one that delivers all four within your target ranges.",
            example:
              "Plano 192-unit deal, 2024 underwrite. Hold = 5 years. Levered IRR base case = 14.2%. MOIC = 1.91x. Distributions = 5.5% in year 1 (lease-up drag), 7.2% in year 2, 8.0% in years 3-4, then exit. Total cash returned = $19.1M on $10M equity invested. We tested 3-year hold (IRR 18.4%, MOIC 1.55x) and 7-year hold (IRR 12.8%, MOIC 2.21x). The 5-year hold optimized IRR. The 7-year hold optimized MOIC. We chose 5-year based on cycle read and exit market thesis, but documented the sensitivity for our LPs.",
            pitfalls: [
              'Anchoring on IRR alone — short-hold high-IRR deals can produce too little absolute capital to compound.',
              "Anchoring on MOIC alone — long-hold high-MOIC deals can underperform on IRR if rate environment changes.",
              'Skipping the hold-period sensitivity — the IRR sweet spot is often year 4-6 for B-class value-add.',
              'Confusing unlevered with levered IRR — unlevered tells you about the asset, levered tells you about the equity check.',
              'Modeling distributions as smooth annual cash flow when reality is lumpy (refinance proceeds, renovation phases, exit).',
            ],
            related: ['uw-t07-cap-rates', 'uw-t09-waterfall'],
          },

          // ── Topic 9 ──────────────────────────────────────────────
          {
            id: 'uw-t09-waterfall',
            title: 'The waterfall · GP/LP economics',
            summary:
              'The waterfall is the contract that decides who gets paid what, when. Understand the structure even if Capital Raising is reserved for Mastery Live — the underwrite needs to model what hits LP returns vs GP returns separately.',
            body:
              "The distribution waterfall is the agreement between general partner (GP — operator) and limited partners (LPs — passive investors) about how cash flow gets split. You don't write the waterfall in Self-Study — that's Capital Raising and PPM, both reserved for Mastery Live. But you need to model it correctly in your underwrite or your LP IRR projections are wrong.\n\nA standard multifamily waterfall has four tiers:\n\n**Tier 1 · Return of capital + preferred return.** LPs receive their original equity back plus a preferred return (the 'pref') — typically 7-9% annually compounded. No GP distribution until LPs hit pref.\n\n**Tier 2 · Catch-up.** The GP receives 100% of distributions until the GP has caught up to a target ratio — often 20% of total profits to date.\n\n**Tier 3 · Splits below first hurdle.** Above the catch-up but below the first IRR hurdle (often 12-14%), distributions split typically 80% LP / 20% GP.\n\n**Tier 4 · Splits above hurdles.** As IRR exceeds further hurdles, the GP earns higher promoted interest. Common structure: above 15% IRR splits 70/30 LP/GP, above 20% IRR splits 60/40.\n\n**Why this matters in underwriting.**\n\nA deal that delivers 14% IRR at the asset level might deliver 11% IRR to LPs and 22% IRR to GP — depending on how the waterfall structures the splits. LP-quality returns are different from asset-quality returns.\n\nWhen you underwrite, you need three IRR outputs: asset IRR, LP IRR, GP IRR. The Rescia underwriting model (in your toolkit) computes all three from a single set of inputs. Run them separately. The LP-facing pitch deck shows LP IRR. The GP earnings projection shows GP IRR. The asset-level analysis shows asset IRR.\n\n**The pref is sticky.** If your asset IRR comes in below pref, the LPs still get their pref (drawing from GP distributions, often retroactively). Operators who blow through pref see their GP take get clawed back at exit.\n\n**The catch-up is negotiable.** Some LPs negotiate no catch-up (cleaner, simpler), trading slightly higher pref for the simplicity. Some negotiate full catch-up (GP gets back to target faster, deal pencils harder for the GP).",
            example:
              "Mesa 144-unit deal: asset IRR modeled at 14.2%, LP IRR (after waterfall) modeled at 11.4%, GP IRR modeled at 24.8%. Structure: 8% pref, 100% LP catch-up to pref, 80/20 above pref to 15% IRR, 70/30 above 15% IRR. The asset doesn't hit 15% so the GP doesn't earn the higher promote tier. The GP IRR of 24.8% comes mostly from the 20% catch-up above pref, which is the hardest-working tier in moderate-IRR deals. Modeling this correctly gave us a clear picture: LPs see an 11% return (within their target), we earn a fair promote, the deal makes sense for both sides.",
            pitfalls: [
              "Underwriting only asset IRR and quoting it to LPs — they receive LP IRR, which is materially different.",
              "Forgetting the pref is sticky — if asset IRR < pref, GP distributions get clawed back to make LPs whole.",
              "Treating the waterfall as standard boilerplate — terms vary, and the difference between 7% pref and 9% pref is meaningful at exit.",
              "Modeling smooth annual distributions when waterfall mechanics depend on cumulative cash flow (refinance proceeds, exit).",
              "Not separating LP IRR from asset IRR in the LP-facing pitch — LPs eventually figure it out and trust erodes.",
            ],
            related: ['uw-t08-irr-moic'],
          },

          // ── Topic 10 · Live sidebar lives here ────────────────────
          {
            id: 'uw-t10-bear-case',
            title: 'The bear case discipline · sensitivity tables',
            summary:
              "Every honest underwrite has three cases: base, bull, bear. The bear case is non-negotiable — it's what protects you from the deal that requires perfect execution to deliver positive returns.",
            body:
              "Operators who close deals across cycles run the bear case as religiously as the base case. Operators who close one deal, fail through the next downturn, and exit the business model only the base case. The bear case is the difference.\n\n**What to flex in the bear case.**\n\n- **Rent growth.** Base case might assume 3% Y2-3 growth. Bear case assumes 0% in years 2-3 and -1% in year 4. Markets that look strong at LOI can become weak through your hold.\n\n- **Vacancy.** Base case 7% economic. Bear case 11%. Includes elevated tenant walk on rent push and more bad debt as the operating environment tightens.\n\n- **Expense growth.** Base case 3% annual. Bear case 5% annual — labor inflation, insurance hardening, tax reassessments.\n\n- **Exit cap.** Base case +25bps from entry. Bear case +75bps from entry, reflecting a cap rate widening cycle by exit.\n\n- **Hold extension.** Base case 5-year hold. Bear case 7-year hold because you can't refinance into reasonable debt and can't sell at acceptable prices in years 4-5.\n\n**What NOT to flex.**\n\n- **Capital expense plan.** You committed to it. Don't pretend you'd defer the roof if the market got weak.\n\n- **Tax reassessment.** Already locked in the base case at the right level.\n\n- **Debt structure.** Don't flex the debt to be more favorable in the bear case — what you signed at close is what you have.\n\n**The bear case threshold:** the deal must produce positive levered IRR (above 4%) and zero capital call risk under the bear case. If the bear case shows negative IRR or a year-3 capital call, the deal is too levered or the market is too weak. Pass.\n\n**The bull case is for vibes.** Run it for completeness — base + 1% rent growth, -25bps exit cap. If the bull case is 22%, you have upside. The bull case shouldn't influence the LOI decision; the bear case does.\n\n**Sensitivity tables document the discipline.** A two-axis grid — rent growth on one axis, exit cap on the other — shows which combinations produce 12%+ IRR (your green zone), 8-12% IRR (your yellow zone), and below 8% IRR (your red zone). Most of your scenario distribution should sit in green and yellow. If you have meaningful red exposure, the deal is too sensitive to assumptions you can't control.\n\n---\n\n**◆ Mastery Live members workshop this on a real deal.**\n\nThe bear case is where operators most need a coach. Self-Study gives you the framework: what to flex, what to hold, the threshold. Live members bring their actual underwrites to a monthly call and Diva and Lou pressure-test the bear case with them — challenging the rent growth assumptions, questioning the cap rate spread thesis, and sometimes telling them their bear case isn't bear enough. The frameworks are the same. The difference is having a seasoned operator across the table when your model says yes but your gut says wait.",
            example:
              "Tampa 168-unit deal, 2023 evaluation. Base case: 3% rent growth, 7% vacancy, 5.50% exit cap. IRR 14.8%. Bear case: 0% rent growth Y2-3, 10% vacancy, 5.95% exit cap. IRR 6.2%. Cap call risk: none. We submitted the LOI. Compare to a Tucson deal evaluated the same week: Base case IRR 12.4%. Bear case IRR -1.8% with a year-3 capital call risk. We passed Tucson. Two years later, Tucson rents in that submarket were down 4% (the bear case became base) — the buyer who closed it is now in a workout. The bear case caught it.",
            pitfalls: [
              'Skipping the bear case because the base case looks good — most underperforming deals had positive base cases.',
              'Setting the bear case too kindly — bear case rent growth at +1% isn\'t a bear case.',
              'Treating the bull case as load-bearing for the LOI decision — operators who optimize for upside under-protect against downside.',
              'Running sensitivity tables but not staring at the distribution — the math only matters if you read it.',
              'Believing your operations excellence will fix a structurally weak market in the bear case — your operations are constant; the market is the variable.',
            ],
            related: ['uw-t01-model-architecture', 'uw-t07-cap-rates', 'submarket-t08-walk-away'],
          },
        ],
        deepDive: [
          'The Rescia underwriting model walk-through — every assumption defended.',
          'Stabilized vs as-is NOI — why the difference is where deals live or die.',
          'The exit cap rate trap and how to set it honestly.',
        ],
        quiz: [
          {
            q: 'An OM shows T-12 NOI of $1.85M. Pulling actuals, you find a $90K one-time insurance refund and a $50K one-time tax appeal credit baked into the T-12. What is your underwriting NOI?',
            a: '$1.71M — back out one-time items to get to the actual run rate.',
            why: 'One-time items inflate T-12 above true run rate. The $140K of one-time items represents 7.6% of the headline NOI. Underwriting from $1.85M would value the deal $2.4M too high at a 5.25% cap. Backing them out gives you the honest as-is NOI.',
            trap: '"It is on the T-12, so it counts." Wrong. T-12 includes one-time items by accounting convention, but the operating reality is the recurring run rate. Operators who skip normalization buy at 5-10% premium to true value.',
            topicId: 'uw-t02-as-is-noi',
            difficulty: 'application',
            choices: [
              '$1.85M — the T-12 is the T-12',
              '$1.71M — back out one-time items to get to the actual run rate',
              '$1.78M — average the T-12 with T-3 annualized',
              '$1.92M — the broker said stabilized was higher',
            ],
            correctIndex: 1,
          },
          {
            q: 'Your underwrite shows entry cap 5.50%, exit cap 5.25% (you assumed cap compression), 3% rent growth, 14% levered IRR. The deal is in a Sun Belt submarket with 4% supply growth incoming over 24 months. What is the most likely problem?',
            a: 'Modeling cap compression in a market with strong supply growth is hopeful, not analytical.',
            why: '4% supply growth incoming usually widens cap rates as exit-time buyers price the supply risk. Modeling cap compression in that environment requires a specific macro thesis — Fed cuts rates aggressively, the supply absorbs faster than expected, etc. Without that thesis, your 14% IRR is dependent on a cap rate move that contradicts the supply read.',
            trap: 'Operators sometimes model cap compression to get the deal to pencil at the asking price. This is reverse-engineering the model to support an LOI you already wanted to submit. The honest move is exit cap >= entry cap unless you have explicit thesis.',
            topicId: 'uw-t07-cap-rates',
            difficulty: 'operator',
            choices: [
              'Rent growth assumption is too low',
              'Modeling cap compression in a market with strong supply growth is hopeful, not analytical',
              'IRR threshold should be 18%+ for any deal',
              'Hold period is too short',
            ],
            correctIndex: 1,
          },
          {
            q: 'Your bear case underwrite (0% rent growth, 11% vacancy, +75bps exit cap, 5% expense growth) produces a -1.5% levered IRR with a year-3 capital call. Your base case is 13.5% IRR. What should you do?',
            a: 'Pass — bear case negative IRR with capital call risk means the deal is structurally too levered or too sensitive to weak assumptions.',
            why: 'The bear case threshold is positive levered IRR (above 4%) and zero capital call risk. This deal fails both. The base case looks good, but most underperforming deals had positive base cases. The bear case is where deals get killed before they kill you.',
            trap: '"The bear case is too pessimistic — it will not actually happen." Sometimes that is true. But the bear case is the protection you build against the cycle that does happen, even if it is unlikely. Operators who pass deals that fail bear case outperform operators who close them, across full cycles.',
            topicId: 'uw-t10-bear-case',
            difficulty: 'operator',
            choices: [
              'Submit LOI — base case is strong',
              'Submit LOI at a lower price to fix the bear case',
              'Pass — bear case negative IRR with capital call risk means the deal is structurally too levered or too sensitive to weak assumptions',
              'Reduce leverage to 60% LTV and re-run',
            ],
            correctIndex: 2,
          },
          {
            q: "Your seller's T-12 expense line shows $4,200/door on a B-class deal. Your underwrite arrives at $5,150/door year-1. The biggest single contributor to the gap is a $320/door increase. Which expense category is most likely?",
            a: 'Property tax reassessment to your purchase price.',
            why: 'Property taxes reassess to purchase price in most jurisdictions, typically 30-60% above the seller\'s basis. On a $33M purchase with seller\'s tax basis at $20M, the reassessment alone can add $250-400/door. It is the single biggest expense surprise on most underwrites and is mechanical — once you know your jurisdiction\'s reassessment rules, you can model it precisely.',
            trap: 'Operators sometimes assume the seller\'s tax line carries forward. It does not. The first quarterly tax bill after close shows the new assessed value, often before lease-up has even completed.',
            topicId: 'uw-t05-expenses',
            difficulty: 'application',
            choices: [
              'Insurance premium increases',
              'Property tax reassessment to your purchase price',
              'Payroll wage inflation',
              'Management fee adjustment',
            ],
            correctIndex: 1,
          },
          {
            q: "Your underwriting model produces asset IRR 14.0%, LP IRR 11.2%, GP IRR 22.5%. Pref is 8%, catch-up is to 20% of total profit, splits are 80/20 below 15% IRR and 70/30 above. What does this tell you?",
            a: 'The deal is structurally fine — LPs hit pref + modest promote, GP earns honest catch-up, and asset IRR delivers acceptable returns. The waterfall is doing its job.',
            why: 'LP IRR of 11.2% comfortably exceeds the 8% pref, meaning LPs are getting their preferred return plus a modest promote layer. GP IRR of 22.5% comes primarily from the catch-up tier, which is fair compensation for the operator. Asset IRR of 14.0% is healthy for B-class value-add and falls just below the 15% promote-acceleration tier — meaning the GP earns the catch-up but not the higher 70/30 split.',
            trap: 'Operators sometimes quote asset IRR (14.0%) to LPs without explaining that LPs receive LP IRR (11.2%). When LPs read their distribution statements and see 11.2%, they feel mis-sold. Always quote LP IRR in LP-facing materials.',
            topicId: 'uw-t09-waterfall',
            difficulty: 'operator',
            choices: [
              'The waterfall is too generous to the GP',
              'The deal is structurally fine — LPs hit pref + modest promote, GP earns honest catch-up, and asset IRR delivers acceptable returns. The waterfall is doing its job.',
              'The pref is too low — should be 10% to compensate for risk',
              'The deal will not close — LP IRR below 12% is unacceptable',
            ],
            correctIndex: 1,
          },
        ],
        mistakes: [
          {
            trap: 'Treating the underwriting model as a forecast instead of a defense system.',
            why: 'Operators who model deals as predictions get attached to their numbers and stop pressure-testing. The model is supposed to tell you which assumptions are load-bearing — not predict the future. When the deal underperforms, a model built as a defense system tells you which input was wrong; a model built as a forecast just embarrasses you.',
            fix: 'Build every model with formula-driven inputs, every output traceable to specific assumptions. Document each assumption with a one-line rationale. At variance review, you should be able to say "rent growth came in at 1.2% vs our 3% assumption — that explains 60% of the NOI gap" within ten minutes. If you cannot, your model was a forecast.',
            topicId: 'uw-t01-model-architecture',
          },
          {
            trap: 'Underwriting from pro forma stabilized NOI instead of building stabilized from your own assumptions.',
            why: "The broker's stabilized NOI is the seller's pitch — every assumption optimized for the marketing narrative. It blends 24 months of value-add growth into a year-1 number, assumes expense efficiencies without operational basis, and ignores tax reassessment. Underwriting from pro forma is the most expensive shortcut in multifamily — operators routinely overpay 5-10% by using the broker's stabilized as the input.",
            fix: "Build stabilized NOI yourself from three honest inputs: rent growth assumptions defended quarter-by-quarter, expense growth at 2-3% annual with explicit reassessment math, and lease-up timing modeled against the renewal calendar. Compare your number to the broker's. If your stabilized is 8-15% above as-is and the broker's is 25%+ above, the broker is hoping. You are underwriting.",
            topicId: 'uw-t03-stabilized-noi',
          },
          {
            trap: 'Modeling cap compression at exit without an explicit macro thesis.',
            why: "Exit cap rates wider than entry is the historical norm — cycles widen, supply absorbs, rates rise. When operators model cap compression (exit cap below entry), they are usually reverse-engineering the model to make the deal pencil at the asking price. The 50bps of cap compression converts to roughly 6-9% of headline price — meaningful enough to make a deal look like it works when it does not.",
            fix: 'Default to exit cap 25-50bps wider than entry. Only model cap compression when you have an explicit, defensible thesis: Fed rate path expectation, supply absorption math, or rent growth that compresses cap rates structurally. Document the thesis in the model. Run sensitivity that flexes exit cap +/- 50bps and stare at the IRR distribution. Deals dependent on cap compression are macro bets dressed as real estate.',
            topicId: 'uw-t07-cap-rates',
          },
          {
            trap: 'Skipping the bear case or running it too kindly.',
            why: 'The bear case is what protects you from the cycle that does happen. Operators who pass deals that fail bear case outperform operators who close them, across full cycles. The bear case rent growth should be 0% or negative, not +1%. The bear case exit cap should be 75bps wider, not 25bps. The bear case vacancy should reflect both economic vacancy and tenant-walk risk on rent push. A bear case that is too kind is no bear case at all.',
            fix: "Set the bear case threshold: positive levered IRR (above 4%) and zero capital call risk. Flex rent growth to 0% Y2-3 and -1% Y4. Flex vacancy to 10-12%. Flex exit cap to +75bps from entry. If the deal fails this threshold, pass — even when the base case looks great. The deals that survive bear case discipline are the ones that survive the next downturn. The deals that don't survive bear case are the ones that didn't survive the last one.",
            topicId: 'uw-t10-bear-case',
          },
        ],
      },
      // ═══════════════════════════════════════════════════════════════════
      // MODULE 4 · Stress Testing & CapEx — full content (Wave SS-2.7)
      // ═══════════════════════════════════════════════════════════════════
      {
        id: 'stress',
        title: 'Module 4 · Stress Testing & CapEx',
        duration: '2.5 hrs',
        description:
          'Sensitize for the bad case. Price the deferred maintenance accurately. The downside scenarios that separate operators who survive a cycle from operators who do not — applied through four stress tests and a CapEx audit.',
        topics: [
          // ── Topic 1 ──────────────────────────────────────────────
          {
            id: 'stress-t01-four-scenarios',
            title: 'Stress testing · the four scenarios that matter',
            summary:
              "Most deals look fine in the base case. Stress testing is the discipline of asking what happens when the base case doesn't. Four scenarios should pressure-test every underwrite.",
            body:
              "The base case underwrite tells you what a deal might do if everything goes roughly to plan. The stress tests tell you what happens when the world doesn't cooperate. Operators who close deals across cycles run all four:\n\n**1. Rent stress.** Hold rent growth at 0% for the full hold. Then run -1% to -2% rent growth in years 2-3 — what happens during a Sun Belt absorption-cycle correction. Compare IRR.\n\n**2. Vacancy stress.** Push economic vacancy from your base case 7% to 11-13%. Concessions deepen. Bad debt rises. The tenant pool gets pickier. Lease-up extends.\n\n**3. Cap rate stress.** Flex exit cap +50bps and +100bps from your base case. The +100bps scenario is what happens during a real cycle — 2008-09, 2022-23. If your IRR turns negative at +100bps cap widening, your deal is too levered for cycle survival.\n\n**4. Combined stress.** Run rent stress + vacancy stress + cap rate stress simultaneously. This is the bear case from Module 3, Topic 10. The deal must produce at minimum positive levered IRR and zero capital call risk under combined stress, or it isn't ready for LOI.\n\nThe pattern operators miss: testing one variable at a time and ignoring how they correlate. Real downturns hit all three at once. Rents flatten because supply outran absorption. Vacancy rises because tenants walk to cheaper alternatives. Cap rates widen because debt costs more and risk premium expands. The combined scenario is the only one that mirrors a real cycle.\n\nThe discipline isn't pessimism. It's building a deal that survives reality, not just the marketing pitch.",
            example:
              "Tampa 168-unit, 2023 evaluation. Base case IRR: 15.1%. Single-variable stress: rent at 0% → 11.4%, exit cap +50bps → 11.8%, vacancy 11% → 12.2%. Combined stress (all three): 4.8% IRR with no capital call. The deal cleared our bear case threshold. Same week, a Tucson deal: base case IRR 13.8%, but combined stress produced -2.1% IRR with year-3 capital call risk. We submitted Tampa, passed Tucson. Two years later Tucson rents in submarket were down 4%.",
            pitfalls: [
              'Testing single variables in isolation — they correlate during real cycles.',
              'Treating stress tests as compliance ("we ran the numbers") rather than decision input.',
              "Setting stress thresholds too kindly — 1% rent growth in stress is basically base case.",
              'Skipping the combined scenario because one-at-a-time stress shows the deal "passes."',
              "Believing the base case is the realistic outcome — base cases are by definition the most-likely outcome, not the only outcome.",
            ],
            related: ['stress-t02-rent', 'stress-t04-cap-rate', 'stress-t07-capital-call', 'uw-t10-bear-case'],
          },

          // ── Topic 2 ──────────────────────────────────────────────
          {
            id: 'stress-t02-rent',
            title: 'Rent stress · 0% growth and the absorption-cliff scenario',
            summary:
              'Rent growth is the single largest IRR driver in most underwrites. Stressing it to 0% (and worse) tells you whether your returns come from the deal or from market gravity.',
            body:
              "Multifamily underwriting models lean heavily on rent growth assumptions. A 5-year hold at 3% annual rent growth produces meaningfully higher IRR than the same hold at 0%. The question stress testing answers: what fraction of your IRR depends on rent growth happening?\n\nThree rent stress scenarios to run:\n\n**0% rent growth for the full hold.** Year 1, year 2, year 3, year 4, year 5 — flat. No push at renewals, no market lift. This is the 'absorption cliff' scenario where new supply absorbs the rent growth before it reaches your operator. Model it.\n\n**-1% rent growth in years 2-3.** Real cycles produce real rent declines. Phoenix West Valley dropped 2-3% in 2024 as 2022-2023 supply hit. Atlanta dropped similarly. Sun Belt softness is part of the modern multifamily reality. Underwrite the possibility.\n\n**-2% rent growth in year 3 only, recovery in years 4-5.** A milder version — one bad year mid-hold, then recovery. Tests whether your IRR can absorb a single rough year without breaking.\n\nWhat matters in interpretation:\n\nIf your IRR delta from base case to 0% rent growth is small (1-2 percentage points), your deal isn't a rent growth bet — it's a basis play or value-add execution. Good. That's structural.\n\nIf your IRR delta is large (4-7 percentage points), your deal IS a rent growth bet. That's not automatically bad — but you need to be honest that you're betting on the macro, and the deal's basis isn't doing the heavy lifting. Operators who dress rent growth bets as basis plays buy the wrong deals.\n\nThe framing question: if rents don't grow, does this deal still pencil? If yes, it's structurally sound. If no, you're underwriting hope.",
            example:
              "Plano 192-unit deal, 2024. Base case rent growth 3%, IRR 15.4%. At 0% rent growth IRR drops to 9.8% — a 5.6-point delta. Rent growth was carrying about a third of the IRR. We accepted the risk because the deal also had basis 12% below replacement cost, which softens rent dependency. Same week, a Mesa deal had base case 16.2% IRR, but at 0% rent growth dropped to 7.1% — a 9.1-point delta. That deal was a rent growth bet wearing a value-add costume. We passed.",
            pitfalls: [
              'Setting "stress" rent growth at 1.5% (still positive — that\'s base case lite, not stress).',
              "Ignoring the absorption-cliff math when supply pipeline is high in your submarket.",
              "Not running -1% or -2% scenarios — real cycles produce real declines.",
              "Failing to attribute IRR to rent growth — operators don't realize how much of their model rests on it.",
              'Anchoring on the base case as "realistic" without checking how fragile the realism is.',
            ],
            related: ['stress-t01-four-scenarios', 'submarket-t01-three-reads'],
          },

          // ── Topic 3 ──────────────────────────────────────────────
          {
            id: 'stress-t03-vacancy',
            title: 'Vacancy stress · the lease-up risk',
            summary:
              'Base case vacancy at 7% is comfortable. Stress vacancy at 11-13% reveals whether your deal can absorb a lease-up cycle, a renewal walk, or a soft year.',
            body:
              "Vacancy is the most underestimated risk in multifamily underwriting. The base case usually models 6-8% economic vacancy — fine for stable operations in a healthy submarket. Stress testing pushes that to 11-13% to see what happens when the operating environment tightens.\n\nThree vacancy stress scenarios:\n\n**Elevated economic vacancy throughout.** Push from 7% base to 12% across the full hold. That includes higher physical vacancy, deeper concessions, more bad debt, longer turnover. Model the NOI hit and the IRR consequence.\n\n**Renewal-walk stress.** When you push rents on renewals (your value-add lever), 10-20% of tenants typically walk. In stress, model 25-30% walking. That's the 'rents pushed too hard, market doesn't absorb at the new rate' scenario. Lease-up downtime spikes.\n\n**Lease-up stress on value-add.** Renovation downtime longer than expected (60-90 days vs base case 30-45). Slower lease-up at the new rents. Concessions required to fill renovated units. Model 6-9 months of elevated vacancy during the value-add execution.\n\nWhat you're checking:\n\nThe lease-up cycle is when most operators discover their pro forma was optimistic. Real renovations take longer than modeled. Real tenant walk rates exceed projections. Real concessions on relets are deeper than expected. The vacancy stress tests reveal whether your deal can absorb that reality.\n\nIf your IRR drops 3-5 percentage points under vacancy stress and stays positive, you're structurally fine. If it drops 7+ points or turns negative, the deal is too dependent on smooth lease-up — which never happens.\n\nThe operator's discipline: vacancy assumption in base case is honest (7-8%), vacancy in stress is stretched (11-13%), and the deal must work in both. If it only works in base, you're underwriting an environment, not a deal.",
            example:
              "Phoenix 220-unit value-add, 2024. Base case 7.5% economic vacancy, IRR 15.7%. Vacancy stress at 12% (deeper concessions, slower lease-up): IRR drops to 10.3%. Renewal-walk stress (30% walk rate vs 15% base): IRR 9.1%. Combined vacancy + walk stress: 7.4%. All scenarios positive, no capital call risk. The deal absorbed reality. Compared to a Plano deal we evaluated where vacancy stress dropped IRR from 14.2% to 1.8% — that was a deal too leveraged on smooth lease-up. We passed.",
            pitfalls: [
              'Using "stabilized vacancy" from the OM as your base case without modeling lease-up vacancy separately.',
              "Ignoring renewal-walk risk when underwriting rent push — 10-20% walk is normal, 25-30% is stress.",
              "Skipping renovation downtime on value-add deals — 30-90 days × unit count is real NOI loss.",
              "Treating the lease-up cycle as a smooth ramp instead of a 6-12 month grind.",
              "Not capturing concession trail in vacancy stress — concessions extend at the back of cycle even after physical occupancy stabilizes.",
            ],
            related: ['stress-t01-four-scenarios', 'uw-t06-vacancy'],
          },

          // ── Topic 4 ──────────────────────────────────────────────
          {
            id: 'stress-t04-cap-rate',
            title: 'Cap rate stress · the exit-cycle reality',
            summary:
              'Exit cap rates widen during cycles. The 5.25% you bought at in 2024 likely exits at 5.75-6.00% in 2029. Stress test +50 to +100bps from your base case exit and see what the deal does.',
            body:
              "Cap rate stress is mechanical but easy to skip. Most operators model exit cap 25bps wider than entry. That's reasonable for a stable cycle. It's wishful for any cycle that includes a real correction.\n\nTwo cap rate stress scenarios:\n\n**Exit cap +50bps from base case.** This is the moderate cycle correction. Treasury rates climb 100bps, multifamily cap rates lag but follow. The 5.25% entry cap models out at 5.75% exit — close to the historical 25-50bps widening over a 5-7 year hold during normal cycles.\n\n**Exit cap +100bps from base case.** This is the real cycle correction. 2008-09. 2022-23. The 5.25% entry cap models out at 6.25% exit. Some operators won't model this because it makes the deal look bad. That's the point — testing for the cycle that does sometimes happen.\n\nWhat you're learning:\n\nExit cap drives meaningful IRR variance because of how leverage interacts with valuation. A deal at 5.25% entry / 5.75% exit (50bps widening) loses about 8-10% of its exit value relative to no cap movement. With 70% LTV debt, that 8-10% asset value drop becomes a 25-35% equity value drop.\n\nIf +50bps cap stress drops your IRR 2-3 points and stays positive, you're absorbing normal cycle math. If +100bps stress turns IRR negative or triggers a capital call, your deal is structurally a cap compression bet — even if you didn't model compression in your base case. You're betting cap rates at exit aren't worse than today, and that's a macro bet.\n\nThe discipline: run both stresses. The deal must survive +50bps with positive IRR, and ideally absorb +100bps without a capital call.",
            example:
              "DFW 144-unit deal, 2024. Entry cap 5.40%, base case exit 5.65% (+25bps), IRR 14.8%. Cap stress at +75bps (5.90% exit): IRR 11.2%. Cap stress at +125bps (6.40% exit): IRR 7.6%, no capital call. The deal absorbed cycle math. Compare to a Phoenix deal we evaluated: base IRR 15.1%, +75bps cap stress dropped to 5.4%, +125bps stress went negative with year-3 capital call risk. The Phoenix deal was a cap-compression bet wearing a basis-play costume. We passed.",
            pitfalls: [
              "Modeling exit cap at base case + 25bps and calling it stress (it's just slightly less optimistic).",
              "Refusing to run +100bps because it makes the deal look bad — that's the test.",
              "Forgetting that cap rate widening interacts with leverage — 50bps cap widening = 8-10% asset value drop = 25-35% equity drop at 70% LTV.",
              'Treating exit cap as "what brokers say comparable assets sell at today" instead of "what they\'ll likely sell at in year 5 of your hold."',
              'Ignoring submarket-specific cap rate trajectories — markets that lose population, employment, or get oversupplied widen more than market-average.',
            ],
            related: ['stress-t01-four-scenarios', 'uw-t07-cap-rates'],
          },

          // ── Topic 5 ──────────────────────────────────────────────
          {
            id: 'stress-t05-deferred-maintenance',
            title: 'CapEx · the deferred maintenance audit',
            summary:
              "Every B-class deal has deferred maintenance the seller didn't disclose. The property condition report (PCR) is your audit tool. Read it line-by-line and price every line.",
            body:
              "Deferred maintenance is the silent capex inflater. The seller has been running the property to maximize T-12 NOI — which often means underspending on roofs, HVAC, parking lots, plumbing, and exterior. When you take ownership, the deferred work becomes your year-1 expense.\n\nThe discipline: pull the property condition report (PCR) during DD or pre-LOI if the broker shares it. PCRs are physical inspections of major building systems with cost estimates for current condition vs needed work. They're typically commissioned by the seller for marketing, but they're objective enough to underwrite from.\n\nMajor line items to audit:\n\n**Roof.** Most B-class roofs are 15-25 year-old TPO or modified bitumen. Replacement cost: $8-15/sf depending on size and access. A 144-unit garden style with 250,000 sf of roof = $2.0-3.7M to replace fully. Repair-only is $200-800K depending on condition.\n\n**HVAC.** Per-unit HVAC at $4-7K replacement. If 30% of units have HVAC at end-of-life (PCR will note 'near end of useful life'), that's 43 units × $5,500 = $237K capex.\n\n**Parking lots.** Asphalt repair and seal coat $0.50-1.00/sf. Full mill-and-overlay $2.50-4.00/sf. A property with 80,000 sf of parking and significant cracking might need $200K mill-and-overlay.\n\n**Plumbing.** Galvanized supply lines or polybutylene = potential repipe at $2-4K per unit. The PCR will flag this as a major risk if present.\n\n**Exterior.** Siding, paint, gutters, balcony rails. Deferred maintenance on exterior is highly visible and affects rent push potential.\n\n**Underwriting discipline.** Build a CapEx schedule that captures every major line item from the PCR with cost estimates. That schedule becomes your value-add capex budget. Add a 15-25% contingency. If the broker hasn't shared a PCR, your underwrite assumes deferred maintenance and adds 10-15% to your year-1-3 capex line.",
            example:
              "DFW 192-unit acquisition. PCR flagged: roof at end of useful life ($1.4M replacement), 35% of HVAC needing replacement over 24 months ($235K), parking lot needing mill-and-overlay ($165K), exterior paint and trim ($95K). Total capex year 1-3: $1.9M. Add 20% contingency: $2.3M. The seller's pro forma had $400K capex over 24 months — they were planning to defer everything. Our underwrite priced it honestly. Asking was $35M; we LOI'd at $32.7M to absorb the capex reality.",
            pitfalls: [
              "Trusting the seller's capex line as the underwrite — the seller's been deferring; your year-1 catches it up.",
              'Not requesting the PCR — if not shared, assume deferred and add 10-15% to capex.',
              'Skipping the contingency — capex always runs over budget; 15-25% is normal.',
              'Treating capex as separate from NOI — vacant units during renovation = NOI loss in addition to renovation cost.',
              "Failing to phase capex against your debt structure — major capex in year 1-2 against IO debt is much easier than against fully amortizing debt.",
            ],
            related: ['stress-t06-reserves', 'uw-t05-expenses'],
          },

          // ── Topic 6 ──────────────────────────────────────────────
          {
            id: 'stress-t06-reserves',
            title: 'CapEx · ongoing reserves vs renovation budgets',
            summary:
              "Two CapEx categories that get conflated: ongoing reserves for routine wear-and-tear, and renovation budgets for the value-add execution. They're different. Underwrite both.",
            body:
              "CapEx underwriting has two distinct categories that should never share a line item:\n\n**Ongoing reserves** — the annual capex to keep the property operating. Industry standard: $250-400/door per year for B-class, $150-250/door for A-class, $400-550/door for C-class. This covers routine roof repair, HVAC fixes, plumbing emergencies, parking lot maintenance, appliance replacement, common-area updates. It's the 'boring capex' that lenders require you to reserve for.\n\n**Renovation budgets** — the value-add capex executed in year 1-2. Interior renovations (cabinets, countertops, flooring, paint, lighting), exterior upgrades (paint, landscaping, signage), amenity additions (fitness center, dog park, package room). Each unit interior reno typically runs $5-12K depending on scope.\n\n**Why they're different:**\n\nOngoing reserves keep the property current. They're a permanent operating cost. Modeling them at $0 because 'we just renovated' is wrong — capex doesn't stop at renovation, it just shifts categories.\n\nRenovation budgets are one-time execution costs. They unlock the value-add NOI. But once executed, they don't repeat — the unit is renovated.\n\n**The mistake operators make:**\n\nUnderwriting renovation budget at $8K per unit but skipping ongoing reserves 'because the property will be renovated.' Wrong. Even on a fully renovated property, you'll spend $300+/door annually on roofs, HVAC, plumbing, and ongoing maintenance. That's a separate line item.\n\n**Lender reserves:**\n\nMost lenders require CapEx reserves to be funded at $250-450/door annually, deposited into a reserve account. Your loan documents specify the rate. Treat this as a non-negotiable cost — it hits cash flow even if you don't actually spend it.\n\n**The full CapEx picture:**\n\nYear 1: ongoing reserves ($350/door × 144 = $50K) + renovation budget ($8K/unit × 70 units = $560K). Total $610K. Year 2: similar. Year 3+: ongoing reserves only ($50K). Three-year capex burst: ~$1.2M, then settling to $50K/year.",
            example:
              "Mesa 144-unit value-add. Renovation budget: $8K × 144 units = $1.15M phased over 18 months. Ongoing reserves: $325/door × 144 = $46.8K annually. Combined years 1-3 capex: $1.15M renovation + $140K ongoing = $1.29M. The OM's pro forma showed $850K total capex year 1-3 — they were under-budgeting ongoing by $300K. Our number was honest. Year-3 IRR matched our pro forma; theirs would have variance-reported every quarter.",
            pitfalls: [
              "Combining ongoing reserves and renovation into one line — the math gets fuzzy and you'll under-reserve for one of them.",
              "Skipping ongoing reserves 'because we just renovated' — the building still needs ongoing capex.",
              "Ignoring lender reserve requirements — they're contractual, not optional.",
              'Underwriting renovation cost at $5K/unit in 2024-2025 — labor and materials cost more than 2018-2020 estimates.',
              "Treating capex as deferred until cash flow exists — operators who phase capex into year 3-5 to 'fund from operations' usually find operations can't fund it.",
            ],
            related: ['stress-t05-deferred-maintenance', 'uw-t05-expenses'],
          },

          // ── Topic 7 · Live sidebar lives here ─────────────────────
          {
            id: 'stress-t07-capital-call',
            title: 'The capital call risk model',
            summary:
              'A capital call is when the deal needs equity injection to survive — debt service is at risk, cash flow is negative, the LP base gets a "wire $X by Friday" email. The discipline of stress testing is detecting this risk before LOI.',
            body:
              "Capital calls happen when operating cash flow is insufficient to cover debt service, capex commitments, and reserves. The deal needs a fresh equity injection from the existing investor base. Operators who close LOIs without modeling capital call risk discover it 18-30 months in, at which point the LP base is already disillusioned.\n\nThe mechanics:\n\nA levered multifamily deal has roughly three obligations: monthly debt service (interest + amortization), capex execution (renovation budget on a value-add), and operating cash needs (insurance premiums, property taxes, payroll). Operating cash flow has to cover all three. When it doesn't, equity has to.\n\nThe triggers:\n\n**Debt service > NOI.** The most common trigger. NOI underperforms (rent growth flattens, vacancy spikes), but debt service is fixed by the loan amortization schedule. Once NOI drops below debt service, every month is a cash drain.\n\n**Renovation overruns.** Capex came in 30% over budget. Cash reserves get depleted. The renovation has to be paused (which slows lease-up further) or funded with new equity.\n\n**Refinance failure.** Year-3 or year-5 refinance doesn't clear because the deal's NOI doesn't support new debt at then-current rates. The bridge loan matures, the new loan is short by $3-5M, and the equity has to plug the gap.\n\n**Cycle correction at exit.** You planned to sell in year 5 at 5.50% cap. The market is now 6.25%. You can sell at the lower price (and call capital to make LPs whole if returns are below pref) or hold and pay incremental debt service while waiting.\n\n**Detection in the model:**\n\nRun combined stress test (rent + vacancy + cap rate). At each year, compute: NOI ÷ debt service. If this ratio drops below 1.10 in any year of the hold, you have capital call risk. If it drops below 1.00, you have a near-certain capital call.\n\nAlso model refinance at year 3-5 under stress. If your stressed NOI doesn't qualify for the loan you assumed, model the equity gap explicitly.\n\nIf the deal can't survive combined stress without a capital call, pass. Period.\n\n---\n\n**◆ Mastery Live members workshop this on a real deal.**\n\nThe capital call risk model is where coaching saves the most money. Self-Study gives you the framework. Live members bring their actual stress tests to a monthly call and Diva and Lou pressure-test the assumptions with them — surfacing where the bear case isn't bear enough, where the refinance assumption is fragile, where the model is hiding a year-3 capital call. The frameworks are the same. The difference is having a seasoned operator across the table when your model says 'marginal' and you're trying to decide whether to commit $1M of LP capital to it.",
            example:
              "Tucson 200-unit deal, 2022 evaluation. Base case IRR 12.4%. Combined stress (0% rent growth, 12% vacancy, +75bps exit cap): IRR -1.8%, year-3 NOI/debt service ratio 0.94 — capital call. Year-5 refinance: stressed NOI didn't support the assumed loan amount; equity gap modeled at $4.2M. We passed. Two years later, the buyer who closed at the asking price is now in workout — exactly the capital call scenario the stress model flagged. The discipline saved us $4M+ of LP capital exposure.",
            pitfalls: [
              "Skipping the NOI / debt service ratio check in stress — it's the single best capital call indicator.",
              'Modeling refinance at base-case NOI without checking stressed NOI qualification.',
              'Treating "we\'ll sell early if needed" as a risk mitigant — early sales in down markets compound losses.',
              "Believing your operations excellence will save a structurally fragile deal — capital calls don't happen because the operator was bad; they happen because the deal was structurally too levered.",
              'Not modeling the equity gap explicitly when stress shows refinance failure — vague hand-waving instead of dollar amounts.',
            ],
            related: ['stress-t01-four-scenarios', 'stress-t04-cap-rate', 'uw-t10-bear-case'],
          },
        ],
        deepDive: [
          'The four stress tests every deal must pass before LOI.',
          'Pricing deferred maintenance from a property condition report — line-by-line.',
          'Cap-ex reserves: why under-budgeting here is the most common operator mistake.',
        ],
        quiz: [
          {
            q: 'Your underwrite passes single-variable stress on rent (-1% growth: 11.4% IRR), vacancy (12%: 12.2% IRR), and exit cap (+75bps: 11.8% IRR). Combined stress (all three at once): IRR 4.8% with positive cash flow throughout. What is the right read?',
            a: 'Submit LOI — deal absorbs combined stress with positive IRR, no capital call.',
            why: 'The bear case threshold is positive levered IRR (above 4%) and zero capital call risk. This deal hits 4.8% IRR under combined stress with positive cash flow. That clears the threshold. The deal is structurally sound through real cycle math.',
            trap: 'Operators sometimes assume "if the combined stress is below 8% IRR, the deal is no good." But the threshold is 4% positive, not 8%. A deal that produces 4.8% IRR under bear case AND 15% IRR under base case is delivering meaningful upside with downside protection.',
            topicId: 'stress-t01-four-scenarios',
            difficulty: 'operator',
            choices: [
              'Pass — combined IRR below 6% is too thin',
              'Submit LOI — deal absorbs combined stress with positive IRR, no capital call',
              'Submit LOI but only at lower price',
              'Walk away — three single-variable stress passes is a red flag',
            ],
            correctIndex: 1,
          },
          {
            q: 'Base case rent growth is 3% annual, IRR 16.2%. Stress at 0% rent growth: IRR drops to 7.1%. What is the diagnosis?',
            a: 'The deal is a rent growth bet — 9.1-point IRR delta means most returns come from market lift, not the deal itself.',
            why: 'A 9-point IRR delta from rent growth alone means about 60% of the IRR depends on the rent growth assumption holding. Without rent growth, the deal delivers 7.1% — barely above pref. The operator is underwriting market gravity, not deal-specific value-add or basis advantage.',
            trap: 'New operators see 16.2% base case IRR and assume the deal is strong. They miss that the IRR is fragile to assumptions outside their control. A deal where rent growth carries most of the IRR is structurally a macro bet — not a real estate deal.',
            topicId: 'stress-t02-rent',
            difficulty: 'operator',
            choices: [
              'Strong deal — base case is high',
              'The deal is a rent growth bet — 9.1-point IRR delta means most returns come from market lift, not the deal itself',
              'Acceptable — even stressed IRR is positive',
              'Run vacancy and cap rate stress before deciding',
            ],
            correctIndex: 1,
          },
          {
            q: 'A 5-year hold deal at 5.40% entry cap, base case exit 5.65%. At +100bps exit cap stress (6.40% exit), IRR turns negative with year-3 capital call risk. What is the right action?',
            a: "Walk away — deal can't survive a real cycle correction.",
            why: "Cap rate +100bps is what real cycles produce — 2008, 2022. If your IRR turns negative at that scenario with capital call risk, the deal can't survive a real cycle. Lowering price might absorb some of the stress, but at the price the seller would accept, the deal still likely has fragile economics. The disciplined call is to pass and wait for a deal that survives.",
            trap: '"But the base case IRR is 14% — that\'s strong." The base case is the world that goes well. Stress tests are the world that does not. A deal that requires the world to go well to deliver returns is not a real estate deal — it is a directional macro bet.',
            topicId: 'stress-t04-cap-rate',
            difficulty: 'operator',
            choices: [
              'Submit LOI — base case is healthy',
              'Submit LOI at lower price to absorb cap stress',
              "Walk away — deal can't survive a real cycle correction",
              'Reduce leverage to 60% LTV and resubmit',
            ],
            correctIndex: 2,
          },
          {
            q: 'An OM shows Year 1-3 capex at $850K on a 144-unit value-add deal. The PCR (property condition report) flags roof at end of useful life and 35% of HVAC needing replacement. Your honest underwrite of capex year 1-3:',
            a: 'Build from PCR line by line + ongoing reserves + 20% contingency, likely $1.5-1.9M.',
            why: "The OM's $850K reflects the seller's pro forma — typically excluding deferred maintenance and ongoing reserves. The PCR tells you what's actually needed. Roof at $1.4M replacement plus 35% × 144 × $5K HVAC ($250K) plus ongoing reserves ($150K) plus contingency easily lands $1.5-1.9M. This is how operators discover their capex was 80-100% under-budgeted at variance review.",
            trap: "Operators trust the OM's capex line because it's an objective-looking number. It's not — it's the seller's pitch. The PCR is the audit tool. Every line item from PCR + ongoing reserves + 15-25% contingency is the honest number.",
            topicId: 'stress-t05-deferred-maintenance',
            difficulty: 'application',
            choices: [
              "$850K — accept the OM's number",
              '$850K + 15% contingency = $978K',
              'Build from PCR line by line + ongoing reserves + 20% contingency, likely $1.5-1.9M',
              '$1.0M flat for safety',
            ],
            correctIndex: 2,
          },
          {
            q: 'Combined stress test (rent + vacancy + cap rate) shows year-3 NOI / debt service ratio of 0.94. What does this signal?',
            a: "Capital call risk — NOI below debt service means equity has to fund the gap.",
            why: "NOI / debt service ratio below 1.0 means operating income can't cover debt service. The shortfall has to be funded by reserves (if any) and then by capital call to LPs. Year-3 0.94 ratio is a near-certain capital call in a year where stress conditions hold. Even if other years are above 1.0, year-3 alone triggers the capital call event — and once you've called capital, LP trust is permanently affected.",
            trap: 'Operators sometimes see "ratio just slightly below 1.0" and assume cash reserves cover it. That\'s true once. But stress conditions don\'t last one year — they typically span 18-36 months. A 0.94 ratio in year 3 is usually accompanied by sub-1.0 ratios in years 2 or 4. Reserves run out. Capital call follows.',
            topicId: 'stress-t07-capital-call',
            difficulty: 'operator',
            choices: [
              'Marginal but acceptable — ratio above 0.85 is fine',
              'Capital call risk — NOI below debt service means equity has to fund the gap',
              'Refinance opportunity — restructure to lower debt service',
              'Acceptable if other years are above 1.0',
            ],
            correctIndex: 1,
          },
        ],
        mistakes: [
          {
            trap: 'Treating stress test as compliance theater.',
            why: 'Stress testing is supposed to be a decision input, not a compliance check. Operators who run stress tests as a box-check ritual eventually buy deals that fail under cycle conditions. The point of running the test is to actually let the result change the LOI decision.',
            fix: 'Set explicit thresholds before you run the test. Combined stress IRR must be above 4% AND no capital call. If the deal fails the threshold, pass. Period. Do not rationalize ("the bear case is too pessimistic"). The threshold is the protection.',
            topicId: 'stress-t01-four-scenarios',
          },
          {
            trap: 'Underbudgeting CapEx by skipping the PCR.',
            why: "Sellers' capex pro forma reflects what they spent during their hold (which was likely deferred). Buyers inherit deferred maintenance as year-1 expense. Operators who skip the PCR audit find their actual year-1 capex 80-150% above their underwrite. That hits cash flow, hits IRR, and on stressed deals can trigger capital calls.",
            fix: "Always pull the PCR. If the seller hasn't commissioned one, commission your own during DD. Build capex from PCR line items: roofs, HVAC, plumbing, parking, exterior, interior. Add 15-25% contingency. Add ongoing reserves separately. Don't combine the two categories.",
            topicId: 'stress-t05-deferred-maintenance',
          },
          {
            trap: 'Single-variable stress instead of combined.',
            why: 'Real cycles correlate the variables. Rent flattens because supply outran absorption. Vacancy rises because tenants walk to cheaper alternatives. Cap rates widen because risk premium expands. The single-variable stress tests do not model this correlation. Combined stress does.',
            fix: 'Always run combined stress as the final test. Hold rent at 0%, vacancy at 11-13%, exit cap +75bps. The deal must survive combined stress, not just each variable in isolation.',
            topicId: 'stress-t01-four-scenarios',
          },
          {
            trap: 'Forgetting that ongoing reserves continue after renovation.',
            why: "Renovation is one-time execution capex. Ongoing reserves are permanent operating cost. Even on a fully renovated property, you'll spend $250-400/door/year on roofs, HVAC, plumbing, and ongoing maintenance. Operators who under-reserve discover at year 4-5 that their cash flow is consumed by capex they did not model.",
            fix: 'Always carry ongoing reserves at $300-400/door (B-class) or $250-300/door (A-class) annually for the entire hold, in addition to the renovation budget. Lender reserve requirements specify the minimum. Treat both as permanent operating costs.',
            topicId: 'stress-t06-reserves',
          },
        ],
      },
      // ═══════════════════════════════════════════════════════════════════
      // MODULE 5 · Debt Sourcing — full content (Wave SS-2.8)
      // ═══════════════════════════════════════════════════════════════════
      {
        id: 'debt',
        title: 'Module 5 · Debt Sourcing',
        duration: '3 hrs',
        description:
          'Agency, bank, bridge — match the debt structure to the deal. Term sheet review, DSCR + LTV math, refinance optionality, and the lender conversation that actually moves the deal forward.',
        topics: [
          {
            id: 'debt-t01-landscape',
            title: 'The debt landscape · agency, bank, bridge',
            summary:
              "Three debt sources dominate multifamily — agency, bank, bridge. Each has a sweet spot. The wrong choice traps you for 5+ years. The right choice carries you through cycles.",
            body:
              "Multifamily debt is not commoditized. Three lenders compete, each optimized for different deals.\n\n**Agency debt** — Fannie Mae, Freddie Mac, HUD. Long-term (7-10 year terms typical), low rates (50-100bps below bank), non-recourse, and the cleanest exit. Available on stabilized, cash-flowing properties with strong sponsorship. The standard for held assets.\n\n**Bank debt** — local and regional banks, sometimes life insurance companies. Shorter terms (3-5 year), higher rates (50-100bps above agency), often recourse, more flexible covenants. Available when agency won't underwrite (lease-up, recent rehab, smaller deals, less seasoning). The relationship lender for operators with bank ties.\n\n**Bridge debt** — debt funds, private lenders, mortgage REITs. Short-term (12-36 months), highest rates (150-300bps above bank), interest-only, fast close. Available for value-add execution where you need flexibility before agency takeout. The high-octane option.\n\nThe matching question is: what's your business plan? A stabilized hold is agency. A 12-month value-add followed by stabilized hold is bridge then agency. A 24-month deep value-add with rate uncertainty is bank with extension options.\n\n**The trap operators fall into:** mismatching debt to plan. Stabilized debt on a value-add forces sale at execution year — exit timing isn't yours. Bridge on a stabilized hold burns 200bps of unnecessary rate. Bank with prepay penalties on a deal you'll refinance in year 3 — penalty kills the savings.\n\nThe discipline: pick debt that matches your hold thesis. If you don't know your hold, you're not ready for debt. If you know your hold, the debt choice often picks itself.\n\nThe Rescia debt model (in your toolkit) sets up the comparison — same deal underwritten with three debt structures, IRRs side by side. Run it on every deal.",
            example:
              "Mesa 144-unit value-add 2024: 18-month renovation, then stabilized hold. Bridge for $26M at 7.4% IO for 24 months, then refi to agency at $32M at 5.95% for 7-year term. Modeled both legs separately. Year-1-2 IRR was 4% (carry costs). Year-3+ IRR jumped to 18%. Total 5-year IRR 14.8%. Same deal modeled with all-agency at close: lender wouldn't underwrite the renovation downtime risk; deal couldn't close.",
            pitfalls: [
              "Picking debt before defining your hold thesis — they're inseparable.",
              '"Lowest rate" as the optimization target — exit flexibility often beats rate.',
              'Forgetting that bridge-to-agency is two loans (origination fees twice, two close events).',
              'Not modeling all three debt structures on every deal — operators skip this and pick agency by default.',
              'Treating recourse as a binary "ok / not ok" — recourse is negotiable on terms.',
            ],
            related: ['debt-t04-bridge', 'debt-t07-refinance'],
          },
          {
            id: 'debt-t02-agency',
            title: 'Agency debt · Fannie / Freddie / HUD',
            summary:
              'Agency is the gold standard for stabilized multifamily — long-term, low-rate, non-recourse, and cleanly exit-flexible. Most operators buy with agency-takeout in mind.',
            body:
              "Three agencies dominate multifamily long-term debt:\n\n**Fannie Mae DUS** — the Delegated Underwriting Servicer program. 7-15 year terms standard (10 most common), fixed or floating rate, 65-80% LTV typical, 1.20-1.25 minimum DSCR. Available on stabilized properties with at least 3 months of operating history. Non-recourse with bad-boy carveouts (fraud, environmental).\n\n**Freddie Mac Optigo** — competing program. Similar terms to Fannie. Slightly different underwriting criteria. The two compete on rate; you should always shop both.\n\n**HUD 223(f)** — government-backed, longest term (35-year fully amortizing), lowest rate (often 50-150bps below Fannie/Freddie). Slow to close (8-12 months), rigorous DD, sponsor restrictions. Available for affordable and workforce housing primarily. Worth the time if your hold is 10+ years.\n\n**Why agency wins for stabilized hold:**\n\n- Non-recourse — your other assets aren't at risk\n- Long term — no refinance risk in years 3-5\n- Low rate — 50-100bps below bank, 200-300bps below bridge\n- Predictable amortization — you can model debt service through the full hold\n- Liquid market — easy to sell loan or property with assumption potential\n\n**Why agency loses on value-add:**\n\nAgency requires stabilization. A property at 80% occupancy with rents 30% below market won't qualify for agency at full LTV. Operators try to underwrite 'trail-12 stabilized NOI' which agency doesn't accept — they look at actuals plus a small forward credit. Result: agency loan size on a value-add is often 60-65% LTV, not the 75% you'd want.\n\n**The exit consideration:**\n\nAgency loans typically have prepayment lockout (often 12-24 months) and yield maintenance (10+ years). If you sell or refinance early, the prepay penalty can be 8-15% of loan balance. Plan your hold to minimize this — or factor the prepay into your underwrite explicitly.",
            example:
              "DFW 192-unit stabilized hold acquisition 2023. Fannie Mae DUS 10-year fixed at 5.45%, 75% LTV ($28.5M loan on $38M deal), 1.30 DSCR. Non-recourse. Agency takeout strategy from prior operator's bridge debt. We compared Freddie Optigo (5.51% at same terms). Picked Fannie. Locked in Q3 2023; rate would have been 75bps higher 12 months earlier. The agency execution was clean. The 10-year term also means we don't have refi risk through 2033.",
            pitfalls: [
              'Defaulting to Fannie without shopping Freddie — sometimes Freddie is 25-50bps better.',
              "Assuming agency will fund a value-add at full proceeds — they won't until the property stabilizes.",
              'Forgetting prepayment penalties — yield maintenance can be 10-15% of balance on early exits.',
              'Not negotiating terms — interest rate is rate, but origination fees, escrow requirements, replacement reserves are negotiable.',
              "Treating HUD as 'too slow to bother' — for hold periods of 10+ years, HUD's rate advantage is meaningful.",
            ],
            related: ['debt-t01-landscape', 'debt-t07-refinance'],
          },
          {
            id: 'debt-t03-bank',
            title: 'Bank debt · the relationship lender',
            summary:
              "Bank debt fills the gap when agency won't underwrite. Shorter, more flexible, often recourse, and built on relationship. The right tool for transitional deals.",
            body:
              "Banks lend on multifamily where agency can't or won't. The trade-off: shorter terms, often recourse, sometimes higher rates — in exchange for flexibility, faster execution, and willingness to underwrite transitional cash flow.\n\n**When banks make sense:**\n\n- Property is recently rehabbed but not yet at agency-qualifying NOI\n- Deal size is below agency minimums ($5M for some agency programs)\n- Sponsor lacks agency-approved status (newer operator, single-asset entity)\n- Quick close needed — banks can close in 30-45 days vs agency's 60-90\n- Specific business plan unsuitable for agency (heavy renovation, lease-up, partial vacancy)\n\n**Standard bank terms:**\n\n- 3-5 year term, sometimes with extension options to 7\n- Floating rate priced over SOFR (S+250-350bps typical for B-class)\n- Fixed-rate options available on longer terms\n- 65-75% LTV\n- 1.20-1.25 DSCR\n- Often 25-30 year amortization (so balloon payment at maturity)\n- Recourse common on smaller deals; non-recourse negotiable on stronger sponsors\n\n**The recourse question:**\n\nBank loans frequently come with recourse — meaning if the deal fails, the lender can pursue your other assets and personal guarantees. This is structurally different from agency non-recourse. New operators sometimes don't realize they're personally guaranteeing the debt.\n\nNegotiate. Strong sponsors with relationship history can often get to 25-50% recourse, or carve-out only structures (recourse only on bad-boy events). The default term sheet won't show this — you have to ask.\n\n**The relationship dimension:**\n\nBank lenders work on relationships. A regional bank that knows you and your deals will give you better terms, faster execution, more flexible covenants than a money-center bank evaluating you cold. Building 1-2 banking relationships before you need them is operational discipline. Operators who try to find debt during DD discover that their first deal is also their first lender introduction — that's a tough position.",
            example:
              "Phoenix 220-unit value-add 2024. We needed a 36-month bridge facility with extension to 60 months. Bank A (regional, 5-year relationship): SOFR + 285, 75% LTV, 25% recourse, 30-year am. Bank B (money-center, no relationship): SOFR + 320, 65% LTV, 100% recourse, 25-year am. The relationship was worth ~50bps of rate, 10% more leverage, 75% less recourse. We closed with Bank A in 38 days.",
            pitfalls: [
              'Not understanding recourse before signing — your house is collateral on a recourse loan.',
              'Treating banks as commodities — relationship matters more than 10bps of rate.',
              'Forgetting balloon payment risk — 5-year bank loan with 30-year am leaves ~85% of principal at maturity.',
              'Skipping floor rate negotiation on floating debt — floating without floor in a low-rate environment is fine, with one in a high-rate environment is expensive.',
              'Building relationship only when you need debt — first introduction during DD is too late.',
            ],
            related: ['debt-t08-lender-conversation'],
          },
          {
            id: 'debt-t04-bridge',
            title: 'Bridge debt · short-term, higher-rate, value-add',
            summary:
              "Bridge debt is the high-octane option for value-add execution. Short, expensive, flexible. Used right, it carries you through renovation. Used wrong, it traps you when rates move against you.",
            body:
              "Bridge debt funds the gap between acquisition and stabilization. The lender accepts execution risk in exchange for higher rates and shorter terms. Used appropriately, it's the right tool for value-add. Used inappropriately, it's the trap that wiped out hundreds of operators in 2022-2023.\n\n**Standard bridge terms:**\n\n- 12-36 month term, often with 1-2 extension options at lender's discretion\n- Interest-only (no amortization during the loan)\n- Floating rate priced at SOFR + 350-500bps for value-add (vs +250-350 for bank)\n- 70-85% LTV including renovation budget (loans against the as-completed value)\n- Future funding facility for the renovation capex\n- Origination fees 1-2% of loan amount, plus exit fees on some structures\n\n**The bridge-to-agency play:**\n\nStandard execution: take bridge to acquire and renovate (24 months). Stabilize. Refinance to agency for the long-term hold. Bridge does the heavy lifting; agency does the long-term carry.\n\n**The bridge trap:**\n\nBridge loans mature. When they mature, you have three options: refinance to agency (best case), extend the bridge (often expensive, lender's option), or sell. If the market has moved against you — rates higher, NOI weaker, cap rates wider — none of those options work. You can't qualify for agency at the size you need. The bridge lender wants to be paid out. You have a forced sale at a bad price.\n\nThis is what happened to thousands of Sun Belt operators in 2022-2023. They borrowed bridge in 2021 at SOFR + 300 (5-6% all-in). When the bridge matured in 2023, agency rates were 6.5%+, NOI had flattened, cap rates had widened. Refinance gap was $5-15M per deal. Operators called capital, sold at distress, or surrendered to lenders.\n\n**The discipline:**\n\nMatch bridge tenor to your business plan. If you need 36 months to renovate, take 36-month bridge with extension to 60. Don't take 24-month bridge for a 36-month plan. Build refinance flexibility into the structure: prepay rights at month 12, extension options at lender's standard terms (not punitive ones), and an interest rate cap if floating.\n\nMost importantly: don't take bridge unless you'd be comfortable holding the asset for 24-36 more months if refinance fails. Bridge is a tool, not an exit strategy.\n\n---\n\n**◆ Mastery Live members workshop this on a real deal.**\n\nBridge debt decisions are where coaching saves the most money. Self-Study gives you the framework. Live members bring their bridge term sheets to a monthly call and Diva and Lou pressure-test the structure with them — flagging the extension terms that look fine but aren't, the rate cap costs that operators forget to negotiate, the prepay structures that lock you in if rates drop. Operators who took bridge in 2021 without coaching are now in workout. Operators who took bridge with coaching adjusted the structure and survived.",
            example:
              "Phoenix 220-unit 2024 acquisition. Bridge term sheet from Lender A: 24-month term, no extension, SOFR + 425, no rate cap, 1.5% exit fee, prepay penalty if paid off before month 18. We pushed back. Final structure: 30-month term + 12-month extension at SOFR + 425 (renewing pricing), rate cap purchased at 6.50%, 0.75% exit fee, prepay rights after month 12 with no penalty. The negotiation cost us $40K (rate cap purchase) but bought 18 more months of flexibility. Worth it.",
            pitfalls: [
              'Taking 24-month bridge for a 36-month renovation plan.',
              "Skipping the rate cap in a rising-rate environment to save $40-60K — the worst $40K you'll ever save.",
              "Not negotiating extension options — the term sheet's 'extension at lender discretion' can be punitive.",
              "Forgetting exit fees — they're on top of prepay penalties.",
              "Treating bridge as the path forward — it's a 24-month loan, not a 5-year strategy.",
            ],
            related: ['debt-t01-landscape', 'debt-t07-refinance', 'stress-t07-capital-call'],
          },
          {
            id: 'debt-t05-term-sheet',
            title: 'Reading a term sheet',
            summary:
              "The term sheet is the blueprint of your loan. Read every line, push on what matters, and never sign until you've negotiated.",
            body:
              "Term sheets look formal but they're negotiating documents. Lenders write them favoring themselves. Your job is to understand which terms are stuck (regulatory, lender policy) and which are leverage (rate, fees, covenants). Then push on the leverage.\n\n**Stuck terms:**\n\n- Regulatory caps (LTV, DSCR minimums for agency)\n- Underwriting standards (lender's loan committee requires specific docs)\n- Specific deal structures (e.g., agency requires non-recourse)\n\n**Negotiable terms:**\n\n- **Interest rate.** Always negotiate. Agency rates have spread bands; banks always have floor rates and ceilings. 25-50bps is common negotiation range.\n- **Origination fees.** Often quoted at 1.0% but negotiate to 0.50-0.75% on competitive loans.\n- **Prepay penalties.** Yield maintenance terms are sometimes negotiable. Step-down structures (5%, 4%, 3%, 2%, 1%) are softer than yield maintenance.\n- **Recourse.** Always push to non-recourse. If can't get full non-recourse, push for limited recourse with carve-outs.\n- **Reserve requirements.** Cap-ex reserves, tax escrow, insurance escrow — all have standard rates that are negotiable on stronger sponsors.\n- **Covenants.** DSCR test frequency (annual vs quarterly), occupancy minimums, financial reporting requirements.\n- **Future funding.** On bridge or value-add, push for future funding for the full capex budget at the same rate.\n\n**The sequence:**\n\n1. Receive draft term sheet\n2. Compare against 2 competing lenders' term sheets\n3. Push on the 3-5 terms most material to your business plan\n4. Lender counter-proposes\n5. Final term sheet — sign and proceed to loan documents\n\nIf the lender won't negotiate at all, walk. There are other lenders. The willingness to negotiate is itself a quality signal — relationship lenders negotiate; commodity lenders don't.",
            example:
              "Plano 192-unit 2024. First term sheet from Lender A: 5.65% rate, 1.0% origination, 30-year am, 1.25 DSCR. We negotiated against Lender B's term sheet (5.45%, 0.65% orig). Final from Lender A: 5.50%, 0.65% orig, 30-year am. Saved 15bps rate ($85K over 5 years) and $60K in origination. Total negotiation: 4 emails over 7 days.",
            pitfalls: [
              'Signing the first term sheet without comparison.',
              'Negotiating only on rate — fees, reserves, covenants compound.',
              'Skipping recourse negotiation — biggest single negotiable term on bank deals.',
              "Treating 'we can't change that' as truthful without testing.",
              "Not bringing competitive term sheets — you can't negotiate against air.",
            ],
            related: ['debt-t03-bank', 'debt-t08-lender-conversation'],
          },
          {
            id: 'debt-t06-dscr-ltv',
            title: 'DSCR and LTV math',
            summary:
              'Two ratios determine your loan size: Debt Service Coverage Ratio (NOI / debt service) and Loan-to-Value (loan / appraised value). The lender uses both. The smaller of the two is your max loan.',
            body:
              "DSCR and LTV are the two constraints every loan navigates.\n\n**DSCR (Debt Service Coverage Ratio).** NOI divided by annual debt service. Lender minimums: 1.20-1.25 for stabilized agency, 1.20 for bank, 1.15 for some bridge structures. The lender wants buffer above debt service so a bad year doesn't trigger default.\n\nDSCR formula: NOI / (P + I) where P+I = annual principal and interest.\n\nIf your stabilized NOI is $1.85M and the lender requires 1.25 DSCR, max debt service is $1.85M / 1.25 = $1.48M. At 5.50% rate / 30-year am, that supports a loan of approximately $26.0M.\n\n**LTV (Loan-to-Value).** Loan amount divided by appraised value. Lender maximums: 75-80% for agency, 65-75% for bank, 70-85% for bridge against as-completed value. The lender wants equity skin in the game.\n\nIf your appraised value is $35M and the lender allows 75% LTV, max loan is $26.25M.\n\n**The binding constraint.**\n\nThe lender lends the smaller of DSCR-supported amount and LTV-supported amount. In the example: $26.0M (DSCR) vs $26.25M (LTV). DSCR binds at $26.0M.\n\nWhen does each constraint typically bind?\n\n- DSCR binds on lower-rent, lower-NOI deals (Class C, transitional, lease-up)\n- LTV binds on higher-rent, higher-NOI deals (stabilized A and B class)\n- DSCR binds harder when rates rise (debt service increases, NOI doesn't)\n- LTV binds harder when cap rates compress (asset values rise faster than NOI)\n\n**Sensitivity to rate.**\n\nEvery 25bps of rate change moves the DSCR-supported loan amount by roughly 3%. If rates climb from 5.50% to 6.25% during your DD, your max loan size drops by about 9%. If you're using max leverage, this can be a $2-3M equity gap that wasn't there at LOI.\n\n**The discipline:** model both ratios at the lender's actual minimums, not at your aspirational numbers. If DSCR forces you to a lower loan size than LTV would allow, you have less leverage than you assumed. Adjust the equity check accordingly.",
            example:
              "Mesa 144-unit 2024. Stabilized year-1 NOI $1.74M. Appraised $33M. Agency lender requires 1.25 DSCR / 75% LTV at 5.95% rate. DSCR-supported: $1.74M / 1.25 = $1.39M debt service / 5.95% = approximately $24.4M loan. LTV-supported: $33M × 75% = $24.75M loan. DSCR binds. Max loan $24.4M. We sized the equity check at $9.6M instead of the $9.25M I'd assumed at LOI.",
            pitfalls: [
              'Using your aspirational DSCR instead of lender minimum.',
              "Forgetting that DSCR uses underwriter NOI (their adjusted number) not your model NOI.",
              'Treating LTV from the OM\'s "asking price" instead of appraised value.',
              'Not modeling sensitivity to rate — 25bps is real money.',
              "Assuming LTV is the binding constraint when it's usually DSCR for value-add.",
            ],
            related: ['debt-t02-agency', 'uw-t01-model-architecture'],
          },
          {
            id: 'debt-t07-refinance',
            title: 'Refinance optionality',
            summary:
              'Your loan structure determines whether you have flexibility through your hold. Yield maintenance, defeasance, prepayment penalties — they look like fine print, but they are the difference between exit on your terms and exit on the lender\'s terms.',
            body:
              "Multifamily loans often have prepayment penalties that can be 8-15% of loan balance. This isn't fine print — it's the constraint that determines when and how you can exit.\n\n**Yield maintenance.** The most punitive structure. If you prepay, you owe the lender the present value of all interest payments they would have earned through maturity. On a 10-year fixed-rate loan in year 3, yield maintenance can be 12-18% of loan balance.\n\n**Defeasance.** A common alternative on agency loans. You buy a portfolio of Treasuries that exactly match the lender's future payments. The lender holds the Treasuries and you're released from the loan. Cost is roughly equivalent to yield maintenance, but the structure is different.\n\n**Step-down prepayment.** Bank-style. Penalty starts at 5% in year 1, drops to 4% in year 2, then 3-2-1, then $0 after year 5. Much softer than yield maintenance.\n\n**Open prepayment.** No penalty. Available on shorter-term loans and some bridge facilities.\n\n**Why it matters:**\n\nIf you want flexibility to refinance into lower rates, sell, or restructure, prepay penalties cost you. A 10% yield maintenance penalty on a $25M loan is $2.5M — that's most of your equity returns to date.\n\n**The hold period match:**\n\nIf you're confident in a 7-year hold, agency 10-year fixed with yield maintenance is fine — you'll be at year 7-8 when penalty steps down meaningfully. If you're considering exit at year 3-5, agency 10-year is the wrong loan. Either take agency 7-year (matures cleanly) or consider bank with step-down penalty.\n\n**The cycle interaction:**\n\nIn a falling-rate environment (rates dropping from 6.5% to 5.0%), prepay penalties protect lenders from refinance pressure. In a rising-rate environment, prepay penalties don't bite — you wouldn't want to refinance into a higher rate anyway.\n\n**The trap:**\n\nOperators take 10-year agency at low rates because the rate is attractive. Three years in, they want to sell or restructure. Yield maintenance kills the math. They're stuck holding through year 7+ regardless of strategy.\n\nDon't take debt with structural penalties that don't match your hold thesis. Match the loan tenor and prepay structure to your actual exit plan.",
            example:
              "DFW 192-unit 2023. We modeled three loan structures: Fannie 10-year fixed at 5.45% with yield maintenance, Fannie 7-year fixed at 5.55% with yield maintenance, bank 5-year at 5.95% with step-down. Our hold thesis was 5-7 years. The 10-year was the lowest rate but stuck us through year 9. The 7-year had matched maturity. The bank had 3-year step-down. We picked Fannie 7-year. Maturity aligned with our exit. If we had to extend, agency assumption was available.",
            pitfalls: [
              'Picking lowest rate without checking prepay structure.',
              "Not modeling yield maintenance cost at year 3 vs year 7 — they're radically different.",
              "Forgetting that refinance flexibility has option value, even if you don't exercise.",
              'Treating agency 10-year as default — sometimes 7-year is the right tenor.',
              'Skipping defeasance modeling — sometimes cheaper than yield maintenance, sometimes not.',
            ],
            related: ['debt-t02-agency', 'debt-t04-bridge'],
          },
          {
            id: 'debt-t08-lender-conversation',
            title: 'The lender conversation',
            summary:
              "Lenders want to lend. Your job is making it easy for them to say yes. The conversation that earns you the loan you want isn't transactional — it's a relationship that compounds across deals.",
            body:
              "The lender's loan officer is your channel into the institution. Underwriters write the loan based on what the LO presents. Build the LO relationship and the loan terms get better.\n\n**What loan officers need from you:**\n\n- A clear deal narrative — why this property, this submarket, this business plan\n- Real numbers, not pro forma fiction — actuals, T-12 P&L, rent roll, comp analysis\n- Operator track record — what you've closed, how it performed, references\n- Sponsor strength — net worth, liquidity, experience, references\n- Use of proceeds — exactly what the loan funds, what's at-close vs future-funded\n\nThe LO uses your package to advocate to the loan committee. The better your package, the easier their advocacy.\n\n**What loan officers want to avoid:**\n\n- Surprises during DD — material issues that surface after term sheet\n- Late documents — every delayed doc tightens their timeline\n- Pro forma overreach — assumptions that won't survive their underwriter's review\n- Sponsors who renegotiate every line — if you push on every term, they'll move slower next deal\n\n**Building the relationship:**\n\nMultifamily debt is relationship-driven. The 3rd loan with a lender goes faster than the 1st. The 5th deal gets favorable rate treatment that wasn't available on the 1st. Build the relationship with one deal that closes cleanly, then compound it.\n\nThe introduction call before you have a specific deal to discuss is high-leverage. 'Here's what we typically buy. Here's our track record. We're 6 months out from our next acquisition. Can I keep you posted?' Most LOs say yes. Most operators don't make this call.\n\n**The post-close discipline:**\n\nAfter the deal closes, send the LO quarterly performance updates. Share variance reports. When NOI exceeds pro forma, tell them. When it underperforms, tell them why and what you're doing. Operators who treat the lender as an after-close afterthought lose the relationship. Operators who treat them as a partner build leverage for the next deal.\n\n**The ask:**\n\nWhen you're ready to close on the next deal, the LO knows your name, your numbers, and your pattern. The term sheet starts at better rate than a cold deal. The execution is faster. The next deal compounds the value of this one.",
            example:
              "Our Phoenix 220-unit deal in 2024 was our 4th loan with the same regional bank. First three were standard term sheet (SOFR + 320, 75% LTV, 25% recourse). Fourth deal: same LO walked the term sheet through committee in 9 days (vs 21 on first deal), priced at SOFR + 285 (35bps better), 80% LTV (more leverage), 15% recourse (less personal exposure). Same lender, same operator, much better terms. The relationship was the leverage.",
            pitfalls: [
              'Treating LOs as transactional rather than relational.',
              'Skipping the introduction call before you need debt.',
              'Not sending post-close updates — quarterly reports cost 30 minutes and compound across deals.',
              'Renegotiating every single line — push on the 3-5 things that matter, accept the rest.',
              'Burning a relationship by walking late in DD — even if your reasons are right, the LO remembers.',
            ],
            related: ['debt-t03-bank', 'debt-t05-term-sheet'],
          },
        ],
        deepDive: [
          'Agency vs bank vs bridge — the right debt for the right business plan.',
          'Reading a term sheet: which terms are non-negotiable vs which are leverage.',
          'Refinance optionality and why short-term debt traps operators in bad cycles.',
        ],
        quiz: [
          {
            q: 'A value-add deal needs 24 months of renovation, then a 4-year stabilized hold. Which debt structure best matches?',
            a: 'Bridge debt for 30 months, then refinance to agency.',
            why: "Bridge accommodates renovation downtime that agency won't underwrite. Once stabilized, refi to agency for the long-term hold. Two-loan structure matches the two-phase business plan.",
            trap: "New operators sometimes pick agency at close to 'lock in low rates' — but agency won't fund the renovation, and the loan amount drops by 10-15% because the property doesn't qualify at full LTV. Better leverage AND better fit on bridge-to-agency.",
            topicId: 'debt-t01-landscape',
            difficulty: 'application',
            choices: [
              '10-year agency at close',
              'Bridge debt for 30 months, then refinance to agency',
              '5-year bank with extension options',
              '7-year agency with deferred funding for renovation',
            ],
            correctIndex: 1,
          },
          {
            q: "Bank A's term sheet shows 100% recourse on a $25M loan to a single-asset LLC sponsor. The lender says \"100% is standard for first deals.\" What's the right read?",
            a: 'Push back — recourse is negotiable, target 25-50% with carve-outs.',
            why: "Recourse is negotiable. A strong sponsor with track record and liquidity can typically get to 25-50% recourse, or carve-out structures (recourse only on bad-boy events like fraud or environmental). The lender's 'standard' is their starting position, not regulation. Push.",
            trap: 'Operators sometimes assume the term sheet language is final. Bank loan officers expect to negotiate. The willingness to push back signals you understand the terms — which itself improves the relationship.',
            topicId: 'debt-t03-bank',
            difficulty: 'operator',
            choices: [
              'Accept — first deals are always full recourse',
              'Push back — recourse is negotiable, target 25-50% with carve-outs',
              'Walk to a different lender',
              'Increase down payment to lower LTV',
            ],
            correctIndex: 1,
          },
          {
            q: "A 24-month bridge loan on a 36-month renovation business plan, no rate cap, no extension option, in a rising-rate environment. What's the most likely outcome at month 24?",
            a: 'Capital call risk — bridge mature before stabilization, no extension, refinance gap likely.',
            why: "Bridge mature at month 24, but renovation is at month 24 of a 36-month plan — property isn't stabilized. Agency won't fund a non-stabilized property at full LTV. With no extension option, lender controls the timeline. Rising rates mean refinance gap widens. Capital call or distressed sale follows. This is what happened to thousands of Sun Belt operators in 2022-2023.",
            trap: 'Operators take 24-month bridge for 36-month plans because the rate is 25-50bps cheaper than 30-month bridge. The savings vanish the moment the bridge matures into the wrong rate environment.',
            topicId: 'debt-t04-bridge',
            difficulty: 'operator',
            choices: [
              "Renew bridge at lender's option, terms TBD",
              'Refinance to agency on schedule',
              'Capital call risk — bridge mature before stabilization, no extension, refinance gap likely',
              'Sell at full proceeds',
            ],
            correctIndex: 2,
          },
          {
            q: "Stabilized year-1 NOI $1.85M. Appraised value $35M. Agency at 5.95%, 30-year am, requires 1.25 DSCR / 75% LTV. What's your max loan?",
            a: 'Approximately $25.8M — DSCR is the binding constraint.',
            why: 'DSCR binds. NOI $1.85M / 1.25 DSCR = $1.48M max debt service. At 5.95% / 30-year am, debt service of $1.48M supports a loan of approximately $25.8M. LTV would allow $26.25M, but DSCR limits to $25.8M. Lender lends the smaller of the two. The actual binding constraint matters — your equity check is sized off this number.',
            trap: 'Operators model LTV-supported loan as the assumption ($26.25M), then discover at term sheet that DSCR limits to less. The $450K gap becomes equity at close.',
            topicId: 'debt-t06-dscr-ltv',
            difficulty: 'application',
            choices: [
              '$26.25M (75% LTV)',
              'Approximately $25.8M — DSCR is the binding constraint',
              '$26.0M',
              '$24.0M',
            ],
            correctIndex: 1,
          },
          {
            q: "You're targeting a 5-year hold. Lender offers 10-year agency at 5.45% (yield maintenance) vs 7-year agency at 5.55% (yield maintenance). 10bps cheaper on 10-year. What's the right choice?",
            a: '7-year — matches your hold; yield maintenance at year 5 of 7 is meaningfully cheaper than year 5 of 10.',
            why: 'Yield maintenance penalty drops as the loan ages. At year 5 of a 10-year loan, you have 5 years remaining — yield maintenance is roughly 8-12% of balance. At year 5 of a 7-year loan, you have 2 years remaining — yield maintenance is roughly 2-4%. The 10bps rate savings ($25K/year on $25M loan = $125K over 5 years) is dwarfed by the $1-2M+ yield maintenance gap.',
            trap: 'Operators chase the lower rate without checking how the prepay penalty interacts with their hold. The 10bps savings becomes a multi-million-dollar exit cost.',
            topicId: 'debt-t07-refinance',
            difficulty: 'operator',
            choices: [
              '10-year — lower rate',
              '7-year — matches your hold; yield maintenance at year 5 of 7 is meaningfully cheaper than year 5 of 10',
              'Whichever gives more leverage',
              'Bridge instead',
            ],
            correctIndex: 1,
          },
        ],
        mistakes: [
          {
            trap: 'Picking debt before defining hold thesis.',
            why: "Debt and hold are inseparable. A 10-year agency loan is wrong for a 3-year exit. A 24-month bridge is wrong for a 36-month plan. Agency won't fund a value-add. Bank has balloon risk if your plan extends. Each structure has a hold-period sweet spot. Picking debt before defining hold means you'll mismatch.",
            fix: 'Define your hold thesis first. Then pick debt to match. If bridge-to-agency fits, model both legs. If single-loan agency fits, pick the right tenor. The discipline: write your hold thesis on the first page of your underwrite. Every subsequent decision references it.',
            topicId: 'debt-t01-landscape',
          },
          {
            trap: 'Skipping bridge rate caps in rising-rate environments.',
            why: 'A rate cap costs $30-80K depending on tenor and strike. Without it, your floating-rate bridge can climb 200-300bps if rates move against you, costing $500K-$1M+ in extra interest over the loan term. The rate cap is structurally cheap insurance for a high-stakes risk.',
            fix: 'Always purchase rate cap on floating bridge debt in any rate environment. Strike at 100-150bps above current SOFR. The premium is small relative to the protection. Operators who skipped rate caps in 2021-2022 paid for it through 2023-2024.',
            topicId: 'debt-t04-bridge',
          },
          {
            trap: 'Anchoring on rate, ignoring fees and covenants.',
            why: 'Rate is one of many cost drivers. Origination fees compound at close (1% on $25M = $250K up front). Prepay penalties cost at exit. Reserve requirements drain cash flow. Covenant tests can default you on technicalities. Operators who optimize for rate alone overpay on the total cost of debt.',
            fix: 'Negotiate the term sheet line by line. Push on rate, origination, prepay structure, recourse, reserves, covenants. Use competing term sheets to triangulate market. The 4-email negotiation that saves 15bps + 35bps origination + softer prepay structure can total $500K+ savings over the loan life.',
            topicId: 'debt-t05-term-sheet',
          },
          {
            trap: 'Not building lender relationships before you need debt.',
            why: 'Cold relationships start at standard term sheet. Relationship lenders start at preferential terms. The 3rd deal with the same lender closes 50bps better than the 1st cold deal. Operators who try to source debt mid-DD discover that relationship has been compounding for everyone else — and they\'re starting from zero.',
            fix: 'Make introduction calls before you need debt. "Here\'s our pattern. Here\'s our track record. We\'re 6 months out from our next acquisition." Build 2-3 banking relationships and 2-3 agency relationships proactively. Send post-close updates quarterly. The relationship compounds.',
            topicId: 'debt-t08-lender-conversation',
          },
        ],
      },
      // ═══════════════════════════════════════════════════════════════════
      // MODULE 6 · LOI — full content (Wave SS-2.9)
      // ═══════════════════════════════════════════════════════════════════
      {
        id: 'loi',
        title: 'Module 6 · LOI',
        duration: '2 hrs',
        description:
          'Write the LOI that gets accepted and protects your downside. The price line, the deposit ladder, the DD period, the counter-offer math — every clause that determines whether the deal closes on your terms or theirs.',
        topics: [
          {
            id: 'loi-t01-negotiation-doc',
            title: 'The LOI as a negotiation document',
            summary:
              "The Letter of Intent isn't a contract. It's a framework for negotiation. Read what it does and doesn't bind, write it deliberately, and the rest of the deal flows from it.",
            body:
              "The LOI is a 2-4 page document that captures the major business terms of a deal — price, deposit, due diligence period, close date, financing contingencies — before the parties commit to a binding purchase agreement. In most jurisdictions, the LOI itself is non-binding except for specific provisions explicitly stated as binding (typically: confidentiality, exclusivity, expense allocation).\n\nThe LOI does three things:\n\n**1. It sets the negotiation frame.** Once both parties agree to an LOI, subsequent negotiations of the binding PSA happen within the LOI's framework. The LOI's price is hard to renegotiate. Its DD period is the framework for compressing or extending. Its earnest money structure becomes the binding deposit schedule.\n\n**2. It lets the deal move from informal to formal.** The seller takes the property off-market (assuming exclusivity) once an LOI is signed. The buyer commits to good-faith negotiation toward PSA. The deal exits the broker's wider distribution and enters bilateral.\n\n**3. It surfaces deal-killer issues before legal fees stack up.** The LOI negotiation reveals whether buyer and seller can find common ground on price, terms, and timeline. If they can't agree at LOI, they won't agree at PSA — and the LOI conversation is much cheaper than the PSA conversation.\n\nWhat the LOI typically doesn't do:\n\n- It's not legally binding on price, deposit, or DD period (in most states — check yours)\n- It doesn't lock the seller into selling to you (exclusivity is optional and negotiable)\n- It doesn't force you to buy if DD reveals issues\n\nThe discipline: write the LOI as if it were binding. Treat every term as one you'd accept in a binding contract. Many sellers and brokers will take 'non-binding' LOI language as cover for revisiting any term — write the LOI to make that hard.",
            example:
              "Plano 192-unit 2024 LOI. Two pages. Captured price ($33M), earnest money structure ($150K initial / $400K go-hard at day 30), DD period (45 days), close date (75 days from LOI), financing contingency (lender approval through day 30 of DD). Plus exclusivity (45 days) and confidentiality (binding). Seller accepted within 4 hours. The LOI did its job — set the frame, took the deal off-market, moved us to PSA negotiation. Total LOI negotiation: 2 emails, 1 phone call.",
            pitfalls: [
              'Treating the LOI as legally insignificant — the negotiation frame it sets is real.',
              'Writing it in 30 minutes without thinking through every term.',
              'Not including exclusivity language — leaves the seller free to entertain other offers.',
              "Including overly specific terms that you'll regret in PSA.",
              'Treating "non-binding" as license for the seller to renegotiate every term later.',
            ],
            related: ['loi-t04-due-diligence', 'sourcing-t07-qualifying'],
          },
          {
            id: 'loi-t02-price',
            title: 'The price line · making the offer that gets accepted',
            summary:
              'The price line is the heart of the LOI. Get it right and the deal moves to PSA. Get it wrong and you waste 6 weeks. Pricing strategy is built on basis discipline, comp data, and the seller\'s psychology.',
            body:
              "Multifamily LOI pricing is a triangulation between three reads:\n\n**1. Your underwrite.** What price clears your IRR threshold under base case AND survives bear case stress test. This is your maximum.\n\n**2. The comp set.** What similar properties traded at recently in your submarket. Pull the trailing-12 transactions on CoStar or RCA. Adjust for cap rate spread, unit count, asset class, and basis below replacement.\n\n**3. The seller's basis and tax position.** What did the seller pay? When? What's their tax basis? A seller who bought at $20M / $140K per door in 2018 has an $11M+ gain at $30M today — they have more pricing flexibility than a seller who bought at $28M last year.\n\n**The strategy:**\n\nIf your max underwrite price equals or exceeds the asking price, submit close to ask. The seller is anchored on their number.\n\nIf your max is 5-10% below asking, that's the typical negotiation zone. Submit at 8-12% below asking with reasoning. The 4% cushion gives you negotiation room.\n\nIf your max is more than 15% below asking, two options: (a) submit at your max with explanation and walk if rejected, or (b) pass. Don't submit at 'creative' prices that test the seller's patience — you damage the broker relationship.\n\n**The reasoning matters.** A bare-number LOI gets rejected. An LOI that explains the basis ('our underwrite at this price clears 14% IRR with 50bps cap stress; at the asking price it drops to 9%') gives the seller something to negotiate against. Brokers respect operators who price with reasoning.\n\n**Asking-price LOIs are sometimes right.** When the deal is genuinely worth the asking, when basis is below replacement, when the comp set supports the price — don't try to negotiate just because operators are supposed to. Pay the right price, lock the deal, move forward.",
            example:
              "DFW 96-unit re-listing 2023. Original ask $17.5M (no buyers). Re-listed at $15.2M. Reduced to $14.6M after another 3 months. We submitted at $13.9M (4.8% below current ask) with reasoning: '5 prior months of market data confirmed the previous asking didn't clear; our underwrite at $13.9M produces 13.5% IRR base / 5.2% IRR bear case. We'll close in 30 days, no contingencies.' Seller accepted in 48 hours. The reasoning earned the discount.",
            pitfalls: [
              'Submitting bare-number LOIs without reasoning.',
              'Anchoring on the asking price rather than your underwrite.',
              'Submitting at your absolute max with no negotiation room.',
              'Trying to "test" with creative low-ball offers — damages the broker relationship.',
              "Missing the seller's tax basis read — sellers in significant gain positions price more flexibly.",
            ],
            related: ['loi-t06-counter-offer', 'sourcing-t03-on-market'],
          },
          {
            id: 'loi-t03-earnest-money',
            title: 'Earnest money and the deposit ladder',
            summary:
              'Earnest money signals seriousness. The structure of when it goes hard, how much, and under what conditions, is one of your strongest negotiation tools.',
            body:
              "Earnest money is the buyer's deposit, held in escrow, that signals commitment to the deal. Standard multifamily LOI structures use a deposit ladder:\n\n**Initial deposit at LOI signing.** Typically $50-150K. Refundable if the buyer terminates within DD period. Functions as good-faith collateral.\n\n**Go-hard deposit at end of DD period.** Typically $250K-$1M+ depending on deal size. Becomes non-refundable once DD ends. Signals the buyer is past discretionary termination and committed to close.\n\n**Final deposit at PSA signing or DD waiver.** Sometimes structured as additional deposit when major milestones hit (financing approved, environmental cleared).\n\n**Total deposit at risk.** Industry standard: 1-3% of purchase price. On a $30M deal, that's $300K-$900K of total deposit. The seller wants more (signals certainty); the buyer wants less (preserves walk-away optionality).\n\n**The negotiation:**\n\nThe seller's leverage: more deposit, sooner go-hard, less refundability. Their pitch: 'we've had buyers walk; we need real commitment.'\n\nYour leverage: lower deposit, later go-hard, more refundability conditions. Your pitch: 'we close all our LOIs; the deposit is ceremonial.'\n\nWhere to compromise:\n\n- Initial deposit at $100K is reasonable for $25-35M deals\n- Go-hard timing at end of DD is standard; pushing it to 'approval of financing' is buyer-favorable\n- Total at-risk deposit at 1-1.5% is buyer-favorable; 2-3% is seller-favorable\n\n**The structural moves:**\n\nIf you have strong buyer-credentials (track record, references), push for 'soft' deposit structure — small initial, late go-hard, broad refundability conditions. Sellers will give discount on terms because your closing certainty is high.\n\nIf you're a newer operator, expect 'hard' structure — larger initial, early go-hard, narrow refundability. You're paying with deposit risk for the trust you haven't yet earned.\n\n**The walk-away math.** If you put down $300K go-hard at day 30, then discover material DD issues at day 35, you've lost $300K. That's why DD timeline and go-hard timing matter — they're symmetric tools.",
            example:
              "Phoenix 220-unit 2024. LOI structure: $100K initial at signing, additional $250K at day 30 going hard, total $350K at risk at day 30. DD ran 45 days. We closed on day 72. The $350K stayed in escrow through closing, applied to purchase price at close. Standard structure — neither side gave more than they had to. Compare to a competing buyer who offered $500K initial / $1M total at risk. Different signal — they were paying with deposit for closing certainty.",
            pitfalls: [
              "Accepting the seller's 'standard' deposit structure without negotiating.",
              'Going hard before DD ends — eliminates your discretionary walk-away.',
              'Putting down $1M+ deposits without commensurate DD protection.',
              "Forgetting that deposit applies to purchase price at close — it's not extra cost, it's just timing.",
              'Mistaking deposit size for negotiating signal — sellers care about closing certainty, not deposit absolute size.',
            ],
            related: ['loi-t04-due-diligence'],
          },
          {
            id: 'loi-t04-due-diligence',
            title: 'Due diligence period · what to negotiate',
            summary:
              'The DD period is your protection. The clock starts when the LOI is signed. Negotiate the timeline, the access, the contingencies, and the deliverables — they all matter.',
            body:
              "Due diligence is the period after LOI signing during which you investigate the deal, raise concerns, negotiate the PSA, secure financing, and decide whether to close. Standard multifamily DD: 30-60 days, depending on deal complexity.\n\n**What to negotiate:**\n\n**Timeline.** Sellers want 21-30 days. Buyers want 45-60. The right answer depends on deal complexity. A clean stabilized property: 30-35 days. A value-add with environmental concerns and PSA negotiation: 50-60 days. Push for what you actually need; don't accept artificial compression.\n\n**Access.** Your DD team needs property access for inspections, tenant interviews, environmental review, and walk-throughs. Negotiate 'reasonable access during business hours with 24-hour notice' — broad enough to actually run DD, specific enough that the seller can't restrict you arbitrarily.\n\n**Document delivery deadlines.** When does the seller deliver T-12 P&L? Rent roll with concessions? Service contracts? Insurance loss runs? Property condition report? Insist on a delivery schedule — typically 5-10 business days from LOI signing. Without a schedule, sellers slow-walk documents and your DD clock is shorter than you think.\n\n**Contingencies.** What conditions allow you to terminate during DD?\n\n- Financing contingency (lender approval by specific date)\n- Insurance contingency (insurability at acceptable rates)\n- Environmental contingency (Phase I clears or Phase II is acceptable)\n- Inspection contingency (broad — 'results acceptable to buyer in buyer's sole discretion')\n- Title contingency (clean title or material exceptions resolvable)\n\n**The DD extension question.** Most LOIs allow buyer to extend DD by 10-15 days for specific reasons (financing delay, environmental Phase II discovery, title work). Negotiate extensions in advance — much harder to get extensions granted later when the seller wants to close.\n\n**The retrade option.** Negotiate the right to renegotiate price during DD if material issues surface. Standard language: 'buyer may propose price adjustment based on DD findings; seller may accept or terminate.' Without this, you're forced to walk if DD surfaces issues — a $250K capex surprise that you'd accept at -$200K price becomes a deal-killer instead.",
            example:
              "Mesa 144-unit 2024 LOI. DD structure: 45-day period, document delivery deadlines (T-12 P&L day 5, rent roll day 5, service contracts day 7, environmental Phase I day 14), broad access provisions, financing contingency at day 35, retrade right based on DD findings. The retrade right became material — environmental Phase I flagged a former dry cleaner adjacent (Phase II required). We retraded $150K based on Phase II remediation cost estimate. Without the retrade right, we'd have walked.",
            pitfalls: [
              "Accepting 30-day DD on a complex deal — too compressed, you'll miss things.",
              'Not pushing for document delivery deadlines — sellers slow-walk and your effective DD shrinks.',
              'Skipping the retrade right — leaves you with walk-or-eat-it on DD findings.',
              'Forgetting to include extension provisions — getting extensions granted later is harder.',
              'Treating DD as paperwork instead of investigation — DD is when you actually buy the deal.',
            ],
            related: ['loi-t01-negotiation-doc', 'loi-t05-closing-timeline'],
          },
          {
            id: 'loi-t05-closing-timeline',
            title: 'Closing terms and the timeline',
            summary:
              "The close date and financing contingencies determine whether the deal happens on your terms or the seller's. Negotiate the timeline that matches your debt + DD reality.",
            body:
              "The close date in the LOI sets the deal's end-state. It interacts with DD timeline, financing contingencies, and seller motivation.\n\n**Standard close timing:**\n\n- 60-90 days from LOI on a clean stabilized deal with agency financing\n- 75-105 days on a value-add with bridge financing\n- 30-45 days on an off-market deal where seller wants speed\n- 90-120+ days on HUD-financed deals (HUD is slow)\n\n**The close date drives:**\n\n- DD period length (you need DD complete before close)\n- Financing readiness (loan closing has to align with deal closing)\n- Seller's tax planning (year-end closes for tax reasons; specific dates for 1031 exchanges)\n- Insurance binder timing (must be in place at close)\n\n**Financing contingencies:**\n\nThe financing contingency protects you if your lender doesn't approve the loan on terms acceptable to you. Standard language: 'buyer's obligation to close is contingent upon receiving a loan commitment from a lender of buyer's choice on terms acceptable to buyer in buyer's sole discretion, by [date].'\n\nWhat to negotiate:\n\n- **Date.** Should be approximately 30-35 days into DD — gives you time to actually source debt and receive a commitment.\n- **Approval threshold.** 'Acceptable to buyer in buyer's sole discretion' is the strongest. 'Commercially reasonable' is weaker. Push for sole discretion.\n- **Failure consequences.** If financing falls through, deposit returns and deal terminates. Without this, you may forfeit deposit.\n\n**Hard money vs financed deals.** If you're closing in cash, no financing contingency — but you give up the protection. Sellers will give meaningful discount for cash close (typically 5-8% off otherwise-financed price) because closing certainty is high.\n\n**Seller's incentive on close timing:**\n\nSellers often have specific reasons they want a particular close date. Year-end for tax, specific quarter for fund reporting, after rent collections to maximize their last month NOI. Asking the broker about seller's timeline preference often reveals leverage you can use.",
            example:
              "DFW 192-unit 2023. Original LOI close: day 75. Seller wanted day 90 (their fund's quarter-end reporting). We agreed to extend in exchange for: (a) seller covering 50% of buyer's title insurance ($14K savings), and (b) buyer access during the 15-day extension to begin renovation planning with PM team. Both sides got what they wanted. The negotiation took 30 minutes. The willingness to flex on close date earned us $14K + 2 weeks of PM onboarding head start.",
            pitfalls: [
              'Setting close date too close to financing contingency date — no buffer for delays.',
              "Skipping financing contingency on a financed deal to 'look stronger' — costly mistake if lender pulls.",
              "Using 'commercially reasonable' instead of 'buyer's sole discretion' on financing — gives lender's lawyers an angle.",
              "Not asking the seller about their preferred close timing — leverage you don't know about.",
              "Treating close date as immutable — it's negotiable up to a point, especially for tax/quarter alignment.",
            ],
            related: ['loi-t04-due-diligence', 'debt-t08-lender-conversation'],
          },
          {
            id: 'loi-t06-counter-offer',
            title: 'Counter-offer mechanics',
            summary:
              'You submit. The seller counters. You decide: push, accept, or walk. The right call depends on basis, comp data, and your read of the seller\'s motivation. Get this wrong and you either overpay or lose deals you should have won.',
            body:
              "The counter-offer is where most negotiations are won or lost. Your initial LOI lands. The seller responds. You're now in a real-time decision: accept, counter back, or walk away.\n\n**The seller's counter typically does one of three things:**\n\n**1. Bumps your price 2-5% closer to ask.** Standard counter. Seller wants to negotiate; they're signaling room. You can counter back at 1-2% above your initial — meet in the middle.\n\n**2. Bumps to within 1% of ask.** Aggressive counter. Seller is signaling they don't want to negotiate much. You decide: accept or walk.\n\n**3. Comes back at ask.** 'We won't reduce.' Seller is testing whether you'll pay full price. You decide: pay it (if it's worth it) or walk.\n\n**Push, accept, or walk — the framework:**\n\n**Push** when: your underwrite supports a price meaningfully below the counter, the comp set agrees, and the seller has shown room (the counter is below ask). Counter back at 60-70% of the gap between your offer and theirs.\n\n**Accept** when: the counter is at or below your max underwrite, the deal cleared bear case stress test, and the seller is clearly anchored. Don't squeeze the last $50K out of a seller who's about to walk — you'll lose the deal.\n\n**Walk** when: the counter exceeds your max underwrite, OR the seller is at ask and your bear case doesn't work at that price, OR the counter signals the seller can't be brought down to a workable number.\n\n**The trap operators fall into:**\n\nSplitting the difference reflexively. A seller counters at $32M, you counter at $30M, 'let's split at $31M' — without checking whether $31M actually clears your underwrite. Splitting differences is convenient. It's not pricing discipline.\n\n**The discipline:**\n\nBefore submitting initial LOI, write down your max number. The number you'd accept if forced to choose accept-or-walk. When the counter comes in, compare it against your max. If the counter is below max → accept or push. If above max → walk.\n\nThe decision is binary at your max. Splitting differences below max is fine; splitting differences above max means you're letting negotiation pressure override pricing discipline.\n\n---\n\n**◆ Mastery Live members workshop this on a real deal.**\n\nCounter-offer decisions are where coaching saves the most money. Self-Study gives you the framework. Live members bring their counter-offers to the monthly call and Diva and Lou pressure-test the response with them — flagging the deals where the broker is pushing for a 'split the difference' that takes the buyer above their max, the deals where walking is the right call but emotional momentum says push, and the deals where the seller's counter signals they'll come down further if the buyer holds. The framework is the same. The difference is having a seasoned operator across the table when the broker is asking for a decision by Friday and you're trying to figure out if you should pay another $400K.",
            example:
              "Plano 192-unit 2024. Initial LOI $32.4M (asking $34M). Seller countered at $33.8M. Our max was $33M. Reading the counter: seller showed only $200K of room — aggressive. Our walk-away math: at $33.8M, base case IRR dropped to 11.8% (below our 12% threshold), bear case was 4.1% (just above threshold). We countered back at $32.9M with explanation. Seller accepted. We closed at $32.9M — $900K below their counter. The discipline of writing down our max before the counter saved $900K of potential overpay.",
            pitfalls: [
              'Negotiating without a pre-written max number — emotional pressure overrides discipline.',
              'Reflexively splitting the difference instead of comparing to max.',
              'Walking when the counter is below max because "we always negotiate harder."',
              'Pushing past your max because broker says "they\'ll never go lower" — sometimes they will.',
              'Treating walk-away as failure — walking from deals that exceed your max is exactly the right discipline.',
            ],
            related: ['loi-t02-price', 'submarket-t08-walk-away'],
          },
        ],
        deepDive: [
          'The Rescia LOI template — clause-by-clause walk-through.',
          'Earnest money, due diligence period, and the protections every LOI must have.',
          'Counter-offer mechanics: when to push, when to accept, when to walk.',
        ],
        quiz: [
          {
            q: "A seller signs your LOI on a $30M deal. Three weeks into DD, a higher offer emerges and the seller says \"the LOI was non-binding, we're going with the higher offer.\" What's your protection?",
            a: 'The exclusivity clause — if your LOI included exclusivity, the seller is in breach.',
            why: 'While most LOI provisions are non-binding, exclusivity (when included) is binding. A seller who entertains other offers during exclusivity is in breach and you can pursue specific performance or damages. This is why exclusivity language matters even on a "non-binding" LOI.',
            trap: "Operators sometimes skip the exclusivity clause to keep the LOI 'simple.' That's exactly when the seller can pivot to the higher offer with no consequence. Always include exclusivity language for the DD period.",
            topicId: 'loi-t01-negotiation-doc',
            difficulty: 'operator',
            choices: [
              'None — non-binding LOIs allow either party to walk',
              'The exclusivity clause — if your LOI included exclusivity, the seller is in breach',
              'The earnest money — your deposit obligates seller performance',
              "Wait for PSA negotiation — deal isn't real until PSA signing",
            ],
            correctIndex: 1,
          },
          {
            q: "Your underwrite max for a deal is $33M. The asking price is $34M. The submarket comp set supports $32-33M. What's the right LOI initial offer?",
            a: '$32-32.5M with explicit reasoning — comp-supported with negotiation cushion below your max.',
            why: '$32-32.5M with reasoning gives you a 2-3% cushion below your max for negotiation, anchors below the ask but within the comp range, and signals you\'re a serious buyer with disciplined underwriting. The seller will likely counter at $33-33.5M. You meet at $32.8M — at or near your max.',
            trap: "Operators sometimes submit at their absolute max ($33M here), leaving no room to negotiate up. The seller's counter then forces them above max — which they shouldn't accept. Submit below max with explanation; let the counter bring you toward max.",
            topicId: 'loi-t02-price',
            difficulty: 'application',
            choices: [
              '$34M — match the ask to win',
              '$30M — open low, leave negotiation room',
              '$32-32.5M with explicit reasoning — comp-supported with negotiation cushion below your max',
              '$33M — your max, no room to negotiate',
            ],
            correctIndex: 2,
          },
          {
            q: "A $25M deal. Seller demands $400K initial deposit at LOI signing, all going hard at day 21 (well before end of 45-day DD). What's your read?",
            a: 'Counter with $200K initial / $400K go-hard at end of DD.',
            why: '$400K initial is high but workable. Going hard at day 21 (mid-DD) is the structural problem — you\'ve forfeited deposit before completing investigation. Counter to standard structure: smaller initial, larger total at end of DD. Your downside protection lives in the timing of go-hard, not the absolute deposit size.',
            trap: 'Operators sometimes accept aggressive deposit structures to "win" the deal vs competitors. The deal is not won until close — and an aggressive deposit at day 21 means $400K is at risk before you have even read the environmental report. Discipline preserves optionality.',
            topicId: 'loi-t03-earnest-money',
            difficulty: 'operator',
            choices: [
              'Accept — shows seriousness',
              'Push back — go-hard before DD ends eliminates your protection',
              'Walk — terms too aggressive',
              'Counter with $200K initial / $400K go-hard at end of DD',
            ],
            correctIndex: 3,
          },
          {
            q: "Seller offers 30-day DD on a value-add deal with environmental concerns and bridge financing. What's the right response?",
            a: 'Counter to 45-day DD with extension provisions for environmental Phase II.',
            why: '30 days is too compressed for a deal with environmental Phase II potential (which itself takes 30+ days). 45 days with extension provisions is the right structure — gives you real DD time, plus protection if environmental work surfaces issues. Sellers usually accept 45 days when reasoning is clear.',
            trap: 'Accepting 30-day DD on complex deals to look responsive. Mid-DD environmental discovery then forces a no-extensions decision: walk and lose the deal, or proceed without proper investigation. Negotiate the timeline you actually need before signing.',
            topicId: 'loi-t04-due-diligence',
            difficulty: 'application',
            choices: [
              'Accept — 30 days is standard',
              'Counter to 45-day DD with extension provisions for environmental Phase II',
              'Skip DD contingency entirely to win the deal',
              'Counter to 60-day DD as starting position',
            ],
            correctIndex: 1,
          },
          {
            q: 'You submit LOI at $30M (max underwrite $32M). Seller counters at $33M (1% below $33.3M ask). Broker says "they will not go lower, this is final." What is the right move?',
            a: 'Walk — counter exceeds your max.',
            why: '$33M exceeds your max of $32M. The discipline of pre-writing your max means walking is the answer regardless of how close it feels to the ask. Pushing to $32M might work but leaves zero negotiation cushion. Splitting to $31.5M is below your max but the seller has signaled $33M is firm — they won\'t accept $31.5M. Walking is the clean call.',
            trap: '"We are so close to a deal, let me push to $32.5M." Pushing $500K above max is exactly how operators end up overpaying. The discipline of the pre-written max is its enforceability. Walk from deals that exceed it.',
            topicId: 'loi-t06-counter-offer',
            difficulty: 'operator',
            choices: [
              'Accept at $33M — within $300K of ask',
              'Counter at $31.5M — split the difference',
              'Walk — counter exceeds your max',
              'Counter at $32M — meet your max',
            ],
            correctIndex: 2,
          },
        ],
        mistakes: [
          {
            trap: 'Skipping exclusivity on the LOI.',
            why: 'Without exclusivity, the seller is free to entertain higher offers during your DD period. You spend 30-45 days investigating, paying for environmental and inspections, building your financing case — and the seller can pivot to a higher offer at day 40. Your DD costs become sunk costs with no deal at the end.',
            fix: 'Always include exclusivity language for at least the DD period. Standard 30-45 days. The seller can always reject your LOI for not including it; that is a useful signal that they want optionality at your expense. Operators who consistently include exclusivity convert higher percentages of LOIs to PSAs.',
            topicId: 'loi-t01-negotiation-doc',
          },
          {
            trap: 'Pre-writing the max only after the counter arrives.',
            why: 'Negotiation pressure overrides discipline. The broker calls saying "the seller will accept $32.8M today, before noon, this is your shot." Without a pre-written max, you make the decision under time pressure with emotional momentum. Operators reliably overpay 3-7% under this dynamic.',
            fix: 'Before submitting any LOI, write down the maximum price you would accept. Put it on paper. Sign it like a contract with yourself. When the counter arrives, compare it against your max — that is the decision. No real-time math, no broker pressure, no "let me think about it" creeping above your max.',
            topicId: 'loi-t06-counter-offer',
          },
          {
            trap: 'Skipping retrade rights.',
            why: 'DD almost always surfaces issues that warrant price adjustment. Property condition report shows $400K more capex than expected. Environmental requires $200K remediation. Title has a $150K cure cost. Without retrade rights, you face a binary: pay-it-and-eat-it or walk. Both are bad outcomes when the right answer is renegotiate price.',
            fix: 'Include retrade language: "Buyer may propose price adjustment based on DD findings; Seller may accept or terminate." This gives you a third option — renegotiate. Most sellers prefer a $200K price reduction to losing the deal entirely. Without the language, you have no mechanism.',
            topicId: 'loi-t04-due-diligence',
          },
          {
            trap: 'Reflexive split-the-difference negotiation.',
            why: "Splitting the difference is convenient. It's not pricing discipline. The midpoint between your offer and the seller's counter has no relationship to your underwrite — it's just an emotional resting point. Operators who reflexively split end up at prices that don't align with their underwriting threshold.",
            fix: 'Compare the seller\'s counter to your pre-written max. If counter is below max → consider accepting (or push lower if seller has shown room). If counter is above max → walk. The midpoint is rarely the right answer; it is just the easy answer.',
            topicId: 'loi-t06-counter-offer',
          },
        ],
      },
      // ═══════════════════════════════════════════════════════════════════
      // MODULE 7 · PSA & DD — full content (Wave SS-2.10)
      // ═══════════════════════════════════════════════════════════════════
      {
        id: 'psa',
        title: 'Module 7 · PSA & DD',
        duration: '2.5 hrs',
        description:
          'Negotiate the PSA. Run a DD that surfaces the surprises before close. Inspections, leases, financials, environmental, title — what to look for and what to do when something is off. The retrade strategy that earns cost recovery without killing the deal.',
        topics: [
          {
            id: 'psa-t01-loi-to-psa',
            title: 'From LOI to PSA · the transition',
            summary:
              'The LOI is non-binding. The PSA is the contract. Understanding what changes — and what stays the same — determines whether your deal closes on the terms you negotiated.',
            body:
              "The PSA (Purchase and Sale Agreement) is the legally binding contract that supersedes the LOI. It captures every term in detail, with all the 'it depends' language replaced by specific obligations.\n\nWhat carries forward from LOI:\n\n- Price (almost always)\n- Earnest money structure (with timing and escrow holder specified)\n- DD period length (sometimes adjusted, usually preserved)\n- Close date (sometimes adjusted, usually preserved)\n\nWhat gets newly negotiated in PSA:\n\n- **Reps and warranties** — what the seller represents about the property (rent roll accuracy, no undisclosed liens, no pending litigation, etc.). Each rep is a potential indemnity claim if it turns out wrong.\n- **Indemnity scope and caps** — if the seller's reps prove false, what's the buyer's recovery? Negotiate cap (often 1-3% of price), basket (minimum claim threshold), and survival period (how long after close you can claim).\n- **Default remedies** — if buyer defaults, seller keeps deposit (usually). If seller defaults, buyer's options range from specific performance to liquidated damages. Push for specific performance.\n- **Closing conditions** — beyond DD, what other conditions must be met? Estoppels from major tenants, third-party consents, payoff of existing debt.\n- **Operations during DD-to-close period** — restrictions on seller (can't sign new long-term leases without buyer consent, can't make material capex changes, can't modify service contracts).\n- **Closing date mechanics** — wire instructions, document delivery, prorations, post-close adjustments.\n\nThe PSA is typically 30-60 pages and takes 1-2 weeks of attorney negotiation. Budget legal fees: $15-40K for buyer's counsel on a typical deal. Seller's counsel runs similar.\n\nThe discipline: don't sign the PSA without your attorney walking you through every clause. Operators who skim the PSA discover at variance that a clause they didn't push on is now an obligation they can't escape.",
            example:
              "Mesa 144-unit 2024. LOI signed at $33.4M with 45-day DD. PSA negotiation took 11 days, two attorney rounds. Material changes from LOI: rep cap negotiated from 5% to 2% of price ($668K), survival period from 18 to 12 months, specific performance remedy added for seller default, operations restrictions strengthened (no new leases over 13 months without buyer consent). Legal fees $24K. PSA signed day 17 of DD. Closed day 72.",
            pitfalls: [
              "Treating PSA as a formality after LOI — the LOI's terms can be eroded if you're not paying attention.",
              "Skipping attorney review on 'standard' clauses — there's no such thing as standard.",
              'Negotiating only price terms — reps, indemnity, and remedies matter as much.',
              'Rushing PSA in compressed DD — leaves no time for proper negotiation.',
              'Not budgeting legal fees — surprise $25K bill stings worse mid-deal.',
            ],
            related: ['psa-t02-clauses', 'loi-t04-due-diligence'],
          },
          {
            id: 'psa-t02-clauses',
            title: 'PSA clauses to read carefully',
            summary:
              'Every PSA has a few clauses that drive 90% of post-close risk. Reps, indemnity, default remedies, survival. Read these carefully or pay later.',
            body:
              "Most PSA pages are mechanical. A few clauses matter disproportionately. These are the ones to read line by line:\n\n**Representations and Warranties (Reps).** The seller represents specific things about the property. Common reps:\n\n- Rent roll accuracy (current rents, lease terms, security deposits)\n- Service contracts (complete list, no undisclosed obligations)\n- Litigation (no pending or threatened)\n- Compliance (no unresolved code violations)\n- Environmental (no known issues beyond disclosed reports)\n- Liens (clean title beyond disclosed mortgages)\n\nEach rep that's false is a potential indemnity claim. The seller will try to qualify reps with 'to seller's knowledge' — meaning they only represent what they actually know. Push back where the seller should have known (rent roll, litigation).\n\n**Indemnity Cap, Basket, and Survival.**\n\n- **Cap.** Maximum the buyer can claim. Standard 1-3% of price; push for 5% on transitional deals.\n- **Basket.** Minimum claim threshold ('buyer can't claim less than $50K'). Standard $25-100K; push for lower on smaller deals.\n- **Survival.** How long after close can buyer claim? Standard 12-18 months; push for 24 on environmental and tax reps.\n\n**Default Remedies.** If seller defaults at close:\n\n- **Specific performance** — court forces seller to close at agreed price. Best buyer remedy.\n- **Liquidated damages** — buyer keeps deposit + cap on damages. Seller's preferred.\n- **Walk away** — deposit returns, no other remedy. Weakest buyer position.\n\nIf buyer defaults at close: seller keeps deposit (almost always). Sometimes seller has additional remedies; push to limit to deposit forfeiture only.\n\n**Operations Pendant Sale.** Restrictions on what seller can do between PSA signing and close:\n\n- No new long-term leases (over 12-13 months) without buyer consent\n- No material capex without buyer consent\n- No new service contracts beyond renewal of existing\n- No tenant terminations or evictions outside ordinary course\n\nThese prevent the seller from making decisions that bind you post-close.",
            example:
              "Phoenix 220-unit 2024 PSA. Seller's first draft: 1.5% cap, 18-month survival, liquidated damages capped at deposit + $250K seller default. We pushed: 3% cap, 12-month survival on most reps but 24 months on environmental and tax, specific performance on seller default. Final: 2.5% cap, 15-month survival, specific performance + actual damages on seller default. Negotiation took 6 days across 4 attorney exchanges. The cap difference alone was $300K of additional protection.",
            pitfalls: [
              "Accepting 'to seller's knowledge' qualifiers on reps the seller should know (rent roll, litigation).",
              'Skipping the survival period negotiation — 12 vs 18 months is real time.',
              "Walking away on default without specific performance — buyers have leverage they don't use.",
              'Forgetting operations covenants — the seller can damage your deal between PSA and close.',
              'Not understanding that indemnity cap limits your post-close recourse.',
            ],
            related: ['psa-t01-loi-to-psa'],
          },
          {
            id: 'psa-t03-dd-checklist',
            title: 'The DD checklist · what to inspect',
            summary:
              'DD is investigation. Run the checklist disciplined and you find the surprises before close. Skip line items and you find them at variance review instead.',
            body:
              "Multifamily DD covers four categories: physical, financial, legal/regulatory, market. Each has a checklist.\n\n**Physical DD:**\n\n- Property condition report (PCR) — third-party inspection of major systems\n- Roof and HVAC inspection — age, condition, remaining useful life\n- Plumbing and electrical assessment\n- Parking lot and exterior survey\n- Unit walks (sample of 10-25% of units, including all unit types)\n- Common area and amenity inspection\n- Pool and hot tub inspection (if applicable)\n- Fire and life safety systems\n\n**Financial DD:**\n\n- T-12 P&L verified against bank statements\n- T-3 monthly run rate analysis\n- Rent roll verified against actual lease documents\n- Security deposit verification\n- Utility expense audit\n- Property tax history and pending appeals\n- Insurance loss runs\n- Service contracts (HVAC, landscaping, pest, security, etc.)\n- Tenant ledgers for delinquency patterns\n- Last 3 years' tax returns for the property\n\n**Legal / Regulatory DD:**\n\n- Title commitment\n- Survey (boundary, easements, encroachments)\n- Zoning verification\n- Code compliance (current violations, recent inspection results)\n- Environmental Phase I (Phase II if triggered)\n- ADA compliance\n- Litigation history (last 3-5 years)\n- Code enforcement and HOA records\n- Building permits and occupancy certificates\n\n**Market / Operational DD:**\n\n- Comp set update (current rents, concessions, occupancy)\n- Submarket trends (Module 1 analysis refreshed)\n- Pending supply (permits filed, deliveries scheduled)\n- Tenant interviews (sample of 5-10 residents)\n- Property management evaluation\n- Insurance quotes (your policy, not seller's)\n\n**The discipline:** assign each line item to a specific person on your DD team with a specific deadline. Document findings. Build a DD report that captures what was inspected, what was found, and what the implications are. The DD report becomes your closing decision basis.",
            example:
              "DFW 192-unit 2023 DD. Team of 4: PM (physical), CPA (financial), attorney (legal), us (market). 67 line items across the checklist. 53 cleared without issue. 14 surfaced issues — 9 minor (resolved during DD), 3 material (retraded $185K), 2 dealbreakers (deal terminated). The disciplined checklist caught all 14. Operators who skip checklist items typically find 8-12 of these post-close, at full cost rather than retrade-discounted cost.",
            pitfalls: [
              'Running DD without a checklist — line items get missed.',
              "Skipping tenant interviews — they reveal management issues that don't show on paper.",
              'Not pulling actual leases against rent roll — rent roll is often inaccurate.',
              "Forgetting current insurance quotes — your year-1 insurance is materially different from the seller's T-12 line.",
              "Treating DD as paperwork — it's investigation; pay attention.",
            ],
            related: ['psa-t04-property-inspection', 'psa-t05-financial-dd'],
          },
          {
            id: 'psa-t04-property-inspection',
            title: 'Property inspection · what to look for',
            summary:
              'The PCR is a starting point. Your own walk-through, with experienced eyes, catches things the inspector misses. Plan the inspection like you are buying a problem to solve.',
            body:
              "The PCR is the third-party report. Your own physical inspection is what tells you whether the deal works operationally.\n\n**The walk-through team:**\n\n- You (or your principal) — operational decision-making\n- Your PM (or prospective PM) — operational realism\n- A construction or capex consultant — cost estimating\n- Your maintenance lead (if you have one)\n\nTime on property: 2-4 days minimum on a 100+ unit deal. Half-day visits don't catch enough.\n\n**What to inspect physically:**\n\n**Roofs.** Walk every building. Count patched repairs. Note ponding water, granule loss on asphalt shingles, membrane separation on flat roofs. The PCR's '5 years remaining useful life' is an estimate; your eyes on the roof tell you if it's optimistic.\n\n**HVAC.** Look at compressor age tags. Sample test units across all buildings. The PCR's percentage estimate (e.g., '30% near end of useful life') is from random sampling. Your sample reveals whether the population is actually distributed that way or concentrated in one building.\n\n**Parking.** Walk every lot. Note cracking patterns, drainage issues, line painting quality. Asphalt failures are visible — and expensive.\n\n**Plumbing.** If polybutylene or galvanized supply lines are flagged in PCR, assume repipe. Cost is $2-4K per unit. Don't underwrite optimistic alternatives.\n\n**Common areas.** Pool, fitness, leasing office, mailboxes. Tenants notice these first when leasing — they're the marketing surface.\n\n**Unit interiors.** Sample 10-25% of units across all unit types and buildings. Look for: kitchen condition, bathroom condition, flooring, paint, appliance age, HVAC unit condition (the per-unit PTAC or split system), cabinet integrity, countertop wear.\n\n**Documentation.** Photograph everything. Take notes on every unit visited. Build a unit-by-unit inspection log. Findings inform both your renovation budget and your retrade conversations.\n\n**The post-walk discussion:**\n\nEnd each day with a team debrief. What did we see? What's surprising? What's the cost implication? The pattern that emerges across 2-4 days is the property's actual condition.",
            example:
              "Mesa 144-unit 2024 inspection. 3-day site visit. PCR estimated 30% of HVAC near end of life. Our walk found 47% of HVAC compressors over 12 years old with visible corrosion, 18% needing immediate replacement. Adjusted capex up $185K from PCR estimate. Negotiated retrade. Seller agreed to $150K credit. The 3-day walk paid for itself 50x over. Operators who skip on-site inspection trust the PCR — and pay for the gap at variance review.",
            pitfalls: [
              "Treating the PCR as final — it's a starting point, not the answer.",
              'Half-day inspections — not enough time to see the population.',
              'Not bringing operational team — your PM sees things consultants miss.',
              'Skipping unit interior walks — the renovation budget hinges on this.',
              'Not photographing everything — your retrade conversation needs evidence.',
            ],
            related: ['psa-t08-retrade', 'stress-t05-deferred-maintenance'],
          },
          {
            id: 'psa-t05-financial-dd',
            title: 'Financial DD · validating T-12',
            summary:
              "The T-12 P&L the seller showed you in the OM may not match reality. Pull bank statements and tax returns. Validate every meaningful line item. Sellers don't always lie — but they sometimes shape the picture.",
            body:
              "Financial DD is matching the seller's representation against actual records. Three primary documents:\n\n**Bank statements.** 24 months of operating account statements. Match deposits to rent collected; match outflows to expense categories. Discrepancies reveal whether the T-12 P&L is accurate.\n\n**Tax returns.** 2-3 years of property-level returns (Schedule E for individuals, partnership returns for LLCs). The taxable income on these returns is often lower than the OM's NOI — sellers expense aggressively for tax purposes. Reconcile the difference.\n\n**Lease audit.** Pull every lease and verify rent roll accuracy. Common discrepancies:\n\n- Rent roll shows $1,250; lease says $1,180 (60-day promo not yet expired)\n- Rent roll shows lease end Aug 2025; lease was extended through Dec 2026 (rent roll not updated)\n- Rent roll shows 30 units; physical count shows 28 + 2 vacant model units misrepresented as occupied\n\n**The verification process:**\n\nFor T-12 P&L:\n\n- Pull operating account bank statements\n- Match revenue to deposits (rent collections, ancillary income)\n- Match expenses to checks/wires (vendors, utilities, taxes, insurance)\n- Identify any major one-time items (insurance refunds, tax settlements, lawsuit proceeds) and back them out\n- Recalculate T-12 NOI from the bottom up\n\nFor rent roll:\n\n- Random-sample 25% of leases\n- Verify in-place rent, lease end date, security deposit, concessions\n- Check tenant ledgers for delinquency patterns\n- Confirm physical occupancy via unit walks\n\nFor taxes:\n\n- Pull last 3 years' assessment notices\n- Check pending appeals\n- Calculate expected reassessment to your purchase price\n- Model your year-1 tax line based on reassessment, not seller's T-12\n\n**What the verification reveals:**\n\nTrue NOI typically lands 3-8% below OM-stated NOI on B/C class deals. Operators who skip financial DD discover this gap at variance review. Operators who run financial DD properly retrade or pass.",
            example:
              "Plano 192-unit 2024 financial DD. OM showed T-12 NOI $1.92M. Bank statement reconciliation: actual deposits ran $80K below stated revenue (sellers had double-counted some Q4 collections). Lease audit: 19 of 192 leases had concessions baked in not reflected in rent roll. Recalculated T-12 NOI: $1.83M — 4.7% below OM. We retraded $625K based on cap-rate math. Seller agreed to $400K. The financial DD work paid back 50x.",
            pitfalls: [
              'Trusting the T-12 from the OM — verify against bank statements.',
              'Skipping the lease audit — rent roll inaccuracies are common.',
              "Not pulling tax returns — they reveal the seller's actual cash flow.",
              'Forgetting to back out one-time items in T-12 NOI.',
              'Treating financial DD as accounting rather than fact-checking.',
            ],
            related: ['psa-t08-retrade', 'uw-t02-as-is-noi'],
          },
          {
            id: 'psa-t06-environmental',
            title: 'Environmental DD · Phase I and Phase II',
            summary:
              'Environmental issues can kill deals or cost millions. Phase I is mandatory, Phase II is sometimes triggered, remediation can range from $50K to $5M+. Know what triggers what.',
            body:
              "Environmental DD on multifamily typically follows a standard sequence:\n\n**Phase I Environmental Site Assessment (ESA).** Mandatory on virtually every commercial real estate transaction with debt. Cost: $2-5K. Timeline: 2-4 weeks. Inspects:\n\n- Site history (prior uses, neighboring uses)\n- Visual property inspection\n- Database review (EPA, state environmental records)\n- Government records (UST registrations, spill reports, regulatory actions)\n- Interviews with current property managers/owners\n\nThe Phase I produces three possible outcomes:\n\n1. **Clean.** No recognized environmental conditions (RECs). Proceed.\n2. **Phase II recommended.** RECs identified — soil and groundwater testing required to determine extent.\n3. **Material concerns identified.** Significant historical contamination, ongoing regulatory action — usually deal-killers.\n\n**Phase II ESA.** Triggered when Phase I finds RECs. Cost: $15-50K depending on scope. Timeline: 4-8 weeks. Includes:\n\n- Soil borings (typically 6-15 locations on a multifamily site)\n- Groundwater monitoring wells (if depth-to-water shallow)\n- Vapor intrusion testing (if VOCs in soil/groundwater)\n- Lab analysis (EPA priority pollutants, hydrocarbons, solvents)\n\n**Common Phase II triggers in multifamily:**\n\n- Former dry cleaner on-site or adjacent\n- Former gas station or auto repair within 1/4 mile\n- Manufacturing or industrial historical use\n- USTs (underground storage tanks) recorded or discovered\n- Adjacent agricultural or industrial use with potential migration\n\n**If contamination is found:**\n\n- **Minor (below state action levels).** No remediation required. Document for record. Proceed.\n- **Moderate (above action levels but localized).** Excavation and disposal of impacted soil; sometimes vapor barrier installation. Cost: $50-300K typical.\n- **Major (groundwater contamination, vapor migration, regulatory action required).** Extended remediation, monitoring, regulatory oversight. Cost: $300K-$5M+. Often triggers walk.\n\n**The retrade question:**\n\nIf Phase II finds remediation costs, retrade the deal price by remediation cost plus 25% contingency. Sellers often agree because the alternative is environmental disclosure to next buyer (always required in most states). Most sellers prefer a $200K price reduction to disclosing a $200K problem to the market.",
            example:
              "Mesa 144-unit 2024. Phase I flagged former dry cleaner adjacent (1980s-1995 operations). Phase II conducted: soil borings at perimeter and beneath buildings, groundwater monitoring wells. Results: PERC and TCE detected in soil at one perimeter location, below state action levels at the property. No groundwater impact at our site. Total Phase II cost $32K. Remediation not required. We did retrade $35K to fund a vapor barrier on the building closest to the contamination — pure precaution. Closed.",
            pitfalls: [
              "Skipping Phase I to save $3K — every lender requires it; you'll need it anyway.",
              'Trusting an old Phase I (more than 6 months) — re-Phase if older.',
              'Letting the seller commission Phase II — get your own consultant.',
              'Underestimating Phase II timeline — 4-8 weeks plus lab turn.',
              'Not retrading on findings — even minor remediation deserves cost recovery from seller.',
            ],
            related: ['psa-t08-retrade'],
          },
          {
            id: 'psa-t07-title-survey',
            title: 'Title and survey',
            summary:
              'Title and survey reveal what is actually on the property and who has rights to it. Easements, encroachments, restrictions can affect operations and value. Read carefully.',
            body:
              "Title commitment shows the chain of ownership and any encumbrances on the property. Survey shows the physical boundaries and any structures crossing them.\n\n**Title commitment review:**\n\nThe title company issues a commitment showing:\n\n- **Schedule A.** Current owner, legal description, exceptions\n- **Schedule B Section I.** Items the buyer must clear before close (existing mortgages payoff, judgments)\n- **Schedule B Section II.** Permitted exceptions that survive — easements, restrictions, etc.\n\n**Common Schedule B items:**\n\n- **Utility easements.** Right of utility companies to access utility lines. Almost always present, rarely material.\n- **Access easements.** Right of adjacent property owners to cross. Material if it affects parking or operations.\n- **Mineral rights reservations.** Subsurface rights held by third parties. Concerning in oil/gas regions; typically not material in others.\n- **Deed restrictions.** Use limitations recorded in chain of title. Verify multifamily use is permitted.\n- **HOA or master association obligations.** Annual fees, restrictions, voting rights. Material — read the documents.\n- **Liens and judgments.** Must be paid off at close.\n\n**The survey:**\n\nThe ALTA/NSPS survey shows physical boundaries, building footprints, parking areas, easements as plotted. Look for:\n\n- **Encroachments.** Building or structure crossing property line. Common: HVAC pads, sheds, fences. Material when they cross from neighbor onto your property — affects future sale.\n- **Easement conflicts.** Easement runs through area you intended to use (e.g., utility easement under expanded parking lot).\n- **Setback violations.** Building too close to property line for current zoning.\n- **Right-of-way issues.** Public access through portions of the property.\n\n**The fix process:**\n\nMost issues are resolvable:\n\n- Liens and judgments — pay off at close\n- Setback variances — usually grandfathered if pre-existing\n- Easements — accept or negotiate amendment with easement holder\n- Encroachments — cure with neighbor agreement or accept\n\n**The deal-killer issues:**\n\n- Title cannot be insured at standard rates — material defect\n- Material easement that prevents intended use (e.g., access easement through proposed pool location)\n- Chain of title irregularities suggesting ownership dispute\n\n**Title insurance:**\n\nAlways purchase. Premium $0.50-1.00 per $1,000 of insured amount. On a $30M deal, premium is $15-30K. Required by all institutional lenders. Owner's policy protects you against title defects post-close.",
            example:
              "DFW 192-unit 2023. Title commitment showed three easements (two utility, one access for adjacent retail center). Survey confirmed all three were minor — the access easement crossed a corner of the parking lot, no operational impact. One issue surfaced: an encroachment by neighbor's HVAC pad onto the property by 2 feet. Resolved with neighbor agreement (relocate within 12 months at neighbor's expense) recorded against title. Total title premium $24K. Closed cleanly.",
            pitfalls: [
              'Skipping title commitment review — easements can affect operations.',
              "Not requesting an ALTA survey — it's the only way to verify physical boundaries.",
              'Treating Schedule B items as boilerplate — read each one.',
              "Skipping owner's title insurance to save $15-25K — costly mistake if title defect emerges.",
              "Trusting the seller's old survey — get fresh ALTA.",
            ],
            related: ['psa-t03-dd-checklist'],
          },
          {
            id: 'psa-t08-retrade',
            title: 'Retrade strategy · using DD findings',
            summary:
              'DD findings that warrant price adjustment require negotiation. Frame the retrade carefully. Push too hard and the seller walks. Push too little and you eat the cost.',
            body:
              "Retrade is the renegotiation of price during DD based on findings. Done right, it captures cost recovery for issues you discovered. Done poorly, it kills the deal.\n\n**When to retrade:**\n\n- DD reveals material issues not disclosed in OM (significant deferred maintenance, environmental, title)\n- T-12 P&L doesn't match bank statements (revenue or expense surprises)\n- Inspection finds capex needs above PCR estimate\n- Code violations, zoning issues, regulatory issues\n- Tenant lease audit reveals concession structure not reflected in OM rent roll\n\n**When NOT to retrade:**\n\n- Issues you should have caught at OM stage (basic submarket reads, headline numbers)\n- Findings within reasonable tolerance of expectations (5-10% capex variance is normal)\n- Issues the seller already disclosed and you accepted at LOI\n\n**The retrade conversation:**\n\n1. **Document the finding.** Specific dollar amount tied to specific issue. Photos, reports, citations.\n2. **Calculate the cost.** What's the actual cost to remediate or absorb? Add 20% contingency.\n3. **Translate to price impact.** At your underwriting cap rate, what does the cost mean for value? A $200K capex hit at a 5.5% cap = $200K reduction in price (cap rate doesn't apply to one-time capex; it's dollar-for-dollar).\n4. **Propose the retrade.** 'DD findings include $X in unexpected costs. We propose price adjustment of $Y. If preferred, we can split — $Y/2 from price reduction, $Y/2 from seller-paid escrow funded for the issue.'\n5. **Negotiate.** Sellers rarely accept full retrade. Common outcomes: 50-75% of buyer's ask.\n\n**Framing matters:**\n\n- Don't frame as 'we want a discount.' Frame as 'DD revealed costs neither party expected.'\n- Bring documentation. Specific findings beat general complaints.\n- Offer alternatives. Price reduction OR seller credit OR escrow funded by seller. Sellers often prefer non-price solutions for tax reasons.\n- Maintain relationship tone. The broker remembers who renegotiated reasonably and who renegotiated abusively.\n\n**The walk-away threshold:**\n\nIf the seller refuses retrade and the issue is material, walk. Don't proceed with known costs you can't recover. The discipline: document the walk-away reason; the broker may bring you better deals later because you walked rather than absorbing the issue.\n\n---\n\n**◆ Mastery Live members workshop this on a real deal.**\n\nRetrade decisions are where coaching saves the most money. Self-Study gives you the framework. Live members bring their DD findings and proposed retrades to the monthly call and Diva and Lou pressure-test the approach with them — flagging when the retrade ask is too large (deal-killer), when it's too small (eating cost), when the framing will damage the relationship, and when walking is the right call. The framework is the same. The difference is having a seasoned operator across the table when DD just surfaced $400K in unexpected capex and you're trying to decide between retrading, walking, or eating it.",
            example:
              "Mesa 144-unit 2024. DD findings: HVAC needed $185K above PCR (visible aging on walk), former dry cleaner triggered $32K Phase II + $35K vapor barrier, lease audit found $40K of bake-in concessions. Total findings: $292K. We documented each, framed retrade at $250K (15% discount on findings), offered alternatives (price OR escrow). Seller accepted $200K price reduction (closing at $33.2M vs $33.4M LOI). Negotiation took 5 days, 3 attorney exchanges. The disciplined framing earned 80% of cost recovery without damaging the relationship.",
            pitfalls: [
              'Retrading on issues you should have caught at OM stage.',
              'Demanding 100% cost recovery — sellers rarely agree.',
              'Framing as "we want a discount" instead of "DD revealed unexpected costs."',
              "Skipping documentation — vague claims don't move sellers.",
              'Walking from retrade negotiations too quickly — most sellers will give 50-75% of ask.',
            ],
            related: ['psa-t04-property-inspection', 'psa-t05-financial-dd', 'psa-t06-environmental'],
          },
        ],
        deepDive: [
          'PSA red flags — the clauses that need amendment or removal.',
          'Due diligence checklist: inspections, leases, T-12, environmental, title.',
          'Retrade strategy: when DD findings justify a price reduction and how to ask for it.',
        ],
        quiz: [
          {
            q: 'The seller\'s first PSA draft includes the rep "to seller\'s actual knowledge, the rent roll is accurate." What is the right response?',
            a: 'Push to remove the "actual knowledge" qualifier on rent roll — seller should know.',
            why: '"To seller\'s actual knowledge" qualifiers limit the seller to representing only what they actually knew. On items the seller should have known — rent roll accuracy, current litigation, code violations — push to remove the qualifier. The seller has access to all this information; the qualifier is a way to dodge accountability. On items genuinely outside the seller\'s knowledge (environmental conditions decades old), the qualifier is reasonable.',
            trap: 'Operators sometimes accept all "to seller\'s knowledge" qualifiers as boilerplate. Then a rent roll inaccuracy surfaces post-close, the seller says "we did not actually know," and the indemnity claim fails. Push back on knowledge qualifiers for items the seller controls.',
            topicId: 'psa-t02-clauses',
            difficulty: 'operator',
            choices: [
              'Accept — "actual knowledge" is standard',
              'Push to remove the "actual knowledge" qualifier on rent roll — seller should know',
              'Push to extend the survival period',
              'Skip the rep entirely',
            ],
            correctIndex: 1,
          },
          {
            q: 'Your DD team includes you, an attorney, and a CPA. The seller\'s 220-unit OM showed 92% occupancy with limited concessions. What category of DD are you most likely to underrun?',
            a: 'Physical and operational — covered by you.',
            why: 'Three-person teams without an experienced PM or operations consultant typically underrun the physical and operational DD. The attorney handles legal. The CPA handles financial. You handle decision-making. Nobody does the on-site walks, the unit interior inspections, the operational realism check. PCR consultants do partial work but they do not have operational eyes.',
            trap: 'Operators stretch their three-person teams across all four DD categories and discover post-close that physical/operational issues were missed. Add a PM or maintenance consultant to your DD team — even on a deal you will self-manage. The fee is small relative to what they catch.',
            topicId: 'psa-t03-dd-checklist',
            difficulty: 'operator',
            choices: [
              'Title and legal — covered by attorney',
              'Financial — covered by CPA',
              'Physical and operational — covered by you',
              'Environmental — handled by Phase I consultant',
            ],
            correctIndex: 2,
          },
          {
            q: "Phase I report flags a former dry cleaner adjacent to your property (1990-2008 operations). What is the right next step?",
            a: 'Phase II — adjacent dry cleaners trigger investigation due to vapor migration risk.',
            why: 'Adjacent dry cleaner is a recognized environmental condition (REC) trigger because PERC and TCE solvents used in dry cleaning migrate through soil and groundwater. Phase II investigates extent at your property. The investigation might find no migration (cleared), localized impact (minor remediation), or material contamination (deal-killer). You do not know without testing.',
            trap: 'Operators sometimes skip Phase II to save $30K and weeks. Then close, and discover at variance review that vapor intrusion is occurring and remediation is required. The Phase II discovery would have either cleared the deal or surfaced the cost in time to retrade. Skipping is the most expensive shortcut.',
            topicId: 'psa-t06-environmental',
            difficulty: 'application',
            choices: [
              "Skip Phase II — adjacent isn't on-site",
              'Phase II — adjacent dry cleaners trigger investigation due to vapor migration risk',
              'Walk — environmental issues kill deals',
              'Buy environmental insurance instead of Phase II',
            ],
            correctIndex: 1,
          },
          {
            q: "Your CPA reconciled the seller's T-12 P&L against bank statements. Total revenue ran $78K below T-12 stated revenue across 12 months. What is the diagnosis?",
            a: 'Possible double-counting of receivables, or T-12 included accrual-basis revenue not yet collected.',
            why: '$78K variance on a 12-month period (roughly 3-5% of typical revenue on this scale) is meaningful but not dispositive. Common explanations: T-12 included accrual revenue (rent billed, not yet collected), one-time receivables booked once and double-counted, reconciliation timing differences. Investigate before assuming malice. Often resolved through clarifying entries with the seller\'s accountant.',
            trap: "Either extreme reaction is wrong. Walking on a $78K variance without investigating wastes a deal that's likely fine after explanation. Accepting the seller's T-12 without investigating leaves you with a bad foundation for your underwrite. The discipline: investigate, document the explanation, adjust your model from the reconciled number.",
            topicId: 'psa-t05-financial-dd',
            difficulty: 'application',
            choices: [
              'Bank statement error — banks misreport',
              'Seller misrepresented T-12 — inflated revenue intentionally',
              'Possible double-counting of receivables, or T-12 included accrual-basis revenue not yet collected',
              'Negligible variance — proceed',
            ],
            correctIndex: 2,
          },
          {
            q: "DD reveals $292K in unexpected costs (HVAC $185K above PCR, environmental Phase II + remediation $67K, concession bake-ins $40K). Your LOI price was $33.4M. What is the right retrade ask?",
            a: '$250K — 85% of cost recovery, leaving negotiation room.',
            why: 'Retrading at 85% of documented cost recovery is the disciplined ask. Full cost recovery is rarely accepted; you give up something in exchange for the deal proceeding. The 15% you do not ask for becomes your contribution to keeping the deal alive. Sellers typically accept 50-75% of retrade asks; if you ask for 100%, expect 50%. If you ask for 85%, expect 65-70%.',
            trap: 'Asking for 100% and getting nothing because the seller walks. Or asking for 50% reflexively, leaving real money on the table. The discipline: ask for 80-90% with documentation, expect 60-75% acceptance, walk if rejected at material findings.',
            topicId: 'psa-t08-retrade',
            difficulty: 'operator',
            choices: [
              '$292K — full cost recovery',
              '$250K — 85% of cost recovery, leaving negotiation room',
              '$146K — 50% of cost recovery, splitting with seller',
              'Walk — issues are material',
            ],
            correctIndex: 1,
          },
        ],
        mistakes: [
          {
            trap: 'Skipping attorney review on "standard" PSA clauses.',
            why: 'Every PSA has 5-10 clauses that significantly affect post-close risk. Reps and warranties, indemnity caps, default remedies, survival periods — these vary materially across deals. The seller\'s attorney drafts the PSA in seller\'s favor. The buyer\'s attorney reads carefully and pushes back. Operators who skim PSAs to save time discover that a clause they did not push on is now an obligation that costs them.',
            fix: 'Engage your attorney during DD, not at PSA signing. Walk through every clause. Spend 4-8 hours on PSA review with attorney before signing. Budget $15-40K of legal fees for buyer\'s counsel on a typical $30M deal — and don\'t try to save by skipping review.',
            topicId: 'psa-t02-clauses',
          },
          {
            trap: 'Underestimating physical inspection time.',
            why: "On a 144-unit property with multiple buildings, a half-day visit catches surface-level issues only. The pattern across 30+ unit walks, 20+ HVAC inspections, 10+ roof spot-checks doesn't emerge until day 2-3. Operators who skim physical inspection miss 30-50% of the deferred maintenance the property carries.",
            fix: 'Plan 2-4 days minimum on properties of 100+ units. Bring a multi-person team. Walk every building, sample 10-25% of units, photograph everything. Build a unit-by-unit inspection log. The time pays back 50x at retrade.',
            topicId: 'psa-t04-property-inspection',
          },
          {
            trap: 'Accepting "to seller\'s knowledge" qualifiers reflexively.',
            why: 'Knowledge qualifiers shift risk to the buyer for items the seller should have known. Rent roll accuracy, current litigation, code violations, environmental conditions known to the seller — these are items the seller controls. Allowing knowledge qualifiers on these items means a post-close indemnity claim fails because the seller "did not actually know."',
            fix: 'Push to remove knowledge qualifiers on reps where the seller should have known. Keep them on reps where the seller genuinely could not know (decades-old environmental, undisclosed third-party claims). The line between "should know" and "could not know" is negotiable; push on the should-know side.',
            topicId: 'psa-t02-clauses',
          },
          {
            trap: 'Retrading too aggressively or not at all.',
            why: 'Both extremes are wrong. 100% cost recovery rarely succeeds; sellers walk. No retrade leaves real money on the table — the issues you discovered are real costs that someone has to pay, and that someone should not be you alone. The right number is 60-80% of documented cost recovery.',
            fix: 'Document findings in dollar amounts. Calculate documented cost. Frame retrade as 80-90% of cost (leaving negotiation room). Expect to land at 60-75% acceptance. Walk if material findings are rejected entirely. The discipline of partial cost recovery on every meaningful DD finding compounds across a portfolio of deals.',
            topicId: 'psa-t08-retrade',
          },
        ],
      },
      // ═══════════════════════════════════════════════════════════════════
      // MODULE 8 · Property Management — full content (Wave SS-2.11)
      // FINAL MODULE · closes out the operator's execution toolkit
      // ═══════════════════════════════════════════════════════════════════
      {
        id: 'pm',
        title: 'Module 8 · Property Management',
        duration: '2 hrs',
        description:
          'Hire it, fire it, hold it accountable. The PM RFP, the contract structure, the monthly variance review, the operating cadence — and the transition discipline when a PM has to go. The post-close craft that determines whether your underwrite holds.',
        topics: [
          {
            id: 'pm-t01-operational-partner',
            title: 'PM as the operational partner',
            summary:
              "The property manager isn't a vendor. They're the operating partner who runs the asset day-to-day. Pick the right one and the deal performs. Pick the wrong one and your variance reports tell you within 6 months.",
            body:
              "Property management is the operational layer between your underwrite and the tenant experience. Most operators underestimate this layer until they're 12-18 months into a deal and the PM has missed lease-up targets, run expenses 8% over budget, and let occupancy slip from 95% to 87%.\n\n**What a PM does:**\n\n- **Leasing.** Marketing, showings, applications, screening, lease execution, renewals\n- **Operations.** Rent collection, delinquency management, evictions, vendor coordination\n- **Maintenance.** Work orders, vendor management, capex execution\n- **Reporting.** Monthly financials, variance analysis, operational KPIs\n- **Compliance.** Fair housing, ADA, state/local landlord-tenant law\n- **Tenant relations.** Complaints, disputes, retention conversations\n\n**What a PM doesn't do (or shouldn't):**\n\n- Strategic decisions about renovation, refinance, exit\n- Capital allocation decisions (CapEx prioritization beyond budget)\n- Investor reporting (that's you)\n- Acquisition due diligence on related properties\n\n**Two PM models:**\n\n**Third-party PM.** You hire a professional PM company. They manage 5,000-50,000 units across multiple owners. They have systems, scale, training. Fees: 3-4% of EGI plus reimbursable expenses. The right answer for most operators on most deals.\n\n**Self-management.** You build an internal PM team. Higher control, lower fees (in absolute dollars), but adds operational complexity and capital requirements (back-office staff, software, compliance burden). Worth it at portfolio scale (typically 1,500+ units across multiple deals); not worth it on first 1-3 deals.\n\n**The make-or-break read:**\n\nIndustry data: properties with strong PMs hit pro forma NOI within 3-5%. Properties with weak PMs miss pro forma by 8-15%. On a 144-unit deal, the gap between strong and weak PM is roughly $200-400K of annual NOI — directly translating to $3-7M of value at exit. The PM choice is one of the highest-leverage operational decisions you make.",
            example:
              "DFW 192-unit 2023. We hired a regional PM (15,000 units across DFW). Year-1 actual NOI ran 1.8% above pro forma. Same year, an operator we know hired a smaller PM (3,000 units) on a comparable Phoenix deal — actual NOI ran 11% below pro forma due to lease-up delays and concession overruns. Both deals had similar underwriting. Same 12-month timeframe. The PM difference was $310K of NOI gap on a 144-unit comparable.",
            pitfalls: [
              "Treating PM as commodity vendor — they're operational partners.",
              'Hiring based on lowest fee — saving 0.5% of EGI ($10K/year) often costs $200K+ in NOI variance.',
              'Not evaluating PM track record at deals similar to yours.',
              "Self-managing first 1-3 deals 'to save fees' — adds operational complexity you can't afford.",
              'Skipping reference calls with current PM clients — the single most diagnostic step.',
            ],
            related: ['pm-t02-rfp', 'pm-t04-variance-review'],
          },
          {
            id: 'pm-t02-rfp',
            title: 'Hiring a PM · the RFP and selection process',
            summary:
              'The PM RFP is your screen. Build it, send to 4-6 PMs, evaluate honestly. The 30 hours spent here saves 300 hours over the hold.',
            body:
              "The RFP (Request for Proposal) is the structured document you send to prospective PMs. It captures the deal specifics and asks for their proposed approach.\n\n**What the RFP includes:**\n\n- Property profile (units, asset class, location, current condition)\n- Business plan (stabilization vs value-add, renovation scope)\n- Operational requirements (reporting cadence, software, staffing)\n- Performance expectations (occupancy targets, NOI targets, lease velocity)\n- Financial structure expected (base fee, performance fee structure)\n- Reference requirements (3 similar deals managed, references available)\n\nThe Rescia PM RFP template is in your toolkit. Use it. It captures these elements in a 4-page document.\n\n**Distribution:**\n\nSend to 4-6 PMs. Mix:\n\n- 2-3 regional/local PMs with submarket expertise\n- 1-2 national PMs (Greystar, RPM Living, etc.) for benchmarking\n- 1 boutique/specialized PM if your asset has specific positioning\n\n**Response evaluation:**\n\nEach response gives you data on:\n\n- **Fit.** Do they manage similar assets? Same submarket? Same business plan?\n- **Scale.** Right size for your portfolio (not too small, not too large)\n- **Approach.** How do they think about lease-up, renovation, expense control?\n- **References.** Can you talk to 2-3 current owners about performance?\n- **Pricing.** Base fee + performance structure + reimbursable expenses\n\n**The reference call discipline:**\n\nReference calls are the most diagnostic step. Ask:\n\n- 'How long have you worked with them?'\n- 'Did they hit your year-1 pro forma?'\n- 'Where did they exceed expectations? Where did they fall short?'\n- 'If you could do it over, would you hire them again?'\n- 'Anything you'd warn the next operator about?'\n\nThe referenced clients answer honestly because the PM put them on the list — they expect the call. If a reference is hesitant, that's the answer.\n\n**The selection:**\n\nPick the PM whose approach matches your business plan, whose scale fits your deal, whose references hold up, and whose pricing is reasonable (not lowest). The 0.25-0.5% of EGI difference between best and lowest-priced is meaningless versus the operational gap between best and adequate.",
            example:
              "Mesa 144-unit 2024. Sent RFP to 5 PMs: 2 Phoenix regional, 2 national, 1 specialized in value-add. Got 4 responses (1 declined). Evaluated approach, references, pricing, fit. Top two: Regional A (4% base, strong references on value-add execution) and National B (3.5% base, broad scale, weaker submarket specificity). We chose Regional A. Year-1 actual NOI ran 4.2% above pro forma. The 50bps fee premium ($9K/year) earned about $80K of upside vs pro forma. Worth it.",
            pitfalls: [
              "Skipping the RFP — verbal/email pitches don't compare cleanly.",
              'Sending to only 2-3 PMs — too narrow a comparison.',
              'Not making reference calls — the single most diagnostic step.',
              'Selecting on lowest price — operational quality matters more.',
              'Treating national PMs as superior to regional — submarket expertise often beats scale.',
            ],
            related: ['pm-t03-contract'],
          },
          {
            id: 'pm-t03-contract',
            title: 'The PM contract · structure and incentives',
            summary:
              "The PM contract aligns or misaligns incentives for the next 5+ years. Get the structure right and the PM works for your interests. Get it wrong and you'll wonder why the variance reports look the way they do.",
            body:
              "PM contracts are negotiated. The standard template the PM offers is their starting position, not the only option.\n\n**Base fee.** Industry standard: 3-4% of effective gross income (EGI). Some PMs quote on collected revenue (which subtracts vacancy/bad debt) or scheduled revenue (which doesn't). EGI is the right metric — aligns the PM's fee with operational performance.\n\n**Performance fee (if applicable).** Some contracts include performance bonuses tied to NOI, occupancy, or revenue targets. These are negotiable. A PM who pushes back on performance fees might be telling you they're not confident in their execution.\n\n**Lease-up fees.** Per-unit lease-up fees ($300-1,000 per new lease) on value-add deals. Aligns PM with rent push and lease velocity. Standard, but cap the total exposure.\n\n**Reimbursable expenses.** Travel, training, software, marketing — what's reimbursable, what's included? Read carefully. Common surprise: PM travel to property is reimbursable, can run $5-10K/year on properties they don't visit often.\n\n**Term and termination.**\n\n- **Initial term.** 1-2 years standard.\n- **Renewal.** Auto-renew unless either party gives 60-90 days notice.\n- **Termination for cause.** Standard — material breach, fraud, regulatory violation.\n- **Termination for convenience.** This is the key clause. Can you fire the PM with 60-90 days notice without cause? Push for yes. Without it, you're locked in if performance is mediocre.\n\n**Reporting requirements.** Monthly financials by [date], variance analysis, KPI dashboard, quarterly review meetings. Spell these out — vague language means you'll fight for what you should automatically receive.\n\n**Insurance and liability.** PM carries E&O insurance ($1M+). Indemnifies you for their negligence. Standard.\n\n**The discipline:**\n\nNegotiate the contract before signing. Push on termination for convenience, on the fee structure (base vs performance split), on reporting obligations, on reimbursable scope. The PM's response tells you whether they expect to perform or expect to coast.",
            example:
              "Plano 192-unit 2024. PM contract first draft: 4% base, no performance fee, $750/lease-up, 90-day for-cause termination only. We negotiated: 3.75% base + 5% bonus on NOI exceeding pro forma by 2%+, $500/lease-up, 60-day for-convenience termination. PM accepted. Year-1 NOI ran 3.1% above pro forma — they earned the bonus ($9K), well-aligned with our outcome. The for-convenience clause stayed in the drawer; we never needed it. But it changed the dynamic the entire engagement.",
            pitfalls: [
              "Accepting the PM's standard contract without negotiating.",
              'Not having for-convenience termination — locks you in for full term.',
              "Skipping performance fee structure — pure base-fee PMs aren't motivated to outperform.",
              'Ignoring reimbursable expense scope — these add up across the year.',
              'Not requiring detailed monthly reporting in writing — verbal commitments fade.',
            ],
            related: ['pm-t06-firing'],
          },
          {
            id: 'pm-t04-variance-review',
            title: 'The monthly variance review',
            summary:
              'The monthly variance review is your operational signal. Four numbers tell you whether the PM is doing their job. Watch them every month.',
            body:
              "The monthly variance report compares actual operating results against pro forma (or budget) by line item. Four numbers tell the story:\n\n**1. Occupancy variance.** Actual physical occupancy vs pro forma. On a stabilized property, target is within 1-2% of pro forma. On lease-up, target is 95% of pro forma trajectory. Persistent shortfalls mean lease-up is slow, marketing is weak, or the comp set has shifted.\n\n**2. Concession variance.** Actual concessions paid vs pro forma. Compare both in dollars and as percent of GPR. If concessions are tracking 50%+ above pro forma, the PM is buying lease-up with discounts — short-term occupancy at the cost of long-term economics.\n\n**3. NOI variance.** Actual NOI vs pro forma, monthly and YTD. The headline number. Within 5% is good. 5-10% off is concerning. 10%+ off needs urgent diagnosis.\n\n**4. Bad debt and delinquency variance.** Actual bad debt vs pro forma assumption (typically 1-3% of GPR). Rising bad debt signals tenant quality issues, eviction backlog, or lax collection processes.\n\n**The drill-down:**\n\nWhen a variance shows, drill down:\n\n- NOI low? Decompose: revenue, expenses, or both?\n- Revenue low? Vacancy, concessions, or other income?\n- Expenses high? Which line items? One-time or trend?\n- Trend or anomaly? One bad month or three consecutive?\n\n**The PM conversation:**\n\nEach month, schedule a 30-minute variance call with the PM. Walk through the four numbers. Ask diagnostic questions. Document the explanations. If the PM struggles to explain variance, that itself is a signal.\n\n**The 90-day rule:**\n\nThree consecutive months of NOI variance below pro forma by more than 5% is a yellow flag. Three consecutive months below by 10% is red. By month 6 of consistent underperformance, you're in PM transition territory.\n\n**The discipline:**\n\nThis is your job. Not the PM's. The variance review is how you stay an active operator. Operators who skip the monthly review discover at year-end that their year-1 IRR is meaningfully below pro forma.",
            example:
              "Phoenix 220-unit 2024. Months 1-6 NOI variance: -1.2%, -2.1%, -0.8%, +0.6%, +1.4%, +2.2%. The improving trend was the signal. Concessions ran 35% above pro forma in month 1, normalized by month 4. Bad debt held at 2.1%. Occupancy ramped per pro forma. By month 6 we knew the PM was executing. Compare to a deal where months 1-6 ran -3.1%, -4.2%, -5.8%, -7.1%, -6.4%, -8.2% — that PM didn't survive month 9.",
            pitfalls: [
              'Skipping monthly variance review — you lose 6 months of signal.',
              'Looking at NOI alone — decompose to revenue, expenses, line items.',
              'Not drilling on persistent variance — one month is noise, three is pattern.',
              'Forgetting concession variance — masks occupancy issues.',
              'Treating PM explanations as final — verify against operational reality.',
            ],
            related: ['pm-t05-cadence', 'pm-t06-firing'],
          },
          {
            id: 'pm-t05-cadence',
            title: 'Operating cadence · the ongoing PM relationship',
            summary:
              "The PM relationship has a rhythm. Daily monitoring, weekly checks, monthly reviews, quarterly strategic. Get the cadence right and operations run themselves. Skip it and you're surprised.",
            body:
              "Active operators run a layered cadence with their PMs. Each layer captures different signal:\n\n**Daily (automated):**\n\n- Online dashboard with occupancy, leasing pipeline, work orders, delinquency\n- Most modern PM software (Yardi, RealPage, AppFolio, Buildium) provides this\n- You check 2-3 minutes per day, not 30\n\n**Weekly (15 minutes, async):**\n\n- PM emails Friday update: occupancy delta, leasing pipeline, completed work orders, any incidents (eviction filings, tenant disputes, vendor issues)\n- You read, ask questions if needed, otherwise file\n\n**Monthly (60-90 minutes, scheduled):**\n\n- Monthly financial package received by [day 10] of following month\n- Variance review call scheduled for [day 12-15]\n- 30-minute review of four key numbers (Topic 4)\n- 30-minute walk through any operational issues\n- Next month's plan briefly discussed\n\n**Quarterly (3-4 hours, in-person if possible):**\n\n- Site visit to property (you walk it; they show you)\n- Strategic review: is the business plan on track? Adjustments needed?\n- Capex update: planned vs actual, upcoming work\n- Personnel update: any leasing/maintenance turnover at the property?\n- Renewal-cycle planning: who's expiring next quarter, what's the rent push strategy?\n\n**Annual (full day):**\n\n- Property tour with PM principal (not just the property manager)\n- Full year retrospective: NOI, occupancy, concessions, capex\n- Forward-year budget approval\n- Renovation/value-add planning if applicable\n- Portfolio review (if you have multiple properties with same PM)\n\n**The discipline:**\n\nThis cadence is non-negotiable. Operators who substitute 'I'll catch up when I have time' for the structured cadence end up surprised by issues that should have been caught early. The 60-90 minutes per month + quarterly site visit + annual review is the minimum viable operator cadence.\n\n**The asynchronous layer:**\n\nBetween scheduled touches, communication happens via email or Slack. PM messages major issues immediately (eviction filing, vendor failure, regulatory notice). You respond same-day. This responsiveness is itself part of the relationship.",
            example:
              "Across 3 properties in 2024 we ran the full cadence: 25 monthly variance reviews (skipped a few during travel), 11 quarterly site visits, 3 annual reviews. Total operator time per property: ~10-12 hours/month including reading reports. Operators who run lighter cadence (no quarterly visits, ad-hoc monthly reviews) typically discover problems 2-3 months later than those who run full cadence — and 2-3 months of NOI underperformance compounds into 4-6% IRR variance over a 5-year hold.",
            pitfalls: [
              'Skipping monthly variance reviews when "things are going well."',
              'Not visiting properties quarterly — you miss what does not show on paper.',
              'Treating annual review as paperwork rather than strategic.',
              'Ad-hoc communication instead of structured cadence.',
              'Trusting daily dashboard without weekly summary — you see numbers, not narrative.',
            ],
            related: ['pm-t04-variance-review'],
          },
          {
            id: 'pm-t06-firing',
            title: 'Firing the PM · transition without disruption',
            summary:
              "PMs underperform. Sometimes they need to be replaced. The transition is operationally risky — get it wrong and you damage 6+ months of operations. Plan it, execute it cleanly.",
            body:
              "PM termination happens in 15-25% of multifamily holds. It's not a failure — it's an operational decision. The question is whether you execute the transition well.\n\n**When to fire:**\n\n- 6+ months of NOI variance below pro forma by 8%+ without credible explanation\n- Repeated reporting failures (late, incomplete, inaccurate)\n- Operational incidents (regulatory violations, fair housing issues, material vendor failures)\n- Communication breakdowns (PM unavailable, defensive about variance, blames external factors)\n- Loss of confidence in the PM's competence or alignment\n\n**When NOT to fire:**\n\n- One bad month or quarter — single data points are noise\n- Variance during expected disruption (renovation, lease-up, market correction)\n- Personality conflicts that don't affect operations\n- Frustration with reporting style when results are good\n\n**The transition timeline (60-90 days):**\n\n**Days 1-15: Decision and preparation.**\n- Document the underperformance with specific data\n- Begin RFP process for replacement PM (Topic 2)\n- Review PM contract for termination requirements\n- Don't tell current PM yet\n\n**Days 15-30: Selection and notification.**\n- Select replacement PM\n- Sign new PM contract\n- Provide written termination notice to current PM (typically 60-90 days per contract)\n- Establish transition cooperation requirements in termination notice\n\n**Days 30-75: Active transition.**\n- Replacement PM begins shadow operations (ideally) — observes, attends meetings, prepares\n- Current PM continues primary operations\n- Document transfer: leases, vendor contracts, tenant ledgers, software access, bank accounts\n- Personnel transition: on-site staff often stay (they work for the property, not the PM)\n\n**Days 75-90: Handover.**\n- New PM takes operational control\n- Previous PM provides 30-day post-handover support\n- Final reconciliation of fees, accruals, prorations\n\n**The risks:**\n\n- **Lease-up disruption.** If you fire during active lease-up, the transition adds 30-60 days of slowed leasing\n- **Tenant confusion.** Communications need to handle the 'your management changed' notice carefully\n- **Vendor re-coordination.** New PM needs to onboard all existing vendors; some renegotiations are typical\n- **Staff turnover.** On-site staff sometimes leave with the previous PM; plan for replacement\n- **Data loss.** Soft data (tenant histories, vendor preferences, neighborhood relationships) is hard to fully transfer\n\n**The post-transition discipline:**\n\nAfter transition, run heightened cadence with new PM for first 90 days. Weekly check-ins instead of monthly. Daily dashboard review. The first 90 days set the relationship pattern.\n\n---\n\n**◆ Mastery Live members workshop this on a real deal.**\n\nPM termination decisions are where coaching saves the most operational risk. Self-Study gives you the framework. Live members bring their underperforming PM situations to the monthly call and Diva and Lou pressure-test the diagnosis with them — flagging when the PM is recoverable versus structurally wrong, when the timing of transition matters, and when 'fire and replace' is actually the wrong call. The framework is the same. The difference is having a seasoned operator across the table when you're staring at a $200K NOI variance and trying to decide whether to give the PM another quarter or pull the trigger now.",
            example:
              "Phoenix 220-unit 2024 inherited an underperforming PM from prior owner. Months 1-3 post-close NOI variance: -8.4%, -11.2%, -14.1%. PM explanations were inadequate. We initiated transition at month 4. New PM selected by month 5, transition complete by month 7. Months 8-12 NOI variance: -4.1%, -1.3%, +0.8%, +1.2%, +1.9%. The transition cost ~2.5 months of operational drag but pulled the deal back to pro forma trajectory by month 9. Without transition, year-1 IRR would have run 6-8% below pro forma.",
            pitfalls: [
              'Firing on one bad quarter — patterns matter, not single data points.',
              'Skipping the cooperation requirements in termination notice — bad transitions follow.',
              'Not running shadow operations during transition — replacement PM hits the ground cold.',
              "Forgetting on-site staff retention — they're the operational continuity.",
              "Treating PM termination as failure rather than operational decision — it's part of running an active portfolio.",
            ],
            related: ['pm-t02-rfp', 'pm-t03-contract', 'pm-t04-variance-review'],
          },
        ],
        deepDive: [
          'The PM RFP template — what to ask for and how to evaluate responses.',
          'Monthly variance review: the four numbers that tell you if the PM is doing their job.',
          'When to fire a PM and how to transition without disrupting operations.',
        ],
        quiz: [
          {
            q: 'A first-time syndicator with one 144-unit Phoenix deal is considering self-managing to save fees. The deal has a 24-month value-add business plan. What is the right call?',
            a: 'Hire third-party PM with submarket experience — operational complexity is too high for first deal.',
            why: "First-time syndicators on first deals don't have the back-office infrastructure (compliance staff, software licenses, accounting team) to self-manage at institutional quality. The 3-4% PM fee saved by self-managing is dwarfed by the operational risk of running on-site operations without prior systems experience. Hire a third-party PM with strong submarket experience for the first 1-3 deals, then evaluate self-management at portfolio scale.",
            trap: 'Operators see PM fees and assume they\'re "saving" by self-managing. The fees are the cost of expertise. Saving 4% of $2M EGI = $80K/year. The operational risk of inexperienced self-management is typically 4-8% of NOI variance = $80-160K per year. Self-managing first deals usually loses money.',
            topicId: 'pm-t01-operational-partner',
            difficulty: 'operator',
            choices: [
              'Self-manage — fees compound across 5 years',
              'Hire third-party PM with submarket experience — operational complexity is too high for first deal',
              'Self-manage with one part-time bookkeeper for support',
              'Hire national PM regardless of submarket experience',
            ],
            correctIndex: 1,
          },
          {
            q: 'You sent the PM RFP to 5 PMs and received 4 responses. PM A quotes 3% base fee with 3 references on stabilized properties only. PM D quotes 4% base + lease-up bonus with 8 references on similar Sun Belt value-adds. What is the right read?',
            a: 'PM D — submarket and business plan match matters more than fee.',
            why: "Submarket and business plan fit drives operational quality. PM D's 8 references on Sun Belt value-adds means they've executed your exact business plan multiple times. PM A's 3 references on stabilized properties means they don't have value-add experience. The 1% fee gap ($20K/year) is dwarfed by the operational performance gap (2-5% NOI variance = $40-100K/year). PM D is the right call even at the higher fee.",
            trap: 'Operators sometimes optimize for fee on PM selection because fees are the visible number. The operational quality difference is the invisible number that matters more. Always pay for fit and experience.',
            topicId: 'pm-t02-rfp',
            difficulty: 'operator',
            choices: [
              'PM A — saves $20K/year on a $2M EGI deal',
              'PM D — submarket and business plan match matters more than fee',
              'Negotiate PM D down to 3.5% with same scope',
              'Reissue RFP with stricter criteria',
            ],
            correctIndex: 1,
          },
          {
            q: 'Your PM contract has 90-day for-cause termination only (no for-convenience clause). At month 8 of the hold, NOI variance is -7% YTD. PM explanations are weak. What is your situation?',
            a: "You're effectively locked in until contract renewal — 7% variance isn't typically 'cause.'",
            why: '"For-cause" termination requires material breach (fraud, regulatory violation, gross negligence). Underperformance — even significant underperformance — typically doesn\'t qualify. Without a for-convenience clause, you\'re effectively locked in until contract renewal date or until performance is so bad it crosses into negligence. This is why for-convenience clauses matter at contract negotiation time.',
            trap: "Operators sometimes accept the PM's standard contract because it's 'standard.' The standard PM contract favors the PM. Negotiate for-convenience termination at signing — even if you never use it, it changes the dynamic of the engagement.",
            topicId: 'pm-t03-contract',
            difficulty: 'operator',
            choices: [
              'You can fire immediately — variance is enough cause',
              "You're effectively locked in until contract renewal — 7% variance isn't typically 'cause'",
              'Provide 30-day notice and walk away',
              'Negotiate fee reduction in lieu of termination',
            ],
            correctIndex: 1,
          },
          {
            q: 'Months 1-3 of a stabilized 144-unit acquisition: NOI variance -1.2%, -2.8%, -4.4%. Concessions running 45% above pro forma. Occupancy holding at pro forma. What is the diagnosis?',
            a: 'Warning sign — concessions are masking soft demand; occupancy will follow.',
            why: 'Holding occupancy with elevated concessions is a buying-occupancy-with-discounts pattern. The PM is hitting occupancy targets but at cost. By month 4-6, two things typically happen: either concessions normalize (if market firms) or occupancy starts to slip (if market is genuinely soft). The trajectory is concerning. Three months of widening NOI variance with concession-supported occupancy is the early signal.',
            trap: 'Operators sometimes look at occupancy alone and conclude the PM is performing. The four-number framework — NOI, occupancy, concessions, bad debt — exists because each number alone misleads. The combination tells the truth.',
            topicId: 'pm-t04-variance-review',
            difficulty: 'application',
            choices: [
              'Acceptable — within normal noise',
              'Warning sign — concessions are masking soft demand; occupancy will follow',
              'PM is performing well — occupancy is on target',
              'Wait for month 6 to evaluate',
            ],
            correctIndex: 1,
          },
          {
            q: 'At month 4 of a hold, NOI variance is -9% YTD. You decide to terminate the current PM. The property is in active lease-up (60% occupied, target 95%). What is the right transition timing?',
            a: 'Begin transition planning now, complete by month 7-8 with shadow operations.',
            why: 'Transition during active lease-up is risky but not prohibitive. The right approach: (a) begin selection of replacement PM immediately, (b) provide termination notice with 60-day timeline, (c) require shadow operations from new PM during the last 30-45 days, (d) execute handover when shadow has captured operational continuity. This adds 1-2 months of mild disruption but avoids 4-6 more months of underperformance under a failing PM.',
            trap: '"Operators sometimes wait for stable timing that never comes." The cost of leaving a failing PM in place during lease-up usually exceeds the cost of carefully managed transition during lease-up. The discipline: plan transition at month 4, execute by month 7, accept the 1-2 month disruption.',
            topicId: 'pm-t06-firing',
            difficulty: 'operator',
            choices: [
              'Immediate — every month of underperformance compounds',
              'Wait until lease-up completes (likely month 8-9), then transition',
              'Begin transition planning now, complete by month 7-8 with shadow operations',
              "Don't transition during lease-up — risk too high",
            ],
            correctIndex: 2,
          },
        ],
        mistakes: [
          {
            trap: 'Selecting PM on lowest fee.',
            why: 'PM fees on a typical deal: $80-120K/year. NOI variance from poor PM operations: $200-500K/year. The operational gap dwarfs the fee gap. Operators who select on lowest fee discover at variance review that they bought a 4% fee PM with 11% NOI variance — 7% of which they could have avoided with a 5% fee PM.',
            fix: 'Evaluate PM responses on submarket fit, business plan experience, references, and approach — in that order. Fee is the last filter, not the first. The right PM at 4% base saves $200K of NOI variance versus a wrong PM at 3% base.',
            topicId: 'pm-t02-rfp',
          },
          {
            trap: 'Skipping for-convenience termination clause.',
            why: 'Without for-convenience termination, you\'re locked into the PM until contract renewal regardless of performance. "For cause" is a high bar — gross negligence, fraud, regulatory violation. Mediocre performance doesn\'t qualify. Operators discover at month 9-12 that they\'re stuck with an underperforming PM until month 18-24.',
            fix: "Always negotiate for-convenience termination at contract signing. Standard 60-90 day notice. The PM's pushback (if any) tells you whether they expect to perform. Strong PMs accept for-convenience because they're confident in their execution; weak PMs resist because they want lock-in.",
            topicId: 'pm-t03-contract',
          },
          {
            trap: 'Skipping monthly variance reviews when "things are going well."',
            why: "Operators who skip monthly review when things are going well lose the early signal when things start going badly. By the time variance is obvious enough to notice without structured review, it's already 3-4 months behind. The 60-90 minutes per month of monthly review is the cost of staying an active operator.",
            fix: 'Monthly variance review is non-negotiable. Schedule it on day 12-15 of each month for the prior month. Review the four numbers. Drill on any variance over 3%. Document. Operators who maintain this cadence catch problems 2-3 months earlier than those who don\'t — and 2-3 months of compounding NOI variance is the difference between hitting and missing pro forma.',
            topicId: 'pm-t04-variance-review',
          },
          {
            trap: 'Treating PM termination as failure.',
            why: 'PM termination is an operational decision, not a personal failure. PMs underperform for many reasons — wrong fit, staff turnover, economic shifts. Continuing with an underperforming PM is the actual failure. Operators who avoid termination on emotional grounds typically lose 4-8% of NOI to PM underperformance over the hold — a much larger cost than the awkwardness of a transition.',
            fix: 'When variance review consistently shows underperformance over 6+ months without credible explanation, initiate transition. Document the data. Run the RFP process. Execute clean handover. The transition is operational discipline, not interpersonal conflict. Most PMs respect operators who hold them accountable, even when accountability means termination.',
            topicId: 'pm-t06-firing',
          },
        ],
      },
    ],
  },
];
