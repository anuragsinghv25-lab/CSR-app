import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { UtilityBar } from './UtilityBar'
import { DonorsSection } from '@/components/common/DonorsSection'
import { ScrollManager } from './ScrollManager'
import { PageTransition } from './PageTransition'

export function RootLayout() {
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <UtilityBar />
      <Navbar />
      <main id="main" className="flex-1" tabIndex={-1}>
        <PageTransition key={pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <DonorsSection />
      <Footer />
    </div>
  )
}
