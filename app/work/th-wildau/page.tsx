"use client";

export default function THWildau() {
  return (
    <>
      <style>{`
        .cs-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 3rem;
          background: var(--white);
          border-bottom: 1px solid var(--light-gray);
        }
        .cs-nav-logo {
          font-family: var(--font-display); font-size: 1.5rem;
          letter-spacing: 0.05em; color: var(--black); text-decoration: none;
        }
        .cs-back {
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--gray); text-decoration: none; transition: color 0.2s;
        }
        .cs-back:hover { color: var(--black); }

        .cs-hero {
          padding: 10rem 3rem 5rem;
          max-width: 800px; margin: 0 auto;
        }
        .cs-label {
          font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .cs-label::before {
          content: ''; width: 20px; height: 1px; background: var(--gray);
        }
        .cs-title {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          line-height: 1.1; margin-bottom: 1.5rem; color: var(--black);
        }
        .cs-intro {
          font-size: 1.15rem; line-height: 1.75; color: #555;
          border-left: 3px solid var(--accent); padding-left: 1.5rem;
          margin-bottom: 3rem;
        }
        .cs-meta {
          display: flex; gap: 3rem; padding: 2rem 0;
          border-top: 1px solid var(--light-gray);
          border-bottom: 1px solid var(--light-gray);
          margin-bottom: 5rem;
        }
        .cs-meta-item { display: flex; flex-direction: column; gap: 0.35rem; }
        .cs-meta-label {
          font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray);
        }
        .cs-meta-value { font-size: 0.9rem; color: var(--black); font-weight: 500; }

        .cs-body { max-width: 800px; margin: 0 auto; padding: 0 3rem 8rem; }
        .cs-section { margin-bottom: 5rem; }
        .cs-section-title {
          font-family: var(--font-serif); font-size: 1.6rem;
          margin-bottom: 1.25rem; color: var(--black);
        }
        .cs-text {
          font-size: 1rem; line-height: 1.85; color: #444;
          margin-bottom: 1.25rem;
        }

        .cs-visual-placeholder {
          width: 100%; aspect-ratio: 16/9;
          background: var(--light-gray);
          display: flex; align-items: center; justify-content: center;
          margin: 2.5rem 0; border-radius: 2px;
          font-size: 0.75rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--gray);
        }
        .cs-visual-caption {
          font-size: 0.8rem; color: var(--gray); margin-top: -1.5rem;
          margin-bottom: 2.5rem; font-style: italic;
        }

        .cs-outcome-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--light-gray);
          border: 1px solid var(--light-gray); margin: 2.5rem 0;
        }
        .cs-outcome-item {
          background: var(--white); padding: 2rem;
        }
        .cs-outcome-number {
          font-family: var(--font-display); font-size: 2.5rem;
          line-height: 1; color: var(--black); margin-bottom: 0.5rem;
        }
        .cs-outcome-label { font-size: 0.85rem; color: var(--gray); line-height: 1.5; }

        .cs-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--light-gray); }
        .cs-tag {
          font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid var(--light-gray); padding: 0.35rem 0.75rem; color: var(--gray);
        }

        @media (max-width: 768px) {
          .cs-hero { padding: 8rem 1.5rem 3rem; }
          .cs-body { padding: 0 1.5rem 5rem; }
          .cs-meta { flex-wrap: wrap; gap: 1.5rem; }
          .cs-outcome-grid { grid-template-columns: 1fr; }
          .cs-nav { padding: 1rem 1.5rem; }
        }
      `}</style>

      <nav className="cs-nav">
        <a href="/" className="cs-nav-logo">EG</a>
        <a href="/#work" className="cs-back">Back to work</a>
      </nav>

      <div className="cs-hero">
        <div className="cs-label">Case Study 01</div>
        <h1 className="cs-title">Refactoring a University as a Service</h1>
        <p className="cs-intro">
          What happens when you apply service design thinking to an entire university? At TH Wildau, we set out to find out. This is an ongoing interdisciplinary project to redesign how the university works for its students, from first contact through graduation.
        </p>
        <div className="cs-meta">
          <div className="cs-meta-item">
            <span className="cs-meta-label">Organisation</span>
            <span className="cs-meta-value">TH Wildau, Berlin</span>
          </div>
          <div className="cs-meta-item">
            <span className="cs-meta-label">My Role</span>
            <span className="cs-meta-value">Student Assistant, Service Designer</span>
          </div>
          <div className="cs-meta-item">
            <span className="cs-meta-label">Timeline</span>
            <span className="cs-meta-value">2024 to present</span>
          </div>
          <div className="cs-meta-item">
            <span className="cs-meta-label">Type</span>
            <span className="cs-meta-value">Service Design, Research</span>
          </div>
        </div>
      </div>

      <div className="cs-body">

        <div className="cs-section">
          <h2 className="cs-section-title">Context</h2>
          <p className="cs-text">
            Universities are complex service systems. Students interact with dozens of touchpoints across their time there: admissions, enrollment, housing, course selection, academic support, career services. Most of these systems were built independently and never designed to work together.
          </p>
          <p className="cs-text">
            TH Wildau asked a fundamental question: if we were designing the student experience from scratch today, what would it look like? That question became the foundation of an interdisciplinary module, and the starting point for this project.
          </p>
        </div>

        <div className="cs-visual-placeholder">[ Add a photo or diagram here ]</div>
        <p className="cs-visual-caption">Initial service mapping session with student stakeholders</p>

        <div className="cs-section">
          <h2 className="cs-section-title">My Role</h2>
          <p className="cs-text">
            I joined as a student assistant and became one of the core contributors to the research and design process. My work covered stakeholder interviews, journey mapping, service blueprinting, and facilitation of co-design sessions with students and faculty.
          </p>
          <p className="cs-text">
            Working across an interdisciplinary team meant navigating very different mental models of what a university is and does. That tension turned out to be one of the most valuable parts of the process.
          </p>
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">Process</h2>
          <p className="cs-text">
            We started with research. Structured interviews with students across different years and programmes. The goal was not to validate assumptions but to surface what the university felt like from the inside.
          </p>
          <p className="cs-text">
            From there we moved into mapping. Journey maps for different student archetypes. A service blueprint covering the systems behind the visible touchpoints. This gave us a shared picture of where friction was concentrated and why.
          </p>
          <p className="cs-text">
            The co-design phase brought students and faculty into the same room to work on solutions together. Designing with stakeholders rather than for them changed the quality of ideas and their likelihood of actually being implemented.
          </p>
        </div>

        <div className="cs-visual-placeholder">[ Add journey map or blueprint visual ]</div>
        <p className="cs-visual-caption">Service blueprint excerpt showing backstage systems and student-facing touchpoints</p>

        <div className="cs-section">
          <h2 className="cs-section-title">Outcomes</h2>
          <p className="cs-text">
            The project is ongoing. But the work so far has shifted how the university talks about its student experience internally. Systems that were previously managed in silos are now part of a shared design conversation.
          </p>
          <div className="cs-outcome-grid">
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">3</div>
              <div className="cs-outcome-label">Co-design workshops with students and faculty</div>
            </div>
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">12+</div>
              <div className="cs-outcome-label">Student interviews conducted across programmes</div>
            </div>
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">1</div>
              <div className="cs-outcome-label">University reconsidering how it designs for students</div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">What I Learned</h2>
          <p className="cs-text">
            The hardest part of service design in an institutional context is not the research or the frameworks. It is getting people to see their organisation as a designed thing that could be designed differently. That shift in perspective is where the real work happens.
          </p>
          <p className="cs-text">
            I also learned that multi-stakeholder projects require a different kind of facilitation than single-team projects. The skill is in creating enough shared context that different people with different incentives can work toward something together.
          </p>
        </div>

        <div className="cs-tags">
          {["Service Design", "Systems Thinking", "UX Research", "Co-design", "Stakeholder Facilitation", "Journey Mapping", "Service Blueprinting"].map(t => (
            <span className="cs-tag" key={t}>{t}</span>
          ))}
        </div>

      </div>
    </>
  );
}