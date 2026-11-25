import { donors } from '@/data/donors'

/** "Our Donors" — shown on every page, directly above the footer. */
export function DonorsSection() {
  return (
    <section className="border-t border-line bg-white py-14 md:py-20" aria-labelledby="donors-title">
      <div className="container-rv">
        <h2 id="donors-title" className="text-center font-display text-h3 font-bold text-charcoal">
          Our Donors
        </h2>
        <ul className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-10 sm:grid-cols-3 md:mt-12 lg:grid-cols-6 lg:gap-x-10">
          {donors.map((d) => (
            <li key={d.id} className="flex h-20 items-center justify-center md:h-24">
              <img
                src={d.src}
                alt={d.fullName ? `${d.name} — ${d.fullName}` : d.name}
                width={d.width}
                height={d.height}
                loading="lazy"
                decoding="async"
                className="h-auto max-h-full w-auto max-w-full object-contain"
                style={{ maxHeight: `${Math.round(64 * (d.scale ?? 1))}px` }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
