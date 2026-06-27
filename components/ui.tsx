"use client"

import { type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react"

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`border border-gray-200 bg-white rounded-sm p-6 ${className}`}>
      {children}
    </div>
  )
}

export function SectionCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`border border-gray-200 bg-gray-50 rounded-sm p-5 ${className}`}>
      {children}
    </div>
  )
}

export function Badge({ children, variant = "default" }: { children: ReactNode; variant?: "default" | "blue" | "red" | "green" | "yellow" | "gray" }) {
  const styles: Record<string, string> = {
    default: "bg-gray-100 text-gray-700",
    blue:    "bg-blue-100 text-blue-800",
    red:     "bg-red-100 text-red-800",
    green:   "bg-green-100 text-green-800",
    yellow:  "bg-yellow-100 text-yellow-800",
    gray:    "bg-gray-100 text-gray-500",
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-sm ${styles[variant]}`}>
      {children}
    </span>
  )
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
}) {
  const base = "inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" }
  const variants: Record<string, string> = {
    primary:   "bg-blue-700 text-white hover:bg-blue-800",
    secondary: "bg-gray-900 text-white hover:bg-gray-700",
    outline:   "border border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost:     "text-gray-600 hover:bg-gray-100",
    danger:    "bg-red-600 text-white hover:bg-red-700",
  }
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full border border-gray-200 rounded-sm px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 ${className}`}
      {...props}
    />
  )
}

export function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full border border-gray-200 rounded-sm px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 resize-none ${className}`}
      rows={3}
      {...props}
    />
  )
}

export function Select({ children, className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      className={`w-full border border-gray-200 rounded-sm px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <label className={`block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 ${className}`}>{children}</label>
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  )
}

export function Divider() {
  return <hr className="border-gray-200" />
}

export function EthicalNotice() {
  return (
    <div className="border-l-4 border-blue-700 bg-blue-50 px-4 py-3 text-sm text-blue-900">
      <p className="font-semibold">Measurement is not ontology. A score is not a person. An audit is not a verdict.</p>
    </div>
  )
}

export function SystemWarning() {
  return (
    <Card className="border-amber-200 bg-amber-50">
      <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Important</p>
      <p className="text-sm text-amber-900 font-medium">
        DDAT scores are not judgments of persons. They are audit indicators of systems, institutions, and decision architectures.
      </p>
    </Card>
  )
}
