import { useState } from "react"
import { normal } from "stats"
import { defaultDistribution, distributions, myNormal } from "../src/constants"

export default function Component({
  setter,
  placeholder,
  idx,
  dist,
  params,
  param,
  paramSetter
}) {
  const [inp, setInp] = useState("")

  const update = e => {
    const str = e.target.value
    setInp(str)
    let newParams = {}
    for (const [k, v] of Object.entries(params)) {
      newParams[k] = v
    }
    newParams[param] = Number(str)
    paramSetter(newParams)
    let data
    if (dist === defaultDistribution.name) {
      data = []
    } else {
      data = myNormal(
        -3,
        3,
        newParams,
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
