#!/usr/bin/env zx

cd("./web/stats")

await $`wasm-pack build --target bundler`;

await $`cargo install cargo-bundle-licenses`
const args = [
  "--format",
  "json",
  "--output",
  "notices-rs.json",
]
await $`cargo bundle-licenses ${args}`

await $`cp notices-rs.json ../app/public/notices-rs.json`
