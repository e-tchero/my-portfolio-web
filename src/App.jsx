import { useEffect, useState } from "react";

const profile = {
  name: "Abdul-Hameed Aminu",
  location: "Abuja, Nigeria",
  email: "Abdulhameedas.121@proton.me",
  github: "https://github.com/e-tchero",
  linkedin: "https://www.linkedin.com/in/abdulhameed-amin/",
};

const projects = [
  {
    number: "01",
    name: "BLACKWING",
    category: "Systems engineering",
    status: "In development",
    description:
      "A Rust-based, zero-trust remote desktop platform. Its documented architecture spans encrypted transport, session management, desktop capture and display, clipboard synchronisation, audio, and network traversal.",
    stack: ["Rust", "Networking", "Cryptography", "Systems"],
    href: "https://github.com/e-tchero/BLACKWING",
  },
  {
    number: "02",
    name: "EMBEE NEXUS",
    category: "Product engineering",
    status: "In development",
    description:
      "A logistics and operations platform for commerce, dispatch, and delivery workflows. The project is adapting an existing baseline toward a modular backend, spatial data, real-time services, and web and mobile experiences.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "PostGIS", "Redis"],
    href: "https://github.com/e-tchero/embeenexus-platform",
  },
  {
    number: "03",
    name: "LOCAL COMPUTER MCP",
    category: "Developer tooling",
    status: "Active project",
    description:
      "A Windows-first Model Context Protocol server that exposes explicit workstation tools to compatible AI clients, with local command and file operations, stdio and HTTP transports, and audit logging.",
    stack: ["Python", "MCP", "Windows", "PowerShell"],
    href: "https://github.com/e-tchero/M-C-P",
  },
  {
    number: "04",
    name: "PROJECT ORBIT",
    category: "AI application",
    status: "Under construction",
    description:
      "An AI-native mobile platform bringing conversations, knowledge, projects, and specialised agents into one product, with a Flutter client and a layered FastAPI backend.",
    stack: ["Flutter", "FastAPI", "Python", "Supabase"],
    href: "https://github.com/e-tchero/PROJECT-ORBIT",
  },
];

