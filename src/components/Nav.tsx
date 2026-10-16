import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import { useState } from 'react'
import { Command } from 'lucide-react'
import { person } from '../data/profile'
import { sections, scrollToId } from '../lib/sections'

export function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { scrollY, scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        className={`mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-colors duration-300 sm:px-5 ${
          scrolled ? 'border-line bg-bg/70 backdrop-blur-xl' : 'border-transparent'
        } mx-3 sm:mx-auto`}
      >
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium">{person.handle}</span>
          <span className="hidden items-center gap-2 font-mono text-[11px] whitespace-nowrap text-subtle xl:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" style={{ animation: 'pulse-dot 2.4s ease-in-out infinite' }} />
            {person.status}
          </span>
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
          {sections.slice(0, 6).map((s) => (
            <button key={s.id} onClick={() => scrollToId(s.id)} className="rounded-lg px-3 py-1.5 text-sm whitespace-nowrap text-muted transition hover:bg-white/5 hover:text-fg">
              {s.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-2 rounded-lg border border-line bg-white/[0.03] px-2.5 py-1.5 text-xs text-muted transition hover:border-line-strong hover:text-fg"
            aria-label="Open command palette"
          >
            <Command size={13} /> <span className="font-mono">K</span>
          </button>
          <button onClick={() => scrollToId('contact')} className="rounded-lg bg-fg px-3 py-1.5 text-sm font-medium text-bg transition hover:bg-white/85">
            Contact
          </button>
        </div>
      </motion.div>
      <motion.div aria-hidden className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-accent to-accent-2" style={{ scaleX: scrollYProgress }} />
    </header>
  )
}
