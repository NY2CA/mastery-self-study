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
      {
        id: 'underwriting',
        title: 'Module 3 · Underwriting',
        duration: '3 hrs',
        description:
          'Build the model. Defend the assumptions. Walk away when the numbers say so. The core craft of multifamily — applied with the Rescia underwriting template.',
        topics: [],
        deepDive: [
          'The Rescia underwriting model walk-through — every assumption defended.',
          'Stabilized vs as-is NOI — why the difference is where deals live or die.',
          'The exit cap rate trap and how to set it honestly.',
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
          'The four stress tests every deal must pass before LOI.',
          'Pricing deferred maintenance from a property condition report — line-by-line.',
          'Cap-ex reserves: why under-budgeting here is the most common operator mistake.',
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
          'Agency vs bank vs bridge — the right debt for the right business plan.',
          'Reading a term sheet: which terms are non-negotiable vs which are leverage.',
          'Refinance optionality and why short-term debt traps operators in bad cycles.',
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
          'The Rescia LOI template — clause-by-clause walk-through.',
          'Earnest money, due diligence period, and the protections every LOI must have.',
          'Counter-offer mechanics: when to push, when to accept, when to walk.',
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
          'PSA red flags — the clauses that need amendment or removal.',
          'Due diligence checklist: inspections, leases, T-12, environmental, title.',
          'Retrade strategy: when DD findings justify a price reduction and how to ask for it.',
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
          'The PM RFP template — what to ask for and how to evaluate responses.',
          'Monthly variance review: the four numbers that tell you if the PM is doing their job.',
          'When to fire a PM and how to transition without disrupting operations.',
        ],
        quiz: [],
        mistakes: [],
      },
    ],
  },
];
