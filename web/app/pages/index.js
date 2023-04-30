import { greet } from "stats"


export default function Home() {
  return (
    <div>
      <button class="button">
        {greet()}
      </button>
    </div>
  )
}
