import Link from 'next/link'

export default () => {
    return (
      <nav className="header">
			<Link href="/" className="logo"></Link>
			<div className="home">
				<Link href="/">Home</Link>
				<Link href="/Speacher">Open</Link>
				<Link href="/Settings">Settings</Link>
			</div>
      </nav>
    );
  }
  