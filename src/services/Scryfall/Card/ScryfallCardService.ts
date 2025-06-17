import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type {
  ScryfallCard,
  ScryfallImageSizeType,
  ScryfallLanguageCodeType,
  ScryfallList,
} from '@/types/Scryfall'

// --- Types definition ------------------------------------------------------------------------------------------------

/**
 * Type defining all possible api call return types
 *
 * Use in conjunction with generics and `ScryfallCardReturnFormat` to set the correct function return type
 * @see ScryfallCardReturnFormat
 */
type ScryfallCardReturnFormatMap = {
  json: ScryfallCard
  text: string
  image: string
}

/**
 * Type that defines all possible `format` field values in the api call methods
 *
 * Use in conjunction with generics and `ScryfallReturnFormatMap` to set the correct function return type
 * @see ScryfallCardReturnFormatMap
 */
type ScryfallCardReturnFormat = keyof ScryfallCardReturnFormatMap

/**
 * Type defining all possible `unique` modes that can be used in the `GetBySearch` method
 * @see ScryfallCardService.GetBySearch
 */
type ScryfallSearchUniqueModesType =
  | 'cards' // Removes duplicate gameplay objects (cards that share a name and have the same functionality).
  | 'art' // Returns only one copy of each unique artwork for matching cards.
  | 'prints' // Returns all prints for all cards matched (disables rollup).

/**
 * All possible order values for GetBySearch method
 * @see ScryfallCardService.GetBySearch
 */
type ScryfallSearchOrderType =
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

// --- Class definition ------------------------------------------------------------------------------------------------

export class ScryfallCardService {
  private static readonly BASE_URL = 'https://api.scryfall.com/cards'

  /**
   * Searches for Magic cards using Scryfall's `/search` endpoint.
   *
   * Allows complex queries, pagination, ordering, and filtering options.
   *
   * @template TFormat
   * @param options - Query options:
   *   - `q`: The search query string, following Scryfall's search syntax.
   *   - `unique`: The strategy to handle card duplicates. One of `cards`, `art` or `prints`. Default is `cards`
   *   - `order`: How to sort results.
   *   - `dir`: The direction to sort results. One of `'auto'`, `'asc'`, or `'desc'`. Default is `'auto'`.
   *   - `include_extras`: Whether to include extra cards like tokens and promotional cards.
   *   - `include_multilingual`: Whether to include cards in other languages.
   *   - `include_variations`: Whether to include card variations.
   *   - `page`: The page number of results to return (pagination).
   *   - `format`: The response format, `'json'` or `'csv'`. Defaults to `'json'`.
   *   - `pretty`: Whether to pretty-print the JSON response (for readability, not recommended for production).
   *
   * @returns A promise resolving to the search results in the specified format.
   *
   * @see ScryfallCardService.GetBySearch
   *
   * @example
   * const results = await CardService.GetBySearch({
   *   q: 'type:creature mana<=3',
   *   order: 'cmc',
   *   dir: 'asc',
   *   page: 1,
   * });
   */
  static async GetBySearch<TFormat extends 'json' | 'csv' = 'json'>(options: {
    q: string
    unique?: ScryfallSearchUniqueModesType
    order?: ScryfallSearchOrderType
    dir?: 'auto' | 'asc' | 'desc'
    include_extras?: boolean
    include_multilingual?: boolean
    include_variations?: boolean
    page?: number
    format?: TFormat
    pretty?: boolean
  }): Promise<
    TFormat extends 'json' ? ScryfallList<ScryfallCard> : Array<string>
  > {
    const {
      q,
      unique,
      order,
      dir,
      include_extras,
      include_multilingual,
      include_variations,
      page,
      format,
      pretty,
    } = options
    const response: AxiosResponse<
      TFormat extends 'json' ? ScryfallList<ScryfallCard> : Array<string>
    > = await axios.get(`${this.BASE_URL}/search`, {
      params: {
        q,
        unique,
        order,
        dir,
        include_extras,
        include_multilingual,
        include_variations,
        page,
        format,
        pretty,
      },
    })
    return response.data
  }

