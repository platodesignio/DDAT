export type AuditDomain =
  | "education"
  | "labor"
  | "welfare"
  | "healthcare"
  | "research"
  | "finance"
  | "governance"
  | "platform"
  | "other"

export type AuditTarget = {
  title: string
  domain: AuditDomain
  description: string
  evaluator: string
  evaluatedSubject: string
  dataInputs: string
  scoringMethod: string
  decisionOutputs: string
  explanationMechanism: string
  appealMechanism: string
  reentryMechanism: string
  affectedGroups: string
  intendedBenefit: string
  possibleHarm: string
}

export type GenerativeRates = {
  IGR: number
  PDFR: number
  MGR: number
  DRGR: number
  SRGR: number
  TIGR: number
  RCR: number
  FGR: number
  HGR: number
}

export type RiskFlags = {
  personhoodSubstitution: boolean
  noReentryMechanism: boolean
  noAppealMechanism: boolean
  opaqueScoring: boolean
  excessiveAutomation: boolean
  historicalLockIn: boolean
  povertyPenalty: boolean
  disabilityPenalty: boolean
  biologicalFixation: boolean
  proxyDiscrimination: boolean
  responsibilityShift: boolean
  moralizationOfLowScore: boolean
  classificationAsExclusion: boolean
  measurementAsOntology: boolean
  shortTermKPI: boolean
  surveillanceExpansion: boolean
  noPeriodicReaudit: boolean
  noHumanReview: boolean
  noContextRecovery: boolean
  futureClosure: boolean
}

export type AuditResult = {
  rawDCR: number
  penalty: number
  finalDCR: number
  riskLevel: string
  generativeRates: GenerativeRates
  riskFlags: RiskFlags
  recommendations: string[]
  finalJudgment: string
}

export type Intervention = {
  id: string
  label: string
  rateDeltas: Partial<GenerativeRates>
  removedFlags: (keyof RiskFlags)[]
}

export type Scenario = {
  id: string
  name: string
  interventions: string[]
}
