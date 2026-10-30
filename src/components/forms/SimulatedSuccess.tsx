import { motion } from 'framer-motion'
import { Check, ShieldAlert } from 'lucide-react'

/** Honest confirmation screen for simulated submissions. */
export function SimulatedSuccess({
  title,
  reference,
  body,
  notice,
  actions,
}: {
  title: string
  reference: string
  body: React.ReactNode
  notice: string
  actions?: React.ReactNode
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} role="status" aria-live="polite">
      <span className="grid size-14 place-items-center rounded-full bg-success text-white">
        <Check className="size-7" aria-hidden />
      </span>
      <h3 className="mt-6 font-display text-h3 font-bold text-charcoal">{title}</h3>
      <div className="mt-3 max-w-[56ch] leading-relaxed text-muted">{body}</div>
      <p className="mt-5 text-sm text-muted">
        Demo reference <span className="tabular ml-1 rounded-sm bg-sand px-2 py-1 font-semibold text-charcoal">{reference}</span>
      </p>
      <div className="mt-6 flex gap-3 rounded-lg border border-[#e9c46a] bg-yellow-soft p-4 text-sm text-[#5c4100]">
        <ShieldAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
        <p>{notice}</p>
      </div>
      {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
    </motion.div>
  )
}
