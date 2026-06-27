import type { AuditDomain, GenerativeRates } from "@/types"

export type DomainVector = [number, number, number, number, number, number, number, number, number]

export const DOMAIN_VECTORS: Record<AuditDomain, DomainVector> = {
  education:   [0.8, 1.0, 0.9, 0.8, 0.9, 1.0, 1.0, 1.0, 0.8],
  labor:       [0.8, 0.7, 0.8, 1.0, 0.9, 0.8, 1.0, 1.0, 0.7],
  welfare:     [0.9, 1.0, 0.9, 0.8, 1.0, 1.0, 1.0, 1.0, 0.8],
  healthcare:  [0.9, 0.9, 0.9, 0.8, 1.0, 0.9, 1.0, 1.0, 0.8],
  research:    [1.0, 1.0, 0.9, 0.8, 0.8, 1.0, 0.8, 1.0, 1.0],
  finance:     [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  governance:  [0.9, 0.8, 0.9, 0.9, 1.0, 0.8, 1.0, 1.0, 0.8],
  platform:    [0.9, 0.8, 0.9, 0.9, 1.0, 0.8, 1.0, 1.0, 0.8],
  other:       [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
}

export function ratesToVector(rates: GenerativeRates): DomainVector {
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
