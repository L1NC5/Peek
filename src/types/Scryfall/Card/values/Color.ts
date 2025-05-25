/**
 * Object defining all possible colors
 *
 * @see {@link ScryfallColorType} for the type of this group
 */
export const ScryfallColor = {
  White: 'W',
  Blue: 'U',
  Black: 'B',
  Red: 'R',
  Green: 'G',
  Colorless: 'C',
} as const

/**
 * Type defining all possible colors
 *
 * @see {@link ScryfallColor} for an array version
 */
export type ScryfallColorType = (typeof ScryfallColor)[keyof typeof ScryfallColor]
