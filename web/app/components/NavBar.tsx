import Link from "next/link";
import { useState } from "react";

import * as M from "../src/menu";

export default function Component() {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href="/" className="navbar-item" id="header-logo" />
        <a
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navBarMenu"
          onClick={(_) => {
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
          {M.pages.map((page) => {
            return (
              <Link
                className="navbar-item"
                href={page.href}
                onClick={(_) => {
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
  );
}
