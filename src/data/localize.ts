import type { MessageKey } from '../i18n/messages'
import type { LangCode } from '../i18n/languages'
import type { FitnessItem } from './content'
import type { StepBlock } from './details'

type TextPair = { title: string; desc: string }

const PHRASE: Record<string, Partial<Record<LangCode, string>>> = {
  west: {
    en: 'West', zh: '欧美', 'zh-TW': '歐美', ja: '欧米', ko: '서양', es: 'Occidente', fr: 'Occident', de: 'Westen',
    it: 'Occidente', pt: 'Ocidente', 'pt-BR': 'Ocidente', ru: 'Запад', ar: 'الغرب', hi: 'पश्चिम', th: 'ตะวันตก',
    vi: 'Phương Tây', id: 'Barat', ms: 'Barat', tr: 'Batı', pl: 'Zachód', nl: 'Westen', sv: 'Väst',
    da: 'Vest', fi: 'Länsi', no: 'Vest', cs: 'Západ', hu: 'Nyugat', ro: 'Vest', uk: 'Захід',
    el: 'Δύση', he: 'מערב', fa: 'غرب', bn: 'পশ্চিম', ur: 'مغرب', tl: 'Kanluran', sw: 'Magharibi',
  },
  asia: {
    en: 'Asia', zh: '亚洲', 'zh-TW': '亞洲', ja: 'アジア', ko: '아시아', es: 'Asia', fr: 'Asie', de: 'Asien',
    it: 'Asia', pt: 'Ásia', 'pt-BR': 'Ásia', ru: 'Азия', ar: 'آسيا', hi: 'एशिया', th: 'เอเชีย',
    vi: 'Châu Á', id: 'Asia', ms: 'Asia', tr: 'Asya', pl: 'Azja', nl: 'Azië', sv: 'Asien',
    da: 'Asien', fi: 'Aasia', no: 'Asia', cs: 'Asie', hu: 'Ázsia', ro: 'Asia', uk: 'Азія',
    el: 'Ασία', he: 'אסיה', fa: 'آسیا', bn: 'এশিয়া', ur: 'ایشیا', tl: 'Asya', sw: 'Asia',
  },
  fusion: {
    en: 'Fusion', zh: '融合', 'zh-TW': '融合', ja: '融合', ko: '퓨전', es: 'Fusión', fr: 'Fusion', de: 'Fusion',
    id: 'Fusion', ms: 'Fusion', vi: 'Kết hợp', th: 'ฟิวชัน', ru: 'Фьюжн', ar: 'دمج',
  },
}

const CAT: Record<string, Partial<Record<LangCode, string>>> = {
  strength: {
    en: 'Strength', zh: '力量', 'zh-TW': '力量', ja: '筋力', ko: '근력', es: 'Fuerza', fr: 'Force', de: 'Kraft',
    id: 'Kekuatan', ms: 'Kekuatan', vi: 'Sức mạnh', th: 'แรง', ru: 'Сила', it: 'Forza', pt: 'Força', 'pt-BR': 'Força',
  },
  cardio: {
    en: 'Cardio', zh: '有氧', 'zh-TW': '有氧', ja: '有酸素', ko: '유산소', id: 'Kardio', ms: 'Kardio', vi: 'Cardio',
  },
  yoga: {
    en: 'Yoga', zh: '瑜伽', 'zh-TW': '瑜伽', ja: 'ヨガ', ko: '요가', id: 'Yoga', ms: 'Yoga',
  },
  pilates: {
    en: 'Pilates', zh: '普拉提', 'zh-TW': '皮拉提斯', ja: 'ピラティス', ko: '필라테스', id: 'Pilates', ms: 'Pilates',
  },
  hiit: { en: 'HIIT', zh: 'HIIT', 'zh-TW': 'HIIT', id: 'HIIT', ms: 'HIIT', ja: 'HIIT', ko: 'HIIT' },
  mobility: {
    en: 'Mobility', zh: '拉伸康复', 'zh-TW': '拉伸康復', ja: 'モビリティ', ko: '가동성', id: 'Mobilitas', ms: 'Mobiliti',
  },
  martial: {
    en: 'Martial Arts', zh: '武术搏击', 'zh-TW': '武術搏擊', ja: '格闘', ko: '무술', id: 'Beladiri', ms: 'Beladiri',
  },
  home: {
    en: 'Home', zh: '居家', 'zh-TW': '居家', ja: '自宅', ko: '홈', id: 'Rumah', ms: 'Rumah', vi: 'Tại nhà',
  },
}

function pick(map: Partial<Record<LangCode, string>> | undefined, lang: LangCode, fallback: string) {
  return map?.[lang] ?? map?.en ?? fallback
}

/** Never leak CJK into non-Chinese UIs. */
const CJK = /[\u3400-\u9fff]/

