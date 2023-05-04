import { useState } from "react"
import { normal } from "stats"

import { defaultDistribution, distributions, arr2obj } from "../src/constants"

export default function Component({ setter, idx, distSetter, paramSetter }) {
  const [selected, setSelected] = useState(defaultDistribution.name)

  const update = (e) => {
    const distName = e.target.value
    setSelected(distName)

    let data
    if (distName === defaultDistribution.name) {
      data = []
    } else {
      data = normal(
        -3,
        3,
        0, // dist.parameters["μ"],
        1, // dist.parameters["σ"],
      )
    }
    setter(arr => {
      const temp = [...arr]
      temp[idx] = {
        ...arr[idx],
        label: distName,
        data,
      }
      return temp
    })
    distSetter(distName)
    const dist = distributions.filter(d => d.name === distName)[0]
    paramSetter(arr2obj(dist.parameters))
  }

  return <div className="select">
    <select value={selected} onChange={update}>
      {distributions.map((d, idx) => <option key={idx}>{d.name}</option>)}
    </select>
  </div>
}
