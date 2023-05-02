import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';


ChartJS.register(
  LinearScale,
  LineElement,
  PointElement,
);

export const options = {
  responsive: true,
  elements: {
    point: {
      radius: 0
    }
  }
};

export default function Component({ datasets }) {
  return <Scatter options={options} data={{ datasets }} />;
}
