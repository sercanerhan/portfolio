import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react'

// A card whose border and surface glow follows the cursor.
export function SpotlightCard({ children, className = '', ...rest }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const bg = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgb(129 140 248 / 0.13), transparent 70%)`

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <div onMouseMove={onMove} onMouseLeave={() => { x.set(-400); y.set(-400) }} className={`card group overflow-hidden ${className}`} {...rest}>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 transition-opacity" style={{ background: bg }} />
      <div className="relative h-full">{children}</div>
    </div>
  )
}
