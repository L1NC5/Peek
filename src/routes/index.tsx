import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ScryfallCardQueries } from '@/queries/Scryfall'
import { CardList } from '@/components/List/Card/CardList.tsx'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const cardBySearch = useQuery(
    ScryfallCardQueries.getCardBySearchQuery({
      q: 'lightning',
    }),
  )

  return (
    <section className={'pt-12 flex flex-col gap-y-8 items-center'}>
      <CardList cardListQuery={cardBySearch} />
    </section>
  )
}
