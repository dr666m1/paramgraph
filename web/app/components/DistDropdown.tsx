import { useRecoilState } from "recoil";

import * as D from "../src/distribution";
import * as R from "../src/recoil";
import * as T from "../src/types";
import * as U from "../src/utils";

export default function Component({ idx }: { idx: number }) {
  const [distributions, setDistributions] = useRecoilState(R.distributions);
  const update = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const distName = e.target.value as T.Name;
    setDistributions((arr) => {
      const temp = [...arr];
      temp[idx] = {
        name: distName,
        params: U.asDictOfStr(D.init(distName).params),
      };
      return temp;
    });
  };

  return (
    <div className="select">
      <select value={distributions[idx]!.name} onChange={update}>
        {T.names.map((n, idx) => (
          <option key={idx}>{n}</option>
        ))}
      </select>
    </div>
  );
}
