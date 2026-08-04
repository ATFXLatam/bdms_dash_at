// SINGLE SOURCE OF TRUTH — monthly BDM scorecard (authoritative report).
// Why hardcoded: fixed monthly snapshot with report-specific methodology.
// Downstream (score, rank, movement, recognition, IB rate, awards) is DERIVED.

export type RecognitionTier =
  | 'Top Performer'
  | 'Recognition'
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

export const SCORECARD_MONTH = 'June'
export const SCORECARD_LEGEND_YEAR = '2026'

export const SCORE_WEIGHTS = {
  netDeposit: 0.4,
  mibs: 0.2,
  activeIbs: 0.2,
  lots: 0.2,
} as const

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
]

function minMaxScaler(values: number[]): (value: number) => number {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min
  return (value) => (range === 0 ? 0 : (value - min) / range)
}

function recognitionFor(rank: number, movement: number): RecognitionTier {
  if (rank === 1) return 'Top Performer'
  if (rank <= 5) return 'Recognition'
  if (movement > 0) return 'Growth Contribution'
  return 'No Recognition'
}

export function scoreBdms(
  entries: BdmScorecardEntry[] = BDM_SCORECARD,
): ScoredBdm[] {
  const scaleNetDeposit = minMaxScaler(entries.map((e) => e.netDeposit))
  const scaleMibs = minMaxScaler(entries.map((e) => e.mibs))
  const scaleActiveIbs = minMaxScaler(entries.map((e) => e.activeIbs))
  const scaleLots = minMaxScaler(entries.map((e) => e.lots))

  const scored = entries
    .map((e) => {
      const weighted =
        SCORE_WEIGHTS.netDeposit * scaleNetDeposit(e.netDeposit) +
        SCORE_WEIGHTS.mibs * scaleMibs(e.mibs) +
        SCORE_WEIGHTS.activeIbs * scaleActiveIbs(e.activeIbs) +
        SCORE_WEIGHTS.lots * scaleLots(e.lots)
      return {
        ...e,
        score: Math.round(weighted * 1000) / 10,
        ibActivationRate: e.mibs > 0 ? e.activeIbs / e.mibs : null,
      }
    })
    .sort((a, b) => b.score - a.score)

  return scored.map((e, i) => {
    const rank = i + 1
    const movement = e.prevRank - rank
    return { ...e, rank, movement, recognition: recognitionFor(rank, movement) }
  })
}

export interface Award {
  title: string
  bdm: ScoredBdm
  detail: string
}

export function computeAwards(scored: ScoredBdm[] = scoreBdms()): Award[] {
  const topBdm = scored[0]

  const mostImproved = [...scored].sort(
    (a, b) => b.movement - a.movement || b.score - a.score,
  )[0]

  const bestIb = [...scored]
    .filter((b) => b.mibs > 0 && b.ibActivationRate !== null)
    .sort(
      (a, b) =>
        (b.ibActivationRate ?? 0) - (a.ibActivationRate ?? 0) ||
        b.activeIbs - a.activeIbs,
    )[0]

  const awards: Award[] = [
    {
      title: 'Top BDM of the Month',
      bdm: topBdm,
      detail: `Highest weighted score (${topBdm.score.toFixed(1)})`,
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
      detail: `${bestIb.activeIbs}/${bestIb.mibs} MIBs active (${Math.round(
        (bestIb.ibActivationRate ?? 0) * 100,
      )}%)`,
    })
  }

  return awards
}
