import { useState } from "react";

export default function Component() {
  const [range, setRange] = useState([-3, 3]);

  const commonProcess = () => {
    // TODO
  };
  const updateFrom = (e) => {
    const str = e.target.value;
    setRange((arr) => {
      const temp = [...arr];
      temp[0] = str;
      return temp;
    });
    commonProcess();
  };
  const updateTo = (e) => {
    const str = e.target.value;
    setRange((arr) => {
      const temp = [...arr];
      temp[1] = str;
      return temp;
    });
    commonProcess();
  };

  return (
    <div>
      from:{" "}
      <input
        value={range[0]}
        className="input is-small is-inline"
        onChange={updateFrom}
      />{" "}
      to:{" "}
      <input
        value={range[1]}
        className="input is-small is-inline"
        onChange={updateTo}
      />
    </div>
  );
}
