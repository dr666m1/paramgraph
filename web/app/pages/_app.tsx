// globals.css must be imported here!
import "../styles/globals.css";
import { Inter } from "next/font/google";
import GitHubButton from "react-github-btn";
import Link from "next/link";
import NavBar from "../components/NavBar";

import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id="app" className={inter.className}>
      <NavBar />
      <Component {...pageProps} />
      <footer className="footer">
        <div className="content columns">
          <div className="column">
            <strong>paramgraph</strong> by dr666m1
          </div>
          <div className="column">
            <strong>MENU</strong>
            <ul>
              <li>
                <Link href="/" className="has-text-dark">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="notices" className="has-text-dark">
                  THIRD PARTY LICENSE NOTICES
                </Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <p>
              <strong>FEEDBACK</strong>
            </p>
            <p>
              <GitHubButton
                href="https://github.com/dr666m1/paramgraph"
                data-size="large"
                data-icon="star"
              >
                Star
              </GitHubButton>{" "}
              <GitHubButton
                href="https://github.com/dr666m1/paramgraph/issues"
                data-size="large"
                data-icon="issue-opened"
              >
                Issues
              </GitHubButton>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
