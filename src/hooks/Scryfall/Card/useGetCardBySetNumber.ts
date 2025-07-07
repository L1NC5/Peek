import { useQuery } from '@tanstack/react-query'
import type {
  GetBySetNumberParams,
  ScryfallCardReturnFormat,
  ScryfallCardReturnFormatMap,
} from '@/services/Scryfall'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { ScryfallError } from '@/types/Scryfall'
import { ScryfallCardService } from '@/services/Scryfall'

/**
 * Hook implementing the Scryfall service's getBySetNumber in a Tanstack Query instance.
 *
 * You can override the hook behavior via `queryOptions`.
 *
 * Default `staleTime` is 5 minutes (`1000 * 60 * 5`).
 *
 * @see ScryfallCardService.getBySetNumber
 */
export const useGetCardBySetNumber = <
  TFormat extends ScryfallCardReturnFormat = 'json',
>(
  options: GetBySetNumberParams,
  queryOptions?: UseQueryOptions<
    ScryfallCardReturnFormatMap[TFormat],
    ScryfallError
  >,
) => {
  return useQuery<ScryfallCardReturnFormatMap[TFormat], ScryfallError>({
    queryKey: ['scryfall-card-by-set-number', { ...options }],
    queryFn: () => ScryfallCardService.getBySetNumber(options),
    retry: false,
    staleTime: 1000 * 60 * 5,
    ...queryOptions,
  })
}
