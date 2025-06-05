import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/Card.tsx'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <section className={"pt-12 flex flex-col items-center"}>
      <Card />
    </section>
  )
}
