"use client";

export default function Okul() {
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
        .cs-label::before { content: ''; width: 20px; height: 1px; background: var(--gray); }
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
          margin-bottom: 5rem; flex-wrap: wrap;
        }
        .cs-meta-item { display: flex; flex-direction: column; gap: 0.35rem; }
        .cs-meta-label { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray); }
        .cs-meta-value { font-size: 0.9rem; color: var(--black); font-weight: 500; }
        .cs-body { max-width: 800px; margin: 0 auto; padding: 0 3rem 8rem; }
        .cs-section { margin-bottom: 5rem; }
        .cs-section-title { font-family: var(--font-serif); font-size: 1.6rem; margin-bottom: 1.25rem; color: var(--black); }
        .cs-text { font-size: 1rem; line-height: 1.85; color: #444; margin-bottom: 1.25rem; }
        .cs-visual-placeholder {
          width: 100%; aspect-ratio: 16/9; background: var(--light-gray);
          display: flex; align-items: center; justify-content: center;
          margin: 2.5rem 0; border-radius: 2px;
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gray);
        }
        .cs-visual-caption { font-size: 0.8rem; color: var(--gray); margin-top: -1.5rem; margin-bottom: 2.5rem; font-style: italic; }
        .cs-outcome-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--light-gray);
          border: 1px solid var(--light-gray); margin: 2.5rem 0;
        }
        .cs-outcome-item { background: var(--white); padding: 2rem; }
        .cs-outcome-number { font-family: var(--font-display); font-size: 2.5rem; line-height: 1; color: var(--black); margin-bottom: 0.5rem; }
        .cs-outcome-label { font-size: 0.85rem; color: var(--gray); line-height: 1.5; }
        .cs-pullquote {
          font-family: var(--font-serif); font-style: italic;
          font-size: 1.4rem; line-height: 1.5; color: var(--black);
          padding: 2rem 0; border-top: 1px solid var(--light-gray);
          border-bottom: 1px solid var(--light-gray); margin: 3rem 0;
        }
        .cs-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--light-gray); }
        .cs-tag { font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid var(--light-gray); padding: 0.35rem 0.75rem; color: var(--gray); }
        @media (max-width: 768px) {
          .cs-hero { padding: 8rem 1.5rem 3rem; }
          .cs-body { padding: 0 1.5rem 5rem; }
          .cs-outcome-grid { grid-template-columns: 1fr; }
          .cs-nav { padding: 1rem 1.5rem; }
        }
      `}</style>

      <nav className="cs-nav">
        <a href="/" className="cs-nav-logo">EG</a>
        <a href="/#work" className="cs-back">Back to work</a>
      </nav>

      <div className="cs-hero">
        <div className="cs-label">Case Study 02</div>
        <h1 className="cs-title">Growing an EdTech Brand from 15K to 55K</h1>
        <p className="cs-intro">
          Okul.com.tr needed more than more posts. They needed a content strategy built around how their audience actually thought about learning. In eight months, Instagram went from 15K to 55K followers, with 8 million views across 60 Reels.
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
            Okul.com.tr is a Turkish edtech platform connecting students with tutors and online courses. When I joined as Social Media Manager, the Instagram account had 15K followers and was producing content that looked like everyone else in the education space: motivational quotes, exam tips, generic study advice.
          </p>
          <p className="cs-text">
            The audience was there. The potential was there. But the content was not giving people a reason to pay attention, share, or come back.
          </p>
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">My Role</h2>
          <p className="cs-text">
            I owned the Instagram strategy end to end. That meant audience research, content planning, production direction, copy, publishing, and performance analysis. I worked with a small cross-functional team but the strategy and creative decisions were mine to lead.
          </p>
          <p className="cs-text">
            The brief was simple: grow the account and make it matter to students. The how was entirely open.
          </p>
        </div>

        <div className="cs-visual-placeholder">[ Add content examples or growth chart here ]</div>
        <p className="cs-visual-caption">Content format experiments across the first three months</p>

        <div className="cs-section">
          <h2 className="cs-section-title">Process</h2>
          <p className="cs-text">
            I started by spending time with the audience rather than the content. What were students actually anxious about? What did they search for at 11pm before an exam? What made them send something to a friend? The answers shaped everything that came after.
          </p>
          <p className="cs-text">
            The first big shift was format. Short-form video was growing fast and the education space had not caught up. We started producing Reels built around specific, useful moments: a concept explained in 60 seconds, a study method demonstrated, a mistake students commonly make laid out plainly. Useful beats inspirational every time.
          </p>
          <p className="cs-text">
            From there it became a test and learn cycle. Every week we looked at what worked, why it worked, and what to do more of. Engagement rate, saves, shares, and follower growth were all tracked. Not just as numbers but as signals about what the audience actually valued.
          </p>
        </div>

        <div className="cs-pullquote">
          Useful beats inspirational every time. The content that performed was content that solved something real.
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">Outcomes</h2>
          <p className="cs-text">
            Over eight months the account grew from 15K to 55K followers, a 267% increase. Engagement rate improved by 40%. The Reels format drove most of the growth, with 60 videos collectively reaching 8 million views.
          </p>
          <p className="cs-text">
            More importantly, the account became a genuine resource for students rather than a brand channel. That shift in how the audience perceived it is what made the numbers sustainable.
          </p>
          <div className="cs-outcome-grid">
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">267%</div>
              <div className="cs-outcome-label">Follower growth in 8 months, 15K to 55K</div>
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

        <div className="cs-section">
          <h2 className="cs-section-title">What I Learned</h2>
          <p className="cs-text">
            Growth strategies that work are almost always built on genuine audience understanding, not platform tricks. The accounts that grew fast and then stalled were optimising for the algorithm. The ones that kept growing were optimising for the person.
          </p>
          <p className="cs-text">
            I also learned to trust the data without being captured by it. Numbers tell you what happened. They do not always tell you why, or what to do next. That judgment still has to come from somewhere.
          </p>
        </div>

        <div className="cs-tags">
          {["Growth Strategy", "Content Strategy", "Audience Research", "Short-form Video", "Analytics", "KPI Tracking", "Product Thinking"].map(t => (
            <span className="cs-tag" key={t}>{t}</span>
          ))}
        </div>

      </div>
    </>
  );
}