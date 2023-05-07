import { useState } from "react";
import {
  defaultDistribution,
  distributions,
  getDistByName,
} from "../src/distribution";

export default function Component({
  datasetsSetter,
  idx,
  distribution,
  distributionsSetter,
  paramName,
}) {
  const [text, setText] = useState(distribution.parameters[paramName]);

  const update = (e) => {
    const str = e.target.value;
    setText(str);
    let num;
    if (str.match(/^\s*$/)) {
      return;
    }
    try {
      num = Number(str);
    } catch {
      return;
    }
    if (isNaN(num)) {
      return; // if str === "-"
    }

    let newDist = { ...distribution };
    newDist.parameters[paramName] = num;
    distributionsSetter((arr) => {
      const temp = [...arr];
      temp[idx] = newDist;
      return temp;
    });
    datasetsSetter((arr) => {
      const temp = [...arr];
      temp[idx] = {
        ...arr[idx],
        label: newDist.label(newDist.parameters),
        data: newDist.func(-3, 3, newDist.parameters),
      };
      return temp;
    });
  };

  return (
    <input
      className="input is-small"
      type="text"
      placeholder={getDistByName(distribution.name).parameters[paramName]}
      value={text}
      onChange={update}
    ></input>
  );
}
