import { useState } from "react";
import DistDropdown from "../components/DistDropdown";
import DistInput from "../components/DistInput";
import * as D from "../src/distribution";

// TODO rm any
export default function Component({
  idx,
  datasetsSetter,
  distributionsSetter,
  distributions,
  range,
}: any) {
  const del = () => {
    datasetsSetter((arr: (D.Distribution | undefined)[]) => {
      const temp = [...arr];
      temp[idx] = undefined;
      return temp;
    });
    distributionsSetter((arr: (D.Dataset | undefined)[]) => {
      const temp = [...arr];
      temp[idx] = undefined;
      return temp;
    });
  };

  return (
    <div className="box dist-box">
      <div className="has-text-right">
        <button className="delete is-small dist-delete" onClick={del}></button>
      </div>
      <label className="label">distribution</label>
      <DistDropdown
        idx={idx}
        datasetsSetter={datasetsSetter}
        distribution={distributions[idx]}
        distributionsSetter={distributionsSetter}
        range={range}
      />
      {Object.entries(distributions[idx].params).map(([k, v]) => (
        <div key={k}>
          <label className="label">{k}</label>
          <DistInput
            idx={idx}
            datasetsSetter={datasetsSetter}
            distribution={distributions[idx]}
            paramName={k}
            distributionsSetter={distributionsSetter}
            range={range}
          />
        </div>
      ))}
    </div>
  );
}
