// ============================================================================
// Custom cursor system — four variants, switched live via Tweaks.
//
// All variants share one mount point and one rAF loop. The cursor reads the
// current "intent" from whatever the mouse is over (via document mouseover
// events that look at data-cursor / tag name) and renders accordingly.
//
// Touch devices: we detect (hover: none) and don't mount anything — the native
// touch interaction is correct on those.
// ============================================================================

const INTENT_LABELS = {
  click:   { text: 'click', glyph: '↗' },
  view:    { text: 'view',  glyph: '→' },
  read:    { text: 'read',  glyph: '✻' },
  open:    { text: 'open',  glyph: '↗' },
  scroll:  { text: 'scroll', glyph: '↓' },
  drag:    { text: 'drag',  glyph: '⇕' },
};

// Resolve a DOM target → an intent key. Walks up ancestors so clicks on inner
// SVGs / spans still resolve to the link/button wrapping them.
function resolveIntent(target) {
  let el = target;
  while (el && el !== document.body) {
    if (el.dataset && el.dataset.cursor) return el.dataset.cursor;
    const tag = el.tagName;
    if (tag === 'A' || tag === 'BUTTON') return 'click';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return 'text';
    el = el.parentElement;
  }
  return 'default';
}

// Shared mouse tracker — one set of refs the variants all read from.
function useMouseTracker() {
  const stateRef = React.useRef({
    x: -100, y: -100,        // raw mouse position
    lx: -100, ly: -100,      // lagged position (lerped each frame)
    px: -100, py: -100,      // previous frame position (for velocity)
    vx: 0, vy: 0,            // velocity
    speed: 0,                // |velocity|
    down: false,             // mouse button down
    intent: 'default',       // resolved intent string
    visible: false,          // mouse has entered the document
  });

  React.useEffect(() => {
    const s = stateRef.current;
    const onMove = (e) => {
      s.x = e.clientX; s.y = e.clientY;
      if (!s.visible) {
        // First sighting — snap lagged position so we don't fly in from (-100, -100).
        s.lx = s.x; s.ly = s.y; s.px = s.x; s.py = s.y;
        s.visible = true;
      }
    };
    const onDown = () => { s.down = true; };
    const onUp   = () => { s.down = false; };
    const onLeave = () => { s.visible = false; };
    const onOver = (e) => { s.intent = resolveIntent(e.target); };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup',   onUp,   { passive: true });
    window.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return stateRef;
}

// ----------------------------------------------------------------------------
// Variant: HALO — precise dot follows raw mouse, soft ring lags behind.
// On interactive elements the ring inflates and the dot tucks inside its center.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Color schemes shared by all halo variants. Each scheme exposes both hex
// values (for solid stops) and pre-comma RGB triples (for rgba(..., a) usage
// in CSS variables and JS trail color strings).
//   - plum:    matches the "Angela Xie" wordmark gradient
//   - coral:   warmer, fierier — pink → peach
//   - iris:    cooler — deep purple → lavender
// Selected via the haloColor tweak; CSS vars are stamped on <html> from
// the Cursor effect below.
// ----------------------------------------------------------------------------
const HALO_PALETTES = {
  plum: {
    c1: '#B85C8E', c2: '#FF8A9B', c3: '#C896F0',
    c1rgb: '184, 92, 142', c2rgb: '255, 138, 155', c3rgb: '200, 150, 240',
    warm: '255, 138, 155', cool: '200, 150, 240', spark: '60, 30, 70',
  },
  coral: {
    c1: '#D8456E', c2: '#FF8A6B', c3: '#FFB89C',
    c1rgb: '216, 69, 110', c2rgb: '255, 138, 107', c3rgb: '255, 184, 156',
    warm: '255, 138, 107', cool: '255, 184, 156', spark: '120, 30, 40',
  },
  iris: {
    c1: '#6240B0', c2: '#9C7AE0', c3: '#E8C8F0',
    c1rgb: '98, 64, 176', c2rgb: '156, 122, 224', c3rgb: '232, 200, 240',
    warm: '232, 200, 240', cool: '156, 122, 224', spark: '40, 20, 80',
  },
};

// ----------------------------------------------------------------------------
// Variant: HALO V3 — bigger resting dot (12px), denser trail than V2, idle
// "sparkle" bursts of small dark dots radiating outward when the user pauses,
// and a soft-focus frosted-glass hover state (no ring; backdrop blur + radial
// mask feathers the disc edge into a halo).
// ----------------------------------------------------------------------------
function HaloV3Cursor({ palette }) {
  const s = useMouseTracker();
  const dotRef = React.useRef(null);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const TRAIL_POOL = 32;
    const SPARK_POOL = 30;
    const trails = [];
    const sparks = [];
    const container = containerRef.current;
    for (let i = 0; i < TRAIL_POOL; i++) {
      const el = document.createElement('div');
      el.className = 'cur-halo3-trail';
      el.style.opacity = 0;
      container.appendChild(el);
      trails.push({ el, life: 0, x: 0, y: 0, vx: 0, vy: 0, size: 1, warm: false });
    }
    for (let i = 0; i < SPARK_POOL; i++) {
      const el = document.createElement('div');
      el.className = 'cur-halo3-spark';
      el.style.opacity = 0;
      container.appendChild(el);
      sparks.push({ el, life: 0, x: 0, y: 0, vx: 0, vy: 0, size: 1 });
    }
    let tCur = 0, sCur = 0;
    let lastTrailEmit = 0;
    let lastMoveTime = performance.now();
    let lastBurstTime = 0;
    let raf;

    const tick = (now) => {
      const st = s.current;
      st.lx += (st.x - st.lx) * 0.22;
      st.ly += (st.y - st.ly) * 0.22;

      const dx = st.x - st.px; const dy = st.y - st.py;
      st.px = st.x; st.py = st.y;
      const speed = Math.hypot(dx, dy);
      if (speed > 0.5) lastMoveTime = now;

      const interactive = st.intent !== 'default' && st.intent !== 'text';

      // Trail emission — denser than V2 (lower threshold, tighter cadence).
      const interval = speed > 0.5 ? Math.max(18, 65 - speed * 3) : 9999;
      if (st.visible && now - lastTrailEmit > interval) {
        lastTrailEmit = now;
        const p = trails[tCur];
        tCur = (tCur + 1) % TRAIL_POOL;
        p.x = st.x + (Math.random() - 0.5) * 8;
        p.y = st.y + (Math.random() - 0.5) * 8;
        p.vx = -dx * 0.04 + (Math.random() - 0.5) * 0.3;
        p.vy = -dy * 0.04 + (Math.random() - 0.5) * 0.3;
        p.life = 1;
        p.size = 6 + Math.random() * 6;
        p.warm = Math.random() < 0.5;
      }

      // Idle sparkle burst — when the cursor has been still for >1.4s, every
      // ~2.4s emit a starburst of 5–7 small dark dots radiating outward. Gives
      // the resting cursor a small breath instead of a static dot.
      const idleTime = now - lastMoveTime;
      if (st.visible && idleTime > 1400 && now - lastBurstTime > 2400) {
        lastBurstTime = now;
        const count = 5 + Math.floor(Math.random() * 3);
        for (let k = 0; k < count; k++) {
          // Even angular spread + small jitter so the burst feels alive not stamped.
          const angle = (k / count) * Math.PI * 2 + Math.random() * 0.4;
          const dist = 7 + Math.random() * 4;
          const sp = sparks[sCur];
          sCur = (sCur + 1) % SPARK_POOL;
          sp.x = st.x + Math.cos(angle) * dist;
          sp.y = st.y + Math.sin(angle) * dist;
          const sv = 0.5 + Math.random() * 0.7;
          sp.vx = Math.cos(angle) * sv;
          sp.vy = Math.sin(angle) * sv;
          sp.life = 1;
          sp.size = 2 + Math.random() * 2;
        }
      }

      // Step trails.
      for (let i = 0; i < TRAIL_POOL; i++) {
        const p = trails[i];
        if (p.life <= 0) {
          if (p.el.style.opacity !== '0') p.el.style.opacity = 0;
          continue;
        }
        p.life -= 0.024;
        p.x += p.vx; p.y += p.vy;
        const o = Math.max(0, p.life);
        p.el.style.transform =
          `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${o})`;
        p.el.style.opacity = o * 0.55;
        p.el.style.width = p.size + 'px';
        p.el.style.height = p.size + 'px';
        p.el.style.background = p.warm
          ? `radial-gradient(circle, rgba(${palette.warm},0.95) 0%, rgba(${palette.warm},0) 70%)`
          : `radial-gradient(circle, rgba(${palette.cool},0.95) 0%, rgba(${palette.cool},0) 70%)`;
      }

      // Step idle sparks — they drift outward, decelerate, fade. Dark color
      // so they read as little punctuation marks against the page, not as
      // additional glow blobs.
      for (let i = 0; i < SPARK_POOL; i++) {
        const p = sparks[i];
        if (p.life <= 0) {
          if (p.el.style.opacity !== '0') p.el.style.opacity = 0;
          continue;
        }
        p.life -= 0.018;
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.96; p.vy *= 0.96;
        const o = Math.max(0, p.life);
        p.el.style.transform =
          `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${o * 1.2})`;
        p.el.style.opacity = o * 0.8;
        p.el.style.width = p.size + 'px';
        p.el.style.height = p.size + 'px';
        p.el.style.background = `rgba(${palette.spark}, 0.85)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${st.x}px, ${st.y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = st.visible ? 1 : 0;
        if (interactive !== dotRef.current.classList.contains('hover')) {
          dotRef.current.classList.toggle('hover', interactive);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      trails.forEach(p => p.el.remove());
      sparks.forEach(p => p.el.remove());
    };
  }, [palette]);

  return (
    <>
      <div ref={containerRef} className="cur-halo3-pool" aria-hidden="true"></div>
      <div ref={dotRef} className="cur-halo3-dot"></div>
    </>
  );
}

// ----------------------------------------------------------------------------
// Variant: HALO V2 — solo gradient dot, no resting ring.
function HaloV2Cursor({ palette }) {
  const s = useMouseTracker();
  const dotRef = React.useRef(null);
  const ringRef = React.useRef(null);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    // Trail pool — smaller than sparkle (24 vs 40) and far less dense thanks to
    // a stricter emit interval. Each particle is a soft radial-gradient blob,
    // not a glyph, so the trail reads as a wash rather than a sparkle storm.
    const POOL = 24;
    const pool = [];
    const container = containerRef.current;
    for (let i = 0; i < POOL; i++) {
      const el = document.createElement('div');
      el.className = 'cur-halo2-trail';
      el.style.opacity = 0;
      container.appendChild(el);
      pool.push({ el, life: 0, x: 0, y: 0, vx: 0, vy: 0, size: 1, warm: false });
    }
    let cursor = 0;
    let lastEmit = 0;
    let raf;

    const tick = (now) => {
      const st = s.current;
      st.lx += (st.x - st.lx) * 0.22;
      st.ly += (st.y - st.ly) * 0.22;

      const dx = st.x - st.px; const dy = st.y - st.py;
      st.px = st.x; st.py = st.y;
      const speed = Math.hypot(dx, dy);

      const interactive = st.intent !== 'default' && st.intent !== 'text';

      // Trail emission — lower threshold + tighter cadence than before so a
      // moderate drift leaves a clearly visible trail, while still well below
      // sparkle's density (no glyphs, blurred blobs).
      const interval = speed > 1.2 ? Math.max(35, 110 - speed * 4) : 9999;
      if (st.visible && now - lastEmit > interval) {
        lastEmit = now;
        const p = pool[cursor];
        cursor = (cursor + 1) % POOL;
        p.x = st.x + (Math.random() - 0.5) * 8;
        p.y = st.y + (Math.random() - 0.5) * 8;
        // Tiny opposite drift — particle lags behind motion like a contrail.
        p.vx = -dx * 0.04 + (Math.random() - 0.5) * 0.3;
        p.vy = -dy * 0.04 + (Math.random() - 0.5) * 0.3;
        p.life = 1;
        p.size = 6 + Math.random() * 6;
        // Alternate warm / cool — same two stops as the highlighter gradient
        // so the trail stays tonally tied to the dot itself.
        p.warm = Math.random() < 0.5;
      }

      for (let i = 0; i < POOL; i++) {
        const p = pool[i];
        if (p.life <= 0) {
          if (p.el.style.opacity !== '0') p.el.style.opacity = 0;
          continue;
        }
        p.life -= 0.022;
        p.x += p.vx;
        p.y += p.vy;
        const o = Math.max(0, p.life);
        p.el.style.transform =
          `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${o})`;
        p.el.style.opacity = o * 0.55;
        p.el.style.width = p.size + 'px';
        p.el.style.height = p.size + 'px';
        p.el.style.background = p.warm
          ? `radial-gradient(circle, rgba(${palette.warm},0.95) 0%, rgba(${palette.warm},0) 70%)`
          : `radial-gradient(circle, rgba(${palette.cool},0.95) 0%, rgba(${palette.cool},0) 70%)`;
      }

      // Dot — width/height transitions in CSS handle the morph between resting
      // (8.4px) and hover (36px). We just toggle the .hover class so the CSS
      // owns the easing curve.
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${st.x}px, ${st.y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = st.visible ? 1 : 0;
        if (interactive !== dotRef.current.classList.contains('hover')) {
          dotRef.current.classList.toggle('hover', interactive);
        }
      }

      // Ring — only shows during hover. Lags slightly behind the dot so the
      // morph reads as: dot melts → ring catches up around it.
      if (ringRef.current) {
        const ringScale = interactive ? 1 : 0.7;
        ringRef.current.style.transform =
          `translate3d(${st.lx}px, ${st.ly}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        ringRef.current.style.opacity = (st.visible && interactive) ? 1 : 0;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      pool.forEach(p => p.el.remove());
    };
  }, [palette]);

  return (
    <>
      <div ref={containerRef} className="cur-halo2-trail-pool" aria-hidden="true"></div>
      <div ref={ringRef} className="cur-halo2-ring"></div>
      <div ref={dotRef} className="cur-halo2-dot"></div>
    </>
  );
}

function HaloCursor() {
  const s = useMouseTracker();
  const dotRef = React.useRef(null);
  const ringRef = React.useRef(null);
  const ringInnerRef = React.useRef(null);

  React.useEffect(() => {
    let raf;
    const tick = () => {
      const st = s.current;
      // Ease the ring toward the dot — slower lag = more buttery.
      st.lx += (st.x - st.lx) * 0.18;
      st.ly += (st.y - st.ly) * 0.18;

      const isInteractive = st.intent !== 'default' && st.intent !== 'text';
      const ringScale = isInteractive ? 1.7 : 1;
      const ringOpacity = st.visible ? (isInteractive ? 0.95 : 0.55) : 0;
      const dotScale = st.down ? 0.6 : (isInteractive ? 0.4 : 1);
      const dotOpacity = st.visible ? 1 : 0;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${st.x}px, ${st.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        dotRef.current.style.opacity = dotOpacity;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${st.lx}px, ${st.ly}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        ringRef.current.style.opacity = ringOpacity;
      }
      if (ringInnerRef.current) {
        // Hover state — deeper pink→lilac wash inside the ring.
        ringInnerRef.current.style.opacity = isInteractive ? 0.3 : 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div ref={ringRef} className="cur-halo-ring">
        <div ref={ringInnerRef} className="cur-halo-ring-fill"></div>
      </div>
      <div ref={dotRef} className="cur-halo-dot"></div>
    </>
  );
}

// ----------------------------------------------------------------------------
// Variant: BLOB — soft pastel blob with velocity-based stretch + skew.
// Picks up palette colors from CSS variables so it changes with the palette
// tweak. On hover over interactive elements it solidifies + pulses.
// ----------------------------------------------------------------------------
function BlobCursor() {
  const s = useMouseTracker();
  const blobRef = React.useRef(null);

  React.useEffect(() => {
    let raf;
    const tick = () => {
      const st = s.current;
      st.lx += (st.x - st.lx) * 0.22;
      st.ly += (st.y - st.ly) * 0.22;

      // Velocity → stretch. Capped so wild flicks don't make it line-thin.
      const dx = st.x - st.px; const dy = st.y - st.py;
      st.px = st.x; st.py = st.y;
      const speed = Math.min(Math.hypot(dx, dy), 60);
      st.speed = st.speed * 0.7 + speed * 0.3;

      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      // Stretch along motion vector. 1.0–1.6 along, 0.7–1.0 across.
      const stretchA = 1 + Math.min(st.speed / 60, 0.6);
      const stretchB = 1 - Math.min(st.speed / 60, 0.3);

      const isInteractive = st.intent !== 'default' && st.intent !== 'text';
      const baseScale = isInteractive ? 1.4 : 1;
      const opacity = st.visible ? (isInteractive ? 0.85 : 0.55) : 0;

      if (blobRef.current) {
        blobRef.current.style.transform =
          `translate3d(${st.lx}px, ${st.ly}px, 0) translate(-50%, -50%) ` +
          `rotate(${angle}deg) scale(${stretchA * baseScale}, ${stretchB * baseScale})`;
        blobRef.current.style.opacity = opacity;
        // Sharpen blob when interactive — less blur, more saturation.
        blobRef.current.style.filter = isInteractive ? 'blur(8px) saturate(150%)' : 'blur(14px) saturate(120%)';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <div ref={blobRef} className="cur-blob"></div>;
}

// ----------------------------------------------------------------------------
// Variant: LABEL — minimal dot + a contextual pill that follows below-right
// and morphs its copy based on intent ("view", "read", "click ↗"). The pill
// only appears on interactive elements; otherwise just the dot rides along.
// ----------------------------------------------------------------------------
function LabelCursor() {
  const s = useMouseTracker();
  const dotRef = React.useRef(null);
  const pillRef = React.useRef(null);
  const labelRef = React.useRef(null);
  const glyphRef = React.useRef(null);
  const lastIntentRef = React.useRef('default');

  React.useEffect(() => {
    let raf;
    const tick = () => {
      const st = s.current;
      st.lx += (st.x - st.lx) * 0.22;
      st.ly += (st.y - st.ly) * 0.22;

      const interactive = st.intent !== 'default' && st.intent !== 'text';
      const opacity = st.visible ? 1 : 0;
      const dotScale = st.down ? 0.7 : (interactive ? 1.6 : 1);

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${st.x}px, ${st.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        dotRef.current.style.opacity = opacity;
      }
      if (pillRef.current) {
        // Pill sits down-right of the cursor so it doesn't obscure the target.
        pillRef.current.style.transform =
          `translate3d(${st.lx + 16}px, ${st.ly + 16}px, 0)`;
        pillRef.current.style.opacity = (interactive && st.visible) ? 1 : 0;
        pillRef.current.style.transform += interactive ? ' scale(1)' : ' scale(0.85)';
      }
      // Only update the text when the intent actually changes — avoids
      // re-flow churn each frame.
      if (st.intent !== lastIntentRef.current) {
        const meta = INTENT_LABELS[st.intent] || INTENT_LABELS.click;
        if (labelRef.current) labelRef.current.textContent = meta.text;
        if (glyphRef.current) glyphRef.current.textContent = meta.glyph;
        lastIntentRef.current = st.intent;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cur-label-dot"></div>
      <div ref={pillRef} className="cur-label-pill">
        <span ref={glyphRef} className="cur-label-glyph">↗</span>
        <span ref={labelRef} className="cur-label-text">click</span>
      </div>
    </>
  );
}

// ----------------------------------------------------------------------------
// Variant: SPARKLE — emits ✻ glyphs at a rate proportional to mouse speed.
// Particles fade + drift slightly. On interactive elements the emission rate
// jumps and particles are tinted by the palette accents.
//
// Uses a fixed-size DOM pool (40 nodes) recycled in a ring so we never
// allocate during motion. Each particle stores its phase as data attrs and
// the rAF loop advances them.
// ----------------------------------------------------------------------------
function SparkleCursor() {
  const s = useMouseTracker();
  const dotRef = React.useRef(null);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const POOL = 40;
    const pool = [];
    const container = containerRef.current;
    for (let i = 0; i < POOL; i++) {
      const el = document.createElement('div');
      el.className = 'cur-sparkle-particle';
      el.textContent = '✻';
      el.style.opacity = 0;
      container.appendChild(el);
      pool.push({ el, life: 0, x: 0, y: 0, vx: 0, vy: 0, rot: 0, hue: 0, size: 1 });
    }
    let cursor = 0;
    let lastEmit = 0;
    let raf;

    const tick = (now) => {
      const st = s.current;
      st.lx += (st.x - st.lx) * 0.3;
      st.ly += (st.y - st.ly) * 0.3;

      const dx = st.x - st.px; const dy = st.y - st.py;
      st.px = st.x; st.py = st.y;
      const speed = Math.hypot(dx, dy);

      const interactive = st.intent !== 'default' && st.intent !== 'text';

      // Emission cadence — fast strokes spawn more. Min interval 25ms during
      // motion, longer during stillness. Interactive elements halve the interval.
      const baseInterval = speed > 1.5 ? Math.max(25, 90 - speed * 3) : 220;
      const interval = interactive ? baseInterval * 0.5 : baseInterval;

      if (st.visible && now - lastEmit > interval) {
        lastEmit = now;
        const p = pool[cursor];
        cursor = (cursor + 1) % POOL;
        p.x = st.x + (Math.random() - 0.5) * 8;
        p.y = st.y + (Math.random() - 0.5) * 8;
        // Slight initial drift opposite to motion — feels like a contrail.
        p.vx = -dx * 0.05 + (Math.random() - 0.5) * 0.6;
        p.vy = -dy * 0.05 + (Math.random() - 0.5) * 0.6 - 0.2;
        p.rot = Math.random() * 360;
        p.life = 1;
        p.hue = interactive ? Math.random() * 360 : (Math.random() < 0.5 ? 18 : 330);
        p.size = 0.6 + Math.random() * 0.9;
      }

      // Step + render every particle.
      for (let i = 0; i < POOL; i++) {
        const p = pool[i];
        if (p.life <= 0) {
          if (p.el.style.opacity !== '0') p.el.style.opacity = 0;
          continue;
        }
        p.life -= 0.022;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gentle gravity
        p.rot += 1.5;
        const o = Math.max(0, p.life);
        p.el.style.transform =
          `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${p.rot}deg) scale(${p.size * o})`;
        p.el.style.opacity = o * 0.9;
        p.el.style.color = `hsl(${p.hue}, 75%, 65%)`;
      }

      // The "cursor" itself — small pastel dot, just so there's a point of
      // intent, with the sparkles trailing.
      const dotScale = st.down ? 0.7 : (interactive ? 1.6 : 1);
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${st.x}px, ${st.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        dotRef.current.style.opacity = st.visible ? 1 : 0;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      pool.forEach(p => p.el.remove());
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="cur-sparkle-pool" aria-hidden="true"></div>
      <div ref={dotRef} className="cur-sparkle-dot"></div>
    </>
  );
}

// ----------------------------------------------------------------------------
// Top-level dispatcher. Renders one variant, applies the "custom-cursor-on"
// class to <html> so CSS can hide the native cursor, and bails on touch.
// ----------------------------------------------------------------------------
function Cursor({ style, color = 'plum' }) {
  const palette = HALO_PALETTES[color] || HALO_PALETTES.plum;

  // Touch / coarse-pointer devices: no custom cursor.
  const supported = React.useMemo(() => {
    return typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  // Stamp palette CSS vars on <html> whenever color changes — every halo
  // variant's CSS reads from --halo-c{1,2,3}[-rgb], so this is the single
  // source of truth for cursor color.
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--halo-c1', palette.c1);
    root.style.setProperty('--halo-c2', palette.c2);
    root.style.setProperty('--halo-c3', palette.c3);
    root.style.setProperty('--halo-c1-rgb', palette.c1rgb);
    root.style.setProperty('--halo-c2-rgb', palette.c2rgb);
    root.style.setProperty('--halo-c3-rgb', palette.c3rgb);
  }, [palette]);

  React.useEffect(() => {
    if (!supported || style === 'off') {
      document.documentElement.classList.remove('custom-cursor-on');
      document.documentElement.removeAttribute('data-cursor-style');
      return;
    }
    document.documentElement.classList.add('custom-cursor-on');
    document.documentElement.setAttribute('data-cursor-style', style);
    return () => {
      document.documentElement.classList.remove('custom-cursor-on');
      document.documentElement.removeAttribute('data-cursor-style');
    };
  }, [style, supported]);

  if (!supported || style === 'off') return null;

  return (
    <div className="cur-root" aria-hidden="true">
      {style === 'halo'    && <HaloCursor />}
      {style === 'halo2'   && <HaloV2Cursor palette={palette} />}
      {style === 'halo3'   && <HaloV3Cursor palette={palette} />}
      {style === 'label'   && <LabelCursor />}
    </div>
  );
}

Object.assign(window, { Cursor });
