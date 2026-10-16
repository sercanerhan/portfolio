import { motion } from 'motion/react'
import { impact } from '../data/profile'
import { CountUp } from './CountUp'
import { Reveal, SectionHeader } from './Reveal'
import { SpotlightCard } from './SpotlightCard'

export function ImpactGrid() {
  const [hero, ...rest] = impact
  return (
    <section id="impact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeader eyebrow="Impact dashboard" title={<>Outcomes, not output.</>} intro="A few numbers from eighteen years of building. Every one is from a product I led, and every one came from a team." />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        <Reveal className="col-span-2 row-span-2">
          <SpotlightCard className="h-full p-6 sm:p-8">
            <p className="eyebrow">{hero.context}</p>
            <p className="mt-6 font-display text-6xl font-semibold tracking-tight sm:text-8xl">
              <span className="text-gradient">
                <CountUp to={hero.value} prefix={hero.prefix} suffix={hero.suffix} />
              </span>
            </p>
            <p className="mt-2 text-muted">{hero.label}</p>
            <div className="mt-10 space-y-3" aria-hidden>
              {[
                { l: 'before', w: 100 / 242, c: 'bg-white/15' },
                { l: 'after', w: 1, c: 'bg-gradient-to-r from-accent to-accent-2' },
              ].map((b) => (
                <div key={b.l} className="flex items-center gap-3">
                  <span className="w-12 font-mono text-[11px] text-subtle">{b.l}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
                    <motion.div className={`h-full rounded-full ${b.c}`} initial={{ width: 0 }} whileInView={{ width: `${b.w * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[11px] text-subtle">relative change in the key engagement metric</p>
          </SpotlightCard>
        </Reveal>
        {rest.map((m, i) => (
          <Reveal key={m.label} delay={0.05 * i} className={i === rest.length - 1 ? 'col-span-2' : ''}>
            <SpotlightCard className="h-full p-5 sm:p-6">
              <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                <CountUp to={m.value} prefix={m.prefix} suffix={m.suffix} />
              </p>
              <p className="mt-2 text-sm text-fg/90">{m.label}</p>
              <p className="mt-4 font-mono text-[11px] leading-relaxed text-subtle">{m.context}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
