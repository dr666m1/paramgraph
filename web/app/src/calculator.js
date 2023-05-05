import { normal as normal_ } from "stats";

export function normal(from, to, { μ, σ }) {
  return normal_(from, to, μ, σ);
}
