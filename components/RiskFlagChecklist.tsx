"use client"

import { useStore } from "@/lib/store"
import { Button, Card } from "./ui"
import type { RiskFlags } from "@/types"
import { RISK_FLAG_LABELS, RISK_FLAG_DESCRIPTIONS, RISK_PENALTIES, calculatePenalty } from "@/lib/riskPenalties"

const FLAG_KEYS = Object.keys(RISK_FLAG_LABELS) as (keyof RiskFlags)[]

export function RiskFlagChecklist() {
  const { state, dispatch } = useStore()
  const flags = state.flags
  const totalPenalty = calculatePenalty(flags)
  const activeCount = FLAG_KEYS.filter((k) => flags[k]).length

  return (
    <div className="max-w-3xl mx-auto py-12 px-8 space-y-8">
      <div>
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-1">Step 5</p>
        <h2 className="text-2xl font-bold text-gray-900">Risk Flags</h2>
        <p className="text-sm text-gray-500 mt-1">Select all structural violations present in this system. Each flag reduces the DCR score.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="border border-gray-200 rounded-sm px-4 py-2">
          <p className="text-xs text-gray-500">Active Flags</p>
          <p className="text-xl font-bold text-gray-900">{activeCount} / {FLAG_KEYS.length}</p>
        </div>
        <div className="border border-red-200 bg-red-50 rounded-sm px-4 py-2">
          <p className="text-xs text-gray-500">Total Penalty</p>
          <p className="text-xl font-bold text-red-700">−{totalPenalty}</p>
        </div>
      </div>

      <div className="space-y-3">
        {FLAG_KEYS.map((key) => {
          const active = flags[key]
          return (
            <div
              key={key}
              onClick={() => dispatch({ type: "SET_FLAG", payload: { key, value: !active } })}
              className={`border rounded-sm px-4 py-3 cursor-pointer transition-colors ${
                active
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-4 h-4 shrink-0 rounded-sm border flex items-center justify-center ${
                  active ? "bg-red-600 border-red-600" : "border-gray-300"
                }`}>
                  {active && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${active ? "text-red-800" : "text-gray-700"}`}>
                      {RISK_FLAG_LABELS[key]}
                    </p>
                    <span className={`text-xs font-mono ${active ? "text-red-600" : "text-gray-400"}`}>
                      −{RISK_PENALTIES[key]}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{RISK_FLAG_DESCRIPTIONS[key]}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => dispatch({ type: "SET_SECTION", payload: "rates" })}>← Back</Button>
        <Button onClick={() => dispatch({ type: "SET_SECTION", payload: "simulation" })}>Continue to Simulation →</Button>
      </div>
    </div>
  )
}
