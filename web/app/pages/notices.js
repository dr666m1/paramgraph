export default function Notices() {
  return <>
    <section className="content">
      <h1 className="title">Third Party License Notices</h1>
      <p>This web app depends on packages listed in these json files.</p>
      <ul>
        <li>JavaScript packages (notices-js.json) <a href="/notices-js.json" className="button is-primary is-small">download</a></li>
        <li>Rust packages (notices-rs.json) <a href="/notices-rs.json" className="button is-primary is-small">download</a></li>
      </ul>
    </section>
  </>
}
