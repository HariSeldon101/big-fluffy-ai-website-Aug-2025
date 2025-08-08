// Utilities for Calendly embeds and tracking

const TRACKING_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'ref',
  'gclid',
  'fbclid',
]

export function mergeTrackingParams(baseUrl: string, search: string): string {
  try {
    const url = new URL(baseUrl)
    const incoming = new URLSearchParams(search)

    for (const key of TRACKING_KEYS) {
      const value = incoming.get(key)
      if (value) url.searchParams.set(key, value)
    }

    return url.toString()
  } catch {
    return baseUrl
  }
}

export function withCalendlyBranding(
  baseUrl: string,
  opts?: { primaryColor?: string; backgroundColor?: string; textColor?: string }
): string {
  try {
    const url = new URL(baseUrl)
    const primary = (opts?.primaryColor || '#7c3aed').replace('#', '')
    url.searchParams.set('primary_color', primary)

    if (opts?.backgroundColor) {
      url.searchParams.set('background_color', opts.backgroundColor.replace('#', ''))
    }
    if (opts?.textColor) {
      url.searchParams.set('text_color', opts.textColor.replace('#', ''))
    }
    return url.toString()
  } catch {
    return baseUrl
  }
}
