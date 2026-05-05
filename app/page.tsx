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
          font-family: var(--font-display); font-size: 1rem;
          letter-spacing: 0.12em; color: var(--black); text-decoration: none;
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
          min-height: 85vh; display: grid;
          grid-template-columns: 1.2fr 380px;
          padding-top: 80px; position: relative; overflow: hidden;
        }
        .hero-left {
          padding: 4rem 3rem;
          display: flex; flex-direction: column; justify-content: center;
        }
        .hero-tag {
          font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 1.25rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .hero-tag::before {
          content: ''; display: inline-block;
          width: 28px; height: 1px; background: var(--gray);
        }
        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 5.5vw, 5rem);
          line-height: 0.95; letter-spacing: 0.02em;
          color: var(--black); margin-bottom: 0.5rem;
        }
        .hero-name span {
          display: block; color: transparent;
          -webkit-text-stroke: 2px var(--black);
        }
        .hero-role {
          font-family: var(--font-serif); font-style: italic;
          font-size: clamp(1rem, 2vw, 1.4rem);
          color: var(--gray); margin-bottom: 2rem; margin-top: 0.5rem;
        }
        .hero-desc {
          font-size: 0.95rem; line-height: 1.75; color: #555;
          max-width: 560px; margin-bottom: 2.5rem;
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
        @keyframes scrollLine { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

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
          padding: 2.5rem 2rem; border-right: 1px solid var(--light-gray);
          transition: background 0.3s; cursor: default;
        }
        .stat:last-child { border-right: none; }
        .stat:hover { background: var(--black); }
        .stat:hover .stat-number, .stat:hover .stat-label, .stat:hover .stat-sub { color: var(--white); }
        .stat-number {
          font-family: var(--font-display); font-size: 3rem;
          line-height: 1; color: var(--black); margin-bottom: 0.4rem; transition: color 0.3s;
        }
        .stat-label {
          font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--black); font-weight: 500; transition: color 0.3s;
        }
        .stat-sub { font-size: 0.72rem; color: var(--gray); margin-top: 0.2rem; transition: color 0.3s; }

        .section { padding: 5rem 3rem; }
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
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          line-height: 1.15; margin-bottom: 2.5rem;
        }

        .tool-banner {
          background: var(--black); padding: 3.5rem 3rem;
          display: grid; grid-template-columns: 1fr auto;
          align-items: center; gap: 3rem;
          border-bottom: 1px solid #222;
        }
        .tool-banner-left .section-label { color: #555; }
        .tool-banner-left .section-label::before { background: #555; }
        .tool-banner-title {
          font-family: var(--font-serif);
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          color: var(--white); line-height: 1.2; margin-bottom: 0.65rem;
        }
        .tool-banner-sub { font-size: 0.875rem; color: #888; line-height: 1.65; max-width: 440px; }
        .tool-banner-preview {
          background: #1a1a18; border: 1px solid #2a2a28;
          border-radius: 4px; padding: 1.5rem; min-width: 240px;
        }
        .tool-banner-preview-label {
          font-size: 0.58rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: #555; margin-bottom: 0.75rem;
        }
        .tool-banner-preview-q { font-size: 0.78rem; color: #ccc; line-height: 1.5; margin-bottom: 1rem; }
        .tool-banner-preview-bar { height: 1px; background: #2a2a28; margin-bottom: 1rem; position: relative; }
        .tool-banner-preview-bar::after {
          content: ''; position: absolute; left: 0; top: 0; height: 100%;
          background: var(--accent); animation: barPulse 2s ease-in-out infinite;
        }
        @keyframes barPulse { 0%, 100% { width: 60%; } 50% { width: 78%; } }
        .tool-banner-badge {
          display: inline-block; background: var(--accent); color: var(--black);
          font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.3rem 0.6rem; font-weight: 500;
          text-decoration: none; cursor: pointer; transition: opacity 0.2s;
        }
        .tool-banner-badge:hover { opacity: 0.85; }
        .tool-banner-btn {
          display: inline-block; margin-top: 1.5rem;
          background: var(--accent); color: var(--black);
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.85rem 1.75rem; text-decoration: none;
          font-family: var(--font-body); font-weight: 500;
          transition: opacity 0.2s;
        }
        .tool-banner-btn:hover { opacity: 0.85; }

        .work-header {
          display: flex; align-items: flex-end;
          justify-content: space-between; margin-bottom: 2.5rem;
        }

        .case-studies {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--light-gray); border: 1px solid var(--light-gray);
        }
        .case-card {
          background: var(--white); padding: 2rem 1.75rem;
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
          font-family: var(--font-display); font-size: 3rem;
          line-height: 1; color: var(--light-gray); margin-bottom: 1.25rem; transition: color 0.3s;
        }
        .case-title {
          font-family: var(--font-serif); font-size: 1.2rem;
          line-height: 1.25; margin-bottom: 0.65rem; transition: color 0.3s;
        }
        .case-hook {
          font-size: 0.82rem; color: var(--gray); line-height: 1.65;
          margin-bottom: 1.25rem; flex: 1; transition: color 0.3s;
        }
        .case-metric {
          font-family: var(--font-display); font-size: 1.75rem;
          color: var(--black); margin-bottom: 0.85rem; transition: color 0.3s;
        }
        .case-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .case-tags span {
          font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid var(--light-gray); padding: 0.2rem 0.55rem;
          color: var(--gray); transition: color 0.3s, border-color 0.3s;
        }

        .about-strip {
          background: #1a1a18; color: var(--white);
          display: grid; grid-template-columns: 65fr 35fr;
        }
        .about-left {
          padding: 4rem 3rem; border-right: 1px solid #2a2a28; width: 100%;
        }
        .about-left .section-label { color: #666; }
        .about-left .section-label::before { background: #666; }
        .about-left .section-title {
          color: var(--white); font-size: clamp(1.4rem, 2.5vw, 1.9rem); margin-bottom: 1.25rem;
        }
        .about-body { font-size: 1rem; line-height: 1.85; color: #bbb; max-width: 100%; }
        .about-body strong { color: var(--white); font-weight: 500; }
        .about-cta {
          display: inline-block; margin-top: 2rem;
          color: var(--accent); font-size: 0.75rem; letter-spacing: 0.15em;
          text-transform: uppercase; text-decoration: none;
          border-bottom: 1px solid #2a3a1a; padding-bottom: 2px; transition: border-color 0.2s;
        }
        .about-cta:hover { border-color: var(--accent); }
        .about-right { padding: 4rem 3rem; }
        .skills-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1.5rem; margin-bottom: 1.5rem;
        }
        .skill-group-title {
          font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #666; margin-bottom: 0.85rem; white-space: nowrap;
        }
        .skill-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .skill-list li {
          font-size: 0.875rem; color: #ddd;
          display: flex; align-items: center; gap: 0.6rem;
        }
        .skill-list li::before {
          content: ''; width: 4px; height: 4px;
          background: var(--accent); border-radius: 50%; flex-shrink: 0;
        }
        .lang-row {
          padding-top: 1.5rem; border-top: 1px solid #2a2a28;
          display: flex; gap: 2rem;
        }
        .lang-item { display: flex; flex-direction: column; gap: 0.25rem; }
        .lang-name { font-size: 0.875rem; color: #ddd; }
        .lang-level { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: #666; }

        footer {
          background: #0d0d0d; color: var(--white); padding: 3.5rem 3rem;
          display: grid; grid-template-columns: 1fr auto;
          align-items: end; border-top: 1px solid #1a1a18;
        }
        .footer-name {
          font-family: var(--font-display); font-size: 2.5rem;
          letter-spacing: 0.05em; margin-bottom: 0.5rem;
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
          .hero-right { height: 65vw; }
          .hero-left { padding: 5rem 1.5rem 3rem; }
          .stats { grid-template-columns: repeat(2, 1fr); }
          .case-studies { grid-template-columns: 1fr; }
          .about-strip { grid-template-columns: 1fr; }
          .about-left { padding: 3rem 1.5rem; border-right: none; border-bottom: 1px solid #2a2a28; }
          .about-right { padding: 3rem 1.5rem; }
          .section { padding: 3.5rem 1.5rem; }
          .tool-banner { grid-template-columns: 1fr; padding: 3rem 1.5rem; }
          .tool-banner-preview { min-width: unset; }
          footer { grid-template-columns: 1fr; gap: 2rem; padding: 3rem 1.5rem; }
          .footer-links { text-align: left; }
        }
      `}</style>

      <nav id="nav">
        <a href="#" className="nav-logo">Enes Gozukucuk</a>
        <ul className="nav-links">
          <li><a href="#work">Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="/tool">Tool</a></li>
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
            sizes="380px"
            style={{ objectFit: "cover", objectPosition: "center 15%", opacity: 1 }}
            priority
          />
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

      <div className="tool-banner" id="tool">
        <div className="tool-banner-left">
          <div className="section-label">Live tool</div>
          <h2 className="tool-banner-title">AI Persona Builder for practitioners</h2>
          <p className="tool-banner-sub">
            Most persona tools produce surface-level profiles. This one runs an adaptive interview, asks follow-up questions based on your answers, and generates a persona you can have a real conversation with.
          </p>
          <a href="/tool" className="tool-banner-btn">Try the tool</a>
        </div>
        <div className="tool-banner-preview">
          <div className="tool-banner-preview-label">Live demo · Phase 2 of 4</div>
          <div className="tool-banner-preview-q">"Describe the last time this person felt underserved by a product or service."</div>
          <div className="tool-banner-preview-bar" />
          <a href="/tool" className="tool-banner-badge">Open the persona builder</a>
        </div>
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
            I studied Management Information Systems at Bogazici University, then moved to Berlin for a Masters in European Business Management at TH Wildau. Alongside the degree, I work as a student assistant redesigning the university as a service from scratch.<br /><br />
            Before Berlin: business development across 19 markets, growth strategy for an edtech brand, and a year in a high-volume customer operations role. Each one taught me something different about how people behave under friction.<br /><br />
            I also build. TypeScript, Flutter, Firebase, Next.js.
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

      <footer id="contact">
        <div>
          <div className="footer-name">ENES GOZUKUCUK</div>
          <div className="footer-sub">Berlin, Germany</div>
        </div>
        <div className="footer-links">
          <a href="mailto:enesgozukucuk@gmail.com">enesgozukucuk@gmail.com</a>
          <a href="https://linkedin.com/in/enesgozukucuk" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="/tool">Persona Tool</a>
        </div>
      </footer>
    </>
  );
}