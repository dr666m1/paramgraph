// globals.css must be imported here!
import '@/styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <div id="app" className={inter.className}>
      <nav className="navbar">
        <div className="navbar-brand">param-graph</div>
      </nav>
      <div className="is-divider"></div>
      <Component {...pageProps} />
      <footer className="footer">
        <strong>paramgraph</strong> by dr666m1
      </footer>
    </div>
  )
}
