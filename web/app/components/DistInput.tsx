import { useState, Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import * as D from "../src/distribution";
import * as U from "../src/utils";
import * as R from "../src/recoil";

// TODO rm any
export default function Component({
  datasetsSetter,
  idx,
  distribution,
  distributionsSetter,
  paramName,
}: {
  idx: number;
  datasetsSetter: Dispatch<SetStateAction<U.Optional<D.Dataset>[]>>;
  distributionsSetter: Dispatch<SetStateAction<U.Optional<D.Distribution>[]>>;
  distribution: D.Distribution;
  paramName: string;
}) {
  const [range, _] = useRecoilState(R.range);
  const [text, setText] = useState<string>(
    String(distribution.params[paramName])
  );

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setText(str);
    let num;
    try {
      num = U.asNumber(str);
    } catch {
      // TODO show error message
      return;
    }
    const newDist = distribution.clone();
    newDist.params[paramName] = num;
    distributionsSetter((arr) => {
      const temp = [...arr];
      temp[idx] = newDist;
      return temp;
    });
    datasetsSetter((arr) => {
      const temp = [...arr];
      temp[idx] = newDist.toDataset(range[0], range[1], idx);
      return temp;
    });
  };

  return (
    <input
      className="input is-small"
      type="text"
      placeholder={String(D.init(distribution.name).params[paramName])}
      value={text}
      onChange={update}
    />
  );
}
