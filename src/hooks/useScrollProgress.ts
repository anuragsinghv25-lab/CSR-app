import { useEffect, useState } from 'react'

/** Returns the scroll offset (px) and whether the page has scrolled past `threshold`. */
export function useScrollProgress(threshold = 8) {
  const [y, setY] = useState(0)
  useEffect(() => {
    const onScroll = () => setY(window.scrollY)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return { y, scrolled: y > threshold }
}
