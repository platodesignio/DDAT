"use client"

import { type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react"

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`max-w-4xl mx-auto px-6 py-10 ${className}`}>
      {children}
    </section>
  )
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`border border-gray-200 bg-white p-6 ${className}`}>
      {children}
    </div>
  )
}

export function GrayCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`border border-gray-200 bg-gray-50 p-5 ${className}`}>
      {children}
    </div>
  )
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-white">{children}</div>
}

export function StepLabel({ n, label }: { n: number; label: string }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-[10px] tracking-[0.25em] text-blue-600 uppercase mb-2">
        Step {n} / 6
      </p>
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{label}</h2>
    </div>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase mb-4">
      {children}
    </p>
  )
}

export function Field({ label, sub, children }: { label: string; sub?: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block font-mono text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]">
        {label}
      </label>
      {sub && <p className="text-[11px] text-gray-500">{sub}</p>}
      {children}
    </div>
  )
}

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-500 transition-colors ${className}`}
      {...props}
    />
  )
}

export function Textarea({ className = "", rows = 3, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      className={`w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-500 transition-colors resize-none ${className}`}
      {...props}
    />
  )
}

export function Select({ children, className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      className={`w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-colors ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger"
type ButtonSize = "sm" | "md" | "lg"

const BTN_BASE = "inline-flex items-center justify-center font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed tracking-wide"

const BTN_VARIANT: Record<ButtonVariant, string> = {
  primary:   "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  ghost:     "border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700",
  danger:    "bg-red-600 text-white hover:bg-red-700",
}

const BTN_SIZE: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-sm gap-2",
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}) {
  return (
    <button
      className={`${BTN_BASE} ${BTN_VARIANT[variant]} ${BTN_SIZE[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function PhilosophyBar() {
  return (
    <div className="border-l-2 border-blue-300 pl-4 py-1">
      <p className="text-xs text-gray-500 italic">
        Measurement is not ontology. A score is not a person. An audit is not a verdict.
      </p>
    </div>
  )
}

export function SystemNotice() {
  return (
    <div className="border border-gray-200 bg-gray-50 px-4 py-3">
      <p className="font-mono text-[10px] text-gray-400 mb-0.5 uppercase tracking-wide">Notice</p>
      <p className="text-xs text-gray-500">
        DDAT scores are not judgments of persons. They audit the generative direction of systems, institutions, and decision architectures.
      </p>
    </div>
  )
}

export function SimulationNotice() {
  return (
    <div className="border border-gray-200 px-4 py-3">
      <p className="text-xs text-gray-500 leading-relaxed">
        Simulation results are structured audit hypotheses — not predictions. Results depend on entered assumptions and DDAT criteria.
      </p>
    </div>
  )
}

const LEVEL_STYLES: Record<string, { color: string; border: string }> = {
  "Freedom-generative":       { color: "#16a34a", border: "#86efac" },
  "Conditionally generative": { color: "#2563eb", border: "#93c5fd" },
  "Ambivalent / unstable":    { color: "#d97706", border: "#fcd34d" },
  "Freedom-closing":          { color: "#ea580c", border: "#fdba74" },
  "Severe closure":           { color: "#dc2626", border: "#fca5a5" },
}

export function getLevelStyle(level: string) {
  return LEVEL_STYLES[level] ?? { color: "#6b7280", border: "#e5e7eb" }
}

export function LevelBadge({ level }: { level: string }) {
  const s = getLevelStyle(level)
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] border"
      style={{ color: s.color, borderColor: s.border }}
    >
      {level}
    </span>
  )
}
