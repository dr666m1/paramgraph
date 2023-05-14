import { useState, Dispatch, SetStateAction } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as D from "../src/distribution";
import * as U from "../src/utils";
import * as R from "../src/recoil";

export default function Component({
  datasetsSetter,
  idx,
}: {
  idx: number;
  datasetsSetter: Dispatch<SetStateAction<U.Optional<D.Dataset>[]>>;
}) {
  const [range, _] = useRecoilState(R.range);
  const setDistributions = useSetRecoilState(R.dists);
  const [selected, setSelected] = useState<D.Name>("unspecified");
  const update = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const distName = e.target.value as D.Name;
    const dist = D.init(distName);
    const data = dist.calc(range[0], range[1]);
    datasetsSetter((arr) => {
      const temp = [...arr];
      temp[idx] = dist.toDataset(range[0], range[1], idx);
      return temp;
    });
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
