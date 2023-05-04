export const defaultDistribution = { name: "unspecified", parameters: [] }

export const distributions = [
  defaultDistribution,
  {
    name: "N(μ, α)",
    parameters: [
      { "key": "μ", "value": 0 },
      { "key": "σ", "value": 1 },
    ],
  },
]
