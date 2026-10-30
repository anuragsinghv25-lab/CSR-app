import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import Home from '@/pages/Home'

// Route-level code splitting keeps the first load light; charts (Recharts)
// only load on pages that use them.
const About = lazy(() => import('@/pages/About'))
const Approach = lazy(() => import('@/pages/Approach'))
const Programs = lazy(() => import('@/pages/Programs'))
const ProgramDetail = lazy(() => import('@/pages/ProgramDetail'))
const Impact = lazy(() => import('@/pages/Impact'))
const CSRPartnerships = lazy(() => import('@/pages/CSRPartnerships'))
const Donations = lazy(() => import('@/pages/Donations'))
const GovernmentPartnerships = lazy(() => import('@/pages/GovernmentPartnerships'))
const Resources = lazy(() => import('@/pages/Resources'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const page = (el: React.ReactNode) => <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>{el}</Suspense>

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: page(<About />) },
      { path: '/approach', element: page(<Approach />) },
      { path: '/programs', element: page(<Programs />) },
      { path: '/programs/:slug', element: page(<ProgramDetail />) },
      { path: '/impact', element: page(<Impact />) },
      { path: '/partnerships/csr', element: page(<CSRPartnerships />) },
      { path: '/donate', element: page(<Donations />) },
      { path: '/partnerships/government', element: page(<GovernmentPartnerships />) },
      { path: '/resources', element: page(<Resources />) },
      { path: '/contact', element: page(<Contact />) },
      { path: '*', element: page(<NotFound />) },
    ],
  },
])
