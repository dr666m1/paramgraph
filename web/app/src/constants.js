export const defaultDistribution = { name: "unspecified", parameters: {} }

export const distributions = [
  defaultDistribution,
  {
    name: "N(μ, α)",
    parameters: {
      "μ": 0,
      "σ": 1,
    },
  },
]
