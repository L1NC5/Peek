/**
 * Type defining all possible object types in the Scryfall API
 */
export const ScryfallObject = {
  Card: 'card',
  CardFace: 'card_face',
  CardSymbol: 'card_symbol',
  Catalog: 'catalog',
  Error: 'error',
  List: 'list',
  ManaCost: 'mana_cost',
  Migration: 'migration',
  RelatedCard: 'related_card',
  Ruling: 'ruling',
  Set: 'set',
} as const

export type ScryfallObject =
  (typeof ScryfallObject)[keyof typeof ScryfallObject]
