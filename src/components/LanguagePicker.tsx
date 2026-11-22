import { useI18n } from '../i18n'

type Props = {
  compact?: boolean
  className?: string
}

export function LanguagePicker({ compact, className }: Props) {
  const { lang, setLangManual, useAutoIp, mode, t, languages, geoCountry, ready } = useI18n()

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
      <label className="lang-select-wrap">
        <span className="sr-only">{t('language')}</span>
        <select
          value={lang}
          onChange={(e) => setLangManual(e.target.value as typeof lang)}
          aria-label={t('language')}
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.native} · {l.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
