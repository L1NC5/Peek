/**
 * Array defining all possible card layouts
 *
 * @see {@link ScryfallLayoutType} for the type of this group
 */
export const ScryfallLayout = {
  /** A standard Magic card with one face */
  Normal: 'normal',
  /** A split-faced card */
  Split: 'split',
  /** Cards that invert vertically with the flip keyword */
  Flip: 'flip',
  /** Double-sided cards that transform */
  Transform: 'transform',
  /** Double-sided cards that can be played either-side */
  ModalDfc: 'modal_dfc',
  /** Cards with meld parts printed on the back */
  Meld: 'meld',
  /** Cards with Level Up */
  Leveler: 'leveler',
  /** Class-type enchantment cards */
  Class: 'class',
  /** Saga-type cards */
  Saga: 'saga',
  /** Cards with an Adventure spell part */
  Adventure: 'adventure',
  /** Cards with Mutate */
  Mutate: 'mutate',
  /** Cards with Prototype */
  Prototype: 'prototype',
  /** Battle-type cards */
  Battle: 'battle',
  /** Plane and Phenomenon-type cards */
  Planar: 'planar',
  /** Scheme-type cards */
  Scheme: 'scheme',
  /** Vanguard-type cards */
  Vanguard: 'vanguard',
  /** Token cards */
  Token: 'token',
  /** Tokens with another token printed on the back */
  DoubleFacedToken: 'double_faced_token',
  /** Emblem cards */
  Emblem: 'emblem',
  /** Cards with Augment */
  Augment: 'augment',
  /** Host-type cards */
  Host: 'host',
  /** Art Series collectable double-faced cards */
  ArtSeries: 'art_series',
  /** A Magic card with two sides that are unrelated */
  ReversibleCard: 'reversible_card',
  /** A special type of multi-part enchantment from Murders at Karlov Manor */
  Case: 'case',
} as const

/**
 * Type defining all possible card layouts
 *
 * @see {@link ScryfallLayout} for an array version
 */
export type ScryfallLayoutType =
  (typeof ScryfallLayout)[keyof typeof ScryfallLayout]

/**
 * Groupings of layouts
 */
export const ScryfallLayoutGroup = {
  /**
   * All layouts that represent a single-faced card (no card_faces property)
   */
  SingleFaced: [
    ScryfallLayout.Normal,
    ScryfallLayout.Meld,
    ScryfallLayout.Leveler,
    ScryfallLayout.Class,
    ScryfallLayout.Saga,
    ScryfallLayout.Mutate,
    ScryfallLayout.Prototype,
    ScryfallLayout.Battle,
    ScryfallLayout.Planar,
    ScryfallLayout.Scheme,
    ScryfallLayout.Vanguard,
    ScryfallLayout.Token,
    ScryfallLayout.Emblem,
    ScryfallLayout.Augment,
    ScryfallLayout.Host,
  ] as const,

  /**
   * Multi-faced cards with both faces on the front
   */
  SingleSided: [
    ScryfallLayout.Split,
    ScryfallLayout.Flip,
    ScryfallLayout.Adventure,
  ] as const,

  /**
   * Multi-faced cards with front/back faces
   */
  DoubleSidedSplit: [
    ScryfallLayout.Transform,
    ScryfallLayout.ModalDfc,
    ScryfallLayout.DoubleFacedToken,
    ScryfallLayout.ArtSeries,
  ] as const,
}

/**
 * Type defining layout group types
 *
 * @see ScryfallLayoutGroup
 */
export type ScryfallLayoutGroupType = typeof ScryfallLayoutGroup

