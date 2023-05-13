import { useState } from "react";
import {
  defaultDistribution,
  distributions,
  getDistByName,
} from "../src/distribution";
import DistDropdown from "../components/DistDropdown";
import DistInput from "../components/DistInput";

// TODO rm any
export default function Component({
  idx,
  datasetsSetter,
  distributionsSetter,
  distributions,
  range,
}: any) {
  const del = () => {
    // TODO rm any
    datasetsSetter((arr: any) => {
      const temp = [...arr];
      temp[idx] = undefined;
      return temp;
    });
    // TODO rm any
    distributionsSetter((arr: any) => {
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
      {Object.entries(distributions[idx].parameters).map(([k, v]) => (
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
