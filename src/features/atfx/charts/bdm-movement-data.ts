// DERIVED from the single-source scorecard — do not add data here.
import { scoreBdmsForMonth, type RecognitionTier } from './bdm-scorecard-data'

export interface BdmMovement {
  name: string
  prevRank: number
  currentRank: number
  recognition: RecognitionTier
}

export function movement(row: BdmMovement): number {
  return row.prevRank - row.currentRank
}

export function bdmsWhoImproved(month: string): BdmMovement[] {
  return scoreBdmsForMonth(month)
    .map(
      (b): BdmMovement => ({
        name: b.name,
        prevRank: b.prevRank,
        currentRank: b.rank,
        recognition: b.recognition,
      })
    )
    .filter((b) => movement(b) > 0)
    .sort((a, b) => movement(b) - movement(a))
}
