// DERIVED from the single-source scorecard — do not add data here.

import { scoreBdms, type RecognitionTier } from './bdm-scorecard-data'

export interface RecognitionSlice {
  tier: RecognitionTier
  key: string
  percent: number
  color: string
}

const TIER_META: Array<Pick<RecognitionSlice, 'tier' | 'key' | 'color'>> = [
  { tier: 'No Recognition', key: 'noRecognition', color: 'var(--chart-1)' },
  { tier: 'Recognition', key: 'recognition', color: 'var(--highlight-200)' },
  {
    tier: 'Growth Contribution',
    key: 'growthContribution',
    color: 'var(--chart-2)',
  },
  { tier: 'Top Performer', key: 'topPerformer', color: 'var(--highlight)' },
]

const scored = scoreBdms()
const total = scored.length || 1

export const RECOGNITION_DISTRIBUTION: RecognitionSlice[] = TIER_META.map(
  (meta) => {
    const count = scored.filter((b) => b.recognition === meta.tier).length
    return { ...meta, percent: Math.round((count / total) * 100) }
  },
).filter((slice) => slice.percent > 0)
