declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: Record<string, unknown>) => void
  }
}

export function trackAddToCart(params: { value: number; currency?: string; contentIds?: string[]; contentType?: string }) {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', 'AddToCart', {
    value: params.value,
    currency: (params.currency || 'USD').toUpperCase(),
    content_ids: params.contentIds || [],
    content_type: params.contentType || 'product',
  })
}

export function trackInitiateCheckout(params: { value: number; currency?: string; numItems?: number }) {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', 'InitiateCheckout', {
    value: params.value,
    currency: (params.currency || 'USD').toUpperCase(),
    num_items: params.numItems ?? 0,
  })
}

export function trackPurchase(params: { value: number; currency?: string }) {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', 'Purchase', {
    value: params.value,
    currency: (params.currency || 'USD').toUpperCase(),
  })
}

export function trackViewContent(params: { contentIds?: string[]; contentName?: string; contentType?: string; value?: number }) {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', 'ViewContent', {
    content_ids: params.contentIds || [],
    content_name: params.contentName,
    content_type: params.contentType || 'product',
    ...(params.value != null && { value: params.value }),
  })
}
