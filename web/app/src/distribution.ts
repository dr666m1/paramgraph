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
import * as T from "./types";

const LEN = 300;

abstract class Distribution<P extends T.Params = T.Params> {
  params: P;
  constructor(params: P) {
    this.params = params;
  }
  abstract name: T.Name;
  abstract label(): string;
  abstract calc(from: number, to: number): T.Point[];
  clone(): Distribution {
    const d = init(this.name);
    for (const [k, v] of Object.entries(this.params)) {
      d.params[k] = v;
    }
    return d;
  }
  toDataset(from: number, to: number, idx: number): T.Dataset {
    return {
      label: this.label(),
      showLine: true,
      data: this.calc(from, to).filter((p) => 0 < p.y),
      idx,
    };
  }
  toInput(): T.InputDist {
    const n = this.name;
    const p: { [key: string]: string } = {};
    for (const [k, v] of Object.entries(this.params)) {
      p[k] = String(v);
    }
    return { name: n, params: p };
  }
}

class Unspecified extends Distribution {
  name: T.Name = "Unspecified";
  static init(_params?: T.Params) {
    return new Unspecified({});
  }
  calc(_from: number, _to: number) {
    return [];
  }
  label() {
    return "Unspecified";
  }
}

type BetaParams = T.Params & {
  shape_a: number;
  shape_b: number;
};
class Beta extends Distribution<BetaParams> {
  name: T.Name = "Beta";
  static init(params?: T.Params) {
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

type CauchyParams = T.Params & {
  location: number;
  scale: number;
};
class Cauchy extends Distribution<CauchyParams> {
  name: T.Name = "Cauchy";
  static init(params?: T.Params) {
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

type ChiSquaredParams = T.Params & {
  freedom: number;
};
class ChiSquared extends Distribution<ChiSquaredParams> {
  name: T.Name = "ChiSquared";
  static init(params?: T.Params) {
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

type ExpParams = T.Params & {
  rate: number;
};
class Exp extends Distribution<ExpParams> {
  name: T.Name = "Exp";
  static init(params?: T.Params) {
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

type GammaParams = T.Params & {
  shape: number;
  rate: number;
};
class Gamma extends Distribution<GammaParams> {
  name: T.Name = "Gamma";
  static init(params?: T.Params) {
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
  name: T.Name = "InverseGamma";
  static init(params?: T.Params) {
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
  name: T.Name = "LogNormal";
  static init(params?: T.Params) {
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

type NormalParams = T.Params & {
  location: number;
  scale: number;
};
class Normal extends Distribution<NormalParams> {
  name: T.Name = "Normal";
  static init(params?: T.Params) {
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

type StudentsTParams = T.Params & {
  freedom: number;
};
class StudentsT extends Distribution<StudentsTParams> {
  name: T.Name = "StudentsT";
  static init(params?: T.Params) {
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

type UniformParams = T.Params & {
  min: number;
  max: number;
};
class Uniform extends Distribution<UniformParams> {
  name: T.Name = "Uniform";
  static init(params?: T.Params) {
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

type WeibullParams = T.Params & {
  shape: number;
  scale: number;
};
class Weibull extends Distribution<WeibullParams> {
  name: T.Name = "Weibull";
  static init(params?: T.Params) {
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

export function init(name: T.Name, params?: T.Params): Distribution {
  switch (name) {
    case "Unspecified":
      return Unspecified.init(params);

    case "Beta":
      return Beta.init(params);
    case "Cauchy":
      return Cauchy.init(params);
    case "ChiSquared":
      return ChiSquared.init(params);
    case "Exp":
      return Exp.init(params);
    case "Gamma":
      return Gamma.init(params);
    case "InverseGamma":
      return InverseGamma.init(params);
    case "LogNormal":
      return LogNormal.init(params);
    case "Normal":
      return Normal.init(params);
    case "StudentsT":
      return StudentsT.init(params);
    case "Weibull":
      return Weibull.init(params);
    case "Uniform":
      return Uniform.init(params);
  }
}

export function dInput2Dist(di: T.InputDist): Distribution {
  const n = di.name;
  const p: T.Params = {};
  for (const [k, v] of Object.entries(di.params)) {
    p[k] = Number(v);
  }
  return init(n, p);
}
