import { useRecoilState } from "recoil";

import * as D from "../src/distribution";
import * as R from "../src/recoil";

export default function Component({
  idx,
  paramName,
}: {
  idx: number;
  paramName: string;
}) {
  const [dInputs, setDInputs] = useRecoilState(R.dInputs);

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    console.log(dInputs);
    setDInputs((arr) => {
      const temp = [...arr];
      const params = { ...arr[idx]!.params };
      params[paramName] = str;
      temp[idx] = { name: arr[idx]!.name, params };
      return temp;
    });
  };

  return (
    <input
      className="input is-small"
      type="text"
      placeholder={String(
        D.init(dInputs[idx]!.name).toInput().params[paramName]
      )}
      value={dInputs[idx]!.params[paramName]}
      onChange={update}
    />
  );
}
