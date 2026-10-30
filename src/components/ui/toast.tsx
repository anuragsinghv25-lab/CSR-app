import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { CircleCheck, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastTone = 'success' | 'info'
interface ToastItem {
  id: number
  title: string
  description?: string
  tone: ToastTone
}

const ToastContext = React.createContext<(t: Omit<ToastItem, 'id'>) => void>(() => {})

/** ToastNotification provider. Use `useToast()` to show a message. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([])
  const push = React.useCallback((t: Omit<ToastItem, 'id'>) => {
    setItems((prev) => [...prev, { ...t, id: Date.now() + Math.random() }])
  }, [])

  return (
    <ToastContext.Provider value={push}>
      <ToastPrimitive.Provider swipeDirection="right" duration={5000}>
        {children}
        {items.map((t) => (
          <ToastPrimitive.Root
            key={t.id}
            onOpenChange={(open) => !open && setItems((prev) => prev.filter((i) => i.id !== t.id))}
            className={cn(
              'flex items-start gap-3 rounded-lg border border-line bg-white p-4 pr-10 shadow-[0_16px_40px_-16px_rgb(10_35_72/0.35)] data-[state=open]:animate-fade-in data-[swipe=end]:translate-x-full',
            )}
          >
            {t.tone === 'success' ? (
              <CircleCheck className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
            ) : (
              <Info className="mt-0.5 size-5 shrink-0 text-blue" aria-hidden />
            )}
            <div>
              <ToastPrimitive.Title className="font-display text-sm font-semibold text-charcoal">{t.title}</ToastPrimitive.Title>
              {t.description && (
                <ToastPrimitive.Description className="mt-1 text-sm text-muted">{t.description}</ToastPrimitive.Description>
              )}
            </div>
            <ToastPrimitive.Close className="absolute right-3 top-3 text-muted hover:text-charcoal" aria-label="Dismiss">
              <X className="size-4" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-[80] flex w-[calc(100vw-32px)] max-w-sm flex-col gap-2 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return React.useContext(ToastContext)
}
