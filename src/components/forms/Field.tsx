import * as React from 'react'
import { cn } from '@/lib/utils'

const inputBase =
  'w-full rounded-md border bg-white px-3.5 text-[0.95rem] text-charcoal placeholder:text-grey transition-colors focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15'

interface BaseProps {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  className?: string
}

function Wrapper({ id, label, error, hint, optional, className, children }: BaseProps & { children: React.ReactNode }) {
  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={id} className="mb-1.5 text-sm font-medium text-charcoal">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function describedBy(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined
}

export function TextField({
  id, label, error, hint, optional, className, ...props
}: BaseProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'>) {
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <input
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(inputBase, 'h-11', error ? 'border-error' : 'border-line-strong')}
        {...props}
      />
    </Wrapper>
  )
}

export function TextAreaField({
  id, label, error, hint, optional, className, ...props
}: BaseProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>) {
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <textarea
        id={id}
        name={id}
        rows={4}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(inputBase, 'min-h-28 py-3 leading-relaxed', error ? 'border-error' : 'border-line-strong')}
        {...props}
      />
    </Wrapper>
  )
}

export function SelectField({
  id, label, error, hint, optional, className, options, placeholder, ...props
}: BaseProps & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> & {
  options: { value: string; label: string }[]
  placeholder?: string
}) {
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <div className="relative">
        <select
          id={id}
          name={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, error, hint)}
          className={cn(inputBase, 'h-11 appearance-none pr-10', error ? 'border-error' : 'border-line-strong')}
          {...props}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted">
          <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Wrapper>
  )
}

/** Accessible segmented choice (radio group styled as buttons). */
export function ChoiceGroup<T extends string>({
  name,
  legend,
  value,
  onChange,
  options,
  error,
  columns = 2,
}: {
  name: string
  legend: string
  value: T | ''
  onChange: (v: T) => void
  options: { value: T; label: string; hint?: string }[]
  error?: string
  columns?: 2 | 3 | 4
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-charcoal">{legend}</legend>
      <div className={cn('grid gap-2', columns === 2 && 'grid-cols-2', columns === 3 && 'grid-cols-3', columns === 4 && 'grid-cols-2 sm:grid-cols-4')}>
        {options.map((o) => {
          const checked = value === o.value
          return (
            <label
              key={o.value}
              className={cn(
                'relative flex min-h-11 cursor-pointer flex-col justify-center rounded-md border px-3.5 py-2.5 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue/40',
                checked ? 'border-blue bg-soft-blue text-blue' : 'border-line-strong bg-white text-charcoal hover:border-charcoal',
              )}
            >
              <input type="radio" name={name} value={o.value} checked={checked} onChange={() => onChange(o.value)} className="sr-only" />
              <span className="font-display text-sm font-semibold">{o.label}</span>
              {o.hint && <span className="mt-0.5 text-xs text-muted">{o.hint}</span>}
            </label>
          )
        })}
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-error" role="alert">{error}</p>}
    </fieldset>
  )
}
