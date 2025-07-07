import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type {
  GetAutocompleteParams,
  GetByNameParams,
  GetBySetNumberParams,
  GetCardByIDParams,
  GetRandomParams,
  PostCollectionParams,
  ScryfallCardListReturnFormat,
  ScryfallCardListReturnFormatMap,
  ScryfallCardReturnFormat,
  ScryfallCardReturnFormatMap,
  ScryfallGetBySearchParams,
} from '@/services/Scryfall'
import type { ScryfallCard, ScryfallList } from '@/types/Scryfall'
import { ScryfallErrorHandler } from '@/services/Scryfall'

export class ScryfallCardService {
  private static readonly BASE_URL = 'https://api.scryfall.com/cards'

  /**
   * Autocompletes a card name based on a partial input.
   *
   * Sends a request to Scryfall's `/autocomplete` endpoint and returns matching card names.
   *
   * @example
   * const results = await ScryfallCardService.GetAutocomplete({ q: 'Liliana', extras: true });
   */

  static async getAutocomplete({
    q,
    extras,
  }: GetAutocompleteParams): Promise<Array<string>> {
    const response: AxiosResponse<Array<string>> = await axios
      .get(`${this.BASE_URL}/autocomplete?q=${q}`, {
        params: {
          include_extras: extras,
        },
      })
      .catch(ScryfallErrorHandler)
    return response.data
  }

  /**
   * Fetches a specific Magic card by its Multiverse ID using Scryfall's `/multiverse/{id}` endpoint.
   *
   * Supports custom response formatting and image options for the retrieved card.
   *
   * @example
   * const card = await ScryfallCardService.GetByMultiverseID({ type: 'cardmarket', id: '409574', format: 'json' });
   */
  static async getByID<TFormat extends ScryfallCardReturnFormat = 'json'>(
    options: GetCardByIDParams & {
      /**
       * The response format, defaults to `'json'`.
       *
       * Defined here for correct type inference
       * */
      format?: TFormat
    },
  ): Promise<ScryfallCardReturnFormatMap[TFormat]> {
    const { id, type, ...rest } = options
    const url =
      type === 'uuid'
        ? `${this.BASE_URL}/${id}`
        : `${this.BASE_URL}/${type}/${id}`
    const response = await axios
      .get(url, {
        params: {
          ...rest,
        },
      })
      .catch(ScryfallErrorHandler)
    return response.data
  }

  /**
   * Fetches a Magic card by name using Scryfall's `/named` endpoint.
   *
   * Supports both exact and fuzzy name matching, and allows filtering by set, image version, and response format.
   *
   * @returns The requested card data in the specified format.
   *
   * @example
   * const card = await ScryfallCardService.GetByName({
   *   name: 'Lightning Bolt',
   *   method: 'exact',
   *   set: 'm10',
   * });
   */

  static async getByName<TFormat extends ScryfallCardReturnFormat = 'json'>(
    options: GetByNameParams & {
      /**
       * The response format, defaults to `'json'`.
       *
       * Defined here for correct type inference
       * */
      format?: TFormat
    },
  ): Promise<ScryfallCardReturnFormatMap[TFormat]> {
    const { method, name, format = 'json', ...rest } = options

    const response = await axios
      .get(`${this.BASE_URL}/named`, {
        params: {
          [method]: name,
          format,
          ...rest,
        },
      })
      .catch(ScryfallErrorHandler)

    if (format === 'image') {
      return response.request.responseURL
    }

    return response.data
  }

  /**
   * Retrieves a card by its set code and collector number.
   *
   * @example
   * const card = await ScryfallCardService.GetBySetNumber({ code: 'znr', number: 123, lang: 'it' });
   */

  static async getBySetNumber<
    TFormat extends ScryfallCardReturnFormat = 'json',
  >(
    options: GetBySetNumberParams & {
      /**
       * The response format, defaults to `'json'`.
       *
       * Defined here for correct type inference
       * */
      format?: TFormat
    },
  ): Promise<ScryfallCardReturnFormatMap[TFormat]> {
    const { code, number, lang, ...rest } = options
    const langSegment = lang ? `/${lang}` : ''
    const response: AxiosResponse<ScryfallCardReturnFormatMap[TFormat]> =
      await axios
        .get(`${this.BASE_URL}/${code}/${number}${langSegment}`, {
          params: {
            ...rest,
          },
        })
        .catch(ScryfallErrorHandler)
    return response.data
  }

  /**
   * Searches for Magic cards using Scryfall's `/search` endpoint.
   *
   * Allows complex queries, pagination, ordering, and filtering options.
   *
   * @returns A promise resolving to the search results in the specified format.
   *
   * @example
   * const results = await ScryfallCardService.GetBySearch({
   *   q: 'type:creature mana<=3',
   *   order: 'cmc',
   *   dir: 'asc',
   *   page: 1,
   * });
   */
  static async getBySearch<
    TFormat extends ScryfallCardListReturnFormat = 'json',
  >(
    options: ScryfallGetBySearchParams & {
      /**
       * The response format, `'json'` or `'csv'`. Defaults to `'json'`.
       *
       * Defined here for correct type inference
       * */
      format?: TFormat
    },
  ): Promise<ScryfallCardListReturnFormatMap[TFormat]> {
    const response: AxiosResponse<ScryfallCardListReturnFormatMap[TFormat]> =
      await axios
        .get(`${this.BASE_URL}/search`, {
          params: {
            ...options,
          },
        })
        .catch(ScryfallErrorHandler)
    return response.data
  }

  // TODO: Test correct implementation and add JSDoc documentation
  static async postCollection(
    options: PostCollectionParams,
  ): Promise<ScryfallList<ScryfallCard>> {
    const response: AxiosResponse<ScryfallList<ScryfallCard>> = await axios
      .post(`${this.BASE_URL}/cards/collection`, options)
      .catch(ScryfallErrorHandler)
    return response.data
  }

  /**
   * Fetches a random Magic card using Scryfall's `/random` endpoint.
   *
   * Optionally filters the random selection using a search query, and supports custom response formatting.
   *
   * @example
   * const card = await ScryfallCardService.GetRandom({ q: 'is:commander', format: 'json' });
   */

  static async getRandom<TFormat extends ScryfallCardReturnFormat = 'json'>(
    options?: GetRandomParams & {
      /**
       * The response format, defaults to `'json'`.
       *
       * Defined here for correct type inference
       * */
      format?: TFormat
    },
  ): Promise<ScryfallCardReturnFormatMap[TFormat]> {
    const response = await axios
      .get(`${this.BASE_URL}/random`, {
        params: {
          ...options,
        },
      })
      .catch(ScryfallErrorHandler)
    return response.data
  }
}
