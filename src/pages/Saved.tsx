import { Link } from 'react-router-dom'
import { MediaCard } from '../components/MediaCard'
import { useFavorites } from '../favorites'
import { useI18n } from '../i18n'
import { useLibrary } from '../library'

export function Saved() {
  const { t } = useI18n()
  const { saved, clear, count } = useFavorites()
  const { items } = useLibrary()
  const list = items.filter((i) => saved.has(i.id))

  return (
    <div className="app-shell saved-page">
      <section className="saved-hero">
        <div>
          <p className="saved-kicker">{t('savedKicker')}</p>
          <h1>{t('navSaved')}</h1>
          <p className="saved-lead">
            {count > 0 ? `${count} ${t('results')}` : t('savedHint')}
          </p>
        </div>
        {count > 0 && (
          <button type="button" className="btn btn-outline" onClick={clear}>
            {t('clearSaved')}
          </button>
        )}
      </section>

      {list.length === 0 ? (
        <div className="saved-empty">
          <div className="saved-empty-card">
            <span className="saved-empty-mark" aria-hidden>
              ♥
            </span>
            <h2>{t('savedEmptyTitle')}</h2>
            <p>{t('savedEmptyBody')}</p>
            <Link to="/library" className="btn btn-primary">
              {t('browseLibrary')}
            </Link>
          </div>
        </div>
      ) : (
        <div className="card-grid">
          {list.map((item) => (
            <MediaCard key={item.id} item={item} showRemove />
          ))}
        </div>
      )}
    </div>
  )
}
