export default function Tools() {
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

        .tools-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 3rem; background: var(--white);
          border-bottom: 1px solid var(--light-gray);
        }
        .tools-nav-logo {
          font-family: var(--font-display); font-size: 1rem;
          letter-spacing: 0.12em; color: var(--black); text-decoration: none;
        }
        .tools-nav-back {
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--gray); text-decoration: none; transition: color 0.2s;
        }
        .tools-nav-back:hover { color: var(--black); }

        .tools-hero {
          padding: 9rem 3rem 4rem; max-width: 860px; margin: 0 auto;
        }
        .tools-label {
          font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .tools-label::before { content: ''; width: 20px; height: 1px; background: var(--gray); }
        .tools-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.1; margin-bottom: 1rem; color: var(--black);
        }
        .tools-sub {
          font-size: 1rem; line-height: 1.75; color: #555; max-width: 580px;
          margin-bottom: 0;
        }

        .tools-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: var(--light-gray);
          border: 1px solid var(--light-gray);
          margin: 3rem 3rem 6rem;
        }
        .tool-card {
          background: var(--white); padding: 3rem;
          text-decoration: none; color: inherit;
          display: flex; flex-direction: column;
          transition: background 0.3s; position: relative; overflow: hidden;
        }
        .tool-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; background: var(--accent);
          transform: scaleX(0); transition: transform 0.3s; transform-origin: left;
        }
        .tool-card:hover { background: var(--black); }
        .tool-card:hover .tool-card-title,
        .tool-card:hover .tool-card-desc,
        .tool-card:hover .tool-card-detail { color: var(--white); }
        .tool-card:hover .tool-card-tag { color: #555; border-color: #333; }
        .tool-card:hover .tool-card-cta { color: var(--accent); }
        .tool-card:hover::after { transform: scaleX(1); }

        .tool-card-label {
          font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 0.6rem;
        }
        .tool-card-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); flex-shrink: 0;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .tool-card-title {
          font-family: var(--font-serif); font-size: 1.75rem;
          line-height: 1.15; margin-bottom: 1rem; color: var(--black);
          transition: color 0.3s;
        }
        .tool-card-desc {
          font-size: 0.9rem; line-height: 1.75; color: #555;
          margin-bottom: 1.5rem; flex: 1; transition: color 0.3s;
        }
        .tool-card-detail {
          font-size: 0.82rem; line-height: 1.65; color: var(--gray);
          margin-bottom: 2rem; padding-top: 1.25rem;
          border-top: 1px solid var(--light-gray); transition: color 0.3s;
        }
        .tool-card-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 2rem; }
        .tool-card-tag {
          font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid var(--light-gray); padding: 0.2rem 0.55rem;
          color: var(--gray); transition: color 0.3s, border-color 0.3s;
        }
        .tool-card-cta {
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--black); font-weight: 500; transition: color 0.3s;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .tool-card-cta::after { content: '→'; }

        @media (max-width: 768px) {
          .tools-hero { padding: 7rem 1.5rem 3rem; }
          .tools-grid { grid-template-columns: 1fr; margin: 2rem 1.5rem 4rem; }
          .tools-nav { padding: 1rem 1.5rem; }
          .tool-card { padding: 2rem; }
        }
      `}</style>

      <nav className="tools-nav">
        <a href="/" className="tools-nav-logo">Enes Gozukucuk</a>
        <a href="/" className="tools-nav-back">Back to portfolio</a>
      </nav>

      <div className="tools-hero">
        <div className="tools-label">Service Design Tools</div>
        <h1 className="tools-title">AI tools built for design practitioners</h1>
        <p className="tools-sub">
          Most persona tools are built for marketing teams. These are built for service designers,
          researchers, and anyone who needs to understand people at a deeper level.
          Both tools are live and free to use.
        </p>
      </div>

      <div className="tools-grid">
        <a href="/tool" className="tool-card">
          <div className="tool-card-label">
            <div className="tool-card-dot" />
            Tool 01
          </div>
          <h2 className="tool-card-title">AI Persona Builder</h2>
          <p className="tool-card-desc">
            An adaptive interview tool that generates research-quality personas. It asks
            follow-up questions based on what you share, goes three levels deep, and produces
            a persona you can have a real conversation with.
          </p>
          <p className="tool-card-detail">
            Pick your domain and persona type. Answer a set of tailored questions. The tool
            synthesises your answers into a full persona card with goals, frustrations,
            motivations, fears, a design insight, and a personality profile. Then you can
            interview the persona directly.
          </p>
          <div className="tool-card-tags">
            <span className="tool-card-tag">Education</span>
            <span className="tool-card-tag">Healthcare</span>
            <span className="tool-card-tag">Fintech</span>
            <span className="tool-card-tag">Retail</span>
            <span className="tool-card-tag">Public Services</span>
            <span className="tool-card-tag">B2B</span>
            <span className="tool-card-tag">Mobility</span>
          </div>
          <div className="tool-card-cta">Try the Persona Builder</div>
        </a>

        <a href="/lukas" className="tool-card">
          <div className="tool-card-label">
            <div className="tool-card-dot" />
            Tool 02
          </div>
          <h2 className="tool-card-title">Interview Lukas</h2>
          <p className="tool-card-desc">
            Lukas is a student persona developed by students in the Service Design class
            at TH Wildau. He was built to help university stakeholders understand what
            student life actually feels like from the inside. Anyone can interview him directly.
          </p>
          <p className="tool-card-detail">
            The persona was created through real research: workshops, surveys, and co-design
            sessions with students. That research was structured into a detailed system prompt
            that grounds the AI agent in real student data, so Lukas responds the way a real
            student would, in German, with a realistic voice. University departments use him
            in workshops to test ideas against the student perspective before making decisions.
          </p>
          <div className="tool-card-tags">
            <span className="tool-card-tag">German</span>
            <span className="tool-card-tag">Voice Enabled</span>
            <span className="tool-card-tag">TH Wildau</span>
            <span className="tool-card-tag">Student Persona</span>
            <span className="tool-card-tag">Workshop Ready</span>
          </div>
          <div className="tool-card-cta">Interview Lukas</div>
        </a>
      </div>
    </>
  );
}