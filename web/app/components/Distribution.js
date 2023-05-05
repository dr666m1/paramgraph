import { useState } from "react";
import dynamic from "next/dynamic";
import {
  defaultDistribution,
  distributions,
  obj2arr,
  getDistByName,
  getParamsAsObj,
} from "../src/distributions";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";

export default function Component({ idx, setter }) {
  const [distribution, setDistribution] = useState(defaultDistribution.name);
  const [params, setParams] = useState(getParamsAsObj(defaultDistribution));

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
            placeholder={getParamsAsObj(getDistByName(distribution))[k]}
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
