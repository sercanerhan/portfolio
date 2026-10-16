import { useState } from 'react'
import { asset } from '../lib/asset'

// Generated cover image with a gradient fallback if the file is missing.
export function Cover({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-[radial-gradient(circle_at_70%_30%,rgb(99_102_241/0.35),transparent_60%),radial-gradient(circle_at_20%_80%,rgb(34_211_238/0.2),transparent_55%)] ${className}`}>
      {!failed && <img src={asset(src)} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-full w-full object-cover" />}
    </div>
  )
}
