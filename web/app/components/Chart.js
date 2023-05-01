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
    layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
  />
}
