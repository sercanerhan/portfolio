import { AnimatePresence, motion } from 'motion/react'
import { Bot, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { asset } from '../../lib/asset'

type Step = { tool?: string; text: string }
const scenarios: { label: string; prompt: string; steps: Step[] }[] = [
  {
    label: 'Find PMF signals',
    prompt: 'Is venture #3 approaching product–market fit?',
    steps: [
      { tool: 'query_metrics', text: 'Pulling weekly retention cohorts and activation funnel…' },
      { tool: 'cluster_feedback', text: 'Clustering 214 user interview notes into 6 themes…' },
      { tool: 'survey.pmf', text: 'Reading the “very disappointed” share from the PMF survey…' },
      { text: 'Retention curve is flattening for the SMB segment; enterprise still decays.' },
      { text: '→ Recommendation: narrow ICP to SMB, double down on onboarding, re-test in 6 weeks.' },
    ],
  },
  {
    label: 'Draft quarterly OKRs',
    prompt: 'Draft Q1 OKRs for the AI assistant product.',
    steps: [
      { tool: 'read_strategy', text: 'Reading the lab strategy doc and last quarter’s results…' },
      { tool: 'north_star', text: 'North star: weekly active teams completing ≥3 tasks.' },
      { text: 'O1 — Make the first week magical. KR: activation 30% → 45%.' },
      { text: 'O2 — Earn the habit. KR: week-4 retention 22% → 30%.' },
      { text: '→ Draft ready for review with the founding team.' },
    ],
  },
  {
    label: 'Prioritise the backlog',
    prompt: 'Rank the top backlog items for next sprint.',
    steps: [
      { tool: 'fetch_backlog', text: 'Loaded 48 items from the tracker…' },
      { tool: 'score.rice', text: 'Scoring reach, impact, confidence and effort…' },
      { tool: 'check_dependencies', text: 'Flagging 3 items blocked by the data platform…' },
      { text: '1. Guided onboarding · 2. Usage-based alerts · 3. CSV import' },
      { text: '→ Sprint plan drafted; blocked items moved to dependency review.' },
    ],
  },
]

export function AgentConsoleDemo() {
  const [idx, setIdx] = useState(0)
  const [shown, setShown] = useState(0)
  const [run, setRun] = useState(0)
  const box = useRef<HTMLDivElement>(null)
  const sc = scenarios[idx]

  useEffect(() => {
    setShown(0)
    const timers = sc.steps.map((_, i) => setTimeout(() => setShown(i + 1), 650 + i * 900))
    return () => timers.forEach(clearTimeout)
  }, [idx, run, sc.steps])

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: 'smooth' })
  }, [shown])

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {scenarios.map((s, i) => (
          <button key={s.label} onClick={() => { setIdx(i); setRun((r) => r + 1) }} className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition ${idx === i ? 'border-accent/50 bg-accent/10 text-fg' : 'border-line text-muted hover:text-fg'}`}>
            <Play size={11} /> {s.label}
          </button>
        ))}
      </div>
      <div className="relative overflow-hidden rounded-xl border border-line bg-[#0b0b0e] font-mono text-[12px]">
        <img src={asset('images/ai-lab.webp')} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.18]" />
        <div className="relative flex items-center gap-2 border-b border-line bg-black/40 px-4 py-2 text-subtle"><Bot size={14} className="text-accent" /> product-agent · session</div>
        <div ref={box} className="relative h-[300px] space-y-3 overflow-y-auto p-4" aria-live="polite" data-lenis-prevent>
          <p><span className="text-accent-2">you ›</span> {sc.prompt}</p>
          <AnimatePresence>
            {sc.steps.slice(0, shown).map((s, i) => (
              <motion.div key={`${run}-${i}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-start gap-2">
                {s.tool ? (
                  <>
                    <span className="rounded-md border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[10px] text-accent">⚙ {s.tool}</span>
                    <span className="text-subtle">{s.text}</span>
                  </>
                ) : (
                  <p className="text-fg"><span className="text-ok">agent › </span>{s.text}</p>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {shown < sc.steps.length && <span className="inline-block h-4 w-2 bg-fg/70" style={{ animation: 'caret 1s steps(1) infinite' }} />}
        </div>
      </div>
      <p className="mt-2 font-mono text-[10px] text-subtle">Scripted simulation of an agentic product workflow · no live model calls</p>
    </div>
  )
}
