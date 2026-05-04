"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  useEffect(() => {
    const nav = document.getElementById("nav");
    const handleScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);

    const fadeEls = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.05 }
);

// If element is already in view on load (e.g. after back navigation), show it immediately
fadeEls.forEach((el) => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    (el as HTMLElement).classList.add("visible");
  } else {
    observer.observe(el);
  }
});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 3rem;
          background: var(--white);
          border-bottom: 1px solid var(--light-gray);
          transition: box-shadow 0.3s;
        }
        nav.scrolled { box-shadow: 0 2px 20px rgba(0,0,0,0.06); }
        .nav-logo {
          font-family: var(--font-display); font-size: 1.5rem;
          letter-spacing: 0.05em; color: var(--black); text-decoration: none;
        }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; }
        .nav-links a {
          font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--gray); text-decoration: none; transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--black); }
        .nav-cta {
          color: var(--black) !important; border: 1px solid var(--black);
          padding: 0.5rem 1.25rem; border-radius: 2px;
          transition: background 0.2s, color 0.2s !important;
        }
        .nav-cta:hover { background: var(--black) !important; color: var(--white) !important; }

        .hero {
          min-height: 100vh; display: grid;
          grid-template-columns: 1fr 420px;
          padding-top: 80px; position: relative; overflow: hidden;
        }
        .hero-left {
          padding: 5rem 3rem 4rem;
          display: flex; flex-direction: column; justify-content: center;
        }
        .hero-tag {
          font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .hero-tag::before {
          content: ''; display: inline-block;
          width: 28px; height: 1px; background: var(--gray);
        }
        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(5rem, 10vw, 9rem);
          line-height: 0.92; letter-spacing: 0.02em;
          color: var(--black); margin-bottom: 0.5rem;
        }
        .hero-name span {
          display: block; color: transparent;
          -webkit-text-stroke: 2px var(--black);
        }
        .hero-role {
          font-family: var(--font-serif); font-style: italic;
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          color: var(--gray); margin-bottom: 2.5rem; margin-top: 0.5rem;
        }
        .hero-desc {
          font-size: 1rem; line-height: 1.75; color: #555;
          max-width: 480px; margin-bottom: 3rem;
        }
        .hero-desc strong { color: var(--black); font-weight: 500; }
        .hero-actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }

        .btn-primary {
          display: inline-block; background: var(--black); color: var(--white);
          font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.9rem 2rem; text-decoration: none;
          border: 1px solid var(--black); transition: background 0.2s, color 0.2s;
        }
        .btn-primary:hover { background: transparent; color: var(--black); }
        .btn-secondary {
          display: inline-block; color: var(--black);
          font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.9rem 2rem; text-decoration: none;
          border: 1px solid var(--light-gray); transition: border-color 0.2s;
        }
        .btn-secondary:hover { border-color: var(--black); }

        .hero-right {
          position: relative; background: var(--black); overflow: hidden;
        }
        .hero-accent {
          position: absolute; bottom: 2rem; right: 2rem; z-index: 2;
          background: var(--accent); color: var(--black);
          font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase;
          padding: 0.5rem 0.85rem; font-weight: 500;
        }
        .hero-scroll {
          position: absolute; bottom: 2.5rem; left: 3rem; z-index: 2;
          display: flex; align-items: center; gap: 0.75rem;
          font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--gray);
        }
        .hero-scroll::after {
          content: ''; display: inline-block;
          width: 40px; height: 1px; background: var(--gray);
          animation: scrollLine 2s ease-in-out infinite;
        }

        .marquee-bar {
          background: var(--black); color: var(--accent);
          padding: 0.85rem 0; overflow: hidden; white-space: nowrap;
        }
        .marquee-item { font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 0 2.5rem; }
        .marquee-dot { color: var(--gray); padding: 0 0.5rem; }

        .stats {
          display: grid; grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid var(--light-gray);
        }
        .stat {
          padding: 3rem 2.5rem; border-right: 1px solid var(--light-gray);
          transition: background 0.3s; cursor: default;
        }
        .stat:last-child { border-right: none; }
        .stat:hover { background: var(--black); }
        .stat:hover .stat-number, .stat:hover .stat-label, .stat:hover .stat-sub { color: var(--white); }
        .stat-number {
          font-family: var(--font-display); font-size: 3.5rem;
          line-height: 1; color: var(--black); margin-bottom: 0.5rem; transition: color 0.3s;
        }
        .stat-label {
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--black); font-weight: 500; transition: color 0.3s;
        }
        .stat-sub { font-size: 0.75rem; color: var(--gray); margin-top: 0.25rem; transition: color 0.3s; }

        .section { padding: 6rem 3rem; }
        .section-label {
          font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 1rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .section-label::before {
          content: ''; display: inline-block; width: 20px; height: 1px; background: var(--gray);
        }
        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.15; margin-bottom: 3rem;
        }

        .work-header {
          display: flex; align-items: flex-end;
          justify-content: space-between; margin-bottom: 3rem;
        }

        .case-studies {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--light-gray); border: 1px solid var(--light-gray);
        }
        .case-card {
          background: var(--white); padding: 2.5rem 2rem;
          text-decoration: none; color: inherit;
          display: flex; flex-direction: column;
          transition: background 0.3s; position: relative; overflow: hidden;
        }
        .case-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; background: var(--accent);
          transform: scaleX(0); transition: transform 0.3s; transform-origin: left;
        }
        .case-card:hover { background: var(--black); }
        .case-card:hover .case-num, .case-card:hover .case-title,
        .case-card:hover .case-hook, .case-card:hover .case-metric { color: var(--white); }
        .case-card:hover .case-tags span { color: var(--gray); border-color: #333; }
        .case-card:hover::after { transform: scaleX(1); }
        .case-num {
          font-family: var(--font-display); font-size: 3.5rem;
          line-height: 1; color: var(--light-gray); margin-bottom: 1.5rem; transition: color 0.3s;
        }
        .case-title {
          font-family: var(--font-serif); font-size: 1.35rem;
          line-height: 1.2; margin-bottom: 0.75rem; transition: color 0.3s;
        }
        .case-hook {
          font-size: 0.875rem; color: var(--gray); line-height: 1.65;
          margin-bottom: 1.5rem; flex: 1; transition: color 0.3s;
        }
        .case-metric {
          font-family: var(--font-display); font-size: 2rem;
          color: var(--black); margin-bottom: 1rem; transition: color 0.3s;
        }
        .case-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .case-tags span {
          font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid var(--light-gray); padding: 0.25rem 0.6rem;
          color: var(--gray); transition: color 0.3s, border-color 0.3s;
        }

        .about-strip {
          background: var(--black); color: var(--white);
          display: grid; grid-template-columns: 1fr 1fr;
        }
        .about-left { padding: 6rem 3rem; border-right: 1px solid #222; }
        .about-left .section-label { color: #555; }
        .about-left .section-label::before { background: #555; }
        .about-left .section-title { color: var(--white); }
        .about-body { font-size: 1rem; line-height: 1.8; color: #aaa; max-width: 480px; }
        .about-body strong { color: var(--white); font-weight: 400; }
        .about-cta {
          display: inline-block; margin-top: 2.5rem;
          color: var(--accent); font-size: 0.75rem; letter-spacing: 0.15em;
          text-transform: uppercase; text-decoration: none;
          border-bottom: 1px solid #2a3a1a; padding-bottom: 2px; transition: border-color 0.2s;
        }
        .about-cta:hover { border-color: var(--accent); }
        .about-right { padding: 6rem 3rem; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .skill-group-title {
          font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #555; margin-bottom: 1rem;
        }
        .skill-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .skill-list li {
          font-size: 0.9rem; color: #ccc;
          display: flex; align-items: center; gap: 0.6rem;
        }
        .skill-list li::before {
          content: ''; width: 4px; height: 4px;
          background: var(--accent); border-radius: 50%; flex-shrink: 0;
        }
        .lang-row {
          margin-top: 2.5rem; padding-top: 2rem;
          border-top: 1px solid #1e1e1c; display: flex; gap: 2rem;
        }
        .lang-item { display: flex; flex-direction: column; gap: 0.25rem; }
        .lang-name { font-size: 0.85rem; color: #ccc; }
        .lang-level { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: #555; }

        .tool-section {
          padding: 6rem 3rem; display: grid;
          grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
        }
        .tool-preview {
          background: var(--black); border-radius: 4px; padding: 2rem;
          aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center;
        }
        .tool-preview-inner {
          width: 100%; max-width: 280px; background: #1a1a18;
          border: 1px solid #2a2a28; border-radius: 4px; padding: 1.5rem;
        }
        .tool-preview-label {
          font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: #555; margin-bottom: 0.75rem;
        }
        .tool-preview-q { font-size: 0.8rem; color: #ccc; line-height: 1.5; margin-bottom: 1rem; }
        .tool-preview-bar { height: 1px; background: #2a2a28; margin-bottom: 1rem; position: relative; }
        .tool-preview-bar::after {
          content: ''; position: absolute; left: 0; top: 0; height: 100%;
          background: var(--accent); animation: barPulse 2s ease-in-out infinite;
        }
        .tool-preview-badge {
          display: inline-block; background: var(--accent); color: var(--black);
          font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.3rem 0.6rem; font-weight: 500;
        }
        .tool-body { font-size: 0.95rem; line-height: 1.75; color: #555; margin-bottom: 2rem; }

        footer {
          background: var(--black); color: var(--white); padding: 4rem 3rem;
          display: grid; grid-template-columns: 1fr auto;
          align-items: end; border-top: 1px solid #1a1a18;
        }
        .footer-name {
          font-family: var(--font-display); font-size: 3rem;
          letter-spacing: 0.05em; margin-bottom: 0.75rem;
        }
        .footer-sub { font-size: 0.8rem; color: #555; letter-spacing: 0.08em; }
        .footer-links { display: flex; flex-direction: column; gap: 0.75rem; text-align: right; }
        .footer-links a {
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: #555; text-decoration: none; transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--accent); }

        @media (max-width: 900px) {
          nav { padding: 1rem 1.5rem; }
          .nav-links { display: none; }
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-right { height: 60vw; }
          .hero-left { padding: 5rem 1.5rem 3rem; }
          .stats { grid-template-columns: repeat(2, 1fr); }
          .case-studies { grid-template-columns: 1fr; }
          .about-strip { grid-template-columns: 1fr; }
          .about-left { padding: 4rem 1.5rem; border-right: none; border-bottom: 1px solid #222; }
          .about-right { padding: 4rem 1.5rem; }
          .tool-section { grid-template-columns: 1fr; gap: 2rem; padding: 4rem 1.5rem; }
          .section { padding: 4rem 1.5rem; }
          footer { grid-template-columns: 1fr; gap: 2rem; }
          .footer-links { text-align: left; }
        }
      `}</style>

      <nav id="nav">
        <a href="#" className="nav-logo">EG</a>
        <ul className="nav-links">
          <li><a href="#work">Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#tool">Tool</a></li>
          <li><a href="#contact" className="nav-cta">Get in touch</a></li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag">Berlin, Germany</div>
          <h1 className="hero-name">
            Enes
            <span>Gozukucuk</span>
          </h1>
          <p className="hero-role">Product Strategist & Service Designer</p>
          <p className="hero-desc">
            I work at the intersection of <strong>business strategy, user research, and product thinking.</strong> My projects span market expansion across 19 countries, growing digital audiences from scratch, and redesigning how a university delivers its services to students.
            <br /><br />
            I also build. TypeScript, Flutter, Next.js. Which means I can turn research into prototypes and strategy into working software.
          </p>
          <div className="hero-actions">
            <a href="#work" className="btn-primary">View my work</a>
            <a href="#about" className="btn-secondary">About me</a>
          </div>
        </div>
        <div className="hero-right">
          <Image
  src="/enes-gozukucuk.jpg"
  alt="Enes Gozukucuk"
  fill
  sizes="420px"
  style={{ objectFit: "cover", objectPosition: "center top", opacity: 0.88, mixBlendMode: "luminosity" }}
  priority
/>
          <div className="hero-accent">TH Wildau · Berlin</div>
        </div>
        <div className="hero-scroll">Scroll</div>
      </section>

      <div className="marquee-bar">
        <div className="marquee-track">
          {[
            "Product Management","Service Design","Innovation Consulting",
            "User Research","Market Expansion","Growth Strategy",
            "Next.js · TypeScript · Flutter",
            "Product Management","Service Design","Innovation Consulting",
            "User Research","Market Expansion","Growth Strategy",
            "Next.js · TypeScript · Flutter",
          ].map((item, i) => (
            <span key={i}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-dot">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="stats">
        {[
          { number: "19", label: "International Markets", sub: "Labrys Consulting" },
          { number: "55K", label: "Instagram Followers", sub: "Grown from 15K in 8 months" },
          { number: "8M+", label: "Video Views", sub: "60+ Reels produced" },
          { number: "3", label: "Case Studies", sub: "Strategy · Growth · Design" },
        ].map((s, i) => (
          <div className="stat fade-up" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <section className="section" id="work" style={{ background: "var(--white)" }}>
        <div className="work-header">
          <div>
            <div className="section-label">Selected work</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Case Studies</h2>
          </div>
        </div>
        <div className="case-studies">
          {[
            {
              num: "01",
              title: "Refactoring a University as a Service",
              hook: "An interdisciplinary project at TH Wildau to redesign the student experience from the ground up. Stakeholder research, service blueprinting, and co-design with students, faculty, and administration.",
              metric: "Ongoing",
              tags: ["Service Design", "Systems Thinking", "UX Research", "Co-design"],
              href: "/work/th-wildau",
            },
            {
              num: "02",
              title: "Growing an EdTech Brand from 15K to 55K",
              hook: "A content and growth strategy for Okul.com.tr that grew their Instagram audience by 267% in 8 months. Built on audience research, format testing, and consistent KPI tracking.",
              metric: "267% Growth",
              tags: ["Product Strategy", "Growth", "Content", "Analytics"],
              href: "/work/okul",
            },
            {
              num: "03",
              title: "SaaS Expansion Across 19 Markets",
              hook: "Cross-market business development at Labrys Consulting. Adapted product positioning for each market, generated 70+ qualified leads per day, and improved CRM conversion by 15%.",
              metric: "+15% Conversion",
              tags: ["Market Strategy", "Business Development", "CRM", "Research"],
              href: "/work/labrys",
            },
          ].map((c, i) => (
            <a href={c.href} className="case-card fade-up" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="case-num">{c.num}</div>
              <h3 className="case-title">{c.title}</h3>
              <p className="case-hook">{c.hook}</p>
              <div className="case-metric">{c.metric}</div>
              <div className="case-tags">{c.tags.map(t => <span key={t}>{t}</span>)}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="about-strip" id="about">
        <div className="about-left">
          <div className="section-label">About</div>
          <h2 className="section-title">Business thinking,<br />user insight, built in code.</h2>
          <p className="about-body">
            I studied Management Information Systems at Bogazici University, which gave me a foundation in systems thinking and data. Now I am finishing a Masters in European Business Management at TH Wildau, where I also work as a student assistant on a service design project for the university itself.<br /><br />
            Before Berlin, I worked in business development across <strong>19 international markets</strong>, ran social media growth for an edtech company, and spent time in a call centre handling hundreds of customer interactions daily. Each role taught me something different about how people make decisions and where systems break down.<br /><br />
            I write code too. TypeScript, Flutter, Firebase, Next.js. It changes how I think about design because I know what is actually buildable.
          </p>
          <a href="#contact" className="about-cta">Get in touch</a>
        </div>
        <div className="about-right">
          <div className="skills-grid">
            <div>
              <div className="skill-group-title">Strategy & Research</div>
              <ul className="skill-list">
                {["Product Strategy", "Service Design", "Market Research", "Consumer Insights", "Growth Strategy"].map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div>
              <div className="skill-group-title">Execution & Build</div>
              <ul className="skill-list">
                {["Next.js / TypeScript", "Flutter / Firebase", "Data Analytics", "CRM (Sales Cloud)", "Content Systems"].map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>
          </div>
          <div className="lang-row">
            {[["Turkish", "Native"], ["English", "C1 Fluent"], ["German", "A2 Conversational"]].map(([name, level]) => (
              <div className="lang-item" key={name}>
                <span className="lang-name">{name}</span>
                <span className="lang-level">{level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tool-section" id="tool">
        <div className="tool-preview">
          <div className="tool-preview-inner">
            <div className="tool-preview-label">AI Persona Builder · Phase 2 of 4</div>
            <div className="tool-preview-q">"Describe the last time this person felt underserved by a product or service."</div>
            <div className="tool-preview-bar" />
            <div className="tool-preview-badge">Adaptive · Research-quality</div>
          </div>
        </div>
        <div>
          <div className="section-label">Live tool</div>
          <h2 className="section-title">An AI persona builder for practitioners</h2>
          <p className="tool-body">
            Most persona tools stop at demographics. This one asks harder questions. An adaptive AI questionnaire that follows up based on what you reveal, going three levels deep: who the person is, how they behave, and why they make the decisions they do.<br /><br />
            The output is a structured persona you can actually interview. Claude steps into the character and responds as that person would.
          </p>
          <a href="https://tools.enesgozukucuk.com" className="btn-primary">Try the tool</a>
        </div>
      </section>

      <footer id="contact">
        <div>
          <div className="footer-name">ENES GOZUKUCUK</div>
          <div className="footer-sub">Berlin, Germany</div>
        </div>
        <div className="footer-links">
          <a href="mailto:enesgozukucuk@gmail.com">enesgozukucuk@gmail.com</a>
          <a href="https://linkedin.com/in/enesgozukucuk" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://tools.enesgozukucuk.com" target="_blank" rel="noopener noreferrer">Persona Tool</a>
        </div>
      </footer>
    </>
  );
}