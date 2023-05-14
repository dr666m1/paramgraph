import { useState, useEffect } from "react";
import Chart from "../components/Chart";
import DistBox from "../components/DistBox";
import RangeInput from "../components/RangeInput";
import * as D from "../src/distribution";
import * as U from "../src/utils";
import { useRouter } from "next/router";

export default function Home() {
  const [distributions, setDistributions] = useState<
    U.Optional<D.Distribution>[]
  >([D.init("unspecified")]);
  const [range, setRange] = useState<[number, number]>([-3, 3]);
  const [datasets, setDatasets] = useState<U.Optional<D.Dataset>[]>([
    D.init("unspecified").toDataset(-3, 3, 0),
  ]);
  const router = useRouter();

  useEffect(() => {
    const height = document.getElementById("chart")!.offsetHeight;
    document.getElementById("right-column")!.style.maxHeight = `${height}px`;

    // https://hkc7180.medium.com/how-handle-query-in-nextjs-router-62abb1927c1d
    let id = router.query.id;
    if (Array.isArray(id)) {
      id = id[0];
    }
    if (!U.isDefined(id)) {
      return;
    }
    try {
      const dists = D.fromBase64(id);
      setDatasets(dists.map((d, idx) => d.toDataset(range[0], range[1], idx)));
      setDistributions(dists);
      router.replace({ query: {} });
    } catch (e) {
      alert("invalid query string");
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
        <div className="field is-grouped">
          <div className="control is-expanded">
            <button
              className="button is-dark is-fullwidth"
              onClick={() => {
                const default_ = D.init("unspecified");
                setDatasets((d) => [
                  ...d,
                  default_.toDataset(range[0], range[1], datasets.length),
                ]);
                setDistributions((d) => [...d, default_]);
              }}
            >
              add distribution
            </button>
          </div>
          <div className="control">
            <button
              id="share"
              className="button"
              onClick={async () => {
                const ds = distributions.filter(U.isDefined);
                const b64 = D.toBase64(ds);
                const url = `${document.URL}?id=${b64}`;
                await navigator.clipboard.writeText(url);
                alert("copied!");
              }}
            >
              share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
