// SINGLE SOURCE OF TRUTH — monthly BDM scorecard (authoritative report).
// Why hardcoded: fixed monthly snapshot with report-specific methodology.
// Downstream (score, rank, movement, recognition, IB rate, awards) is DERIVED.

export type RecognitionTier =
  | 'Top Performer'
  | 'High Performer'
  | 'Growth Contribution'
  | 'No Recognition'

export type BdmStatus = 'Active' | 'Inactive'

export interface BdmScorecardEntry {
  name: string
  status: BdmStatus
  month: string
  country: string
  team: string
  netDeposit: number
  mibs: number
  activeIbs: number
  lots: number
  prevRank: number
}

export interface ScoredBdm extends BdmScorecardEntry {
  score: number
  rank: number
  movement: number
  ibActivationRate: number | null
  recognition: RecognitionTier
}

export const SCORE_WEIGHTS = {
  netDeposit: 0.6,
  mibs: 0.15,
  activeIbs: 0.15,
  lots: 0.1,
} as const

export const MONTH_LABELS: Record<string, string> = {
  Jun: 'June',
  Jul: 'July',
  Aug: 'August',
}

export const BDM_SCORECARD: BdmScorecardEntry[] = [
  { name: 'Alejandro Granados', status: 'Active', month: 'Jun', country: 'México', team: 'México', netDeposit: 9951.24, mibs: 10, activeIbs: 2, lots: 67.75, prevRank: 1 },
  { name: 'Danilo Romero', status: 'Active', month: 'Jun', country: 'Colombia', team: 'Colombia & Peru', netDeposit: -2314.56, mibs: 5, activeIbs: 2, lots: 11.1, prevRank: 6 },
  { name: 'Gerardo Sanchez', status: 'Active', month: 'Jun', country: 'México', team: 'México', netDeposit: 595.61, mibs: 6, activeIbs: 2, lots: 53.43, prevRank: 2 },
  { name: 'Joao Sandi', status: 'Active', month: 'Jun', country: 'Brazil', team: 'LATAM South', netDeposit: -79.13, mibs: 3, activeIbs: 1, lots: 5.38, prevRank: 7 },
  { name: 'Joel Flores', status: 'Active', month: 'Jun', country: 'México', team: 'México', netDeposit: -21308.44, mibs: 3, activeIbs: 2, lots: 14.39, prevRank: 3 },
  { name: 'Juan Tachack', status: 'Active', month: 'Jun', country: 'Colombia', team: 'Colombia & Peru', netDeposit: 17103.0, mibs: 6, activeIbs: 4, lots: 27.57, prevRank: 8 },
  { name: 'Juliana Alonso', status: 'Active', month: 'Jun', country: 'Uruguay', team: 'Colombia & Peru', netDeposit: -3108.3, mibs: 5, activeIbs: 3, lots: 18.33, prevRank: 9 },
  { name: 'María José Mangione', status: 'Active', month: 'Jun', country: 'Argentina', team: 'LATAM South', netDeposit: -7250.0, mibs: 0, activeIbs: 0, lots: 6.06, prevRank: 10 },
  { name: 'Nicole Coronel', status: 'Active', month: 'Jun', country: 'Ecuador', team: 'Ecuador', netDeposit: -2507.31, mibs: 1, activeIbs: 1, lots: 0.17, prevRank: 12 },
  { name: 'Rafael Caballero', status: 'Active', month: 'Jun', country: 'Colombia', team: 'Colombia & Peru', netDeposit: 105356.79, mibs: 0, activeIbs: 1, lots: 8.24, prevRank: 13 },
  { name: 'Sergio Vargas', status: 'Active', month: 'Jun', country: 'Colombia', team: 'Colombia & Peru', netDeposit: 51053.68, mibs: 6, activeIbs: 4, lots: 0.46, prevRank: 14 },
  { name: 'Yennifer Caballero', status: 'Active', month: 'Jun', country: 'Uruguay', team: 'LATAM South', netDeposit: 32398.89, mibs: 0, activeIbs: 0, lots: 20.57, prevRank: 16 },
  { name: 'Antonio Perea', status: 'Inactive', month: 'Jun', country: 'Colombia', team: 'Colombia & Peru', netDeposit: 6183.08, mibs: 0, activeIbs: 0, lots: 0.14, prevRank: 4 },
  { name: 'Carmen Jimenez', status: 'Active', month: 'Jun', country: 'Colombia', team: 'Colombia & Peru', netDeposit: 2371.98, mibs: 6, activeIbs: 3, lots: 0.83, prevRank: 5 },
  { name: 'Yanina Blanco', status: 'Active', month: 'Jun', country: 'Uruguay', team: 'LATAM South', netDeposit: 300090.0, mibs: 0, activeIbs: 1, lots: 1980, prevRank: 17 },
  { name: 'Alejandro Granados', status: 'Active', month: 'Jul', country: 'México', team: 'México', netDeposit: 129787.95, mibs: 0, activeIbs: 0, lots: 253.91, prevRank: 4 },
  { name: 'Carmen Jimenez', status: 'Active', month: 'Jul', country: 'Colombia', team: 'Colombia & Peru', netDeposit: 4289.71, mibs: 7, activeIbs: 3, lots: 15.98, prevRank: 5 },
  { name: 'Emanuel Diaz', status: 'Active', month: 'Jul', country: 'Colombia', team: 'Colombia & Peru', netDeposit: 1400.52, mibs: 7, activeIbs: 2, lots: 0, prevRank: 15 },
  { name: 'Gerardo Sanchez', status: 'Active', month: 'Jul', country: 'México', team: 'México', netDeposit: -82240.94, mibs: 3, activeIbs: 0, lots: 156.77, prevRank: 7 },
  { name: 'Joao Sandi', status: 'Active', month: 'Jul', country: 'Brazil', team: 'LATAM South', netDeposit: -7360.78, mibs: 5, activeIbs: 0, lots: 14.27, prevRank: 11 },
  { name: 'Joel Flores', status: 'Active', month: 'Jul', country: 'México', team: 'México', netDeposit: 131449.75, mibs: 3, activeIbs: 0, lots: 221.97, prevRank: 10 },
  { name: 'Juan Tachack', status: 'Active', month: 'Jul', country: 'Colombia', team: 'Colombia & Peru', netDeposit: -41840.96, mibs: 9, activeIbs: 3, lots: 88.18, prevRank: 3 },
  { name: 'Juliana Alonso', status: 'Active', month: 'Jul', country: 'Uruguay', team: 'LATAM South', netDeposit: -3835.35, mibs: 3, activeIbs: 0, lots: 26.9, prevRank: 6 },
  { name: 'Lucia Villalobos', status: 'Active', month: 'Jul', country: 'México', team: 'México', netDeposit: 3320.02, mibs: 8, activeIbs: 0, lots: 0, prevRank: 14 },
  { name: 'Nicole Coronel', status: 'Active', month: 'Jul', country: 'Ecuador', team: 'Ecuador', netDeposit: 11831.19, mibs: 3, activeIbs: 0, lots: 67.25, prevRank: 12 },
  { name: 'Rafael Caballero', status: 'Active', month: 'Jul', country: 'Colombia', team: 'Colombia & Peru', netDeposit: -741.55, mibs: 1, activeIbs: 0, lots: 194.32, prevRank: 9 },
  { name: 'Sergio Vargas', status: 'Active', month: 'Jul', country: 'Colombia', team: 'Colombia & Peru', netDeposit: 5562.9, mibs: 4, activeIbs: 1, lots: 224.97, prevRank: 2 },
  { name: 'Yanina Blanco', status: 'Active', month: 'Jul', country: 'Uruguay', team: 'LATAM South', netDeposit: 620126.82, mibs: 77, activeIbs: 2, lots: 6090.19, prevRank: 1 },
  { name: 'Federico Pereira', status: 'Active', month: 'Jul', country: 'Uruguay', team: 'LATAM South', netDeposit: 0, mibs: 1, activeIbs: 0, lots: 0, prevRank: 17 },
  { name: 'Yennifer Caballero', status: 'Active', month: 'Jul', country: 'Uruguay', team: 'LATAM South', netDeposit: -3901.16, mibs: 6, activeIbs: 5, lots: 359.72, prevRank: 13 },
  { name: 'Alejandro Granados', status: 'Active', month: 'Aug', country: 'México', team: 'México', netDeposit: 15804.55, mibs: 2, activeIbs: 0, lots: 186.98, prevRank: 4 },
  { name: 'Carmen Jimenez', status: 'Active', month: 'Aug', country: 'Colombia', team: 'Colombia & Peru', netDeposit: 4304.36, mibs: 3, activeIbs: 3, lots: 22.12, prevRank: 5 },
  { name: 'Emanuel Diaz', status: 'Active', month: 'Aug', country: 'Colombia', team: 'Colombia & Peru', netDeposit: 8989.78, mibs: 7, activeIbs: 3, lots: 0, prevRank: 6 },
  { name: 'Gerardo Sanchez', status: 'Active', month: 'Aug', country: 'México', team: 'México', netDeposit: 8090.91, mibs: 3, activeIbs: 0, lots: 630.14, prevRank: 15 },
  { name: 'Joao Sandi', status: 'Active', month: 'Aug', country: 'Brazil', team: 'LATAM South', netDeposit: -1184.17, mibs: 0, activeIbs: 1, lots: 32.74, prevRank: 12 },
  { name: 'Joel Flores', status: 'Active', month: 'Aug', country: 'México', team: 'México', netDeposit: 89161.96, mibs: 4, activeIbs: 3, lots: 425.86, prevRank: 3 },
  { name: 'Juan Tachack', status: 'Active', month: 'Aug', country: 'Colombia', team: 'Colombia & Peru', netDeposit: -25962.32, mibs: 5, activeIbs: 1, lots: 80.26, prevRank: 7 },
  { name: 'Lucia Villalobos', status: 'Active', month: 'Aug', country: 'México', team: 'México', netDeposit: 500.0, mibs: 4, activeIbs: 0, lots: 969.53, prevRank: 9 },
  { name: 'Nicole Coronel', status: 'Active', month: 'Aug', country: 'Ecuador', team: 'Ecuador', netDeposit: -941.87, mibs: 0, activeIbs: 1, lots: 37.48, prevRank: 10 },
  { name: 'Rafael Caballero', status: 'Active', month: 'Aug', country: 'Colombia', team: 'Colombia & Peru', netDeposit: -10218.37, mibs: 1, activeIbs: 0, lots: 151.39, prevRank: 11 },
  { name: 'Sergio Vargas', status: 'Active', month: 'Aug', country: 'Colombia', team: 'Colombia & Peru', netDeposit: -42346.94, mibs: 4, activeIbs: 3, lots: 330.62, prevRank: 8 },
  { name: 'Yanina Blanco', status: 'Active', month: 'Aug', country: 'Uruguay', team: 'LATAM South', netDeposit: 600206.92, mibs: 0, activeIbs: 0, lots: 6504.63, prevRank: 1 },
  { name: 'Federico Pereira', status: 'Active', month: 'Aug', country: 'Uruguay', team: 'LATAM South', netDeposit: 208.23, mibs: 9, activeIbs: 1, lots: 1.52, prevRank: 14 },
  { name: 'Yennifer Caballero', status: 'Active', month: 'Aug', country: 'Uruguay', team: 'LATAM South', netDeposit: 8358.11, mibs: 0, activeIbs: 0, lots: 57.92, prevRank: 2 },
]

