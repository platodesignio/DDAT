"use client"

import { computeDCR, computeSubScores } from "@/lib/calculateDCR"
import { Card, Badge } from "./ui"
import type { AuditDomain, GenerativeRates, RiskFlags } from "@/types"

function riskColor(level: string): "green" | "blue" | "yellow" | "red" | "gray" {
  if (level === "Freedom-generative") return "green"
  if (level === "Conditionally generative") return "blue"
  if (level === "Ambivalent / unstable") return "yellow"
  if (level === "Freedom-closing") return "red"
  return "red"
}

function SubScore({ label, value }: { label: string; value: number }) {
  const color = value === 0 ? "#22c55e" : value <= 33 ? "#eab308" : value <= 66 ? "#f97316" : "#dc2626"
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <p className="text-xs text-gray-600">{label}</p>
      <div className="flex items-center gap-2">
        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
        </div>
        <span className="text-xs font-mono w-8 text-right" style={{ color }}>{value}%</span>
      </div>
    </div>
  )
}

export function DCRScoreCard({
  rates,
  flags,
  domain,
}: {
  rates: GenerativeRates
  flags: RiskFlags
  domain: AuditDomain
}) {
  const { rawDCR, penalty, finalDCR, riskLevel } = computeDCR(rates, flags, domain)
  const sub = computeSubScores(flags)

  const arcColor =
    finalDCR >= 80 ? "#16a34a" :
    finalDCR >= 60 ? "#1d4ed8" :
    finalDCR >= 40 ? "#d97706" :
    finalDCR >= 20 ? "#ea580c" : "#dc2626"

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">DCR Score</p>
          <Badge variant={riskColor(riskLevel)}>{riskLevel}</Badge>
        </div>
        <div className="flex items-end gap-6">
          <div>
            <p className="text-6xl font-bold" style={{ color: arcColor }}>{Math.round(finalDCR)}</p>
            <p className="text-xs text-gray-400 mt-1">/ 100</p>
          </div>
          <div className="flex-1 space-y-1 pb-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Raw DCR</span>
              <span className="font-mono">{rawDCR}</span>
            </div>
            <div className="flex justify-between text-xs text-red-600">
              <span>Penalty</span>
              <span className="font-mono">−{penalty}</span>
            </div>
            <div className="h-px bg-gray-200" />
            <div className="flex justify-between text-sm font-semibold" style={{ color: arcColor }}>
              <span>Final DCR</span>
              <span className="font-mono">{Math.round(finalDCR)}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${finalDCR}%`, backgroundColor: arcColor }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>0 — Severe closure</span>
          <span>100 — Freedom-generative</span>
        </div>
      </Card>

      <Card>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Sub-Scores</p>
        <SubScore label="Freedom Closure Risk" value={sub.freedomClosureRisk} />
        <SubScore label="Re-entry Deficit" value={sub.reentryDeficit} />
        <SubScore label="Personhood Substitution Risk" value={sub.personhoodSubstitutionRisk} />
        <SubScore label="Institutional Responsibility Failure" value={sub.institutionalResponsibilityFailure} />
        <SubScore label="Historical Lock-in Risk" value={sub.historicalLockInRisk} />
      </Card>
    </div>
  )
}
