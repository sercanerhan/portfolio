import { motion } from 'motion/react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { person } from '../data/profile'
import { LinkedinIcon } from './BrandIcons'
import { Reveal } from './Reveal'

export function Contact({ copied, onCopy }: { copied: boolean; onCopy: () => void }) {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal>
        <div className="card relative overflow-hidden p-8 sm:p-14">
          <div aria-hidden className="absolute -right-24 -bottom-32 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
          <div aria-hidden className="absolute -top-24 right-40 h-60 w-60 rounded-full bg-accent-2/15 blur-3xl" />
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Let’s build something <span className="text-gradient">worth using.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted">Product strategy, AI products, zero-to-one or scale-up. Happy to talk.</p>
          <div className="relative mt-10 flex flex-wrap gap-3">
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href={`mailto:${person.email}`} className="inline-flex items-center gap-2 rounded-xl bg-fg px-5 py-3 text-sm font-medium text-bg">
              <Mail size={15} /> {person.email}
            </motion.a>
            <button onClick={onCopy} aria-live="polite" className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-4 py-3 text-sm hover:bg-white/[0.06]">
              {copied ? <Check size={15} className="text-ok" /> : <Copy size={15} />} {copied ? 'Copied' : 'Copy'}
            </button>
            <a href={person.linkedin} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm hover:bg-white/[0.06]">
              <LinkedinIcon size={15} /> LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </Reveal>
      <footer className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-line pt-8 font-mono text-xs text-subtle sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} {person.name} · {person.location}</span>
        <span>Designed & built with Claude Code + Codex · press ⌘K</span>
      </footer>
    </section>
  )
}
