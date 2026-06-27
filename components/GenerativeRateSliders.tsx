"use client"

import { useStore } from "@/lib/store"
import { Button, Card, EthicalNotice } from "./ui"
import type { GenerativeRates } from "@/types"
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from "recharts"

const RATES: {
  key: keyof GenerativeRates
  short: string
  full: string
  definition: string
}[] = [
  {
    key: "IGR",
    short: "IGR",
    full: "Information Generative Rate",
    definition:
      "Does the system generate richer, more accurate, more contextual information about the situation, or does it reduce reality into a thin score?",
  },
  {
    key: "PDFR",
    short: "PDFR",
    full: "Pre-Difference Field Rate",
    definition:
      "Does the system preserve unclassified potential before fixed categories are imposed, or does it prematurely classify people and cases?",
  },
  {
    key: "MGR",
    short: "MGR",
    full: "Meaning Generative Rate",
    definition:
      "Does the system produce understandable, contestable, meaningful reasons, or does it create opaque truth-feeling without accountability?",
  },
  {
    key: "DRGR",
    short: "D-RGR",
    full: "Division-Relation Generative Rate",
    definition:
      "Does the system improve relational coordination and division of labor, or does it isolate subjects and intensify hierarchy?",
  },
  {
    key: "SRGR",
    short: "SRGR",
    full: "Social Responsibility Generative Rate",
    definition:
      "Does the system distribute responsibility across institutions, environments, and social conditions, or does it shift all responsibility onto the individual?",
  },
  {
    key: "TIGR",
    short: "TIGR",
    full: "Time Generative Rate",
    definition:
      "Does the system preserve time for learning, repair, delay, maturation, and change, or does it freeze the subject in a present score?",
  },
  {
    key: "RCR",
    short: "RCR",
    full: "Return Capability Rate",
    definition:
      "Does the system provide routes for appeal, re-entry, retraining, correction, or recovery after failure?",
  },
  {
    key: "FGR",
    short: "FGR",
    full: "Freedom Generative Rate",
    definition:
      "Does the system expand reachable states and real possibilities, or does it narrow future options?",
  },
  {
    key: "HGR",
    short: "HGR",
    full: "Historical Generative Rate",
    definition:
      "Does the system preserve long-term historical development and collective transformation, or does it lock society into past patterns?",
  },
]

const LABELS = ["0 — Severe closure", "1 — Weak", "2 — Limited", "3 — Moderate", "4 — Strong", "5 — Highly generative"]

function getLabel(v: number) {
  return LABELS[Math.round(v)] ?? LABELS[0]
}

function getColor(v: number) {
  if (v <= 1) return "#dc2626"
  if (v <= 2) return "#f97316"
  if (v <= 3) return "#eab308"
  if (v <= 4) return "#22c55e"
  return "#1d4ed8"
}

export function GenerativeRateSliders() {
  const { state, dispatch } = useStore()
  const rates = state.rates

  const radarData = RATES.map((r) => ({ subject: r.short, value: rates[r.key], fullMark: 5 }))
  const barData = RATES.map((r) => ({ name: r.short, value: rates[r.key] }))

  return (
    <div className="max-w-4xl mx-auto py-12 px-8 space-y-8">
      <div>
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-1">Step 4</p>
        <h2 className="text-2xl font-bold text-gray-900">Nine Generative Rates</h2>
        <p className="text-sm text-gray-500 mt-1">Rate each dimension from 0 (severe closure) to 5 (highly generative).</p>
      </div>

      <div className="space-y-4">
        {RATES.map((r) => {
          const val = rates[r.key]
          return (
            <Card key={r.key}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm">{r.short}</span>
                    <span className="text-sm font-semibold text-gray-900">{r.full}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{r.definition}</p>
                </div>
                <div className="text-right shrink-0 w-32">
                  <span className="text-2xl font-bold" style={{ color: getColor(val) }}>{val}</span>
                  <p className="text-[10px] text-gray-400 leading-tight">{getLabel(val)}</p>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={val}
                onChange={(e) =>
                  dispatch({ type: "SET_RATE", payload: { key: r.key, value: parseFloat(e.target.value) } })
                }
                className="w-full accent-blue-700"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Radar</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#6b7280" }} />
              <Radar dataKey="value" stroke="#1d4ed8" fill="#1d4ed8" fillOpacity={0.15} strokeWidth={1.5} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Bar Chart</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6b7280" }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{ border: "1px solid #e5e7eb", borderRadius: 2, fontSize: 12 }}
                formatter={(v) => [v, "Score"]}
              />
              <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={getColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Numeric Table</p>
        <div className="grid grid-cols-3 gap-2">
          {RATES.map((r) => (
            <div key={r.key} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-sm border border-gray-100">
              <span className="text-xs font-mono text-gray-500">{r.short}</span>
              <span className="text-sm font-bold" style={{ color: getColor(rates[r.key]) }}>{rates[r.key]}</span>
            </div>
          ))}
        </div>
      </Card>

      <EthicalNotice />

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => dispatch({ type: "SET_SECTION", payload: "mapping" })}>← Back</Button>
        <Button onClick={() => dispatch({ type: "SET_SECTION", payload: "risks" })}>Continue to Risk Flags →</Button>
      </div>
    </div>
  )
}
