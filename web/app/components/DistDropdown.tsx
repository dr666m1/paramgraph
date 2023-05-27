import { useRecoilState } from "recoil";

import * as D from "../src/distribution";
import * as R from "../src/recoil";
import * as T from "../src/types";

export default function Component({ idx }: { idx: number }) {
  const [distributions, setDistributions] = useRecoilState(R.distributions);
  const update = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const distName = e.target.value as T.Name;
    const dist = D.init(distName);
    setDistributions((arr) => {
      const temp = [...arr];
      temp[idx] = dist.toInput();
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
