import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/Card.tsx'
import { useGetCardByID, useGetCardByName } from '@/hooks/Scryfall'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const cardById = useGetCardByID({ type: 'cardmarket', id: '379041' })
  const cardByName = useGetCardByName({ name: 'Tarmogoyf', method: 'fuzzy' })
  return (
    <section className={'pt-12 flex flex-col gap-y-8 items-center'}>
      <Card card={cardById} />
      <Card card={cardByName} />
    </section>
  )
}
