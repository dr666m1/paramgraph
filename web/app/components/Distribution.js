import { useState } from "react"
import dynamic from "next/dynamic";
import { normal } from "stats"
import { defaultDistribution } from "../src/constants"
import Dropdown from "../components/Dropdown"

export default function Component({ idx, setter }) {
  const [distribution, setDistribution] = useState(defaultDistribution.name)

  return <div className="box">
    <label className="label">distribution</label>
    <Dropdown setter={setter} idx={idx} />
  </div>
}
