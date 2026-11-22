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
/** Manual override only for this browser tab/session — each fresh open follows IP again */
const LANG_MODE_SESSION = 'workouthub-lang-mode-session'

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

function readSessionManual(): boolean {
  try {
    return sessionStorage.getItem(LANG_MODE_SESSION) === 'manual'
  } catch {
    return false
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangCode>(() => readStoredLang() ?? 'en')
  const [mode, setMode] = useState<'auto' | 'manual'>(() =>
    readSessionManual() ? 'manual' : 'auto',
  )
  const [ready, setReady] = useState(false)
  const [geoCountry, setGeoCountry] = useState<string | null>(null)
  const [geoCity, setGeoCity] = useState<string | null>(null)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const ctrl = new AbortController()
    // Drop legacy sticky manual flag so phones follow IP again
    try {
      localStorage.removeItem('forma-lang-mode')
    } catch {
      /* ignore */
    }

    ;(async () => {
      const sessionManual = readSessionManual()
      const storedLang = readStoredLang()

      // Session manual: keep user pick for this tab only
      if (sessionManual && storedLang) {
        setMode('manual')
        setLang(storedLang)
        setReady(true)
        try {
          const geo = await detectLangFromIp(ctrl.signal)
          if (ctrl.signal.aborted) return
          setGeoCountry(geo.country)
          setGeoCity(geo.city)
        } catch {
          /* ignore */
        }
        return
      }

      // Auto (default): always match language to IP on open — including phones
      const geo = await detectLangFromIp(ctrl.signal)
      if (ctrl.signal.aborted) return
      setGeoCountry(geo.country)
      setGeoCity(geo.city)
      setMode('auto')
      setLang(geo.lang)
      try {
        localStorage.setItem(LANG_KEY, geo.lang)
        sessionStorage.setItem(LANG_MODE_SESSION, 'auto')
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
      sessionStorage.setItem(LANG_MODE_SESSION, 'manual')
    } catch {
      /* ignore */
    }
  }, [])

  const useAutoIp = useCallback(() => {
    setMode('auto')
    try {
      sessionStorage.setItem(LANG_MODE_SESSION, 'auto')
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
