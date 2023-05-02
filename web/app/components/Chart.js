import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
};

export const options = {
  // aspectRatio: 1,
  responsive: true,
};

export default function Component({ datasets }) {
  return <Bar options={options} data={{ ...data, datasets }} />;
}