  /**
   * Fetches a Magic card by name using Scryfall's `/named` endpoint.
   *
   * Supports both exact and fuzzy name matching, and allows filtering by set, image version, and response format.
   *
   * @param options - Query options:
   *   - `name`: The card name to search for.
   *   - `method`: `'exact'` for exact match, `'fuzzy'` for fuzzy match (404 if multiple results).
   *   - `set`: Optional set code to limit the search.
   *   - `format`: Response format (e.g., `'json'`, `'image'`). Defaults to `'json'`.
   *   - `face`: If `'back'` and `format` is `'image'`, returns the card’s back face. (422 if there's no back face)
   *   - `version`: Image version (e.g., `'large'`, `'png'`, `'normal'`), used with `format: 'image'`. Defaults to `large`
   *   - `pretty`: If `true`, prettifies the returned JSON (not for production).
   *
   * @returns The requested card data in the specified format.
   *
   * @see ScryfallCard
   * @see ScryfallCardReturnFormat
   *
   * @example
   * const card = await CardService.GetByName({
   *   name: 'Lightning Bolt',
   *   method: 'exact',
   *   set: 'm10',
   * });
   */

  static async GetByName<
    TFormat extends ScryfallCardReturnFormat = 'json',
  >(options: {
    name: string
    method: 'exact' | 'fuzzy'
    set?: string
    format?: TFormat
    face?: 'back'
    version?: ScryfallImageSizeType
    pretty?: boolean
  }): Promise<ScryfallCardReturnFormatMap[TFormat]> {
    const {
      name,
      method,
      set,
      format = 'json',
      face,
      version,
      pretty,
    } = options

    const response = await axios.get(`${this.BASE_URL}/named`, {
      params: {
        [method]: name,
        set,
        format,
        face,
        version,
        pretty,
      },
    })

    if (format === 'image') {
      return response.request.responseURL
    }

    return response.data
  }

  /**
   * Autocompletes a card name based on a partial input.
   *
   * Sends a request to Scryfall's `/autocomplete` endpoint and returns matching card names.
   *
   * @param q - The partial input string used for the autocomplete search.
   * @param extras - Whether to include extra card types (tokens, planes, vanguards, etc.).
   * @returns A promise resolving to an array of matching card names.
   *
   * @example
   * const results = await CardService.GetAutocomplete({ q: 'Liliana', extras: true });
   */

  static async GetAutocomplete({
    q,
    extras,
  }: {
    q: string
    extras?: boolean
  }): Promise<Array<ScryfallCard['name']>> {
    // const includeExtras = extras ? '&include_extras=true' : ''
    const response: AxiosResponse<Array<ScryfallCard['name']>> =
      await axios.get(`${this.BASE_URL}/autocomplete?q=${q}`, {
        params: {
          include_extras: extras,
        },
      })
    return response.data
  }

  /**
   * Fetches a random Magic card using Scryfall's `/random` endpoint.
   *
   * Optionally filters the random selection using a search query, and supports custom response formatting.
   *
   * @param options - Optional parameters:
   *   - `q`: Fulltext search query to filter the random pool.
   *   - `format`: Response format (`json`, `text`, or `image`). Defaults to `'json'`.
   *   - `face`: If `'back'` and `format` is `'image'`, returns the back face of the card (422 if none).
   *   - `version`: Image version to return when `format` is `'image'`. Defaults to `'large'`.
   *   - `pretty`: If `true`, prettifies the JSON response (avoid in production).
   *
   * @returns The random card, either as a `ScryfallCard`, plain text, or image URL, depending on `format`.
   *
   * @see ScryfallCard
   *
   * @example
   * const card = await CardService.GetRandom({ q: 'is:commander', format: 'json' });
   */

  static async GetRandom<
    TFormat extends ScryfallCardReturnFormat = 'json',
  >(options?: {
    q?: string
    format?: TFormat
    face?: 'back'
    version?: ScryfallImageSizeType
    pretty?: boolean
  }): Promise<ScryfallCardReturnFormatMap[TFormat]> {
    const { q, format, face, version, pretty } = options ?? {}

    const response = await axios.get(`${this.BASE_URL}/random`, {
      params: {
        q,
        format,
        face,
        version,
        pretty,
      },
    })
    return response.data
  }

  /**
   * TODO: Add collection query
   * https://scryfall.com/docs/api/cards/collection
   */

  /**
   * Retrieves a card by its set code and collector number.
   *
   * @param code - The set code (e.g., 'znr', 'm21').
   * @param number - The card's collector number within the set.
   * @param lang - Optional language code for the card. Defaults to English if omitted.
   * @returns The card data conforming to the `ScryfallCard` type.
   *
   * @see ScryfallCard
   *
   * @example
   * const card = await CardService.GetBySetNumber({ code: 'znr', number: 123, lang: 'it' });
   */

