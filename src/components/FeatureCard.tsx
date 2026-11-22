import { Link } from 'react-router-dom'
import type { FitnessItem } from '../data/content'
import { getItemCopy } from '../data/localize'
import { useI18n } from '../i18n'
import { CoverImage } from './CoverImage'

export function FeatureCard({ item }: { item: FitnessItem }) {
  const { lang, t } = useI18n()
  const { title } = getItemCopy(item, lang)

  return (
    <Link
      to={`/watch/${item.id}`}
      className="feature-card"
      target="_blank"
      rel="noopener noreferrer"
    >
      <CoverImage src={item.cover} alt={title} className="bg" />
      <div className="feature-shade" />
      <div className="meta-row">
        <span className="pill">{t(item.region)}</span>
        <span className="pill">{t(item.level)}</span>
        <span className="pill">{item.duration}</span>
      </div>
      <h3>{title}</h3>
      <p className="muted">{item.instructor}</p>
    </Link>
  )
}
