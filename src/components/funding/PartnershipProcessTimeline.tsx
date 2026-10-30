import { csrLifecycle } from '@/data/content'
import { Timeline, type TimelineStep } from '@/components/common/Timeline'

/** Five-step partnership lifecycle — horizontal on desktop, vertical on mobile. */
export function PartnershipProcessTimeline({ steps = csrLifecycle, onDark }: { steps?: TimelineStep[]; onDark?: boolean }) {
  return <Timeline steps={steps} onDark={onDark} />
}
