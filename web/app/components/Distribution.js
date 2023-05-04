import { useState } from "react"
import dynamic from "next/dynamic";
import { normal } from "stats"
import { defaultDistribution, distributions } from "../src/constants"
import Dropdown from "../components/Dropdown"
import Input from "../components/Input"

export default function Component({ idx, setter }) {
  const [distribution, setDistribution] = useState(defaultDistribution.name)

  const del = () => {
    setter(arr => {
      const temp = [...arr]
      temp[idx] = undefined
      return temp
    })
  }

  return <div className="box">
    <div className="has-text-right">
      <button className="delete is-small" onClick={del}></button>
    </div>
    <label className="label">distribution</label>
    <Dropdown setter={setter} idx={idx} distSetter={setDistribution} />
    {
      distributions.filter(d => d.name === distribution)[0].parameters
        .map((p, _, ps) => <div key={p.key}>
          <label className="label">{p.key}</label>
          <Input
            placeholder={p.value}
            setter={setter}
            idx={idx}
            dist={distribution}
            params={ps}
            param={p.key}
          />
        </div>)
    }
  </div>
}
