export function isDefined<T>(obj: T | undefined): obj is T {
  if (typeof obj === "undefined") {
    return false;
  }
  return true;
}

export type Optional<T> = T | undefined;

export function asNumber(s: string): number {
  if (s.match(/^\s*$/)) {
    throw new Error("empty string");
  }
  let num: number;
  try {
    num = Number(s);
  } catch {
    throw new Error("invalid string");
  }
  if (isNaN(num)) {
    throw new Error("invalid string");
  }
  return num;
}
