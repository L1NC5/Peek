import type { ScryfallObject } from '@/types/Scryfall/Object'

export type ScryfallRuling = {
  object: typeof ScryfallObject.Ruling
  /**
   *  The Oracle ID of the card this ruling is associated with.
   */
  oracle_id: string
  /**
   *  A computer-readable string indicating which company produced this ruling, either `wotc` or `scryfall`.
   */
  source: 'wotc' | 'scryfall'
  /**
   *  The date when the ruling or note was published.
   */
  published_at: string
  /**
   *  The text of the ruling.
   */
  comment: string
}
