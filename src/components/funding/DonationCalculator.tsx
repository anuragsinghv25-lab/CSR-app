import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Lock } from 'lucide-react'
import { programmes, programmeBySlug } from '@/data/programmes'
import type { ProgrammeSlug } from '@/data/types'
import { Button } from '@/components/ui/button'
import { ChoiceGroup, TextAreaField, TextField } from '@/components/forms/Field'
import { SimulatedSuccess } from '@/components/forms/SimulatedSuccess'
import { submitDonationIntent } from '@/services/submissions'
import { cn, formatINR, isEmail } from '@/lib/utils'
import { DonationAmountSelector } from './DonationAmountSelector'
import { CustomDonationInput, MAX_DONATION, MIN_DONATION } from './CustomDonationInput'
import { DonationSummary } from './DonationSummary'
import { FundingImpactPreview } from './FundingImpactPreview'

type Programme = ProgrammeSlug | 'any'
type Frequency = 'once' | 'monthly'
type Stage = 'details' | 'review' | 'confirmed'

/**
 * Complete donation experience: calculator → details → simulated review
 * → simulated confirmation. No payment details are ever requested.
 * Phase 2: replace submitDonationIntent with a payment-gateway order and redirect.
 */
export function DonationCalculator({ initialProgramme = 'any' }: { initialProgramme?: Programme }) {
  const [programme, setProgramme] = useState<Programme>(initialProgramme)
  const [amount, setAmount] = useState<number | null>(1000)
  const [custom, setCustom] = useState(false)
  const [customValue, setCustomValue] = useState('')
  const [frequency, setFrequency] = useState<Frequency>('once')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [stage, setStage] = useState<Stage>('details')
  const [sending, setSending] = useState(false)
  const [reference, setReference] = useState('')
  const topRef = useRef<HTMLDivElement>(null)

  const effectiveAmount = custom ? Number(customValue || 0) : amount ?? 0

  function validate() {
    const e: Record<string, string> = {}
    if (custom) {
      if (!customValue) e.amount = 'Enter an amount, or choose one of the suggested amounts.'
      else if (effectiveAmount < MIN_DONATION) e.amount = `The minimum amount is ₹${MIN_DONATION}.`
      else if (effectiveAmount > MAX_DONATION) e.amount = `For gifts above ${formatINR(MAX_DONATION)}, please contact us directly.`
    }
    if (name.trim().length < 2) e.name = 'Enter your name.'
    if (!isEmail(email)) e.email = 'Enter a valid email address, like name@example.org.'
    setErrors(e)
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0]
      requestAnimationFrame(() => document.getElementById(first === 'amount' ? 'custom-amount' : `donor-${first}`)?.focus())
      return false
    }
    return true
  }

  function toStage(s: Stage) {
    setStage(s)
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function confirm() {
    setSending(true)
    const res = await submitDonationIntent({ programme, amount: effectiveAmount, frequency, name, email, message })
    setReference(res.reference)
    setSending(false)
    toStage('confirmed')
  }

  const programmeLabel = programme === 'any' ? 'Where it’s needed most' : programmeBySlug[programme].title

  return (
    <div ref={topRef} className="grid scroll-mt-24 gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait" initial={false}>
          {stage === 'details' && (
            <motion.form
              key="details"
              noValidate
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={(e) => {
                e.preventDefault()
                if (validate()) toStage('review')
              }}
              className="grid gap-10"
            >
              <fieldset>
                <legend className="mb-3 text-sm font-medium text-charcoal">Programme</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[{ slug: 'any' as const, title: 'Where needed most', colour: '#17191D' }, ...programmes.map((p) => ({ slug: p.slug, title: p.title, colour: p.accentColour }))].map((o) => {
                    const checked = programme === o.slug
                    return (
                      <label
                        key={o.slug}
                        className={cn(
                          'flex min-h-12 cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue/40',
                          checked ? 'border-blue bg-soft-blue text-blue' : 'border-line-strong bg-white text-charcoal hover:border-charcoal',
                          o.slug === 'any' && 'col-span-2 sm:col-span-1',
                        )}
                      >
                        <input type="radio" name="programme" className="sr-only" checked={checked} onChange={() => setProgramme(o.slug)} />
                        <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ background: o.colour }} />
                        {o.title}
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              <div>
                <DonationAmountSelector
                  amount={amount}
                  custom={custom}
                  onSelect={(v) => {
                    setAmount(v)
                    setCustom(false)
                    setErrors((e) => ({ ...e, amount: '' }))
                  }}
                  onCustom={() => setCustom(true)}
                />
                {custom && (
                  <CustomDonationInput
                    value={customValue}
                    onChange={(v) => {
                      setCustomValue(v)
                      if (errors.amount) setErrors((e) => ({ ...e, amount: '' }))
                    }}
                    error={errors.amount}
                  />
                )}
              </div>

              <ChoiceGroup<Frequency>
                name="frequency"
                legend="Frequency"
                value={frequency}
                onChange={setFrequency}
                options={[
                  { value: 'once', label: 'One-time' },
                  { value: 'monthly', label: 'Monthly', hint: 'Recorded as a preference only' },
                ]}
              />

              <fieldset className="grid gap-5 sm:grid-cols-2">
                <legend className="mb-3 text-sm font-medium text-charcoal">Your details</legend>
                <TextField id="donor-name" label="Name" autoComplete="name" value={name} onChange={(e) => { setName(e.target.value); setErrors((er) => ({ ...er, name: '' })) }} error={errors.name} />
                <TextField id="donor-email" label="Email" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((er) => ({ ...er, email: '' })) }} error={errors.email} />
                <TextAreaField id="donor-message" label="Message" optional rows={3} className="sm:col-span-2" value={message} onChange={(e) => setMessage(e.target.value)} />
              </fieldset>

              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg" variant="accent">Review donation</Button>
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <Lock className="size-3.5" aria-hidden /> No payment details are requested in this prototype.
                </p>
              </div>
            </motion.form>
          )}

          {stage === 'review' && (
            <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h3 className="font-display text-h3 font-bold text-charcoal">Review your donation</h3>
              <p className="mt-2 text-muted">This is a simulated checkout. Confirming will not take payment.</p>
              <dl className="mt-8 divide-y divide-line rounded-lg border border-line bg-white">
                {[
                  ['Amount', `${formatINR(effectiveAmount)}${frequency === 'monthly' ? ' per month' : ''}`],
                  ['Frequency', frequency === 'monthly' ? 'Monthly' : 'One-time'],
                  ['Programme preference', programmeLabel],
                  ['Name', name],
                  ['Email', email],
                  ['Message', message || '—'],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-3">
                    <dt className="text-sm text-muted">{k}</dt>
                    <dd className="break-words text-sm font-medium text-charcoal sm:col-span-2">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex gap-3 rounded-lg bg-sand p-4 text-sm text-charcoal">
                <Lock className="mt-0.5 size-4 shrink-0 text-terracotta" aria-hidden />
                <p>In the live site, you would continue to a secure payment provider. This prototype stops here — no card, UPI or bank details are collected.</p>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <Button variant="ghost" onClick={() => toStage('details')}>
                  <ArrowLeft aria-hidden /> Edit details
                </Button>
                <Button variant="accent" size="lg" onClick={confirm} disabled={sending}>
                  {sending ? 'Confirming…' : 'Confirm simulated donation'}
                </Button>
              </div>
            </motion.div>
          )}

          {stage === 'confirmed' && (
            <motion.div key="confirmed" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <SimulatedSuccess
                title={`Thank you, ${name.split(' ')[0]}`}
                reference={reference}
                body={
                  <p>
                    You chose to give {formatINR(effectiveAmount)}
                    {frequency === 'monthly' ? ' each month' : ''} to {programme === 'any' ? 'where it’s needed most' : `the ${programmeLabel.toLowerCase()} programme`}.
                  </p>
                }
                notice="Simulated confirmation — no money has been transferred and no payment was requested."
                actions={
                  <Button variant="secondary" onClick={() => { setStage('details'); setName(''); setEmail(''); setMessage('') }}>
                    Start again
                  </Button>
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <aside className="lg:col-span-5" aria-label="Donation summary">
        <div className="on-dark rounded-xl bg-navy p-7 md:p-9 lg:sticky lg:top-24">
          <DonationSummary amount={effectiveAmount} frequency={frequency} programme={programme} />
          <FundingImpactPreview programme={programme} />
        </div>
      </aside>
    </div>
  )
}
