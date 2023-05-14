import Link from "next/link";
import GitHubButton from "react-github-btn";

import * as M from "../src/menu";

export default function Component() {
  return (
    <footer className="footer">
      <div className="content columns">
        <div className="column">
          <strong>paramgraph</strong> by kitta65
        </div>
        <div className="column">
          <strong>MENU</strong>
          <ul>
            {M.pages.map((p) => {
              return (
                <li key={p.href}>
                  <Link href={p.href} className="has-text-dark">
                    {p.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="column">
          <p>
            <strong>FEEDBACK</strong>
          </p>
          <p>
            <GitHubButton
              href="https://github.com/kitta65/paramgraph"
              data-size="large"
              data-icon="star"
            >
              Star
            </GitHubButton>{" "}
            <GitHubButton
              href="https://github.com/kitta65/paramgraph/issues"
              data-size="large"
              data-icon="issue-opened"
            >
              Issues
            </GitHubButton>
          </p>
        </div>
      </div>
    </footer>
  );
}
