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
  weibull,
} from "stats";

const LEN = 200;
type Point = {
  x: number;
  y: number;
};

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
  "uniform",
  "weibull",
] as const;
export type Name = (typeof names)[number];
export type Params = { [key: string]: number };

export type Dataset = {
  label: string;
  showLine: true;
  data: Point[];
  idx: number; // used by chart.js
};

export abstract class Distribution<P extends Params = Params> {
  params: P;
  constructor(params: P) {
    this.params = params;
  }
  abstract name: Name;
  abstract label(): string;
  abstract calc(from: number, to: number): Point[];
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
  shape_a: number;
  shape_b: number;
};
class Beta extends Distribution<BetaParams> {
  name: Name = "beta";
  static init(params?: Params) {
    const p: BetaParams = { shape_a: 1, shape_b: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new Beta(p);
  }
  calc(from: number, to: number) {
    return beta(from, to, LEN, this.params.shape_a, this.params.shape_b);
  }
  label() {
    return `Beta(${this.params.shape_a}, ${this.params.shape_b})`;
  }
}

type CauchyParams = Params & {
  location: number;
  scale: number;
};
class Cauchy extends Distribution<CauchyParams> {
  name: Name = "cauchy";
  static init(params?: Params) {
    const p: CauchyParams = { location: 0, scale: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new Cauchy(p);
  }
  calc(from: number, to: number) {
    return cauchy(from, to, LEN, this.params.location, this.params.scale);
  }
  label() {
    return `Cauchy(${this.params.location}, ${this.params.scale})`;
  }
}

type ChiSquaredParams = Params & {
  freedom: number;
};
class ChiSquared extends Distribution<ChiSquaredParams> {
  name: Name = "chi_squared";
  static init(params?: Params) {
    const p: ChiSquaredParams = { freedom: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new ChiSquared(p);
  }
  calc(from: number, to: number) {
    return chi_squared(from, to, LEN, this.params.freedom);
  }
  label() {
    return `ChiSquared(${this.params.freedom})`;
  }
}

type ExpParams = Params & {
  rate: number;
};
class Exp extends Distribution<ExpParams> {
  name: Name = "exp";
  static init(params?: Params) {
    const p: ExpParams = { rate: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new Exp(p);
  }
  calc(from: number, to: number) {
    return exp_(from, to, LEN, this.params.rate);
  }
  label() {
    return `Exp(${this.params.rate})`;
  }
}

type GammaParams = Params & {
  shape: number;
  rate: number;
};
class Gamma extends Distribution<GammaParams> {
  name: Name = "gamma";
  static init(params?: Params) {
    const p: GammaParams = { shape: 1, rate: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new Gamma(p);
  }
  calc(from: number, to: number) {
    return gamma(from, to, LEN, this.params.shape, this.params.rate);
  }
  label() {
    return `Gamma(${this.params.shape}, ${this.params.rate})`;
  }
}

class InverseGamma extends Distribution<GammaParams> {
  name: Name = "inverse_gamma";
  static init(params?: Params) {
    const p: GammaParams = { shape: 1, rate: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new InverseGamma(p);
  }
  calc(from: number, to: number) {
    return inverse_gamma(from, to, LEN, this.params.shape, this.params.rate);
  }
  label() {
    return `InverseGamma(${this.params.shape}, ${this.params.rate})`;
  }
}

class LogNormal extends Distribution<NormalParams> {
  name: Name = "log_normal";
  static init(params?: Params) {
    const p: NormalParams = { location: 0, scale: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new LogNormal(p);
  }
  calc(from: number, to: number) {
    return log_normal(from, to, LEN, this.params.location, this.params.scale);
  }
  label() {
    return `LogNormal(${this.params.location}, ${this.params.scale})`;
  }
}

type NormalParams = Params & {
  location: number;
  scale: number;
};
class Normal extends Distribution<NormalParams> {
  name: Name = "normal";
  static init(params?: Params) {
    const p: NormalParams = { location: 0, scale: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new Normal(p);
  }
  calc(from: number, to: number) {
    return normal(from, to, LEN, this.params.location, this.params.scale);
  }
  label() {
    return `Normal(${this.params.location}, ${this.params.scale})`;
  }
}

type StudentsTParams = Params & {
  freedom: number;
};
class StudentsT extends Distribution<StudentsTParams> {
  name: Name = "students_t";
  static init(params?: Params) {
    const p: StudentsTParams = { freedom: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new StudentsT(p);
  }
  calc(from: number, to: number) {
    return students_t(from, to, LEN, this.params.freedom);
  }
  label() {
    return `StudentsT(${this.params.freedom})`;
  }
}

type UniformParams = Params & {
  min: number;
  max: number;
};
class Uniform extends Distribution<UniformParams> {
  name: Name = "uniform";
  static init(params?: Params) {
    const p: UniformParams = { min: 0, max: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new Uniform(p);
  }
  calc(from: number, to: number) {
    const diff = this.params.max - this.params.min;
    if (diff <= 0) {
      throw new Error("invalid parameter");
    }
    const y = 1 / diff;
    if (this.params.max < from || to < this.params.min) {
      return [];
    } else if (from < this.params.min && this.params.max < to) {
      return [
        { x: this.params.min, y },
        { x: this.params.max, y },
      ];
    } else if (this.params.min <= from) {
      return [
        { x: from, y },
        { x: this.params.max, y },
      ];
    } else if (to <= this.params.max) {
      return [
        { x: this.params.min, y },
        { x: to, y },
      ];
    } else {
      throw new Error("somethig went wrong");
    }
  }
  label() {
    return `Uniform(${this.params.min}, ${this.params.max})`;
  }
}

type WeibullParams = Params & {
  shape: number;
  scale: number;
};
class Weibull extends Distribution<WeibullParams> {
  name: Name = "students_t";
  static init(params?: Params) {
    const p: WeibullParams = { shape: 1, scale: 1 };
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        p[k] = v;
      }
    }
    return new Weibull(p);
  }
  calc(from: number, to: number) {
    return weibull(from, to, LEN, this.params.shape, this.params.scale);
  }
  label() {
    return `Weibull(${this.params.shape}, ${this.params.scale})`;
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
    case "uniform":
      return Uniform.init(params);
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
