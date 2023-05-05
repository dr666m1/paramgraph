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
}) {
  const update = (e) => {
    const dist = getDistByName(e.target.value);
    const data = dist.func(-3, 3, dist.parameters);
    datasetsSetter((arr) => {
      const temp = [...arr];
      temp[idx] = {
        ...arr[idx],
        label: dist.name,
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
