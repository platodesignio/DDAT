"use client"

import { useStore } from "@/lib/store"

function OrbitSVG() {
  const W = 480
  const H = 480
  const cx = W / 2
  const cy = H / 2

  const rings = [55, 90, 130, 168]

  const curAngle = (210 * Math.PI) / 180
  const curR = rings[2]
  const curX = cx + curR * Math.cos(curAngle)
  const curY = cy + curR * Math.sin(curAngle)

  const simAngle = (340 * Math.PI) / 180
  const simR = rings[2]
  const simX = cx + simR * Math.cos(simAngle)
  const simY = cy + simR * Math.sin(simAngle)

  const ticks = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2
    const r0 = rings[3] + 4
    const r1 = rings[3] + (i % 9 === 0 ? 14 : i % 3 === 0 ? 9 : 5)
    return {
      x1: cx + r0 * Math.cos(a), y1: cy + r0 * Math.sin(a),
      x2: cx + r1 * Math.cos(a), y2: cy + r1 * Math.sin(a),
      major: i % 9 === 0,
    }
  })

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: W, aspectRatio: "1/1" }}>
      <defs>
        <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-center" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient center glow */}
      <circle cx={cx} cy={cy} r={200} fill="url(#centerGlow)" />

      {/* Half-tints */}
      <path d={`M ${cx} ${cy - rings[2]} A ${rings[2]} ${rings[2]} 0 0 0 ${cx} ${cy + rings[2]}`} fill="#ef4444" fillOpacity="0.04" />
      <path d={`M ${cx} ${cy - rings[2]} A ${rings[2]} ${rings[2]} 0 0 1 ${cx} ${cy + rings[2]}`} fill="#3b82f6" fillOpacity="0.04" />

      {/* Concentric rings */}
      {rings.map((r, i) => (
        <circle
          key={r} cx={cx} cy={cy} r={r} fill="none"
          stroke={i === rings.length - 1 ? "#d1d5db" : "#e5e7eb"}
          strokeWidth={i === rings.length - 1 ? 1 : 0.5}
          opacity={i === rings.length - 1 ? 1 : 0.8}
        />
      ))}

      {/* Tick marks */}
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={t.major ? "#9ca3af" : "#d1d5db"}
          strokeWidth={t.major ? 1.5 : 0.8}
        />
      ))}

      {/* Cross-hairs */}
      <line x1={cx - rings[3] - 20} y1={cy} x2={cx + rings[3] + 20} y2={cy} stroke="#e5e7eb" strokeWidth="0.5" />
      <line x1={cx} y1={cy - rings[3] - 20} x2={cx} y2={cy + rings[3] + 20} stroke="#e5e7eb" strokeWidth="0.5" />

      {/* Diagonal axis */}
      <line
        x1={cx - rings[3] * 0.707} y1={cy - rings[3] * 0.707}
        x2={cx + rings[3] * 0.707} y2={cy + rings[3] * 0.707}
        stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="3,5"
      />

      {/* Labels */}
      <text x={cx - rings[3] - 8} y={cy - rings[3] - 10} fontSize="7" fill="#ef4444" fillOpacity="0.7"
        textAnchor="end" fontFamily="monospace" letterSpacing="0.1em">CLOSED SCORE ORBIT</text>
      <text x={cx + rings[3] + 8} y={cy - rings[3] - 10} fontSize="7" fill="#3b82f6" fillOpacity="0.7"
        textAnchor="start" fontFamily="monospace" letterSpacing="0.1em">FREEDOM-EVOLUTION ORBIT</text>

      {/* Trajectory arc */}
      <path d={`M ${curX} ${curY} A ${rings[2]} ${rings[2]} 0 1 1 ${simX} ${simY}`}
        fill="none" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="3,4" opacity="0.35" />

      {/* Center node */}
      <circle cx={cx} cy={cy} r={18} fill="none" stroke="#2563eb" strokeWidth="0.5" opacity="0.35" filter="url(#glow-center)" />
      <circle cx={cx} cy={cy} r={5} fill="#2563eb" filter="url(#glow-center)" opacity="0.85" />

      {/* Current position (red) */}
      <circle cx={curX} cy={curY} r={16} fill="none" stroke="#ef4444" strokeWidth="0.8" opacity="0.2" />
      <circle cx={curX} cy={curY} r={8} fill="#ef4444" opacity="0.85" filter="url(#glow-red)" />
      <text x={curX} y={curY - 22} fontSize="8" fill="#ef4444" textAnchor="middle" fontFamily="monospace" fontWeight="600" opacity="0.9">DCR 24</text>
      <text x={curX} y={curY - 13} fontSize="6" fill="#ef4444" textAnchor="middle" fontFamily="monospace" opacity="0.6">CURRENT</text>

      {/* Sim position (blue) */}
      <circle cx={simX} cy={simY} r={16} fill="none" stroke="#3b82f6" strokeWidth="0.8" opacity="0.2" />
      <circle cx={simX} cy={simY} r={6} fill="none" stroke="#3b82f6" strokeWidth="1.5" filter="url(#glow-blue)" opacity="0.9" />
      <circle cx={simX} cy={simY} r={2} fill="#3b82f6" opacity="0.7" />
      <text x={simX} y={simY + 26} fontSize="8" fill="#3b82f6" textAnchor="middle" fontFamily="monospace" fontWeight="600" opacity="0.9">SIM 58</text>
      <text x={simX} y={simY + 35} fontSize="6" fill="#3b82f6" textAnchor="middle" fontFamily="monospace" opacity="0.6">POST-INTERVENTION</text>

      {/* Scale markings */}
      {[0, 20, 40, 60, 80, 100].map((v) => {
        const a = ((v / 100) * 280 - 230) * (Math.PI / 180)
        const rLabel = rings[3] + 22
        return (
          <text key={v} x={cx + rLabel * Math.cos(a)} y={cy + rLabel * Math.sin(a) + 3}
            fontSize="6.5" fill="#9ca3af" textAnchor="middle" fontFamily="monospace">{v}</text>
        )
      })}

      {/* Bottom label */}
      <text x={cx} y={H - 10} fontSize="7" fill="#9ca3af" textAnchor="middle"
        fontFamily="monospace" letterSpacing="0.15em">DDAT ORBITAL POSITION DIAGRAM</text>
    </svg>
  )
}

