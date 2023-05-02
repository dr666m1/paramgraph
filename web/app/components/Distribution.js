import dynamic from "next/dynamic";
import Spinner from "../components/Spinner"

// https://github.com/vercel/next.js/issues/25852
const Distribution = dynamic({
  loader: async () => {
    const mod = await import("stats")
    return (_) => <div
      onClick={() => console.log(mod.greet())}
      className="box"
    >
      {mod.greet()}
    </div>
  },
  ssr: false,
  loading: () => <Spinner />,
})

export default function Component() {
  return <Distribution />
}
