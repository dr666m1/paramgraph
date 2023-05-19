import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Colors,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { useRecoilValue } from "recoil";

import * as R from "../src/recoil";

ChartJS.register(LinearScale, LineElement, PointElement, Colors, Legend);

export const options = {
  // NOTE
  // chart may shrink on some browser
  // see https://github.com/chartjs/Chart.js/issues/10890
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    colors: {
      // https://www.chartjs.org/docs/latest/general/colors.html#dynamic-datasets-at-runtime
      forceOverride: true,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function Component() {
  const datasets = useRecoilValue(R.datasets);

  return <Scatter datasetIdKey="idx" options={options} data={{ datasets }} />;
}
