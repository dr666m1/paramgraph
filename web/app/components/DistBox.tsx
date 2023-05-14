import { useState, Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";

import DistDropdown from "../components/DistDropdown";
import DistInput from "../components/DistInput";

import * as D from "../src/distribution";
import * as R from "../src/recoil";
import * as U from "../src/utils";

export default function Component({ idx }: { idx: number }) {
  const [distributions, setDistributions] = useRecoilState(R.dists);
  const del = () => {
    setDistributions((arr) => {
      const temp = [...arr];
      temp[idx] = undefined;
      return temp;
    });
  };

  return (
    <div className="box dist-box">
      <div className="has-text-right">
        <button className="delete is-small dist-delete" onClick={del}></button>
      </div>
      <label className="label">distribution</label>
      {/* distributions[idx] always exists (guaranteed in index.tsx) */}
      <DistDropdown idx={idx} />
      {Object.entries(distributions[idx]!.params).map(([k, v]) => (
        <div key={k}>
          <label className="label">{k}</label>
          <DistInput idx={idx} paramName={k} />
        </div>
      ))}
    </div>
  );
}
