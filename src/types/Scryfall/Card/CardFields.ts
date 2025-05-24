import type {
  ScryfallBorderColorType,
  ScryfallColorType, ScryfallFinishType, ScryfallGameType,
  ScryfallLanguageCodeType,
  ScryfallLayoutType,
  ScryfallLegalitiesFieldType,
} from '@/types/Scryfall/Card/values'
import type {
  ScryfallCardFace,
  ScryfallRelatedCard,
} from '@/types/Scryfall/Card'
import type { ScryfallImageStatusType } from '@/types/Scryfall/Card/values/ImageStatus.ts'

// ==================== CORE FIELDS ====================

/**
 * A card's internal API core fields
 */
export type ScryfallCoreCardFields = ScryfallReferences &
  ScryfallVendorReferences

/**
 * Scryfall internal card references
 */
export type ScryfallReferences = {
  /** A unique ID for this card in Scryfall's database. */
  id: string
  /** A unique ID for this card's oracle identity. */
  oracle_id: string
  /** A language code for this printing. */
  lang: ScryfallLanguageCodeType
  /** A code for this card's layout. */
  layout: ScryfallLayoutType
  /** A link to where you can begin paginating all re/prints for this card on Scryfall's API. */
  prints_search_uri: string
  /** A link to this card's rulings list on Scryfall's API. */
  rulings_uri: string
  /** A link to this card's permapage on Scryfall's website. */
  scryfall_uri: string
  /** A link to this card object on Scryfall's API. */
  uri: string
}

/**
 * External sites references
 */
export type ScryfallVendorReferences = {
  /** This card's Arena ID, if any. */
  arena_id?: number
  /** This card's Magic Online ID, if any. */
  mtgo_id?: number
  /** This card's foil Magic Online ID, if any. */
  mtgo_foil_id?: number
  /** This card's multiverse IDs on Gatherer, if any. */
  multiverse_ids?: Array<number>
  /** This card's ID on TCGplayer's API. */
  tcgplayer_id?: number
  /** This card's ID on TCGplayer's API, for its etched version. */
  tcgplayer_etched_id?: number
  /** This card's ID on Cardmarket's API. */
  cardmarket_id?: number
}

// ==================== GAMEPLAY FIELDS ====================

export type ScryfallGameplayRootFields = {
  /** If this card is closely related to other cards, this property will be an array with Related Card Objects. */
  all_parts?: Array<ScryfallRelatedCard>
  /** An object describing the legality of this card across play formats. */
  legalities: ScryfallLegalitiesFieldType
}

type ScryfallBasicCardInfo = {
  name: string
  type_line: string
  mana_cost?: string
}

// TODO: Implement card face abstraction
export type ScryfallCardFacesField = {
  /** An array of Card Face objects, if this card is multifaced. */
  card_faces: Array<ScryfallCardFace>
}

export type ScryfallVanguardStatsFields = {
  /** This card's hand modifier, if it is Vanguard card. */
  hand_modifier?: string
  /** This card's life modifier, if it is Vanguard card. */
  life_modifier?: string
}

export type ScryfallCombatStatsFields = {
  /** This card's defense, if any. */
  defense?: string
  /** This loyalty if any. */
  loyalty?: string
  /** This card's power, if any. */
  power?: string
  /** This card's toughness, if any. */
  toughness?: string
}

export type ScryfallCardFaceFields = ScryfallBasicCardInfo &
  ScryfallCombatStatsFields &
  ScryfallVanguardStatsFields & {
  /** The colors in this card's color indicator, if any. */
  color_indicator?: ScryfallColorType
  /** The Oracle text for this card, if any. */
  oracle_text: string
}

export type ScryfallCardSideFields = ScryfallBasicCardInfo & {
  /** This card's colors, if the overall card has colors defined by the rules. */
  colors: ScryfallColorType
}

