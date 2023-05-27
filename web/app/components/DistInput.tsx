import { useRecoilState } from "recoil";

import * as D from "../src/distribution";
import * as R from "../src/recoil";
import * as U from "../src/utils";

export default function Component({
  idx,
  paramName,
}: {
  idx: number;
  paramName: string;
}) {
  const [distributions, setDistributions] = useRecoilState(R.distributions);

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setDistributions((arr) => {
      const d = arr[idx]!;
      const temp = [...arr];
      const params = { ...d.params };
      params[paramName] = str;
      temp[idx] = { name: d.name, params };
      return temp;
    });
  };

  return (
    <input
      className="input is-small"
      type="text"
      value={distributions[idx]!.params[paramName]}
      onChange={update}
      placeholder={
        U.asDictOfStr(D.init(distributions[idx]!.name).params)[paramName]
      }
    />
  );
}
