import { motion } from 'motion/react'
import { ArrowUpRight, HeartHandshake } from 'lucide-react'
import { caseStudies, forGood } from '../data/profile'
import { Cover } from './Cover'
import { Reveal, SectionHeader } from './Reveal'

export function CaseStudies({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeader eyebrow="Selected case studies" title="Four problems worth telling." intro="Context, the hard part, what I did, and what happened. Click any card to open the full story." />
      <div className="grid gap-4 md:grid-cols-2">
        {caseStudies.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.06}>
            <motion.button
              layoutId={`case-${c.slug}`}
              onClick={() => onOpen(c.slug)}
              className="card group block w-full overflow-hidden text-left transition-colors hover:border-line-strong"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            >
              <Cover src={c.cover} alt="" className="aspect-[16/9] border-b border-line [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-[1.04]" />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <p className="eyebrow">{c.kicker} · {c.period}</p>
                  <ArrowUpRight size={18} className="text-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-balance sm:text-2xl">{c.title}</h3>
                <p className="mt-1 text-sm text-muted">{c.company}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.metrics.map((m) => (
                    <span key={m.label} className="rounded-lg border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-xs">
                      <span className="text-fg">{m.value}</span> <span className="text-subtle">{m.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-4">
        <div className="card grid items-center gap-0 overflow-hidden sm:grid-cols-[1fr_1.4fr]">
          <Cover src={forGood.cover} alt="" className="aspect-[16/9] h-full sm:aspect-auto" />
          <div className="p-6 sm:p-8">
            <p className="eyebrow flex items-center gap-2"><HeartHandshake size={14} className="text-warn" /> Product for good · {forGood.period}</p>
            <h3 className="mt-3 font-display text-xl font-semibold">{forGood.title}</h3>
            <p className="mt-1 text-sm text-muted">{forGood.role}</p>
            <p className="mt-4 text-pretty text-muted">{forGood.text}</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
