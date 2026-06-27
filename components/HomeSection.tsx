"use client"

import { useStore } from "@/lib/store"
import { Button, Card, EthicalNotice } from "./ui"

export function HomeSection() {
  const { dispatch } = useStore()

  return (
    <div className="max-w-2xl mx-auto py-16 px-8 space-y-10">
      <div className="space-y-3">
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest">DDAT Studio</p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Simulate whether a system expands freedom or closes the future.
        </h1>
      </div>

      <p className="text-base text-gray-600 leading-relaxed">
        DDAT Studio is a dialectical audit simulator for AI scoring systems, institutions, evaluation
        structures, and social decision architectures. It examines whether a system increases
        freedom-generating conditions, re-entry possibilities, responsibility distribution, and
        historical openness — or whether it produces closure, fixation, exclusion, and personhood
        substitution.
      </p>

      <EthicalNotice />

      <Card className="border-gray-200">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Warning</p>
        <p className="text-sm text-gray-700 leading-relaxed">
          DDAT scores must never be used as personality judgments, moral rankings, or individual
          ability scores. They are indicators for auditing institutional direction, social
          consequences, and decision architecture.
        </p>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "9 Generative Rates", desc: "Multi-dimensional audit vector" },
          { label: "20 Risk Flags", desc: "Structural closure indicators" },
          { label: "DCR Score", desc: "Direction Capability Rating" },
        ].map((item) => (
          <div key={item.label} className="border border-gray-200 p-4 rounded-sm">
            <p className="text-sm font-semibold text-gray-900 mb-1">{item.label}</p>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <Button
          size="lg"
          onClick={() => dispatch({ type: "SET_SECTION", payload: "input" })}
        >
          Start Audit →
        </Button>
      </div>
    </div>
  )
}
