import { Base64 } from "js-base64";
import {
  // beta,
  // cauchy,
  // chi_squared,
  // exp_,
  // gamma,
  // inverse_gamma,
  // log_normal,
  normal,
  // students_t,
  // uniform,
  // weibull,
} from "stats";

export const names = ["unspecified", "normal"] as const;
export type Name = (typeof names)[number];
export type Params = { [key: string]: number };

export type Dataset = {
  label: string;
  showLine: true;
  data: number[];
  idx: number; // used by chart.js
};

export abstract class Distribution<P extends Params = Params> {
  params: P;
  constructor(params: P) {
    this.params = params;
  }
  abstract name: Name;
  abstract label(): string;
  abstract calc(from: number, to: number): number[];
  clone(): Distribution {
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

class Unspecified extends Distribution {
  name: Name = "unspecified";
  static init(_params?: Params) {
    return new Unspecified({});
  }
  calc(_from: number, _to: number) {
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
    return normal(from, to, this.params.mu, this.params.sigma);
  }
  label() {
    return `N(${this.params.mu}, ${this.params.sigma})`;
  }
}

export function init(name: Name, params?: Params): Distribution {
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
export function toBase64(dists: Distribution[]): string {
  const arr: ToBeShared[] = dists.map((d) => {
    return { params: d.params, name: d.name };
  });
  const json = JSON.stringify(arr);
  const b64 = Base64.encodeURL(json);
  return b64;
}

export function fromBase64(b64: string): Distribution[] {
  const json = Base64.decode(b64);
  const arr: ToBeShared[] = JSON.parse(json);
  return arr.map((elm) => init(elm.name, elm.params));
}
