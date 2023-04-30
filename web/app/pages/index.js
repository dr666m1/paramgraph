import { greet } from "stats"
import { Inter } from 'next/font/google'

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
            {greet()}
          </button>
        </div>
      </div >
    </div >
  )
}
