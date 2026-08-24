import { useMemo, type ReactNode } from 'react'
import {
  Activity,
  Award,
  DollarSign,
  Trophy,
  UserCheck,
  Users,
  type LucideIcon,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { ChartEmptyState } from '@/components/dashboard/chart-empty-state'
import {
  bdmsRankedByMetric,
  recognitionDistribution,
  topBdmsByScore,
  type BdmChartRow,
  type BdmMetricKey,
} from './bdm-scorecard-data'

type MetricChart = {
  title: string
  field: BdmMetricKey
  icon: LucideIcon
  all: boolean
}

const METRIC_CHARTS: MetricChart[] = [
  {
    title: 'Net Deposit by BDM',
    field: 'netDeposit',
    icon: DollarSign,
    all: true,
  },
  { title: 'Lots by BDM', field: 'lots', icon: Activity, all: true },
  { title: 'New MIBs by BDM', field: 'mibs', icon: Users, all: true },
  {
    title: "Active New IB's by BDM",
    field: 'activeIbs',
    icon: UserCheck,
    all: true,
  },
]

const TOP10_CHART: MetricChart = {
  title: 'Top 10 BDMs by Final Score',
  field: 'score',
  icon: Trophy,
  all: false,
}

const BAR_FILL = 'color-mix(in oklch, var(--highlight) 42%, white)'

export function BdmMetricCharts({ month }: { month: string }) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid gap-4 lg:grid-cols-2'>
        {METRIC_CHARTS.map((chart) => (
          <MetricCard key={chart.field} month={month} chart={chart} />
        ))}
      </div>

      <MetricCard month={month} chart={TOP10_CHART} />

      <RecognitionCard month={month} />
    </div>
  )
}

function MetricCard({ month, chart }: { month: string; chart: MetricChart }) {
  const data = useMemo(() => {
    if (chart.field === 'score' && !chart.all) return topBdmsByScore(month, 10)
    return bdmsRankedByMetric(month, chart.field)
  }, [month, chart])

  return (
    <ChartCard title={chart.title} icon={chart.icon}>
      <PrivateHorizontalBars data={data} />
    </ChartCard>
  )
}

function RecognitionCard({ month }: { month: string }) {
  const data = useMemo(() => recognitionDistribution(month), [month])

  return (
    <ChartCard title='Recognition Distribution' icon={Award}>
      <PrivateHorizontalBars data={data} />
    </ChartCard>
  )
}

function ChartCard({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon: LucideIcon
  children: ReactNode
}) {
  return (
    <Card className='gap-4 py-5 shadow-sm'>
      <div className='flex items-center gap-2 px-5'>
        <Icon
          className='size-4 shrink-0 text-[var(--highlight)]'
          aria-hidden='true'
        />
        <h3 className='text-base font-semibold'>{title}</h3>
      </div>
      <CardContent className='pt-0'>{children}</CardContent>
    </Card>
  )
}

function PrivateHorizontalBars({ data }: { data: BdmChartRow[] }) {
  const height = Math.max(280, data.length * 36 + 24)
  const hasNegative = data.some((row) => row.value < 0)

  if (data.length === 0) {
    return <ChartEmptyState message='No BDM data' />
  }

  return (
    <ResponsiveContainer width='100%' height={height}>
      <BarChart
        data={data}
        layout='vertical'
        margin={{ top: 8, right: 16, left: 4, bottom: 8 }}
        barCategoryGap={10}
      >
        <CartesianGrid
          horizontal={false}
          strokeDasharray='3 3'
          className='stroke-border'
        />
        <XAxis type='number' tick={false} tickLine={false} axisLine={false} />
        <YAxis
          type='category'
          dataKey='name'
          width={140}
          tickLine={false}
          axisLine={false}
          fontSize={12}
          interval={0}
          className='fill-foreground'
        />
        <Tooltip
          cursor={{ className: 'fill-muted/30' }}
          content={<NameOnlyTooltip />}
        />
        {hasNegative ? <ReferenceLine x={0} className='stroke-border' /> : null}
        <Bar
          dataKey='value'
          fill={BAR_FILL}
          maxBarSize={28}
          radius={[0, 8, 8, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

function NameOnlyTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload?: { name?: string } }>
}) {
  if (!active || !payload?.length) return null
  const name = payload[0]?.payload?.name
  if (!name) return null
  return (
    <div className='rounded-md border bg-popover px-3 py-2 text-sm text-popover-foreground'>
      {name}
    </div>
  )
}
