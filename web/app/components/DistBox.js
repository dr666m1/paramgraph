import { useState } from "react";
import dynamic from "next/dynamic";
import {
  defaultDistribution,
  distributions,
  getDistByName,
} from "../src/distribution";
import DistDropdown from "../components/DistDropdown";
import DistInput from "../components/DistInput";

export default function Component({ idx, setter }) {
  const [distribution, setDistribution] = useState(defaultDistribution.name);
  const [params, setParams] = useState(defaultDistribution.parameters);

  const del = () => {
    setter((arr) => {
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
        setter={setter}
        idx={idx}
        distSetter={setDistribution}
        paramSetter={setParams}
      />
      {Object.entries(params).map(([k, v], _, ps) => (
        <div key={k}>
          <label className="label">{k}</label>
          <DistInput
            placeholder={getDistByName(distribution).parameters[k]}
            setter={setter}
            idx={idx}
            dist={distribution}
            params={params}
            param={k}
            paramSetter={setParams}
          />
        </div>
      ))}
    </div>
  );
}
