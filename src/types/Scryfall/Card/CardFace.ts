import type { ScryfallObject } from '@/types/Scryfall/Object'
import type { ScryfallColor } from '@/types/Scryfall/Card/values'

export type ScryfallCardFace = {
  artist?: string
  artist_id?: string
  cmc?: number
  color_indicator?: Array<ScryfallColor>
  colors?: Array<ScryfallColor>
  defense?: string
  flavor_text?: string
  illustration_id?: string
  image_uris?: string
  layout?: string
  loyalty?: string
  mana_cost: string
  name: string
  object: typeof ScryfallObject.CardFace
  oracle_id?: string
  oracle_text?: string
  power?: string
  printed_name?: string
  printed_text?: string
  printed_type_line?: string
  toughness?: string
  type_line?: string
  watermark?: string
}
