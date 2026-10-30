import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Pencil, ArrowLeft, ArrowRight } from 'lucide-react'
import { programmes } from '@/data/programmes'
import { collaborationModels } from '@/data/governmentOpportunities'
import { Button } from '@/components/ui/button'
import { SelectField, TextAreaField, TextField } from '@/components/forms/Field'
import { SimulatedSuccess } from '@/components/forms/SimulatedSuccess'
import { submitEnquiry } from '@/services/submissions'
import { cn, isEmail, isPhone } from '@/lib/utils'

type FieldType = 'text' | 'email' | 'tel' | 'select' | 'textarea'

interface FieldConfig {
  id: string
  label: string
  type: FieldType
  options?: { value: string; label: string }[]
  optional?: boolean
  hint?: string
  autoComplete?: string
  half?: boolean
}

interface StepConfig {
  title: string
  fields: FieldConfig[]
}

const programmeOptions: { value: string; label: string }[] = [...programmes.map((p) => ({ value: p.slug as string, label: p.title })), { value: 'multiple', label: 'Multiple / integrated' }]
const geographyOptions = ['North India', 'West India', 'East India', 'South India', 'Central India', 'North-East India', 'Flexible / open to recommendation'].map((v) => ({ value: v, label: v }))
const timelineOptions = ['Within 3 months', '3–6 months', '6–12 months', 'Next financial year', 'Exploring'].map((v) => ({ value: v, label: v }))

const configs: Record<'csr' | 'government', StepConfig[]> = {
  csr: [
    {
      title: 'Organisation',
      fields: [
        { id: 'company', label: 'Company name', type: 'text', autoComplete: 'organization' },
        { id: 'contact', label: 'Contact person’s name', type: 'text', autoComplete: 'name', half: true },
        { id: 'email', label: 'Business email', type: 'email', autoComplete: 'email', half: true },
        { id: 'phone', label: 'Phone number', type: 'tel', optional: true, autoComplete: 'tel', half: true },
      ],
    },
    {
      title: 'Requirements',
      fields: [
        { id: 'programme', label: 'Programme interest', type: 'select', options: programmeOptions, half: true },
        {
          id: 'funding',
          label: 'Funding range',
          type: 'select',
          half: true,
          options: ['Under ₹25 lakh', '₹25–50 lakh', '₹50 lakh – ₹1 crore', '₹1–5 crore', 'Above ₹5 crore', 'To be decided'].map((v) => ({ value: v, label: v })),
        },
        { id: 'geography', label: 'Target geography', type: 'select', options: geographyOptions, half: true },
        { id: 'timeline', label: 'Expected timeline', type: 'select', options: timelineOptions, half: true },
      ],
    },
    {
      title: 'Details',
      fields: [
        { id: 'objectives', label: 'CSR objectives', type: 'textarea', hint: 'What do you want your CSR programme to achieve?' },
        { id: 'requirements', label: 'Project requirements', type: 'textarea', hint: 'Reporting, compliance, employee volunteering, Board approval timelines…' },
        { id: 'comments', label: 'Additional comments', type: 'textarea', optional: true },
      ],
    },
  ],
  government: [
    {
      title: 'Institution',
      fields: [
        { id: 'institution', label: 'Institution or department', type: 'text', autoComplete: 'organization' },
        {
          id: 'institutionType',
          label: 'Type of institution',
          type: 'select',
          half: true,
          options: ['Government department', 'Public institution', 'Development agency', 'Funding body', 'Other institutional partner'].map((v) => ({ value: v, label: v })),
        },
        { id: 'contact', label: 'Contact person’s name', type: 'text', autoComplete: 'name', half: true },
        { id: 'email', label: 'Official email', type: 'email', autoComplete: 'email', half: true },
        { id: 'phone', label: 'Phone number', type: 'tel', optional: true, autoComplete: 'tel', half: true },
      ],
    },
    {
      title: 'Collaboration',
      fields: [
        { id: 'programme', label: 'Programme area', type: 'select', options: programmeOptions, half: true },
        { id: 'model', label: 'Collaboration model', type: 'select', options: collaborationModels.map((m) => ({ value: m.title, label: m.title })), half: true },
        { id: 'geography', label: 'Geography', type: 'select', options: geographyOptions, half: true },
        { id: 'timeline', label: 'Expected timeline', type: 'select', options: timelineOptions, half: true },
      ],
    },
    {
      title: 'Details',
      fields: [
        { id: 'objectives', label: 'Objectives of the collaboration', type: 'textarea' },
        { id: 'comments', label: 'Additional information', type: 'textarea', optional: true },
      ],
    },
  ],
}

