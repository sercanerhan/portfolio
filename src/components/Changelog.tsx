import { motion, useScroll, useSpring } from 'motion/react'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { roles } from '../data/profile'
import { Reveal, SectionHeader } from './Reveal'

export function Changelog() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [open, setOpen] = useState<string | null>('v2025')

  return (
    <section id="journey" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeader eyebrow="Career changelog" title="Release notes from 18 years of shipping." intro="From surveying land as a geodesy engineer to steering a portfolio of AI products. Every version built on the last." />
      <ol ref={ref} className="relative ml-2 sm:ml-[148px]">
        <div aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-line" />
        <motion.div aria-hidden className="absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-accent to-accent-2" style={{ scaleY }} />
        {roles.map((r) => {
          const isOpen = open === r.version
          return (
            <li key={r.version} className="relative pb-6 pl-8 sm:pl-10">
              <span className={`absolute top-2 -left-[5px] h-[11px] w-[11px] rounded-full border-2 ${isOpen ? 'border-accent-2 bg-accent-2' : 'border-line-strong bg-bg'}`} />
              <span className="absolute top-1 -left-[148px] hidden w-[124px] text-right font-mono text-xs text-subtle sm:block">{r.period}</span>
              <Reveal y={16}>
                <button onClick={() => setOpen(isOpen ? null : r.version)} aria-expanded={isOpen} className="group w-full text-left">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="rounded-md border border-line bg-white/[0.03] px-1.5 py-0.5 font-mono text-[11px] text-accent">{r.version}</span>
                    <span className="font-mono text-[11px] text-subtle uppercase">{r.era}</span>
                    <span className="font-mono text-[11px] text-subtle sm:hidden">{r.period}</span>
                  </div>
                  <h3 className="mt-2 flex items-start justify-between gap-4 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    <span>{r.title} <span className="text-muted">@ {r.company}</span></span>
                    <ChevronDown size={18} className={`mt-1.5 shrink-0 text-subtle transition ${isOpen ? 'rotate-180' : ''}`} />
                  </h3>
                  {r.note && <p className="mt-1 font-mono text-xs text-accent-2/80">{r.note}</p>}
                  <p className="mt-2 max-w-3xl text-pretty text-muted">{r.summary}</p>
                </button>
                <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                  <ul className="mt-4 max-w-3xl space-y-2">
                    {r.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm text-fg/85"><span className="mt-[9px] h-px w-3 shrink-0 bg-accent-2" />{h}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5 pb-2">
                    {r.tags.map((t) => <span key={t} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-subtle">{t}</span>)}
                  </div>
                </motion.div>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
