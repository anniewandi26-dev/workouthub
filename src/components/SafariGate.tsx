import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { publicUrl } from '../utils/publicUrl'
import { isSafariBrowser, tryOpenInSafari } from '../utils/safari'

/**
 * Non-Safari users: prefer hand-off to Safari; if still here, show a blocking
 * fitness-themed modal (IP language). Safari users never see it.
 */
export function SafariGate() {
  const { t, ready, dir } = useI18n()
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    if (isSafariBrowser()) {
      setBlocked(false)
      return
    }

    setBlocked(true)
    // Prefer Safari first (iOS in-app browsers / other apps)
    tryOpenInSafari()
  }, [])

  if (!blocked) return null

  return (
    <div
      className="safari-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="safari-gate-title"
      dir={dir}
    >
      <div
        className="safari-gate-bg"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(160deg, rgba(7, 17, 31, 0.88) 0%, rgba(7, 17, 31, 0.72) 45%, rgba(7, 17, 31, 0.9) 100%), url(${publicUrl('images/ad-billboard.jpg?v=4')})`,
        }}
      />
      <div className="safari-gate-panel">
        <p className="safari-gate-kicker">WorkoutHub</p>
        <h2 id="safari-gate-title" className="safari-gate-title">
          {ready ? t('safariTitle') : 'Open in Safari'}
        </h2>
        <p className="safari-gate-body">
          {ready
            ? t('safariBody')
            : 'Using Safari to open this page gives smoother control and a richer, more colorful fitness viewing experience.'}
        </p>
        <p className="safari-gate-note">
          {ready
            ? t('safariNote')
            : 'Once opened in Safari, this site runs normally. This notice stays hidden in Safari.'}
        </p>
        <button type="button" className="safari-gate-btn" onClick={() => tryOpenInSafari()}>
          {ready ? t('safariCta') : 'Open with Safari'}
        </button>
      </div>
    </div>
  )
}
