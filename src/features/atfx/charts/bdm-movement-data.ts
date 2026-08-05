// DERIVED from the single-source scorecard — do not add data here.

import {
  LATEST_SCORECARD_MONTH,
  scoreBdmsForMonth,
  type RecognitionTier,
} from './bdm-scorecard-data'

export interface BdmMovement {
  name: string
  prevRank: number
  currentRank: number
  score: number
  recognition: RecognitionTier
}

export function movement(row: BdmMovement): number {
  return row.prevRank - row.currentRank
}

const SCORED = scoreBdmsForMonth(LATEST_SCORECARD_MONTH).map(
  (b): BdmMovement => ({
    name: b.name,
    prevRank: b.prevRank,
    currentRank: b.rank,
    score: b.score,
    recognition: b.recognition,
  }),
)

export const BDMS_IMPROVED: BdmMovement[] = SCORED.filter(
  (b) => movement(b) > 0,
).sort((a, b) => movement(b) - movement(a))
