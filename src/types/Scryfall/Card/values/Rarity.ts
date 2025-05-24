/**
 * Object defining all possible rarities
 *
 * @see {@link ScryfallRarityType} for the type of this group
 */
export const ScryfallRarity = {
  Common: 'common',
  Uncommon: 'uncommon',
  Rare: 'rare',
  Special: 'special',
  Mythic: 'mythic',
  Bonus: 'bonus',
} as const

/**
 * Type defining all possible rarities Scryfall API
 *
 * @see {@link ScryfallRarity} for an array version
 */
export type ScryfallRarityType =
  (typeof ScryfallRarity)[keyof typeof ScryfallRarity]
