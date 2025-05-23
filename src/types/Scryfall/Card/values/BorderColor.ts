/**
 * The border color of a print, not a reference to gameplay rules.
 */
export const ScryfallBorderColor = {
  Black: 'black',
  White: 'white',
  Borderless: 'borderless',
  Silver: 'silver',
  Gold: 'gold',
}

export type ScryfallBorderColor =
  (typeof ScryfallBorderColor)[keyof typeof ScryfallBorderColor]
