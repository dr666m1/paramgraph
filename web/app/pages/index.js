import { useState } from "react"
import Chart from "../components/Chart"
import Distribution from "../components/Distribution"

const initDatasets = [
  {
    label: "sample data", showLine: true, data: [
      { x: 0, y: 12 },
      { x: 1, y: 19 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 2 },
      { x: 5, y: 3 },
    ]
  }
]

export default function Home() {
  const [datasets, setDatasets] = useState(initDatasets)

  return (
    <div className="columns">
      <div className="column">
        <Chart datasets={datasets} />
      </div>
      <div className="column is-one-fifth">
        <Distribution />
      </div>
    </div >
  )
}
