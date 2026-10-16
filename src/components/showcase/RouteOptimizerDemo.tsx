import { motion } from 'motion/react'
import { RotateCcw, Shuffle } from 'lucide-react'
import { useMemo, useState, type MouseEvent } from 'react'

type P = { x: number; y: number; id: number }
const W = 600, H = 380
const DEPOT = { x: 300, y: 190, id: 0 }
const dist = (a: P, b: P) => Math.hypot(a.x - b.x, a.y - b.y)
const tourLen = (t: P[]) => t.reduce((s, p, i) => s + dist(p, t[(i + 1) % t.length]), 0)

// Nearest-neighbour seed, then 2-opt until no improving swap remains.
function optimize(stops: P[]): P[] {
  const left = [...stops]
  const tour = [DEPOT]
  while (left.length) {
    const last = tour[tour.length - 1]
    let bi = 0
    left.forEach((p, i) => { if (dist(last, p) < dist(last, left[bi])) bi = i })
    tour.push(left.splice(bi, 1)[0])
  }
  let improved = true
  while (improved) {
    improved = false
    for (let i = 1; i < tour.length - 1; i++) {
      for (let k = i + 1; k < tour.length; k++) {
        const a = tour[i - 1], b = tour[i], c = tour[k], d = tour[(k + 1) % tour.length]
        if (dist(a, c) + dist(b, d) < dist(a, b) + dist(c, d) - 0.01) {
          tour.splice(i, k - i + 1, ...tour.slice(i, k + 1).reverse())
          improved = true
        }
      }
    }
  }
  return tour
}

let nextId = 1
const randomStops = (n: number): P[] =>
  Array.from({ length: n }, () => ({ x: 40 + Math.random() * (W - 80), y: 30 + Math.random() * (H - 60), id: nextId++ }))

const toPath = (t: P[]) => (t.length < 2 ? '' : `M ${t.map((p) => `${p.x} ${p.y}`).join(' L ')} Z`)

export function RouteOptimizerDemo() {
  const [stops, setStops] = useState<P[]>(() => randomStops(9))
  const [showNaive, setShowNaive] = useState(true)
  const naive = useMemo(() => [DEPOT, ...stops], [stops])
  const best = useMemo(() => optimize(stops), [stops])
  const naiveLen = tourLen(naive), bestLen = tourLen(best)
  const saved = stops.length > 2 ? Math.round((1 - bestLen / naiveLen) * 100) : 0
  const km = (v: number) => (v / 18).toFixed(1)

  function add(e: MouseEvent<SVGSVGElement>) {
    if (stops.length >= 24) return
    const svg = e.currentTarget
    const pt = svg.createSVGPoint()
    pt.x = e.clientX; pt.y = e.clientY
    const { x, y } = pt.matrixTransform(svg.getScreenCTM()!.inverse())
    setStops((s) => [...s, { x, y, id: nextId++ }])
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-line bg-[#0c0c10]">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full cursor-crosshair touch-manipulation" onClick={add} role="application" aria-label="Route optimization playground. Click to add a delivery stop.">
          <defs>
            <pattern id="streets" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(255 255 255 / 0.05)" strokeWidth="1" />
            </pattern>
            <linearGradient id="route" x1="0" x2="1"><stop offset="0" stopColor="#818cf8" /><stop offset="1" stopColor="#22d3ee" /></linearGradient>
          </defs>
          <rect width={W} height={H} fill="url(#streets)" />
          <path d="M -10 260 C 120 230, 180 300, 300 270 S 480 220, 620 250" fill="none" stroke="rgb(34 211 238 / 0.08)" strokeWidth="26" />
          {showNaive && <path d={toPath(naive)} fill="none" stroke="rgb(248 113 113 / 0.45)" strokeWidth="1.5" strokeDasharray="5 6" />}
          <motion.path key={best.map((p) => p.id).join('-')} d={toPath(best)} fill="none" stroke="url(#route)" strokeWidth="3" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: 'easeInOut' }} />
          {stops.map((p) => (
            <g key={p.id} onClick={(e) => { e.stopPropagation(); setStops((s) => s.filter((q) => q.id !== p.id)) }} className="cursor-pointer">
              <circle cx={p.x} cy={p.y} r="14" fill="transparent" />
              <motion.circle cx={p.x} cy={p.y} r="6" fill="#0c0c10" stroke="#e0e7ff" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} />
            </g>
          ))}
          <rect x={DEPOT.x - 9} y={DEPOT.y - 9} width="18" height="18" rx="4" fill="#22d3ee" />
          <text x={DEPOT.x} y={DEPOT.y + 26} textAnchor="middle" className="fill-white/60 font-mono text-[10px]">DEPOT</text>
        </svg>
        <div className="pointer-events-none absolute top-2 left-2 rounded-lg border border-line bg-black/60 px-2 py-1.5 font-mono text-[9px] backdrop-blur sm:top-3 sm:left-3 sm:px-3 sm:py-2 sm:text-[11px]">
          <p className="text-subtle">{stops.length} stops</p>
          {showNaive && <p className="text-red-300/80">as-entered: {km(naiveLen)} km</p>}
          <p className="text-accent-2">optimized: {km(bestLen)} km</p>
          <p className="mt-1 text-fg">saved {saved}%</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <button onClick={() => setStops(randomStops(9 + Math.floor(Math.random() * 6)))} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-muted hover:text-fg"><Shuffle size={13} /> New day</button>
        <button onClick={() => setStops([])} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-muted hover:text-fg"><RotateCcw size={13} /> Clear</button>
        <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-muted">
          <input type="checkbox" checked={showNaive} onChange={(e) => setShowNaive(e.target.checked)} className="accent-indigo-400" /> show unoptimized
        </label>
      </div>
      <p className="mt-2 font-mono text-[10px] text-subtle">Click the map to add stops · click a stop to remove it · runs entirely in your browser</p>
    </div>
  )
}
