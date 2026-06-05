function Work() {
  const projects = window.PROJECTS;
  const [active, setActive] = React.useState(0);
  const stickyRef = React.useRef(null);
  const stageRef = React.useRef(null);

  const jumpToRef = React.useRef(() => {});
  const jumpTo = (i) => jumpToRef.current(i);

  React.useEffect(() => {
    const stage = stageRef.current;
    const sticky = stickyRef.current;
    if (!stage || !sticky) return;

    // Cache DOM lookups once — these don't change between scrolls.
    const navEl = sticky.querySelector('.work-nav');
    const stageEl = sticky.querySelector('.work-stage-area');

    let scrollEndTimer = null;
    let isProgrammaticScroll = false;
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let lastVelocity = 0;
    let rafId = 0;
    let pending = false;

    const positionFor = (i) => {
      const total = stage.offsetHeight - window.innerHeight;
      const stageTop = stage.getBoundingClientRect().top + window.scrollY;
      const denom = Math.max(1, projects.length - 1);
      return stageTop + i / denom * total;
    };

    jumpToRef.current = (i) => {
      isProgrammaticScroll = true;
      window.scrollTo({ top: positionFor(i), behavior: 'smooth' });
      setTimeout(() => {isProgrammaticScroll = false;}, 800);
    };

    const compute = () => {
      pending = false;

      const now = performance.now();
      const dy = window.scrollY - lastScrollY;
      const dt = Math.max(1, now - lastScrollTime);
      lastVelocity = dy / dt;
      lastScrollY = window.scrollY;
      lastScrollTime = now;

      const rect = stage.getBoundingClientRect();
      const vh = window.innerHeight;

      // Disable the document-level CSS scroll-snap (scroll-snap-type: y proximity
      // on <html>, which only exists for the Bio panes) WHILE the Work section is
      // on screen. Work does its own JS-driven smooth-snap; leaving the global
      // snap active means Chrome runs its snap machinery on a scroller that
      // contains a position:sticky element (.work-sticky) during a programmatic
      // smooth scroll — that combo leaves a blank repaint band pinned to the
      // viewport top edge as the sticky exits (the reported "white edge").
      // Restoring '' falls back to the stylesheet value so Bio snapping is intact.
      const engaged = rect.top < vh && rect.bottom > 0;
      document.documentElement.style.scrollSnapType = engaged ? 'none' : '';

      // Continuous dock progress: 0 = peeking in from below, 1 = fully docked.
      const peekRange = vh;
      const dockRaw = Math.max(0, Math.min(1, 1 - rect.top / peekRange));
      const dock = dockRaw < 0.5 ?
      2 * dockRaw * dockRaw :
      1 - Math.pow(-2 * dockRaw + 2, 2) / 2;
      sticky.style.setProperty('--work-dock', dock.toFixed(4));

      // Per-column shift: smoothly interpolate between top-aligned (peek) and
      // centered (docked) using cached navEl / stageEl references.
      if (navEl) {
        const slack = Math.max(0, (vh - navEl.offsetHeight) / 2);
        sticky.style.setProperty('--nav-shift', (-slack * (1 - dock)).toFixed(2) + 'px');
      }
      if (stageEl) {
        const slack = Math.max(0, (vh - stageEl.offsetHeight) / 2);
        sticky.style.setProperty('--stage-shift', (-slack * (1 - dock)).toFixed(2) + 'px');
      }

      const total = stage.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const denom = Math.max(1, projects.length - 1);
      const raw = Math.max(0, Math.min(1, -rect.top / total));
      const progress = raw * denom;

      sticky.style.setProperty('--work-progress', progress.toFixed(4));

      const idx = Math.round(progress);
      setActive((prev) => {
        const next = Math.max(0, Math.min(projects.length - 1, idx));
        return prev === next ? prev : next;
      });

      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      if (isProgrammaticScroll) return;
      scrollEndTimer = setTimeout(() => {
        const r = stage.getBoundingClientRect();
        const t2 = stage.offsetHeight - window.innerHeight;
        if (t2 <= 0) return;
        const insideRange = r.top <= 0 && r.top >= -t2;
        if (!insideRange) return;
        // Looser velocity gate — was 0.05, now 0.15. The old threshold meant the
        // user had to be almost completely still; now snap fires as soon as
        // scrolling has clearly decelerated.
        if (Math.abs(lastVelocity) > 0.15) return;
        const p = -r.top / t2 * denom;
        const nearest = Math.round(p);
        const target = positionFor(nearest);
        if (Math.abs(window.scrollY - target) > 3) {
          isProgrammaticScroll = true;
          window.scrollTo({ top: target, behavior: 'smooth' });
          setTimeout(() => {isProgrammaticScroll = false;}, 600);
        }
      }, 20); // very tight — snap fires almost immediately after the user stops scrolling.
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      rafId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [projects.length]);

  return (
    <section className="work-section" id="work">
      <div className="work-stage" ref={stageRef} style={{ height: `${projects.length * 100}vh` }}>
        <div className="work-sticky" ref={stickyRef}>
          <aside className="work-nav">
            <div className="nav-section">SELECTED WORK</div>
            {projects.map((p, i) =>
            <button
              key={i}
              className={`item ${active === i ? 'active' : ''}`}
              onClick={() => jumpTo(i)}>
              
                <span className="bar"></span>
                <span className="num">{p.num}</span>
                <span>{p.name || p.title}</span>
              </button>
            )}
          </aside>
          <div className="work-stage-area" style={{ padding: "0px 40px" }}>
            {/* Padded overflow:hidden wrapper replaces the old clip-path on
                .work-canvas. Same bleed region (24px top, 120px sides/bottom)
                via padding, cancelled by equal negative margins so layout is
                unchanged — but overflow:hidden composites cleanly under the
                scroll-driven --stage-shift transform, with no trailing white
                repaint band at the top edge (the reported crop). */}
            <div className="work-clip">
            <div className="work-canvas" style={{ margin: "0px 20px 0px 0px" }}>
              {projects.map((p, i) =>
              <div
                key={i}
                className={`work-card ${active === i ? 'active' : ''}`}
                style={{ '--card-i': i }}>
                
                  <div className="work-frame" data-cursor="view">
                    <ProjectMock project={p} />
                  </div>
                  <div className="work-blurb">
                    <div>
                      <h3 style={{ fontSize: "24px", whiteSpace: "pre-line" }}>{p.title}</h3>
                      <p>{p.blurb}</p>
                      <div className="meta-tags">
                        {p.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

window.Work = Work;