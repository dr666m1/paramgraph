import Spinner from "../components/Spinner"
import dynamic from "next/dynamic";

// https://github.com/plotly/react-plotly.js/issues/272
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <Spinner />,
})

export default function Component() {
  return <Plot
    data={[
      {
        x: [1, 2, 3],
        y: [2, 6, 3],
      },
    ]}
    layout={{ title: 'A Fancy Plot', width: 800, height: 800 }}
    config={{ responsive: true, scrollZoom: true }}
  />
}
