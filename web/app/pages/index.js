import { greet } from "stats"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={inter.className}>
      <button className="button">
        {greet()}
      </button>
    </div >
  )
}
