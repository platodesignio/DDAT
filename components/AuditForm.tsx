"use client"

import { useStore } from "@/lib/store"
import { Button, Card, Field, Input, Textarea, Select } from "./ui"
import type { AuditDomain } from "@/types"

const DOMAINS: { value: AuditDomain; label: string }[] = [
  { value: "education",  label: "Education" },
  { value: "labor",      label: "Labor" },
  { value: "welfare",    label: "Welfare" },
  { value: "healthcare", label: "Healthcare" },
  { value: "research",   label: "Research" },
  { value: "finance",    label: "Finance" },
  { value: "governance", label: "Governance" },
  { value: "platform",   label: "Platform" },
  { value: "other",      label: "Other" },
]

export function AuditForm() {
  const { state, dispatch } = useStore()
  const t = state.target

  const set = (key: keyof typeof t) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    dispatch({ type: "SET_TARGET", payload: { [key]: e.target.value } })

  return (
    <div className="max-w-3xl mx-auto py-12 px-8 space-y-8">
      <div>
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-1">Step 2</p>
        <h2 className="text-2xl font-bold text-gray-900">Audit Target Input</h2>
        <p className="text-sm text-gray-500 mt-1">Define the system being audited. This tool does not evaluate persons.</p>
      </div>

      <Card className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <Field label="Audit Title">
            <Input value={t.title} onChange={set("title")} placeholder="e.g. AI Hiring Score Audit" />
          </Field>
          <Field label="Domain">
            <Select value={t.domain} onChange={set("domain")}>
              {DOMAINS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </Select>
          </Field>
        </div>

        <Field label="Description of the System">
          <Textarea
            value={t.description}
            onChange={set("description")}
            rows={4}
            placeholder="Describe the system being audited..."
          />
        </Field>
      </Card>

      <Card className="space-y-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Decision Architecture</p>
        <div className="grid grid-cols-2 gap-5">
          <Field label="Evaluator">
            <Input value={t.evaluator} onChange={set("evaluator")} placeholder="Who operates the system?" />
          </Field>
          <Field label="Evaluated Subject">
            <Input value={t.evaluatedSubject} onChange={set("evaluatedSubject")} placeholder="Who is evaluated?" />
          </Field>
        </div>
        <Field label="Data Inputs">
          <Textarea value={t.dataInputs} onChange={set("dataInputs")} placeholder="What data is used?" />
        </Field>
        <Field label="Scoring or Classification Method">
          <Textarea value={t.scoringMethod} onChange={set("scoringMethod")} placeholder="How are scores produced?" />
        </Field>
        <Field label="Decision Outputs">
          <Input value={t.decisionOutputs} onChange={set("decisionOutputs")} placeholder="e.g. Advance, Reject, Hold" />
        </Field>
      </Card>

      <Card className="space-y-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Accountability Mechanisms</p>
        <div className="grid grid-cols-3 gap-5">
          <Field label="Explanation Mechanism">
            <Textarea value={t.explanationMechanism} onChange={set("explanationMechanism")} rows={2} placeholder="How are decisions explained?" />
          </Field>
          <Field label="Appeal Mechanism">
            <Textarea value={t.appealMechanism} onChange={set("appealMechanism")} rows={2} placeholder="Can decisions be contested?" />
          </Field>
          <Field label="Re-entry Mechanism">
            <Textarea value={t.reentryMechanism} onChange={set("reentryMechanism")} rows={2} placeholder="Can subjects return after failure?" />
          </Field>
        </div>
      </Card>

      <Card className="space-y-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Social Context</p>
        <Field label="Known Affected Groups">
          <Textarea value={t.affectedGroups} onChange={set("affectedGroups")} placeholder="Who is systematically affected?" />
        </Field>
        <div className="grid grid-cols-2 gap-5">
          <Field label="Intended Benefit">
            <Textarea value={t.intendedBenefit} onChange={set("intendedBenefit")} placeholder="What benefit is claimed?" />
          </Field>
          <Field label="Possible Harm">
            <Textarea value={t.possibleHarm} onChange={set("possibleHarm")} placeholder="What harms are possible?" />
          </Field>
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => dispatch({ type: "SET_SECTION", payload: "home" })}>← Back</Button>
        <Button onClick={() => dispatch({ type: "SET_SECTION", payload: "mapping" })}>Continue to System Mapping →</Button>
      </div>
    </div>
  )
}
