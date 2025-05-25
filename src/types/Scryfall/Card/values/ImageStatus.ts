/**
 * Object defining all possible image statuses
 *
 * @see {@link ScryfallImageStatusType} for the type of this group
 */
export const ScryfallImageStatus = {
  /**
   * This card's image is missing. It has not been added yet.
   * This is usually an error Scryfall will catch quickly, but some cases involve uploading cards that simply do not yet have images available at all, such as unsigned art cards.
   */
  Missing: 'missing',
  /**
   * This card's image is a placeholder Scryfall has generated and visibly marked as such.
   * This is most commonly seen for languages where no real images are yet available to us.
   */
  Placeholder: 'placeholder',
  /**
   * This card's image is low resolution.
   * This will most commonly be seen on recently previewed cards.
   */
  LowRes: 'lowres',
  /**
   * This card's image is high resolution and/or a scan.
   * In theory this should be a scan, in practice it might be tripped by other large imagery.
   */
  HighResScan: 'highres_scan',
} as const

/**
 * Type defining all possible finishes in the Scryfall API
 *
 * @see {@link ScryfallImageStatus} for an array version
 */
export type ScryfallImageStatusType =
  (typeof ScryfallImageStatus)[keyof typeof ScryfallImageStatus]
