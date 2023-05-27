import { atom, selector } from "recoil";

import * as D from "./distribution";
import * as T from "./types";
import * as U from "./utils";

export const range = atom<[string, string]>({
  key: "range",
  default: ["-3", "3"],
});

export const defaultDist: T.InputDist = { name: "Unspecified", params: {} };

export const distributions = atom<T.Input["dists"]>({
  key: "distributions",
  default: [defaultDist],
});

// NOTE
// may be useful when you want to remember previous value
// https://github.com/facebookexperimental/Recoil/issues/290
export const datasets = selector<T.Dataset[]>({
  key: "datasets",
  get: ({ get }) => {
    const r = get(range);
    const ds = get(distributions).filter(U.isDefined);
    let temp: T.Optional<T.Dataset>[] = ds.map((d, i) => {
      try {
        return D.init(d.name, U.asDictOfNumber(d.params)).toDataset(
          U.asNumber(r[0]),
          U.asNumber(r[1]),
          i
        );
      } catch {
        return { label: "error", showLine: true, data: [], idx: i };
      }
    });
    const datasets = temp.filter(U.isDefined);
    return datasets;
  },
});
