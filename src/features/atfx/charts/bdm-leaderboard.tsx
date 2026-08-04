import { useMemo, useState } from 'react'
import { Award as AwardIcon, Minus, TrendingDown, TrendingUp } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ChartEmptyState } from '@/components/dashboard/chart-empty-state'
import {
  computeAwards,
  scoreBdms,
  scoreBdmsForMonth,
  SCORECARD_LEGEND_YEAR,
  SCORECARD_PRIMARY_MONTH,
  type RecognitionTier,
  type ScorecardSort,
  type ScoredBdm,
} from './bdm-scorecard-data'

const RANK_BADGES = ['🥇', '🥈', '🥉'] as const

const RECOGNITION_ACCENT: Record<
  Exclude<RecognitionTier, 'No Recognition'>,
  string
> = {
  'Top Performer': 'text-[var(--highlight)]',
  Recognition: 'text-[var(--highlight-200)]',
  'Growth Contribution': 'text-emerald-600 dark:text-emerald-400',
}

export function BdmLeaderboard() {
  const [sort, setSort] = useState<ScorecardSort>('excel')
  const rows = useMemo(() => scoreBdms(undefined, sort), [sort])
  const awards = useMemo(
    () => computeAwards(scoreBdmsForMonth(SCORECARD_PRIMARY_MONTH)),
    [],
  )

  if (rows.length === 0)
    return <ChartEmptyState message='No BDM scorecard data' />

  return (
    <div className='space-y-4'>
      <div className='grid gap-3 sm:grid-cols-3'>
        {awards.map((award) => (
          <div
            key={award.title}
            className='rounded-lg border bg-background/40 p-3'
          >
            <div className='flex items-center gap-1.5 text-xs font-medium text-muted-foreground'>
              <AwardIcon className='size-3.5 text-[var(--highlight)]' />
              {award.title}
            </div>
            <p
              className='mt-1 truncate text-sm font-semibold'
              title={award.bdm.name}
            >
              {award.bdm.name}
            </p>
            <p className='text-xs text-muted-foreground tabular-nums'>
              {award.detail}
            </p>
          </div>
        ))}
      </div>

      <div className='flex justify-end'>
        <ToggleGroup
          type='single'
          variant='outline'
          size='sm'
          value={sort}
          onValueChange={(v) => v && setSort(v as ScorecardSort)}
        >
          <ToggleGroupItem value='excel'>Excel order</ToggleGroupItem>
          <ToggleGroupItem value='rank'>Rank order</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-14'>Rank</TableHead>
              <TableHead className='w-16'>Month</TableHead>
              <TableHead>BDM Name</TableHead>
              <TableHead className='text-end'>Final Score</TableHead>
              <TableHead className='text-center'>Movement</TableHead>
              <TableHead>Recognition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <LeaderRow key={`${row.month}-${row.name}`} row={row} />
            ))}
          </TableBody>
        </Table>
      </div>

      <p className='text-xs text-muted-foreground'>
        {SCORECARD_LEGEND_YEAR} · weighted score (Net Deposit 40% · MIB 20% ·
        Active IB 20% · Lots 20%), min-max normalized across BDMs.
      </p>
    </div>
  )
}

function LeaderRow({ row }: { row: ScoredBdm }) {
  const badge = RANK_BADGES[row.rank - 1]
  const recognition =
    row.recognition === 'No Recognition' ? null : row.recognition

  return (
    <TableRow>
      <TableCell className='font-medium tabular-nums'>
        {badge ? (
          <span className='inline-flex items-center gap-1'>
            <span role='img' aria-hidden='true'>
              {badge}
            </span>
            <span className='text-muted-foreground'>#{row.rank}</span>
          </span>
        ) : (
          `#${row.rank}`
        )}
      </TableCell>
      <TableCell className='text-muted-foreground'>{row.month}</TableCell>
      <TableCell className='font-medium'>
        <span className='inline-flex items-center gap-2'>
          {row.name}
          {row.rank <= 5 ? (
            <span className='rounded bg-[var(--highlight)]/10 px-1.5 py-0.5 text-[0.625rem] font-medium uppercase leading-none text-[var(--highlight)]'>
              Top 5
            </span>
          ) : null}
          {row.status === 'Inactive' ? (
            <span className='rounded bg-muted px-1.5 py-0.5 text-[0.625rem] font-medium uppercase leading-none text-muted-foreground'>
              Inactive
            </span>
          ) : null}
        </span>
      </TableCell>
      <TableCell className='text-end'>
        <span className='inline-flex min-w-12 justify-center rounded-full bg-muted px-2 py-0.5 text-sm font-semibold tabular-nums'>
          {row.score.toFixed(1)}
        </span>
      </TableCell>
      <TableCell className='text-center'>
        <MovementChip movement={row.movement} />
      </TableCell>
      <TableCell
        className={
          recognition
            ? `text-sm font-medium ${RECOGNITION_ACCENT[recognition]}`
            : 'text-sm'
        }
      >
        {recognition}
      </TableCell>
    </TableRow>
  )
}

function MovementChip({ movement }: { movement: number }) {
  if (movement === 0)
    return (
      <span className='inline-flex items-center gap-0.5 text-xs text-muted-foreground'>
        <Minus className='size-3' /> 0
      </span>
    )
  const up = movement > 0
  const accent = up
    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
  const Icon = up ? TrendingUp : TrendingDown
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums ${accent}`}
    >
      <Icon className='size-3' />
      {Math.abs(movement)}
    </span>
  )
}
