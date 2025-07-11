import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type {
  GetRandomParams,
  ScryfallCardReturnFormat,
  ScryfallCardReturnFormatMap,
} from '@/services/Scryfall'
import type { ScryfallError } from '@/types/Scryfall'
import { ScryfallCardService } from '@/services/Scryfall'

/**
 * Hook implementing the Scryfall service's getRandom (card) in a Tanstack Query instance.
 *
 * You can override the hook behavior via `queryOptions`.
 *
 * Default `staleTime` is 5 minutes (`1000 * 60 * 5`).
 *
 * @see ScryfallCardService.getRandom
 */
export const useGetRandomCard = <
  TFormat extends ScryfallCardReturnFormat = 'json',
>(
  options?: GetRandomParams,
  queryOptions?: UseQueryOptions<
    ScryfallCardReturnFormatMap[TFormat],
    ScryfallError
  >,
) => {
  return useQuery<ScryfallCardReturnFormatMap[TFormat], ScryfallError>({
    queryKey: ['scryfall-random-card', { ...options }],
    queryFn: () => ScryfallCardService.getRandom(options),
    retry: false,
    staleTime: 1000 * 60 * 5,
    ...queryOptions,
  })
}
