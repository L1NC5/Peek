export const ScryfallColor = {
  White: 'W',
  Blue: 'U',
  Black: 'B',
  Red: 'R',
  Green: 'G',
  Colorless: 'C',
} as const

export type ScryfallColor = (typeof ScryfallColor)[keyof typeof ScryfallColor]
