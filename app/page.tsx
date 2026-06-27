"use client"

import { useStore } from "@/lib/store"
import { Sidebar } from "@/components/Sidebar"
import { HomeSection } from "@/components/HomeSection"
import { AuditForm } from "@/components/AuditForm"
import { SystemMap } from "@/components/SystemMap"
import { GenerativeRateSliders } from "@/components/GenerativeRateSliders"
import { RiskFlagChecklist } from "@/components/RiskFlagChecklist"
import { SimulationPanel } from "@/components/SimulationPanel"
import { AuditReport } from "@/components/AuditReport"
import { DCRMiniCard } from "@/components/DCRMiniCard"
import { EthicalNotice } from "@/components/ui"

function SectionContent() {
  const { state } = useStore()
  switch (state.activeSection) {
    case "home":       return <HomeSection />
    case "input":      return <AuditForm />
    case "mapping":    return <SystemMap />
    case "rates":      return <GenerativeRateSliders />
    case "risks":      return <RiskFlagChecklist />
    case "simulation": return <SimulationPanel />
    case "report":     return <AuditReport />
    default:           return <HomeSection />
  }
}

function LiveScoreBar() {
  const { state } = useStore()
  if (state.activeSection === "home") return null
  return (
    <div className="border-b border-gray-200 bg-white px-6 py-2 flex items-center gap-6">
      <div className="flex-1">
        <EthicalNotice />
      </div>
      <DCRMiniCard
        rates={state.rates}
        flags={state.flags}
        domain={state.target.domain}
      />
    </div>
  )
}

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <LiveScoreBar />
        <main className="flex-1 overflow-y-auto">
          <SectionContent />
        </main>
      </div>
    </div>
  )
}
