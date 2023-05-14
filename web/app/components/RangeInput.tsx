import { useState } from "react";

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
  datasetsSetter: Function;
  rangeSetter: Function;
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
    if (str.match(/^\s*$/)) {
      return;
    }
    try {
      num = Number(str);
    } catch {
      return;
    }
    if (isNaN(num)) {
      return; // if str === "-"
    }
    const newRange = [...range];
    newRange[isFrom ? 0 : 1] = num;
    rangeSetter(newRange);
    datasetsSetter((arr: U.Optional<D.Dataset>[]) => {
      return arr.map((elm, idx) => {
        const d = distributions[idx];
        if (!U.isDefined(d)) {
          return undefined;
        }
        return {
          ...elm,
          data: d.calc(newRange[0], newRange[1]),
        };
      });
    });
  };

  return (
    <div className="has-text-centered">
      <span style={{ whiteSpace: "nowrap" }}>
        from:{" "}
        <input
          value={texts[0]}
          className="input is-small is-inline"
          onChange={update.bind(null, true)}
        />
      </span>{" "}
      <span style={{ whiteSpace: "nowrap" }}>
        to:{" "}
        <input
          value={texts[1]}
          className="input is-small is-inline"
          onChange={update.bind(null, false)}
        />
      </span>
    </div>
  );
}
