/**
 * Type defining all possible object types in the Scryfall API
 *
 * @example
 * // Get the type of a specific kind of object
 * list = ScryfallObject.List
 * // Get the union of all types
 * object = ScryfallObject
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
