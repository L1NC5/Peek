/**
 * Object defining all possible legality statuses
 *
 * @see {@link ScryfallLegalityType} for the type of this group
 */
export const ScryfallLegality = {
  Legal: 'legal',
  NotLegal: 'not_legal',
  Restricted: 'restricted',
  Banned: 'banned',
} as const

/**
 * Type defining all possible legality statuses Scryfall API
 *
 * @see {@link ScryfallLegality} for an array version
 */
export type ScryfallLegalityType =
  (typeof ScryfallLegality)[keyof typeof ScryfallLegality]
