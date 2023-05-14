import { useState, Dispatch, SetStateAction } from "react";

import type * as React from "react";

import * as D from "../src/distribution";
import * as U from "../src/utils";

export default function Component({
  distributions,
  datasetsSetter,
  rangeSetter,
  range,
}: {
  distributions: U.Optional<D.Distribution>[];
  datasetsSetter: Dispatch<SetStateAction<U.Optional<D.Dataset>[]>>;
  rangeSetter: Dispatch<SetStateAction<[number, number]>>;
  range: [number, number];
}) {
  const [texts, setTexts] = useState<[string, string]>([
    String(range[0]),
    String(range[1]),
  ]);

  const update = (isFrom: boolean, e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setTexts((texts) => {
      const temp: [string, string] = [...texts];
      temp[isFrom ? 0 : 1] = str;
      return temp;
    });
    let num;
    try {
      num = U.asNumber(str);
    } catch {
      // TODO show error message
      return;
    }
    const newRange: [number, number] = [range[0], range[1]];
    newRange[isFrom ? 0 : 1] = num;
    rangeSetter(newRange);
    datasetsSetter((arr: U.Optional<D.Dataset>[]) => {
      return arr.map((elm, idx) => {
        const d = distributions[idx];
        if (!U.isDefined(d)) {
          return undefined;
        }
        return d.toDataset(newRange[0], newRange[1], idx);
      });
    });
  };

  return (
    <div className="has-text-centered">
      {range.map((num, idx) => {
        return (
          <div key={idx} className="is-inline">
            <span style={{ whiteSpace: "nowrap" }}>
              {idx === 0 ? "from" : "to"}:{" "}
              <input
                value={texts[idx]}
                className="input is-small is-inline"
                onChange={update.bind(null, idx === 0)}
              />
            </span>
            {idx === 0 ? " " : ""}
          </div>
        );
      })}
    </div>
  );
}
