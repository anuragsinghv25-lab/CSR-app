import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { isEmail, cn } from '@/lib/utils'
import { subscribeNewsletter } from '@/services/submissions'
import { useToast } from '@/components/ui/toast'

export function NewsletterForm({ onDark = true }: { onDark?: boolean }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const toast = useToast()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isEmail(email)) {
      setError('Enter a valid email address, like name@example.org.')
      return
    }
    setError('')
    setState('sending')
    await subscribeNewsletter(email)
    setState('done')
    toast({ tone: 'info', title: 'Subscription simulated', description: 'This is a prototype — your email was not stored or sent anywhere.' })
  }

  if (state === 'done') {
    return (
      <p className={cn('flex items-center gap-2 text-sm', onDark ? 'text-white/80' : 'text-muted')}>
        <Check className="size-4 text-yellow" aria-hidden /> Subscription simulated. No email was stored.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter-email" className={cn('text-sm font-medium', onDark ? 'text-white' : 'text-charcoal')}>
        Email address
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.org"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'newsletter-error' : undefined}
          className={cn(
            'h-11 min-w-0 flex-1 rounded-md border px-3.5 text-sm focus:outline-none focus:ring-2',
            onDark
              ? 'border-white/25 bg-white/5 text-white placeholder:text-white/45 focus:border-yellow focus:ring-yellow/25'
              : 'border-line-strong bg-white text-charcoal focus:border-blue focus:ring-blue/15',
          )}
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="grid size-11 shrink-0 place-items-center rounded-md bg-yellow text-charcoal transition-colors hover:bg-[#f0ac00] disabled:opacity-60"
          aria-label="Subscribe to updates"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>
      {error && (
        <p id="newsletter-error" role="alert" className={cn('mt-2 text-xs', onDark ? 'text-[#ffb4a8]' : 'text-error')}>
          {error}
        </p>
      )}
    </form>
  )
}
