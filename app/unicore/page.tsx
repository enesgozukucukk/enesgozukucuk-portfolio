export default function Unicore() {
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
          margin-bottom: 4rem; flex-wrap: wrap;
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
        .cs-text a {
          color: var(--black); text-decoration: underline;
          text-underline-offset: 3px; transition: opacity 0.2s;
        }
        .cs-text a:hover { opacity: 0.6; }

        .cs-pull {
          font-family: var(--font-serif); font-style: italic;
          font-size: 1.25rem; line-height: 1.55; color: var(--black);
          padding: 2rem 0; border-top: 1px solid var(--light-gray);
          border-bottom: 1px solid var(--light-gray); margin: 2.5rem 0;
        }

        .cs-divider { height: 1px; background: var(--light-gray); margin: 3rem 0; }

        .screenshots {
          display: grid; grid-template-columns: repeat(5, 1fr);
          gap: 1rem; margin: 2.5rem 0;
        }
        .screenshot-wrap { display: flex; flex-direction: column; gap: 0.6rem; }
        .screenshot-item {
          border-radius: 16px; overflow: hidden;
          border: 1px solid var(--light-gray);
          background: #f0f0ee;
          aspect-ratio: 9/19; position: relative;
        }
        .screenshot-label {
          font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--gray); text-align: center;
        }

        .feature-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--light-gray);
          border: 1px solid var(--light-gray); margin: 2rem 0;
        }
        .feature-item { background: var(--white); padding: 1.75rem; }
        .feature-name {
          font-size: 0.9rem; font-weight: 500; color: var(--black);
          margin-bottom: 0.4rem; letter-spacing: 0.02em;
        }
        .feature-desc { font-size: 0.82rem; color: var(--gray); line-height: 1.55; }

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

        .name-note {
          background: var(--light-gray); padding: 1rem 1.25rem;
          font-size: 0.85rem; color: #555; line-height: 1.6;
          border-left: 3px solid var(--accent); margin: 1.5rem 0;
        }

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
          .screenshots { grid-template-columns: repeat(2, 1fr); }
          .feature-grid { grid-template-columns: 1fr; }
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
        <h1 className="cs-title">Unicore: A Campus App Built from Frustration</h1>
        <p className="cs-intro">
          I got tired of watching students struggle with fragmented university systems.
          So I built a full app from scratch, knocked on doors until someone listened,
          and eventually got hired to help redesign the university around it.
        </p>
        <div className="cs-meta">
          <div className="cs-meta-item">
            <span className="cs-meta-label">Project Type</span>
            <span className="cs-meta-value">Self-initiated, Full Stack</span>
          </div>
          <div className="cs-meta-item">
            <span className="cs-meta-label">Stack</span>
            <span className="cs-meta-value">React, Node.js, TypeScript</span>
          </div>
          <div className="cs-meta-item">
            <span className="cs-meta-label">Timeline</span>
            <span className="cs-meta-value">2023 to present</span>
          </div>
          <div className="cs-meta-item">
            <span className="cs-meta-label">Status</span>
            <span className="cs-meta-value">In development with university team</span>
          </div>
        </div>
      </div>

      <div className="cs-body">

        <div className="cs-section">
          <h2 className="cs-section-title">Why I built it</h2>
          <p className="cs-text">
            When I arrived at TH Wildau and joined the Student Parliament, I started seeing the
            same friction everywhere. Students could not find basic information without clicking
            through five different systems. Events were announced in places no one checked.
            The onboarding experience for new students, especially international ones, was
            overwhelming and cold. The university had the right intentions. The systems just
            did not talk to each other, and no one had looked at the whole picture from the
            student's perspective.
          </p>
          <p className="cs-text">
            So I decided to build what I wanted to exist. Not a concept. Not a mockup.
            A working application that solved real problems for real students at TH Wildau.
          </p>
          <div className="name-note">
            A note on the name: finding a good name for an app is genuinely hard.
            Unicore is a working title. If you have a better idea, I am listening.
          </div>
        </div>

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">What it does</h2>
          <p className="cs-text">
            Unicore is a campus companion app designed specifically for TH Wildau students.
            It brings together the things that were previously scattered across the university's
            digital landscape into one place that actually makes sense to use.
          </p>
          <div className="feature-grid">
            <div className="feature-item">
              <div className="feature-name">About Campus</div>
              <div className="feature-desc">
                Concise, human-readable information about the university. The alternative
                to navigating a complicated institutional website at 11pm.
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-name">Events</div>
              <div className="feature-desc">
                All university events in one place. Students, staff, and faculty can post
                events, comment, and add them directly to their calendar.
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-name">CampusVoice</div>
              <div className="feature-desc">
                An anonymous feedback channel. Students post what they need to say.
                The university actually hears it.
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-name">Marketplace</div>
              <div className="feature-desc">
                Buy and sell items between students. Find housing. Post lost and found.
                The informal economy of campus life, made less chaotic.
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-name">Campus Charades</div>
              <div className="feature-desc">
                A charades game built around TH Wildau places, people, and culture.
                Onboarding through play. New students learn the campus by guessing it.
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-name">Extras</div>
              <div className="feature-desc">
                Student news, surveys, leaderboards, and feedback tools. The infrastructure
                for a campus community that actually participates.
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">Screenshots</h2>
          <div className="screenshots">
            {[
              { src: "/unicore/events.png", label: "Events" },
              { src: "/unicore/about.png", label: "About Campus" },
              { src: "/unicore/marketplace.png", label: "Marketplace" },
              { src: "/unicore/event-detail.png", label: "Event Detail" },
              { src: "/unicore/extras.png", label: "Extras" },
            ].map((s) => (
              <div className="screenshot-wrap" key={s.label}>
                <div className="screenshot-item">
                  <img
                    src={s.src}
                    alt={s.label}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
                <div className="screenshot-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">How it was built</h2>
          <p className="cs-text">
            I built Unicore independently, across multiple iterations. The stack is React,
            Node.js, and TypeScript. I made technical decisions based on what would let me
            ship fast and iterate quickly.
          </p>
          <p className="cs-text">
            The design process ran alongside the technical build. I was already embedded in
            the student community through the Student Parliament, which meant I had direct
            access to the people I was designing for. Every feature was shaped by conversations
            with students, not assumptions about what they needed.
          </p>
          <p className="cs-text">
            The Campus Charades feature deserves a separate mention. Onboarding at a new
            university is disorienting, especially for international students. Most onboarding
            interventions are dry and forgettable. A game built around the actual geography
            and culture of the campus sticks differently. It turns a stressful orientation
            period into something students actually want to engage with.
          </p>
        </div>

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">What happened next</h2>
          <p className="cs-text">
            When I had something working, I started presenting it. First to my faculty, then
            to the team responsible for the university's existing app. That route did not go
            anywhere. Emails went unanswered. The established path was not going to open on
            its own.
          </p>
          <p className="cs-text">
            So I knocked on other doors. I believe in disruptive technology. Even when the
            current establishment resists, innovation happens anyway. The question is just
            whether you are patient enough and persistent enough to find the people inside
            the institution who think the same way. I found them. The open-minded people with
            an appetite for change exist in every organisation. You just have to get past the
            ones who do not answer their emails.
          </p>
          <p className="cs-text">
            Eventually the right conversations happened. I was offered a position as Student
            Assistant to help{" "}
            <a href="/work/th-wildau">redesign the university as a student-centred service</a>,
            with Unicore as part of the foundation. The app is now in active development in
            collaboration with the university's app development team.
          </p>
        </div>

        <div className="cs-pull">
          I was not waiting for someone to commission this. I saw the problem, built the solution,
          and kept knocking until someone opened the door. That is the only way I know how to work.
        </div>

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">Outcomes</h2>
          <div className="cs-outcome-grid">
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">6</div>
              <div className="cs-outcome-label">Core features built and working independently</div>
            </div>
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">1</div>
              <div className="cs-outcome-label">Role created at the university off the back of the work</div>
            </div>
            <div className="cs-outcome-item">
              <div className="cs-outcome-number">1</div>
              <div className="cs-outcome-label">App in active development with the university team</div>
            </div>
          </div>
        </div>

        <div className="cs-divider" />

        <div className="cs-section">
          <h2 className="cs-section-title">What I learned</h2>
          <p className="cs-text">
            Building something nobody asked you to build is a different kind of discipline.
            There is no brief, no deadline, no one checking your progress. The only thing
            that keeps you going is whether you actually believe the problem is worth solving.
            I did. That belief is what got it finished.
          </p>
          <p className="cs-text">
            Navigating institutional resistance was not the hard part for me. I am not primarily
            a technical person. Talking to people, reading rooms, finding the right angle to
            make someone see what you see... That comes naturally. The harder lesson was about
            patience. Real change inside an institution moves slowly, and the people who resist
            it are not always wrong. Sometimes they are protecting things that matter. Understanding
            that made me a better advocate for the things I was trying to change.
          </p>
          <p className="cs-text">
            The gap between a side project and something that matters is almost always just
            one thing: the willingness to keep going after the first door closes.
          </p>
        </div>

        <div className="cs-tags">
          {[
            "React", "Node.js", "TypeScript", "Product Design",
            "Full Stack Development", "User Research", "Gamification", "Community Design"
          ].map(t => (
            <span className="cs-tag" key={t}>{t}</span>
          ))}
        </div>

      </div>
    </>
  );
}