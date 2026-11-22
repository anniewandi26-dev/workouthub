export type LangCode =
  | 'en'
  | 'zh'
  | 'zh-TW'
  | 'ja'
  | 'ko'
  | 'es'
  | 'fr'
  | 'de'
  | 'it'
  | 'pt'
  | 'pt-BR'
  | 'ru'
  | 'ar'
  | 'hi'
  | 'th'
  | 'vi'
  | 'id'
  | 'ms'
  | 'tr'
  | 'pl'
  | 'nl'
  | 'sv'
  | 'da'
  | 'fi'
  | 'no'
  | 'cs'
  | 'hu'
  | 'ro'
  | 'uk'
  | 'el'
  | 'he'
  | 'fa'
  | 'bn'
  | 'ur'
  | 'tl'
  | 'sw'

export interface LanguageMeta {
  code: LangCode
  name: string
  native: string
  dir?: 'ltr' | 'rtl'
}

/** World-level 36 languages */
export const LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'zh', name: 'Chinese (Simplified)', native: '简体中文' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', native: '繁體中文' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', native: 'Português (Brasil)' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'ar', name: 'Arabic', native: 'العربية', dir: 'rtl' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'th', name: 'Thai', native: 'ไทย' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  { code: 'pl', name: 'Polish', native: 'Polski' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands' },
  { code: 'sv', name: 'Swedish', native: 'Svenska' },
  { code: 'da', name: 'Danish', native: 'Dansk' },
  { code: 'fi', name: 'Finnish', native: 'Suomi' },
  { code: 'no', name: 'Norwegian', native: 'Norsk' },
  { code: 'cs', name: 'Czech', native: 'Čeština' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar' },
  { code: 'ro', name: 'Romanian', native: 'Română' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά' },
  { code: 'he', name: 'Hebrew', native: 'עברית', dir: 'rtl' },
  { code: 'fa', name: 'Persian', native: 'فارسی', dir: 'rtl' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'ur', name: 'Urdu', native: 'اردو', dir: 'rtl' },
  { code: 'tl', name: 'Filipino', native: 'Filipino' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili' },
]

export const LANG_CODES = LANGUAGES.map((l) => l.code)

/** Country / region ISO → default language */
export const COUNTRY_TO_LANG: Record<string, LangCode> = {
  US: 'en',
  GB: 'en',
  IE: 'en',
  AU: 'en',
  NZ: 'en',
  CA: 'en',
  SG: 'en',
  PH: 'tl',
  IN: 'hi',
  PK: 'ur',
  BD: 'bn',
  CN: 'zh',
  HK: 'zh-TW',
  MO: 'zh-TW',
  TW: 'zh-TW',
  JP: 'ja',
  KR: 'ko',
  KP: 'ko',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CL: 'es',
  CO: 'es',
  PE: 'es',
  VE: 'es',
  FR: 'fr',
  BE: 'fr',
  CH: 'de',
  LU: 'fr',
  DE: 'de',
  AT: 'de',
  IT: 'it',
  PT: 'pt',
  BR: 'pt-BR',
  AO: 'pt',
  MZ: 'pt',
  RU: 'ru',
  BY: 'ru',
  KZ: 'ru',
  SA: 'ar',
  AE: 'ar',
  EG: 'ar',
  QA: 'ar',
  KW: 'ar',
  BH: 'ar',
  OM: 'ar',
  JO: 'ar',
  MA: 'ar',
  DZ: 'ar',
  TN: 'ar',
  IQ: 'ar',
  LB: 'ar',
  TH: 'th',
  VN: 'vi',
  ID: 'id',
  MY: 'ms',
  BN: 'ms',
  TR: 'tr',
  PL: 'pl',
  NL: 'nl',
  SE: 'sv',
  DK: 'da',
  FI: 'fi',
  NO: 'no',
  CZ: 'cs',
  HU: 'hu',
  RO: 'ro',
  MD: 'ro',
  UA: 'uk',
  GR: 'el',
  CY: 'el',
  IL: 'he',
  IR: 'fa',
  AF: 'fa',
  TZ: 'sw',
  KE: 'sw',
  UG: 'sw',
  RW: 'sw',
}

export function isLangCode(v: string): v is LangCode {
  return (LANG_CODES as string[]).includes(v)
}

export function langFromCountry(countryCode?: string | null): LangCode {
  if (!countryCode) return 'en'
  return COUNTRY_TO_LANG[countryCode.toUpperCase()] ?? 'en'
}

export function getLangMeta(code: LangCode): LanguageMeta {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0]
}
