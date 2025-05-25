import type { ScryfallObject } from '@/types/Scryfall/Object'
import type { ScryfallColorType } from '@/types/Scryfall/Card/values'

/**
 * Description of a mana cost.
 *
 * @see {@link https://scryfall.com/docs/api/card-symbols/parse-mana}
 */
export type ScryfallManaCost = {
  object: typeof ScryfallObject.ManaCost
  /**
   * The normalized cost, with correctly-ordered and wrapped mana symbols
   */
  cost: string
  /**
   * The mana value. If you submit Un-set mana symbols, this decimal could include fractional parts
   */
  cmc: number
  /**
   * The colors of the given cost
   */
  colors: Array<ScryfallColorType>
  /**
   * True if the cost is colorless
   */
  colorless: boolean
  /**
   * True if the cost is monocolored
   */
  monocolored: boolean
  /**
   * True if the cost is multicolored
   */
  multicolored: boolean
}
