/**
 * Object defining all possible frame effects
 *
 * @see {@link ScryfallFrameEffectType} for the type of this group
 */
export const ScryfallFrameEffect = {
  /** The cards have a legendary crown */
  Legendary: 'legendary',
  Miracle: 'miracle',
  Enchantment: 'enchantment',
  Draft: 'draft',
  Devoid: 'devoid',
  Tombstone: 'tombstone',
  Colorshifted: 'colorshifted',
  Inverted: 'inverted',
  SunMoonDFC: 'sunmoondfc',
  CompassLandDFC: 'compasslanddfc',
  OriginPWDFC: 'originpwdfc',
  MoonEldraziDFC: 'mooneldrazidfc',
  WaxingAndWaningMoonDFC: 'waxingandwaningmoondfc',
  Showcase: 'showcase',
  ExtendedArt: 'extendedart',
  Companion: 'companion',
  Etched: 'etched',
  Snow: 'snow',
  Lesson: 'lesson',
  ShatteredGlass: 'shatteredglass',
  ConvertDFC: 'convertdfc',
  FanDFC: 'fandfc',
  UpsideDownDFC: 'upsidedowndfc',
  Spree: 'spree',
} as const

/**
 * Type defining all possible frame effects in the Scryfall API
 *
 * @see {@link ScryfallFrameEffect} for an array version
 */
export type ScryfallFrameEffectType =
  (typeof ScryfallFrameEffect)[keyof typeof ScryfallFrameEffect]
