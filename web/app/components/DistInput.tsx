import { useState } from "react";
import {
  defaultDistribution,
  distributions,
  getDistByName,
} from "../src/distribution";

import type * as React from "react";

// TODO rm any
export default function Component({
  datasetsSetter,
  idx,
  distribution,
  distributionsSetter,
  paramName,
  range,
}: any) {
  const [text, setText] = useState(distribution.parameters[paramName]);

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

    let newDist = { ...distribution };
    newDist.parameters[paramName] = num;
    // TODO rm any
    distributionsSetter((arr: any) => {
      const temp = [...arr];
      temp[idx] = newDist;
      return temp;
    });
    // TODO rm any
    datasetsSetter((arr: any) => {
      const temp = [...arr];
      temp[idx] = {
        ...arr[idx],
        label: newDist.label(newDist.parameters),
        data: newDist.func(range[0], range[1], newDist.parameters),
      };
      return temp;
    });
  };

  return (
    <input
      className="input is-small"
      type="text"
      placeholder={
        /* TODO rm any */
        (getDistByName(distribution.name) as any).parameters[paramName]
      }
      value={text}
      onChange={update}
    ></input>
  );
}
