import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  LATEST_SCORECARD_MONTH,
  sumActiveIbsByTeam,
} from './bdm-scorecard-data'
import {
  REGION_PERFORMANCE,
  type RegionMetrics,
} from './region-performance-data'

const num2 = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
const numInt = new Intl.NumberFormat('en-US')

// Region names differ slightly from BDM_SCORECARD team names (diacritics only).
const REGION_TO_TEAM: Record<string, string> = {
  Mexico: 'México',
}

const ACTIVE_IBS_BY_TEAM = sumActiveIbsByTeam(LATEST_SCORECARD_MONTH)

type Metric = {
  label: string
  value: (r: RegionMetrics) => string
}

const METRICS: Metric[] = [
  {
    label: 'New Activated IBs',
    value: (r) => {
      const team = REGION_TO_TEAM[r.region] ?? r.region
      return numInt.format(ACTIVE_IBS_BY_TEAM[team] ?? 0)
    },
  },
  { label: 'Average Final Score', value: (r) => r.avgFinalScore.toFixed(1) },
  { label: 'Total Net Deposit', value: (r) => num2.format(r.totalNetDeposit) },
  { label: 'Total Active IBs', value: (r) => numInt.format(r.totalActiveIbs) },
]

export function RegionPerformance() {
  const first = REGION_PERFORMANCE[0]?.region

  return (
    <Card className='gap-4 py-5'>
      <h3 className='px-5 text-base font-semibold'>Regional performance</h3>
      <Tabs defaultValue={first} className='gap-4 px-5'>
        <TabsList className='flex-wrap'>
          {REGION_PERFORMANCE.map((r) => (
            <TabsTrigger key={r.region} value={r.region}>
              {r.region}
            </TabsTrigger>
          ))}
        </TabsList>

        {REGION_PERFORMANCE.map((r) => (
          <TabsContent key={r.region} value={r.region}>
            <dl className='divide-y'>
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className='flex items-center justify-between gap-4 py-2.5'
                >
                  <dt className='text-sm text-muted-foreground'>{m.label}</dt>
                  <dd className='text-sm font-semibold tabular-nums'>
                    {m.value(r)}
                  </dd>
                </div>
              ))}
            </dl>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  )
}
