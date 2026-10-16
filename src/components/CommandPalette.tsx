import { Command } from 'cmdk'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Briefcase, Copy, Hash, Sparkles } from 'lucide-react'
import { LinkedinIcon } from './BrandIcons'
import { useEffect } from 'react'
import { caseStudies, person, showcase } from '../data/profile'
import { sections, scrollToId } from '../lib/sections'

type Props = { open: boolean; setOpen: (v: boolean) => void; openCase: (slug: string) => void; openShowcase: (id: string) => void; copyEmail: () => void }

export function CommandPalette({ open, setOpen, openCase, openShowcase, copyEmail }: Props) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [open, setOpen])

  const run = (fn: () => void) => () => {
    setOpen(false)
    setTimeout(fn, 60)
  }
  const item = 'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-fg'
  const group = 'px-1 pb-2 [&_[cmdk-group-heading]]:eyebrow [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2'

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl shadow-black/60"
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="Command palette" loop>
              <Command.Input autoFocus placeholder="Jump to a section, case study or product…" className="w-full border-b border-line bg-transparent px-5 py-4 text-[15px] text-fg outline-none placeholder:text-subtle" />
              <Command.List className="max-h-[52vh] overflow-y-auto p-2">
                <Command.Empty className="px-4 py-8 text-center text-sm text-subtle">No results.</Command.Empty>
                <Command.Group heading="Navigate" className={group}>
                  {sections.map((s) => (
                    <Command.Item key={s.id} value={`go ${s.label}`} onSelect={run(() => scrollToId(s.id))} className={item}>
                      <Hash size={15} /> {s.label}
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading="Case studies" className={group}>
                  {caseStudies.map((c) => (
                    <Command.Item key={c.slug} value={`case ${c.title} ${c.company}`} onSelect={run(() => openCase(c.slug))} className={item}>
                      <Briefcase size={15} /> <span className="truncate">{c.title}</span>
                      <span className="ml-auto shrink-0 font-mono text-[11px] text-subtle">{c.company.split(' ')[0]}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading="Try a product demo" className={group}>
                  {showcase.map((s) => (
                    <Command.Item key={s.id} value={`demo ${s.label} ${s.company}`} onSelect={run(() => openShowcase(s.id))} className={item}>
                      <Sparkles size={15} /> {s.label}
                      <span className="ml-auto font-mono text-[11px] text-subtle">{s.company}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading="Contact" className={group}>
                  <Command.Item value="copy email" onSelect={run(copyEmail)} className={item}>
                    <Copy size={15} /> Copy email <span className="ml-auto font-mono text-[11px] text-subtle">{person.email}</span>
                  </Command.Item>
                  <Command.Item value="linkedin" onSelect={run(() => window.open(person.linkedin, '_blank', 'noopener'))} className={item}>
                    <LinkedinIcon size={15} /> Open LinkedIn <ArrowRight size={13} className="ml-auto" />
                  </Command.Item>
                </Command.Group>
              </Command.List>
              <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[11px] text-subtle">
                <span>↑↓ navigate · ↵ select · esc close</span>
                <span>{person.handle}</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
