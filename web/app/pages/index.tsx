import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import Chart from "../components/Chart";
import DistBox from "../components/DistBox";
import RangeInput from "../components/RangeInput";

import * as R from "../src/recoil";
import * as U from "../src/utils";

export default function Home() {
  const [distributions, setDistributions] = useRecoilState(R.distributions);
  const router = useRouter();

  useEffect(() => {
    const height = document.getElementById("chart")!.offsetHeight;
    document.getElementById("right-column")!.style.maxHeight = `${height}px`;

    // https://hkc7180.medium.com/how-handle-query-in-nextjs-router-62abb1927c1d
    let id = router.query["id"];
    if (Array.isArray(id)) {
      id = id[0];
    }
    if (!U.isDefined(id)) {
      return;
    }
    try {
      setDistributions(U.fromBase64(id));
      router.replace({ query: {} });
    } catch (e) {
      alert("invalid query string");
    }
    console.log("initialized!");
  }, [router.query]);

  return (
    <div className="columns">
      <div className="column">
        <div
          id="chart"
          className="is-fullwidth"
          style={{ position: "relative" }}
        >
          <Chart />
        </div>
        <RangeInput />
      </div>
      <div
        id="right-column"
        className="column is-one-fifth"
        style={{ overflow: "auto" }}
      >
        {/* using idx as key is not recommended but I preferred simplicity */}
        {distributions.map((d, idx) => {
          if (U.isDefined(d)) {
            return <DistBox key={idx} idx={idx} />;
          }
        })}
        <div className="field is-grouped">
          <div className="control is-expanded">
            <button
              className="button is-dark is-fullwidth"
              onClick={() => {
                setDistributions((d) => [...d, R.defaultDist]);
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
                const b64 = U.toBase64(ds);
                const url = `${document.URL}?id=${b64}`;
                await navigator.clipboard.writeText(url);
                alert("copied into clipboard!");
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