  static async GetBySetNumber({
    code,
    number,
    lang,
  }: {
    code: string
    number: number
    lang?: ScryfallLanguageCodeType
  }): Promise<ScryfallCard> {
    const langSegment = lang ? `/${lang}` : ''
    const response = await axios.get(
      `${this.BASE_URL}/${code}/${number}${langSegment}`,
    )
    return response.data
  }

  /**
   * Fetches a specific Magic card by its Multiverse ID using Scryfall's `/multiverse/{id}` endpoint.
   *
   * Supports custom response formatting and image options for the retrieved card.
   *
   * @param options - Required parameters:
   *   - `id`: The Multiverse ID of the card to fetch.
   *   - `format`: Response format (`json`, `text`, or `image`). Defaults to `'json'`.
   *   - `face`: If `'back'` and `format` is `'image'`, returns the back face of the card (422 if none).
   *   - `version`: Image version to return when `format` is `'image'`. Defaults to `'large'`.
   *   - `pretty`: If `true`, prettifies the JSON response (avoid in production).
   *
   * @returns The card data, either as a `ScryfallCard`, plain text, or image URL, depending on `format`.
   *
   * @see ScryfallCard
   *
   * @example
   * const card = await CardService.GetByMultiverseID({ id: 409574, format: 'json' });
   */
  static async GetByMultiverseID<
    TFormat extends ScryfallCardReturnFormat = 'json',
  >(options: {
    id: number
    format?: TFormat
    face?: 'back'
    version?: ScryfallImageSizeType
    pretty?: boolean
  }): Promise<ScryfallCardReturnFormatMap[TFormat]> {
    const { id, format, face, version, pretty } = options
    const response = await axios.get(`${this.BASE_URL}/multiverse/${id}`, {
      params: {
        format,
        face,
        version,
        pretty,
      },
    })
    return response.data
  }

  /**
   * Fetches a specific Magic card by its MTGO ID using Scryfall's `/mtgo/{id}` endpoint.
   *
   * Supports custom response formatting and image options for the retrieved card.
   *
   * @param options - Required parameters:
   *   - `id`: The MTGO ID of the card to fetch.
   *   - `format`: Response format (`json`, `text`, or `image`). Defaults to `'json'`.
   *   - `face`: If `'back'` and `format` is `'image'`, returns the back face of the card (422 if none).
   *   - `version`: Image version to return when `format` is `'image'`. Defaults to `'large'`.
   *   - `pretty`: If `true`, prettifies the JSON response (avoid in production).
   *
   * @returns The card data, either as a `ScryfallCard`, plain text, or image URL, depending on `format`.
   *
   * @see ScryfallCard
   *
   * @example
   * const card = await CardService.GetByMTGOID({ id: 54957, format: 'json' });
   */
  static async GetByMTGOID<
    TFormat extends ScryfallCardReturnFormat = 'json',
  >(options: {
    id: number
    format?: TFormat
    face?: 'back'
    version?: ScryfallImageSizeType
    pretty?: boolean
  }): Promise<ScryfallCardReturnFormatMap[TFormat]> {
    const { id, format, face, version, pretty } = options
    const response = await axios.get(`${this.BASE_URL}/mtgo/${id}`, {
      params: {
        format,
        face,
        version,
        pretty,
      },
    })
    return response.data
  }

  /**
   * Fetches a specific Magic card by its MTG Arena ID using Scryfall's `/arena/{id}` endpoint.
   *
   * Supports custom response formatting and image options for the retrieved card.
   *
   * @param options - Required parameters:
   *   - `id`: The Arena ID of the card to fetch.
   *   - `format`: Response format (`json`, `text`, or `image`). Defaults to `'json'`.
   *   - `face`: If `'back'` and `format` is `'image'`, returns the back face of the card (422 if none).
   *   - `version`: Image version to return when `format` is `'image'`. Defaults to `'large'`.
   *   - `pretty`: If `true`, prettifies the JSON response (avoid in production).
   *
   * @returns The card data, either as a `ScryfallCard`, plain text, or image URL, depending on `format`.
   *
   * @see ScryfallCard
   *
   * @example
   * const card = await CardService.GetByArenaID({ id: 67330, format: 'json' });
   */
  static async GetByArenaID<
    TFormat extends ScryfallCardReturnFormat = 'json',
  >(options: {
    id: number
    format?: TFormat
    face?: 'back'
    version?: ScryfallImageSizeType
    pretty?: boolean
  }): Promise<ScryfallCardReturnFormatMap[TFormat]> {
    const { id, format, face, version, pretty } = options
    const response = await axios.get(`${this.BASE_URL}/arena/${id}`, {
      params: {
        format,
        face,
        version,
        pretty,
      },
    })
    return response.data
  }

