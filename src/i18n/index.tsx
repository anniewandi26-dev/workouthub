import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { detectLangFromIp } from './geo'
import {
  getLangMeta,
  isLangCode,
  LANGUAGES,
  type LangCode,
} from './languages'
import { MESSAGES, type MessageKey } from './messages'

const LANG_KEY = 'forma-lang'
const LANG_MODE_KEY = 'forma-lang-mode' // 'auto' | 'manual'

type I18nCtx = {
  lang: LangCode
  setLangManual: (l: LangCode) => void
  useAutoIp: () => void
  mode: 'auto' | 'manual'
  t: (key: MessageKey) => string
  ready: boolean
  geoCountry: string | null
  geoCity: string | null
  languages: typeof LANGUAGES
  entered: boolean
  markEntered: () => void
  resetEntered: () => void
  dir: 'ltr' | 'rtl'
}

const Ctx = createContext<I18nCtx | null>(null)

function readStoredLang(): LangCode | null {
  try {
    const v = localStorage.getItem(LANG_KEY)
    return v && isLangCode(v) ? v : null
  } catch {
    return null
  }
}

function readMode(): 'auto' | 'manual' {
  try {
    return localStorage.getItem(LANG_MODE_KEY) === 'manual' ? 'manual' : 'auto'
  } catch {
    return 'auto'
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangCode>(() => readStoredLang() ?? 'en')
  const [mode, setMode] = useState<'auto' | 'manual'>(readMode)
  const [ready, setReady] = useState(false)
  const [geoCountry, setGeoCountry] = useState<string | null>(null)
  const [geoCity, setGeoCity] = useState<string | null>(null)
  // Session-only gate: every fresh open of the site starts at the ad screen again
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const ctrl = new AbortController()
    ;(async () => {
      const storedMode = readMode()
      const storedLang = readStoredLang()

      if (storedMode === 'manual' && storedLang) {
        setMode('manual')
        setLang(storedLang)
        setReady(true)
        // Still fetch geo for display, but don't override manual
        try {
          const geo = await detectLangFromIp(ctrl.signal)
          setGeoCountry(geo.country)
          setGeoCity(geo.city)
        } catch {
          /* ignore */
        }
        return
      }

      // Auto: always coordinate with IP on open
      const geo = await detectLangFromIp(ctrl.signal)
      if (ctrl.signal.aborted) return
      setGeoCountry(geo.country)
      setGeoCity(geo.city)
      setMode('auto')
      setLang(geo.lang)
      try {
        localStorage.setItem(LANG_KEY, geo.lang)
        localStorage.setItem(LANG_MODE_KEY, 'auto')
      } catch {
        /* ignore */
      }
      setReady(true)
    })()

    return () => ctrl.abort()
  }, [])

  useEffect(() => {
    const meta = getLangMeta(lang)
    document.documentElement.lang = lang
    document.documentElement.dir = meta.dir ?? 'ltr'
  }, [lang])

  const setLangManual = useCallback((l: LangCode) => {
    setLang(l)
    setMode('manual')
    try {
      localStorage.setItem(LANG_KEY, l)
      localStorage.setItem(LANG_MODE_KEY, 'manual')
    } catch {
      /* ignore */
    }
  }, [])

  const useAutoIp = useCallback(() => {
    setMode('auto')
    try {
      localStorage.setItem(LANG_MODE_KEY, 'auto')
    } catch {
      /* ignore */
    }
    void detectLangFromIp().then((geo) => {
      setGeoCountry(geo.country)
      setGeoCity(geo.city)
      setLang(geo.lang)
      try {
        localStorage.setItem(LANG_KEY, geo.lang)
      } catch {
        /* ignore */
      }
    })
  }, [])

  const markEntered = useCallback(() => {
    setEntered(true)
  }, [])

  const resetEntered = useCallback(() => {
    setEntered(false)
  }, [])

  // Clear any old persistent flag from previous versions
  useEffect(() => {
    try {
      localStorage.removeItem('workouthub-entered-v1')
      localStorage.removeItem('forma-entered-v2')
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo<I18nCtx>(() => {
    const table = MESSAGES[lang] ?? MESSAGES.en
    return {
      lang,
      setLangManual,
      useAutoIp,
      mode,
      t: (key) => table[key] ?? MESSAGES.en[key] ?? key,
      ready,
      geoCountry,
      geoCity,
      languages: LANGUAGES,
      entered,
      markEntered,
      resetEntered,
      dir: getLangMeta(lang).dir ?? 'ltr',
    }
  }, [lang, mode, ready, geoCountry, geoCity, entered, setLangManual, useAutoIp, markEntered, resetEntered])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useI18n outside provider')
  return ctx
}

export type { LangCode, MessageKey }
