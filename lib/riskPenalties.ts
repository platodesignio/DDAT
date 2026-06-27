import type { RiskFlags } from "@/types"

export const RISK_PENALTIES: Record<keyof RiskFlags, number> = {
  personhoodSubstitution:    15,
  noReentryMechanism:        12,
  noAppealMechanism:         10,
  opaqueScoring:             10,
  excessiveAutomation:        8,
  historicalLockIn:          10,
  povertyPenalty:            10,
  disabilityPenalty:         10,
  biologicalFixation:        15,
  proxyDiscrimination:       15,
  responsibilityShift:       10,
  moralizationOfLowScore:    12,
  classificationAsExclusion: 10,
  measurementAsOntology:     15,
  shortTermKPI:               8,
  surveillanceExpansion:     12,
  noPeriodicReaudit:          6,
  noHumanReview:              8,
  noContextRecovery:         10,
  futureClosure:             15,
}

export const RISK_FLAG_LABELS: Record<keyof RiskFlags, string> = {
  personhoodSubstitution:    "Personhood substitution",
  noReentryMechanism:        "No re-entry mechanism",
  noAppealMechanism:         "No appeal mechanism",
  opaqueScoring:             "Opaque scoring",
  excessiveAutomation:       "Excessive automation",
  historicalLockIn:          "Historical lock-in",
  povertyPenalty:            "Poverty penalty",
  disabilityPenalty:         "Disability penalty",
  biologicalFixation:        "Genetic or biological fixation",
  proxyDiscrimination:       "Proxy discrimination",
  responsibilityShift:       "Institutional responsibility shifted to individuals",
  moralizationOfLowScore:    "Low score converted into moral failure",
  classificationAsExclusion: "Classification used as exclusion",
  measurementAsOntology:     "Measurement treated as ontology",
  shortTermKPI:              "Short-term KPI replaces long-term development",
  surveillanceExpansion:     "Surveillance expands beyond original purpose",
  noPeriodicReaudit:         "No periodic re-audit",
  noHumanReview:             "No human review",
  noContextRecovery:         "No context recovery",
  futureClosure:             "Future possibility closure",
}

export const RISK_FLAG_DESCRIPTIONS: Record<keyof RiskFlags, string> = {
  personhoodSubstitution:    "The system treats a score as equivalent to the person's identity, worth, or capacity.",
  noReentryMechanism:        "There is no pathway for a subject to return after a negative outcome.",
  noAppealMechanism:         "There is no process to contest or challenge a decision.",
  opaqueScoring:             "The scoring method cannot be meaningfully understood or examined by affected parties.",
  excessiveAutomation:       "Human judgment is removed or bypassed at critical decision points.",
  historicalLockIn:          "The system perpetuates historical patterns without correction mechanisms.",
  povertyPenalty:            "Economically disadvantaged subjects are systematically penalized.",
  disabilityPenalty:         "Subjects with disabilities are systematically penalized.",
  biologicalFixation:        "Outcomes are determined by genetic, biological, or fixed characteristics.",
  proxyDiscrimination:       "Racial, gender, class, or origin-based bias operates through proxy variables.",
  responsibilityShift:       "Systemic and institutional failures are attributed to individual subjects.",
  moralizationOfLowScore:    "A low score is treated as evidence of moral failure or character deficiency.",
  classificationAsExclusion: "Classification is used as a mechanism to exclude rather than differentiate.",
  measurementAsOntology:     "What is measured is treated as the totality of what exists or matters.",
  shortTermKPI:              "Short-term performance indicators replace long-term human development.",
  surveillanceExpansion:     "Data collection expands beyond the original stated purpose.",
  noPeriodicReaudit:         "The system is not subject to regular review or recalibration.",
  noHumanReview:             "There is no human oversight or review of automated decisions.",
  noContextRecovery:         "Contextual factors that explain outcomes cannot be introduced or recognized.",
  futureClosure:             "The system reduces the range of future possibilities available to subjects.",
}

export function calculatePenalty(flags: RiskFlags): number {
  return (Object.keys(flags) as (keyof RiskFlags)[]).reduce((sum, key) => {
    return sum + (flags[key] ? RISK_PENALTIES[key] : 0)
  }, 0)
}
