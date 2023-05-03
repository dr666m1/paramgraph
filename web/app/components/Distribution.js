import { useState } from "react"
import dynamic from "next/dynamic";
import { normal } from "stats"
import { defaultDistribution } from "../src/constants"

export default function Component({ idx, setter }) {
  const [distribution, setDistribution] = useState(defaultDistribution.name)

  return <div className="box" onClick={() => {
    setter(arr => {
      const temp = [...arr]
      temp[idx] = {
        label: "normal",
        showLine: true,
        data: normal(-3, 3, 0, idx + 1),
        idx
      }
      return temp
    })
    setDistribution("normal")
  }}>
    {distribution}
  </div>
}
