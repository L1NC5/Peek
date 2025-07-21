import type { ScryfallBaseObject, ScryfallObjectType, ScryfallObjectTypeMap } from '@/types/Scryfall'

/**
 * Type guard that checks if a given value is included in a provided list of allowed values.
 *
 * @example
 * ```ts
 * const colors = ['red', 'green', 'blue'] as const
 *
 * if (isOneOf('red', colors)) {
 *   // TypeScript now knows it's one of the allowed colors
 * }
 * ```
 *
 * @template T - Union type of allowed values.
 * @param value - The value to test.
 * @param allowed - An array of allowed values (e.g., a `const` tuple).
 * @returns `true` if the value is in the allowed list, `false` otherwise.
 */
export function isOneOf<T extends ReadonlyArray<unknown>>(
  value: unknown,
  allowed: T,
): value is T[number] {
  return allowed.includes(value as T[number])
}

/**
 * Runtime assertion that ensures a given value is in a provided list of allowed values.
 *
 * Throws a descriptive error if the value is not valid.
 *
 * @example
 * ```ts
 * const directions = ['north', 'south', 'east', 'west'] as const
 *
 * assertOneOf('north', directions)
 * // Now TypeScript knows it's a valid direction
 * ```
 *
 * @template T - Union type of allowed values.
 * @param value - The value to validate.
 * @param allowed - An array of allowed values.
 * @throws {Error} If the value is not in the list.
 */
export function assertOneOf<T extends ReadonlyArray<unknown>>(
  value: unknown,
  allowed: T,
): asserts value is T[number] {
  if (!isOneOf(value, allowed)) {
    throw new Error(
      `Invalid value: "${String(value)}". Expected one of: [${allowed.join(', ')}]`,
    )
  }
}

/**
 * Runtime assertion that ensures a Scryfall object is of a specific type.
 *
 * This function throws an error if the object's `object` field does not match
 * the expected Scryfall type. It is useful in cases where a strong runtime guarantee
 * is needed in addition to TypeScript's static typing.
 *
 * @example
 * ```ts
 * const card: ScryfallBaseObject = fetchCard()
 * assertScryfallObject(card, 'card')
 * // `card` is now strongly typed as a ScryfallCard
 * ```
 *
 * @remarks
 * Use this when you want to enforce type expectations at runtime. If you don't want
 * to throw errors, prefer {@link validators}.
 *
 * @throws {Error} If the object's type does not match the expected type.
 */
export const assertScryfallObject = <T extends ScryfallObjectType>(
  item: ScryfallBaseObject,
  type: T,
): asserts item is ScryfallObjectTypeMap[T] => {
  if (item.object !== type) {
    throw new Error(
      `Expected Scryfall object of type "${type}", but got "${item.object}"`,
    )
  }
}

/**
 * Type guard that checks if a Scryfall object is of a specific type.
 *
 * This is a safe way to narrow a Scryfall object to a specific subtype
 * without throwing an error. Use this in conditional logic when working
 * with heterogeneous Scryfall objects.
 *
 * @example
 * ```ts
 * if (isScryfallObject(obj, 'card')) {
 *   console.log(obj.name) // obj is now typed as ScryfallCard
 * }
 * ```
 *
 * @remarks
 * This is a non-throwing alternative to {@link assertScryfallObject}.
 * Useful when working with optional or unknown Scryfall data.
 *
 * @returns `true` if the object matches the expected type, otherwise `false`.
 */
export function validators<T extends ScryfallObjectType>(
  item: ScryfallBaseObject,
  type: T,
): item is ScryfallObjectTypeMap[T] {
  return item.object === type
}
