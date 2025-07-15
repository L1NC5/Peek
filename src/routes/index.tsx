import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/card/Card.tsx'
import { ScryfallCardQueries } from '@/queries/Scryfall'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const cardByName = useQuery(
    ScryfallCardQueries.getCardByNameQuery({
      name: 'Tarmogoyf',
      method: 'exact',
    }),
  )

  return (
    <section className={'pt-12 flex flex-col gap-y-8 items-center'}>
      <Card card={cardByName} />
    </section>
  )
}
