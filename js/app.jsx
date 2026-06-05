// Locked-in design configuration. The Tweaks panel was removed for the
// deployed site; the values below are what the user committed to. If you ever
// want to tweak the look again, ask Claude to "bring back the Tweaks panel".
const LOCKED = {
  palette: 'dawn',
  meshIntensity: 100,
  grain: true,
  lightMode: true,
  fontMode: 'georgia-serif',
  cursorStyle: 'off',
  haloColor: 'plum',
  gifRotateZ: 0,
  gifBezel: 'black',
  frameStyle: 'bare',
  outlineColor: 'black',
  outlineOpacity: 100,
  hoverStyle: 'sunset',
  hoverBlur: 4,
  hoverOpacity: 50,
};

// Tree shadow — locked-in configuration. Was previously tweakable; user committed to this look.
const TREE_CONFIG = {
  enabled: true,
  version: 'canopy',
  tint: 'peach',
  opacity: 0.15,
  sway: 18,
  blur: 3,
  leafSize: 85,
};

// Book-cover hover overlay — locked to "Sunset gradient".
const HOVER_STYLE = {
  bg: 'linear-gradient(180deg, rgba(255,180,100,0.55) 0%, rgba(255,120,150,0.65) 55%, rgba(110,55,140,0.80) 100%)',
  fg: '#FFF8EE',
};

// Locked palette — "Dawn".
const PALETTE = {
  pink: '#FFB4B4', peach: '#FFCBA4', orange: '#FF9F70',
  lilac: '#E8C8F0', purple: '#C8A8E0', rose: '#FFB8C8',
};

// ===== Accent gradient — LOCKED =====
// Drives the .about-accent CSS class (the highlighted phrases inside the
// "Hi, I'm Angela" lead). Previously tweakable via the Tweaks panel; user
// committed to the values below. To experiment again, ask Claude to "bring
// back the accent gradient Tweaks panel".
const ACCENT_LOCKED = {
  // Wordmark stops — coral → pink → lilac → purple, same gradient as the
  // "Angela Xie" name and the footer.
  stops:  '#FF8A9B 0%, #FF9A6B 35%, #E8C8F0 70%, #C896F0 100%',
  // One angle per highlighted phrase (1st / 2nd / 3rd) so the three accents
  // don't read as identically stamped.
  angles: [284, 164, 72],
};

function App() {
  React.useEffect(() => {
    const root = document.documentElement;
    // Palette → CSS variables
    Object.entries(PALETTE).forEach(([k, v]) => root.style.setProperty(`--${k}`, v));
    // Light mode suppresses the mesh blobs entirely (white background look).
    document.querySelectorAll('.mesh-blob').forEach(b => b.style.opacity = 0);
    const grain = document.querySelector('.grain');
    if (grain) grain.style.display = 'none';
    // Toggle .light-mode on <html> — CSS rule overrides --bg to white and
    // swaps the wordmark gradient to use Dawn-palette stops.
    root.classList.add('light-mode');
    // Typography: Georgia serifs (Inter stays for body)
    root.classList.remove('font-mixed', 'font-georgia-serif', 'font-all-georgia');
    root.classList.add('font-georgia-serif');
    // Story end card — in-plane rotation locked to 0
    root.style.setProperty('--gif-rotate-z', '0deg');
    // Phone bezel — Midnight black
    root.style.setProperty('--gif-bezel', '#1A1620');
    root.style.setProperty('--gif-bezel-button', 'rgba(0,0,0,0.35)');
    // Card chrome — bare (no background or border)
    root.classList.remove('frame-chrome', 'frame-outline');
    root.classList.add('frame-bare');
    // Outline (no-op when bare, but set so any leftover ::before stays sane)
    root.classList.add('outline-black');
    root.style.setProperty('--frame-outline-alpha', '0.16');
    root.style.setProperty('--frame-outline-alpha-sunset', '1');
    // Book-cover hover overlay — Sunset gradient, 4px blur, 50% opacity
    root.style.setProperty('--bh-bg', HOVER_STYLE.bg);
    root.style.setProperty('--bh-fg', HOVER_STYLE.fg);
    root.style.setProperty('--bh-blur', 'blur(4px) saturate(110%)');
    root.style.setProperty('--bh-fill-alpha', '0.5');

    // Apply the locked accent gradient — three CSS variables, same color
    // stops with three different angles for visual variety.
    ACCENT_LOCKED.angles.forEach((deg, i) => {
      root.style.setProperty(`--accent-gradient-${i + 1}`, `linear-gradient(${deg}deg, ${ACCENT_LOCKED.stops})`);
    });
    root.style.setProperty('--accent-gradient', `linear-gradient(${ACCENT_LOCKED.angles[0]}deg, ${ACCENT_LOCKED.stops})`);
  }, []);

  return (
    <>
      <MeshBG />
      <main>
        {TREE_CONFIG.enabled && (
          <TreeShadow
            version={TREE_CONFIG.version}
            tint={TREE_CONFIG.tint}
            opacity={TREE_CONFIG.opacity}
            sway={TREE_CONFIG.sway}
            blur={TREE_CONFIG.blur}
            leafSize={TREE_CONFIG.leafSize}
          />
        )}
        <Hero />
        <Work />
        <BioSection />
        <Footer />
      </main>
      <Cursor style={LOCKED.cursorStyle} color={LOCKED.haloColor} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
