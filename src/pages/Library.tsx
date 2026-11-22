import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MediaCard } from '../components/MediaCard'
import { audienceFilters, categories, regionFilters } from '../data/content'
import { useI18n } from '../i18n'
import { useLibrary } from '../library'

export function Library() {
  const { t } = useI18n()
  const { items } = useLibrary()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [region, setRegion] = useState('all')
  const [audience, setAudience] = useState('all')

  const catLabel = (id: string) => t(`cat_${id}` as 'cat_all')
  const regionLabel = (id: string) => t(`region_${id}` as 'region_all')
  const audienceLabel = (id: string) => t(`audience_${id}` as 'audience_all')

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return items.filter((item) => {
      if (cat !== 'all' && item.category !== cat) return false
      if (region !== 'all' && item.region !== region) return false
      if (audience !== 'all' && item.audience !== audience) return false
      if (!query) return true
      const hay = [
        item.titleZh,
        item.titleEn,
        item.descZh,
        item.descEn,
        item.instructor,
        ...item.tags,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(query)
    })
  }, [items, q, cat, region, audience])

  return (
    <div className="app-shell" style={{ paddingTop: '1.75rem' }}>
      <section className="section">
        <div className="section-head">
          <div>
            <h2>{t('library')}</h2>
            <p>{t('tagline')}</p>
          </div>
          <Link to="/upload" className="btn btn-dark">
            {t('navUpload')}
          </Link>
        </div>

        <div className="toolbar">
          <label className="search-box">
            <span aria-hidden>⌕</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('search')}
              type="search"
            />
          </label>

          <div className="filter-rows">
            <div className="filter-row">
              <span className="filter-label">{t('category')}</span>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`chip ${cat === c.id ? 'active' : ''}`}
                  onClick={() => setCat(c.id)}
                >
                  {catLabel(c.id)}
                </button>
              ))}
            </div>
            <div className="filter-row">
              <span className="filter-label">{t('region')}</span>
              {regionFilters.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={`chip ${region === r.id ? 'active' : ''}`}
                  onClick={() => setRegion(r.id)}
                >
                  {regionLabel(r.id)}
                </button>
              ))}
            </div>
            <div className="filter-row">
              <span className="filter-label">{t('audience')}</span>
              {audienceFilters.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className={`chip ${audience === a.id ? 'active' : ''}`}
                  onClick={() => setAudience(a.id)}
                >
                  {audienceLabel(a.id)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="result-count">
          {filtered.length} {t('results')}
        </p>

        {filtered.length === 0 ? (
          <div className="empty">{t('empty')}</div>
        ) : (
          <div className="card-grid">
            {filtered.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
