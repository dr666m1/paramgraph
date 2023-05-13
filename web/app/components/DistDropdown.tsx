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
  distributionsSetter,
  distribution,
  range,
}: any) {
  const update = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // TODO rm any
    const dist: any = getDistByName(e.target.value);
    const data = dist.func(range[0], range[1], dist.parameters);
    // TODO rm any
    datasetsSetter((arr: any) => {
      const temp = [...arr];
      temp[idx] = {
        ...arr[idx],
        label: dist.label(dist.parameters),
        data,
      };
      return temp;
    });
    // TODO rm any
    distributionsSetter((arr: any) => {
      const temp = [...arr];
      temp[idx] = dist;
      return temp;
    });
  };

  return (
    <div className="select">
      <select value={distribution.name} onChange={update}>
        {distributions.map((d, idx) => (
          <option key={idx}>{d.name}</option>
        ))}
      </select>
    </div>
  );
}
