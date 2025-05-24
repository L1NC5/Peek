export const ScryfallSecurityStamp = {
  Oval: 'oval',
  Triangle: 'triangle',
  Acorn: 'acorn',
  Circle: 'circle',
  Arena: 'arena',
  Heart: 'heart',
}

export type ScryfallSecurityStampType =
  (typeof ScryfallSecurityStamp)[keyof typeof ScryfallSecurityStamp]
