import { queryOptions } from '@tanstack/react-query'
import type { ScryfallError } from '@/types/Scryfall'
import type {
  GetAutocompleteParams,
  GetByNameParams,
  GetBySearchParams,
  GetBySetNumberParams,
  GetCardByIDParams,
  GetRandomParams,
  ScryfallCardListReturnFormat,
  ScryfallCardListReturnFormatMap,
  ScryfallCardReturnFormat,
  ScryfallCardReturnFormatMap,
} from '@/services/Scryfall'
import { ScryfallCardService } from '@/services/Scryfall'

export const ScryfallCardQueries = {
  /**
   * Creates a query configuration for fetching card name suggestions from Scryfall's autocomplete API.
   *
   * Returns an array of card name strings that match the provided query string.
   * Useful for implementing search-as-you-type functionality.
   *
   * @param options - Autocomplete search parameters
   * @returns Query configuration for Tanstack Query
   *
   * @example
   * ```typescript
   * const { data } = useQuery(ScryfallCardQueries.getCardAutocompleteQuery({
   *   q: "Lightning"
   * }));
   * // data: ["Lightning Bolt", "Lightning Strike", "Lightning Helix", ...]
   * ```
   *
   * @see https://scryfall.com/docs/api/cards/autocomplete
   */
  getCardAutocompleteQuery: (options: GetAutocompleteParams) =>
    queryOptions<Array<string>, ScryfallError>({
      queryKey: ['CARD_AUTOCOMPLETE', options],
      queryFn: () => ScryfallCardService.getAutocomplete(options),
    }),

  /**
   * Creates a query configuration for fetching a specific Magic card by one of its IDs (Scryfall, MTGO...).
   *
   * Returns a single card object in the specified format. IDs are stable and won't change,
   * making this ideal for bookmarking or direct card references.
   *
   * @template TFormat - The return format type (defaults to 'json')
   * @param options - Card ID search parameters
   * @returns Query configuration for Tanstack Query
   *
   * @example
   * ```typescript
   * const { data } = useQuery(ScryfallCardQueries.getCardByIDQuery({
   *   type: 'uuid',
   *   id: "f7233d75-dbbd-4138-9a61-7e2c8cc9bf36"
   * }));
   * // data: Card object for the specified ID
   * ```
   *
   * @see https://scryfall.com/docs/api/cards/id
   */
  getCardByIDQuery: <TFormat extends ScryfallCardReturnFormat = 'json'>(
    options: GetCardByIDParams,
  ) =>
    queryOptions<ScryfallCardReturnFormatMap[TFormat], ScryfallError>({
      queryKey: ['CARD_BY_ID', options],
      queryFn: () => ScryfallCardService.getByID(options),
    }),

  /**
   * Creates a query configuration for fetching a Magic card by its name from Scryfall.
   *
   * Searches for cards with the exact name provided. Supports fuzzy matching and can
   * return cards in different formats (JSON, text, image).
   *
   * @template TFormat - The return format type (defaults to 'json')
   * @param options - Card name search parameters
   * @returns Query configuration for Tanstack Query
   *
   * @example
   * ```typescript
   * const { data } = useQuery(ScryfallCardQueries.getCardByNameQuery({
   *   name: "Lightning Bolt"
   * }));
   * // data: Card object for Lightning Bolt
   *
   * // With fuzzy matching
   * const { data } = useQuery(ScryfallCardQueries.getCardByNameQuery({
   *   name: "Lightnig Bolt", // typo
   *   fuzzy: true
   * }));
   * ```
   *
   * @see https://scryfall.com/docs/api/cards/named
   */
  getCardByNameQuery: <TFormat extends ScryfallCardReturnFormat = 'json'>(
    options: GetByNameParams,
  ) =>
    queryOptions<ScryfallCardReturnFormatMap[TFormat], ScryfallError>({
      queryKey: ['CARD_BY_NAME', options],
      queryFn: () => ScryfallCardService.getByName(options),
    }),

  /**
   * Creates a query configuration for searching Magic cards using Scryfall's advanced search syntax.
   *
   * Returns a paginated list of cards matching the search criteria. Supports complex queries
   * with filters for mana cost, color, type, set, and more using Scryfall's search syntax.
   *
   * @template TFormat - The return format type (defaults to 'json')
   * @param options - Search query parameters
   * @returns Query configuration for Tanstack Query
   *
   * @example
   * ```typescript
   * const { data } = useQuery(ScryfallCardQueries.getCardBySearchQuery({
   *   q: "c:red cmc:1 t:instant"
   * }));
   * // data: List of red, 1-mana instant cards
   *
   * // With pagination
   * const { data } = useQuery(ScryfallCardQueries.getCardBySearchQuery({
   *   q: "lightning",
   *   page: 2
   * }));
   * ```
   *
   * @see https://scryfall.com/docs/api/cards/search
   * @see https://scryfall.com/docs/reference/card-search-syntax
   */
  getCardBySearchQuery: <TFormat extends ScryfallCardListReturnFormat = 'json'>(
    options: GetBySearchParams,
  ) =>
    queryOptions<ScryfallCardListReturnFormatMap[TFormat], ScryfallError>({
      queryKey: ['CARD_BY_SEARCH', options],
      queryFn: () => ScryfallCardService.getBySearch(options),
    }),

  /**
   * Creates a query configuration for fetching a specific Magic card by its collector number within a set.
   *
   * Returns a single card from a specific set using its collector number. This is useful when you
   * know the exact set and number of a card (e.g., from a physical card or decklist).
   *
   * @template TFormat - The return format type (defaults to 'json')
   * @param options - Set and collector number search parameters
   * @returns Query configuration for Tanstack Query
   *
   * @example
   * ```typescript
   * const { data } = useQuery(ScryfallCardQueries.getCardBySetNumber({
   *   set: "khm",
   *   number: "259"
   * }));
   * // data: Card object for Kaldheim #259
   *
   * // With language preference
   * const { data } = useQuery(ScryfallCardQueries.getCardBySetNumber({
   *   set: "neo",
   *   number: "123",
   *   lang: "ja"
   * }));
   * ```
   *
   * @see https://scryfall.com/docs/api/cards/collector
   */
  getCardBySetNumber: <TFormat extends ScryfallCardReturnFormat = 'json'>(
    options: GetBySetNumberParams,
  ) =>
    queryOptions<ScryfallCardReturnFormatMap[TFormat], ScryfallError>({
      queryKey: ['CARD_BY_SET', options],
      queryFn: () => ScryfallCardService.getBySetNumber(options),
    }),

  /**
   * Creates a query configuration for fetching a random Magic card from Scryfall's database.
   *
   * Returns a single random card, optionally filtered by search criteria. Perfect for
   * "surprise me" features, random card generators, or discovery functionality.
   *
   * @template TFormat - The return format type (defaults to 'json')
   * @param options - Random card filter parameters (optional)
   * @returns Query configuration for Tanstack Query
   *
   * @example
   * ```typescript
   * // Completely random card
   * const { data } = useQuery(ScryfallCardQueries.getRandomCard({}));
   *
   * // Random card with filters
   * const { data } = useQuery(ScryfallCardQueries.getRandomCard({
   *   q: "c:blue t:creature"
   * }));
   * // data: Random blue creature card
   *
   * // Random card from specific set
   * const { data } = useQuery(ScryfallCardQueries.getRandomCard({
   *   q: "set:khm"
   * }));
   * ```
   *
   * @see https://scryfall.com/docs/api/cards/random
   */
  getRandomCard: <TFormat extends ScryfallCardReturnFormat = 'json'>(
    options: GetRandomParams,
  ) =>
    queryOptions<ScryfallCardReturnFormatMap[TFormat], ScryfallError>({
      queryKey: ['CARD_RANDOM', options],
      queryFn: () => ScryfallCardService.getRandom(options),
    }),
}
