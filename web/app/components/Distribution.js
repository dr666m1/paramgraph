import { useState } from "react"
import dynamic from "next/dynamic";
import Spinner from "../components/Spinner"

export const defaultDistName = "unspecified"

export default function Component({ idx, setter }) {
  const [distribution, setDistribution] = useState(defaultDistName)

  // https://github.com/vercel/next.js/issues/25852
  const Stats = dynamic({
    loader: async () => {
      const mod = await import("stats")
      return (_) => (
        <div className="box" onClick={() => {
          setter(arr => {
            const temp = [...arr]
            temp[idx] = {
              label: "normal",
              showLine: true,
              data: mod.normal(-3, 3, 0, idx + 1),
              idx
            }
            return temp
          })
          setDistribution("normal")
        }}>
          {distribution}
        </div>
      )
    },
    ssr: false,
  })

  return <>
    <Stats />
  </>
}
