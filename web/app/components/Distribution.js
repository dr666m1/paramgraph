import { useState } from "react"
import dynamic from "next/dynamic";
import { normal } from "stats"
import { defaultDistribution } from "../src/constants"
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
    <Dropdown setter={setter} idx={idx} />
    <label className="label">μ</label>
    <Input />
    <label className="label">σ</label>
    <Input />
  </div>
}
