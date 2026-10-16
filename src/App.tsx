import Lenis from 'lenis'
import { MotionConfig } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { CaseSheet } from './components/CaseSheet'
import { CaseStudies } from './components/CaseStudies'
import { Changelog } from './components/Changelog'
import { CommandPalette } from './components/CommandPalette'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Hero } from './components/Hero'
import { ImpactGrid } from './components/ImpactGrid'
import { Nav } from './components/Nav'
import { Principles, Toolkit } from './components/Principles'
import { Showcase } from './components/Showcase'
import { person, showcase } from './data/profile'
import { useCopy, useHashRoute } from './lib/hooks'
import { scrollToId } from './lib/sections'

export default function App() {
  const [route, navigate] = useHashRoute()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [demo, setDemo] = useState(showcase[0].id)
  const [copied, copy] = useCopy()
  const copyEmail = useCallback(() => copy(person.email), [copy])

  const caseSlug = route.startsWith('work/') ? route.slice(5) : null

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1 })
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    console.log(
      '%c sercan.erhan %c Built with Claude Code + Codex. Press ⌘K to get around.',
      'background:linear-gradient(90deg,#818cf8,#22d3ee);color:#09090b;font-weight:700;padding:4px 8px;border-radius:4px',
      'color:#a1a1aa',
    )
  }, [])

  const openShowcase = (id: string) => {
    setDemo(id)
    scrollToId('showcase')
  }

  return (
    <MotionConfig reducedMotion="user">
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-fg focus:px-3 focus:py-2 focus:text-bg">Skip to content</a>
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero copied={copied} onCopy={copyEmail} />
        <ImpactGrid />
        <CaseStudies onOpen={(slug) => navigate(`work/${slug}`)} />
        <Showcase active={demo} setActive={setDemo} />
        <Changelog />
        <Principles />
        <Toolkit />
        <Education />
        <Contact copied={copied} onCopy={copyEmail} />
      </main>
      <CaseSheet slug={caseSlug} onClose={() => navigate('')} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} openCase={(s) => navigate(`work/${s}`)} openShowcase={openShowcase} copyEmail={copyEmail} />
    </MotionConfig>
  )
}
