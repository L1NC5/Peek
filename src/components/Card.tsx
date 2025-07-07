import * as React from 'react'
import type { ScryfallCard, ScryfallError } from '@/types/Scryfall'
import type { UseQueryResult } from '@tanstack/react-query'

export interface CardProps {
  card: UseQueryResult<ScryfallCard, ScryfallError>
}

export const Card: React.FC<CardProps> = ({ card }) => {
  if (card.isLoading) {
    return <div>Loading...</div>
  }

  if (card.isError) {
    return <div>{`Error while fetching card: ${card.error.details}`}</div>
  }

  if (card.data) {
    return (
      <div className={'p-8 bg-slate-800 flex items-start gap-4 rounded-lg'}>
        <img
          src={card.data.image_uris?.png}
          className={'w-52'}
          alt={card.data.name}
        />
        <div className={'flex flex-col max-w-80'}>
          <h1 className={'text-3xl font-bold'}>
            {card.data.printed_name || card.data.name}
          </h1>
          <span className={'text-sm'}>
            {card.data.printed_type_line || card.data.type_line}
          </span>
          <span className={'mt-4 text-lg whitespace-pre-line '}>
            {card.data.printed_text || card.data.oracle_text}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <span>No card data available</span>
    </div>
  )
}
