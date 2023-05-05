import { useState } from "react";
import { normal } from "../src/calculator";

import {
  defaultDistribution,
  distributions,
  arr2obj,
  getDistByName,
} from "../src/distributions";

export default function Component({ setter, idx, distSetter, paramSetter }) {
  const [selected, setSelected] = useState(defaultDistribution.name);

  const update = (e) => {
    const distName = e.target.value;
    setSelected(distName);

    let data;
    if (distName === defaultDistribution.name) {
      data = [];
    } else {
      data = normal(-3, 3, { μ: 0, σ: 1 });
    }
    setter((arr) => {
      const temp = [...arr];
      temp[idx] = {
        ...arr[idx],
        label: distName,
        data,
      };
      return temp;
    });
    distSetter(distName);
    const dist = getDistByName(distName);
    paramSetter(arr2obj(dist.parameters));
  };

  return (
    <div className="select">
      <select value={selected} onChange={update}>
        {distributions.map((d, idx) => (
          <option key={idx}>{d.name}</option>
        ))}
      </select>
    </div>
  );
}
