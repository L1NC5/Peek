import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import type { ScryfallLanguageCodeType } from '@/types/Scryfall'
import { ScryfallCardQueries } from '@/queries/Scryfall'

const CardPage = () => {
  const { set, collectorNumber, lang } = Route.useParams()
  const card = useQuery(
    ScryfallCardQueries.getCardBySetNumber({
      code: set,
      number: collectorNumber,
      // TODO: Replace cast with proper validation
      lang: lang as ScryfallLanguageCodeType,
    }),
  )
  console.log(card.data)
  return <div>{card.isSuccess && <div>{card.data.name}</div>}</div>
}

export const Route = createFileRoute('/cards/$set/$collectorNumber/$lang')({
  loader: async ({ params, context: { queryClient } }) => {
    const { set, collectorNumber, lang } = params

    return queryClient.prefetchQuery(
      ScryfallCardQueries.getCardBySetNumber({
        code: set,
        number: collectorNumber,
        lang: lang as ScryfallLanguageCodeType,
      }),
    )
  },
  component: CardPage,
})
