import axios from 'axios'
import type { ScryfallCard } from '@/types/Scryfall/Card/Card'
import type {
  ScryfallImageSizeType,
  ScryfallLanguageCodeType,
} from '@/types/Scryfall/Card/values'

export class ScryfallCardService {
  private static readonly BASE_URL = 'https://api.scryfall.com/cards'

  /**
   * TODO: Add query via search
   * https://scryfall.com/docs/api/cards/search
   */

  /**
   * Get a card by name
   *
   * @param name The card's name
   * @param method Get by exact or partial match
   * @return Card's data, following the ScryfallCard type
   * @see ScryfallCard
   */

  static async GetByName({
    name,
    method,
  }: {
    name: string
    method: 'exact' | 'fuzzy'
  }): Promise<ScryfallCard> {
    const response = await axios.get(`${this.BASE_URL}/named?${method}=${name}`)
    return response.data
  }

  /**
   * Card name autocomplete query
   *
   * @param q the input string
   * @param extras extra cards (tokens, planes, vanguards, etc), `false` if undefined
   * @return Matching cards names
   */

  static async GetAutocomplete({
    q,
    extras,
  }: {
    q: string
    extras?: boolean
  }): Promise<ScryfallCard['name']> {
    const includeExtras = extras ? '&include_extras=true' : ''
    const response = await axios.get(
      `${this.BASE_URL}/autocomplete?q=${q}${includeExtras}`,
    )
    return response.data
  }

  /**
   * Get a random card
   *
   * @param q An optional fulltext search query to filter the pool of random cards
   * @param format The data format to return, defaults to `json`
   * @param face If using the `image` format and this parameter has the value `back`, the back face of the card will be returned.
   * Will return a 422 if this card has no back face
   * @param version The image version to return when using the image format, defaults to `large`
   * @param pretty If true, the returned JSON will be prettified. Avoid using for production code.
   *
   * @return Card's info following the ScryfallCard type or an image url (string)
   * @see ScryfallCard
   */

  // TODO: Implement TS signature / overload

  static async GetRandom({
    q,
    format = 'json',
    face,
    version = 'large',
    pretty,
  }: {
    q?: string
    format?: 'json' | 'text' | 'image'
    face?: 'back'
    version?: ScryfallImageSizeType
    pretty?: boolean
  } = {}): Promise<ScryfallCard | string> {
    const params = [
      q && `q=${encodeURIComponent(q)}`,
      `format=${format}`,
      face && `face=${face}`,
      `version=${version}`,
      pretty && 'pretty=true',
    ]
      .filter(Boolean)
      .join('&')

    const response = await axios.get(`${this.BASE_URL}/random?${params}`)
    return response.data
  }

  /**
   * TODO: Add collection query
   * https://scryfall.com/docs/api/cards/collection
   */

  /**
   * Get a card via Scryfall's set code and collector's number
   *
   * @param code The set code
   * @param number The card's collector number
   * @param lang (optional): the card's language, defaults to english
   * @return Card's data, following the ScryfallCard type
   * @see ScryfallCard
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
   * TODO: Add multiverse query
   * https://scryfall.com/docs/api/cards/multiverse
   */

  /**
   * TODO: Add MTGO query
   * https://scryfall.com/docs/api/cards/mtgo
   */

  /**
   * TODO: Add Arena query
   * https://scryfall.com/docs/api/cards/arena
   */

  /**
   * TODO: Add TCGPlayer query
   * https://scryfall.com/docs/api/cards/tcgplayer
   */

  /**
   * TODO: Add CardMarket query
   * https://scryfall.com/docs/api/cards/cardmarket
   */

  /**
   * Get a card via Scryfall's UUID
   *
   * @param UUID The card's unique id
   * @return Card's data, following the ScryfallCard type
   * @see ScryfallCard
   */
  static async GetByUUID(UUID: string): Promise<ScryfallCard> {
    const response = await axios.get(`${this.BASE_URL}/${UUID}`)
    return response.data
  }
}