const RATE_ABBRS = ["IGR", "PDFR", "MGR", "DRGR", "SRGR", "TIGR", "RCR", "FGR", "HGR"]
const RATE_FULL = [
  "Information Generation Rate",
  "Possibility Distribution Formation Rate",
  "Meaning Generation Rate",
  "Deliberation-Reflection Generation Rate",
  "Self-Revision Generation Rate",
  "Temporal Integration Generation Rate",
  "Relational Connection Rate",
  "Freedom Generation Rate",
  "Historicity Generation Rate",
]

const DOMAINS = ["Education", "Labor", "Criminal Justice", "Healthcare", "Finance", "Social Welfare"]

export function HomeSection() {
  const { dispatch } = useStore()

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[1fr_480px] gap-12 items-center" style={{ padding: "64px 48px 48px" }}>

        {/* Left */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-8 bg-blue-600" />
            <span className="font-mono text-[10px] tracking-[0.35em] text-blue-600 uppercase">
              Dialectical Direction Audit Theory
            </span>
          </div>

          <h1 className="text-[clamp(2.8rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-gray-900 mb-6">
            Does this system<br />
            <span style={{
              background: "linear-gradient(90deg, #2563eb, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              generate freedom
            </span><br />
            or close the future?
          </h1>

          <p className="text-gray-500 text-base leading-relaxed max-w-[480px] mb-10">
            A structural audit simulator for AI scoring systems, institutions,
            evaluation architectures, and social decision structures.
            DDAT audits generative direction — not persons.
          </p>

          <div className="flex items-center gap-4 mb-12">
            <button
              onClick={() => dispatch({ type: "SET_STEP", payload: 1 })}
              className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 text-sm tracking-wide transition-all"
            >
              <span>START AUDIT</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <div>
              <p className="text-[11px] text-gray-400">Sample loaded</p>
              <p className="text-[11px] text-gray-500 font-mono">AI Hiring Score · Labor</p>
            </div>
          </div>

          <div className="border-l-2 border-blue-200 pl-4 py-1">
            <p className="text-[12px] text-gray-400 italic">
              "Measurement is not ontology.<br />
              A score is not a person. An audit is not a verdict."
            </p>
          </div>
        </div>

        {/* Right: Orbit */}
        <div className="flex flex-col items-center justify-center">
          <OrbitSVG />
        </div>
      </div>

      {/* ── Stats strip ──────────────────────────────────────────── */}
      <div className="border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-3 divide-x divide-gray-100" style={{ padding: "0 48px" }}>
          {[
            { n: "9", label: "Generative Rates", desc: "Multi-dimensional audit vector  V ∈ ℝ⁹" },
            { n: "20", label: "Risk Flags", desc: "Weighted structural closure penalties" },
            { n: "DCR", label: "Direction Score", desc: "cos(V, F*) × 100 − Σ penalties · λ" },
          ].map((s) => (
            <div key={s.label} className="py-8 px-8 first:pl-0 last:pr-0">
              <p className="font-mono text-4xl font-bold text-gray-900 mb-1">{s.n}</p>
              <p className="text-sm font-semibold text-gray-500 mb-1">{s.label}</p>
              <p className="font-mono text-[11px] text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Rate vector table ─────────────────────────────────────── */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto" style={{ padding: "40px 48px" }}>
          <p className="font-mono text-[10px] tracking-[0.25em] text-gray-400 uppercase mb-6">
            Audit Vector V = [ IGR, PDFR, MGR, DRGR, SRGR, TIGR, RCR, FGR, HGR ]
          </p>
          <div className="grid grid-cols-3 gap-px bg-gray-100">
            {RATE_ABBRS.map((abbr, i) => (
              <div key={abbr} className="bg-white px-4 py-3 flex items-center gap-4">
                <span className="font-mono text-xs font-bold text-blue-600 w-12 flex-shrink-0">{abbr}</span>
                <span className="text-xs text-gray-500">{RATE_FULL[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Two orbits ───────────────────────────────────────────── */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 divide-x divide-gray-100" style={{ padding: "48px" }}>
          <div className="pr-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-red-500 uppercase">Closed Score Orbit</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Systems that substitute measurement for personhood, prevent re-entry and appeal,
              rely on proxy discrimination, displace institutional responsibility,
              and foreclose future development trajectories. DCR → 0.
              The system absorbs possibility without return.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Personhood substitution", "No re-entry", "Proxy discrimination", "Future closure"].map(f => (
                <span key={f} className="font-mono text-[9px] text-red-500 border border-red-200 px-2 py-0.5">
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="pl-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-blue-500 uppercase">Freedom-Evolution Orbit</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Systems that support meaning generation, enable self-revision, maintain appeal mechanisms,
              distribute possibility across stakeholder groups, preserve long-term development
              capacity, and contextualise decisions. DCR → 100.
              The system returns more than it takes.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Appeal mechanism", "Re-entry pathway", "Context recovery", "Periodic re-audit"].map(f => (
                <span key={f} className="font-mono text-[9px] text-blue-500 border border-blue-200 px-2 py-0.5">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Domains ──────────────────────────────────────────────── */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto" style={{ padding: "32px 48px" }}>
          <p className="font-mono text-[10px] tracking-[0.25em] text-gray-400 uppercase mb-5">
            Applicable Domains
          </p>
          <div className="flex flex-wrap gap-2">
            {DOMAINS.map((d) => (
              <div key={d} className="border border-gray-200 px-4 py-2 text-xs text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors cursor-default">
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto flex items-center justify-between" style={{ padding: "64px 48px" }}>
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
            Begin Structural Audit
          </p>
          <p className="text-2xl font-bold text-gray-900">
            7 steps. No account required.
          </p>
        </div>
        <button
          onClick={() => dispatch({ type: "SET_STEP", payload: 1 })}
          className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-mono font-semibold px-8 py-4 text-sm tracking-[0.1em] transition-all"
        >
          AUDIT A SYSTEM →
        </button>
      </div>
      <div className="text-center mt-6 pb-4">
        <a
          href="/agent-council"
          className="text-[11px] text-blue-600 hover:text-blue-800 font-mono transition-colors"
        >
          → Multi-Agent Audit Network (Beta)
        </a>
      </div>
    </div>
  )
}
