import { atom, selector } from "recoil";

import * as D from "./distribution";
import * as U from "./utils";

export const range = atom<[string, string]>({
  key: "range",
  default: ["-3", "3"],
});

export const dInputs = atom<U.Optional<D.DInput>[]>({
  key: "dInputs",
  default: [{ name: "unspecified", params: {} }],
});

export const datasets = selector<D.Dataset[]>({
  key: "datasets",
  get: ({ get }) => {
    const dis = get(dInputs);
    const ds = dis.filter(U.isDefined).map(D.dInput2Dist);
    const r = get(range);
    let temp: U.Optional<D.Dataset>[] = ds.map((d, i) => {
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
