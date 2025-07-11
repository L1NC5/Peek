import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/card/Card.tsx'
import { useGetCardByName } from '@/hooks/Scryfall'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const cardByName = useGetCardByName({ name: 'Tarmogoyf', method: 'exact' })

  return (
    <section className={'pt-12 flex flex-col gap-y-8 items-center'}>
      <Card card={cardByName} />
    </section>
  )
}
