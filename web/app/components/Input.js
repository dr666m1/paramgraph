import { useState } from "react"
import { normal } from "stats"
import { defaultDistribution, distributions } from "../src/constants"

export default function Component({ setter, placeholder, idx, dist }) {
  const [inp, setInp] = useState("")

  const update = (e) => {
    const str = e.target.value
    setInp(str)

    let data
    if (dist === defaultDistribution.name) {
      data = []
    } else {
      data = normal(
        -3,
        3,
        0,
        1,
      )
    }
    setter(arr => {
      const temp = [...arr]
      temp[idx] = {
        ...arr[idx],
        data,
      }
      return temp
    })
  }

  return <>
    <input
      className="input is-small"
      type="text"
      placeholder={placeholder}
      value={inp}
      onChange={update}
    ></input>
  </>
}
