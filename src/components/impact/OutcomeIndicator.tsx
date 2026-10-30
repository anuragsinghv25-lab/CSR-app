import { motion } from 'framer-motion'

/** Baseline → endline for one indicator (percent). Text carries the values; bars carry the shape. */
export function OutcomeIndicator({ label, baseline, endline, colour }: { label: string; baseline: number; endline: number; colour: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-medium text-charcoal">{label}</p>
        <p className="tabular shrink-0 text-sm text-muted">
          {baseline}% <span aria-hidden>→</span><span className="sr-only">to</span> <strong className="font-semibold text-charcoal">{endline}%</strong>
        </p>
      </div>
      <div className="relative mt-2 h-2 rounded-full bg-sand" aria-hidden>
        <div className="absolute inset-y-0 left-0 rounded-full bg-[#b9bdc3]" style={{ width: `${baseline}%` }} />
        <motion.div
          className="absolute inset-y-0 rounded-full"
          style={{ left: `${baseline}%`, background: colour }}
          initial={{ width: 0 }}
          whileInView={{ width: `${endline - baseline}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}
