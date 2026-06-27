"use client"

import { useStore } from "@/lib/store"
import { Button, Card, SectionCard, Badge, EthicalNotice } from "./ui"
import { computeDCR } from "@/lib/calculateDCR"
import { generateJudgment } from "@/lib/judgment"
import { generateRecommendations } from "@/lib/recommendations"
import { RISK_FLAG_LABELS, calculatePenalty } from "@/lib/riskPenalties"
import type { RiskFlags, GenerativeRates } from "@/types"
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts"

const RATE_LABELS: Record<keyof GenerativeRates, string> = {
  IGR:  "Information Generative Rate",
  PDFR: "Pre-Difference Field Rate",
  MGR:  "Meaning Generative Rate",
  DRGR: "Division-Relation Generative Rate",
  SRGR: "Social Responsibility Generative Rate",
  TIGR: "Time Generative Rate",
  RCR:  "Return Capability Rate",
  FGR:  "Freedom Generative Rate",
  HGR:  "Historical Generative Rate",
}

function riskBadge(level: string) {
  if (level === "Freedom-generative") return <Badge variant="green">{level}</Badge>
  if (level === "Conditionally generative") return <Badge variant="blue">{level}</Badge>
  if (level === "Ambivalent / unstable") return <Badge variant="yellow">{level}</Badge>
  return <Badge variant="red">{level}</Badge>
}

export function AuditReport() {
  const { state, dispatch } = useStore()
  const { target, rates, flags } = state
  const { rawDCR, penalty, finalDCR, riskLevel } = computeDCR(rates, flags, target.domain)
  const judgment = generateJudgment(finalDCR)
  const recommendations = generateRecommendations(flags, rates)
  const activeFlags = (Object.keys(flags) as (keyof RiskFlags)[]).filter((k) => flags[k])

  const radarData = (Object.keys(rates) as (keyof GenerativeRates)[]).map((k) => ({
    subject: k,
    value: rates[k],
    fullMark: 5,
  }))

  const handleExportJSON = () => {
    const data = {
      auditTarget: target,
      generativeRates: rates,
      riskFlags: flags,
      result: { rawDCR, penalty, finalDCR, riskLevel, judgment, recommendations },
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ddat-audit-${target.title.replace(/\s+/g, "-").toLowerCase()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const dcrColor =
    finalDCR >= 80 ? "#16a34a" :
    finalDCR >= 60 ? "#1d4ed8" :
    finalDCR >= 40 ? "#d97706" :
    finalDCR >= 20 ? "#ea580c" : "#dc2626"

  return (
    <div className="max-w-3xl mx-auto py-12 px-8 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-1">Audit Report</p>
          <h2 className="text-2xl font-bold text-gray-900">{target.title || "Untitled Audit"}</h2>
          <p className="text-sm text-gray-500 mt-1 capitalize">Domain: {target.domain}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportJSON}>Export JSON</Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>Export PDF</Button>
        </div>
      </div>

      {/* 1. Audit Summary */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">1. Audit Summary</p>
          {riskBadge(riskLevel)}
        </div>
        <div className="flex items-end gap-8">
          <div>
            <p className="text-6xl font-bold" style={{ color: dcrColor }}>{Math.round(finalDCR)}</p>
            <p className="text-xs text-gray-400 mt-1">DCR / 100</p>
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Raw DCR</span>
              <span className="font-mono">{rawDCR}</span>
            </div>
            <div className="flex justify-between text-sm text-red-600">
              <span>Total Penalty</span>
              <span className="font-mono">−{penalty}</span>
            </div>
            <div className="flex justify-between text-sm font-bold" style={{ color: dcrColor }}>
              <span>Final DCR</span>
              <span className="font-mono">{Math.round(finalDCR)}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${finalDCR}%`, backgroundColor: dcrColor }} />
        </div>
      </Card>

      {/* 2. Target System */}
      <Card>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">2. Target System</p>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <div><span className="text-gray-400">Evaluator</span><p className="text-gray-800 mt-0.5">{target.evaluator || "—"}</p></div>
            <div><span className="text-gray-400">Evaluated Subject</span><p className="text-gray-800 mt-0.5">{target.evaluatedSubject || "—"}</p></div>
          </div>
          <div><span className="text-gray-400 text-xs">Description</span><p className="text-gray-800 mt-0.5">{target.description || "—"}</p></div>
          <div><span className="text-gray-400 text-xs">Affected Groups</span><p className="text-gray-800 mt-0.5">{target.affectedGroups || "—"}</p></div>
        </div>
      </Card>

      {/* 3. Decision Architecture */}
      <Card>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">3. Decision Architecture</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            ["Data Inputs", target.dataInputs],
            ["Scoring Method", target.scoringMethod],
            ["Decision Outputs", target.decisionOutputs],
            ["Explanation Mechanism", target.explanationMechanism],
            ["Appeal Mechanism", target.appealMechanism],
            ["Re-entry Mechanism", target.reentryMechanism],
          ].map(([label, val]) => (
            <div key={label}>
              <p className="text-xs text-gray-400 mb-0.5">{label}</p>
              <p className="text-gray-800">{val || "—"}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. DDAT Score already shown in summary */}

      {/* 5. Nine Generative Rates */}
      <Card>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">5. Nine Generative Rates</p>
        <div className="grid grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#6b7280" }} />
              <Radar dataKey="value" stroke="#1d4ed8" fill="#1d4ed8" fillOpacity={0.15} strokeWidth={1.5} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="space-y-1.5">
            {(Object.keys(rates) as (keyof GenerativeRates)[]).map((k) => (
              <div key={k} className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-mono w-10">{k}</span>
                <div className="flex-1 mx-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(rates[k] / 5) * 100}%` }}
                  />
                </div>
                <span className="font-bold text-gray-700 w-5 text-right">{rates[k]}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 6. Risk Flags */}
      <Card>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">6. Major Risk Flags</p>
        {activeFlags.length === 0 ? (
          <p className="text-sm text-green-600">No risk flags selected.</p>
        ) : (
          <div className="space-y-1.5">
            {activeFlags.map((k) => (
              <div key={k} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
                <span className="text-sm text-red-800">{RISK_FLAG_LABELS[k]}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 7. Recommended Reconfiguration */}
      <Card>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">8. Recommended Reconfiguration</p>
        <ol className="space-y-2">
          {recommendations.map((r, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-700">
              <span className="text-gray-400 font-mono shrink-0 w-5">{i + 1}.</span>
              {r}
            </li>
          ))}
        </ol>
      </Card>

      {/* 10. Final Judgment */}
      <Card className="border-gray-900">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">10. Final DDAT Judgment</p>
        <p className="text-sm text-gray-800 leading-relaxed">{judgment}</p>
      </Card>

      {/* 11. Ethical Limitation */}
      <SectionCard>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">11. Ethical Limitation</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          This report is not a certification of moral legitimacy. It is an audit simulation based on
          entered assumptions, selected risk flags, and DDAT criteria. It must be reviewed by human
          evaluators, affected communities, domain experts, and institutional decision-makers.
        </p>
      </SectionCard>

      <EthicalNotice />

      <div className="flex justify-between gap-3">
        <Button
          variant="danger"
          onClick={() => {
            dispatch({ type: "RESET" })
            dispatch({ type: "SET_SECTION", payload: "home" })
          }}
        >
          Reset Audit
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => dispatch({ type: "SET_SECTION", payload: "simulation" })}>← Back</Button>
          <Button variant="outline" onClick={handleExportJSON}>Export JSON</Button>
          <Button variant="secondary" onClick={() => window.print()}>Export PDF</Button>
        </div>
      </div>
    </div>
  )
}
