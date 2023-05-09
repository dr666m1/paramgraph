// globals.css must be imported here!
import "../styles/globals.css";
import { Inter } from "next/font/google";
import GitHubButton from "react-github-btn";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div id="app" className={inter.className}>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link href="/" className="navbar-item" id="header-logo" />
          <a
            role="button"
            className={`navbar-burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navBarMenu"
            onClick={(e) => {
              setIsActive((isActive) => !isActive);
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navBarMenu"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-start">
            {[
              { href: "/", text: "Home" },
              { href: "/notices", text: "Third Party License Notices" },
            ].map((page) => {
              return (
                <Link
                  className="navbar-item"
                  href={page.href}
                  onClick={(e) => {
                    setIsActive((isActive) => !isActive);
                  }}
                  key={page.href}
                >
                  {page.text}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
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
