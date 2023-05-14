import { atom } from "recoil";

import * as U from "./utils";
import * as D from "./distribution";

export const range = atom<[number, number]>({ key: "range", default: [-3, 3] });

export const dists = atom<U.Optional<D.Distribution>[]>({
  key: "dists",
  default: [D.init("unspecified")],
});
