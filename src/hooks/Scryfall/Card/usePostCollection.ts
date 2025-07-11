import { useMutation } from '@tanstack/react-query'
import type { ScryfallCard, ScryfallList } from '@/types/Scryfall'
import type { PostCollectionParams } from '@/services/Scryfall'
import { ScryfallCardService } from '@/services/Scryfall'
import { chunkArray } from '@/utils'

/**
 * React Query hook to post a collection of card identifiers to the Scryfall API.
 *
 * Scryfall's `/cards/collection` endpoint accepts up to 75 card identifiers per request,
 * so this hook automatically splits the input into chunks and merges the results into a single `ScryfallList`.
 *
 * @returns A mutation object from `useMutation`, with a `mutate` function that accepts `PostCollectionParams`.
 * The resolved data is a merged `ScryfallList<ScryfallCard>` containing all matched cards.
 */
export const usePostCollection = () => {
  return useMutation({
    mutationKey: ['scryfall-card-collection'],
    mutationFn: async (
      options: PostCollectionParams,
    ): Promise<ScryfallList<ScryfallCard>> => {
      const { identifiers, pretty = false } = options

      // Split the array to send batch requests
      const chunks = chunkArray(identifiers, 75)
      const responses: Array<ScryfallList<ScryfallCard>> = []
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms))

      for (const chunk of chunks) {
        const response = await ScryfallCardService.postCollection({
          identifiers: chunk,
          pretty: pretty,
        })
        responses.push(response)
        await delay(100)
      }

      // Merge the API responses
      return {
        object: 'list',
        data: responses.flatMap((res) => res.data),
        has_more: false,
        total_cards: responses.reduce(
          (acc, res) => acc + (res.total_cards ?? res.data.length),
          0,
        ),
        warnings: responses.flatMap((res) => res.warnings ?? []),
      }
    },
  })
}
