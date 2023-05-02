import { useState } from "react"
import Chart from "../components/Chart"
import Distribution, { defaultDistName } from "../components/Distribution"

const defaultDataset = [
  { label: defaultDistName, showLine: true, data: [] }
]

export default function Home() {
  const [datasets, setDatasets] = useState([defaultDataset])

  return (
    <div className="columns">
      <div className="column">
        <Chart datasets={datasets} />
      </div>
      <div className="column is-one-fifth">
        {/* using idx as key is not recommended but I preferred simplicity */}
        {datasets.map(
          (d, idx) => <Distribution key={idx} idx={idx} setter={setDatasets} />
        )}
        <button
          className="button is-primary"
          onClick={() => setDatasets(d => [...d, defaultDataset])}
        >
          add distribution
        </button>
      </div>
    </div >
  )
}
