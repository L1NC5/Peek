import type {
  ScryfallCard,
  ScryfallImageSizeType,
  ScryfallLanguageCodeType,
  ScryfallList,
} from '@/types/Scryfall'

/**
 * Interface mapping the possible return types provided by the methods returning a single card
 *
 * Use in conjunction with generics and `ScryfallCardReturnFormat` for correct type inference
 * @see ScryfallCardListReturnFormat
 *
 */
export interface ScryfallCardReturnFormatMap {
  json: ScryfallCard
  text: string
  image: string
}

/**
 * Type defining all return types provided by methods returning a single card
 *
 * Use in conjunction with generics and `ScryfallCardReturnFormatMap` for correct type inference
 * @see ScryfallCardReturnFormatMap
 */
export type ScryfallCardReturnFormat = keyof ScryfallCardReturnFormatMap

/**
 * Interface mapping the possible return types provided by the `getBySearch` method
 *
 * Use in conjunction with generics and `ScryfallCardListReturnFormat` for correct type inference
 * @see ScryfallCardListReturnFormat
 *
 */
export interface ScryfallCardListReturnFormatMap {
  json: ScryfallList<ScryfallCard>
  csv: string
}

/**
 * Type defining all return types provided by the `getBySearch` method
 *
 * Use in conjunction with generics and `ScryfallCardListReturnFormatMap` for correct type inference
 * @see ScryfallCardReturnFormatMap
 */
export type ScryfallCardListReturnFormat = keyof ScryfallCardListReturnFormatMap

/**
 * Type defining all possible `unique` modes that can be used in the `getBySearch` method
 * @see ScryfallCardService.getBySearch
 */
export type ScryfallSearchUniqueModesType =
  | 'cards' // Removes duplicate gameplay objects (cards that share a name and have the same functionality).
  | 'art' // Returns only one copy of each unique artwork for matching cards.
  | 'prints' // Returns all prints for all cards matched (disables rollup).

/**
 * All possible order values for `getBySearch` method
 * @see ScryfallCardService.getBySearch
 */
export type ScryfallSearchOrderType =
  | 'name' // Sort cards by name, A → Z
  | 'set' // Sort cards by set and collector number: AAA/#1 → ZZZ/#999
  | 'released' // Sort cards by release date: Newest → Oldest
  | 'rarity' // Sort cards by rarity: Common → Mythic
  | 'color' // Sort cards by color and color identity: WUBRG → multicolor → colorless
  | 'usd' // Sort cards by lowest USD price: 0.01 → highest, null last
  | 'tix' // Sort cards by lowest TIX price: 0.01 → highest, null last
  | 'eur' // Sort cards by lowest Euro price: 0.01 → highest, null last
  | 'cmc' // Sort cards by mana value: 0 → highest
  | 'power' // Sort cards by power: null → highest
  | 'toughness' // Sort cards by toughness: null → highest
  | 'edhrec' // Sort cards by EDHREC ranking: lowest → highest
  | 'penny' // Sort cards by Penny Dreadful ranking: lowest → highest
  | 'artist' // Sort cards by front-side artist name: A → Z
  | 'review' // Sort cards how podcasts review sets, usually color & CMC, lowest → highest, with Booster Fun cards at the end

export interface ScryfallGetBySearchParams {
  /** The search query string, following Scryfall's search syntax. */
  q: string
  /** The strategy to handle card duplicates. One of `cards`, `art` or `prints`. Default is `cards` */
  unique?: ScryfallSearchUniqueModesType
  /** How to sort results. */
  order?: ScryfallSearchOrderType
  /** The direction to sort results. Default is `'auto'`. */
  dir?: 'auto' | 'asc' | 'desc'
  /** Whether to include extra cards like tokens and promotional cards. */
  include_extras?: boolean
  /** Whether to include cards in other languages. */
  include_multilingual?: boolean
  /** Whether to include card variations. */
  include_variations?: boolean
  /** The page number of results to return (pagination). */
  page?: number
  /** Whether to pretty-print the JSON response (for readability, not recommended for production). */
  pretty?: boolean
}

/**
 * Parameters used by the `getByName` method.
 *
 * @see ScryfallCardService.getByName
 * */
export interface GetByNameParams extends GetSingleCardParams {
  /** The card name to search for. */
  name: string
  /** `'exact'` for exact match, `'fuzzy'` for fuzzy match (404 if multiple results). */
  method: 'exact' | 'fuzzy'
  /** Optional set code to limit the search. */
  set?: string
}

/**
 * Parameters used by the GetRandom method.
 *
 * @see ScryfallCardService.getRandom
 */
export interface GetRandomParams extends GetSingleCardParams {
  /** Fulltext search query to filter the random pool. */
  q?: string
}

/**
 * Parameters used by the GetBySetNumber method.
 *
 * @see ScryfallCardService.getBySetNumber
 */
export interface GetBySetNumberParams extends GetSingleCardParams {
  /** The set code (e.g., 'znr', 'm21'). */
  code: string
  /** The card's collector number within the set. */
  number: number
  /** Optional language code for the card. Defaults to English if omitted. */
  lang?: ScryfallLanguageCodeType
}

/**
 * Parameters used by the GetByID method
 *
 * @see ScryfallCardService.GetByID
 */
export interface GetCardByIDParams extends GetSingleCardParams {
  /** The ID type to look for */
  type: 'multiverse' | 'mtgo' | 'arena' | 'tcgplayer' | 'cardmarket' | 'uuid'
  /** The ID of the card to fetch */
  id: string
}

/**
 * Interface defining all common props when fetching a single card
 */
interface GetSingleCardParams {
  /** If `'back'` and `format` is `'image'`, returns the back face of the card (422 if none). */
  face?: 'back'
  /** Image version to return when `format` is `'image'`. Defaults to `'large'`. */
  version?: ScryfallImageSizeType
  /** If `true`, prettifies the JSON response (avoid in production). */
  pretty?: boolean
}

/**
 * Interface defining all props assignable to the `getAucocomplete` method
 *
 * @see ScryfallCardService.getAutocomplete
 */
export interface GetAutocompleteParams {
  /** The partial input string used for the autocomplete search. */
  q: string
  /** Whether to include extra card types (tokens, planes, vanguards, etc.). */
  extras?: boolean
}

/**
 * Interface defining all props assignable to the `postCollection` method
 */
export interface PostCollectionParams {
  /**
   * An array of JSON objects, each one a card identifier.
   * */
  identifiers: Array<CardIdentifiers>
  /** If `true`, prettifies the JSON response (avoid in production). */
  pretty?: boolean
}

/**
 * Type defining all identifier combinations that can be used as `identifiers` in the `postCollection` method.
 */
export type CardIdentifiers =
  | { id: ScryfallCard['id'] }
  | { mtgo_id: ScryfallCard['mtgo_id'] }
  | { multiverse_id: ScryfallCard['multiverse_ids'] }
  | { oracle_id: ScryfallCard['oracle_id'] }
  | { illustration_id: ScryfallCard['illustration_id'] }
  | { name: ScryfallCard['name'] }
  | { name: ScryfallCard['name']; set: ScryfallCard['set'] }
  | {
      set: ScryfallCard['set']
      collector_number: ScryfallCard['collector_number']
    }
