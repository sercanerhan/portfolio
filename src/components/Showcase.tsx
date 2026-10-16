import { AnimatePresence, motion } from 'motion/react'
import { ImageIcon } from 'lucide-react'
import { lazy, Suspense, useEffect, useState, type ComponentType } from 'react'
import { showcase } from '../data/profile'
import { asset } from '../lib/asset'
import { Reveal, SectionHeader } from './Reveal'

// Each demo is its own chunk, so the first paint doesn't pay for all seven.
const demos: Record<string, ComponentType> = {
  route: lazy(() => import('./showcase/RouteOptimizerDemo').then((m) => ({ default: m.RouteOptimizerDemo }))),
  laas: lazy(() => import('./showcase/GlobalLaunchMap').then((m) => ({ default: m.GlobalLaunchMap }))),
  grocery: lazy(() => import('./showcase/GroceryAppDemo').then((m) => ({ default: m.GroceryAppDemo }))),
  health: lazy(() => import('./showcase/HealthDemo').then((m) => ({ default: m.HealthDemo }))),
  transit: lazy(() => import('./showcase/TransitMapDemo').then((m) => ({ default: m.TransitMapDemo }))),
  relief: lazy(() => import('./showcase/ReliefMapDemo').then((m) => ({ default: m.ReliefMapDemo }))),
  agents: lazy(() => import('./showcase/AgentConsoleDemo').then((m) => ({ default: m.AgentConsoleDemo }))),
}

// If a real screenshot is dropped into public/images/real/<id>.webp, offer it next to the recreation.
function RealShot({ id }: { id: string }) {
  const [ok, setOk] = useState(false)
  const [open, setOpen] = useState(false)
  const src = asset(`images/real/${id}.webp`)
  useEffect(() => {
    const img = new Image()
    img.onload = () => setOk(true)
    img.src = src
  }, [src])
  if (!ok) return null
  return (
    <>
      <button onClick={() => setOpen(true)} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-xs text-muted hover:text-fg"><ImageIcon size={13} /> View real screenshot</button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-6" onClick={() => setOpen(false)}>
          <img src={src} alt="Product screenshot" className="max-h-full max-w-full rounded-xl border border-line" />
        </div>
      )}
    </>
  )
}

export function Showcase({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  const item = showcase.find((s) => s.id === active) ?? showcase[0]
  const Demo = demos[item.id]
  return (
    <section id="showcase" className="relative py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader eyebrow="Things I’ve shipped — playable" title={<>Don’t read about it. <span className="text-gradient">Try it.</span></>} intro="Seven products from my career, each rebuilt as a small interactive demo of its core idea. Recreations, not production code — but the problems are real." />
        <Reveal>
          <div role="tablist" aria-label="Products" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {showcase.map((s) => (
              <button key={s.id} role="tab" aria-selected={s.id === item.id} aria-controls="showcase-panel" onClick={() => setActive(s.id)} className="relative shrink-0 rounded-xl px-4 py-2 text-sm whitespace-nowrap transition">
                {s.id === item.id && <motion.span layoutId="showcase-tab" className="absolute inset-0 rounded-xl border border-line-strong bg-white/[0.06]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className={`relative ${s.id === item.id ? 'text-fg' : 'text-muted hover:text-fg'}`}>{s.label}</span>
              </button>
            ))}
          </div>
        </Reveal>
        <div id="showcase-panel" role="tabpanel" className="card mt-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[300px_1fr] lg:gap-10">
              <div>
                <p className="eyebrow">{item.company} · {item.years}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{item.title}</h3>
                <p className="mt-3 text-pretty text-muted">{item.blurb}</p>
                <ul className="mt-6 space-y-2">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm"><span className="h-1 w-3 rounded bg-gradient-to-r from-accent to-accent-2" />{p}</li>
                  ))}
                </ul>
                <RealShot id={item.id} />
              </div>
              <div className="min-w-0"><Suspense fallback={<div className="h-[380px] animate-pulse rounded-xl border border-line bg-white/[0.02]" />}><Demo /></Suspense></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
