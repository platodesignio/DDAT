import type { AuditDomain, GenerativeRates, RiskFlags, DCRResult } from "@/types/ddat"
import { domainIdealVectors } from "./domainVectors"
import { calculateTotalPenalty } from "./riskPenalties"

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function ratesToVector(rates: GenerativeRates): number[] {
  return [
    rates.IGR,
    rates.PDFR,
    rates.MGR,
    rates.DRGR,
    rates.SRGR,
    rates.TIGR,
    rates.RCR,
    rates.FGR,
    rates.HGR,
  ]
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0)
  const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0))
  const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0))
  if (magA === 0 || magB === 0) return 0
  const result = dot / (magA * magB)
  return isNaN(result) ? 0 : result
}

export function calculateRawDCR(rates: GenerativeRates, domain: AuditDomain): number {
  const v = ratesToVector(rates)
  const fStar = domainIdealVectors[domain]
  return Math.round(cosineSimilarity(v, fStar) * 100 * 10) / 10
}

export function getRiskLevel(finalDCR: number): string {
  if (finalDCR >= 80) return "Directionally generative"
  if (finalDCR >= 60) return "Conditionally acceptable"
  if (finalDCR >= 40) return "High future-closure risk"
  if (finalDCR >= 20) return "Future-closure risk: significant"
  return "Future-closure risk: severe"
}

export function getDirectionalJudgment(finalDCR: number): string {
  if (finalDCR >= 80)
    return "Acceptable with institutional safeguards. The system shows directionally generative tendencies, but requires periodic re-audit, active appeal mechanisms, and ongoing responsibility monitoring."
  if (finalDCR >= 60)
    return "Conditionally acceptable. Requires contextual recovery and appeal pathways before deployment in high-impact contexts. Unresolved closure risks may compound under institutional pressure."
  if (finalDCR >= 40)
    return "High future-closure risk unless re-entry mechanisms, responsibility allocation, and contextual recovery are added. Not suitable for high-impact decision-making in its current form."
  if (finalDCR >= 20)
    return "Requires responsibility allocation before deployment. The system shows significant future-closure risk through proxy discrimination, opacity, or absence of re-entry pathways."
  return "Not suitable for high-impact decision-making in its current form. The system presents severe future-closure risk. Requires fundamental redesign before any deployment."
}

export function calculateFinalDCR(
  rates: GenerativeRates,
  risks: RiskFlags,
  domain: AuditDomain
): DCRResult {
  const rawDCR = calculateRawDCR(rates, domain)
  const totalPenalty = calculateTotalPenalty(risks)
  const finalDCR = clamp(rawDCR - totalPenalty, 0, 100)
  return {
    rawDCR,
    totalPenalty,
    finalDCR,
    riskLevel: getRiskLevel(finalDCR),
    directionalJudgment: getDirectionalJudgment(finalDCR),
  }
}
