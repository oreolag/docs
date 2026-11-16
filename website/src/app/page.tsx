import Link from 'next/link';
export default function Home() {
  return <main className="oreol-home">
    <span className="oreol-mark" aria-hidden="true" />
    <h1>OREOL Documentation</h1>
    <p>Choose your documentation.</p>
    <nav aria-label="Documentation sections">
      <Link href="/cli">CLI <span>Command-line tools →</span></Link>
      <Link href="/mgmt">Management <span>Infrastructure and administration →</span></Link>
    </nav>
  </main>;
}
