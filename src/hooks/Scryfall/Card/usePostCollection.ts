// TODO: Test correct implementation

import { useMutation } from '@tanstack/react-query'
import type { PostCollectionParams } from '@/services/Scryfall'
import { ScryfallCardService } from '@/services/Scryfall'

export const usePostCollection = (options: PostCollectionParams) => {
  return useMutation({
    mutationKey: ['scryfall-card-collection'],
    mutationFn: () => ScryfallCardService.postCollection(options),
  })
}
