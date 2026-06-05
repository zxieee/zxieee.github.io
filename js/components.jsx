// Mesh background + small shared bits
function MeshBG() {
  return (
    <>
      <div className="mesh-bg" aria-hidden="true">
        <div className="mesh-blob b1"></div>
        <div className="mesh-blob b2"></div>
        <div className="mesh-blob b3"></div>
        <div className="mesh-blob b4"></div>
        <div className="mesh-blob b5"></div>
      </div>
      <div className="grain" aria-hidden="true"></div>
    </>);

}

function TopNav() {
  return (
    <nav className="topnav">
      <a href="#top" className="brand">Angela Xie<em>·xie</em></a>
      <a className="link" href="#work">Work</a>
      <a className="link" href="#about">About</a>
      <a className="cta" href="mailto:xzm1008@gmail.com">
        Get in touch
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
      </a>
    </nav>);

}

function Marquee() {
  const items = ['Product Design', 'Systems Thinking', 'Prototyping', 'Research', 'Design Leadership', 'Product Design', 'Systems Thinking', 'Prototyping', 'Research', 'Design Leadership'];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((t, i) => <span key={i} className="marquee-item">{t}</span>)}
      </div>
    </div>);

}

// ---- Project mocks ----
function PhoneMock({ accent }) {
  return (
    <div className="phone">
      <div className="phone-notch"></div>
      <div className="phone-screen" style={{
        background: `linear-gradient(165deg, ${accent[0]} 0%, ${accent[1]} 100%)`
      }}>
        <div style={{ padding: '52px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 60, height: 8, background: 'rgba(255,255,255,0.7)', borderRadius: 4 }}></div>
            <div style={{ width: 24, height: 24, background: 'rgba(255,255,255,0.6)', borderRadius: 12 }}></div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.35)', borderRadius: 12, marginTop: 4, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent 60%)' }}></div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.55)', borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ height: 6, width: '70%', background: 'rgba(31,26,36,0.4)', borderRadius: 3 }}></div>
            <div style={{ height: 6, width: '50%', background: 'rgba(31,26,36,0.25)', borderRadius: 3 }}></div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[0, 1, 2, 3].map((i) =>
            <div key={i} style={{ flex: 1, height: 26, background: i === 1 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)', borderRadius: 8 }}></div>
            )}
          </div>
        </div>
      </div>
    </div>);

}

function StackMock({ accent }) {
  return (
    <div className="proj-stack">
      <div className="proj-card-mock" style={{ transform: 'rotate(-4deg) translateY(10px)' }}>
        <div style={{ height: 120, borderRadius: 10, background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }}></div>
        <div className="skel h-line w-70"></div>
        <div className="skel h-line w-50"></div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
          <div className="skel" style={{ width: 60, height: 24, borderRadius: 12 }}></div>
          <div className="skel" style={{ width: 80, height: 24, borderRadius: 12 }}></div>
        </div>
      </div>
      <div className="proj-card-mock" style={{ transform: 'rotate(2deg) translateY(-10px)', background: 'linear-gradient(145deg, #1F1A24, #2A2530)', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }}></div>
          <div style={{ flex: 1 }}>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.6)', borderRadius: 3, width: '60%' }}></div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.3)', borderRadius: 2, width: '40%', marginTop: 4 }}></div>
          </div>
        </div>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.18)', borderRadius: 4, marginTop: 8 }}></div>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.18)', borderRadius: 4, width: '80%' }}></div>
        <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.4)', borderRadius: 3, width: '70%' }}></div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 3, width: '50%', marginTop: 6 }}></div>
        </div>
      </div>
    </div>);

}

