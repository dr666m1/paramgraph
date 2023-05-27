import { useRecoilState } from "recoil";

import * as D from "../src/distribution";
import * as R from "../src/recoil";

export default function Component({ idx }: { idx: number }) {
  const [dInputs, setDInputs] = useRecoilState(R.dInputs);
  const update = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const distName = e.target.value as D.Name;
    const dist = D.init(distName);
    setDInputs((arr) => {
      const temp = [...arr];
      temp[idx] = dist.toInput();
      return temp;
    });
  };

  return (
    <div className="select">
      <select value={dInputs[idx]!.name} onChange={update}>
        {D.names.map((n, idx) => (
          <option key={idx}>{n}</option>
        ))}
      </select>
    </div>
  );
}
