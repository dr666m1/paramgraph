import { Base64 } from "js-base64";

export function isDefined<T>(obj: T | undefined): obj is T {
  if (typeof obj === "undefined") {
    return false;
  }
  return true;
}

export function asNumber(s: unknown): number {
  if (typeof s === "string" && s.match(/^\s*$/)) {
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

export function toBase64(obj: unknown): string {
  const json = JSON.stringify(obj);
  const b64 = Base64.encodeURL(json);
  return b64;
}

export function fromBase64(b64: string): any {
  const json = Base64.decode(b64);
  return JSON.parse(json);
}

export function asDictOfStr(dict: { [key: string]: unknown }): {
  [key: string]: string;
} {
  const res: { [key: string]: string } = {};
  for (const [k, v] of Object.entries(dict)) {
    res[k] = String(v);
  }
  return res;
}

export function asDictOfNumber(dict: { [key: string]: unknown }): {
  [key: string]: number;
} {
  const res: { [key: string]: number } = {};
  for (const [k, v] of Object.entries(dict)) {
    res[k] = asNumber(v);
  }
  return res;
}
