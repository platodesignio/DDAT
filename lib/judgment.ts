export function generateJudgment(finalDCR: number): string {
  if (finalDCR >= 80) {
    return "This system is broadly freedom-generative, provided that periodic re-audit, appeal, and context recovery remain active."
  }
  if (finalDCR >= 60) {
    return "This system is conditionally freedom-generative, but it contains unresolved risks that may become freedom-closing under institutional pressure."
  }
  if (finalDCR >= 40) {
    return "This system is directionally unstable. It contains both generative and closing tendencies. It should not be deployed without redesign."
  }
  if (finalDCR >= 20) {
    return "This system is freedom-closing. It narrows future possibilities, weakens re-entry, and risks converting measurement into institutional fate."
  }
  return "This system shows severe closure. It should be suspended, redesigned, or rejected before deployment."
}
