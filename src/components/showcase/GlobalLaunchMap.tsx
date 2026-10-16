import { useState } from 'react'
import map from '../../data/worldmap.json'
import { MapDots } from '../WorldMap'

const regions = [
  { id: 'apac', name: 'APAC', color: '#22d3ee', text: 'Asia-Pacific markets — the largest share of the footprint.' },
  { id: 'mena', name: 'MENA', color: '#fbbf24', text: 'Middle East & North Africa — one of the two regions for the new-country launches.' },
  { id: 'eu', name: 'EU', color: '#818cf8', text: 'European markets, close to the Berlin headquarters.' },
  { id: 'latam', name: 'LATAM', color: '#34d399', text: 'Latin America — the product reached all four of Delivery Hero’s regions.' },
] as const
type R = (typeof regions)[number]['id']

export function GlobalLaunchMap() {
  const [active, setActive] = useState<R | null>(null)
  const colors = Object.fromEntries(regions.map((r) => [r.id, r.color]))
  const current = regions.find((r) => r.id === active)
  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-line bg-[#0c0c10] p-3">
        <svg viewBox={`0 0 ${map.width} ${map.height}`} className="block w-full" role="img" aria-label="World map coloured by Delivery Hero region">
          <MapDots highlight={active} colors={colors} />
          <circle cx={map.pins.berlin.x} cy={map.pins.berlin.y} r="1" fill="#fff" />
        </svg>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {regions.map((r) => (
          <button
            key={r.id}
            onMouseEnter={() => setActive(r.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(r.id)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(active === r.id ? null : r.id)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${active === r.id ? 'border-line-strong bg-white/[0.06]' : 'border-line'}`}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} /> {r.name}
          </button>
        ))}
      </div>
      <p className="mt-3 min-h-[2.5em] text-sm text-muted">{current ? current.text : '24 countries across 4 regions. Hover a region.'}</p>
      <p className="font-mono text-[10px] text-subtle">Region colouring is approximate and shows coverage areas, not the exact country list.</p>
    </div>
  )
}
