import { useState } from "react";
import {
  defaultDistribution,
  distributions,
  getDistByName,
} from "../src/distribution";
import DistDropdown from "../components/DistDropdown";
import DistInput from "../components/DistInput";

export default function Component({ idx, datasetsSetter }) {
  const [distribution, setDistribution] = useState(defaultDistribution);

  const del = () => {
    datasetsSetter((arr) => {
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
        distribution={distribution}
        distributionSetter={setDistribution}
      />
      {Object.entries(distribution.parameters).map(([k, v]) => (
        <div key={k}>
          <label className="label">{k}</label>
          <DistInput
            idx={idx}
            datasetsSetter={datasetsSetter}
            distribution={distribution}
            paramName={k}
            distributionSetter={setDistribution}
          />
        </div>
      ))}
    </div>
  );
}
