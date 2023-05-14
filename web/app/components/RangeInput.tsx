import { useState, Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";

import * as D from "../src/distribution";
import * as R from "../src/recoil";
import * as U from "../src/utils";

export default function Component() {
  const [range, setRange] = useRecoilState(R.range);
  const distributions = useRecoilState(R.dists)[0];
  const [texts, setTexts] = useState<[string, string]>([
    String(range[0]),
    String(range[1]),
  ]);

  const update = (isFrom: boolean, e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setTexts((texts) => {
      const temp: [string, string] = [...texts];
      temp[isFrom ? 0 : 1] = str;
      return temp;
    });
    let num;
    try {
      num = U.asNumber(str);
    } catch {
      // TODO show error message
      return;
    }
    const newRange: [number, number] = [range[0], range[1]];
    newRange[isFrom ? 0 : 1] = num;
    setRange(newRange);
  };

  return (
    <div className="has-text-centered">
      {range.map((num, idx) => {
        return (
          <div key={idx} className="is-inline">
            <span style={{ whiteSpace: "nowrap" }}>
              {idx === 0 ? "from" : "to"}:{" "}
              <input
                value={texts[idx]}
                className="input is-small is-inline"
                onChange={update.bind(null, idx === 0)}
              />
            </span>
            {idx === 0 ? " " : ""}
          </div>
        );
      })}
    </div>
  );
}
