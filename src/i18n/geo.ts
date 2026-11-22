import { langFromCountry, type LangCode } from './languages'

export type GeoResult = {
  lang: LangCode
  country: string | null
  city: string | null
  source: 'ip' | 'fallback'
}

function localeFallback(): LangCode {
  const nav = typeof navigator !== 'undefined' ? navigator.language : 'en'
  const short = nav.toLowerCase()
  if (short.startsWith('zh-tw') || short.startsWith('zh-hk') || short.startsWith('zh-mo')) return 'zh-TW'
  if (short.startsWith('zh')) return 'zh'
  if (short.startsWith('ja')) return 'ja'
  if (short.startsWith('ko')) return 'ko'
  if (short.startsWith('es')) return 'es'
  if (short.startsWith('fr')) return 'fr'
  if (short.startsWith('de')) return 'de'
  if (short.startsWith('it')) return 'it'
  if (short.startsWith('pt-br')) return 'pt-BR'
  if (short.startsWith('pt')) return 'pt'
  if (short.startsWith('ru')) return 'ru'
  if (short.startsWith('ar')) return 'ar'
  if (short.startsWith('hi')) return 'hi'
  if (short.startsWith('th')) return 'th'
  if (short.startsWith('vi')) return 'vi'
  if (short.startsWith('id')) return 'id'
  if (short.startsWith('ms') || short.startsWith('me-my')) return 'ms'
  if (short.startsWith('tr')) return 'tr'
  if (short.startsWith('tl') || short.startsWith('fil')) return 'tl'
  if (short.startsWith('pl')) return 'pl'
  if (short.startsWith('nl')) return 'nl'
  return 'en'
}

function aborted(signal?: AbortSignal) {
  return Boolean(signal?.aborted)
}

async function fromGeoJs(signal?: AbortSignal): Promise<GeoResult> {
  const res = await fetch('https://get.geojs.io/v1/ip/geo.json', {
    signal,
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`geojs ${res.status}`)
  const data = (await res.json()) as {
    country_code?: string
    city?: string
  }
  if (!data.country_code) throw new Error('geojs empty')
  return {
    lang: langFromCountry(data.country_code),
    country: data.country_code.toUpperCase(),
    city: data.city ?? null,
    source: 'ip',
  }
}

async function fromIpWho(signal?: AbortSignal): Promise<GeoResult> {
  const res = await fetch('https://ipwho.is/', { signal, cache: 'no-store' })
  if (!res.ok) throw new Error(`ipwho ${res.status}`)
  const data = (await res.json()) as {
    success?: boolean
    country_code?: string
    city?: string
  }
  if (!data.success || !data.country_code) throw new Error('ipwho empty')
  return {
    lang: langFromCountry(data.country_code),
    country: data.country_code.toUpperCase(),
    city: data.city ?? null,
    source: 'ip',
  }
}

async function fromIpApi(signal?: AbortSignal): Promise<GeoResult> {
  const res = await fetch('https://ipapi.co/json/', {
    signal,
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`ipapi ${res.status}`)
  const data = (await res.json()) as {
    country_code?: string
    city?: string
    error?: boolean
  }
  if (data.error || !data.country_code) throw new Error('ipapi empty')
  return {
    lang: langFromCountry(data.country_code),
    country: data.country_code.toUpperCase(),
    city: data.city ?? null,
    source: 'ip',
  }
}

/** Cloudflare trace — very reliable on mobile / Safari */
async function fromCloudflare(signal?: AbortSignal): Promise<GeoResult> {
  const res = await fetch('https://www.cloudflare.com/cdn-cgi/trace', {
    signal,
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`cf ${res.status}`)
  const text = await res.text()
  const loc = /^loc=(.+)$/m.exec(text)?.[1]?.trim()
  if (!loc || loc === 'XX') throw new Error('cf empty')
  return {
    lang: langFromCountry(loc),
    country: loc.toUpperCase(),
    city: null,
    source: 'ip',
  }
}

/**
 * Detect language from public IP.
 * Tries several free endpoints so phones / Safari / GitHub Pages still work.
 */
export async function detectLangFromIp(signal?: AbortSignal): Promise<GeoResult> {
  if (aborted(signal)) {
    return { lang: localeFallback(), country: null, city: null, source: 'fallback' }
  }

  const providers = [fromGeoJs, fromCloudflare, fromIpWho, fromIpApi]

  for (const provider of providers) {
    if (aborted(signal)) break
    try {
      const result = await provider(signal)
      if (aborted(signal)) break
      return result
    } catch (err) {
      if (aborted(signal) || (err instanceof DOMException && err.name === 'AbortError')) break
      /* try next */
    }
  }

  return {
    lang: localeFallback(),
    country: null,
    city: null,
    source: 'fallback',
  }
}
