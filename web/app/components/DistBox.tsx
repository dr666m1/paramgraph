import { useState, Dispatch, SetStateAction } from "react";
import DistDropdown from "../components/DistDropdown";
import DistInput from "../components/DistInput";
import * as D from "../src/distribution";
import * as U from "../src/utils";

export default function Component({
  idx,
  datasetsSetter,
  distributionsSetter,
  distributions,
}: {
  idx: number;
  datasetsSetter: Dispatch<SetStateAction<U.Optional<D.Dataset>[]>>;
  distributionsSetter: Dispatch<SetStateAction<U.Optional<D.Distribution>[]>>;
  distributions: U.Optional<D.Distribution>[];
}) {
  const del = () => {
    datasetsSetter((arr) => {
      const temp = [...arr];
      temp[idx] = undefined;
      return temp;
    });
    distributionsSetter((arr) => {
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
      <DistDropdown
        idx={idx}
        datasetsSetter={datasetsSetter}
        distribution={distributions[idx]!}
        distributionsSetter={distributionsSetter}
      />
      {Object.entries(distributions[idx]!.params).map(([k, v]) => (
        <div key={k}>
          <label className="label">{k}</label>
          <DistInput
            idx={idx}
            datasetsSetter={datasetsSetter}
            distribution={distributions[idx]!}
            paramName={k}
            distributionsSetter={distributionsSetter}
          />
        </div>
      ))}
    </div>
  );
}
