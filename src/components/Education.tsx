import { GraduationCap, Sprout } from 'lucide-react'
import { community, education } from '../data/profile'
import { Reveal } from './Reveal'

export function Education() {
  return (
    <section aria-label="Education and community" className="mx-auto grid max-w-6xl gap-4 px-4 py-16 sm:px-6 lg:grid-cols-2">
      <Reveal className="card p-6 sm:p-8">
        <p className="eyebrow flex items-center gap-2"><GraduationCap size={14} /> Education</p>
        <div className="mt-6 space-y-7">
          {education.map((e) => (
            <div key={e.school}>
              <p className="font-mono text-xs text-subtle">{e.period}</p>
              <p className="mt-1 font-display text-lg font-semibold">{e.school}</p>
              <p className="text-sm text-muted">{e.degree}</p>
              <p className="mt-2 text-sm text-subtle italic">Thesis: {e.thesis}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal className="card p-6 sm:p-8" delay={0.08}>
        <p className="eyebrow flex items-center gap-2"><Sprout size={14} /> Community</p>
        <div className="mt-6 space-y-7">
          {community.map((c) => (
            <div key={c.title}>
              <p className="font-mono text-xs text-subtle">{c.period}</p>
              <p className="mt-1 font-display text-lg font-semibold">{c.title}</p>
              <p className="text-sm text-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
