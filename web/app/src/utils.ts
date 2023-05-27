import { Base64 } from "js-base64";

export function isDefined<T>(obj: T | undefined): obj is T {
  if (typeof obj === "undefined") {
    return false;
  }
  return true;
}

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

export function toBase64(obj: any): string {
  const json = JSON.stringify(obj);
  const b64 = Base64.encodeURL(json);
  return b64;
}

export function fromBase64(b64: string): any {
  const json = Base64.decode(b64);
  return JSON.parse(json);
}
