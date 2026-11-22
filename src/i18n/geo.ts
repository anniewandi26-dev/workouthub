import { langFromCountry, type LangCode } from './languages'

export type GeoResult = {
  lang: LangCode
  country: string | null
  city: string | null
  source: 'ip' | 'fallback'
}

/**
 * Detect language from public IP geolocation.
 * Uses ipapi.co (no key) then falls back to browser locale / English.
 */
export async function detectLangFromIp(signal?: AbortSignal): Promise<GeoResult> {
  try {
    const res = await fetch('https://ipapi.co/json/', {
      signal,
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) throw new Error(`geo ${res.status}`)
    const data = (await res.json()) as {
      country_code?: string
      city?: string
      error?: boolean
    }
    if (data.error || !data.country_code) throw new Error('geo empty')
    return {
      lang: langFromCountry(data.country_code),
      country: data.country_code,
      city: data.city ?? null,
      source: 'ip',
    }
  } catch {
    // Secondary free endpoint
    try {
      const res = await fetch('https://ipwho.is/', { signal })
      if (!res.ok) throw new Error(`geo2 ${res.status}`)
      const data = (await res.json()) as {
        success?: boolean
        country_code?: string
        city?: string
      }
      if (!data.success || !data.country_code) throw new Error('geo2 empty')
      return {
        lang: langFromCountry(data.country_code),
        country: data.country_code,
        city: data.city ?? null,
        source: 'ip',
      }
    } catch {
      const nav = typeof navigator !== 'undefined' ? navigator.language : 'en'
      const short = nav.toLowerCase()
      let fallback: LangCode = 'en'
      if (short.startsWith('zh-tw') || short.startsWith('zh-hk')) fallback = 'zh-TW'
      else if (short.startsWith('zh')) fallback = 'zh'
      else if (short.startsWith('ja')) fallback = 'ja'
      else if (short.startsWith('ko')) fallback = 'ko'
      else if (short.startsWith('es')) fallback = 'es'
      else if (short.startsWith('fr')) fallback = 'fr'
      else if (short.startsWith('de')) fallback = 'de'
      else if (short.startsWith('pt-br')) fallback = 'pt-BR'
      else if (short.startsWith('pt')) fallback = 'pt'
      else if (short.startsWith('ru')) fallback = 'ru'
      else if (short.startsWith('ar')) fallback = 'ar'
      else if (short.startsWith('hi')) fallback = 'hi'
      else if (short.startsWith('th')) fallback = 'th'
      else if (short.startsWith('vi')) fallback = 'vi'
      else if (short.startsWith('id')) fallback = 'id'
      else if (short.startsWith('tr')) fallback = 'tr'
      return {
        lang: fallback,
        country: null,
        city: null,
        source: 'fallback',
      }
    }
  }
}
