const projects = [
  {
    name: 'Tic-Tac-Toe Arcade',
    href: 'https://tictactoe.burnsy.me',
    blurb: 'React arcade board with vs-CPU, lives, streaks, and a shared leaderboard.',
  },
  {
    name: 'Connect 4 Retro',
    href: 'https://connect4.burnsy.me',
    blurb: 'Neon Connect 4 on the same games-cpu API and Harness → kind path.',
  },
  {
    name: 'Local platform demo',
    href: 'https://github.com/Ironmanburns/local-platform-demo',
    blurb: 'Kind, Cloudflare tunnels, Grafana, Hermes, and PR preview hosts on burnsy.me.',
  },
]

const into = [
  'Harness CI/CD for multi-language stacks — Python, Java, Go, and Node',
  'Homelab Kubernetes with kind, Helm, and zero-trust edge via Cloudflare',
  'Azure, Terraform, and OIDC-wired cloud automation',
  'Small playful apps that still ship with real pipelines, scans, and previews',
]

const stack = [
  'Harness',
  'Kubernetes',
  'Helm',
  'Terraform',
  'Azure',
  'Cloudflare',
  'Go',
  'Python',
  'Node',
  'Java',
  'React',
  'GitHub Actions',
]

export default function App() {
  return (
    <div className="page">
      <div className="atmosphere" aria-hidden="true">
        <div className="mesh" />
        <div className="grid-fade" />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
      </div>

      <header className="nav">
        <a className="nav-brand" href="#top">
          Burnsy
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#into">Into</a>
          <a href="#creating">Creating</a>
          <a href="#stack">Stack</a>
          <a href="https://github.com/Ironmanburns" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="brand">Burnsy</p>
            <h1>Jason Burns</h1>
            <p className="lede">
              I build deployment pipelines, homelab platforms, and the odd arcade —
              then wire them so they actually ship.
            </p>
            <div className="cta-row">
              <a className="cta primary" href="#creating">
                See what I make
              </a>
              <a
                className="cta ghost"
                href="https://github.com/Ironmanburns"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="pipe-stage">
              <span className="pipe p1" />
              <span className="pipe p2" />
              <span className="pipe p3" />
              <span className="node n1" />
              <span className="node n2" />
              <span className="node n3" />
              <span className="pulse" />
            </div>
          </div>
        </section>

        <section id="into" className="section">
          <h2>What I&apos;m into</h2>
          <p className="section-lede">
            Day job energy: DevOps and CI/CD. Off-hours: making platforms feel playful
            without dropping the engineering bar.
          </p>
          <ul className="into-list">
            {into.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="creating" className="section">
          <h2>What I like creating</h2>
          <p className="section-lede">
            Live experiments on burnsy.me — same Vite app → container → Helm → Harness
            → kind loop.
          </p>
          <ul className="project-list">
            {projects.map((project) => (
              <li key={project.name}>
                <a href={project.href} target="_blank" rel="noreferrer">
                  <span className="project-name">{project.name}</span>
                  <span className="project-blurb">{project.blurb}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="stack" className="section stack-section">
          <h2>Tools in rotation</h2>
          <p className="section-lede">
            The usual platform kit, plus enough frontend to keep the arcade lights on.
          </p>
          <p className="stack-flow">{stack.join(' · ')}</p>
        </section>

        <section className="section facts">
          <h2>A few facts</h2>
          <p className="section-lede">
            Based around building things that deploy themselves. GitHub as{' '}
            <a href="https://github.com/Ironmanburns" target="_blank" rel="noreferrer">
              @Ironmanburns
            </a>
            . Public zone{' '}
            <a href="https://www.burnsy.me">burnsy.me</a> fronts the homelab edge.
          </p>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Jason Burns</span>
        <a href="https://github.com/Ironmanburns" target="_blank" rel="noreferrer">
          github.com/Ironmanburns
        </a>
      </footer>
    </div>
  )
}