const skillGroups = [
  {
    label: "Languages",
    items: ["Java", "Python", "JavaScript", "TypeScript", "Rust", "SQL"],
  },
  {
    label: "Application development",
    items: ["React", "Next.js", "Node.js", "REST APIs", "HTML", "CSS"],
  },
  {
    label: "Data & infrastructure",
    items: ["PostgreSQL", "PostGIS", "MySQL", "Redis", "Supabase", "Git"],
  },
  {
    label: "Tools & practice",
    items: ["Linux", "Windows", "Ollama", "Debugging", "Testing", "AI-assisted development"],
  },
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      {diagonal ? (
        <path d="M4 12 12 4M5 4h7v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M2.5 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function Mark() {
  return (
    <a className="wordmark" href="#top" aria-label="Abdul-Hameed Aminu, home">
      <span className="wordmark-symbol">A<span>.</span></span>
      <span className="wordmark-name">ABDUL-HAMEED AMINU</span>
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let disposed = false;
    let lenis;
    let frame = 0;
    let gsap;
    let ScrollTrigger;

    const startMotion = async () => {
      try {
        const [lenisModule, gsapModule, triggerModule] = await Promise.all([
          import(/* @vite-ignore */ "https://cdn.jsdelivr.net/npm/lenis@1.3.17/+esm"),
          import(/* @vite-ignore */ "https://cdn.jsdelivr.net/npm/gsap@3.14.2/+esm"),
          import(/* @vite-ignore */ "https://cdn.jsdelivr.net/npm/gsap@3.14.2/ScrollTrigger/+esm"),
        ]);
        if (disposed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const Lenis = lenisModule.default;
        gsap = gsapModule.gsap || gsapModule.default;
        ScrollTrigger = triggerModule.ScrollTrigger || triggerModule.default;
        gsap.registerPlugin(ScrollTrigger);

        lenis = new Lenis({ duration: 1.05, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time) => {
          lenis.raf(time);
          frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);

        gsap.from(".hero-eyebrow", { y: 18, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.15 });
        gsap.from(".hero-title-line", { yPercent: 110, opacity: 0, duration: 1, stagger: 0.12, ease: "power4.out", delay: 0.25 });
        gsap.from(".hero-copy, .hero-actions, .hero-meta", {
          y: 20, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.6,
        });

        gsap.utils.toArray("[data-reveal]").forEach((element) => {
          gsap.fromTo(element, { y: 28, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        });
        ScrollTrigger.refresh();
      } catch {
        document.documentElement.classList.add("motion-fallback");
      }
    };

    startMotion();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      if (lenis) lenis.destroy();
      if (ScrollTrigger) ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (gsap) gsap.killTweensOf("[data-reveal]");
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div id="top" className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <Mark />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#work" onClick={closeMenu}>Selected work</a>
            <a href="#skills" onClick={closeMenu}>Capabilities</a>
            <a href="#education" onClick={closeMenu}>Education</a>
            <a className="nav-contact" href="#contact" onClick={closeMenu}>Let's talk <ArrowIcon diagonal /></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero section-wrap">
          <div className="hero-grid">
            <div className="hero-main">
              <p className="eyebrow hero-eyebrow"><span className="eyebrow-mark" /> SOFTWARE DEVELOPER · PRODUCT BUILDER</p>
              <h1 className="hero-title" aria-label="Abdul-Hameed Aminu">
                <span className="hero-title-line">Abdul-Hameed</span>
                <span className="hero-title-line hero-title-last">Aminu<span className="title-period">.</span></span>
              </h1>
              <p className="hero-copy">
                I build practical software, digital products, and developer tools.
                Focused on thoughtful engineering, reliable systems, and turning
                ideas into useful working products.
              </p>
              <div className="hero-actions">
                <a className="button button-dark" href="#work">Explore my work <ArrowIcon /></a>
                <a className="text-link" href={profile.email ? "mailto:" + profile.email : "#contact"}>Get in touch <ArrowIcon diagonal /></a>
              </div>
              <div className="hero-meta">
                <span><i className="availability-dot" /> Open to software internships</span>
                <span>{profile.location}</span>
              </div>
            </div>

            <aside className="hero-aside" aria-label="Developer profile">
              <div className="profile-card">
                <div className="profile-card-top">
                  <span>PERSONAL PROFILE</span>
                  <span className="profile-index">001 / 026</span>
                </div>
                <div className="monogram" aria-hidden="true">
                  <span>A</span><span className="monogram-dot">.</span>
                </div>
                <div className="profile-card-bottom">
                  <div>
                    <span className="profile-label">CURRENT FOCUS</span>
                    <strong>Software engineering</strong>
                  </div>
                  <div className="profile-card-rule" />
                  <div className="profile-card-tags">
                    <span>BUILD</span><span>REFINE</span><span>SHIP</span>
                  </div>
                </div>
              </div>
              <div className="aside-note">
                <span className="aside-note-line" />
                <p>Curiosity is the starting point.<br />Engineering is the practice.</p>
              </div>
            </aside>
          </div>
          <div className="hero-bottomline">
            <span>PORTFOLIO / 2026</span>
            <a href="#about">SCROLL TO EXPLORE <span>↓</span></a>
            <span>INDEPENDENTLY BUILT IN ABUJA</span>
          </div>
        </section>

        <section className="intro-section section-wrap" id="about">
          <div className="section-kicker" data-reveal><span>01</span> / ABOUT</div>
          <div className="intro-grid">
            <h2 data-reveal>Engineering ideas<br />into <em>useful software.</em></h2>
            <div className="intro-copy" data-reveal>
              <p>
                I am an Advanced Diploma in Software Engineering student at
                Aptech Computer Education in Abuja, developing my practice through
                coursework and independent software projects.
              </p>
              <p>
                My interests include application development, backend systems,
                databases, AI-enabled tools, and developer infrastructure. I enjoy
                understanding how systems fit together, tracing problems to their
                cause, and making focused improvements that hold up in practice.
              </p>
              <p>
                I value clear requirements, maintainable code, useful documentation,
                and verification over claims that cannot be demonstrated.
              </p>
              <a className="inline-link" href={profile.github} target="_blank" rel="noreferrer">
                Explore my GitHub <ArrowIcon diagonal />
              </a>
            </div>
          </div>
        </section>

        <section className="work-section section-wrap" id="work">
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-kicker"><span>02</span> / SELECTED WORK</div>
              <h2>Projects with a<br /><em>purpose.</em></h2>
            </div>
            <p className="section-heading-note">
              A selection of systems and products I am building or developing.
              Each project links to its source repository and documents its current scope.
            </p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-row" key={project.number} data-reveal>
                <div className="project-number">{project.number}</div>
                <div className="project-content">
                  <div className="project-topline">
                    <span>{project.category}</span>
                    <span className="project-status">{project.status}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
                <a className="project-open" href={project.href} target="_blank" rel="noreferrer" aria-label={"View " + project.name + " repository"}>
                  <ArrowIcon diagonal />
                </a>
              </article>
            ))}
          </div>
          <div className="work-footnote">
            <span>MORE EXPERIMENTS & SOURCE CODE</span>
            <a className="inline-link" href={profile.github} target="_blank" rel="noreferrer">Visit GitHub <ArrowIcon diagonal /></a>
          </div>
        </section>

        <section className="capabilities-section section-wrap" id="skills">
          <div className="section-kicker" data-reveal><span>03</span> / CAPABILITIES</div>
          <div className="capabilities-heading" data-reveal>
            <h2>Tools for the<br /><em>work at hand.</em></h2>
            <p>
              Technologies encountered through my current studies and project work.
              I keep learning, testing, and expanding this toolkit.
            </p>
          </div>
          <div className="skill-groups">
            {skillGroups.map((group, index) => (
              <div className="skill-group" key={group.label} data-reveal>
                <div className="skill-group-number">0{index + 1}</div>
                <div className="skill-group-name">{group.label}</div>
                <div className="skill-list">
                  {group.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="education-section section-wrap" id="education">
          <div className="section-kicker" data-reveal><span>04</span> / EDUCATION</div>
          <div className="education-grid">
            <h2 data-reveal>Learning through<br /><em>practice.</em></h2>
            <div className="education-entry" data-reveal>
              <span className="education-period">CURRENT STUDIES</span>
              <div>
                <h3>Aptech Computer Education</h3>
                <p>Advanced Diploma in Software Engineering (ADSE)</p>
                <span className="education-detail">Semester 2 · Abuja, Nigeria</span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-top" data-reveal>
            <div className="section-kicker"><span>05</span> / CONTACT</div>
            <p className="contact-overline">HAVE A PROJECT, ROLE, OR TECHNICAL CHALLENGE?</p>
            <h2>Let's make<br /><em>something work.</em></h2>
          </div>
          <div className="contact-bottom" data-reveal>
            <a className="contact-email" href={"mailto:" + profile.email}>{profile.email}<ArrowIcon diagonal /></a>
            <div className="contact-links">
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowIcon diagonal /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon diagonal /></a>
              <a href="https://abdulhameedamin.ct.ws" target="_blank" rel="noreferrer">Portfolio <ArrowIcon diagonal /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <Mark />
          <span>© {new Date().getFullYear()} Abdul-Hameed Aminu</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </div>
  );
}
