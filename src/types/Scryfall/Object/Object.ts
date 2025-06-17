/**
 * Object defining all possible object types in the Scryfall API
 *
 * @see {@link ScryfallObjectType} for the type of this group
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

/**
 * Type defining all possible object types in the Scryfall API
 *
 * @see {@link ScryfallObject} for an array version
 */
export type ScryfallObjectType =
  (typeof ScryfallObject)[keyof typeof ScryfallObject]

/**
 * Interface defining a base object, extended by every other object in the api
 *
 * Mainly used to define list objects correctly
 */
export interface ScryfallBaseObject {
  object: ScryfallObjectType
}
