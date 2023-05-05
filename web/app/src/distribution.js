export const defaultDistribution = {
  name: "unspecified",
  display: ({}) => "unspecified",
  parameters: {},
};

export const distributions = [
  // TODO define validator
  defaultDistribution,
  {
    name: "N(μ, σ)",
    display: ({ μ, σ }) => `N(${μ}, ${σ})`,
    parameters: { μ: 0, σ: 1 },
  },
];

export function getDistByName(name) {
  const dists = distributions.filter((d) => d.name === name);
  if (dists.length > 1) {
    throw new Error("cannot specify distribution");
  }
  return dists[0];
}
