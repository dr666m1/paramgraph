import { render } from "@testing-library/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

test("NavBar", () => {
  render(<NavBar />);
});

test("Footer", () => {
  render(<Footer />);
});
