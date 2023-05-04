import { useState } from "react"
// import { normal } from "stats"

export default function Component({ setter, idx, placeholder }) {
  const update = (e) => {
    const str = e.target.value
    console.log(`changed to ${str}`)
  }
  return <>
    <input
      className="input is-small"
      type="text"
      placeholder={placeholder}
      onChange={update}
    ></input>
  </>
}
