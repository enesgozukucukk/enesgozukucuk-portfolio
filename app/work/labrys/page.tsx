"use client";

export default function Labrys() {
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
        .cs-market-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--light-gray);
          border: 1px solid var(--light-gray); margin: 2.5rem 0;
        }
        .cs-market-item {
          background: var(--white); padding: 1rem 1.25rem;
          font-size: 0.8rem; color: var(--gray);
        }
        .cs-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--light-gray); }
        .cs-tag { font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid var(--light-gray); padding: 0.35rem 0.75rem; color: var(--gray); }
        @media (max-width: 768px) {
          .cs-hero { padding: 8rem 1.5rem 3rem; }
          .cs-body { padding: 0 1.5rem 5rem; }
          .cs-outcome-grid { grid-template-columns: 1fr; }
          .cs-market-grid { grid-template-columns: repeat(2, 1fr); }
          .cs-nav { padding: 1rem 1.5rem; }
        }
      `}</style>

      <nav className="cs-nav">
        <a href="/" className="cs-nav-logo">EG</a>
        <a href="/#work" className="cs-back">Back to work</a>
      </nav>

      <div className="cs-hero">
        <div className="cs-label">Case Study 03</div>
        <h1 className="cs-title">SaaS Expansion Across 19 Markets</h1>
        <p className="cs-intro">
          Selling software in one market is hard enough. Selling it in nineteen, simultaneously, requires a different kind of thinking. At Labrys Consulting, I led the business development effort for a SaaS client expanding across Europe, the Middle East, and beyond.
        </p>
        <div className="cs-meta">
          <div className="cs-meta-item">
            <span className="cs-meta-label">Organisation</span>
            <span className="cs-meta-value">Labrys Consulting, Istanbul</span>
          </div>
          <div className="cs-meta-item">
            <span className="cs-meta-label">My Role</span>
            <span className="cs-meta-value">Business Development Specialist</span>
          </div>
          <div className="cs-meta-item">
            <span className="cs-meta-label">Timeline</span>
            <span className="cs-meta-value">Sep 2022 to Sep 2023</span>
          </div>
          <div className="cs-meta-item">
            <span className="cs-meta-label">Type</span>
            <span className="cs-meta-value">Market Strategy, B2B Sales</span>
          </div>
        </div>
      </div>

      <div className="cs-body">

        <div className="cs-section">
          <h2 className="cs-section-title">Context</h2>
          <p className="cs-text">
            Labrys Consulting specialises in helping technology companies enter new markets. I joined to lead the outbound business development for a SaaS client with an ambitious target: generate a qualified pipeline across 19 countries within a year.
          </p>
          <p className="cs-text">
            The challenge was not just scale. Each market had different buying behaviours, different objections, different levels of software maturity, and different decision-making structures. A pitch that worked in the UK landed differently in the UAE, and differently again in Eastern Europe.
          </p>
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">My Role</h2>
          <p className="cs-text">
            I owned outbound prospecting, qualification, and first-stage conversations across all 19 markets. That meant identifying the right companies and contacts, crafting market-specific outreach, running discovery calls, and managing the CRM data that made the whole operation legible to the wider team.
          </p>
          <p className="cs-text">
            The role was high volume by necessity. At peak I was generating 70 or more qualified leads per day. But volume only works if the quality is there, and keeping quality up across that many contexts required constant recalibration.
          </p>
        </div>

        <div className="cs-visual-placeholder">[ Add a market map or outreach framework visual ]</div>
        <p className="cs-visual-caption">Market prioritisation framework used to allocate outreach effort across regions</p>

        <div className="cs-section">
          <h2 className="cs-section-title">Process</h2>
          <p className="cs-text">
            The first thing I did was build a market segmentation model. Not all 19 markets deserved equal effort. I mapped them by software adoption rate, competitive density, typical deal size, and ease of entry. That gave us a tiered approach: high-investment markets where we could win fast, and lower-investment markets where we tested positioning before committing resources.
          </p>
          <p className="cs-text">
            Outreach was personalised at the market level, not just the individual level. The value proposition stayed consistent but the framing, the language, the examples, and the objection handling all shifted depending on where we were selling. I built playbooks for each major market cluster and updated them as we learned.
          </p>
          <p className="cs-text">
            CRM hygiene was something I took seriously when most people treat it as an afterthought. Clean data meant we could actually see what was working, where leads were dropping out, and which markets were converting at what rate. That made the 15% conversion improvement possible because we could measure it in the first place.
          </p>
        </div>

        <div className="cs-pullquote">
          The markets that performed best were not the ones where the product fit was strongest. They were the ones where we understood the buyer best.
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">Markets</h2>
          <p className="cs-text">The 19 markets spanned three broad regions, each with distinct dynamics:</p>
          <div className="cs-market-grid">
            {["United Kingdom","Germany","France","Netherlands","Spain","Italy","Poland","Czech Republic","Romania","UAE","Saudi Arabia","Qatar","Egypt","Turkey","South Africa","Sweden","Belgium","Austria","Portugal"].map(m => (
              <div className="cs-market-item" key={m}>{m}</div>
            ))}
          </div>
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">Outcomes</h2>
          <p className="cs-text">
            Over the course of the year, the outreach operation generated a consistent pipeline across all 19 markets. Conversion efficiency improved by 15% through better CRM processes and more targeted qualification criteria. At peak volume, we were generating over 70 qualified leads per day.
          </p>
          <div className="cs-outcome-grid">
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">19</div>
              <div className="cs-outcome-label">Markets with active qualified pipeline</div>
            </div>
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">70+</div>
              <div className="cs-outcome-label">Qualified leads generated daily at peak</div>
            </div>
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">15%</div>
              <div className="cs-outcome-label">Improvement in conversion efficiency via CRM</div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">What I Learned</h2>
          <p className="cs-text">
            Operating across 19 markets simultaneously forces a kind of systems thinking that single-market roles rarely require. You cannot be everywhere at once, so you have to build processes that work without you in the room. Documentation, playbooks, CRM discipline — these are not administrative tasks, they are what makes scale possible.
          </p>
          <p className="cs-text">
            I also came away with a strong intuition for how market context shapes buyer behaviour. The same product, the same price, the same feature set — but the conversation you need to have in Poland is genuinely different from the one in the UAE. Recognising that difference and adapting quickly is a skill that transfers well beyond sales.
          </p>
        </div>

        <div className="cs-tags">
          {["Market Strategy", "Business Development", "B2B Sales", "CRM Strategy", "Market Research", "Cross-cultural Communication", "Systems Thinking"].map(t => (
            <span className="cs-tag" key={t}>{t}</span>
          ))}
        </div>

      </div>
    </>
  );
}