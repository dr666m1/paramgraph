import { useState } from "react"
import dynamic from "next/dynamic";
import Spinner from "../components/Spinner"

export const defaultDistName = "unspecified"

export default function Component({ idx, setter }) {
  const [distribution, setDistribution] = useState(defaultDistName)

  const update = () => {
    setter(arr => {
      const temp = [...arr]
      temp[idx] = { label: "normal", showLine: true, data: [{ x: 0, y: 1 }, { x: 1, y: 2 }] }
      return temp
    })
    setDistribution("normal")
  }

  // https://github.com/vercel/next.js/issues/25852
  const Stats = dynamic({
    loader: async () => {
      const mod = await import("stats")
      return (_) => <div>
        {distribution}
      </div>
    },
    ssr: false,
  })

  return (
    <div className="box" onClick={update}>
      <Stats />
    </div>
  )
}
