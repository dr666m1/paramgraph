import { useState, useEffect } from "react";
import Chart from "../components/Chart";
import DistBox from "../components/DistBox";
import RangeInput from "../components/RangeInput";
import { defaultDistribution, getDistByName } from "../src/distribution";
import { useRouter } from "next/router";
import { Base64, decode } from "js-base64";

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
  const [range, setRange] = useState([-3, 3]);
  const router = useRouter();

  useEffect(() => {
    const height = document.getElementById("chart").offsetHeight;
    document.getElementById("right-column").style.maxHeight = `${height}px`;

    // https://hkc7180.medium.com/how-handle-query-in-nextjs-router-62abb1927c1d
    const id = router.query.id;
    if (id) {
      try {
        const json = Base64.decode(id);
        const dists = JSON.parse(json);
        setDatasets(
          dists.map((d, idx) => {
            d.label = getDistByName(d.name).label;
            d.func = getDistByName(d.name).func;
            return {
              label: d.label(d.parameters),
              showLine: true,
              data: d.func(-3, 3, d.parameters),
              idx,
            };
          })
        );
        setDistributions(dists);
        router.replace({ query: {} });
      } catch (e) {
        console.log(e);
        alert("invalid query string");
      }
    }
    console.log(
      "if you see this message thousands of times, something is going wrong"
    );
  }, [router.query]);

  return (
    <div className="columns">
      <div className="column">
        <div
          id="chart"
          className="is-fullwidth"
          style={{ position: "relative" }}
        >
          <Chart datasets={datasets.filter((d) => typeof d !== "undefined")} />
        </div>
        <RangeInput
          range={range}
          rangeSetter={setRange}
          datasetsSetter={setDatasets}
          distributions={distributions}
        />
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
                range={range}
              />
            );
          }
        })}
        <button
          className="button is-primary is-fullwidth"
          onClick={() => {
            setDatasets((d) => [...d, newDefaultDataset(datasets.length)]);
            setDistributions((d) => [...d, defaultDistribution]);
          }}
        >
          add distribution
        </button>
        <button
          id="share"
          className="button is-fullwidth"
          onClick={async () => {
            const json = JSON.stringify(
              distributions.filter((d) => typeof d !== "undefined")
            );
            const b64 = Base64.encodeURL(json);
            const url = `${document.URL}?id=${b64}`;
            await navigator.clipboard.writeText(url);
            alert("copied!");
          }}
        >
          share
        </button>
      </div>
    </div>
  );
}
