// globals.css must be imported here!
import "../styles/globals.css";
import { Inter } from "next/font/google";
import GitHubButton from "react-github-btn";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { RecoilRoot } from "recoil";

import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id="app" className={inter.className}>
      <NavBar />
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
      <Footer />
    </div>
  );
}
