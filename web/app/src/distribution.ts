import { normal as normal_ } from "stats";

export const defaultDistribution = {
  name: "unspecified",
  label: ({}) => "unspecified",
  parameters: {},
  func: (_from: number, _to: number, {}) => [],
};

export const distributions = [
  // TODO define validator
  defaultDistribution,
  {
    name: "N(μ, σ)",
    label: ({ μ, σ }: any) => `N(${μ}, ${σ})`, // TODO rm any
    parameters: { μ: 0, σ: 1 },
    func: (from: number, to: number, { μ, σ }: any) => normal_(from, to, μ, σ), // TODO rm any
  },
];

export function getDistByName(name: string) {
  const dists = distributions.filter((d) => d.name === name);
  if (dists.length > 1) {
    throw new Error("cannot specify distribution");
  }
  // since parameters are edited, deepcopy is needed
  let dist = { ...dists[0] };
  dist.parameters = JSON.parse(JSON.stringify(dist.parameters));
  return dist;
}
