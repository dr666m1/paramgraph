export const names = [
  "Unspecified",
  "Beta",
  "Cauchy",
  "ChiSquared",
  "Exp",
  "Gamma",
  "InverseGamma",
  "LogNormal",
  "Normal",
  "StudentsT",
  "Uniform",
  "Weibull",
] as const;

export type Name = (typeof names)[number];

export type Input = {
  range: [string, string];
  dists: Optional<InputDist>[];
};

export type InputDist = {
  name: Name;
  params: { [key: string]: string };
};

export type Dataset = {
  label: string;
  showLine: true;
  data: Point[];
  idx: number; // used by chart.js
};

export type Point = {
  x: number;
  y: number;
};

export type Params = { [key: string]: number };

export type Optional<T> = T | undefined;
