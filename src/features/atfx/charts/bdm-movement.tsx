import { TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { BDMS_IMPROVED, movement, type BdmMovement } from './bdm-movement-data'

export function BdmMovementBoards() {
  return (
    <Card className='gap-4 py-5'>
      <div className='flex items-center gap-2 px-5'>
        <TrendingUp className='size-4 shrink-0 text-emerald-600 dark:text-emerald-400' />
        <h3 className='text-base font-semibold'>BDMs Who Improved</h3>
        <span className='text-sm text-muted-foreground tabular-nums'>
          ({BDMS_IMPROVED.length})
        </span>
      </div>

      {BDMS_IMPROVED.length === 0 ? (
        <p className='px-5 py-8 text-sm text-muted-foreground'>
          No BDMs in this category
        </p>
      ) : (
        <ol className='space-y-2 px-5'>
          {BDMS_IMPROVED.map((row, i) => (
            <MovementRow key={`${row.name}-${i}`} row={row} />
          ))}
        </ol>
      )}
    </Card>
  )
}

function MovementRow({ row }: { row: BdmMovement }) {
  const delta = movement(row)
  const recognitionLabel =
    row.recognition === 'No Recognition' ? null : row.recognition

  return (
    <li className='flex items-center justify-between gap-3 rounded-lg border bg-background/40 px-3 py-2'>
      <div className='min-w-0'>
        <p className='truncate text-sm font-medium' title={row.name}>
          {row.name}
        </p>
        <p className='text-xs text-muted-foreground tabular-nums'>
          Prev: #{row.prevRank} · Current: #{row.currentRank} · Score:{' '}
          {row.score.toFixed(1)}
        </p>
      </div>

      <div className='flex shrink-0 items-center gap-2'>
        <span className='inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 tabular-nums dark:text-emerald-400'>
          ↑{Math.abs(delta)}
        </span>
        {recognitionLabel ? (
          <span className='hidden text-xs text-muted-foreground sm:inline'>
            {recognitionLabel}
          </span>
        ) : null}
      </div>
    </li>
  )
}
