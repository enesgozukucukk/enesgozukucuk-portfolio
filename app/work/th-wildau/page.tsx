export default function THWildau() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --black: #0d0d0d; --white: #f5f4f0; --accent: #c8f04a;
          --gray: #888880; --light-gray: #e8e7e2;
          --font-display: 'Bebas Neue', sans-serif;
          --font-serif: 'DM Serif Display', serif;
          --font-body: 'DM Sans', sans-serif;
        }
        body { background: var(--white); color: var(--black); font-family: var(--font-body); }

        .cs-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 3rem; background: var(--white);
          border-bottom: 1px solid var(--light-gray);
        }
        .cs-nav-logo {
          font-family: var(--font-display); font-size: 1rem;
          letter-spacing: 0.12em; color: var(--black); text-decoration: none;
        }
        .cs-back {
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--gray); text-decoration: none; transition: color 0.2s;
        }
        .cs-back:hover { color: var(--black); }

        .cs-hero { padding: 9rem 3rem 4rem; max-width: 860px; margin: 0 auto; }
        .cs-label {
          font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .cs-label::before { content: ''; width: 20px; height: 1px; background: var(--gray); }
        .cs-title {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          line-height: 1.1; margin-bottom: 1.5rem; color: var(--black);
        }
        .cs-intro {
          font-size: 1.15rem; line-height: 1.75; color: #555;
          border-left: 3px solid var(--accent); padding-left: 1.5rem;
          margin-bottom: 3rem; font-family: var(--font-serif); font-style: italic;
        }
        .cs-meta {
          display: flex; gap: 3rem; padding: 2rem 0;
          border-top: 1px solid var(--light-gray);
          border-bottom: 1px solid var(--light-gray);
          margin-bottom: 5rem; flex-wrap: wrap;
        }
        .cs-meta-item { display: flex; flex-direction: column; gap: 0.35rem; }
        .cs-meta-label {
          font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray);
        }
        .cs-meta-value { font-size: 0.9rem; color: var(--black); font-weight: 500; }

        .cs-body { max-width: 860px; margin: 0 auto; padding: 0 3rem 8rem; }
        .cs-section { margin-bottom: 4rem; }
        .cs-section-title {
          font-family: var(--font-serif); font-size: 1.6rem;
          margin-bottom: 1.25rem; color: var(--black);
        }
        .cs-text { font-size: 1rem; line-height: 1.85; color: #444; margin-bottom: 1.25rem; }
        .cs-text strong { color: var(--black); font-weight: 500; }

        .cs-pull {
          font-family: var(--font-serif); font-style: italic;
          font-size: 1.25rem; line-height: 1.55; color: var(--black);
          padding: 2rem 0; border-top: 1px solid var(--light-gray);
          border-bottom: 1px solid var(--light-gray); margin: 2.5rem 0;
        }

        .cs-outcome-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--light-gray);
          border: 1px solid var(--light-gray); margin: 2.5rem 0;
        }
        .cs-outcome-item { background: var(--white); padding: 2rem; }
        .cs-outcome-number {
          font-family: var(--font-display); font-size: 2.5rem;
          line-height: 1; color: var(--black); margin-bottom: 0.5rem;
        }
        .cs-outcome-label { font-size: 0.85rem; color: var(--gray); line-height: 1.5; }

        .cs-divider { height: 1px; background: var(--light-gray); margin: 3rem 0; }

        .cs-tags {
          display: flex; flex-wrap: wrap; gap: 0.5rem;
          margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--light-gray);
        }
        .cs-tag {
          font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid var(--light-gray); padding: 0.35rem 0.75rem; color: var(--gray);
        }

        @media (max-width: 768px) {
          .cs-hero { padding: 7rem 1.5rem 3rem; }
          .cs-body { padding: 0 1.5rem 5rem; }
          .cs-meta { flex-wrap: wrap; gap: 1.5rem; }
          .cs-outcome-grid { grid-template-columns: 1fr; }
          .cs-nav { padding: 1rem 1.5rem; }
        }
      `}</style>

      <nav className="cs-nav">
        <a href="/" className="cs-nav-logo">Enes Gozukucuk</a>
        <a href="/#work" className="cs-back">Back to work</a>
      </nav>

      <div className="cs-hero">
        <div className="cs-label">Case Study 01</div>
        <h1 className="cs-title">Refactoring a University as a Service</h1>
        <p className="cs-intro">
          A university asked a student to help redesign it. Not from the outside, not as a consultant. From within, as someone who sat in the same lectures, ate at the same mensa, and felt the same frictions. This is that project.
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
            <span className="cs-meta-value">Service Design, Systems Thinking</span>
          </div>
        </div>
      </div>

      <div className="cs-body">

        <div className="cs-section">
          <h2 className="cs-section-title">Context</h2>
          <p className="cs-text">
            Universities are complex service systems. Students interact with dozens of touchpoints across their time there: admissions, enrolment, housing, course selection, academic support, career services. Most of these systems were built independently and never designed to work together. Nobody was looking at the whole picture from the student's perspective.
          </p>
          <p className="cs-text">
            When I arrived at TH Wildau for my Masters, I became active quickly. I joined the Student Parliament and got the fourth most votes in the election a few months after arriving. I was placed on the anti-discrimination committee, focused on international students and their needs. That work gave me a close-up view of where the university was failing the people it was supposed to serve.
          </p>
          <p className="cs-text">
            So I built something on my own. A mobile app called Unicore, designed to fix real problems: social life, buying and selling, accommodation, events, and the onboarding process. I presented it across the university. The response was not what I expected. Instead of being thanked and sent home, I was asked to stay. To work as a Student Assistant and help redesign the university itself as a student-centred service.
          </p>
        </div>

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">My Role</h2>
          <p className="cs-text">
            My official title is Student Assistant in the interdisciplinary module Service Design. In practice, I build bridges. Between the student body and the university administration. Between what students actually need and what the institution thinks they need.
          </p>
          <p className="cs-text">
            I conduct surveys and workshops, facilitate co-design sessions, create and run student clubs, and build pages for the university website to signal the direction of change. I work across multiple stakeholder groups: students, faculty, administrative staff, and the rector's office.
          </p>
          <p className="cs-text">
            The hardest part of the role is also the most important: slowing down. I came from a fast-paced business background and was used to moving quickly. Institutional change does not work like that. Learning to understand the needs before reaching for solutions, and never imposing from above, changed how I think about design work entirely.
          </p>
        </div>

        <div className="cs-pull">
          The most surprising thing I discovered is how slow institutional change has to be. It taught me something important: understand the needs before you reach for solutions. Never impose from above.
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">Process</h2>
          <p className="cs-text">
            The work happens in layers. Research first. I ran structured surveys and face-to-face interviews with students across different programmes and years. Not to validate assumptions but to understand what the university actually felt like from the inside.
          </p>
          <p className="cs-text">
            One of the most revealing moments came from a simple survey at the mensa, conducted after students finished eating. We asked them what they were expecting the university to do for them, and what the student body should focus on. People were not just willing to answer. They were genuinely happy to be asked. Just to feel included. That response shaped everything that came after.
          </p>
          <p className="cs-text">
            From the research we moved into mapping: student journey maps, service blueprints covering the systems behind the visible touchpoints, and co-design sessions that brought students and staff into the same room to work on solutions together. Designing with stakeholders rather than for them changed the quality of what came out and the likelihood of it actually being implemented.
          </p>
          <p className="cs-text">
            The Unicore app sits alongside this work as a practical prototype. It is currently in contact with the university's app development team, working through the details before student release.
          </p>
        </div>

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">Outcomes</h2>
          <p className="cs-text">
            The project is ongoing. But the work so far has shifted how the university talks about its student experience internally. Systems that were previously managed in silos are now part of a shared design conversation. Student voice is being built into institutional decision-making in a way it was not before.
          </p>
          <div className="cs-outcome-grid">
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">3+</div>
              <div className="cs-outcome-label">Co-design workshops with students and faculty</div>
            </div>
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">1</div>
              <div className="cs-outcome-label">Mobile app prototype in development with the university team</div>
            </div>
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">1</div>
              <div className="cs-outcome-label">University actively redesigning itself around student needs</div>
            </div>
          </div>
        </div>

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">What I Learned</h2>
          <p className="cs-text">
            The hardest part of service design in an institutional context is not the research or the frameworks. It is getting people to see their organisation as a designed thing that could be designed differently. That shift in perspective is where the real work happens.
          </p>
          <p className="cs-text">
            I also learned that multi-stakeholder projects require a different kind of facilitation than single-team ones. The skill is in creating enough shared context that people with very different incentives can work toward something together. That is not a technical skill. It is a people skill. And it takes time.
          </p>
          <p className="cs-text">
            The moment that stayed with me most is the mensa survey. We did not need a complicated intervention. We just asked people what they needed and listened. That alone made them feel something had changed. Sometimes the first act of service design is the simplest one: showing up and paying attention.
          </p>
        </div>

        <div className="cs-tags">
          {["Service Design", "Systems Thinking", "UX Research", "Co-design", "Stakeholder Facilitation", "Journey Mapping", "Service Blueprinting", "Mobile App Development"].map(t => (
            <span className="cs-tag" key={t}>{t}</span>
          ))}
        </div>

      </div>
    </>
  );
}