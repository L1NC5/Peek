import * as React from 'react'
import type { ScryfallCard } from '@/types/Scryfall'

/**
 * Props for the CardRenderer component
 */
export interface CardProps {
  /** Scryfall card data to render */
  card: ScryfallCard
  /** Card's display mode */
  variant: 'thumbnail' | 'page'
}

/**
 * Pure component that renders a Scryfall card with image, name, type, and text.
 *
 * This component handles the visual presentation of card data
 *
 * @example
 * ```tsx
 * const cardData = {
 *   name: "Lightning Bolt",
 *   type_line: "Instant",
 *   oracle_text: "Deal 3 damage to any target.",
 *   image_uris: { png: "https://..." }
 * }
 *
 * <CardRenderer card={cardData} />
 * ```
 *
 * @remarks
 * This is a pure presentation component - it expects card data to already be available.
 * Use with `CardQueryWrapper` for handling loading/error states.
 */
export const CardRenderer: React.FC<CardProps> = ({
  card,
  variant = 'thumbnail',
}) =>
  variant === 'thumbnail' ? (
    <div className={'relative'} aria-label={card.name}>
      <img
        className={'rounded-3xl'}
        src={card.image_uris?.normal}
        alt={card.name}
      />
      <a
        href={`/cards/${card.set}/${card.collector_number}/en`}
        className={'absolute inset-0'}
      >
        {`/cards/${card.set}/${card.collector_number}/en`}
      </a>
    </div>
  ) : (
    <div
      className={'p-8 bg-slate-800 flex items-start gap-4 rounded-lg flex-wrap'}
    >
      <img src={card.image_uris?.png} className={'w-52'} alt={card.name} />
      <div className={'flex flex-col max-w-80'}>
        <h1 className={'text-3xl font-bold'}>
          {card.printed_name || card.name}
        </h1>
        <span className={'text-sm'}>
          {card.printed_type_line || card.type_line}
        </span>
        <span className={'mt-4 text-lg whitespace-pre-line '}>
          {card.printed_text || card.oracle_text}
        </span>
      </div>
    </div>
  )
