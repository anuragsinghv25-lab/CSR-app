/**
 * OUR DONORS — confirmed by the founder (Nov 2026).
 * ------------------------------------------------------------------
 * Logos are the supplied reference images, trimmed of surrounding
 * whitespace only (never redrawn). To upgrade a logo, drop a higher-
 * resolution original into public/brand/donors/ and update `src`,
 * `width` and `height` here; the DonorsSection component needs no change.
 *
 * `scale` evens out optical size, since a wide wordmark and a square
 * seal at the same height don't look equally large (1 = default).
 */
export interface Donor {
  id: string
  name: string
  fullName?: string
  src: string
  width: number
  height: number
  scale?: number
  /** Flags a supplied asset that should be swapped for an official original. */
  assetNote?: string
}

export const donors: Donor[] = [
  { id: 'intex', name: 'INTEX', src: '/brand/donors/intex.jpg', width: 778, height: 360, scale: 0.9 },
  {
    id: 'ddu-gky',
    name: 'DDU-GKY',
    fullName: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana',
    src: '/brand/donors/ddu-gky.jpg',
    width: 576,
    height: 282,
    scale: 1.15,
  },
  { id: 'stanford', name: 'Stanford', fullName: 'Stanford University', src: '/brand/donors/stanford.jpg', width: 511, height: 360, scale: 1.3 },
  { id: 'zte', name: 'ZTE', src: '/brand/donors/zte.jpg', width: 720, height: 360, scale: 0.8 },
  {
    id: 'sachd',
    name: 'SACHD',
    src: '/brand/donors/sachd.jpg',
    width: 720,
    height: 360,
    scale: 1,
    assetNote: 'Supplied image is a promotional banner, not a logo. Replace with the official SACHD logo.',
  },
  { id: 'axisc', name: 'AXISCADES', src: '/brand/donors/axiscades.jpg', width: 552, height: 147, scale: 0.95 },
]
