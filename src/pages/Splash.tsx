import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LanguagePicker } from '../components/LanguagePicker'
import { useI18n } from '../i18n'
import { getLangMeta } from '../i18n/languages'
import { publicUrl } from '../utils/publicUrl'

const WAIT_MS = 5000

export function Splash() {
  const { t, ready, lang, mode, markEntered, resetEntered } = useI18n()
  const navigate = useNavigate()
  const meta = getLangMeta(lang)
  const [progress, setProgress] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    resetEntered()
  }, [resetEntered])

  useEffect(() => {
    if (!ready || startedRef.current) return
    startedRef.current = true
    setProgress(0)

    const started = Date.now()
    const tick = window.setInterval(() => {
      setProgress(Math.min(100, ((Date.now() - started) / WAIT_MS) * 100))
    }, 100)

    const timer = window.setTimeout(() => {
      window.clearInterval(tick)
      setProgress(100)
      markEntered()
      navigate('/home', { replace: true })
    }, WAIT_MS)

    return () => {
      window.clearInterval(tick)
      window.clearTimeout(timer)
      startedRef.current = false
    }
  }, [ready, markEntered, navigate])

  return (
    <div className="ad-gate">
      <img
        className="ad-gate-photo"
        src={publicUrl('images/ad-billboard.jpg?v=4')}
        alt=""
        decoding="sync"
        fetchPriority="high"
      />

      <header className="ad-gate-top">
        <p className="ad-gate-ip">
          {!ready
            ? t('splashLoading')
            : mode === 'auto'
              ? `${t('ipMatched')} · ${meta.native}`
              : `${t('manualLang')} · ${meta.native}`}
        </p>
        <LanguagePicker compact className="ad-gate-lang" />
      </header>

      <main className="ad-gate-stage">
        <div className="ad-billboard">
          <p className="ad-billboard-sign">{t('adSign')}</p>
          <h1 className="ad-billboard-name">
            Workout<span>Hub</span>
          </h1>
          <p className="ad-billboard-tag">{t('splashSub')}</p>
        </div>

        <div className="ad-gate-actions" aria-live="polite">
          <div className="ad-gate-btn ad-gate-btn-static">
            <span className="ad-gate-btn-fill" style={{ width: `${progress}%` }} />
            <span className="ad-gate-btn-label">
              {!ready ? t('splashLoading') : t('adPreparing')}
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
