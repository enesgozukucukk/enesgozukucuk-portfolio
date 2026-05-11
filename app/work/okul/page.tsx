export default function Okul() {
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
        <div className="cs-label">Case Study 02</div>
        <h1 className="cs-title">Growing an EdTech Brand from 15K to 55K</h1>
        <p className="cs-intro">
          I was not an experienced social media manager when I started. I just understood one thing: to build a loyal audience you first have to understand who they actually are.
        </p>
        <div className="cs-meta">
          <div className="cs-meta-item">
            <span className="cs-meta-label">Organisation</span>
            <span className="cs-meta-value">Okul.com.tr, Istanbul</span>
          </div>
          <div className="cs-meta-item">
            <span className="cs-meta-label">My Role</span>
            <span className="cs-meta-value">Social Media Manager</span>
          </div>
          <div className="cs-meta-item">
            <span className="cs-meta-label">Timeline</span>
            <span className="cs-meta-value">Aug 2021 to Aug 2022</span>
          </div>
          <div className="cs-meta-item">
            <span className="cs-meta-label">Type</span>
            <span className="cs-meta-value">Growth Strategy, Content</span>
          </div>
        </div>
      </div>

      <div className="cs-body">

        <div className="cs-section">
          <h2 className="cs-section-title">Context</h2>
          <p className="cs-text">
            Okul.com.tr is a Turkish edtech platform connecting parents and students with schools, and helping schools find the right students. When I joined as Social Media Manager, the Instagram account had 15K followers and was producing content that looked like everyone else in the education space: generic, forgettable, and not giving people a real reason to pay attention.
          </p>
          <p className="cs-text">
            The platform's audience was a specific mix: parents researching schools for their children, and students navigating the school search process. These are not casual followers. They are people in the middle of an important decision. The content had to earn their trust and keep it.
          </p>
        </div>

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">My Role</h2>
          <p className="cs-text">
            I owned the Instagram strategy end to end. Audience research, content planning, production direction, copy, publishing, and performance analysis. I managed a small team and led the creative direction.
          </p>
          <p className="cs-text">
            I came in without deep experience in social media management. What I had was a structured approach to understanding audiences and a willingness to research properly before making decisions. That turned out to be the right instinct for this kind of work.
          </p>
        </div>

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">Process</h2>
          <p className="cs-text">
            Before touching the content calendar, I ran audience persona sessions with my team. Structured brainstorming to map out who was actually following the account: their situation, their concerns, their relationship to the school search process, and what kind of content would make them stop scrolling. We ended up with distinct personas for parents and for students, each with different needs and different reasons to engage.
          </p>
          <p className="cs-text">
            Those personas shaped the content strategy directly. Rather than producing content that looked like a brand talking at its audience, we built content designed to be genuinely useful and relevant at specific moments in the decision-making process. Parents researching schools needed different things than students figuring out where they fit.
          </p>
          <p className="cs-text">
            The second shift was format. Short-form video was growing fast across the platform and the education space had not caught up yet. We moved into Reels early and built them around specific, concrete moments: school comparison tips, what to look for during a campus visit, how to read an admissions process. Practical content built around real questions the audience was already asking.
          </p>
          <p className="cs-text">
            From there it became a test and learn cycle. Engagement rate, saves, shares, and follower growth tracked weekly, not as numbers in a report but as signals about what the audience actually valued. The team believed in the direction and pushed further than the original targets.
          </p>
        </div>

        <div className="cs-pull">
          Before a single piece of content went out, we built the personas. Who is following us, what do they care about, and what would make them come back? Everything else came from answering those questions.
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">Outcomes</h2>
          <p className="cs-text">
            Over eight months the account grew from 15K to 55K followers, a 267% increase. Engagement rate improved by 40%. The Reels format drove most of the growth, with 60 videos collectively reaching over 8 million views.
          </p>
          <p className="cs-text">
            The account became a genuine resource for parents and students navigating school decisions rather than a brand channel. That shift in how the audience perceived it is what made the numbers sustainable.
          </p>
          <div className="cs-outcome-grid">
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">267%</div>
              <div className="cs-outcome-label">Follower growth for Okul.com.tr in 8 months</div>
            </div>
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">8M+</div>
              <div className="cs-outcome-label">Total Reels views across 60 videos</div>
            </div>
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">40%</div>
              <div className="cs-outcome-label">Improvement in engagement rate</div>
            </div>
          </div>
        </div>

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">What I Learned</h2>
          <p className="cs-text">
            Growth that holds starts with understanding who you are trying to reach and why they would care. The persona work we did before anything else was not a warm-up exercise. It was the foundation. Every content decision we made traced back to it.
          </p>
          <p className="cs-text">
            Catching short-form video early mattered. Platforms reward people who move with emerging formats before they become crowded. The window where Reels were growing fast but the education space had not caught up gave us a real advantage. Staying close to where things are heading is a skill worth developing deliberately.
          </p>
          <p className="cs-text">
            And I learned again what I keep learning: when people believe they can go further than the target, they usually do. The strategy mattered. Getting the team behind it mattered more.
          </p>
        </div>

        <div className="cs-tags">
          {["Growth Strategy", "Audience Personas", "Content Strategy", "Short-form Video", "Analytics", "KPI Tracking", "Team Leadership"].map(t => (
            <span className="cs-tag" key={t}>{t}</span>
          ))}
        </div>

      </div>
    </>
  );
}