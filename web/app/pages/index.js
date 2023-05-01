import dynamic from "next/dynamic";
import Spinner from "../components/Spinner"
import Chart from "../components/Chart"
// https://github.com/vercel/next.js/issues/25852
const Greet = dynamic({
  loader: async () => {
    const mod = await import("stats")
    return (_) => <div>{mod.greet()}</div>
  },
  ssr: false,
  loading: () => <Spinner />,
})

export default function Home() {
  return (
    <div className="columns">
      <div className="column is-one-fifth">
        <div className="box">
          first column
        </div>
        <div className="box">
          first column
        </div>
      </div>
      <div className="column">
        <button className="button">
          <Greet />
        </button>
        <Chart />
      </div>
    </div >
  )
}
