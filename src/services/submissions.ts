/**
 * Submission service — PROTOTYPE ONLY.
 * ------------------------------------------------------------------
 * Every function here simulates a network call and resolves locally.
 * Nothing leaves the browser. In Phase 2, replace the bodies with real
 * API / CRM / payment-gateway calls; the call sites (forms) do not need
 * to change because they only depend on these signatures.
 */

export interface SimulatedResult {
  ok: true
  reference: string
  simulated: true
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

function reference(prefix: string) {
  const n = Math.floor(Math.random() * 90000 + 10000)
  return `${prefix}-DEMO-${n}`
}

export type EnquiryKind = 'csr' | 'government' | 'contact'

export async function submitEnquiry(kind: EnquiryKind, _payload: Record<string, unknown>): Promise<SimulatedResult> {
  await wait(700)
  return { ok: true, reference: reference(kind.toUpperCase()), simulated: true }
}

export async function submitDonationIntent(_payload: Record<string, unknown>): Promise<SimulatedResult> {
  // Phase 2: create an order with the payment gateway and redirect to its hosted checkout.
  await wait(800)
  return { ok: true, reference: reference('GIFT'), simulated: true }
}

export async function subscribeNewsletter(_email: string): Promise<SimulatedResult> {
  await wait(500)
  return { ok: true, reference: reference('NEWS'), simulated: true }
}
