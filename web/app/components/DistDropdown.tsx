import { useRecoilState } from "recoil";

import * as D from "../src/distribution";
import * as R from "../src/recoil";

export default function Component({ idx }: { idx: number }) {
  const [distributions, setDistributions] = useRecoilState(R.dists);
  const update = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const distName = e.target.value as D.Name;
    const dist = D.init(distName);
    setDistributions((arr) => {
      const temp = [...arr];
      temp[idx] = dist;
      return temp;
    });
  };

  return (
    <div className="select">
      <select value={distributions[idx]!.name} onChange={update}>
        {D.names.map((n, idx) => (
          <option key={idx}>{n}</option>
        ))}
      </select>
    </div>
  );
}