function minMaxRatio(value: number, min: number, max: number): number {
  const range = max - min
  return range === 0 ? 0 : (value - min) / range
}

function maxRatio(value: number, max: number): number {
  return max === 0 ? 0 : value / max
}

// RANK.EQ descending: ties share a rank; the next rank is skipped.
function rankEqDescending(scores: number[]): number[] {
  return scores.map(
    (score) => 1 + scores.filter((other) => other > score).length
  )
}

// rank 1 = Top Performer; ranks 2-5 = High Performer; positive Net Deposit
// (any rank beyond 5) = Growth Contribution; otherwise no tag.
function recognitionFor(rank: number, netDeposit: number): RecognitionTier {
  if (rank === 1) return 'Top Performer'
  if (rank <= 5) return 'High Performer'
  if (netDeposit > 0) return 'Growth Contribution'
  return 'No Recognition'
}

function scoreMonth(
  entries: BdmScorecardEntry[],
  prevRankByName?: Map<string, number>
): ScoredBdm[] {
  if (entries.length === 0) return []

  const nets = entries.map((e) => e.netDeposit)
  const mibs = entries.map((e) => e.mibs)
  const activeIbs = entries.map((e) => e.activeIbs)
  const lots = entries.map((e) => e.lots)
  const minNet = Math.min(...nets)
  const maxNet = Math.max(...nets)
  const maxMibs = Math.max(...mibs)
  const maxActiveIbs = Math.max(...activeIbs)
  const maxLots = Math.max(...lots)

  const withScore = entries.map((e) => {
    const weighted =
      SCORE_WEIGHTS.netDeposit * minMaxRatio(e.netDeposit, minNet, maxNet) +
      SCORE_WEIGHTS.mibs * maxRatio(e.mibs, maxMibs) +
      SCORE_WEIGHTS.activeIbs * maxRatio(e.activeIbs, maxActiveIbs) +
      SCORE_WEIGHTS.lots * maxRatio(e.lots, maxLots)
    return {
      ...e,
      score: Math.round(weighted * 10000) / 100,
      ibActivationRate: e.mibs > 0 ? e.activeIbs / e.mibs : null,
    }
  })

  const ranks = rankEqDescending(withScore.map((e) => e.score))

  return withScore
    .map((e, i) => {
      const rank = ranks[i] ?? i + 1
      const prevRank = prevRankByName?.get(e.name) ?? e.prevRank
      return {
        ...e,
        prevRank,
        rank,
        movement: prevRank - rank,
        recognition: recognitionFor(rank, e.netDeposit),
      }
    })
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
}

