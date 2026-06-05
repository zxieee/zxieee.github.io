function Hero() {
  const lines = [
  'Currently @Facebook, designing ad experiences across Home Feed, Reels, Marketplace and more — previously @Messenger and @Google AI UX.',
  'I build through vibe-coding and prototyping.',
  'Remind me, how did people design without AI? 🤔'];

  // Warm pink/orange gradient per line — rotates with the copy so each line
  // arrives with its own color personality. Saturated enough to feel alive,
  // but staying in the brand's pink→orange family so it doesn't read as random.
  const gradients = [
  'linear-gradient(95deg, #B8456E 0%, #E06B5A 35%, #F08A4A 70%, #F5B85A 100%)', //   coral → amber
  'linear-gradient(95deg, #8E3A7A 0%, #C24B6E 35%, #E08070 70%, #F0A878 100%)', //   magenta → peach
  'linear-gradient(95deg, #C24B6E 0%, #FF6B7A 35%, #FF9B7A 70%, #FFC78A 100%)', //   pink → peach
  'linear-gradient(95deg, #5A3A6E 0%, #A04880 35%, #D8607A 70%, #F0907A 100%)' //    plum → coral
  ];


  // One-way "departures board" rotator. Always lifts UP (never reverses).
  //
  // Three-phase state machine to keep React + CSS transitions in lockstep:
  //   idle    → track shows [current, next], transform: 0, transitions ON
  //   lifting → adds .lifted (transform: -50%), transitions ON  → animates up
  //   snap    → idx advanced + .lifted removed + .snap added (transitions OFF)
  //             so the transform: 0 reset is committed instantly with NO reverse
  //             animation. useLayoutEffect then drops .snap on the next paint —
  //             transitions come back, but transform is already 0 so there's
  //             nothing to animate.
  const [idx, setIdx] = React.useState(0);
  const [phase, setPhase] = React.useState('idle');
  const trackRef = React.useRef(null);

  React.useEffect(() => {
    if (lines.length < 2) return;
    const id = setInterval(() => {
      setPhase((p) => p === 'idle' ? 'lifting' : p);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  React.useLayoutEffect(() => {
    if (phase !== 'snap') return;
    const track = trackRef.current;
    if (track) {
      // Force the no-transition reset to commit before we re-enable transitions.
      // eslint-disable-next-line no-unused-expressions
      track.offsetHeight;
    }
    setPhase('idle');
  }, [phase]);

  const onTransitionEnd = (e) => {
    if (e.propertyName !== 'transform' || phase !== 'lifting') return;
    setIdx((i) => (i + 1) % lines.length);
    setPhase('snap');
  };

  const current = lines[idx];
  const next = lines[(idx + 1) % lines.length];

  // Emoji can't live inside gradient text: -webkit-background-clip:text +
  // transparent fill clips the emoji glyph away too. Split any emoji out and
  // render it in a span that restores a normal fill color so it shows in full color.
  const renderTagline = (text) => {
    const parts = text.split(/([\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}])/u);
    return (
      <span className="hero-tagline-text">
        {parts.map((part, i) =>
        /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u.test(part) ?
        <span key={i} className="hero-tagline-emoji">{part}</span> :
        part)}
      </span>);
  };
  const cls = [
  'hero-rotator-track',
  phase === 'lifting' && 'lifted',
  phase === 'snap' && 'snap'].
  filter(Boolean).join(' ');

  return (
    <section className="hero" id="top">
      <a href="#top" className="hero-logo" aria-label="Home">
        <span className="hero-logo-mark" style={{ width: "24px", height: "24px" }}></span>
      </a>
      <div className="hero-inner" style={{ margin: "60px 0px 0px" }}>
        <h1 className="hero-name" style={{ fontSize: "40px" }}>Angela Xie</h1>
        <div
          className="hero-rotator"
          aria-live="polite"
          aria-atomic="true"
          aria-label="About Angela">
          
          <div
            ref={trackRef}
            className={cls}
            onTransitionEnd={onTransitionEnd}>
            
            <p className="hero-tagline" style={{ backgroundImage: gradients[idx % gradients.length] }}>{renderTagline(current)}</p>
            <p className="hero-tagline" style={{ backgroundImage: gradients[(idx + 1) % gradients.length] }}>{renderTagline(next)}</p>
          </div>
        </div>
      </div>
    </section>);

}

window.Hero = Hero;