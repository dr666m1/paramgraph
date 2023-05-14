import { atom, selector } from "recoil";

import * as D from "./distribution";
import * as U from "./utils";

export const range = atom<[number, number]>({ key: "range", default: [-3, 3] });

export const dists = atom<U.Optional<D.Distribution>[]>({
  key: "dists",
  default: [D.init("unspecified")],
});

export const datasets = selector({
  key: "datasets",
  get: ({ get }) => {
    const ds = get(dists);
    const r = get(range);
    let temp = ds.map((d, i) => {
      if (!U.isDefined(d)) {
        return undefined;
      }
      return d.toDataset(r[0], r[1], i);
    });
    const datasets = temp.filter(U.isDefined);
    return datasets;
  },
});
