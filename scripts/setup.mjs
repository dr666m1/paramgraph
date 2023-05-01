#!/usr/bin/env zx

let account = await $`aws sts get-caller-identity --query Account --output text`;
let region = await $`aws configure get region`;

await $`npx cdk bootstrap aws://${account}/${region}`

await $`cargo install cargo-bundle-licenses`
