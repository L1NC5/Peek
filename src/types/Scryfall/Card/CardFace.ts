import type { ScryfallObject } from '@/types/Scryfall/Object'
import type {
  ScryfallColor,
  ScryfallImageUris,
} from '@/types/Scryfall/Card/values'

/**
 * Multiface cards have a `card_faces` property containing at least two Card Face objects.
 */
export type ScryfallCardFace = {
  /**
   *  The name of the illustrator of this card face. Newly spoiled cards may not have this field yet.
   */
  artist?: string
  /**
   *  The ID of the illustrator of this card face. Newly spoiled cards may not have this field yet.
   */
  artist_id?: string
  /**
   *  The mana value of this particular face, if the card is reversible.
   */
  cmc?: number
  /**
   *  The colors in this face’s color indicator, if any.
   */
  color_indicator?: Array<ScryfallColor>
  /**
   *  This face’s colors, if the game defines colors for the individual face of this card.
   */
  colors?: Array<ScryfallColor>
  /**
   *  This face’s defense, if any.
   */
  defense?: string
  /**
   *  The flavor text printed on this face, if any.
   */
  flavor_text?: string
  /**
   *  A unique identifier for the card face artwork that remains consistent across reprints. Newly spoiled cards may not have this field yet.
   */
  illustration_id?: string
  /**
   *  An object providing URIs to imagery for this face, if this is a double-sided card. If this card is not double-sided, then the image_uris property will be part of the parent object instead.
   */
  image_uris?: ScryfallImageUris
  /**
   *  The layout of this card face, if the card is reversible.
   */
  // TODO: Create correct type
  layout?: string
  /**
   *  This face’s loyalty, if any.
   */
  loyalty?: string
  /**
   *  The mana cost for this face.
   *  This value will be any empty string `""` if the cost is absent.
   *  Remember that per the game rules, a missing mana cost and a mana cost of `{0}` are different values.
   */
  mana_cost: string
  /**
   *  The name of this particular face.
   */
  name: string
  /**
   *  A content type for this object
   */
  object: typeof ScryfallObject.CardFace
  /**
   *  The Oracle ID of this particular face, if the card is reversible.
   */
  oracle_id?: string
  /**
   *  The Oracle text for this face, if any.
   */
  oracle_text?: string
  /**
   *  This face’s power, if any. Note that some cards have powers that are not numeric, such as `*`.
   */
  power?: string
  /**
   *  The localized name printed on this face, if any.
   */
  printed_name?: string
  /**
   *  The localized text printed on this face, if any.
   */
  printed_text?: string
  /**
   *  The localized type line printed on this face, if any.
   */
  printed_type_line?: string
  /**
   *  This face’s toughness, if any.
   */
  toughness?: string
  /**
   *  The type line of this particular face, if the card is reversible.
   */
  type_line?: string
  /**
   *  The watermark on this particular card face, if any.
   */
  watermark?: string
}
