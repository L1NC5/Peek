import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ScryfallCardService } from '@/services/Scryfall/Card/ScryfallCardService.ts'

export const Card: React.FC = () => {
  const cardQuery = useQuery({
    queryKey: ['card'],
    queryFn: () =>
      ScryfallCardService.GetByName({ name: 'Snapcaster', method: 'fuzzy' }),
    staleTime: 1000 * 60 * 5,
  })

  if (cardQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (cardQuery.isError) {
    return <div>{`Error fetching card: ${cardQuery.error.name}`}</div>
  }
  if (cardQuery.data) {
    return (
      <div className={'p-8 bg-slate-800 flex items-start gap-4 rounded-lg'}>
        <img
          src={cardQuery.data.image_uris?.png}
          className={'w-52'}
          alt={cardQuery.data.name}
        />
        <div className={'flex flex-col max-w-80'}>
          <h1 className={'text-3xl font-bold'}>
            {cardQuery.data.printed_name || cardQuery.data.name}
          </h1>
          <span className={'text-sm'}>
            {cardQuery.data.printed_type_line || cardQuery.data.type_line}
          </span>
          <span className={'mt-4 text-lg whitespace-pre-line '}>
            {cardQuery.data.printed_text || cardQuery.data.oracle_text}
          </span>
        </div>
      </div>
    )
  }
}
