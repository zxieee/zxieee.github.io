// "A bit about me" — merged section combining the old About + Shelf into a
// single five-tab IA. Left rail = sub-section list. Right pane = active tab.
//
//   01  Who I am             → bio lead + portrait + detective line + closer
//   02  What I care about    → principles list
//   03  Books I read         → ShelfGrid w/ books
//   04  Games I (binge) played → ShelfGrid w/ games
//   05  Places I sketched    → ShelfGrid w/ sketchbook entries
//
// Grid contents reuse SHELF_TABS / ShelfGrid / BookCard / SketchCard from
// shelf.jsx (exposed on window). The about/shelf source files are kept
// intact for easy revert — only this component is wired into app.jsx now.

const PRINCIPLES = [
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
  body: "I don't ship things I wouldn't want to use myself. Pixels, words, micro-interactions, the way a flow feels — that's where trust gets built or lost. "
},
{
  lead: 'Move fast, stay sharp.',
  body: "I pick up whatever tool gets me there fastest — Figma, Cursor, AI coding tools, a whiteboard — I don't really care. "
},
{
  lead: 'Design is a team sport.',
  body: 'I build real relationships with people I work with — the best work came out of partnerships built long before the project started.'
}];


const BIO_TABS = [
{ key: 'who', label: 'Who I am', labelShort: 'Me' },
{ key: 'care', label: 'What I care about', labelShort: 'Values' },
{ key: 'books', label: 'Books I read', labelShort: 'Books' },
{ key: 'games', label: 'Games I (binge) played', labelShort: 'Games' },
{ key: 'sketches', label: 'Things I painted', labelShort: 'Art' }];


// Paintings/sketches gallery — real artwork. Mix of watercolor (planets, nature)
// and digital paintings. Each entry's aspect is preserved via CSS columns so
// the layout feels like an art wall, not a uniform grid.
const PAINTINGS = [
// Digital paintings — listed first per user preference
{ src: 'assets/sketches/stardust.jpg', title: 'Things on your mind', meta: 'digital' },
{ src: 'assets/sketches/cosmos.jpg', title: 'Falling', meta: 'digital' },
{ src: 'assets/sketches/liquid-hand.jpg', title: 'Liquid Light', meta: 'digital' },
{ src: 'assets/sketches/marsh.jpg', title: 'Sparkles', meta: 'digital' },
{ src: 'assets/sketches/water.jpg', title: 'Marshlands', meta: 'digital' },
// Watercolor — Solar System series
{ src: 'assets/sketches/01-mercury.jpg', title: 'Mercury', meta: 'watercolor' },
{ src: 'assets/sketches/02-venus.jpg', title: 'Venus', meta: 'watercolor' },
{ src: 'assets/sketches/03-earth.jpg', title: 'Earth', meta: 'watercolor' },
{ src: 'assets/sketches/04-mars.jpg', title: 'Mars', meta: 'watercolor' },
{ src: 'assets/sketches/05-jupiter.jpg', title: 'Jupiter', meta: 'watercolor' },
{ src: 'assets/sketches/06-saturn.jpg', title: 'Saturn', meta: 'watercolor' },
{ src: 'assets/sketches/07-uranus.jpg', title: 'Uranus', meta: 'watercolor' },
{ src: 'assets/sketches/08-neptune.jpg', title: 'Neptune', meta: 'watercolor' },
{ src: 'assets/sketches/09-pluto.jpg', title: 'Pluto', meta: 'watercolor' },
// Watercolor — nature & figure
{ src: 'assets/sketches/moth.jpg', title: 'Emperor Moth', meta: 'watercolor' },
{ src: 'assets/sketches/mushroom.jpg', title: 'Red Cap', meta: 'watercolor' },
{ src: 'assets/sketches/lotus.jpg', title: 'Lotus Pond', meta: 'watercolor' },
{ src: 'assets/sketches/sunset.jpg', title: 'Sunset Tide', meta: 'watercolor' },
{ src: 'assets/sketches/embrace.jpg', title: 'Embrace', meta: 'watercolor' }];



// ----- Tab 01 content -----
function WhoIAm() {
  return (
    <div className="bio-pane bio-pane-who">
      <div className="who-portrait-block">
        <figure className="about-portrait who-portrait">
          <img src="assets/angela-portrait.png" alt="Angela Xie, smiling beneath a pink flowering tree" draggable="false" style={{ width: "246px" }} />
        </figure>
      </div>
      <div className="who-text" style={{ gap: "18px" }}>
        <p className="about-lead" style={{ fontWeight: "700" }}>
          A Bay Area-based designer — the kind who can <span className="about-accent">lead the strategy</span>, <span className="about-accent">build the system</span>, and still <span className="about-accent">sweat the pixels</span>.
        </p>
        <p className="about-lead about-lead-soft" style={{ fontSize: '15px', marginBottom: '2px' }}>Over the past 7 years, I've worked on monetization, commerce, and social experiences at Facebook, Messenger, Instagram, and Google. <a href="assets/AX-Resume.pdf" className="about-inline-link" target="_blank" rel="noopener noreferrer">✨View resume✨</a>.

        </p>
        <p className="about-lead about-lead-soft" style={{ fontSize: '15px', marginBottom: '2px' }}>
          My design process is closer to a <span className="about-emoji" aria-hidden="true" style={{ fontSize: '15px' }}>🕵️</span> detective: gather every scrap, look for the pattern, rearrange until the picture clicks — these days with AI as my co-investigator at every step, from research to prototype to shipped code.
        </p>
        <p className="about-outro" style={{ marginTop: '0' }}><a href="https://www.hcii.cmu.edu/" target="_blank" rel="noopener noreferrer" className="about-inline-link">CMU HCI</a> alum. Always hoarding and rearranging something — plants, rooms, systems, ideas.

        </p>
      </div>
    </div>);

}