export const SCORECARD_MONTHS = [...new Set(BDM_SCORECARD.map((e) => e.month))]

// Most recent reporting month — widgets default to this instead of a fixed month.
export const LATEST_SCORECARD_MONTH =
  SCORECARD_MONTHS[SCORECARD_MONTHS.length - 1]

export function scoreBdmsForMonth(month: string): ScoredBdm[] {
  const entries = BDM_SCORECARD.filter((e) => e.month === month)
  const idx = SCORECARD_MONTHS.indexOf(month)
  const prevMonth = idx > 0 ? SCORECARD_MONTHS[idx - 1] : undefined
  const prevRankByName = prevMonth
    ? new Map(scoreBdmsForMonth(prevMonth).map((row) => [row.name, row.rank]))
    : undefined
  return scoreMonth(entries, prevRankByName)
}

// Same rows as scoreBdmsForMonth, but keeps the source report's row order
// instead of re-sorting by score.
export function scoreBdmsForMonthInSourceOrder(month: string): ScoredBdm[] {
  const entries = BDM_SCORECARD.filter((e) => e.month === month)
  const byName = new Map(scoreBdmsForMonth(month).map((row) => [row.name, row]))
  return entries.map((entry) => {
    const scored = byName.get(entry.name)
    if (!scored)
      throw new Error(`Missing score for ${entry.month}:${entry.name}`)
    return scored
  })
}

