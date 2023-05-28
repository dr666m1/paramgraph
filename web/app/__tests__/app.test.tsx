import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import DistBox from "../components/DistBox";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// just render components
test("DistBox", () => {
  render(
    <RecoilRoot>
      <DistBox idx={0} />
    </RecoilRoot>
  );
});

test("NavBar", () => {
  render(<NavBar />);
});

test("Footer", () => {
  render(<Footer />);
});
