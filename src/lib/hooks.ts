import { useCallback, useEffect, useState } from 'react'

// Hash-based deep links (#/work/<slug>) work on GitHub Pages without server rewrites.
export function useHashRoute() {
  const read = () => window.location.hash.replace(/^#\/?/, '')
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const on = () => setRoute(read())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  const navigate = useCallback((to: string) => {
    if (to) {
      window.location.hash = `/${to}`
    } else {
      history.pushState('', document.title, window.location.pathname + window.location.search)
      setRoute('')
    }
  }, [])
  return [route, navigate] as const
}

export function useCopy(timeout = 1800) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      window.location.href = `mailto:${text}`
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), timeout)
  }, [timeout])
  return [copied, copy] as const
}
