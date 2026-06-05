// ============================================================================
// TreeShadow — pre-baked tree-shadow photographs, rendered as a tall, full-
// width canopy that fades from dense at the top of the page to fully clear
// further down.
//
// Layout: the component lives at the top of <main>, positioned absolutely,
// spanning the full page width and extending past the hero. A CSS `mask-
// image` linear-gradient applies the vertical fade so the shadow lightens
// with scroll position (it's static — the gradient is baked into the layer's
// geometry, not driven by scroll events).
//
// Each version composes the leaf imagery differently:
//   • 'cascade' — image 1 paired with its pre-mirrored copy to fill the full
//                 width as a symmetric canopy (recommended)
//   • 'corner'  — image 1 anchored single-corner (original composition)
//   • 'canopy'  — image 1 scaled up to fill the hero from the left
//   • 'windy'   — image 2's streaky long-exposure look
//
// Two layers per version (back: bigger + blurred + slower sway; front: sharper
// + faster) create a parallax wind feel. The cascade version uses comma-
// separated background-images on each layer so a single sway transform moves
// both halves of the canopy in unison.
// ============================================================================

const VERSIONS = {
  // Default: image 3 — single copy zoomed large and anchored to the right
  // edge so the source photo's empty left margin is cropped off-screen on
  // the left. Negative Y offset crops the top empty band so leaves reach
  // the page's top edge with no padding.
  cascade: {
    file: 3,
    back: {
      images: ['SRC'],
      sizes: ['140% auto'],
      positions: ['right -8%'],
      opacity: 0.55,
      blur: 2.5,
    },
    front: {
      images: ['SRC'],
      sizes: ['135% auto'],
      positions: ['90% -18%'],
      opacity: 0.95,
      blur: 0,
    },
  },
  corner: {
    file: 1,
    back: {
      images: ['SRC'],
      sizes: ['150% auto'],
      // X 60%: shifts image left so source's leafy middle-right shows at the
      // page's left. Y 25%: leaves 25% of vertical overflow as top margin so
      // the sway transform's vertical swing doesn't expose the top edge.
      positions: ['60% 25%'],
      opacity: 0.55,
      blur: 2.5,
    },
    front: {
      images: ['SRC'],
      sizes: ['135% auto'],
      positions: ['55% 22%'],
      opacity: 1.0,
      blur: 0,
    },
  },
  canopy: {
    file: 1,
    back: {
      images: ['SRC'],
      sizes: ['115% auto'],
      positions: ['right -10%'],
      opacity: 0.55,
      blur: 3,
    },
    front: {
      images: ['SRC'],
      sizes: ['108% auto'],
      positions: ['90% -18%'],
      opacity: 0.95,
      blur: 0,
    },
  },
  windy: {
    file: 2,
    back: {
      images: ['SRC'],
      sizes: ['110% auto'],
      positions: ['left -8%'],
      opacity: 0.5,
      blur: 3,
    },
    front: {
      images: ['SRC'],
      sizes: ['100% auto'],
      positions: ['-10% -16%'],
      opacity: 0.95,
      blur: 0,
    },
  },
};

function TreeShadow({ tint = 'peach', opacity = 0.65, sway = 12, blur = 0, version = 'cascade', leafSize = 100 }) {
  const cfg = VERSIONS[version] || VERSIONS.cascade;
  const src = `assets/leaf-${tint}-${cfg.file}.png`;
  const mirror = `assets/leaf-${tint}-${cfg.file}-mirror.png`;
  const resolve = (token) => token === 'MIRROR' ? mirror : src;

  // Scale every percentage in the size string by leafSize/100, so the slider
  // shrinks/grows leaves uniformly across both layers.
  const scaleSize = (s) => s.replace(/([\d.]+)%/g, (_, n) => `${(parseFloat(n) * leafSize / 100).toFixed(1)}%`);

  const layerStyle = (lcfg) => ({
    // position + inset are set via the .ts-leaf-layer CSS rule so the layer
    // can grow beyond the wrap (inset: -15%) for sway-safe overflow.
    backgroundImage: lcfg.images.map((t) => `url(${resolve(t)})`).join(', '),
    backgroundSize: lcfg.sizes.map(scaleSize).join(', '),
    backgroundPosition: lcfg.positions.join(', '),
    backgroundRepeat: lcfg.images.map(() => 'no-repeat').join(', '),
    opacity: lcfg.opacity,
    filter: lcfg.blur ? `blur(${lcfg.blur}px)` : 'none',
  });

  return (
    <div
      className="tree-shadow"
      aria-hidden="true"
      style={{
        '--tree-opacity': opacity,
        '--tree-sway': `${sway}s`,
        '--tree-blur': `${blur}px`,
      }}>
      <div className="ts-leaf-layer ts-leaf-back" style={layerStyle(cfg.back)} />
      <div className="ts-leaf-layer ts-leaf-front" style={layerStyle(cfg.front)} />
    </div>);

}

window.TreeShadow = TreeShadow;
