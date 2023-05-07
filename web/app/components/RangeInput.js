import { useState } from "react";

export default function Component({
  distributions,
  datasetsSetter,
  rangeSetter,
  range,
}) {
  const [texts, setTexts] = useState(range.map(String));
  const commonProcess = (newRange) => {
    rangeSetter(newRange);
    datasetsSetter((arr) => {
      return arr.map((elm, idx) => {
        return {
          ...elm,
          data: distributions[idx].func(
            newRange[0],
            newRange[1],
            distributions[idx].parameters
          ),
        };
      });
    });
  };
  const updateFrom = (e) => {
    const str = e.target.value;
    setTexts((texts) => {
      const temp = [...texts];
      temp[0] = str;
      return temp;
    });
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
    const newRange = [...range];
    newRange[0] = num;
    commonProcess.call(null, newRange);
  };
  const updateTo = (e) => {
    const str = e.target.value;
    setTexts((texts) => {
      const temp = [...texts];
      temp[1] = str;
      return temp;
    });
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
    const newRange = [...range];
    newRange[1] = num;
    commonProcess.call(null, newRange);
  };

  return (
    <div>
      from:{" "}
      <input
        value={texts[0]}
        className="input is-small is-inline"
        onChange={updateFrom}
      />{" "}
      to:{" "}
      <input
        value={texts[1]}
        className="input is-small is-inline"
        onChange={updateTo}
      />
    </div>
  );
}
