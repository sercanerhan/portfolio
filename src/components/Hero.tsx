import { motion } from 'motion/react'
import { ArrowDown, Check, Copy } from 'lucide-react'
import { person } from '../data/profile'
import { scrollToId } from '../lib/sections'
import { WorldRoutes } from './WorldMap'

const companies = ['Basefy Innovation Lab', 'Medibulut', 'Delivery Hero', 'Marketyo', 'Arute Solutions', 'ISBAK · IMM', 'İTÜ', 'Esri Turkey']

const word = {
  hidden: { opacity: 0, y: '0.5em', filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero({ copied, onCopy }: { copied: boolean; onCopy: () => void }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div aria-hidden className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(99_102_241/0.22),transparent)] blur-2xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
            {person.role} @ {person.company}
          </span>
          <span className="font-mono text-xs text-subtle">{person.coords}</span>
        </motion.div>

        <motion.h1
          className="font-display text-[clamp(2.6rem,7.4vw,5.6rem)] leading-[1.02] font-semibold tracking-[-0.035em]"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.06 }}
        >
          {person.headline.map((line, li) => (
            <span key={li} className={`block ${li === 1 ? 'text-gradient pb-2' : ''}`}>
              {line.split(' ').map((w, i) => (
                <motion.span key={i} variants={word} className="mr-[0.22em] inline-block">
                  {w}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-6 max-w-2xl text-lg text-pretty text-muted sm:text-xl">
          {person.subline}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-9 flex flex-wrap gap-3">
          <button onClick={() => scrollToId('work')} className="group inline-flex items-center gap-2 rounded-xl bg-fg px-5 py-3 text-sm font-medium text-bg transition hover:bg-white/85">
            View case studies <ArrowDown size={15} className="transition group-hover:translate-y-0.5" />
          </button>
          <button onClick={() => scrollToId('showcase')} className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-white/[0.03] px-5 py-3 text-sm font-medium transition hover:bg-white/[0.07]">
            Try the product demos
          </button>
          <button onClick={onCopy} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 font-mono text-sm text-muted transition hover:text-fg" aria-live="polite">
            {copied ? <Check size={15} className="text-ok" /> : <Copy size={15} />} {copied ? 'Copied!' : person.email}
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1.2 }} className="relative mt-14 sm:-mt-6 sm:ml-[28%]">
          <WorldRoutes to={['berlin', 'lisbon', 'barcelona', 'rome', 'dubai', 'karachi', 'bangkok', 'singapore', 'buenosAires', 'newYork']} className="h-auto w-full" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,var(--color-bg))]" />
          <p className="absolute bottom-2 right-0 font-mono text-[10px] text-subtle sm:text-[11px]">routes from Istanbul · where I’ve shipped, sold & presented</p>
        </motion.div>

        <div className="relative mt-10 overflow-hidden border-y border-line py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max gap-12" style={{ animation: 'marquee 38s linear infinite' }}>
            {[...companies, ...companies].map((c, i) => (
              <span key={i} className="font-display text-lg font-medium whitespace-nowrap text-white/55">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
