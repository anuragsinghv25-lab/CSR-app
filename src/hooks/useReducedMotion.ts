import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

/** True when the visitor has asked the OS to reduce motion. */
export function useReducedMotion(): boolean {
  return Boolean(useFramerReducedMotion())
}
