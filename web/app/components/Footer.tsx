import GitHubButton from "react-github-btn";
import Link from "next/link";

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
  );
}
