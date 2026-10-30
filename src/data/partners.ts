import type { Partner } from './types'

/**
 * Only partners named on the organisation's supplied prototype are listed.
 * No other partner relationships are implied. Logos are not used until
 * official assets and permission are provided.
 */
export const partners: Partner[] = [
  {
    id: 'apm-terminals',
    name: 'APM Terminals',
    type: 'Corporate partner',
    status: 'reference',
    note: 'Named on the supplied prototype. Relationship details to be confirmed.',
  },
  {
    id: 'apollo-tyres-foundation',
    name: 'Apollo Tyres Foundation',
    type: 'Foundation partner',
    status: 'reference',
    note: 'Named on the supplied prototype. Relationship details to be confirmed.',
  },
]
