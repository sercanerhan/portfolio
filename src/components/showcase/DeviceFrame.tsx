import type { ReactNode } from 'react'

export function Phone({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto aspect-[9/19] w-[248px] shrink-0 rounded-[2.4rem] border border-white/15 bg-black p-2.5 shadow-[0_30px_80px_-20px_rgb(99_102_241/0.35)] ${className}`}>
      <div className="absolute top-3.5 left-1/2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-[#0f0f12]">{children}</div>
    </div>
  )
}

export function Browser({ children, url, className = '' }: { children: ReactNode; url: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/12 bg-[#0f0f12] shadow-[0_30px_80px_-24px_rgb(34_211_238/0.25)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 truncate rounded-md bg-white/[0.05] px-3 py-0.5 font-mono text-[10px] text-subtle">{url}</span>
      </div>
      {children}
    </div>
  )
}

export function DemoNote({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-center font-mono text-[10px] text-subtle">{children}</p>
}
