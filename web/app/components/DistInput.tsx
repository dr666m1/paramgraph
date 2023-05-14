import { useState } from "react";
import type * as React from "react";
import * as D from "../src/distribution";

// TODO rm any
export default function Component({
  datasetsSetter,
  idx,
  distribution,
  distributionsSetter,
  paramName,
  range,
}: any) {
  const [text, setText] = useState(distribution.params[paramName]);

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setText(str);
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

    const newDist = distribution.clone();
    newDist.params[paramName] = num;
    distributionsSetter((arr: D.Distribution[]) => {
      const temp = [...arr];
      temp[idx] = newDist;
      return temp;
    });
    datasetsSetter((arr: D.Dataset[]) => {
      const temp = [...arr];
      temp[idx] = {
        ...arr[idx],
        label: newDist.label(newDist.params),
        data: newDist.calc(range[0], range[1]),
      };
      return temp;
    });
  };

  return (
    <input
      className="input is-small"
      type="text"
      placeholder={
        Object.entries(D.init(distribution.name).params)
          .filter(([k, v]) => k === paramName)
          .map(([k, v]) => String(v))[0]
      }
      value={text}
      onChange={update}
    />
  );
}
