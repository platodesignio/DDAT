"use client"

import React, { createContext, useContext, useReducer, type ReactNode } from "react"
import type { AuditTarget, GenerativeRates, RiskFlags, Scenario } from "@/types"
import { DEFAULT_TARGET, DEFAULT_RATES, DEFAULT_FLAGS } from "./defaultAudit"

type ActiveSection =
  | "home"
  | "input"
  | "mapping"
  | "rates"
  | "risks"
  | "simulation"
  | "report"

type State = {
  activeSection: ActiveSection
  target: AuditTarget
  rates: GenerativeRates
  flags: RiskFlags
  scenarios: Scenario[]
  activeScenarioId: string | null
}

type Action =
  | { type: "SET_SECTION"; payload: ActiveSection }
  | { type: "SET_TARGET"; payload: Partial<AuditTarget> }
  | { type: "SET_RATE"; payload: { key: keyof GenerativeRates; value: number } }
  | { type: "SET_FLAG"; payload: { key: keyof RiskFlags; value: boolean } }
  | { type: "ADD_SCENARIO"; payload: Scenario }
  | { type: "REMOVE_SCENARIO"; payload: string }
  | { type: "SET_ACTIVE_SCENARIO"; payload: string | null }
  | { type: "RESET" }

const initialState: State = {
  activeSection: "home",
  target: DEFAULT_TARGET,
  rates: DEFAULT_RATES,
  flags: DEFAULT_FLAGS,
  scenarios: [],
  activeScenarioId: null,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SECTION":
      return { ...state, activeSection: action.payload }
    case "SET_TARGET":
      return { ...state, target: { ...state.target, ...action.payload } }
    case "SET_RATE":
      return { ...state, rates: { ...state.rates, [action.payload.key]: action.payload.value } }
    case "SET_FLAG":
      return { ...state, flags: { ...state.flags, [action.payload.key]: action.payload.value } }
    case "ADD_SCENARIO":
      return { ...state, scenarios: [...state.scenarios, action.payload] }
    case "REMOVE_SCENARIO":
      return {
        ...state,
        scenarios: state.scenarios.filter((s) => s.id !== action.payload),
        activeScenarioId: state.activeScenarioId === action.payload ? null : state.activeScenarioId,
      }
    case "SET_ACTIVE_SCENARIO":
      return { ...state, activeScenarioId: action.payload }
    case "RESET":
      return initialState
    default:
      return state
  }
}

const StoreContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
} | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
