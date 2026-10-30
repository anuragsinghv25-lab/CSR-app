import * as DialogPrimitive from '@radix-ui/react-dialog'
import { NavLink, Link } from 'react-router-dom'
import { X, ArrowUpRight } from 'lucide-react'
import { mainNav, partnerNav } from '@/data/navigation'
import { organisation } from '@/data/organisation'
import { cn } from '@/lib/utils'

/** Full-height slide-out drawer with focus trap (Radix Dialog). */
export function MobileNavigation({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-navy-deep/40 data-[state=open]:animate-fade-in lg:hidden" />
        <DialogPrimitive.Content
          className="on-dark fixed inset-y-0 right-0 z-[61] flex w-full max-w-[420px] flex-col bg-navy text-white shadow-2xl transition-transform duration-300 data-[state=closed]:translate-x-full data-[state=open]:animate-[drawer-in_0.32s_cubic-bezier(0.16,1,0.3,1)] lg:hidden"
        >
          <DialogPrimitive.Title className="sr-only">Site navigation</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">Main pages and partnership options</DialogPrimitive.Description>
          <div className="flex h-[var(--rv-nav-h)] items-center justify-between px-5">
            <span className="font-display text-lg font-extrabold tracking-[0.06em]">RAINVOUS</span>
            <DialogPrimitive.Close className="grid size-11 place-items-center rounded-md hover:bg-white/10" aria-label="Close menu">
              <X className="size-6" />
            </DialogPrimitive.Close>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pb-8">
            <ul className="border-t border-white/15">
              {[{ label: 'Home', to: '/' }, ...mainNav, { label: 'Contact', to: '/contact' }].map((item) => (
                <li key={item.to} className="border-b border-white/15">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn('flex items-center justify-between py-4 font-display text-xl font-semibold', isActive ? 'text-yellow' : 'text-white')
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
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
            <p className="mt-10 text-sm text-white/60">{organisation.location}</p>
          </nav>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