  /**
   * Fetches a specific Magic card by its TCGPlayer's ID using Scryfall's `/tcgplayer/{id}` endpoint.
   *
   * Supports custom response formatting and image options for the retrieved card.
   *
   * @param options - Required parameters:
   *   - `id`: The TCGPlayer ID of the card to fetch.
   *   - `format`: Response format (`json`, `text`, or `image`). Defaults to `'json'`.
   *   - `face`: If `'back'` and `format` is `'image'`, returns the back face of the card (422 if none).
   *   - `version`: Image version to return when `format` is `'image'`. Defaults to `'large'`.
   *   - `pretty`: If `true`, prettifies the JSON response (avoid in production).
   *
   * @returns The card data, either as a `ScryfallCard`, plain text, or image URL, depending on `format`.
   *
   * @see ScryfallCard
   *
   * @example
   * const card = await CardService.GetByTCGPlayerID({ id: 162145, format: 'json' });
   */
  static async GetByTCGPlayerID<
    TFormat extends ScryfallCardReturnFormat = 'json',
  >(options: {
    id: number
    format?: TFormat
    face?: 'back'
    version?: ScryfallImageSizeType
    pretty?: boolean
  }): Promise<ScryfallCardReturnFormatMap[TFormat]> {
    const { id, format, face, version, pretty } = options
    const response = await axios.get(`${this.BASE_URL}/tcgplayer/${id}`, {
      params: {
        format,
        face,
        version,
        pretty,
      },
    })
    return response.data
  }

  /**
   * Fetches a specific Magic card by its Cardmarket's ID using Scryfall's `/cardmarket/{id}` endpoint.
   *
   * Supports custom response formatting and image options for the retrieved card.
   *
   * @param options - Required parameters:
   *   - `id`: The Cardmarket ID of the card to fetch.
   *   - `format`: Response format (`json`, `text`, or `image`). Defaults to `'json'`.
   *   - `face`: If `'back'` and `format` is `'image'`, returns the back face of the card (422 if none).
   *   - `version`: Image version to return when `format` is `'image'`. Defaults to `'large'`.
   *   - `pretty`: If `true`, prettifies the JSON response (avoid in production).
   *
   * @returns The card data, either as a `ScryfallCard`, plain text, or image URL, depending on `format`.
   *
   * @see ScryfallCard
   *
   * @example
   * const card = await CardService.GetByCardmarketID({ id: 379041, format: 'json' });
   */
  static async GetByCardmarketID<
    TFormat extends ScryfallCardReturnFormat = 'json',
  >(options: {
    id: number
    format?: TFormat
    face?: 'back'
    version?: ScryfallImageSizeType
    pretty?: boolean
  }): Promise<ScryfallCardReturnFormatMap[TFormat]> {
    const { id, format, face, version, pretty } = options
    const response = await axios.get(`${this.BASE_URL}/cardmarket/${id}`, {
      params: {
        format,
        face,
        version,
        pretty,
      },
    })
    return response.data
  }

  /**
   * Fetches a specific Magic card by its Scryfall UUID using the `/{id}` endpoint.
   *
   * Supports custom response formatting and image options for the retrieved card.
   *
   * @param options - Required parameters:
   *   - `id`: The Scryfall ID of the card to fetch.
   *   - `format`: Response format (`json`, `text`, or `image`). Defaults to `'json'`.
   *   - `face`: If `'back'` and `format` is `'image'`, returns the back face of the card (422 if none).
   *   - `version`: Image version to return when `format` is `'image'`. Defaults to `'large'`.
   *   - `pretty`: If `true`, prettifies the JSON response (avoid in production).
   *
   * @returns The card data, either as a `ScryfallCard`, plain text, or image URL, depending on `format`.
   *
   * @see ScryfallCard
   *
   * @example
   * const card = await CardService.GetByUUID({ id: 56ebc372-aabd-4174-a943-c7bf59e5028d , format: 'json' });
   */
  static async GetByUUID<
    TFormat extends ScryfallCardReturnFormat = 'json',
  >(options: {
    id: number
    format?: TFormat
    face?: 'back'
    version?: ScryfallImageSizeType
    pretty?: boolean
  }): Promise<ScryfallCardReturnFormatMap[TFormat]> {
    const { id, format, face, version, pretty } = options
    const response = await axios.get(`${this.BASE_URL}/${id}`, {
      params: {
        format,
        face,
        version,
        pretty,
      },
    })
    return response.data
  }
}
