/** True only for Apple Safari (iOS / macOS), not Chrome / Edge / Firefox / in-app WebViews. */
export function isSafariBrowser(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent

  const isCriOS = /CriOS/i.test(ua)
  const isFxiOS = /FxiOS/i.test(ua)
  const isEdgiOS = /EdgiOS/i.test(ua)
  const isOPiOS = /OPiOS|OPT\//i.test(ua)
  const isChrome = /Chrome|Chromium|Edg\//i.test(ua) && !/EdgA/i.test(ua)
  const isAndroid = /Android/i.test(ua)
  const isSamsung = /SamsungBrowser/i.test(ua)
  const isWeChat = /MicroMessenger/i.test(ua)
  const isFB = /FBAN|FBAV|Instagram/i.test(ua)

  if (isCriOS || isFxiOS || isEdgiOS || isOPiOS || isAndroid || isSamsung || isWeChat || isFB) {
    return false
  }

  // Desktop Chrome/Edge/Firefox report Safari in UA token — exclude them
  if (isChrome || /Firefox\//i.test(ua)) return false

  // Real Safari: has Safari/ and Version/ (iOS & macOS)
  const looksSafari = /Safari/i.test(ua) && /Version\//i.test(ua)
  const isAppleMobile = /iPhone|iPad|iPod/i.test(ua)
  const isMac = /Macintosh/i.test(ua)

  return looksSafari && (isAppleMobile || isMac)
}

/** Build x-safari-http(s)://… URL so iOS can hand off to Safari (http & https). */
export function buildSafariOpenUrl(href = typeof location !== 'undefined' ? location.href : ''): string {
  const url = new URL(href, typeof location !== 'undefined' ? location.origin : 'https://localhost')
  const scheme = url.protocol === 'http:' ? 'x-safari-http' : 'x-safari-https'
  return `${scheme}://${url.host}${url.pathname}${url.search}${url.hash}`
}

export function tryOpenInSafari(): void {
  const target = buildSafariOpenUrl()
  try {
    const a = document.createElement('a')
    a.href = target
    a.rel = 'noopener'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()
  } catch {
    /* ignore */
  }
  try {
    window.location.href = target
  } catch {
    /* ignore */
  }
}
