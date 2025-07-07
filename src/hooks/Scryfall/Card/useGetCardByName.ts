import { useQuery } from '@tanstack/react-query'
import type {
  GetByNameParams,
  ScryfallCardReturnFormat,
  ScryfallCardReturnFormatMap,
} from '@/services/Scryfall'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { ScryfallError } from '@/types/Scryfall'
import { ScryfallCardService } from '@/services/Scryfall'

/**
 * Hook implementing the Scryfall service's getByName in a Tanstack Query instance.
 *
 * You can override the hook behavior via `queryOptions`.
 *
 * Default `staleTime` is 5 minutes (`1000 * 60 * 5`).
 *
 * @see ScryfallCardService.getByName
 */
export const useGetCardByName = <
  TFormat extends ScryfallCardReturnFormat = 'json',
>(
  options: GetByNameParams & { format?: TFormat },
  queryOptions?: UseQueryOptions<
    ScryfallCardReturnFormatMap[TFormat],
    ScryfallError
  >,
) => {
  return useQuery<ScryfallCardReturnFormatMap[TFormat], ScryfallError>({
    queryKey: ['scryfall-card-by-name', { ...options }],
    queryFn: () => ScryfallCardService.getByName(options),
    retry: false,
    staleTime: 1000 * 60 * 5,
    ...queryOptions,
  })
}
