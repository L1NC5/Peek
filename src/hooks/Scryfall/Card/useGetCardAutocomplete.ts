import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { ScryfallError } from '@/types/Scryfall'
import type { GetAutocompleteParams } from '@/services/Scryfall'
import { ScryfallCardService } from '@/services/Scryfall'

/**
 * Hook implementing the Scryfall service's getAutocomplete in a Tanstack Query instance.
 *
 * You can override the hook behavior via `queryOptions`.
 *
 * @see ScryfallCardService.getAutocomplete
 */
export const useGetCardAutocomplete = (
  options: GetAutocompleteParams,
  queryOptions?: UseQueryOptions<Array<string>, ScryfallError>,
) => {
  return useQuery<Array<string>, ScryfallError>({
    queryKey: ['autocomplete', options],
    queryFn: () => ScryfallCardService.getAutocomplete(options),
    retry: false,
    ...queryOptions,
  })
}
