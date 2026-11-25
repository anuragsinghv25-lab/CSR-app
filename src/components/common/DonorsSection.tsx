import { donors, type Donor } from '@/data/donors'
import { StatusBadge } from './StatusBadge'

/** Every logo gets the same visual area (px²) so the row reads as balanced. */
const TARGET_AREA = 7600
const MAX_H = 84

function displaySize(d: Donor) {
  const aspect = d.width / d.height
  const k = d.optical ?? 1
  const h = Math.min(MAX_H, Math.sqrt(TARGET_AREA / aspect) * k)
  return { w: Math.round(h * aspect), h: Math.round(h) }
}

/** "Our Donors" — shown on every page, directly above the footer. */
export function DonorsSection() {
  return (
    <section className="border-t border-line bg-white pb-16 pt-14 md:pb-24 md:pt-20" aria-labelledby="donors-title">
      <div className="container-rv">
        <h2 id="donors-title" className="text-center font-display text-h3 font-bold text-charcoal">
          Our Donors
        </h2>
        <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 md:mt-12 lg:grid-cols-6 lg:gap-x-8">
          {donors.map((d) => {
            const { w, h } = displaySize(d)
            return (
              <li key={d.id} className="relative flex items-center justify-center" data-donor={d.id}>
                <div className="flex h-24 w-full items-center justify-center">
                  <img
                    src={d.src}
                    alt={d.fullName ? `${d.name} — ${d.fullName}` : d.name}
                    width={w}
                    height={h}
                    loading="lazy"
                    decoding="async"
                    className="h-auto max-w-full object-contain"
                    style={{ width: w }}
                  />
                </div>
                {d.asset === 'placeholder' && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap pt-1">
                    <StatusBadge status="pending" label="Official logo pending" help={d.assetNote} />
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
