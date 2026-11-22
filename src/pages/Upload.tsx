import { useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  type Audience,
  type Level,
  type MediaType,
  type Region,
} from '../data/content'
import { useI18n } from '../i18n'
import type { MessageKey } from '../i18n/messages'
import { fileToCoverDataUrl, useLibrary } from '../library'

const CAT_IDS = [
  'strength',
  'cardio',
  'yoga',
  'pilates',
  'hiit',
  'mobility',
  'martial',
  'home',
] as const

const REGION_IDS = ['west', 'asia', 'global'] as const
const AUDIENCE_IDS = ['all', 'men', 'women'] as const

export function Upload() {
  const { t } = useI18n()
  const { addItem } = useLibrary()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [instructor, setInstructor] = useState('')
  const [duration, setDuration] = useState('20 min')
  const [category, setCategory] = useState<(typeof CAT_IDS)[number]>('strength')
  const [region, setRegion] = useState<Region>('global')
  const [audience, setAudience] = useState<Audience>('all')
  const [level, setLevel] = useState<Level>('beginner')
  const [type, setType] = useState<MediaType>('video')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function onPick(file?: File | null) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError(t('errBadImage'))
      return
    }
    setError('')
    setBusy(true)
    try {
      const data = await fileToCoverDataUrl(file)
      setPreview(data)
    } catch {
      setError(t('errProcess'))
    } finally {
      setBusy(false)
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!preview) {
      setError(t('errNeedImage'))
      return
    }
    if (!title.trim()) {
      setError(t('errNeedTitle'))
      return
    }

    const id = `up-${Date.now()}`
    const cleanTitle = title.trim()
    const cleanDesc = desc.trim() || t('defaultDesc')

    addItem({
      id,
      titleZh: cleanTitle,
      titleEn: cleanTitle,
      descZh: cleanDesc,
      descEn: cleanDesc,
      category,
      region,
      audience,
      level,
      type,
      duration: duration.trim() || '20 min',
      tags: ['upload', 'user'],
      instructor: instructor.trim() || t('defaultMe'),
      cover: preview,
      accent: '#c8f000',
      views: 1,
      featured: true,
      uploaded: true,
    })

    navigate(`/watch/${id}`)
  }

  return (
    <div className="app-shell upload-page">
      <section className="upload-hero">
        <p className="upload-kicker">{t('uploadKicker')}</p>
        <h1>{t('navUpload')}</h1>
        <p className="upload-lead">{t('uploadHint')}</p>
      </section>

      <form className="upload-layout" onSubmit={onSubmit}>
        <div
          className={`dropzone ${preview ? 'has-preview' : ''}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            void onPick(e.dataTransfer.files?.[0])
          }}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => void onPick(e.target.files?.[0])}
          />
          {preview ? (
            <>
              <img src={preview} alt="" className="drop-preview" />
              <span className="drop-change">{t('changePhoto')}</span>
            </>
          ) : (
            <div className="drop-empty">
              <span className="drop-icon" aria-hidden>
                +
              </span>
              <strong>{t('uploadPhoto')}</strong>
              <span>{t('uploadDrag')}</span>
            </div>
          )}
        </div>

        <div className="upload-fields">
          <label>
            <span>{t('fieldTitle')}</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('titlePlaceholder')}
              required
            />
          </label>
          <label>
            <span>{t('fieldDesc')}</span>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              placeholder={t('descPlaceholder')}
            />
          </label>

          <div className="upload-grid">
            <label>
              <span>{t('instructor')}</span>
              <input value={instructor} onChange={(e) => setInstructor(e.target.value)} />
            </label>
            <label>
              <span>{t('duration')}</span>
              <input value={duration} onChange={(e) => setDuration(e.target.value)} />
            </label>
            <label>
              <span>{t('category')}</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as (typeof CAT_IDS)[number])}
              >
                {CAT_IDS.map((id) => (
                  <option key={id} value={id}>
                    {t(`cat_${id}` as MessageKey)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>{t('region')}</span>
              <select value={region} onChange={(e) => setRegion(e.target.value as Region)}>
                {REGION_IDS.map((id) => (
                  <option key={id} value={id}>
                    {t(`region_${id}` as MessageKey)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>{t('audience')}</span>
              <select value={audience} onChange={(e) => setAudience(e.target.value as Audience)}>
                {AUDIENCE_IDS.map((id) => (
                  <option key={id} value={id}>
                    {t(`audience_${id}` as MessageKey)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>{t('level')}</span>
              <select value={level} onChange={(e) => setLevel(e.target.value as Level)}>
                <option value="beginner">{t('beginner')}</option>
                <option value="intermediate">{t('intermediate')}</option>
                <option value="advanced">{t('advanced')}</option>
              </select>
            </label>
            <label>
              <span>{t('type')}</span>
              <select value={type} onChange={(e) => setType(e.target.value as MediaType)}>
                <option value="video">{t('video')}</option>
                <option value="guide">{t('guide')}</option>
                <option value="routine">{t('routine')}</option>
              </select>
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn-primary upload-submit" disabled={busy}>
            {busy ? t('processing') : t('publish')}
          </button>
        </div>
      </form>
    </div>
  )
}
