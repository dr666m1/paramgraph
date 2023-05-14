import { useState } from "react";
import type * as React from "react";
import * as D from "../src/distribution";

// TODO rm any
export default function Component({
  datasetsSetter,
  idx,
  distributionsSetter,
  distribution,
  range,
}: any) {
  const [selected, setSelected] = useState("unspecified");
  const update = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dist = D.init(e.target.value as D.Name);
    const data = dist.calc(range[0], range[1]);
    datasetsSetter((arr: (D.Dataset | undefined)[]) => {
      const temp = [...arr];
      temp[idx] = dist.toDataset(range[0], range[1], idx);
      return temp;
    });
    distributionsSetter((arr: (D.Distribution | undefined)[]) => {
      const temp = [...arr];
      temp[idx] = dist;
      return temp;
    });
    setSelected(e.target.value);
  };

  return (
    <div className="select">
      <select value={selected} onChange={update}>
        {D.names.map((n, idx) => (
          <option key={idx}>{n}</option>
        ))}
      </select>
    </div>
  );
}
