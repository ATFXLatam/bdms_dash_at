// HARDCODED — regional performance report (latest, not yet in Salesforce).

export interface RegionMetrics {
  region: string
  // Average of each BDM's total (weighted) score within the region.
  avgFinalScore: number
  // Sum of Net Deposit across the region's BDMs.
  totalNetDeposit: number
  totalActiveIbs: number
}

export const REGION_PERFORMANCE: RegionMetrics[] = [
  {
    region: 'Mexico',
    avgFinalScore: 0,
    totalNetDeposit: -158.34,
    totalActiveIbs: 13,
  },
  {
    region: 'Colombia & Peru',
    avgFinalScore: 0,
    totalNetDeposit: 146061.73,
    totalActiveIbs: 15,
  },
  {
    region: 'LATAM South',
    avgFinalScore: 0,
    totalNetDeposit: -146784.01,
    totalActiveIbs: 15,
  },
  {
    region: 'Ecuador',
    avgFinalScore: 0,
    totalNetDeposit: 8062.59,
    totalActiveIbs: 3,
  },
]
