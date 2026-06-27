"use client"

import { useStore } from "@/lib/store"
import { Button, Card } from "./ui"

const FLOW_NODES = [
  { key: "dataInputs",          label: "Data Inputs",          color: "bg-gray-100 border-gray-300" },
  { key: "scoringMethod",       label: "Scoring / Classification", color: "bg-blue-50 border-blue-200" },
  { key: "explanationMechanism",label: "Reason Generation",    color: "bg-gray-100 border-gray-300" },
  { key: "decisionOutputs",     label: "Decision Output",      color: "bg-blue-50 border-blue-200" },
  { key: "possibleHarm",        label: "Social Consequence",   color: "bg-gray-100 border-gray-300" },
  { key: "reentryMechanism",    label: "Re-entry Possibility",  color: "bg-green-50 border-green-200" },
] as const

export function SystemMap() {
  const { state, dispatch } = useStore()
  const t = state.target

  return (
    <div className="max-w-4xl mx-auto py-12 px-8 space-y-8">
      <div>
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-1">Step 3</p>
        <h2 className="text-2xl font-bold text-gray-900">System Mapping</h2>
        <p className="text-sm text-gray-500 mt-1">Visual flow of the decision architecture based on your input.</p>
      </div>

      <Card>
        <div className="flex flex-col items-center gap-0">
          {FLOW_NODES.map((node, i) => (
            <div key={node.key} className="flex flex-col items-center w-full">
              <div className={`border ${node.color} rounded-sm px-5 py-3 w-full max-w-lg`}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{node.label}</p>
                <p className="text-sm text-gray-800 leading-snug">
                  {(t as Record<string, string>)[node.key] || <span className="text-gray-400 italic">Not specified</span>}
                </p>
              </div>
              {i < FLOW_NODES.length - 1 && (
                <div className="flex flex-col items-center my-1">
                  <div className="w-px h-5 bg-gray-300" />
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-blue-100 bg-blue-50">
        <p className="text-sm text-blue-900 leading-relaxed">
          DDAT audits not only the score itself, but the social path produced by the score. A score
          becomes dangerous when it reorganizes access, opportunity, responsibility, and future
          possibility without sufficient explanation, appeal, or re-entry.
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Subject</p>
          <p className="text-sm font-medium">{t.evaluatedSubject || "—"}</p>
          <p className="text-xs text-gray-500 mt-1">Evaluator: {t.evaluator || "—"}</p>
        </Card>
        <Card>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Affected Groups</p>
          <p className="text-sm text-gray-700">{t.affectedGroups || "—"}</p>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => dispatch({ type: "SET_SECTION", payload: "input" })}>← Back</Button>
        <Button onClick={() => dispatch({ type: "SET_SECTION", payload: "rates" })}>Continue to Generative Rates →</Button>
      </div>
    </div>
  )
}
