export default function Notices() {
  return <>
    <section className="content">
      <h1 className="title">Third Party License Notices</h1>
      <p>This Web application depends on packages listed in these json files.</p>
      <ul>
        <li>JavaScript packages <a href="/notices-js.json" className="tag is-primary">download</a></li>
        <li>Rust packages <a href="/notices-rs.json" className="tag is-primary">download</a></li>
      </ul>
    </section>
  </>
}
