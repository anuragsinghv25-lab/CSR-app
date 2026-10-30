import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Register the custom type scale so `text-h2` isn't treated as a colour and
// dropped when merged with `text-white` etc.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { 'font-size': [{ text: ['display', 'h1', 'h2', 'h3', 'lead'] }] } },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

/** ₹2,500 style formatting (Indian digit grouping). */
export function formatINR(value: number) {
  return inr.format(value)
}

/** Format an amount expressed in lakh as "₹40 lakh" / "₹1.2 crore". */
export function formatLakh(lakh: number) {
  if (lakh >= 100) {
    const crore = lakh / 100
    return `₹${Number.isInteger(crore) ? crore : crore.toFixed(1)} crore`
  }
  return `₹${lakh} lakh`
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-IN').format(value)
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
export const isPhone = (v: string) => /^[+\d][\d\s-]{7,15}$/.test(v.trim())
