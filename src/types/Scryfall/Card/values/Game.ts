/**
 * Object defining all possible platforms
 *
 * @see {@link ScryfallGameType} for the type of this group
 */
export const ScryfallGame = {
  /**
   * The printed paper game.
   * Released in 1993.
   */
  Paper: 'paper',
  /**
   * Magic: the Gathering Online
   * Released in 2002.
   */
  MTGO: 'MTGO',
  /**
   * Magic: the Gathering: Arena
   * Released in 2018.
   */
  Arena: 'arena',
  /**
   * Magic: the Gathering (MicroProse)
   * Released in 1997.
   *
   * This game included an expansion named Astral that included some unique cards.
   */
  Astral: 'astral',
  /**
   * Magic: the Gathering (Sega Dreamcast)
   * Released in 2001.
   */
  Sega: 'sega',
} as const

/**
 * Type defining all possible platforms in the Scryfall API
 *
 * @see {@link ScryfallGame} for an array version
 */
export type ScryfallGameType = (typeof ScryfallGame)[keyof typeof ScryfallGame]
