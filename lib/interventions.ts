import type { Intervention } from "@/types"

export const AVAILABLE_INTERVENTIONS: Intervention[] = [
  {
    id: "add_appeal",
    label: "Add appeal mechanism",
    rateDeltas: { RCR: 1.0, FGR: 0.5 },
    removedFlags: ["noAppealMechanism"],
  },
  {
    id: "add_reentry",
    label: "Add re-entry pathway",
    rateDeltas: { RCR: 1.5, TIGR: 0.5, FGR: 0.8 },
    removedFlags: ["noReentryMechanism", "futureClosure"],
  },
  {
    id: "add_human_review",
    label: "Add human review",
    rateDeltas: { MGR: 0.5, SRGR: 0.5 },
    removedFlags: ["noHumanReview", "excessiveAutomation"],
  },
  {
    id: "add_explanation",
    label: "Add explanation requirement",
    rateDeltas: { MGR: 1.0, IGR: 0.5 },
    removedFlags: ["opaqueScoring"],
  },
  {
    id: "add_context_recovery",
    label: "Add context recovery",
    rateDeltas: { IGR: 0.8, PDFR: 0.5, SRGR: 0.5 },
    removedFlags: ["noContextRecovery"],
  },
  {
    id: "reduce_automation",
    label: "Reduce automation",
    rateDeltas: { SRGR: 0.5, MGR: 0.3 },
    removedFlags: ["excessiveAutomation"],
  },
  {
    id: "add_reaudit",
    label: "Add periodic re-audit",
    rateDeltas: { HGR: 0.5, TIGR: 0.3 },
    removedFlags: ["noPeriodicReaudit"],
  },
  {
    id: "convert_exclusion_to_support",
    label: "Convert exclusion into support recommendation",
    rateDeltas: { FGR: 1.0, RCR: 0.5, DRGR: 0.5 },
    removedFlags: ["classificationAsExclusion", "futureClosure"],
  },
  {
    id: "institutional_responsibility",
    label: "Add institutional responsibility correction",
    rateDeltas: { SRGR: 1.0, DRGR: 0.5 },
    removedFlags: ["responsibilityShift"],
  },
  {
    id: "reduce_surveillance",
    label: "Reduce surveillance scope",
    rateDeltas: { PDFR: 0.5, FGR: 0.3 },
    removedFlags: ["surveillanceExpansion"],
  },
  {
    id: "prevent_personhood_sub",
    label: "Prevent personhood substitution",
    rateDeltas: { MGR: 0.5, FGR: 0.5 },
    removedFlags: ["personhoodSubstitution", "measurementAsOntology", "moralizationOfLowScore"],
  },
  {
    id: "preserve_longterm",
    label: "Preserve long-term development",
    rateDeltas: { TIGR: 1.0, HGR: 0.8 },
    removedFlags: ["shortTermKPI", "historicalLockIn"],
  },
]
