import axios from 'axios'
import type { ScryfallCard } from '@/types/Scryfall/Card/Card.ts'
import type { ScryfallLanguageCodeType } from '@/types/Scryfall/Card/values'

export class CardService {
  private static readonly BASE_URL = 'https://api.scryfall.com/cards'

  /**
   * Get a card via Scryfall's UUID
   *
   * @param UUID The card's unique id
   * @return Card's data, following the ScryfallCard type
   * @see ScryfallCard
   * */
  static async GetByUUID(UUID: string): Promise<ScryfallCard> {
    const response = await axios.get(`${this.BASE_URL}/${UUID}`)
    return response.data
  }

  /**
   * Get a card via Scryfall's set code and collector's number
   *
   * @param code The set code
   * @param number The card's collector number
   * @param lang (optional): the card's language, defaults to english
   * @return Card's data, following the ScryfallCard type
   * @see ScryfallCard
   */
  static async GetBySetNumber(
    code: string,
    number: number,
    lang?: ScryfallLanguageCodeType,
  ): Promise<ScryfallCard> {
    const langSegment = lang ? `/${lang}` : ''
    const response = await axios.get(
      `${this.BASE_URL}/${code}/${number}${langSegment}`,
    )
    return response.data
  }
}
