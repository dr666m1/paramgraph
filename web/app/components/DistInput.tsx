import { useState, Dispatch, SetStateAction } from "react";
import * as D from "../src/distribution";
import * as U from "../src/utils";

// TODO rm any
export default function Component({
  datasetsSetter,
  idx,
  distribution,
  distributionsSetter,
  paramName,
  range,
}: {
  idx: number;
  datasetsSetter: Dispatch<SetStateAction<U.Optional<D.Dataset>[]>>;
  distributionsSetter: Dispatch<SetStateAction<U.Optional<D.Distribution>[]>>;
  distribution: D.Distribution;
  paramName: string;
  range: [number, number];
}) {
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