function SplitMock({ accent }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
      <PhoneMock accent={accent} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="proj-card-mock" style={{ width: 220, height: 110, padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }}></div>
            <div style={{ flex: 1 }}>
              <div className="skel h-line w-70"></div>
              <div className="skel h-line w-50" style={{ marginTop: 4 }}></div>
            </div>
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 4 }}>
            <div style={{ width: 40, height: 16, background: accent[0], borderRadius: 8, opacity: 0.7 }}></div>
            <div style={{ width: 50, height: 16, background: 'rgba(31,26,36,0.08)', borderRadius: 8 }}></div>
          </div>
        </div>
        <div className="proj-card-mock" style={{ width: 220, height: 110, padding: 14 }}>
          <div className="skel h-line w-50"></div>
          <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
            {[0, 1, 2, 3].map((i) =>
            <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: i === 0 ? accent[0] : i === 1 ? accent[1] : 'rgba(31,26,36,0.08)', border: '2px solid #fff' }}></div>
            )}
          </div>
          <div className="skel h-line w-full" style={{ marginTop: 12 }}></div>
          <div className="skel h-line w-70" style={{ marginTop: 4 }}></div>
        </div>
      </div>
    </div>);

}

function AvatarMock({ accent }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <div style={{
        width: 240, height: 320, borderRadius: 20,
        background: `linear-gradient(165deg, ${accent[0]} 0%, ${accent[1]} 100%)`,
        boxShadow: '0 20px 50px -15px rgba(120,80,140,0.3)',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -45%)',
          width: 120, height: 120, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #FFE4D2 0%, #E5B89A 60%, #C9956F 100%)',
          boxShadow: 'inset -8px -12px 20px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.15)'
        }}></div>
        <div style={{
          position: 'absolute', bottom: 16, left: 16, right: 16,
          padding: 10, background: 'rgba(255,255,255,0.7)', borderRadius: 10,
          backdropFilter: 'blur(10px)',
          display: 'flex', gap: 6
        }}>
          {[0, 1, 2, 3, 4].map((i) =>
          <div key={i} style={{ flex: 1, height: 24, borderRadius: 6, background: i === 2 ? '#1F1A24' : 'rgba(31,26,36,0.1)' }}></div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[0, 1, 2, 3, 4].map((i) =>
        <div key={i} style={{
          width: 56, height: 56, borderRadius: 14,
          background: i % 2 === 0 ? `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` : 'rgba(255,255,255,0.7)',
          border: i === 2 ? `2px solid #1F1A24` : '1px solid rgba(31,26,36,0.08)',
          boxShadow: '0 4px 12px rgba(120,80,140,0.1)'
        }}></div>
        )}
      </div>
    </div>);

}

function GifMock({ media, variant = '' }) {
  const isVideo = /\.(mp4|mov|webm)$/i.test(media);
  // First-frame poster sits next to the video (media/<basename>-poster.png).
  // Shown until the
  // video starts playing, and acts as a fallback on mobile browsers that
  // block autoplay.
  const poster = isVideo ? `${media.replace(/\.(mp4|mov|webm)$/i, '-poster.png')}` : undefined;
  return (
    <div className={`gif-mock ${variant}`.trim()}>
      <div className="gif-notch"></div>
      <div className="gif-screen">
        {isVideo ? (
          <video
            src={media}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <img src={media} alt="" />
        )}
      </div>
    </div>);

}

function DuoMock({ media, media2 }) {
  return (
    <div className="duo-mock">
      <GifMock media={media2} variant="duo-item duo-item-a" />
      <GifMock media={media} variant="duo-item duo-item-b" />
    </div>);

}

function DiagramMock({ media }) {
  return (
    <div className="diagram-mock">
      <img src={media} alt="" />
    </div>);

}

// Shared phone — black bezel + screen. The recordings already include the iOS
// status bar + dynamic island, so we DON'T draw a notch (that produced a double
// notch). The poster still sits under the video; the video fades in on hover.
function CreativeScreen({ m, vidRef }) {
  const isVideo = /\.(mp4|mov|webm)$/i.test(m);
  const poster = isVideo ? `${m.replace(/\.(mp4|mov|webm)$/i, '-poster.png')}` : undefined;
  return (
    <div className="creative-screen">
      {isVideo ? (
        <React.Fragment>
          <img className="creative-still" src={poster} alt="" />
          <video className="creative-vid" ref={vidRef} src={m} muted loop playsInline preload="none" />
        </React.Fragment>
      ) : (
        <img src={m} alt="" />
      )}
    </div>);

}

