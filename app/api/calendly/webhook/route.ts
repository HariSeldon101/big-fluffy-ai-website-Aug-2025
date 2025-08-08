import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { createHmac, timingSafeEqual } from 'node:crypto'

function verifySignature(raw: string, signatureHeader: string, secret: string) {
  try {
    const expected = 'sha256=' + createHmac('sha256', secret).update(raw).digest('hex')
    // Compare in constant time where possible
    const a = Buffer.from(expected)
    const b = Buffer.from(signatureHeader.trim())
    return a.length === b.length && timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export async function POST(req: Request) {
  const signingKey = process.env.CALENDLY_SIGNING_KEY

  // Read raw body for signature verification
  const rawBody = await req.text()

  if (signingKey) {
    const sig =
      req.headers.get('Calendly-Webhook-Signature') ||
      req.headers.get('Calendly-Webhook-Signature'.toLowerCase()) ||
      req.headers.get('X-Calendly-Signature') ||
      ''
    if (!sig || !verifySignature(rawBody, sig, signingKey)) {
      return new NextResponse('Invalid signature', { status: 401 })
    }
  }

  let body: any
  try {
    body = JSON.parse(rawBody)
  } catch (e) {
    return new NextResponse('Invalid JSON', { status: 400 })
  }

  const eventType: string = body.event || body.type || 'unknown'
  const payload = body.payload || body

  // Extract common fields safely
  const invitee = payload.invitee || {}
  const event = payload.event || {}

  // Optional filter by event type URI if configured
  const allowedEventType = process.env.CALENDLY_EVENT_TYPE_URI
  const eventTypeUri = (payload.event_type || payload.event_type_uri || event.event_type || event.event_type_uri || '').toString()

  if (allowedEventType && eventTypeUri && !eventTypeUri.includes(allowedEventType)) {
    // Ignore events that do not match the configured event type
    return NextResponse.json({ ok: true, ignored: true })
  }

  const data = {
    invitee_email: invitee.email ?? null,
    invitee_name: invitee.name ?? null,
    invitee_timezone: invitee.timezone ?? null,
    event_name: event.name ?? null,
    start_time: event.start_time ? new Date(event.start_time).toISOString() : null,
    end_time: event.end_time ? new Date(event.end_time).toISOString() : null,
    calendly_event_uri: event.uri ?? payload.event_uri ?? null,
    calendly_invitee_uri: invitee.uri ?? payload.invitee_uri ?? null,
    status: eventType === 'invitee.canceled' ? 'canceled' : 'created',
    canceled_at:
      eventType === 'invitee.canceled' && payload.cancellation && payload.cancellation.canceled_at
        ? new Date(payload.cancellation.canceled_at).toISOString()
        : null,
    cancel_reason:
      eventType === 'invitee.canceled' && payload.cancellation
        ? payload.cancellation.reason ?? null
        : null,
    created_via: 'calendly',
    updated_at: new Date().toISOString(),
  }

  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from('calendly_leads')
      .upsert(data, { onConflict: 'calendly_invitee_uri' })

    if (error) {
      console.error('Supabase insert error:', error)
      return new NextResponse('DB error', { status: 500 })
    }
  } catch (e) {
    console.error('Webhook processing error:', e)
    return new NextResponse('Server error', { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

export function GET() {
  // Simple health check endpoint
  return NextResponse.json({ ok: true })
}
