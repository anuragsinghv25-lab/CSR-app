import { useEffect } from 'react'
import { organisation } from '@/data/organisation'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${organisation.name}` : `${organisation.name} — Sustainable livelihoods and community prosperity`
  }, [title])
}
