import { useParams } from 'react-router-dom'
import { getProgramme } from '@/data/programmes'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ProgrammeHero } from '@/components/programmes/ProgrammeHero'
import { ProgrammeOverview } from '@/components/programmes/ProgrammeOverview'
import { InterventionGrid } from '@/components/programmes/InterventionGrid'
import { ProgrammeOutcomeSection } from '@/components/programmes/ProgrammeOutcomeSection'
import { ProgrammeRelatedContent } from '@/components/programmes/ProgrammeRelatedContent'
import { ProgrammeCTA } from '@/components/programmes/ProgrammeCTA'
import NotFound from './NotFound'

/** Reusable programme detail template — one route, six programmes. */
export default function ProgramDetail() {
  const { slug } = useParams()
  const programme = getProgramme(slug)
  useDocumentTitle(programme ? `${programme.title} programme` : 'Page not found')
  if (!programme) return <NotFound />
  return (
    <>
      <ProgrammeHero programme={programme} />
      <ProgrammeOverview programme={programme} />
      <InterventionGrid programme={programme} />
      <ProgrammeOutcomeSection programme={programme} />
      <ProgrammeRelatedContent programme={programme} />
      <ProgrammeCTA programme={programme} />
    </>
  )
}
