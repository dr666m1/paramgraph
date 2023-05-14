type Page = {
  readonly href: string;
  readonly text: string;
};

export const pages: Page[] = [
  { href: "/", text: "Home" },
  { href: "/notices", text: "Third Party License Notices" },
];
