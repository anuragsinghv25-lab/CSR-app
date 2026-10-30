import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { isEmail } from '@/lib/utils'
import { submitEnquiry } from '@/services/submissions'
import { SelectField, TextAreaField, TextField } from './Field'
import { SimulatedSuccess } from './SimulatedSuccess'

export const enquiryCategories = [
  { value: 'general', label: 'General enquiry' },
  { value: 'csr', label: 'CSR partnership' },
  { value: 'donation', label: 'Individual donation' },
  { value: 'government', label: 'Government partnership' },
]

type Values = { name: string; email: string; category: string; message: string }
const empty: Values = { name: '', email: '', category: '', message: '' }

export function ContactForm({ defaultCategory = '' }: { defaultCategory?: string }) {
  const [values, setValues] = useState<Values>({ ...empty, category: defaultCategory })
  const [errors, setErrors] = useState<Partial<Values>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [ref, setRef] = useState('')

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  function validate() {
    const e: Partial<Values> = {}
    if (values.name.trim().length < 2) e.name = 'Enter your name.'
    if (!isEmail(values.email)) e.email = 'Enter a valid email address, like name@example.org.'
    if (!values.category) e.category = 'Choose what your enquiry is about.'
    if (values.message.trim().length < 10) e.message = 'Write a short message — at least 10 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]')
      first?.focus()
      return
    }
    setStatus('sending')
    const res = await submitEnquiry('contact', values)
    setRef(res.reference)
    setStatus('done')
  }

  if (status === 'done') {
    return (
      <SimulatedSuccess
        title="Message ready to send"
        reference={ref}
        body={<p>Thanks, {values.name.split(' ')[0]}. In the live site, your message would go to the right team and you would get a reply by email.</p>}
        notice="Prototype: nothing was sent. Your message has not left this browser."
        actions={
          <Button variant="secondary" onClick={() => { setValues(empty); setStatus('idle') }}>
            Write another message
          </Button>
        }
      />
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="contact-name" label="Name" autoComplete="name" value={values.name} onChange={set('name')} error={errors.name} />
        <TextField id="contact-email" label="Email" type="email" autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} />
      </div>
      <SelectField
        id="contact-category"
        label="What is this about?"
        placeholder="Choose a category"
        options={enquiryCategories}
        value={values.category}
        onChange={set('category')}
        error={errors.category}
      />
      <TextAreaField id="contact-message" label="Message" rows={5} value={values.message} onChange={set('message')} error={errors.message} />
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </Button>
        <p className="text-xs text-muted">Prototype — submissions are simulated and not sent.</p>
      </div>
    </form>
  )
}
