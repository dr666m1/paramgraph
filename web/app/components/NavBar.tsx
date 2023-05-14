import { useState } from "react";
import Link from "next/link";

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
  );
}
