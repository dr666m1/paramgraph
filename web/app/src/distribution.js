import { normal as normal_ } from "stats";

export const defaultDistribution = {
  name: "unspecified",
  display: ({}) => "unspecified",
  parameters: {},
  func: (_from, _to, {}) => [],
};

export const distributions = [
  // TODO define validator
  defaultDistribution,
  {
    name: "N(μ, σ)",
    label: ({ μ, σ }) => `N(${μ}, ${σ})`,
    parameters: { μ: 0, σ: 1 },
    func: (from, to, { μ, σ }) => normal_(from, to, μ, σ),
  },
];

export function getDistByName(name) {
  const dists = distributions.filter((d) => d.name === name);
  if (dists.length > 1) {
    throw new Error("cannot specify distribution");
  }
  // since parameters are edited, deepcopy is needed
  let dist = { ...dists[0] };
  dist.parameters = JSON.parse(JSON.stringify(dist.parameters));
  return dist;
}
