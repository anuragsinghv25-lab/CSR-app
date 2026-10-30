import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, ArrowRight } from 'lucide-react'
import { mainNav, partnerNav } from '@/data/navigation'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { MobileNavigation } from './MobileNavigation'

export function Navbar() {
  const { scrolled } = useScrollProgress(8)
  const [partnerOpen, setPartnerOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const partnerActive = pathname.startsWith('/partnerships') || pathname === '/donate'

  useEffect(() => {
    setPartnerOpen(false)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!partnerOpen) return
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setPartnerOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPartnerOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [partnerOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-[var(--rv-nav-h)] border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled ? 'border-line bg-ivory/85 backdrop-blur-md' : 'border-transparent bg-ivory',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <div className="container-rv flex h-full items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'relative rounded-md px-3 py-2 text-[0.92rem] font-medium transition-colors hover:text-blue',
                      isActive ? 'text-blue' : 'text-charcoal/80',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-[13px] h-[2px] bg-blue" aria-hidden />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div ref={menuRef} className="relative hidden lg:block">
            <button
              type="button"
              aria-expanded={partnerOpen}
              aria-controls="partner-menu"
              onClick={() => setPartnerOpen((v) => !v)}
              className={cn(
                'inline-flex h-10 items-center gap-1.5 rounded-md bg-blue px-4 font-display text-[0.92rem] font-semibold text-white transition-colors hover:bg-navy',
                partnerActive && 'ring-2 ring-yellow ring-offset-2 ring-offset-ivory',
              )}
            >
              Partner With Us
              <ChevronDown className={cn('size-4 transition-transform duration-200', partnerOpen && 'rotate-180')} aria-hidden />
            </button>
            <AnimatePresence>
              {partnerOpen && (
                <motion.div
                  id="partner-menu"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-[calc(100%+12px)] w-[380px] overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_60px_-24px_rgb(10_35_72/0.35)]"
                >
                  <ul className="p-2">
                    {partnerNav.map((item) => {
                      const Icon = item.icon
                      return (
                        <li key={item.to}>
                          <Link
                            to={item.to}
                            className="group flex gap-4 rounded-lg p-3 transition-colors hover:bg-ivory focus-visible:bg-ivory"
                          >
                            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-soft-blue text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                              <Icon className="size-5" aria-hidden />
                            </span>
                            <span>
                              <span className="flex items-center gap-1 font-display text-[0.95rem] font-semibold text-charcoal">
                                {item.label}
                                <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                              </span>
                              <span className="mt-0.5 block text-sm leading-snug text-muted">{item.description}</span>
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="border-t border-line bg-sand px-5 py-3 text-sm text-muted">
                    Not sure which fits?{' '}
                    <Link to="/contact" className="font-semibold text-blue hover:underline">
                      Talk to us
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="grid size-11 place-items-center rounded-md text-charcoal hover:bg-sand lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>
      <MobileNavigation open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  )
}
