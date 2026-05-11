export default function About() {
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

        .about-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 3rem; background: var(--white);
          border-bottom: 1px solid var(--light-gray);
        }
        .about-nav-logo {
          font-family: var(--font-display); font-size: 1rem;
          letter-spacing: 0.12em; color: var(--black); text-decoration: none;
        }
        .about-nav-back {
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--gray); text-decoration: none; transition: color 0.2s;
        }
        .about-nav-back:hover { color: var(--black); }

        .about-hero {
          padding: 9rem 3rem 5rem;
          max-width: 780px; margin: 0 auto;
        }
        .about-label {
          font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .about-label::before { content: ''; width: 20px; height: 1px; background: var(--gray); }
        .about-title {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          line-height: 1.1; margin-bottom: 2rem; color: var(--black);
        }
        .about-intro {
          font-size: 1.2rem; line-height: 1.75; color: #444;
          border-left: 3px solid var(--accent); padding-left: 1.5rem;
          margin-bottom: 4rem; font-family: var(--font-serif); font-style: italic;
        }

        .about-body {
          max-width: 780px; margin: 0 auto;
          padding: 0 3rem 6rem;
        }
        .about-chapter {
          margin-bottom: 4rem;
        }
        .about-chapter-label {
          font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 1.25rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .about-chapter-label::before { content: ''; width: 14px; height: 1px; background: var(--gray); }
        .about-chapter-title {
          font-family: var(--font-serif); font-size: 1.5rem;
          color: var(--black); margin-bottom: 1.25rem; line-height: 1.25;
        }
        .about-p {
          font-size: 1rem; line-height: 1.85; color: #444;
          margin-bottom: 1.25rem;
        }
        .about-p strong { color: var(--black); font-weight: 500; }

        .about-pull {
          font-family: var(--font-serif); font-style: italic;
          font-size: 1.25rem; line-height: 1.55; color: var(--black);
          padding: 2rem 0; border-top: 1px solid var(--light-gray);
          border-bottom: 1px solid var(--light-gray); margin: 2.5rem 0;
        }

        .about-divider {
          height: 1px; background: var(--light-gray); margin: 3rem 0;
        }

        .about-footer-strip {
          background: var(--black); padding: 4rem 3rem;
          display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;
        }
        .about-footer-title {
          font-family: var(--font-serif); font-size: 1.6rem;
          color: var(--white); margin-bottom: 1rem; line-height: 1.2;
        }
        .about-footer-sub { font-size: 0.9rem; color: #888; line-height: 1.7; }
        .about-footer-links { display: flex; flex-direction: column; gap: 1rem; justify-content: center; }
        .about-footer-link {
          display: inline-block; color: var(--white);
          font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase;
          text-decoration: none; border: 1px solid #333; padding: 0.85rem 1.75rem;
          transition: border-color 0.2s, color 0.2s; width: fit-content;
        }
        .about-footer-link:hover { border-color: var(--accent); color: var(--accent); }

        @media (max-width: 768px) {
          .about-hero { padding: 7rem 1.5rem 3rem; }
          .about-body { padding: 0 1.5rem 4rem; }
          .about-nav { padding: 1rem 1.5rem; }
          .about-footer-strip { grid-template-columns: 1fr; padding: 3rem 1.5rem; }
        }
      `}</style>

      <nav className="about-nav">
        <a href="/" className="about-nav-logo">Enes Gozukucuk</a>
        <a href="/" className="about-nav-back">Back to portfolio</a>
      </nav>

      <div className="about-hero">
        <div className="about-label">About</div>
        <h1 className="about-title">I grew up wondering why the city was not built by the sea.</h1>
        <p className="about-intro">
          I still walk into every room asking the same question. What is broken here, and how could it be better?
        </p>
      </div>

      <div className="about-body">

        <div className="about-chapter">
          <div className="about-chapter-label">Where it started</div>
          <h2 className="about-chapter-title">Adana, a question, and a habit that never left</h2>
          <p className="about-p">
            I grew up in Adana, a city in southern Turkey with no access to the sea. As a kid I used to ask my father: why did they not build it by the coast? It would have been so much better. He never had a full answer. I never stopped asking.
          </p>
          <p className="about-p">
            That habit, walking into a place and immediately seeing what could be smoother, what friction could be removed, what was designed without really thinking about the person using it, has followed me everywhere.
          </p>
          <p className="about-p">
            My father worked in the public sector. He was the one who first showed me that companies have names, logos, stories, structures. I would ask him questions about them on the way to school. I learned early that I could explain things to people and make them see what I was seeing. I liked being in front of a crowd. I liked the moment when something clicked for someone.
          </p>
        </div>

        <div className="about-divider" />

        <div className="about-chapter">
          <div className="about-chapter-label">Education</div>
          <h2 className="about-chapter-title">Bogazici University and the art of standing in between</h2>
          <p className="about-p">
            There is a saying in Turkey: if Real Madrid offers you a contract, you sign. If Bogazici offers you a place, you go. I was in the first 5000 students in the national university entrance exam, and Bogazici was possible. I went.
          </p>
          <p className="about-p">
            I studied Management Information Systems. The choice was deliberate: I wanted to be in the middle of technology, coding, communication, and management. MIS taught me something no single course ever could. How to stand between technical people and business people and make them actually understand each other. How to look at a system and see not just what it does, but what it could do. How to balance and enable people to work together in the best possible way.
          </p>
        </div>

        <div className="about-divider" />

        <div className="about-chapter">
          <div className="about-chapter-label">Early career</div>
          <h2 className="about-chapter-title">Three jobs. Three different lessons about people.</h2>

          <p className="about-p">
            At Yemeksepeti I handled over 400 customer interactions a day in a call centre. I learned something there that has shaped everything since. When you listen to people in a certain way, when they feel genuinely heard, they stop being aggressive and show you their real problem. Hungry people are angry people. Listened-to people are honest people.
          </p>

          <div className="about-pull">
            When you listen to people in a certain way, they stop being aggressive and show you their real problem.
          </div>

          <p className="about-p">
            At Okul.com.tr I grew an Instagram audience from 15K to 55K in eight months. I was not an experienced social media manager when I started. I just did the research, talked to the people who knew, understood what authentic content actually meant, and then made my team believe we could go further than the goal anyone had set. The rest followed.
          </p>
          <p className="about-p">
            At Labrys Consulting I worked across 19 international markets and discovered something that broke my model of the world. I had always thought people were rational decision makers who maximised their own interests. While some are, I was surprised to see highly ranked managers change their minds because of details no one would ever think mattered. Small things. Tone. Timing. A word choice in an email. I came away with a not-harmful obsession about small details. I am doing okay.
          </p>
        </div>

        <div className="about-divider" />

        <div className="about-chapter">
          <div className="about-chapter-label">Berlin and TH Wildau</div>
          <h2 className="about-chapter-title">What happens when a student decides to fix the university</h2>
          <p className="about-p">
            Bogazici has an organic connection with Berlin. Graduates come here, build things here, leave their knowledge here. I always wanted to spend part of my life in this city. I arrived for a Masters in European Business Management at TH Wildau and became active almost immediately.
          </p>
          <p className="about-p">
            A few months in, I ran for Student Parliament and got the fourth most votes in the election. I was responsible for the anti-discrimination committee, focused on international students and their needs. That work made me see the frictions of the university up close. So I built something: a mobile app called Unicore, designed to fix real problems for students. Social life, buying and selling, accommodation, events, onboarding. When I presented it across the university, something unexpected happened. I was asked to become a Student Assistant, helping to redesign the university itself as a student-centred service.
          </p>
          <p className="about-p">
            Now I build bridges between students and administration. I run workshops and surveys, create student clubs, and help shape the direction of the university as a service. The most surprising thing I discovered along the way is how slow institutional change has to be. As someone with a fast-paced business background, I was shocked at first. But it taught me something important: understand the needs before you reach for solutions. Never impose from above.
          </p>

          <div className="about-pull">
            Once, after a simple survey at the mensa, students told me they were genuinely happy just to be asked. Just to feel included. That moment stayed with me.
          </div>
        </div>

        <div className="about-divider" />

        <div className="about-chapter">
          <div className="about-chapter-label">Who I am</div>
          <h2 className="about-chapter-title">A few honest things</h2>
          <p className="about-p">
            My closest friends would describe me as communicative, caring, and someone who speaks his mind. When I am stuck on a hard problem I call my mother or father. They approach things differently from each other and from me. They rarely give me the right answer. They always make me look the other way.
          </p>
          <p className="about-p">
            I am bad at drawing. Everything else I figure out.
          </p>
          <p className="about-p">
            The persona tool I built came out of a real problem. In a service design class at TH Wildau, students created a persona called Lukas to understand how the university felt from a student's perspective. I researched every persona tool I could find. They were all built for marketing teams. None of them let you talk to the persona. So I built one that does.
          </p>
        </div>

      </div>

      <div className="about-footer-strip">
       
          
        <div className="about-footer-links">
          <a href="mailto:enesgozukucuk@gmail.com" className="about-footer-link">Send me an email</a>
          <a href="https://linkedin.com/in/enesgozukucuk" target="_blank" rel="noopener noreferrer" className="about-footer-link">Connect on LinkedIn</a>
          <a href="/#work" className="about-footer-link">View my work</a>
        </div>
      </div>
    </>
  );
}