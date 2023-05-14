// globals.css must be imported here!
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Link from "next/link";
import GitHubButton from "react-github-btn";
import { RecoilRoot } from "recoil";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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
