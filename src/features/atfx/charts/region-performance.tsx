import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  REGION_PERFORMANCE,
  type RegionMetrics,
} from './region-performance-data'

const num2 = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
const numInt = new Intl.NumberFormat('en-US')

type Metric = {
  label: string
  value: (r: RegionMetrics) => string
  placeholder?: boolean
}

const METRICS: Metric[] = [
  // Not tracked yet — no data source for new IB activations by region.
  { label: 'New Activated IBs', value: () => 'Coming soon', placeholder: true },
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
                  <dd
                    className={
                      m.placeholder
                        ? 'text-sm text-muted-foreground italic'
                        : 'text-sm font-semibold tabular-nums'
                    }
                  >
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
