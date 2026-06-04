"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  useEffect(() => {
    const nav = document.getElementById("nav");
    const handleScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 3rem; background: var(--white);
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
          font-size: 1rem; line-height: 1.8; color: #555;
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
        .hero-right { position: relative; background: var(--black); overflow: hidden; }
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

        .stats {
          display: grid; grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid var(--light-gray);
        }
        .stat {
          padding: 2.5rem 2rem; border-right: 1px solid var(--light-gray);
          transition: background 0.3s; cursor: pointer;
          text-decoration: none; color: inherit; display: block;
        }
        .stat:last-child { border-right: none; }
        .stat:hover { background: var(--black); }
        .stat:hover .stat-number,
        .stat:hover .stat-label,
        .stat:hover .stat-sub { color: var(--white); }
        .stat-number {
          font-family: var(--font-display); font-size: 3rem;
          line-height: 1; color: var(--black); margin-bottom: 0.4rem; transition: color 0.3s;
        }
        .stat-label {
          font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--black); font-weight: 500; transition: color 0.3s;
        }
        .stat-sub { font-size: 0.72rem; color: var(--gray); margin-top: 0.2rem; transition: color 0.3s; }

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
        .tool-banner-sub { font-size: 0.875rem; color: #888; line-height: 1.65; max-width: 540px; }
        .tool-banner-right {
          display: flex; flex-direction: column; gap: 1rem;
          align-items: flex-start; min-width: 220px;
        }
        .tool-link {
          display: flex; align-items: center; gap: 0.75rem;
          text-decoration: none; padding: 1rem 1.25rem;
          border: 1px solid #2a2a28; width: 100%;
          transition: border-color 0.2s, background 0.2s;
        }
        .tool-link:hover { border-color: var(--accent); background: #111; }
        .tool-link-label {
          font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase;
          color: #888; margin-bottom: 0.15rem;
        }
        .tool-link-name { font-size: 0.9rem; color: var(--white); font-weight: 500; }
        .tool-link-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); flex-shrink: 0;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .tool-banner-btn {
          display: inline-block; margin-top: 1.5rem;
          background: var(--accent); color: var(--black);
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.85rem 1.75rem; text-decoration: none;
          font-family: var(--font-body); font-weight: 500; transition: opacity 0.2s;
        }
        .tool-banner-btn:hover { opacity: 0.85; }

        .work-section { padding: 5rem 3rem; }
        .work-header {
          display: flex; align-items: flex-end;
          justify-content: space-between; margin-bottom: 2.5rem;
        }
        .case-studies {
          display: grid; grid-template-columns: repeat(4, 1fr);
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
        .case-card:hover .case-num,
        .case-card:hover .case-title,
        .case-card:hover .case-hook,
        .case-card:hover .case-metric { color: var(--white); }
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
        .about-left { padding: 4rem 3rem; border-right: 1px solid #2a2a28; width: 100%; }
        .about-left .section-label { color: #666; }
        .about-left .section-label::before { background: #666; }
        .about-left .section-title {
          color: var(--white); font-size: clamp(1.6rem, 3vw, 2.2rem); margin-bottom: 1.5rem;
        }
        .about-hook { font-size: 1.05rem; line-height: 1.8; color: #bbb; margin-bottom: 1.5rem; }
        .about-hook strong { color: var(--white); font-weight: 500; }
        .about-read-more {
          display: inline-block; margin-top: 0.5rem;
          color: var(--accent); font-size: 0.75rem; letter-spacing: 0.15em;
          text-transform: uppercase; text-decoration: none;
          border-bottom: 1px solid #2a3a1a; padding-bottom: 2px; transition: border-color 0.2s;
        }
        .about-read-more:hover { border-color: var(--accent); }
        .about-right { padding: 4rem 3rem; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2.5rem; }
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
          padding-top: 1.5rem; border-top: 1px solid #2a2a28; display: flex; gap: 2rem;
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
          .work-section { padding: 3.5rem 1.5rem; }
          .tool-banner { grid-template-columns: 1fr; padding: 3rem 1.5rem; }
          footer { grid-template-columns: 1fr; gap: 2rem; padding: 3rem 1.5rem; }
          .footer-links { text-align: left; }
        }
      `}</style>

      <nav id="nav">
        <a href="/" className="nav-logo">Enes Gozukucuk</a>
        <ul className="nav-links">
          <li><a href="#work">Work</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/tools" className="nav-cta">Service Design Tools</a></li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag">Berlin, Germany</div>
          <h1 className="hero-name">
            Enes
            <span>Gozukucuk</span>
          </h1>
          <p className="hero-role">Systems Thinker & Builder</p>
          <p className="hero-desc">
            I grew up in Adana wondering why the city was not built by the sea.
            I still walk into every room asking the same question.
            <br /><br />
            <strong>What is broken here, and how could it be better?</strong>
          </p>
          <div className="hero-actions">
            <a href="#work" className="btn-primary">View my work</a>
            <a href="/about" className="btn-secondary">My story</a>
          </div>
        </div>
        <div className="hero-right">
          <Image
            src="/enes-gozukucuk.jpg"
            alt="Enes Gozukucuk"
            fill
            sizes="(max-width: 900px) 100vw, 760px"
            quality={100}
            unoptimized
            style={{ objectFit: "cover", objectPosition: "center 15%" }}
            priority
          />
        </div>
        <div className="hero-scroll">Scroll</div>
      </section>

      <div className="stats">
        <a href="/work/labrys" className="stat">
          <div className="stat-number">19</div>
          <div className="stat-label">International Markets</div>
          <div className="stat-sub">Labrys Consulting</div>
        </a>
        <a href="/work/okul" className="stat">
          <div className="stat-number">55K</div>
          <div className="stat-label">Followers Gained</div>
          <div className="stat-sub">Grew Okul.com.tr from 15K to 55K</div>
        </a>
        <a href="/unicore" className="stat">
          <div className="stat-number">6</div>
          <div className="stat-label">Features Shipped</div>
          <div className="stat-sub">Unicore campus app</div>
        </a>
        <a href="#work" className="stat">
          <div className="stat-number">4</div>
          <div className="stat-label">Case Studies</div>
          <div className="stat-sub">Strategy · Growth · Design · Build</div>
        </a>
      </div>

      <div className="tool-banner" id="tools">
        <div className="tool-banner-left">
          <div className="section-label">Service Design Tools</div>
          <h2 className="tool-banner-title">AI tools built for design practitioners</h2>
          <p className="tool-banner-sub">
            I noticed that most persona tools were built for marketing teams, not service designers.
            So I built my own. The Persona Builder runs an adaptive interview and generates a persona
            you can actually talk to. Lukas is a student persona created in a service design class
            at TH Wildau, trained on real research data, and available for workshops with university stakeholders.
          </p>
          <a href="/tools" className="tool-banner-btn">Explore the tools</a>
        </div>
        <div className="tool-banner-right">
          <a href="/tool" className="tool-link">
            <div className="tool-link-dot" />
            <div>
              <div className="tool-link-label">Persona Builder</div>
              <div className="tool-link-name">AI Persona Generator</div>
            </div>
          </a>
          <a href="/lukas" className="tool-link">
            <div className="tool-link-dot" />
            <div>
              <div className="tool-link-label">AI Research Persona</div>
              <div className="tool-link-name">Interview Lukas</div>
            </div>
          </a>
        </div>
      </div>

      <section className="work-section" id="work">
        <div className="work-header">
          <div>
            <div className="section-label">Selected work</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Case Studies</h2>
          </div>
        </div>
        <div className="case-studies">
          <a href="/unicore" className="case-card">
            <div className="case-num">01</div>
            <h3 className="case-title">Unicore: A Campus App Built from Frustration</h3>
            <p className="case-hook">
              I got tired of watching students struggle with fragmented university systems.
              So I built a full app from scratch, knocked on doors until someone listened,
              and got hired to redesign the university around it.
            </p>
            <div className="case-metric">Self-initiated</div>
            <div className="case-tags">
              <span>React</span>
              <span>Node.js</span>
              <span>TypeScript</span>
              <span>Product Design</span>
            </div>
          </a>
          <a href="/work/th-wildau" className="case-card">
            <div className="case-num">02</div>
            <h3 className="case-title">Refactoring a University as a Service</h3>
            <p className="case-hook">
              A university asked a student to help redesign it. From within, as someone who felt the same frictions.
            </p>
            <div className="case-metric">Ongoing</div>
            <div className="case-tags">
              <span>Service Design</span>
              <span>Co-design</span>
              <span>Research</span>
            </div>
          </a>
          <a href="/work/okul" className="case-card">
            <div className="case-num">03</div>
            <h3 className="case-title">Growing an EdTech Brand from 15K to 55K</h3>
            <p className="case-hook">
              Persona-first strategy and early short-form video. 267% growth in eight months.
            </p>
            <div className="case-metric">267% Growth</div>
            <div className="case-tags">
              <span>Growth</span>
              <span>Content</span>
              <span>Analytics</span>
            </div>
          </a>
          <a href="/work/labrys" className="case-card">
            <div className="case-num">04</div>
            <h3 className="case-title">SaaS Expansion Across 19 Markets</h3>
            <p className="case-hook">
              Small details change outcomes. I came away with a sharper eye for what actually moves people.
            </p>
            <div className="case-metric">+15% Conversion</div>
            <div className="case-tags">
              <span>Market Strategy</span>
              <span>B2B</span>
              <span>CRM</span>
            </div>
          </a>
        </div>
      </section>

      <section className="about-strip" id="about">
        <div className="about-left">
          <div className="section-label">About</div>
          <h2 className="section-title">I find the friction.<br />Then I remove it.</h2>
          <p className="about-hook">
            My background spans business development across 19 markets, growing digital
            audiences from scratch, and redesigning how a university actually works from
            the inside. I also build. TypeScript, React, Node.js, Flutter. Which means
            I can turn research into prototypes and strategy into working software.
          </p>
          <p className="about-hook" style={{ marginTop: "1rem" }}>
            <strong>The longer version is worth reading.</strong> It starts in Adana,
            goes through Istanbul, and ends up in Wildau with a student asking why
            nothing works the way it should.
          </p>
          <a href="/about" className="about-read-more">Read my story</a>
        </div>
        <div className="about-right">
          <div className="skills-grid">
            <div>
              <div className="skill-group-title">Strategy & Research</div>
              <ul className="skill-list">
                <li>Service Design</li>
                <li>Product Strategy</li>
                <li>Market Research</li>
                <li>Consumer Insights</li>
                <li>Growth Strategy</li>
              </ul>
            </div>
            <div>
              <div className="skill-group-title">Execution & Build</div>
              <ul className="skill-list">
                <li>React / Node.js</li>
                <li>Next.js / TypeScript</li>
                <li>Flutter / Firebase</li>
                <li>LLM Integration</li>
                <li>CRM (Sales Cloud)</li>
              </ul>
            </div>
          </div>
          <div className="lang-row">
            <div className="lang-item">
              <span className="lang-name">Turkish</span>
              <span className="lang-level">Native</span>
            </div>
            <div className="lang-item">
              <span className="lang-name">English</span>
              <span className="lang-level">C1 Fluent</span>
            </div>
            <div className="lang-item">
              <span className="lang-name">German</span>
              <span className="lang-level">A2 Conversational</span>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div>
          <div className="footer-name">ENES GOZUKUCUK</div>
          <div className="footer-sub">Berlin, Germany</div>
        </div>
        <div className="footer-links">
          <a href="mailto:enesgozukucukp@gmail.com">enesgozukucukp@gmail.com</a>
          <a href="https://linkedin.com/in/enesgozukucuk" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="/tools">Service Design Tools</a>
        </div>
      </footer>
    </>
  );
}