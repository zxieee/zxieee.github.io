// "A bit about me" — sits between Work and Shelf.
//
// Layout: left rail carries just the section label. Right column opens with
// a flex row: the "Hi, I'm Angela" lead on the left, a round portrait on the
// right. The rest of the copy (detective line, principles, outro) flows
// below that row at full column width.
function About() {
  const principles = [
  {
    lead: 'Make the invisible legible.',
    body: "I gravitate toward fuzzy spaces — turning vague ambitions into strategy, roadmap, or just shared language. Some of my proudest work was never on anyone's roadmap."
  },
  {
    lead: 'Ship systems, not just pixels.',
    body: 'I zoom out and build frameworks that scale — things that keep working after I move on.'
  },
  {
    lead: 'Craft, craft, craft!',
    body: "Pixels, words, micro-interactions, the way a flow feels — that's where trust gets built or lost. I don't ship things I wouldn't want to use myself."
  },
  {
    lead: 'Move fast, stay sharp.',
    body: "Speed without craft is just a mess. I'll pick up whatever tool gets me there fastest — Figma, Cursor, AI coding tools, a whiteboard — I don't really care."
  },
  {
    lead: 'Design is a team sport.',
    body: 'I build real relationships with people I work with — the best work came out of partnerships built long before the project started.'
  }];


  return (
    <section className="about-section" id="about-me">
      <div className="about-layout">
        <aside className="about-rail">
          <div className="nav-section">A BIT ABOUT ME</div>
        </aside>

        <div className="about-content">
          <div className="about-intro-row">
            <p className="about-lead">
              Hi, I'm Angela — <em>product designer at Meta</em>, 7 years in. I've worked across AI, monetization, commerce, and social experiences across some of the biggest consumer apps in the world.
            </p>
            <figure className="about-portrait">
              <img src="assets/angela-portrait.png" alt="Angela Xie, smiling beneath a pink flowering tree" draggable="false" />
            </figure>
          </div>
          <p className="about-lead about-lead-soft" style={{ fontSize: "15px" }}>
            Looks tidy on paper, but my actual process is closer to a <span className="about-emoji" aria-hidden="true" style={{ fontSize: "15px" }}>🕵️</span> detective: gather every scrap, look for the pattern, rearrange the theory until it fits.
          </p>

          <h3 className="about-principles-label" style={{ fontSize: "22px" }}>Things I Care Deeply About</h3>
          <ol className="about-principles" style={{ gap: "4px" }}>
            {principles.map((p, i) =>
            <li key={i}>
                <div className="ap-body">
                  <strong className="ap-lead">{p.lead}</strong>
                  <span className="ap-text"> {p.body}</span>
                </div>
              </li>
            )}
          </ol>

          <p className="about-outro">
            Bay Area. CMU HCI alum. Always hoarding and rearranging something — plants, rooms, systems, ideas.
          </p>
        </div>
      </div>
    </section>);

}

window.About = About;