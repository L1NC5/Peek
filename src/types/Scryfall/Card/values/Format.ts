/**
 * Object defining all possible formats
 *
 * @see {@link ScryfallFormatType} for the type of this group
 */
export const ScryfallFormat = {
  Standard: 'standard',
  Future: 'future',
  Historic: 'historic',
  Gladiator: 'gladiator',
  Pioneer: 'pioneer',
  Explorer: 'explorer',
  Modern: 'modern',
  Legacy: 'legacy',
  Pauper: 'pauper',
  Vintage: 'vintage',
  Penny: 'penny',
  Commander: 'commander',
  Oathbreaker: 'oathbreaker',
  Brawl: 'brawl',
  Alchemy: 'alchemy',
  PauperCommander: 'paupercommander',
  Duel: 'duel',
  OldSchool: 'oldschool',
  Premodern: 'premodern',
  PrEDH: 'predh',
  Timeless: 'timeless',
  StandardBrawl: 'standardbrawl',
} as const

/**
 * Type defining all possible formats in the Scryfall API
 *
 * @see {@link ScryfallFormat} for an array version
 */
export type ScryfallFormatType =
  (typeof ScryfallFormat)[keyof typeof ScryfallFormat]
