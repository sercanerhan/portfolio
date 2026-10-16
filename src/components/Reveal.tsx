import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export function Reveal({ children, delay = 0, y = 24, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeader({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="eyebrow mb-4 flex items-center gap-2">
        <span className="inline-block h-px w-6 bg-gradient-to-r from-accent to-accent-2" />
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-lg text-pretty text-muted">{intro}</p>}
    </Reveal>
  )
}
