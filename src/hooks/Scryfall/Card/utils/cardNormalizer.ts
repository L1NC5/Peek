import type { QueryClient } from '@tanstack/react-query'
import type { ScryfallCard } from '@/types/Scryfall'
import type {
  GetByNameParams,
  GetBySetNumberParams,
  GetCardByIDParams,
} from '@/services/Scryfall'

/**
 * When provided with a `ScryfallCard` and the Tanstack Query client, normalize
 * the card in cache for all possible card query methods (UUID, Multiverse IDs,
 * MTGO ID, Arena ID, TCGPlayer ID, Cardmarket ID, set number and exact name).
 *
 * @param queryClient - The queryClient instance used to interact with React Query
 * @param card - The card provided by the API response
 * @see ScryfallCardService
 */
export const normalizeCardInCache = (
  queryClient: QueryClient,
  card: ScryfallCard,
) => {
  // UUID
  queryClient.setQueryData<ScryfallCard>(
    [
      'scryfall-card-by-id',
      { type: 'uuid', id: card.id } satisfies GetCardByIDParams,
    ],
    card,
  )

  // Other IDs
  card.multiverse_ids?.forEach((id) => {
    queryClient.setQueryData<ScryfallCard>(
      [
        'scryfall-card-by-id',
        { type: 'multiverse', id: id } satisfies GetCardByIDParams,
      ],
      card,
    )
  })

  if (card.mtgo_id) {
    queryClient.setQueryData<ScryfallCard>(
      [
        'scryfall-card-by-id',
        { type: 'mtgo', id: card.mtgo_id } satisfies GetCardByIDParams,
      ],
      card,
    )
  }

  if (card.arena_id) {
    queryClient.setQueryData<ScryfallCard>(
      [
        'scryfall-card-by-id',
        { type: 'arena', id: card.arena_id } satisfies GetCardByIDParams,
      ],
      card,
    )
  }

  if (card.tcgplayer_id) {
    queryClient.setQueryData<ScryfallCard>(
      [
        'scryfall-card-by-id',
        {
          type: 'tcgplayer',
          id: card.tcgplayer_id,
        } satisfies GetCardByIDParams,
      ],
      card,
    )
  }

  if (card.cardmarket_id) {
    queryClient.setQueryData<ScryfallCard>(
      [
        'scryfall-card-by-id',
        {
          type: 'cardmarket',
          id: card.cardmarket_id,
        } satisfies GetCardByIDParams,
      ],
      card,
    )
  }

  // Set number
  queryClient.setQueryData<ScryfallCard>(
    [
      'scryfall-card-by-set-number',
      {
        code: card.set,
        number: card.collector_number,
        lang: card.lang,
      } satisfies GetBySetNumberParams,
    ],
    card,
  )

  queryClient.setQueryData<ScryfallCard>(
    [
      'scryfall-card-by-name',
      { name: card.name, method: 'exact' } satisfies GetByNameParams,
    ],
    card,
  )
}