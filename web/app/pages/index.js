import { useState } from "react"
import Chart from "../components/Chart"
import Distribution from "../components/Distribution"

const initDatasets = [
  { label: "sample data", data: [12, 19, 3, 5, 2, 3] }
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
