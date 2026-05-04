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
      {
        id: 'sourcing',
        title: 'Module 2 · Deal Sourcing',
        duration: '2.5 hrs',
        description:
          'Build the broker relationships and deal flow that surface real opportunities. On-market, off-market, and the email cadence that gets brokers to remember your name.',
        topics: [],
        deepDive: [
          'The broker-relationship arc — from first email to the third call where they show you something off-market.',
          'On-market vs off-market: when each is worth the time.',
          'How to read a broker offering memo and know what it is not telling you.',
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
