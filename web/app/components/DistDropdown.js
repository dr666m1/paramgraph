import { useState } from "react";
import {
  defaultDistribution,
  distributions,
  getDistByName,
} from "../src/distribution";

export default function Component({
  datasetsSetter,
  idx,
  distributionsSetter,
  distribution,
  range,
}) {
  const update = (e) => {
    const dist = getDistByName(e.target.value);
    const data = dist.func(range[0], range[1], dist.parameters);
    datasetsSetter((arr) => {
      const temp = [...arr];
      temp[idx] = {
        ...arr[idx],
        label: dist.label(dist.parameters),
        data,
      };
      return temp;
    });
    distributionsSetter((arr) => {
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
