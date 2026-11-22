import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useI18n, type LangCode } from '../i18n'
import { getLangMeta } from '../i18n/languages'

type Props = {
  compact?: boolean
  className?: string
}

export function LanguagePicker({ compact, className }: Props) {
  const { lang, setLangManual, useAutoIp, mode, t, languages, geoCountry, ready } = useI18n()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const panelId = useId()
  const searchRef = useRef<HTMLInputElement>(null)
  const meta = getLangMeta(lang)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return languages
    return languages.filter(
      (l) =>
        l.native.toLowerCase().includes(q) ||
        l.name.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q),
    )
  }, [languages, query])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const tId = window.setTimeout(() => searchRef.current?.focus(), 50)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      window.clearTimeout(tId)
    }
  }, [open])

  function pick(code: LangCode) {
    setLangManual(code)
    setOpen(false)
    setQuery('')
  }

  return (
    <div className={`lang-picker ${compact ? 'compact' : ''} ${className ?? ''}`}>
      {!compact && (
        <div className="lang-picker-head">
          <span>{t('manualLang')}</span>
          {ready && (
            <button type="button" className="chip" onClick={useAutoIp}>
              {t('detectLang')}
              {geoCountry ? ` (${geoCountry})` : ''}
              {mode === 'auto' ? ' ✓' : ''}
            </button>
          )}
        </div>
      )}

      <button
        type="button"
        className="lang-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        <span className="lang-trigger-label">{meta.native}</span>
        <span className="lang-trigger-meta">{meta.name}</span>
        <span className="lang-trigger-chevron" aria-hidden />
      </button>

      {open && (
        <div className="lang-sheet" role="presentation">
          <button
            type="button"
            className="lang-sheet-backdrop"
            aria-label="Close"
            onClick={() => {
              setOpen(false)
              setQuery('')
            }}
          />
          <div
            id={panelId}
            className="lang-sheet-panel"
            role="dialog"
            aria-modal="true"
            aria-label={t('language')}
          >
            <div className="lang-sheet-handle" aria-hidden />
            <header className="lang-sheet-head">
              <h2>{t('language')}</h2>
              <button
                type="button"
                className="lang-sheet-close"
                onClick={() => {
                  setOpen(false)
                  setQuery('')
                }}
              >
                ✕
              </button>
            </header>

            {ready && (
              <button type="button" className="lang-sheet-auto" onClick={useAutoIp}>
                {t('detectLang')}
                {geoCountry ? ` · ${geoCountry}` : ''}
                {mode === 'auto' ? ' ✓' : ''}
              </button>
            )}

            <input
              ref={searchRef}
              className="lang-sheet-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`${t('language')}…`}
              enterKeyHint="search"
            />

            <ul className="lang-sheet-list">
              {filtered.map((l) => {
                const active = l.code === lang
                return (
                  <li key={l.code}>
                    <button
                      type="button"
                      className={`lang-sheet-item ${active ? 'is-active' : ''}`}
                      onClick={() => pick(l.code)}
                    >
                      <span className="lang-sheet-native">{l.native}</span>
                      <span className="lang-sheet-name">{l.name}</span>
                      {active && <span className="lang-sheet-check" aria-hidden>✓</span>}
                    </button>
                  </li>
                )
              })}
              {filtered.length === 0 && (
                <li className="lang-sheet-empty">{t('empty')}</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
