import { motion } from 'motion/react'
import { Pause, Play, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

type Status = 'requested' | 'assigned' | 'delivered'
type Req = { id: number; x: number; y: number; s: Status; age: number }
const COLORS: Record<Status, string> = { requested: '#fbbf24', assigned: '#818cf8', delivered: '#34d399' }
const HUBS = [{ x: 120, y: 90 }, { x: 420, y: 220 }]

let uid = 1
const spawn = (n: number): Req[] =>
  Array.from({ length: n }, () => ({ id: uid++, x: 40 + Math.random() * 520, y: 30 + Math.random() * 260, s: 'requested' as Status, age: 0 }))

// A simulation of the request → assignment → delivery loop the platform coordinated.
export function ReliefMapDemo() {
  const [reqs, setReqs] = useState<Req[]>(() => spawn(10))
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const t = setInterval(() => {
      setReqs((rs) => {
        const next = rs
          .map((r) => {
            const age = r.age + 1
            if (r.s === 'requested' && age > 2 && Math.random() < 0.35) return { ...r, s: 'assigned' as Status, age: 0 }
            if (r.s === 'assigned' && age > 2 && Math.random() < 0.3) return { ...r, s: 'delivered' as Status, age: 0 }
            return { ...r, age }
          })
          .filter((r) => !(r.s === 'delivered' && r.age > 6))
        return next.length < 26 && Math.random() < 0.6 ? [...next, ...spawn(1)] : next
      })
    }, 700)
    return () => clearInterval(t)
  }, [running])

  const count = (s: Status) => reqs.filter((r) => r.s === s).length
  const nearestHub = (r: Req) => HUBS.reduce((a, b) => (Math.hypot(a.x - r.x, a.y - r.y) < Math.hypot(b.x - r.x, b.y - r.y) ? a : b))

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-line bg-[#0c0c10]">
        <svg viewBox="0 0 600 320" className="block w-full" role="img" aria-label="Simulated relief requests moving from requested to assigned to delivered">
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d={`M -20 ${40 + i * 38} C 150 ${10 + i * 40}, 350 ${80 + i * 34}, 620 ${30 + i * 38}`} fill="none" stroke="rgb(255 255 255 / 0.04)" />
          ))}
          {reqs.filter((r) => r.s === 'assigned').map((r) => {
            const h = nearestHub(r)
            return <line key={`l${r.id}`} x1={h.x} y1={h.y} x2={r.x} y2={r.y} stroke="rgb(129 140 248 / 0.4)" strokeDasharray="3 4" />
          })}
          {HUBS.map((h, i) => (
            <g key={i}>
              <rect x={h.x - 8} y={h.y - 8} width="16" height="16" rx="3" fill="#e0e7ff" />
              <text x={h.x} y={h.y + 24} textAnchor="middle" className="fill-white/50 font-mono text-[9px]">AID HUB</text>
            </g>
          ))}
          {reqs.map((r) => (
            <motion.circle key={r.id} cx={r.x} cy={r.y} initial={{ r: 0 }} animate={{ r: 5.5, fill: COLORS[r.s] }} transition={{ duration: 0.4 }} />
          ))}
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        {(Object.keys(COLORS) as Status[]).map((s) => (
          <span key={s} className="flex items-center gap-2 rounded-lg border border-line px-3 py-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: COLORS[s] }} /> {s} <span className="font-mono text-fg tabular-nums">{count(s)}</span>
          </span>
        ))}
        <button onClick={() => setRunning((r) => !r)} className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-muted hover:text-fg">
          {running ? <Pause size={13} /> : <Play size={13} />} {running ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => setReqs((r) => [...r, ...spawn(8)])} className="inline-flex items-center gap-1.5 rounded-lg border border-warn/40 px-3 py-1.5 text-warn hover:bg-warn/10"><Zap size={13} /> Surge</button>
      </div>
      <p className="mt-2 font-mono text-[10px] text-subtle">Simulation of the coordination loop · not real request data</p>
    </div>
  )
}
