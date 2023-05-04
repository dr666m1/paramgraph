import { useState } from "react"
import dynamic from "next/dynamic";
import { defaultDistribution, distributions, arr2obj, obj2arr } from "../src/constants"
import Dropdown from "../components/Dropdown"
import Input from "../components/Input"

export default function Component({ idx, setter }) {
  const [distribution, setDistribution] = useState(defaultDistribution.name)
  const tempParams = {} // array -> object
  for (const p of defaultDistribution.parameters) {
    tempParams[p.key] = p.value
  }
  const [params, setParams] = useState(tempParams)

  const del = () => {
    setter(arr => {
      const temp = [...arr]
      temp[idx] = undefined
      return temp
    })
  }

  return <div className="box dist-box">
    <div className="has-text-right">
      <button className="delete is-small dist-delete" onClick={del}></button>
    </div>
    <label className="label">distribution</label>
    <Dropdown setter={setter} idx={idx} distSetter={setDistribution} paramSetter={setParams} />
    {
      obj2arr(params)
        .map((p, _, ps) => <div key={p.key}>
          <label className="label">{p.key}</label>
          <Input
            placeholder={
              distributions
                .filter(d => d.name === distribution)[0]
                .parameters.filter(param => param.key === p.key)[0]
                .value
            }
            setter={setter}
            idx={idx}
            dist={distribution}
            params={arr2obj(ps)}
            param={p.key}
            paramSetter={setParams}
          />
        </div>)
    }
  </div>
}
