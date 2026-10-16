import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

// Stylized, not geographic: a schematic of Istanbul's two shores and the main transit modes.
const lines = [
  { id: 'metro', name: 'Metro', color: '#ef4444', d: 'M 40 120 C 110 110, 160 150, 230 150 S 300 130, 330 120' },
  { id: 'metrobus', name: 'Metrobus', color: '#a78bfa', d: 'M 60 250 C 140 230, 200 200, 280 180 S 420 150, 520 120' },
  { id: 'marmaray', name: 'Marmaray', color: '#22d3ee', d: 'M 30 300 C 150 290, 260 270, 330 255 S 470 245, 580 250' },
  { id: 'ferry', name: 'Ferry', color: '#fbbf24', d: 'M 300 90 C 330 130, 360 170, 400 200' },
  { id: 'tram', name: 'Tram', color: '#34d399', d: 'M 90 190 C 150 200, 220 215, 300 205' },
]

export function TransitMapDemo() {
  const reduce = useReducedMotion()
  const [on, setOn] = useState<Record<string, boolean>>(Object.fromEntries(lines.map((l) => [l.id, true])))
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-line bg-[#0c0c10]">
        <svg viewBox="0 0 600 340" className="block w-full" role="img" aria-label="Schematic Istanbul transit map">
          <path d="M 330 0 C 300 80, 380 140, 360 200 S 330 280, 380 340 L 420 340 C 380 280, 410 230, 400 190 S 350 80, 370 0 Z" fill="rgb(34 211 238 / 0.10)" />
          <text x="150" y="40" className="fill-white/30 font-mono text-[11px]">EUROPE</text>
          <text x="470" y="40" className="fill-white/30 font-mono text-[11px]">ASIA</text>
          <text x="352" y="330" className="fill-cyan-300/40 font-mono text-[9px]">BOSPHORUS</text>
          {lines.map((l, i) =>
            on[l.id] ? (
              <g key={l.id}>
                <motion.path id={`ln-${l.id}`} d={l.d} fill="none" stroke={l.color} strokeWidth="4" strokeLinecap="round" strokeDasharray={l.id === 'ferry' ? '2 8' : undefined} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: i * 0.1 }} />
                {!reduce && (
                  <circle r="5" fill="#fff" stroke={l.color} strokeWidth="2">
                    <animateMotion dur={`${5 + i}s`} repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear"><mpath href={`#ln-${l.id}`} /></animateMotion>
                  </circle>
                )}
              </g>
            ) : null,
          )}
        </svg>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
        <p className="eyebrow mb-3">Toggle modes</p>
        <div className="flex flex-wrap gap-2">
          {lines.map((l) => (
            <button key={l.id} aria-pressed={on[l.id]} onClick={() => setOn((o) => ({ ...o, [l.id]: !o[l.id] }))} className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition ${on[l.id] ? 'border-line-strong text-fg' : 'border-line text-subtle line-through'}`}>
              <span className="h-2 w-4 rounded-full" style={{ background: l.color }} /> {l.name}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">Publishing schedules as GTFS — a city-wide first — let any journey planner route Istanbul’s transit.</p>
        </div>
        <pre className="overflow-x-auto rounded-xl border border-line bg-black/40 p-4 font-mono text-[11px] leading-relaxed text-muted">
{`# stops.txt  (GTFS)
stop_id,stop_name,stop_lat,stop_lon
...

# routes.txt
route_id,route_short_name,route_type
...`}
        </pre>
      </div>
      <p className="font-mono text-[10px] text-subtle">Schematic illustration · not to scale</p>
    </div>
  )
}