// Per-phone tilts for the casual "scatter" layout — varied rotateY (perspective),
// rotateZ (in-plane lean) and vertical offset, in mixed directions, so the four
// phones read as casually placed rather than a uniform row.
const CREATIVE_SCATTER = [
  { ry: 12, rz: -5, dy: 26 },
  { ry: -9, rz: 4, dy: -28 },
  { ry: 11, rz: -4, dy: 14 },
  { ry: -13, rz: 6, dy: -12 },
];

// Upright row (subtle perspective fan) and scatter (casual mixed tilts), project
// 07 default. Hover plays the video IN PLACE — the phone straightens and lifts a
// touch but never relocates, so the cursor stays on it (no "flying around").
function CreativesRow({ items, variant }) {
  const vids = React.useRef([]);
  const play = (i) => { const v = vids.current[i]; if (v && v.play) v.play().catch(() => {}); };
  const pause = (i) => { const v = vids.current[i]; if (v && v.pause) { v.pause(); v.currentTime = 0; } };
  const n = items.length;
  return (
    <div className={`creatives-row ${variant}`}>
      {items.map((m, i) => {
        let vars;
        if (variant === 'scatter') {
          const s = CREATIVE_SCATTER[i % CREATIVE_SCATTER.length];
          vars = { '--ry': s.ry + 'deg', '--rz': s.rz + 'deg', '--dy': s.dy + 'px' };
        } else {
          const t = i - (n - 1) / 2;          // signed distance from centre
          vars = { '--ry': (-t * 9) + 'deg', '--rz': '0deg', '--dy': '0px' };
        }
        return (
          <div
            key={i}
            className="creative-phone"
            style={vars}
            onMouseEnter={() => play(i)}
            onMouseLeave={() => pause(i)}>
            
            <CreativeScreen m={m} vidRef={(el) => vids.current[i] = el} />
          </div>);

      })}
    </div>);

}

// Project 07 entry point — always the casual "scatter" layout. Shows the four
// feature clips: avatar-hook & VTON first (not used elsewhere), then
// logo-whisperer & de-template.
function CreativesMock({ media }) {
  const items = Array.isArray(media) ? media : [media];
  const ORDER = [4, 5, 2, 3];
  const four = ORDER.every((i) => items[i]) ? ORDER.map((i) => items[i]) : items.slice(0, 4);
  return <CreativesRow items={four} variant="scatter" />;
}

function VideoMock({ media }) {
  const poster = `${media.replace(/\.(mp4|mov|webm)$/i, '-poster.png')}`;
  return (
    <div className="laptop-mock">
      <div className="laptop-lid">
        <div className="laptop-camera"></div>
        <div className="laptop-screen">
          <video
            src={media}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </div>
      <div className="laptop-hinge"></div>
      <div className="laptop-base"></div>
    </div>);

}

function ProjectMock({ project }) {
  const { type, accent, media } = project;
  return (
    <div className="proj-mock">
      {type === 'phone' && <PhoneMock accent={accent} />}
      {type === 'stack' && <StackMock accent={accent} />}
      {type === 'split' && <SplitMock accent={accent} />}
      {type === 'avatar' && <AvatarMock accent={accent} />}
      {type === 'gif' && <GifMock media={media} />}
      {type === 'duo' && <DuoMock media={media} media2={project.media2} />}
      {type === 'diagram' && <DiagramMock media={media} />}
      {type === 'video' && <VideoMock media={media} />}
      {type === 'creatives' && <CreativesMock media={media} />}
    </div>);

}

Object.assign(window, { MeshBG, TopNav, Marquee, ProjectMock, GifMock, VideoMock, DuoMock, DiagramMock, CreativesMock });