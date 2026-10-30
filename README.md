# RAINVOUS — CSR & Social Impact Platform (Phase 1 prototype)

Frontend-only interactive prototype for **RAINVOUS**, a social development organisation working towards sustainable livelihoods and community prosperity.

> **Prototype.** No payment gateway, CRM, email, authentication or government system is connected. Every submission is simulated in the browser. Figures are marked as *reference*, *unverified*, *illustrative* or *pending* throughout the UI.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the build
```

SPA fallback for deep links is included for Netlify (`public/_redirects`) and Vercel (`vercel.json`).

## Stack

React 18 · Vite 6 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui-pattern components on Radix primitives · Framer Motion · Recharts · React Router 6 · Lucide · `@svg-maps/india`.

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About RAINVOUS |
| `/approach` | Our Approach (interactive 360° model) |
| `/programs`, `/programs/:slug` | Programme index + reusable detail template (water, agriculture, skills, health, women, livelihoods) |
| `/impact` | Impact report: state map explorer, programme filter, 4 charts, sample stories |
| `/partnerships/csr` | CSR: alignment tabs, 5-step lifecycle, filterable opportunity explorer, 4-step enquiry form |
| `/donate` | Donation calculator → review → simulated confirmation |
| `/partnerships/government` | Collaboration models, lifecycle, sample opportunities, institutional enquiry |
| `/resources` | Document library with search, category and year filters (no downloads) |
| `/contact` | Contact details and form |

## Structure

```
src/
  app/            App shell, router (route-level code splitting)
  components/
    ui/           shadcn-style primitives: button, accordion, tabs, dialog, tooltip, toast
    layout/       Navbar, MobileNavigation, Footer, Logo, containers, PageTransition, ScrollManager
    common/       SectionHeading, StatusBadge, MetricCard, StatCounter, Timeline, DocumentCard, ImageSlot…
    illustrations/HeroConfluence, PillarDiagram, ProgrammeGlyph, RippleField
    impact/       ImpactOverview, ImpactMetricGrid, GeographicImpactMap, StateDetailPanel, charts…
    programmes/   ProgrammeCard, ProgrammeHero, ProgrammeOverview, InterventionGrid…
    funding/      FundingPathwayCard, CSRPartnershipCard, DonationCalculator, PartnershipEnquiryForm…
    forms/        Field primitives, ContactForm, NewsletterForm, SimulatedSuccess
  data/           Single source of mock data with TypeScript types and data-status metadata
  services/       submissions.ts — the only place to swap in real APIs in Phase 2
  hooks/, lib/, styles/ (design-tokens.css + globals.css)
```

## Data honesty

- **Reference** (from the existing prototype site, awaiting documents): 30+ years, 5M+ lives, 100+ partners, CRISIL 9.27/10, Great Place to Work, `ceooffice@rainvows.org`, Mumbai 400059.
- **Unverified:** state count (sources show both 14 and 15).
- **Illustrative:** all state-level data, charts, CSR projects, government opportunities and case studies. Each one is labelled in the UI.
- **Pending:** founding year, milestones, leadership names, all documents and registrations (CSR-1, 12A/80G, etc.).
- Partners listed: only APM Terminals and Apollo Tyres Foundation (named on the supplied prototype), as text, not logos.

## Swap-in points for Phase 2

- **Logo:** `src/components/layout/Logo.tsx` (wordmark stand-in; the official logo file was not supplied).
- **Photography:** `ImageSlot` components (`data-image-slot="home-hero"`, `programme-hero-{slug}`, `impact-story-{id}`). Set `src` and the abstract fallback is replaced.
- **Integrations:** `src/services/submissions.ts`. Forms only depend on these functions.
- **Documents:** add a file URL to `Resource` and render a download action only when one exists.
- **Map:** verify `@svg-maps/india` boundaries against official Survey of India depictions before launch.
