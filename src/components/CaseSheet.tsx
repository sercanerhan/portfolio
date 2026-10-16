import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { caseStudies } from '../data/profile'
import { Cover } from './Cover'

export function CaseSheet({ slug, onClose }: { slug: string | null; onClose: () => void }) {
  const c = caseStudies.find((x) => x.slug === slug)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!c) return
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', esc)
    }
  }, [c, onClose])

  return (
    <AnimatePresence>
      {c && (
        <motion.div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} data-lenis-prevent>
          <div className="flex min-h-full items-start justify-center px-3 py-6 sm:px-6 sm:py-16">
            <motion.article
              layoutId={`case-${c.slug}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-title"
              className="card relative w-full max-w-3xl overflow-hidden bg-surface"
              onClick={(e) => e.stopPropagation()}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              <button ref={closeRef} onClick={onClose} aria-label="Close case study" className="absolute top-4 right-4 z-10 rounded-full border border-line-strong bg-black/50 p-2 backdrop-blur transition hover:bg-black/80">
                <X size={16} />
              </button>
              <Cover src={c.cover} alt="" className="aspect-[16/8]" />
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 sm:p-10">
                <p className="eyebrow">{c.kicker} · {c.company} · {c.period}</p>
                <h2 id="case-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{c.title}</h2>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-line bg-white/[0.03] p-4">
                      <p className="text-gradient font-display text-2xl font-semibold">{m.value}</p>
                      <p className="mt-1 font-mono text-[11px] text-subtle">{m.label}</p>
                    </div>
                  ))}
                </div>
                <dl className="mt-10 space-y-8">
                  <Block label="Context">{c.context}</Block>
                  <Block label="The hard part">{c.challenge}</Block>
                  <Block label="What I did">
                    <ul className="space-y-2.5">
                      {c.actions.map((a) => (
                        <li key={a} className="flex gap-3"><span className="mt-2.5 h-1 w-3 shrink-0 rounded bg-gradient-to-r from-accent to-accent-2" />{a}</li>
                      ))}
                    </ul>
                  </Block>
                  <Block label="Outcome">{c.outcome}</Block>
                </dl>
                <blockquote className="mt-10 rounded-2xl border border-line bg-gradient-to-br from-accent/10 to-accent-2/5 p-6 font-display text-lg text-pretty sm:text-xl">
                  “{c.lesson}”
                </blockquote>
              </motion.div>
            </motion.article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[150px_1fr] sm:gap-6">
      <dt className="eyebrow pt-1">{label}</dt>
      <dd className="text-pretty text-muted [&_li]:text-muted">{children}</dd>
    </div>
  )
}
