import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, ArrowRight } from 'lucide-react'
import { mainNav, partnerNav } from '@/data/navigation'
import { programmes } from '@/data/programmes'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { MobileNavigation } from './MobileNavigation'
import { NavDropdown } from './NavDropdown'

type Menu = 'programs' | 'partner' | null

export function Navbar() {
  const { scrolled } = useScrollProgress(48)
  const [openMenu, setOpenMenu] = useState<Menu>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const partnerActive = pathname.startsWith('/partnerships')
  const programsActive = pathname.startsWith('/programs')

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  const toggle = useCallback((m: Exclude<Menu, null>) => (open: boolean) => setOpenMenu(open ? m : null), [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-[var(--rv-nav-h)] border-b transition-[background-color,border-color] duration-300',
        scrolled ? 'border-line bg-ivory/90 backdrop-blur-md' : 'border-transparent bg-ivory',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <div className="container-rv flex h-full items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {mainNav.map((item) =>
              item.to === '/programs' ? (
                <li key={item.to}>
                  <NavDropdown id="programs-menu" label={item.label} open={openMenu === 'programs'} onOpenChange={toggle('programs')} active={programsActive} width={560}>
                    <ul className="grid grid-cols-2 gap-1 p-2">
                      {programmes.map((p) => {
                        const Icon = p.icon
                        return (
                          <li key={p.slug}>
                            <Link to={`/programs/${p.slug}`} className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-ivory focus-visible:bg-ivory">
                              <Icon className="mt-0.5 size-5 shrink-0" style={{ color: p.accentColour }} aria-hidden />
                              <span>
                                <span className="block font-display text-[0.95rem] font-semibold text-charcoal group-hover:text-blue">{p.title}</span>
                                <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted">{p.tagline}</span>
                              </span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="flex items-center justify-between border-t border-line bg-sand px-5 py-3 text-sm">
                      <span className="text-muted">Six areas, one approach</span>
                      <span className="flex gap-4">
                        <Link to="/approach" className="font-semibold text-blue hover:underline">How they connect</Link>
                        <Link to="/programs" className="font-semibold text-blue hover:underline">All programmes</Link>
                      </span>
                    </div>
                  </NavDropdown>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn('relative rounded-md px-2.5 py-2 text-[0.92rem] font-medium transition-colors hover:text-blue xl:px-3', isActive ? 'text-blue' : 'text-charcoal/80')
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-[13px] h-[2px] bg-blue" aria-hidden />}
                      </>
                    )}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <NavDropdown id="partner-menu" label="Partner With Us" variant="button" align="right" open={openMenu === 'partner'} onOpenChange={toggle('partner')} active={partnerActive}>
              <ul className="p-2">
                {partnerNav.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.to}>
                      <Link to={item.to} className="group flex gap-4 rounded-lg p-3 transition-colors hover:bg-ivory focus-visible:bg-ivory">
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
                <Link to="/contact" className="font-semibold text-blue hover:underline">Talk to us</Link>
              </div>
            </NavDropdown>
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
