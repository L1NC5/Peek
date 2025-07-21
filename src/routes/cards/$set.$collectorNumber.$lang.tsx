import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import type { ScryfallLanguageCodeType } from '@/types/Scryfall'
import { ScryfallLanguageCode } from '@/types/Scryfall'
import { ScryfallCardQueries } from '@/queries/Scryfall'
import { CardQueryWrapper } from '@/components/Card'
import { isOneOf } from '@/utils'

const CardPage = () => {
  const { set, collectorNumber, lang } = Route.useParams()
  const card = useQuery(
    ScryfallCardQueries.getCardBySetNumber({
      code: set,
      number: collectorNumber,
      lang: lang,
    }),
  )
  return <CardQueryWrapper cardQuery={card} />
}
``
export const Route = createFileRoute('/cards/$set/$collectorNumber/$lang')({
  params: {
    parse: ({ set, collectorNumber, lang }) => {
      const langValue = lang || 'en'

      if (!isOneOf(langValue, Object.values(ScryfallLanguageCode))) {
        throw new Error(`Unsupported language: ${langValue}`)
      }

      return {
        set,
        collectorNumber,
        lang: langValue as ScryfallLanguageCodeType,
      }
    },
  },
  loader: async ({ params, context: { queryClient } }) => {
    const { set, collectorNumber, lang } = params

    return queryClient.prefetchQuery(
      ScryfallCardQueries.getCardBySetNumber({
        code: set,
        number: collectorNumber,
        lang: lang,
      }),
    )
  },
  component: CardPage,
})
