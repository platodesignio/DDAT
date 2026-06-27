import type { AuditDomain, GenerativeRates, RiskFlags } from "@/types"
import { DOMAIN_VECTORS, ratesToVector, type DomainVector } from "./domainVectors"
import { calculatePenalty } from "./riskPenalties"

function cosineSimilarity(a: DomainVector, b: DomainVector): number {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0)
  const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0))
  const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0))
  if (magA === 0 || magB === 0) return 0
  return dot / (magA * magB)
}

export function computeDCR(
  rates: GenerativeRates,
  flags: RiskFlags,
  domain: AuditDomain
): { rawDCR: number; penalty: number; finalDCR: number; riskLevel: string } {
  const v = ratesToVector(rates)
  const fStar = DOMAIN_VECTORS[domain]
  const rawDCR = Math.round(cosineSimilarity(v, fStar) * 100 * 10) / 10
  const penalty = calculatePenalty(flags)
  const finalDCR = Math.max(0, Math.min(100, rawDCR - penalty))

  let riskLevel: string
  if (finalDCR >= 80) riskLevel = "Freedom-generative"
  else if (finalDCR >= 60) riskLevel = "Conditionally generative"
  else if (finalDCR >= 40) riskLevel = "Ambivalent / unstable"
  else if (finalDCR >= 20) riskLevel = "Freedom-closing"
  else riskLevel = "Severe closure"

  return { rawDCR, penalty, finalDCR, riskLevel }
}

export function computeSubScores(flags: RiskFlags): {
  freedomClosureRisk: number
  reentryDeficit: number
  personhoodSubstitutionRisk: number
  institutionalResponsibilityFailure: number
  historicalLockInRisk: number
} {
  const closureFlags: (keyof RiskFlags)[] = ["futureClosure", "classificationAsExclusion", "measurementAsOntology", "shortTermKPI"]
  const reentryFlags: (keyof RiskFlags)[] = ["noReentryMechanism", "noAppealMechanism", "noContextRecovery", "noHumanReview"]
  const personhoodFlags: (keyof RiskFlags)[] = ["personhoodSubstitution", "moralizationOfLowScore", "measurementAsOntology"]
  const responsibilityFlags: (keyof RiskFlags)[] = ["responsibilityShift", "noPeriodicReaudit", "excessiveAutomation"]
  const historicalFlags: (keyof RiskFlags)[] = ["historicalLockIn", "biologicalFixation", "proxyDiscrimination"]

  const score = (keys: (keyof RiskFlags)[]) =>
    Math.round((keys.filter((k) => flags[k]).length / keys.length) * 100)

  return {
    freedomClosureRisk: score(closureFlags),
    reentryDeficit: score(reentryFlags),
    personhoodSubstitutionRisk: score(personhoodFlags),
    institutionalResponsibilityFailure: score(responsibilityFlags),
    historicalLockInRisk: score(historicalFlags),
  }
}
