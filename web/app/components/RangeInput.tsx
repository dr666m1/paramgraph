import { useRecoilState } from "recoil";

import * as R from "../src/recoil";

export default function Component() {
  const [range, setRange] = useRecoilState(R.range);

  const update = (isFrom: boolean, e: React.ChangeEvent<HTMLInputElement>) => {
    const newRange: [string, string] = [range[0], range[1]];
    newRange[isFrom ? 0 : 1] = e.target.value;
    setRange(newRange);
  };

  return (
    <div className="has-text-centered">
      {range.map((text, idx) => {
        return (
          <div key={idx} className="is-inline">
            <span style={{ whiteSpace: "nowrap" }}>
              {idx === 0 ? "from" : "to"}:{" "}
              <input
                value={text}
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
