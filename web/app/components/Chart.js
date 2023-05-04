import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Colors,
  Legend,
} from "chart.js";

ChartJS.register(LinearScale, LineElement, PointElement, Colors, Legend);

export const options = {
  responsive: true,
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

export default function Component({ datasets }) {
  return <Scatter datasetIdKey="idx" options={options} data={{ datasets }} />;
}
