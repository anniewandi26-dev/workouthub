import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { CoverImage } from '../components/CoverImage'
import { MediaCard } from '../components/MediaCard'
import { formatViews } from '../data/content'
import { getItemCopy, getLocalizedDetails } from '../data/localize'
import { useFavorites } from '../favorites'
import { useI18n } from '../i18n'
import { useLibrary } from '../library'

export function Watch() {
  const { id } = useParams()
  const { lang, t } = useI18n()
  const navigate = useNavigate()
  const { items, removeItem } = useLibrary()
  const { has, toggle } = useFavorites()
  const item = items.find((x) => x.id === id)

  if (!item) return <Navigate to="/library" replace />

  const { title, desc } = getItemCopy(item, lang)
  const details = getLocalizedDetails(item, lang, t)
  const related = items
    .filter(
      (x) =>
        x.id !== item.id &&
        (x.category === item.category || x.region === item.region),
    )
    .slice(0, 8)
  const saved = has(item.id)

  return (
    <div className="app-shell" style={{ paddingTop: '1.5rem' }}>
      <p style={{ margin: '0 0 1rem' }}>
        <Link to="/library" style={{ color: 'var(--muted)', fontWeight: 500 }}>
          ← {t('back')}
        </Link>
      </p>

      <div className="detail-layout">
        <div className="player">
          <CoverImage src={item.cover} alt={title} className="bg" />
          <div className="player-shade" />
          <button type="button" className="play-btn" aria-label={t('watch')}>
            ▶
          </button>
          <p className="player-hint">{t('playerHint')}</p>
        </div>

        <aside className="detail-panel">
          <div className="meta-row">
            <span className="pill ink-pill">{t(item.region)}</span>
            <span className="pill ink-pill">
              {t(item.audience === 'all' ? 'all' : item.audience)}
            </span>
            <span className="pill ink-pill">{t(item.type)}</span>
          </div>
          <h1>{title}</h1>
          <p className="lead">{desc}</p>

          <div className="detail-actions">
            <button type="button" className="btn btn-dark">
              {t('watch')}
            </button>
            <button
              type="button"
              className={`btn btn-outline ${saved ? 'active' : ''}`}
              onClick={() => toggle(item.id)}
            >
              {saved ? t('saved') : t('save')}
            </button>
            {item.uploaded && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  removeItem(item.id)
                  navigate('/library')
                }}
              >
                {t('delete')}
              </button>
            )}
          </div>

          <div className="stats">
            <div className="stat">
              <span className="label">{t('instructor')}</span>
              <span className="value">{item.instructor}</span>
            </div>
            <div className="stat">
              <span className="label">{t('duration')}</span>
              <span className="value">{item.duration}</span>
            </div>
            <div className="stat">
              <span className="label">{t('level')}</span>
              <span className="value">{t(item.level)}</span>
            </div>
            <div className="stat">
              <span className="label">{t('views')}</span>
              <span className="value">{formatViews(item.views)}</span>
            </div>
          </div>

          <h3 style={{ margin: '0 0 0.7rem', fontFamily: 'var(--font-display)' }}>
            {t('chapters')}
          </h3>
          <ul className="chapters">
            {details.steps.map((s, i) => (
              <li key={s.title}>
                <span>
                  {String(i + 1).padStart(2, '0')} · {s.title}
                </span>
                <span>{i === 0 ? '~25%' : i === 1 ? '~55%' : '~20%'}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section className="lesson-body lesson-body-full">
        <h2>{t('detailBody')}</h2>

        <div className="lesson-block">
          <h3>{t('overview')}</h3>
          <p>{details.overview}</p>
        </div>

        <div className="lesson-split">
          <div className="lesson-block">
            <h3>{t('equipment')}</h3>
            <ul className="lesson-chips">
              {details.equipment.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="lesson-block">
            <h3>{t('muscles')}</h3>
            <ul className="lesson-chips">
              {details.muscles.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lesson-block">
          <h3>{t('steps')}</h3>
          <ol className="lesson-steps">
            {details.steps.map((s, i) => (
              <li key={s.title}>
                <strong>
                  {String(i + 1).padStart(2, '0')} · {s.title}
                </strong>
                <p>{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="lesson-block">
          <h3>{t('tips')}</h3>
          <ul className="lesson-tips">
            {details.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="lesson-block schedule">
          <h3>{t('schedule')}</h3>
          <p>{details.schedule}</p>
          {item.calories && (
            <p className="calorie-line">
              {item.calories} · {item.duration} · {item.instructor}
            </p>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <div>
              <h2>{t('related')}</h2>
            </div>
          </div>
          <div className="card-grid">
            {related.map((r) => (
              <MediaCard key={r.id} item={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
