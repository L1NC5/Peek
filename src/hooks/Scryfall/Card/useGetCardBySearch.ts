import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { ScryfallError } from '@/types/Scryfall'
import type {
  ScryfallCardListReturnFormat,
  ScryfallCardListReturnFormatMap,
  ScryfallGetBySearchParams,
} from '@/services/Scryfall'
import { ScryfallCardService } from '@/services/Scryfall'

/**
 * Hook implementing the Scryfall service's getBySearch in a Tanstack Query instance.
 *
 * You can override the hook behavior via `queryOptions`.
 *
 * Default `staleTime` is 5 minutes (`1000 * 60 * 5`).
 *
 * @see ScryfallCardService.getBySearch
 */
export const useGetCardBySearch = <
  TFormat extends ScryfallCardListReturnFormat = 'json',
>(
  options: ScryfallGetBySearchParams & { format?: TFormat },
  queryOptions?: UseQueryOptions<
    ScryfallCardListReturnFormatMap[TFormat],
    ScryfallError
  >,
) => {
  return useQuery<ScryfallCardListReturnFormatMap[TFormat], ScryfallError>({
    queryKey: ['scryfall-card-search', { ...options }],
    queryFn: () => ScryfallCardService.getBySearch(options),
    retry: false,
    staleTime: 1000 * 60 * 5,
    ...queryOptions,
  })
}
