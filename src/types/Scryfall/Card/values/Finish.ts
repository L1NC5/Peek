/**
 * Object defining all possible finishes
 *
 * @see {@link ScryfallFinishType} for the type of this group
 */
export const ScryfallFinish = {
  NonFoil: 'nonfoil',
  Foil: 'foil',
  Etched: 'etched',
} as const

/**
 * Type defining all possible finishes in the Scryfall API
 *
 * @see {@link ScryfallFinish} for an array version
 */
export type ScryfallFinishType =
  (typeof ScryfallFinish)[keyof typeof ScryfallFinish]
