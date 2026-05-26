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


const BIO_TABS = [
{ key: 'who', label: 'Who I am' },
{ key: 'care', label: 'What I care about' },
{ key: 'books', label: 'Books I read' },
{ key: 'games', label: 'Games I (binge) played' },
{ key: 'sketches', label: 'Things I painted' }];


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
    <div className="bio-pane bio-pane-who" style={{ margin: "0px 0px 0px 40px" }}>
      <div className="who-portrait-block">
        <figure className="about-portrait who-portrait">
          <img src="assets/angela-portrait.png" alt="Angela Xie, smiling beneath a pink flowering tree" draggable="false" style={{ width: "246px" }} />
        </figure>
      </div>
      <div className="who-text" style={{ gap: "18px" }}>
        <p className="about-lead" style={{ fontWeight: "700" }}>
          A Bay Area-based designer — the kind who can <span className="about-accent">lead the strategy</span>, <span className="about-accent">build the system</span>, and still <span className="about-accent">sweat the pixels</span>.
        </p>
        <p className="about-lead about-lead-soft" style={{ fontSize: '15px', marginBottom: '2px' }}>Over the past 7 years, I've worked on AI, monetization, commerce, and social experiences at Facebook, Messenger, Instagram, and Google. <a href="assets/AX-Resume.pdf" className="about-inline-link" target="_blank" rel="noopener noreferrer">✨View resume✨</a>.

        </p>
        <p className="about-lead about-lead-soft" style={{ fontSize: '15px', marginBottom: '2px' }}>
          My design process is closer to a <span className="about-emoji" aria-hidden="true" style={{ fontSize: '15px' }}>🕵️</span> detective: gather every scrap, look for the pattern, rearrange until the picture clicks.
        </p>
        <p className="about-outro" style={{ marginTop: '0' }}><a href="https://www.hcii.cmu.edu/" target="_blank" rel="noopener noreferrer" className="about-inline-link">CMU HCI</a> alum. Always hoarding and rearranging something — plants, rooms, systems, ideas.

        </p>
      </div>
    </div>);

}

// ----- Tab 02 content -----
function WhatICareAbout() {
  return (
    <div className="bio-pane bio-pane-care" style={{ gap: "18px", margin: "0px 60px 0px 40px" }}>
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
// CSS columns gives a masonry-style wall that preserves each painting's
// natural aspect ratio. Same glass-card chrome as the shelf so the section
// feels like part of the same canvas system.
function PaintingsGallery() {
  const scrollRef = React.useRef(null);
  const [selected, setSelected] = React.useState(null);

  // Round-robin distribute paintings into N columns so we get a true masonry
  // layout that scrolls VERTICALLY inside the fixed-height shelf canvas.
  // CSS columns would have flowed horizontally inside a fixed-height parent;
  // manual column distribution sidesteps that entirely.
  const COLS = 3;
  const columns = Array.from({ length: COLS }, () => []);
  PAINTINGS.forEach((p, i) => columns[i % COLS].push({ p, i }));

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const FADE = 24;
    const update = () => {
      const top = Math.min(1, el.scrollTop / FADE);
      const remaining = el.scrollHeight - el.clientHeight - el.scrollTop;
      const bottom = Math.min(1, Math.max(0, remaining) / FADE);
      el.style.setProperty('--top-fade', top.toFixed(3));
      el.style.setProperty('--bottom-fade', bottom.toFixed(3));
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

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
        <div className="paintings-scroll" ref={scrollRef}>
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

function BioSection() {
  const [active, setActive] = React.useState('who');

  let body = null;
  if (active === 'who') body = <WhoIAm />;else
  if (active === 'care') body = <WhatICareAbout />;else
  if (active === 'books') body = <ShelfPane tabKey="books" />;else
  if (active === 'games') body = <ShelfPane tabKey="games" />;else
  if (active === 'sketches') body = <PaintingsGallery />;

  return (
    <section className="bio-section" id="about" style={{ padding: "120px 0px 100px" }}>
      <div className="bio-layout">
        <aside className="bio-nav">
          <div className="nav-section">A BIT ABOUT ME</div>
          <div className="bio-nav-tabs">
            {BIO_TABS.map((t, i) =>
            <button
              key={t.key}
              className={`item ${active === t.key ? 'active' : ''}`}
              onClick={() => setActive(t.key)}>
                <span className="bar"></span>
                <span className="num">0{i + 1}</span>
                <span>{t.label}</span>
              </button>
            )}
          </div>
        </aside>

        <div className="bio-content" style={{ padding: "0px 40px 0px 0px" }}>
          {body}
        </div>
      </div>
    </section>);

}

window.BioSection = BioSection;