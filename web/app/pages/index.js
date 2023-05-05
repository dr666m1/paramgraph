import { useState, useEffect } from "react";
import Chart from "../components/Chart";
import DistBox from "../components/DistBox";
import { defaultDistribution } from "../src/distribution";

const newDefaultDataset = (idx) => {
  return {
    label: defaultDistribution.name,
    showLine: true,
    data: [],
    idx, // used by chart.js
  };
};

export default function Home() {
  const [datasets, setDatasets] = useState([newDefaultDataset(0)]);
  useEffect(() => {
    const height = document.getElementById("chart").offsetHeight;
    document.getElementById("right-column").style.maxHeight = `${height}px`;
  });

  return (
    <div className="columns">
      <div className="column">
        <div id="chart">
          <Chart datasets={datasets.filter((d) => typeof d !== "undefined")} />
        </div>
      </div>
      <div
        id="right-column"
        className="column is-one-fifth"
        style={{ overflow: "auto" }}
      >
        {/* using idx as key is not recommended but I preferred simplicity */}
        {datasets.map((d, idx) => {
          if (typeof d !== "undefined") {
            return <DistBox key={idx} idx={idx} datasetsSetter={setDatasets} />;
          }
        })}
        <button
          className="button is-primary"
          onClick={() =>
            setDatasets((d) => [...d, newDefaultDataset(datasets.length)])
          }
        >
          add distribution
        </button>
      </div>
    </div>
  );
}