type Values = Record<string, string>

export function PartnershipEnquiryForm({ variant = 'csr', defaultProgramme }: { variant?: 'csr' | 'government'; defaultProgramme?: string }) {
  const steps = configs[variant]
  const allFields = useMemo(() => steps.flatMap((s) => s.fields), [steps])
  const initial = useMemo(() => {
    const v = Object.fromEntries(allFields.map((f) => [f.id, ''])) as Values
    if (defaultProgramme && programmeOptions.some((o) => o.value === defaultProgramme)) v.programme = defaultProgramme
    return v
  }, [allFields, defaultProgramme])

  const [values, setValues] = useState<Values>(initial)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [step, setStep] = useState(0) // 0..steps.length (review)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [reference, setReference] = useState('')
  const topRef = useRef<HTMLDivElement>(null)
  const reviewIndex = steps.length
  const stepTitles = [...steps.map((s) => s.title), 'Review']

  function validateField(f: FieldConfig, v: string): string {
    const val = v.trim()
    if (!val) return f.optional ? '' : f.type === 'select' ? `Choose a ${f.label.toLowerCase()}.` : `Enter ${f.label.toLowerCase()}.`
    if (f.type === 'email' && !isEmail(val)) return 'Enter a valid email address, like name@company.com.'
    if (f.type === 'tel' && !isPhone(val)) return 'Enter a valid phone number, digits only (spaces and + allowed).'
    if (f.type === 'textarea' && val.length < 10) return 'Add a little more detail — at least 10 characters.'
    return ''
  }

  function validateStep(i: number) {
    const e: Record<string, string> = {}
    steps[i].fields.forEach((f) => {
      const msg = validateField(f, values[f.id] ?? '')
      if (msg) e[f.id] = msg
    })
    setErrors(e)
    if (Object.keys(e).length) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`#${variant}-${Object.keys(e)[0]}`)?.focus())
      return false
    }
    return true
  }

  function goTo(i: number) {
    setStep(i)
    setErrors({})
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function next() {
    if (validateStep(step)) goTo(step + 1)
  }

  async function submit() {
    setStatus('sending')
    const res = await submitEnquiry(variant, values)
    setReference(res.reference)
    setStatus('done')
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const display = (f: FieldConfig) => {
    const v = values[f.id]
    if (!v) return '—'
    return f.options?.find((o) => o.value === v)?.label ?? v
  }

  if (status === 'done') {
    return (
      <div ref={topRef}>
        <SimulatedSuccess
          title="Enquiry ready for the partnerships team"
          reference={reference}
          body={
            <p>
              Thank you, {values.contact.split(' ')[0]}. In the live platform, the {variant === 'csr' ? 'CSR partnerships' : 'institutional partnerships'} team
              would review your enquiry and reply to {values.email}.
            </p>
          }
          notice="Prototype: no real submission has occurred. Your details stayed in this browser and were not sent anywhere."
          actions={
            <Button variant="secondary" onClick={() => { setValues(initial); setStatus('idle'); setStep(0) }}>
              Start a new enquiry
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* Stepper */}
      <ol className="flex items-center gap-2" aria-label="Form progress">
        {stepTitles.map((t, i) => {
          const done = i < step
          const current = i === step
          return (
            <li key={t} className="flex flex-1 items-center gap-2">
              <span
                aria-current={current ? 'step' : undefined}
                className={cn(
                  'grid size-8 shrink-0 place-items-center rounded-full border font-display text-xs font-bold transition-colors',
                  done && 'border-blue bg-blue text-white',
                  current && 'border-blue text-blue',
                  !done && !current && 'border-line-strong text-muted',
                )}
              >
                {done ? <Check className="size-4" aria-hidden /> : i + 1}
              </span>
              <span className={cn('hidden text-sm font-medium sm:inline', current ? 'text-charcoal' : 'text-muted')}>{t}</span>
              {i < stepTitles.length - 1 && <span aria-hidden className={cn('h-px flex-1', done ? 'bg-blue' : 'bg-line-strong')} />}
            </li>
          )
        })}
      </ol>
      <p className="mt-3 text-sm text-muted sm:hidden">
        Step {step + 1} of {stepTitles.length}: <span className="font-medium text-charcoal">{stepTitles[step]}</span>
      </p>

      <div className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.22 }}>
            {step < reviewIndex ? (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault()
                  next()
                }}
              >
                <fieldset className="grid gap-5 sm:grid-cols-2">
                  <legend className="mb-6 font-display text-xl font-bold text-charcoal">{steps[step].title}</legend>
                  {steps[step].fields.map((f) => {
                    const common = {
                      id: `${variant}-${f.id}`,
                      label: f.label,
                      optional: f.optional,
                      hint: f.hint,
                      error: errors[f.id],
                      className: f.half ? '' : 'sm:col-span-2',
                    }
                    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
                      setValues((v) => ({ ...v, [f.id]: e.target.value }))
                      if (errors[f.id]) setErrors((er) => ({ ...er, [f.id]: '' }))
                    }
                    if (f.type === 'select')
                      return <SelectField key={f.id} {...common} options={f.options!} placeholder="Choose…" value={values[f.id]} onChange={onChange} />
                    if (f.type === 'textarea') return <TextAreaField key={f.id} {...common} value={values[f.id]} onChange={onChange} />
                    return <TextField key={f.id} {...common} type={f.type} autoComplete={f.autoComplete} value={values[f.id]} onChange={onChange} />
                  })}
                </fieldset>
                <div className="mt-8 flex items-center justify-between gap-3">
                  {step > 0 ? (
                    <Button type="button" variant="ghost" onClick={() => goTo(step - 1)}>
                      <ArrowLeft aria-hidden /> Back
                    </Button>
                  ) : (
                    <span />
                  )}
                  <Button type="submit">
                    {step === reviewIndex - 1 ? 'Review enquiry' : 'Continue'} <ArrowRight aria-hidden />
                  </Button>
                </div>
              </form>
            ) : (
              <div>
                <h3 className="font-display text-xl font-bold text-charcoal">Review your enquiry</h3>
                <p className="mt-2 text-sm text-muted">Check the details below. You can edit any section before sending.</p>
                <div className="mt-6 grid gap-4">
                  {steps.map((s, i) => (
                    <section key={s.title} className="rounded-lg border border-line bg-white p-5" aria-label={s.title}>
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-semibold text-charcoal">{s.title}</h4>
                        <button type="button" onClick={() => goTo(i)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:underline">
                          <Pencil className="size-3.5" aria-hidden /> Edit
                        </button>
                      </div>
                      <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                        {s.fields.map((f) => (
                          <div key={f.id} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                            <dt className="text-xs text-muted">{f.label}</dt>
                            <dd className="mt-0.5 whitespace-pre-line break-words text-sm text-charcoal">{display(f)}</dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  ))}
                </div>
                <p className="mt-6 text-xs text-muted">Prototype — sending is simulated. No data leaves your browser.</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <Button type="button" variant="ghost" onClick={() => goTo(reviewIndex - 1)}>
                    <ArrowLeft aria-hidden /> Back
                  </Button>
                  <Button type="button" variant="accent" onClick={submit} disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
