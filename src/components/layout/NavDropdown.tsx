import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Accessible disclosure dropdown for the main navigation.
 * Opens on click, Enter, Space or ArrowDown; closes on Escape (focus returns
 * to the trigger), outside click or route change (handled by the parent).
 */
export function NavDropdown({
  id,
  label,
  open,
  onOpenChange,
  active,
  variant = 'link',
  align = 'left',
  width = 380,
  children,
}: {
  id: string
  label: string
  open: boolean
  onOpenChange: (open: boolean) => void
  active?: boolean
  variant?: 'link' | 'button'
  align?: 'left' | 'right'
  width?: number
  children: React.ReactNode
}) {
  const wrap = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) onOpenChange(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
        trigger.current?.focus()
      }
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onOpenChange])

  return (
    <div ref={wrap} className="relative">
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => onOpenChange(!open)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            onOpenChange(true)
            requestAnimationFrame(() => document.querySelector<HTMLElement>(`#${id} a`)?.focus())
          }
        }}
        className={cn(
          variant === 'link'
            ? cn('relative inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-[0.92rem] font-medium transition-colors hover:text-blue xl:px-3', active || open ? 'text-blue' : 'text-charcoal/80')
            : cn(
                'inline-flex h-10 items-center gap-1.5 rounded-md bg-blue px-4 font-display text-[0.92rem] font-semibold text-white transition-colors hover:bg-navy',
                active && 'ring-2 ring-yellow ring-offset-2 ring-offset-ivory',
              ),
        )}
      >
        {label}
        <ChevronDown className={cn('size-4 transition-transform duration-200', open && 'rotate-180')} aria-hidden />
        {variant === 'link' && active && <span className="absolute inset-x-3 -bottom-[13px] h-[2px] bg-blue" aria-hidden />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            style={{ width }}
            className={cn(
              'absolute top-[calc(100%+12px)] z-50 overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_60px_-24px_rgb(10_35_72/0.35)]',
              align === 'right' ? 'right-0' : '-left-3',
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
