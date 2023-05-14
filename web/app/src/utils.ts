export function isDefined<T>(obj: T | undefined): obj is T {
  if (typeof obj === "undefined") {
    return false
  }
  return true
}

export type Optional<T> = T | undefined
