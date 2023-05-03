import { useState } from "react"
import dynamic from "next/dynamic";
import Spinner from "../components/Spinner"
import { normal } from "stats"

export const defaultDistName = "unspecified"

export default function Component({ idx, setter }) {
  const [distribution, setDistribution] = useState(defaultDistName)

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
