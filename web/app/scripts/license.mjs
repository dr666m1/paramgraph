#!/usr/bin/env zx
import fs from "fs";

const result = "./.next/oss-licenses.json";
const source = "./public/notices-js.json";

const retry = async () => {
  echo`license changes are detected! building again...`;
  await $`cp ${result} ${source}`;
  await $`npx next build`;
};
const read = (file) => {
  return fs.readFileSync(file).toString();
};

await $`npx next build`;

let shouldRetry = false;
try {
  shouldRetry = read(result) !== read(source);
} catch {
  shouldRetry = true; // if source does not exist
}

if (shouldRetry) {
  await retry();
}
