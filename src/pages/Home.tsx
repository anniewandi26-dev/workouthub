import { Link } from 'react-router-dom'
import { FeatureCard } from '../components/FeatureCard'
import { MediaCard } from '../components/MediaCard'
import { useI18n } from '../i18n'
import { useLibrary } from '../library'
import { publicUrl } from '../utils/publicUrl'

export function Home() {
  const { t } = useI18n()
  const { items } = useLibrary()
  const featured = items.filter((i) => i.featured).slice(0, 10)
  const latest = items.slice(0, 12)
  const universalPct = Math.round(
    (items.filter((i) => i.audience === 'all').length / Math.max(items.length, 1)) * 100,
  )

  return (
    <>
      <section className="hero">
        <div
          className="hero-media"
          style={{ backgroundImage: `url(${publicUrl('images/hero-fitness.jpg')})` }}
          aria-hidden
        />
        <div className="app-shell hero-copy">
          <p className="hero-brand">
            Workout<span>Hub</span>
          </p>
          <h1 className="hero-title">{t('heroTitle')}</h1>
          <p className="hero-sub">{t('heroSub')}</p>
          <div className="hero-cta">
            <Link to="/library" className="btn btn-primary">
              {t('browse')}
            </Link>
            <Link to="/upload" className="btn btn-ghost">
              {t('navUpload')}
            </Link>
          </div>
        </div>
      </section>

      <div className="app-shell">
        <div className="home-note">
          <article>
            <strong>{items.length}+</strong>
            <span>{t('statsItems')}</span>
          </article>
          <article>
            <strong>
              {t('west')} / {t('asia')}
            </strong>
            <span>{t('statsRegions')}</span>
          </article>
          <article>
            <strong>{universalPct}%</strong>
            <span>{t('statsAudience')}</span>
          </article>
        </div>

        <section className="section">
          <div className="section-head">
            <div>
              <h2>{t('featured')}</h2>
              <p>{t('tagline')}</p>
            </div>
            <Link to="/library" className="btn btn-outline">
              {t('library')}
            </Link>
          </div>
          <div className="featured-rail">
            {featured.map((item) => (
              <FeatureCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <h2>{t('library')}</h2>
            </div>
            <Link to="/upload" className="btn btn-dark">
              {t('navUpload')}
            </Link>
          </div>
          <div className="card-grid">
            {latest.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
