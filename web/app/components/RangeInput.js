import { useState } from "react";

export default function Component({
  distributions,
  datasetsSetter,
  rangeSetter,
  range,
}) {
  const [texts, setTexts] = useState(range.map(String));
  const update = (isFrom, e) => {
    const str = e.target.value;
    setTexts((texts) => {
      const temp = [...texts];
      temp[isFrom ? 0 : 1] = str;
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
    newRange[isFrom ? 0 : 1] = num;
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

  return (
    <div className="has-text-centered">
      <nobr>
        from:{" "}
        <input
          value={texts[0]}
          className="input is-small is-inline"
          onChange={update.bind(null, true)}
        />
      </nobr>{" "}
      <nobr>
        to:{" "}
        <input
          value={texts[1]}
          className="input is-small is-inline"
          onChange={update.bind(null, false)}
        />
      </nobr>
    </div>
  );
}
