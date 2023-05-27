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
  const [distributions, setDistributions] = useRecoilState(R.distributions);

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setDistributions((arr) => {
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
        D.init(distributions[idx]!.name).toInput().params[paramName]
      )}
      value={distributions[idx]!.params[paramName]}
      onChange={update}
    />
  );
}
