import { normal } from "stats"

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

export function myNormal(from, to, { μ, σ }) {
  return normal(from, to, μ, σ)
}
