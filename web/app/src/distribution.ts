import { Base64, decode } from "js-base64";
import { normal as normal_ } from "stats";

export const names = ["unspecified", "normal"] as const;
export type Name = (typeof names)[number];
export type Params = { [key: string]: number };

export type Dataset = {
  label: string;
  showLine: true;
  data: number[];
  idx: number; // used by chart.js
};

export abstract class Distribution<P extends Params> {
  params: P;
  constructor(params: P) {
    this.params = params;
  }
  abstract name: Name;
  abstract label(): string;
  abstract calc(from: number, to: number): number[];
  clone(): Distribution<Params> {
    const d = init(this.name);
    for (const [k, v] of Object.entries(this.params)) {
      d.params[k] = v;
    }
    return d;
  }
  toDataset(from: number, to: number, idx: number): Dataset {
    return {
      label: this.label(),
      showLine: true,
      data: this.calc(from, to),
      idx,
    };
  }
}

class Unspecified extends Distribution<Params> {
  name: Name = "unspecified";
  static init(params?: Params) {
    return new Unspecified({});
  }
  calc(from: number, to: number) {
    return [];
  }
  label() {
    return "unspecified";
  }
}

type NormalParams = Params & {
  mu: number;
  sigma: number;
};
class Normal extends Distribution<NormalParams> {
  name: Name = "normal";
  static init(params?: Params) {
    const p: NormalParams = { mu: 0, sigma: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new Normal(p);
  }
  calc(from: number, to: number) {
    return normal_(from, to, this.params.mu, this.params.sigma);
  }
  label() {
    return `N(${this.params.mu}, ${this.params.sigma})`;
  }
}

export function init(name: Name, params?: Params): Distribution<Params> {
  switch (name) {
    case "unspecified":
      return Unspecified.init(params);
    case "normal":
      return Normal.init(params);
  }
}

type ToBeShared = {
  params: Params;
  name: Name;
};
export function toBase64(dists: Distribution<Params>[]): string {
  const arr: ToBeShared[] = dists.map((d) => {
    return { params: d.params, name: d.name };
  });
  const json = JSON.stringify(arr);
  const b64 = Base64.encodeURL(json);
  return b64;
}

export function fromBase64(b64: string): Distribution<Params>[] {
  const json = Base64.decode(b64);
  const arr: ToBeShared[] = JSON.parse(json);
  return arr.map((elm) => init(elm.name, elm.params));
}
