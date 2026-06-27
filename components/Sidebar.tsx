"use client"

import { useStore } from "@/lib/store"

const SECTIONS = [
  { id: "home",       label: "Introduction" },
  { id: "input",      label: "Audit Target" },
  { id: "mapping",    label: "System Mapping" },
  { id: "rates",      label: "Nine Generative Rates" },
  { id: "risks",      label: "Risk Flags" },
  { id: "simulation", label: "Simulation" },
  { id: "report",     label: "Audit Report" },
] as const

export function Sidebar() {
  const { state, dispatch } = useStore()

  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white min-h-screen flex flex-col">
      <div className="px-5 py-6 border-b border-gray-200">
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-0.5">DDAT Studio</p>
        <p className="text-[11px] text-gray-400 leading-tight">Dialectical Direction Audit Theory</p>
      </div>
      <nav className="flex-1 py-4">
        {SECTIONS.map((s, i) => {
          const active = state.activeSection === s.id
          return (
            <button
              key={s.id}
              onClick={() => dispatch({ type: "SET_SECTION", payload: s.id })}
              className={`w-full text-left px-5 py-2.5 text-sm transition-colors flex items-center gap-3 ${
                active
                  ? "bg-blue-50 text-blue-700 font-medium border-r-2 border-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="text-[11px] font-mono text-gray-400 w-4">{i + 1}</span>
              {s.label}
            </button>
          )
        })}
      </nav>
      <div className="px-5 py-4 border-t border-gray-200">
        <p className="text-[11px] text-gray-400 leading-tight">
          This tool audits systems,<br />not persons.
        </p>
      </div>
    </aside>
  )
}
