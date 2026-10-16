import { principles, toolkit } from '../data/profile'
import { Reveal, SectionHeader } from './Reveal'
import { SpotlightCard } from './SpotlightCard'

export function Principles() {
  return (
    <section id="principles" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeader eyebrow="Operating principles" title="How I work." intro="Five habits I keep coming back to. Each one was learned the hard way and is backed by something that shipped." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05} className={i === 0 ? 'lg:row-span-2' : ''}>
            <SpotlightCard className="flex h-full flex-col p-6">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 flex-1 text-pretty text-muted">{p.text}</p>
              <p className="mt-6 border-t border-line pt-4 font-mono text-[11px] text-subtle">↳ {p.proof}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Toolkit() {
  const all = toolkit.flatMap((g) => g.items)
  return (
    <section aria-labelledby="toolkit-title" className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p id="toolkit-title" className="eyebrow mb-6">Toolkit</p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-3" style={{ animation: 'marquee 60s linear infinite' }}>
          {[...all, ...all].map((t, i) => (
            <span key={i} className="rounded-full border border-line bg-white/[0.02] px-4 py-2 text-sm whitespace-nowrap text-muted">{t}</span>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {toolkit.map((g) => (
          <Reveal key={g.group}>
            <p className="text-sm font-medium">{g.group}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{g.items.join(' · ')}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
