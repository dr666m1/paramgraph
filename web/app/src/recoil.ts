import { atom, selector } from "recoil";

import * as D from "./distribution";
import * as T from "./types";
import * as U from "./utils";

export const range = atom<[string, string]>({
  key: "range",
  default: ["-3", "3"],
});

export const distributions = atom<T.Input["dists"]>({
  key: "distributions",
  default: [{ name: "Unspecified", params: {} }],
});

export const datasets = selector<T.Dataset[]>({
  key: "datasets",
  get: ({ get }) => {
    const ds = get(distributions).filter(U.isDefined).map(D.dInput2Dist);
    const r = get(range);
    let temp: U.Optional<T.Dataset>[] = ds.map((d, i) => {
      if (!U.isDefined(d)) {
        return undefined;
      }
      try {
        return d.toDataset(Number(r[0]), Number(r[1]), i);
      } catch {
        return { label: "error", showLine: true, data: [], idx: i };
      }
    });
    const datasets = temp.filter(U.isDefined);
    return datasets;
  },
});
