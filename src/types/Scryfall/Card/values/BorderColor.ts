/**
 * The border color of a print, not a reference to gameplay rules.
 *
 * @see {@link ScryfallBorderColorType} for the type of this group
 */
export const ScryfallBorderColor = {
  Black: 'black',
  White: 'white',
  Borderless: 'borderless',
  Silver: 'silver',
  Gold: 'gold',
} as const

/**
 * Type defining all possible border colors in the Scryfall API
 *
 * @see {@link ScryfallBorderColor} for an array version
 */
export type ScryfallBorderColorType =
  (typeof ScryfallBorderColor)[keyof typeof ScryfallBorderColor]