export type ScryfallCardSpecificFields = ScryfallBasicCardInfo & {
  /** The card's mana value. */
  cmc: number
  /** This card's color identity. */
  color_identity: ScryfallColorType
  /** This card's overall rank/popularity on EDHREC. */
  edhrec_rank?: number
  /** An array of keywords that this card uses. */
  keywords: Array<string>
  /** This card's rank/popularity on Penny Dreadful. */
  penny_rank?: number
  /** Colors of mana that this card could produce. */
  produced_mana?: ScryfallColorType
  /** True if this card is on the Reserved List. */
  reserved: boolean
}

// ==================== PRINT FIELDS ====================
type ScryfallPreviewInfo = {
  /** The date this card was previewed. @type IsoDate */
  previewed_at: string
  /** A link to the preview for this card. @type URI */
  source_uri: string
  /** The name of the source that previewed this card. */
  source: string
}

type ScryfallVariationInfo = {
  /** Whether this card is a variation of another printing. */
  variation: boolean
  /** The printing ID of the printing this card is a variation of. @type UUID */
  variation_of?: string
}

export type ScryfallPrintCardSpecificFields = {
  /** The name of the illustrator of this card. */
  artist?: string;
  /** The IDs of the artists that illustrated this card. @type UUID */
  artist_ids?: string[];
  /** The lit Unfinity attractions lights on this card, if any. */
  attraction_lights?: number[];
  /** Whether this card is found in boosters. */
  booster: boolean;
  /** This card's border color. */
  border_color: ScryfallBorderColorType;
  /** This card's collector number. */
  collector_number: string;
  /** True if you should consider avoiding use of this print downstream. */
  content_warning?: boolean;
  /** True if this card was only released in a video game. */
  digital: boolean;
  /** An array of computer-readable flags that indicate finishes. */
  finishes: Array<ScryfallFinishType>;
  /** This card's frame effects, if any. */
  frame_effects?: Array<string>;
  /** This card's frame layout. */
  frame: string;
  /** True if this card's artwork is larger than normal. */
  full_art: boolean;
  /** A list of games that this card print is available in. */
  games: Array<ScryfallGameType>;
  /** True if this card's imagery is high resolution. */
  highres_image: boolean;
  /** A unique identifier for the card artwork. @type UUID */
  illustration_id?: string;
  /** A computer-readable indicator for the state of this card's image. */
  image_status: ScryfallImageStatusType;
  /** True if this card is oversized. */
  oversized: boolean;
  /** An object containing daily price information for this card. */
  prices: ScryfallPrices;
  /** True if this card is a promotional print. */
  promo: boolean;
  /** An array of strings describing what categories of promo cards this card falls into. */
  promo_types?: ScryfallPromoType[];
  /** An object providing URIs to this card's listing on major marketplaces. */
  purchase_uris?: ScryfallPurchaseUris;
  /** This card's rarity. */
  rarity: `${ScryfallRarity}`;
  /** An object providing URIs to this card's listing on other Magic resources. */
  related_uris: ScryfallRelatedUris;
  /** The date this card was first released. @type IsoDate */
  released_at: string;
  /** True if this card is a reprint. */
  reprint: boolean;
  /** A link to this card's set on Scryfall's website. @type URI */
  scryfall_set_uri: string;
  /** This card's full set name. */
  set_name: string;
  /** A link to where you can begin paginating this card's set. @type URI */
  set_search_uri: string;
  /** The type of set this printing is in. */
  set_type: `${SetType}`;
  /** A link to this card's set object on Scryfall's API. @type URI */
  set_uri: string;
  /** This card's set code. */
  set: string;
  /** This card's Set object UUID. @type UUID */
  set_id: string;
  /** True if this card is a Story Spotlight. */
  story_spotlight: boolean;
  /** True if the card is printed without text. */
  textless: boolean;
  /** The security stamp on this card, if any. */
  security_stamp?: `${ScryfallSecurityStamp}`;
  /** Preview information for this print, if any. */
  preview?: PreviewInfo;
} & VariationInfo;
}