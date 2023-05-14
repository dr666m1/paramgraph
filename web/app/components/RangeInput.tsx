import { useState } from "react";

import type * as React from "react";

// TODO rm any
export default function Component({
  distributions,
  datasetsSetter,
  rangeSetter,
  range,
}: any) {
  const [texts, setTexts] = useState(range.map(String));
  const update = (isFrom: boolean, e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setTexts((texts: string[]) => {
      const temp = [...texts];
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
    // TODO rm any
    datasetsSetter((arr: any) => {
      // TODO rm any
      return arr.map((elm: any, idx: number) => {
        return {
          ...elm,
          data: distributions[idx].calc(newRange[0], newRange[1]),
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
