import { useState } from "react";
import { useSetRecoilState } from "recoil";

import * as D from "../src/distribution";
import * as R from "../src/recoil";

export default function Component({ idx }: { idx: number }) {
  const setDistributions = useSetRecoilState(R.dists);
  const [selected, setSelected] = useState<D.Name>("unspecified");
  const update = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const distName = e.target.value as D.Name;
    const dist = D.init(distName);
    setDistributions((arr) => {
      const temp = [...arr];
      temp[idx] = dist;
      return temp;
    });
    setSelected(distName);
  };

  return (
    <div className="select">
      <select value={selected} onChange={update}>
        {D.names.map((n, idx) => (
          <option key={idx}>{n}</option>
        ))}
      </select>
    </div>
  );
}
