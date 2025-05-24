/**
 * Object defining all possible languages codes
 *
 * @see {@link ScryfallLanguageCodeType} for the type of this group
 */
export const ScryfallLanguageCode = {
  /** English */
  English: 'en',
  /** Spanish */
  Spanish: 'es',
  /** French */
  French: 'fr',
  /** German */
  German: 'de',
  /** Italian */
  Italian: 'it',
  /** Portuguese */
  Portuguese: 'pt',
  /** Japanese */
  Japanese: 'ja',
  /** Korean */
  Korean: 'ko',
  /** Russian */
  Russian: 'ru',
  /** Simplified Chinese */
  SimplifiedChinese: 'zhs',
  /** Traditional Chinese */
  TraditionalChinese: 'zht',
  /** Hebrew */
  Hebrew: 'he',
  /** Latin */
  Latin: 'la',
  /** Ancient Greek */
  AncientGreek: 'grc',
  /** Arabic */
  Arabic: 'ar',
  /** Sanskrit */
  Sanskrit: 'sa',
  /** Phyrexian */
  Phyrexian: 'ph',
} as const

/**
 * Type defining all possible finishes in the Scryfall API
 *
 * @see {@link ScryfallLanguageCode} for an array version
 */
export type ScryfallLanguageCodeType =
  (typeof ScryfallLanguageCode)[keyof typeof ScryfallLanguageCode]
