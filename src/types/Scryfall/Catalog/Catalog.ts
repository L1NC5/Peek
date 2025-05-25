import type { ScryfallObject } from '@/types/Scryfall/Object'

export type ScryfallCatalog = {
  object: typeof ScryfallObject.Catalog
  /**
   *  A link to the current catalog on Scryfall’s API.
   */
  uri: string
  /**
   *  The number of items in the data array.
   */
  total_values: number
  /**
   *  An array of datapoints, as strings.
   */
  data: Array<string>
}
