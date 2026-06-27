"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Button, Card, SectionCard } from "./ui"
import { AVAILABLE_INTERVENTIONS } from "@/lib/interventions"
import { computeDCR } from "@/lib/calculateDCR"
import type { GenerativeRates, RiskFlags } from "@/types"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend,
} from "recharts"

function applyInterventions(
  baseRates: GenerativeRates,
  baseFlags: RiskFlags,
  selectedIds: string[]
): { rates: GenerativeRates; flags: RiskFlags } {
  const rates = { ...baseRates }
  const flags = { ...baseFlags }

  for (const id of selectedIds) {
    const intervention = AVAILABLE_INTERVENTIONS.find((i) => i.id === id)
    if (!intervention) continue
    for (const [k, delta] of Object.entries(intervention.rateDeltas)) {
      const key = k as keyof GenerativeRates
      rates[key] = Math.min(5, rates[key] + (delta ?? 0))
    }
    for (const flag of intervention.removedFlags) {
      flags[flag] = false
    }
  }
  return { rates, flags }
}

export function SimulationPanel() {
  const { state, dispatch } = useStore()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [scenarioName, setScenarioName] = useState("Scenario A")

  const baseDCR = computeDCR(state.rates, state.flags, state.target.domain)
  const { rates: simRates, flags: simFlags } = applyInterventions(state.rates, state.flags, selectedIds)
  const simDCR = computeDCR(simRates, simFlags, state.target.domain)

  const diff = simDCR.finalDCR - baseDCR.finalDCR

  const toggle = (id: string) =>
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  const chartData = [
    { name: "Current", dcr: Math.round(baseDCR.finalDCR), fill: "#6b7280" },
    { name: scenarioName, dcr: Math.round(simDCR.finalDCR), fill: "#1d4ed8" },
  ]

  const rateKeys = Object.keys(state.rates) as (keyof GenerativeRates)[]

  return (
    <div className="max-w-4xl mx-auto py-12 px-8 space-y-8">
      <div>
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-1">Step 6</p>
        <h2 className="text-2xl font-bold text-gray-900">DDAT Simulation</h2>
        <p className="text-sm text-gray-500 mt-1">Create intervention scenarios and compare before/after DCR.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <p className="text-xs text-gray-500 mb-1">Current DCR</p>
          <p className="text-3xl font-bold text-gray-900">{Math.round(baseDCR.finalDCR)}</p>
          <p className="text-xs text-gray-400">{baseDCR.riskLevel}</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 mb-1">Scenario DCR</p>
          <p className={`text-3xl font-bold ${diff > 0 ? "text-blue-700" : "text-gray-900"}`}>{Math.round(simDCR.finalDCR)}</p>
          <p className="text-xs text-gray-400">{simDCR.riskLevel}</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 mb-1">Difference</p>
          <p className={`text-3xl font-bold ${diff > 0 ? "text-green-600" : diff < 0 ? "text-red-600" : "text-gray-400"}`}>
            {diff > 0 ? "+" : ""}{Math.round(diff)}
          </p>
          <p className="text-xs text-gray-400">{selectedIds.length} interventions</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Scenario Name</p>
          <input
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
            className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm"
          />
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-3">Select Interventions</p>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {AVAILABLE_INTERVENTIONS.map((intv) => {
              const active = selectedIds.includes(intv.id)
              return (
                <div
                  key={intv.id}
                  onClick={() => toggle(intv.id)}
                  className={`border rounded-sm px-3 py-2 cursor-pointer text-sm transition-colors ${
                    active ? "border-blue-300 bg-blue-50 text-blue-800" : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3.5 h-3.5 rounded-sm border shrink-0 flex items-center justify-center ${active ? "bg-blue-700 border-blue-700" : "border-gray-300"}`}>
                      {active && <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span>{intv.label}</span>
                  </div>
                  {active && (
                    <div className="mt-1.5 ml-5 text-xs text-blue-600 space-y-0.5">
                      {Object.entries(intv.rateDeltas).map(([k, v]) => (
                        <span key={k} className="inline-block mr-2">{k} +{v}</span>
                      ))}
                      {intv.removedFlags.length > 0 && (
                        <p className="text-green-600">Removes {intv.removedFlags.length} risk flag{intv.removedFlags.length > 1 ? "s" : ""}</p>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Comparison</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ border: "1px solid #e5e7eb", borderRadius: 2, fontSize: 12 }} />
                <Bar dataKey="dcr" radius={[2, 2, 0, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Rate Changes</p>
            <div className="space-y-1.5">
              {rateKeys.map((k) => {
                const base = state.rates[k]
                const sim = simRates[k]
                const delta = sim - base
                return (
                  <div key={k} className="flex items-center justify-between text-xs">
                    <span className="font-mono text-gray-500 w-12">{k}</span>
                    <div className="flex-1 mx-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-300 rounded-full" style={{ width: `${(base / 5) * 100}%` }} />
                    </div>
                    <span className="w-6 text-right text-gray-500">{base}</span>
                    <span className={`w-12 text-right font-semibold ${delta > 0 ? "text-green-600" : delta < 0 ? "text-red-500" : "text-gray-400"}`}>
                      {delta > 0 ? `+${delta.toFixed(1)}` : delta === 0 ? "—" : delta.toFixed(1)}
                    </span>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Remaining Risks</p>
            <div className="space-y-1">
              {(Object.keys(simFlags) as (keyof RiskFlags)[])
                .filter((k) => simFlags[k])
                .map((k) => (
                  <p key={k} className="text-xs text-red-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block shrink-0" />
                    {k}
                  </p>
                ))}
              {(Object.keys(simFlags) as (keyof RiskFlags)[]).filter((k) => simFlags[k]).length === 0 && (
                <p className="text-xs text-green-600">All selected flags resolved.</p>
              )}
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => dispatch({ type: "SET_SECTION", payload: "risks" })}>← Back</Button>
        <Button onClick={() => dispatch({ type: "SET_SECTION", payload: "report" })}>View Audit Report →</Button>
      </div>
    </div>
  )
}
