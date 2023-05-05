import { useState } from "react";
import dynamic from "next/dynamic";
import {
  defaultDistribution,
  distributions,
  getDistByName,
} from "../src/distribution";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";

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
      <Dropdown
        setter={setter}
        idx={idx}
        distSetter={setDistribution}
        paramSetter={setParams}
      />
      {Object.entries(params).map(([k, v], _, ps) => (
        <div key={k}>
          <label className="label">{k}</label>
          <Input
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
