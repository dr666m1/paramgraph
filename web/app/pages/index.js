import { useState, useEffect } from "react";
import Chart from "../components/Chart";
import DistBox from "../components/DistBox";
import { defaultDistribution, getDistByName } from "../src/distribution";
import { useRouter } from "next/router";

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
  const [distributions, setDistributions] = useState([defaultDistribution]);
  const router = useRouter();

  useEffect(() => {
    const height = document.getElementById("chart").offsetHeight;
    document.getElementById("right-column").style.maxHeight = `${height}px`;

    // https://hkc7180.medium.com/how-handle-query-in-nextjs-router-62abb1927c1d
    if (router.query.id) {
      const nord = getDistByName("N(μ, σ)");
      router.replace({ query: {} });
      setDatasets([
        {
          label: nord.name,
          showLine: true,
          data: nord.func(-3, 3, nord.parameters),
          idx: 0,
        },
      ]);
    }
    console.log(
      "if you see this message thousands of times, something is going wrong"
    );
  }, [router.query]);

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
            return (
              <DistBox
                key={idx}
                idx={idx}
                datasetsSetter={setDatasets}
                distributionsSetter={setDistributions}
                distributions={distributions}
              />
            );
          }
        })}
        <button
          className="button is-primary"
          onClick={() => {
            setDatasets((d) => [...d, newDefaultDataset(datasets.length)]);
            setDistributions((d) => [...d, defaultDistribution]);
          }}
        >
          add distribution
        </button>
      </div>
    </div>
  );
}
