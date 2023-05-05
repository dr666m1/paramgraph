export const defaultDistribution = {
  name: "unspecified",
  display: ({}) => "unspecified",
  parameters: [],
};

export const distributions = [
  defaultDistribution,
  {
    name: "N(μ, σ)",
    display: ({ μ, σ }) => `N(${μ}, ${σ})`,
    parameters: [
      { key: "μ", value: 0 },
      { key: "σ", value: 1 },
    ],
  },
];

export function obj2arr(obj) {
  let temp = [];
  for (const [k, v] of Object.entries(obj)) {
    temp = [...temp, { key: k, value: v }];
  }
  return temp;
}

export function getDistByName(name) {
  const dists = distributions.filter((d) => d.name === name);
  if (dists.length > 1) {
    throw new Error("cannot specify distribution");
  }
  return dists[0];
}

export function getParamsAsObj(dist) {
  const arr = dist.parameters;
  let temp = {};
  for (const elm of arr) {
    temp[elm.key] = elm.value;
  }
  return temp;
}
