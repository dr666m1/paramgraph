import { useState, Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import * as D from "../src/distribution";
import * as U from "../src/utils";
import * as R from "../src/recoil";

export default function Component({
  idx,
  paramName,
}: {
  idx: number;
  paramName: string;
}) {
  const [distributions, setDistributions] = useRecoilState(R.dists);
  const [range, _] = useRecoilState(R.range);
  const [text, setText] = useState<string>(
    String(distributions[idx]!.params[paramName])
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
    const newDist = distributions[idx]!.clone();
    newDist.params[paramName] = num;
    setDistributions((arr) => {
      const temp = [...arr];
      temp[idx] = newDist;
      return temp;
    });
  };

  return (
    <input
      className="input is-small"
      type="text"
      placeholder={String(D.init(distributions[idx]!.name).params[paramName])}
      value={text}
      onChange={update}
    />
  );
}
