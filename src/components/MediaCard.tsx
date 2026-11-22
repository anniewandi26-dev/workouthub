import { Link } from 'react-router-dom'
import type { FitnessItem } from '../data/content'
import { formatViews } from '../data/content'
import { getItemCopy } from '../data/localize'
import { useFavorites } from '../favorites'
import { useI18n } from '../i18n'
import { CoverImage } from './CoverImage'

export function MediaCard({
  item,
  showRemove,
}: {
  item: FitnessItem
  showRemove?: boolean
}) {
  const { lang, t } = useI18n()
  const { title, desc } = getItemCopy(item, lang)
  const { has, toggle, remove } = useFavorites()
  const saved = has(item.id)

  return (
    <article className={`media-card ${saved ? 'is-saved' : ''}`}>
      <Link
        to={`/watch/${item.id}`}
        className="media-card-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="thumb">
          <CoverImage src={item.cover} alt={title} className="thumb-img" />
          <div className="shade" />
          <div className="badges">
            <span className="pill">{t(item.region)}</span>
            <span className="pill">{item.duration}</span>
            {item.uploaded && <span className="pill pill-new">{t('uploadedBadge')}</span>}
          </div>
        </div>
        <div className="card-body">
          <h3>{title}</h3>
          <p className="card-desc">{desc}</p>
          <div className="card-foot">
            <span>{item.instructor}</span>
            <span>
              {formatViews(item.views)} {t('views')}
            </span>
          </div>
        </div>
      </Link>

      <button
        type="button"
        className={`save-chip ${saved ? 'is-on' : ''}`}
        aria-pressed={saved}
        aria-label={saved ? t('saved') : t('save')}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (showRemove) remove(item.id)
          else toggle(item.id)
        }}
      >
        {showRemove ? t('unsave') : saved ? t('saved') : t('save')}
      </button>
    </article>
  )
}
