import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} — RAINVOUS` : 'RAINVOUS — Sustainable livelihoods and community prosperity'
  }, [title])
}
