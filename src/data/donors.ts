/**
 * OUR DONORS — confirmed by the founder (Nov 2026).
 * ------------------------------------------------------------------
 * Logos are the supplied reference images, trimmed of surrounding
 * whitespace only (never redrawn). To upgrade a logo, drop a higher-
 * resolution original into public/brand/donors/ and update `src`,
 * `width` and `height` here; the DonorsSection component needs no change.
 *
 * Sizing: DonorsSection gives every logo the same visual AREA, so wide
 * wordmarks render shorter and compact seals taller. `optical` is a small
 * manual nudge on top of that for logos that look heavy or light (1 = none).
 *
 * `asset`: 'reference' = supplied image of the real logo (low-res, swap for
 * the original when available); 'placeholder' = not the official logo.
 */
export interface Donor {
  id: string
  name: string
  fullName?: string
  src: string
  width: number
  height: number
  optical?: number
  asset: 'reference' | 'placeholder'
  /** Flags a supplied asset that should be swapped for an official original. */
  assetNote?: string
}

export const donors: Donor[] = [
  { id: 'intex', name: 'INTEX', src: '/brand/donors/intex.jpg', width: 778, height: 360, optical: 0.95, asset: 'reference' },
  {
    id: 'ddu-gky',
    name: 'DDU-GKY',
    fullName: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana',
    src: '/brand/donors/ddu-gky.jpg',
    width: 576,
    height: 282,
    optical: 1.05,
    asset: 'reference',
  },
  { id: 'stanford', name: 'Stanford', fullName: 'Stanford University', src: '/brand/donors/stanford.jpg', width: 511, height: 360, optical: 1.1, asset: 'reference' },
  { id: 'zte', name: 'ZTE', src: '/brand/donors/zte.jpg', width: 720, height: 360, optical: 0.85, asset: 'reference' },
  {
    id: 'sachd',
    name: 'SACHD',
    src: '/brand/donors/sachd.jpg',
    width: 720,
    height: 360,
    optical: 1,
    asset: 'placeholder',
    assetNote: 'Supplied image is a promotional banner, not a logo. Replace with the official SACHD logo.',
  },
  { id: 'axisc', name: 'AXISCADES', src: '/brand/donors/axiscades.jpg', width: 552, height: 147, optical: 1, asset: 'reference' },
]
