/**
 * Splits an array into smaller sub-arrays (chunks) of a specified maximum size.
 *
 * @example
 * chunkArray([1, 2, 3, 4, 5], 2)
 * // Returns: [[1, 2], [3, 4], [5]]
 */
export function chunkArray<T>(arr: Array<T>, size: number): Array<Array<T>> {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  )
}
