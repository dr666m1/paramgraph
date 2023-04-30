// https://github.com/vercel/next.js/issues/25852
const Greet = dynamic({
  loader: async () => {
    const mod = await import("stats")
    return (_) => <div>{mod.greet()}</div>
  },
  ssr: false
})
import { Inter } from 'next/font/google'
// https://github.com/plotly/react-plotly.js/issues/272
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={inter.className}>
      <nav class="navbar">
        <div class="navbar-brand">param-graph</div>
      </nav>
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
          <Plot
            data={[
              {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
              },
              { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
            ]}
            layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
          />
        </div>
      </div >
    </div >
  )
}
