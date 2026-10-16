import { motion, useReducedMotion } from 'motion/react'
import { memo } from 'react'
import map from '../data/worldmap.json'

type Pin = keyof typeof map.pins
type Region = 'eu' | 'mena' | 'apac' | 'latam' | 'na' | 'other'

const arcPath = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2 - Math.max(4, Math.hypot(b.x - a.x, b.y - a.y) * 0.32)
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`
}

export const MapDots = memo(function MapDots({ highlight, colors }: { highlight?: Region | null; colors?: Partial<Record<Region, string>> }) {
  return (
    <g>
      {(map.points as [number, number, Region][]).map(([x, y, r], i) => {
        const c = colors?.[r]
        const dim = highlight && r !== highlight
        return <circle key={i} cx={x} cy={y} r={0.26} fill={c && !dim ? c : 'rgb(255 255 255 / 0.16)'} style={{ transition: 'fill .35s' }} />
      })}
    </g>
  )
})

export function WorldRoutes({ from = 'istanbul', to, className }: { from?: Pin; to: Pin[]; className?: string }) {
  const reduce = useReducedMotion()
  const origin = map.pins[from]
  return (
    <svg viewBox={`0 0 ${map.width} ${map.height}`} className={className} role="img" aria-label="World map with routes from Istanbul to places Sercan has built products for">
      <defs>
        <linearGradient id="arc" x1="0" x2="1">
          <stop offset="0" stopColor="#818cf8" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="0.9" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
      </defs>
      <MapDots />
      {to.map((name, i) => {
        const d = arcPath(origin, map.pins[name])
        const p = map.pins[name]
        return (
          <g key={name}>
            <motion.path
              d={d}
              fill="none"
              stroke="url(#arc)"
              strokeWidth={0.28}
              strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 1.6, delay: 0.8 + i * 0.18, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.circle cx={p.x} cy={p.y} r={0.6} fill="#22d3ee" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2 + i * 0.18 }} />
            {!reduce && (
              <circle r={0.45} fill="#e0f2fe">
                <animateMotion dur={`${3 + (i % 3)}s`} begin={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        )
      })}
      <circle cx={origin.x} cy={origin.y} r={3.2} fill="url(#glow)" />
      <circle cx={origin.x} cy={origin.y} r={0.9} fill="#fff" />
    </svg>
  )
}