// ----- Tab 02 content -----
function WhatICareAbout() {
  return (
    <div className="bio-pane bio-pane-care" style={{ gap: "18px" }}>
      <ol className="about-principles" style={{ gap: "16px" }}>
        {PRINCIPLES.map((p, i) =>
        <li key={i}>
            <div className="ap-body">
              <strong className="ap-lead">{p.lead}</strong>
              <span className="ap-text">{p.body}</span>
            </div>
          </li>
        )}
      </ol>
    </div>);

}

// ----- Tabs 03–04: reuse ShelfGrid from shelf.jsx -----
function ShelfPane({ tabKey }) {
  const tab = window.SHELF_TABS[tabKey];
  const Grid = window.ShelfGrid;
  const Card = tabKey === 'sketchbook' ? window.SketchCard : window.BookCard;
  return (
    <div className="bio-pane bio-pane-shelf">
      <Grid items={tab.items} CardComponent={Card} />
    </div>);

}

// ----- Tab 05: paintings gallery -----
// Round-robin distributes paintings into 3 columns, producing a masonry-style
// wall that preserves each painting's natural aspect ratio. Same glass-card
// chrome as the shelf so the section feels like part of the same canvas
// system. No inner scroll — the grid grows to fit and flows as part of the
// page scroll.
function PaintingsGallery() {
  const [selected, setSelected] = React.useState(null);

  const COLS = 3;
  const columns = Array.from({ length: COLS }, () => []);
  PAINTINGS.forEach((p, i) => columns[i % COLS].push({ p, i }));

  // Lightbox: lock background scroll + close on ESC while open.
  React.useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {if (e.key === 'Escape') setSelected(null);};
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  return (
    <div className="bio-pane bio-pane-shelf">
      <div className="shelf-grid-wrap paintings-wrap">
        <div className="paintings-scroll">
          {columns.map((col, ci) =>
          <div key={ci} className="painting-col">
              {col.map(({ p, i }) =>
            <figure
              key={i}
              className="painting-card"
              title={p.title}
              onClick={() => setSelected(p)}>
                  <img src={p.src} alt={p.title} draggable="false" />
                </figure>
            )}
            </div>
          )}
        </div>
      </div>

      {selected &&
      <div className="painting-lightbox" onClick={() => setSelected(null)} role="dialog" aria-modal="true" aria-label={selected.title}>
          <button
          className="painting-lightbox-close"
          onClick={(e) => {e.stopPropagation();setSelected(null);}}
          aria-label="Close">×</button>
          <div className="painting-lightbox-stage" onClick={(e) => e.stopPropagation()}>
            <img src={selected.src} alt={selected.title} draggable="false" />
            <div className="painting-lightbox-cap">
              <div className="plc-title">{selected.title}</div>
              <div className="plc-meta">{selected.meta}</div>
            </div>
          </div>
        </div>
      }
    </div>);

}

// Continuous-scroll version of the bio section. No nested scroll containers
// inside — books, games, and paintings each render at their natural height
// and flow as part of the page scroll. The left nav rail is position: sticky
// so it stays visible across all five panes; active tab is computed from
// which pane currently dominates the viewport (IntersectionObserver +
// scroll-position fallback).
//
// Clicking a tab smooth-scrolls to that pane's top with a small offset so
// the pane lands a little below the viewport top (visual breathing room).
function BioSection() {
  const tabs = BIO_TABS;
  const [active, setActive] = React.useState(0);
  const paneRefs = React.useRef([]);

  React.useEffect(() => {
    // Active-pane logic: on every scroll, pick whichever pane's top is
    // closest to (but not below) ~30% of the viewport from the top. This
    // is more reliable than IntersectionObserver alone for variable-height
    // content because it always returns a single winner regardless of how
    // many panes are intersecting.
    let raf = 0;
    const update = () => {
      raf = 0;
      const threshold = window.innerHeight * 0.3;
      let best = 0;
      for (let i = 0; i < paneRefs.current.length; i++) {
        const el = paneRefs.current[i];
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= threshold) best = i;else
        break;
      }
      setActive((prev) => prev === best ? prev : best);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const jumpTo = (i) => {
    const el = paneRefs.current[i];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    // No offset — scroll-snap-align: start aligns the pane top with viewport
    // top, so jumpTo() lands at the exact same position the browser snaps to.
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const renderPane = (key) => {
    if (key === 'who') return <WhoIAm />;
    if (key === 'care') return <WhatICareAbout />;
    if (key === 'books') return <ShelfPane tabKey="books" />;
    if (key === 'games') return <ShelfPane tabKey="games" />;
    if (key === 'sketches') return <PaintingsGallery />;
    return null;
  };

  return (
    <section className="bio-section" id="about">
      <div className="bio-layout">
        <aside className="bio-nav">
          <div className="nav-section">A BIT ABOUT ME</div>
          <div className="bio-nav-tabs">
            {tabs.map((t, i) =>
            <button
              key={t.key}
              className={`item ${active === i ? 'active' : ''}`}
              onClick={() => jumpTo(i)}>

                <span className="bar"></span>
                <span className="num">0{i + 1}</span>
                <span className="bio-tab-label-full">{t.label}</span>
                <span className="bio-tab-label-short">{t.labelShort}</span>
              </button>
            )}
          </div>
        </aside>

        <div className="bio-content">
          {tabs.map((t, i) =>
          <div
            key={t.key}
            ref={(el) => paneRefs.current[i] = el}
            className={`bio-pane-slot bio-pane-slot-${t.key}`}>

              {renderPane(t.key)}
            </div>
          )}
        </div>
      </div>
    </section>);

}

window.BioSection = BioSection;