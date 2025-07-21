import type { ScryfallCard, ScryfallError } from '@/types/Scryfall'
import type { UseQueryResult } from '@tanstack/react-query'
import type { FC } from 'react'
import { CardRenderer } from '@/components/Card/CardRenderer.tsx'

/**
 * Props for the CardQueryWrapper component
 */
export interface CardQueryWrapperProps {
  /** TanStack Query result containing Scryfall card data */
  cardQuery: UseQueryResult<ScryfallCard, ScryfallError>
}

/**
 * Wrapper component that handles loading, error, and success states for a card query.
 *
 * @example
 * ```tsx
 * const cardQuery = useQuery({
 *   queryKey: ['card', cardId],
 *   queryFn: () => fetchCard(cardId)
 * })
 *
 * <CardQueryWrapper cardQuery={cardQuery} />
 * ```
 *
 * @remarks Only works with `useQuery`. For `useSuspenseQuery`, use `CardRenderer` directly.
 */
export const CardQueryWrapper: FC<CardQueryWrapperProps> = ({ cardQuery }) => {
  // Handle loading state
  if (cardQuery.isLoading) {
    return <div>Loading...</div>
  }

  // Handle error state
  if (cardQuery.isError) {
    return <div>{`Error while fetching card: ${cardQuery.error.details}`}</div>
  }

  // Handle success state with data
  if (cardQuery.data) {
    return <CardRenderer card={cardQuery.data} variant={"page"} />
  }

  // Handle empty/undefined data state
  return (
    <div>
      <span>No card data available</span>
    </div>
  )
}
