import { Base64 } from "js-base64";
import {
  beta,
  cauchy,
  chi_squared,
  exp_,
  gamma,
  inverse_gamma,
  log_normal,
  normal,
  students_t,
  // uniform,
  weibull,
} from "stats";

export const names = [
  "unspecified",
  "beta",
  "cauchy",
  "chi_squared",
  "exp",
  "gamma",
  "inverse_gamma",
  "log_normal",
  "normal",
  "students_t",
  // "uniform",
  "weibull",
] as const;
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

type BetaParams = Params & {
  α: number;
  β: number;
};
class Beta extends Distribution<BetaParams> {
  name: Name = "beta";
  static init(params?: Params) {
    const p: BetaParams = { α: 1, β: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new Beta(p);
  }
  calc(from: number, to: number) {
    return beta(from, to, this.params.α, this.params.β);
  }
  label() {
    return `B(${this.params.α}, ${this.params.β})`;
  }
}

type CauchyParams = Params & {
  x0: number;
  γ: number;
};
class Cauchy extends Distribution<CauchyParams> {
  name: Name = "cauchy";
  static init(params?: Params) {
    const p: CauchyParams = { x0: 0, γ: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new Cauchy(p);
  }
  calc(from: number, to: number) {
    return cauchy(from, to, this.params.x0, this.params.γ);
  }
  label() {
    return `Cauchy(${this.params.x0}, ${this.params.γ})`;
  }
}

type ChiSquaredParams = Params & {
  k: number;
};
class ChiSquared extends Distribution<ChiSquaredParams> {
  name: Name = "chi_squared";
  static init(params?: Params) {
    const p: ChiSquaredParams = { k: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new ChiSquared(p);
  }
  calc(from: number, to: number) {
    return chi_squared(from, to, this.params.k);
  }
  label() {
    return `ChiSquared(${this.params.k})`;
  }
}

type ExpParams = Params & {
  λ: number;
};
class Exp extends Distribution<ExpParams> {
  name: Name = "exp";
  static init(params?: Params) {
    const p: ExpParams = { λ: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new Exp(p);
  }
  calc(from: number, to: number) {
    return exp_(from, to, this.params.λ);
  }
  label() {
    return `Exp(${this.params.λ})`;
  }
}

type GammaParams = Params & {
  α: number;
  β: number;
};
class Gamma extends Distribution<GammaParams> {
  name: Name = "gamma";
  static init(params?: Params) {
    const p: GammaParams = { α: 1, β: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new Gamma(p);
  }
  calc(from: number, to: number) {
    return gamma(from, to, this.params.α, this.params.β);
  }
  label() {
    return `Gamma(${this.params.α}, ${this.params.β})`;
  }
}

class InverseGamma extends Distribution<GammaParams> {
  name: Name = "inverse_gamma";
  static init(params?: Params) {
    const p: GammaParams = { α: 1, β: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new InverseGamma(p);
  }
  calc(from: number, to: number) {
    return inverse_gamma(from, to, this.params.α, this.params.β);
  }
  label() {
    return `InverseGamma(${this.params.α}, ${this.params.β})`;
  }
}

class LogNormal extends Distribution<NormalParams> {
  name: Name = "log_normal";
  static init(params?: Params) {
    const p: NormalParams = { μ: 0, σ: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new LogNormal(p);
  }
  calc(from: number, to: number) {
    return log_normal(from, to, this.params.μ, this.params.σ);
  }
  label() {
    return `LogNormal(${this.params.μ}, ${this.params.σ})`;
  }
}

type NormalParams = Params & {
  μ: number;
  σ: number;
};
class Normal extends Distribution<NormalParams> {
  name: Name = "normal";
  static init(params?: Params) {
    const p: NormalParams = { μ: 0, σ: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new Normal(p);
  }
  calc(from: number, to: number) {
    return normal(from, to, this.params.μ, this.params.σ);
  }
  label() {
    return `N(${this.params.μ}, ${this.params.σ})`;
  }
}

type StudentsTParams = Params & {
  k: number;
};
class StudentsT extends Distribution<StudentsTParams> {
  name: Name = "students_t";
  static init(params?: Params) {
    const p: StudentsTParams = { k: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new StudentsT(p);
  }
  calc(from: number, to: number) {
    return students_t(from, to, this.params.k);
  }
  label() {
    return `StudentsT(${this.params.k})`;
  }
}

// type UniformParams = Params & {
//   a: number;
//   b: number;
// };
// class Uniform extends Distribution<UniformParams> {
//   name: Name = "uniform";
//   static init(params?: Params) {
//     const p: UniformParams = { a: 0, b:1 };
//     if (params) {
//       for (const [k, v] of Object.entries(params)) {
//         p[k] = v;
//       }
//     }
//     return new Uniform(p);
//   }
//   calc(from: number, to: number) {
//     return uniform(this.params.a, this.params.b);
//   }
//   label() {
//     return `Uniform(${this.params.k})`;
//   }
// }

type WeibullParams = Params & {
  a: number;
  b: number;
};
class Weibull extends Distribution<WeibullParams> {
  name: Name = "students_t";
  static init(params?: Params) {
    const p: WeibullParams = { a: 1, b: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new Weibull(p);
  }
  calc(from: number, to: number) {
    return weibull(from, to, this.params.a, this.params.b);
  }
  label() {
    return `Weibull(${this.params.a}, ${this.params.b})`;
  }
}

export function init(name: Name, params?: Params): Distribution {
  switch (name) {
    case "unspecified":
      return Unspecified.init(params);

    case "beta":
      return Beta.init(params);
    case "cauchy":
      return Cauchy.init(params);
    case "chi_squared":
      return ChiSquared.init(params);
    case "exp":
      return Exp.init(params);
    case "gamma":
      return Gamma.init(params);
    case "inverse_gamma":
      return InverseGamma.init(params);
    case "log_normal":
      return LogNormal.init(params);
    case "normal":
      return Normal.init(params);
    case "students_t":
      return StudentsT.init(params);
    case "weibull":
      return Weibull.init(params);
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