const TAG_LABEL: Record<string, Partial<Record<LangCode, string>>> = {
  barbell: { en: 'barbell', zh: '杠铃', 'zh-TW': '槓鈴', id: 'barbel', ms: 'barbel', ja: 'バーベル', ko: '바벨' },
  bodyweight: { en: 'bodyweight', zh: '徒手', 'zh-TW': '徒手', id: 'beban tubuh', ms: 'beban badan', ja: '自重', ko: '맨몸' },
  gym: { en: 'gym', zh: '健身房', 'zh-TW': '健身房', id: 'gym', ms: 'gim' },
  compound: { en: 'compound', zh: '复合动作', 'zh-TW': '複合動作', id: 'majemuk', ms: 'majmuk' },
  apartment: { en: 'apartment', zh: '公寓', 'zh-TW': '公寓', id: 'apartemen', ms: 'apartmen' },
  daily: { en: 'daily', zh: '日常', 'zh-TW': '日常', id: 'harian', ms: 'harian' },
}

export function localizeTag(tag: string, lang: LangCode): string {
  const key = tag.toLowerCase()
  const mapped = TAG_LABEL[key]?.[lang] ?? TAG_LABEL[key]?.en
  if (mapped) return mapped
  // Raw Chinese tags must never surface outside zh / zh-TW
  if (CJK.test(tag) && lang !== 'zh' && lang !== 'zh-TW') {
    if (tag.includes('杠铃') || tag.includes('槓鈴')) return pick(TAG_LABEL.barbell, lang, 'barbell')
    if (tag.includes('徒手')) return pick(TAG_LABEL.bodyweight, lang, 'bodyweight')
    return tag.replace(CJK, '').trim() || 'tag'
  }
  return tag
}

export function getItemCopy(item: FitnessItem, lang: LangCode): TextPair {
  if (lang === 'zh') return { title: item.titleZh, desc: item.descZh }
  if (lang === 'zh-TW') {
    return {
      title: item.titleZh.replace(/普拉提/g, '皮拉提斯'),
      desc: item.descZh,
    }
  }

  const region =
    item.region === 'west'
      ? pick(PHRASE.west, lang, 'West')
      : item.region === 'asia'
        ? pick(PHRASE.asia, lang, 'Asia')
        : pick(PHRASE.fusion, lang, 'Fusion')
  const cat = pick(CAT[item.category], lang, item.category)
  const focus = item.titleEn.includes(':')
    ? item.titleEn.split(':').slice(1).join(':').trim()
    : item.titleEn

  return {
    title: `${region} · ${cat}: ${focus}`,
    desc: item.descEn,
  }
}

export type LocalizedDetails = {
  overview: string
  equipment: string[]
  muscles: string[]
  steps: StepBlock[]
  tips: string[]
  schedule: string
  tags: string[]
}

export function getLocalizedDetails(
  item: FitnessItem,
  lang: LangCode,
  t: (key: MessageKey) => string,
): LocalizedDetails {
  const allowed = new Set([
    'strength',
    'cardio',
    'yoga',
    'pilates',
    'hiit',
    'mobility',
    'martial',
    'home',
  ])
  const cat = (allowed.has(item.category) ? item.category : 'strength') as
    | 'strength'
    | 'cardio'
    | 'yoga'
    | 'pilates'
    | 'hiit'
    | 'mobility'
    | 'martial'
    | 'home'

  const key = (suffix: string) => `d_${cat}_${suffix}` as MessageKey
  const copy = getItemCopy(item, lang)
  const overviewBody = t(key('overview'))
  const tags = item.tags.map((tag) => localizeTag(tag, lang))
  const tagLine = tags.join(', ')

  // zh: Chinese desc + template; en: English desc + template; others: fully localized template only
  let overview: string
  if (lang === 'zh' || lang === 'zh-TW') {
    overview = `${copy.desc} ${overviewBody}`
  } else if (lang === 'en') {
    overview = `${copy.desc} ${overviewBody}`
  } else {
    overview = overviewBody
  }
  if (tagLine) {
    overview = `${overview.trim()} (${tagLine})`
  }

  return {
    overview: overview.trim(),
    equipment: [t(key('eq1')), t(key('eq2')), t(key('eq3')), t(key('eq4'))],
    muscles: [t(key('m1')), t(key('m2')), t(key('m3')), t(key('m4'))],
    steps: [
      { title: t(key('s1t')), detail: t(key('s1d')) },
      { title: t(key('s2t')), detail: t(key('s2d')) },
      { title: t(key('s3t')), detail: t(key('s3d')) },
    ],
    tips: [t(key('tip1')), t(key('tip2')), t(key('tip3'))],
    schedule: t('d_schedule')
      .replace('{duration}', item.duration)
      .replace('{calories}', item.calories ?? '—'),
    tags,
  }
}
