import { useEffect, useId, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'
import { LanguagePicker } from './LanguagePicker'

export function Nav() {
  const { t } = useI18n()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="topnav">
      <div className="app-shell topnav-inner">
        <NavLink to="/home" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            Workout<span>Hub</span>
          </span>
          <span className="brand-tag">{t('tagline')}</span>
        </NavLink>

        <nav className="nav-links nav-links-desktop" aria-label="Main">
          <NavLink to="/home" end>
            {t('navHome')}
          </NavLink>
          <NavLink to="/library">{t('navLib')}</NavLink>
          <NavLink to="/upload">{t('navUpload')}</NavLink>
          <NavLink to="/saved">{t('navSaved')}</NavLink>
          <LanguagePicker compact />
        </nav>

        <button
          type="button"
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`nav-backdrop ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <div
        id={panelId}
        className={`nav-drawer ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
      >
        <nav className="nav-drawer-links" aria-label="Mobile">
          <NavLink to="/home" end onClick={() => setOpen(false)}>
            {t('navHome')}
          </NavLink>
          <NavLink to="/library" onClick={() => setOpen(false)}>
            {t('navLib')}
          </NavLink>
          <NavLink to="/upload" onClick={() => setOpen(false)}>
            {t('navUpload')}
          </NavLink>
          <NavLink to="/saved" onClick={() => setOpen(false)}>
            {t('navSaved')}
          </NavLink>
        </nav>
        <div className="nav-drawer-lang">
          <p className="nav-drawer-label">{t('language')}</p>
          <LanguagePicker />
        </div>
      </div>
    </header>
  )
}
