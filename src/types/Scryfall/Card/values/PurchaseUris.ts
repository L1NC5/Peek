/**
 * Possible purchase URIs for a card.
 */
export type ScryfallPurchaseUrisType = {
  /** This card's purchase page on TCGPlayer. */
  tcgplayer: string
  /** This card's purchase page on Cardmarket. Often inexact due to how Cardmarket links work. */
  cardmarket: string
  /** This card's purchase page on Cardhoarder. */
  cardhoarder: string
}
