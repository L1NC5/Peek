import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type {
  GetCardByIDParams,
  ScryfallCardReturnFormat,
  ScryfallCardReturnFormatMap,
} from '@/services/Scryfall'
import type { ScryfallError } from '@/types/Scryfall'
import { ScryfallCardService } from '@/services/Scryfall'

/**
 * Hook implementing the Scryfall service's getByID in a Tanstack Query instance.
 *
 * You can override the hook behavior via `queryOptions`.
 *
 * Default `staleTime` is 5 minutes (`1000 * 60 * 5`).
 *
 * @see ScryfallCardService.getByID
 */
export const useGetCardByID = <
  TFormat extends ScryfallCardReturnFormat = 'json',
>(
  options: GetCardByIDParams,
  queryOptions?: UseQueryOptions<
    ScryfallCardReturnFormatMap[TFormat],
    ScryfallError
  >,
) => {
  return useQuery<ScryfallCardReturnFormatMap[TFormat], ScryfallError>({
    queryKey: ['scryfall-card-by-id', { ...options }],
    queryFn: () => ScryfallCardService.getByID(options),
    retry: false,
    staleTime: 1000 * 60 * 5,
    ...queryOptions,
  })
}
