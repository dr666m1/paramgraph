import { atom } from "recoil";

export const range = atom<[number, number]>({ key: "dists", default: [-3, 3] });