export type BdmMetricKey =
  | 'netDeposit'
  | 'mibs'
  | 'activeIbs'
  | 'lots'
  | 'score'

export interface BdmChartRow {
  name: string
  value: number
}

export function bdmsRankedByMetric(
  month: string,
  field: BdmMetricKey
): BdmChartRow[] {
  return [...scoreBdmsForMonth(month)]
    .sort((a, b) => b[field] - a[field] || a.name.localeCompare(b.name))
    .map((row) => ({ name: row.name, value: row[field] }))
}

export function topBdmsByScore(month: string, limit = 10): BdmChartRow[] {
  return scoreBdmsForMonth(month)
    .slice(0, limit)
    .map((row) => ({ name: row.name, value: row.score }))
}

export const RECOGNITION_ORDER: RecognitionTier[] = [
  'Top Performer',
  'High Performer',
  'Growth Contribution',
  'No Recognition',
]

export function recognitionDistribution(
  month: string
): Array<{ name: RecognitionTier; value: number }> {
  const rows = scoreBdmsForMonth(month)
  return RECOGNITION_ORDER.map((name) => ({
    name,
    value: rows.filter((row) => row.recognition === name).length,
  })).filter((row) => row.value > 0)
}

export type ScorecardSort = 'rank' | 'excel'

export interface Award {
  title: string
  bdm: ScoredBdm
  detail: string
}

export function computeAwards(
  scored: ScoredBdm[] = scoreBdmsForMonth(LATEST_SCORECARD_MONTH)
): Award[] {
  if (scored.length === 0) return []

  const topBdm = scored[0]
  const mostImproved = [...scored].sort(
    (a, b) => b.movement - a.movement || b.score - a.score
  )[0]
  if (!topBdm || !mostImproved) return []

  const bestIb = [...scored]
    .filter((b) => b.mibs > 0 && b.ibActivationRate !== null)
    .sort(
      (a, b) =>
        (b.ibActivationRate ?? 0) - (a.ibActivationRate ?? 0) ||
        b.activeIbs - a.activeIbs
    )[0]

  const awards: Award[] = [
    {
      title: 'Top BDM of the Month',
      bdm: topBdm,
      detail: `Rank #${topBdm.rank}`,
    },
    {
      title: 'Most Improved BDM',
      bdm: mostImproved,
      detail: `#${mostImproved.prevRank} → #${mostImproved.rank} (+${mostImproved.movement})`,
    },
  ]

  if (bestIb) {
    awards.push({
      title: 'Best IB Activation',
      bdm: bestIb,
      detail: 'Highest IB activation rate',
    })
  }

  return awards
}
