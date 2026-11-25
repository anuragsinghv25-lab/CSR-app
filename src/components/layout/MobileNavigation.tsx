import { useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { NavLink, Link } from 'react-router-dom'
import { X, ArrowUpRight, ChevronDown, HandHeart, Mail, MapPin } from 'lucide-react'
import { mainNav, partnerNav } from '@/data/navigation'
import { programmes } from '@/data/programmes'
import { organisation } from '@/data/organisation'
import { SocialLinks } from '@/components/common/SocialLinks'
import { cn } from '@/lib/utils'

/** Full-height slide-out drawer with focus trap (Radix Dialog). */
export function MobileNavigation({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [programsOpen, setProgramsOpen] = useState(false)
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    cn('flex items-center justify-between py-4 font-display text-xl font-semibold', isActive ? 'text-yellow' : 'text-white')

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-navy-deep/40 data-[state=open]:animate-fade-in lg:hidden" />
        <DialogPrimitive.Content className="on-dark fixed inset-y-0 right-0 z-[61] flex w-full max-w-[420px] flex-col bg-navy text-white shadow-2xl data-[state=open]:animate-[drawer-in_0.32s_cubic-bezier(0.16,1,0.3,1)] lg:hidden">
          <DialogPrimitive.Title className="sr-only">Site navigation</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">Main pages, programmes and ways to support {organisation.name}</DialogPrimitive.Description>
          <div className="flex h-[var(--rv-nav-h)] shrink-0 items-center justify-between px-5">
            <span className="font-display text-lg font-extrabold">{organisation.name}</span>
            <DialogPrimitive.Close className="grid size-11 place-items-center rounded-md hover:bg-white/10" aria-label="Close menu">
              <X className="size-6" />
            </DialogPrimitive.Close>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pb-10">
            <Link
              to="/donate"
              className="flex h-12 items-center justify-center gap-2 rounded-md bg-yellow font-display font-semibold text-charcoal transition-colors hover:bg-[#f0ac00]"
            >
              <HandHeart className="size-5" aria-hidden /> Donate / Sponsor
            </Link>

            <ul className="mt-6 border-t border-white/15">
              <li className="border-b border-white/15">
                <NavLink to="/" end className={linkCls}>Home</NavLink>
              </li>
              {mainNav.map((item) =>
                item.to === '/programs' ? (
                  <li key={item.to} className="border-b border-white/15">
                    <button
                      type="button"
                      aria-expanded={programsOpen}
                      aria-controls="mobile-programs"
                      onClick={() => setProgramsOpen((v) => !v)}
                      className="flex w-full items-center justify-between py-4 text-left font-display text-xl font-semibold text-white"
                    >
                      {item.label}
                      <ChevronDown className={cn('size-5 text-white/60 transition-transform', programsOpen && 'rotate-180')} aria-hidden />
                    </button>
                    {programsOpen && (
                      <ul id="mobile-programs" className="grid gap-1 pb-4">
                        {programmes.map((p) => {
                          const Icon = p.icon
                          return (
                            <li key={p.slug}>
                              <NavLink
                                to={`/programs/${p.slug}`}
                                className={({ isActive }) =>
                                  cn('flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.95rem]', isActive ? 'bg-white/10 text-yellow' : 'text-white/85 hover:bg-white/[0.06]')
                                }
                              >
                                <Icon className="size-4 shrink-0 text-white/60" aria-hidden />
                                {p.title}
                              </NavLink>
                            </li>
                          )
                        })}
                        <li>
                          <NavLink to="/programs" end className="block px-3 py-2.5 text-sm font-semibold text-yellow">All programmes</NavLink>
                        </li>
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.to} className="border-b border-white/15">
                    <NavLink to={item.to} className={linkCls}>{item.label}</NavLink>
                  </li>
                ),
              )}
              <li className="border-b border-white/15">
                <NavLink to="/contact" className={linkCls}>Contact</NavLink>
              </li>
            </ul>

            <p className="eyebrow mt-10 text-white/60">Partner with us</p>
            <ul className="mt-4 grid gap-2">
              {partnerNav.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.to}>
                    <Link to={item.to} className="flex items-center gap-4 rounded-lg bg-white/[0.06] p-4 transition-colors hover:bg-white/10">
                      <Icon className="size-5 text-yellow" aria-hidden />
                      <span className="flex-1 font-display font-semibold">{item.label}</span>
                      <ArrowUpRight className="size-4 text-white/60" aria-hidden />
                    </Link>
                  </li>
                )
              })}
            </ul>

            <ul className="mt-10 grid gap-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-yellow" aria-hidden />
                <a href={`mailto:${organisation.email}`} className="hover:text-white">{organisation.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-yellow" aria-hidden />
                {organisation.location}
              </li>
            </ul>
            <SocialLinks size="md" className="mt-6 gap-2" />
          </nav>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
