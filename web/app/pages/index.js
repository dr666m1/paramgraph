import { useState } from "react"
import Chart from "../components/Chart"
import Distribution from "../components/Distribution"
import { defaultDistribution } from "../src/constants"

const defaultDataset = (idx) => {
  return {
    label: defaultDistribution.name, showLine: true, data: [], idx
  }
}

export default function Home() {
  const [datasets, setDatasets] = useState([defaultDataset(0)])

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
          onClick={() => setDatasets(d => [...d, defaultDataset(datasets.length)])}
        >
          add distribution
        </button>
      </div>
    </div >
  )
}
