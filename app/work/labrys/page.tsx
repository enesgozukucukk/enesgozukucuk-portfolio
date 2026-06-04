export default function Labrys() {
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

        .cs-market-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--light-gray);
          border: 1px solid var(--light-gray); margin: 2rem 0;
        }
        .cs-market-item {
          background: var(--white); padding: 0.85rem 1.1rem;
          font-size: 0.82rem; color: var(--gray);
        }

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
          .cs-market-grid { grid-template-columns: repeat(2, 1fr); }
          .cs-nav { padding: 1rem 1.5rem; }
        }
      `}</style>

      <nav className="cs-nav">
        <a href="/" className="cs-nav-logo">Enes Gozukucuk</a>
        <a href="/#work" className="cs-back">Back to work</a>
      </nav>

      <div className="cs-hero">
        <div className="cs-label">Case Study 04</div>
        <h1 className="cs-title">SaaS Expansion Across 19 Markets</h1>
        <p className="cs-intro">
          Nineteen markets taught me that people make decisions differently than they think they do. Small details change outcomes. I came away with a sharper eye for what actually moves people.
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
            Labrys Consulting specialises in helping technology companies enter new markets. I joined to lead outbound business development for a SaaS client with an ambitious target: build a qualified pipeline across 19 countries within a year.
          </p>
          <p className="cs-text">
            The challenge was not just scale. Each market had different buying behaviours, different objections, different levels of software adoption, and different decision-making structures. A pitch that worked in the UK landed differently in the UAE, and differently again in Eastern Europe. Understanding those differences was the job.
          </p>
        </div>

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">My Role</h2>
          <p className="cs-text">
            I owned outbound prospecting, lead qualification, and first-stage conversations across all 19 markets. Identifying the right companies and contacts, crafting market-specific outreach, running discovery calls, and managing the CRM data that made the whole operation visible to the wider team.
          </p>
          <p className="cs-text">
            At peak volume I was generating over 70 qualified leads per day. Volume only works if the quality is there, and keeping quality high across that many contexts required constant recalibration. Every market was a new audience.
          </p>
        </div>

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">Process</h2>
          <p className="cs-text">
            The first thing I built was a market segmentation model. Not all 19 markets deserved equal effort. I mapped them by software adoption rate, competitive density, typical deal size, and ease of entry. That gave us a tiered approach: high-investment markets where we could win fast, and lower-investment markets where we tested positioning before committing resources.
          </p>
          <p className="cs-text">
            Outreach was personalised at the market level, not just the individual level. The value proposition stayed consistent but the framing, the language, the examples, and the objection handling all shifted depending on where we were selling. I built playbooks for each major market cluster and updated them as we learned.
          </p>
          <p className="cs-text">
            Something I noticed that shifted my thinking: highly ranked managers were changing their minds because of details that had nothing to do with the product. Tone. Timing. The way something was phrased. I had always assumed business decisions were rational. They are not. They are emotional decisions that get rationalised afterward. That observation changed how I wrote every outreach message from that point on.
          </p>
          <p className="cs-text">
            CRM discipline was something I took seriously when most people treat it as an afterthought. Clean data meant we could actually see what was working, where leads were dropping out, and which markets were converting. That is what made the 15% conversion improvement measurable in the first place.
          </p>
        </div>

        <div className="cs-pull">
          I had always assumed business decisions were rational. They are not. They are emotional decisions that get rationalised afterward. That single observation changed how I approached every conversation.
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">Markets</h2>
          <p className="cs-text">The 19 markets spanned three regions, each with distinct dynamics:</p>
          <div className="cs-market-grid">
            {[
              "United Kingdom", "Germany", "France", "Netherlands",
              "Spain", "Italy", "Poland", "Czech Republic",
              "Romania", "UAE", "Saudi Arabia", "Qatar",
              "Egypt", "Turkey", "South Africa", "Sweden",
              "Belgium", "Austria", "Portugal"
            ].map(m => (
              <div className="cs-market-item" key={m}>{m}</div>
            ))}
          </div>
        </div>

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">Outcomes</h2>
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

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">What I Learned</h2>
          <p className="cs-text">
            Operating across 19 markets forces a kind of systems thinking that single-market roles rarely require. You cannot be everywhere at once, so you have to build processes that work without you in the room. Documentation, playbooks, CRM discipline: these are not administrative tasks. They are what makes scale possible.
          </p>
          <p className="cs-text">
            The most lasting thing I took from this role is the understanding that context shapes decisions more than content does. The same product, the same price, the same features. But the conversation you need to have in Poland is genuinely different from the one in the UAE. Recognising that difference and adapting quickly is a skill that transfers well beyond sales.
          </p>
          <p className="cs-text">
            I also came away with what I call a not-harmful obsession about small details. The ones that seem irrelevant. They are not. They are often the thing that makes or breaks a decision. I check them now. Always.
          </p>
        </div>

        <div className="cs-tags">
          {["Market Strategy", "Business Development", "B2B Sales", "CRM Strategy", "Market Research", "Systems Thinking", "Cross-cultural Communication"].map(t => (
            <span className="cs-tag" key={t}>{t}</span>
          ))}
        </div>

      </div>
    </>
  );
}