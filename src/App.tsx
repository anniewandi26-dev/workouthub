import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Nav } from './components/Nav'
import { SafariGate } from './components/SafariGate'
import { FavoritesProvider } from './favorites'
import { I18nProvider, useI18n } from './i18n'
import { LibraryProvider } from './library'
import { Home } from './pages/Home'
import { Library } from './pages/Library'
import { Saved } from './pages/Saved'
import { Splash } from './pages/Splash'
import { Upload } from './pages/Upload'
import { Watch } from './pages/Watch'

function AppRoutes() {
  const { t, resetEntered } = useI18n()
  const location = useLocation()
  const atGate = location.pathname === '/' || location.pathname === ''

  // Every visit to "/" restarts the ad gate (no remembered enter state)
  useEffect(() => {
    if (atGate) resetEntered()
  }, [atGate, resetEntered])

  // Splash only on "/". Deep links like /watch/:id open in a new tab without the gate.
  if (atGate) {
    return (
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="app-shell">{t('footer')}</div>
      </footer>
    </>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <FavoritesProvider>
        <LibraryProvider>
          <HashRouter>
            <SafariGate />
            <AppRoutes />
          </HashRouter>
        </LibraryProvider>
      </FavoritesProvider>
    </I18nProvider>
  )
}
