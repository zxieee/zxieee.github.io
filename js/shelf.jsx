// ===== Shelf data =====
const SHELF_TABS = {
  books: {
    label: 'Books',
    items: [
    // Craft — Design & Art
    { title: 'Designing Design', author: 'Kenya Hara', year: '2007', cover: 'https://images-na.ssl-images-amazon.com/images/P/303778105X.01.LZZZZZZZ.jpg', amazon: 'https://www.amazon.com/dp/303778105X', tone: ['#FBF8F5', '#1F1A24', '#B85C42'] },
    { title: 'Steal Like an Artist', author: 'Austin Kleon', year: '2012', cover: 'assets/books/steal-like-an-artist.jpg', amazon: 'https://www.amazon.com/dp/0761169253', tone: ['#FBF8F5', '#1F1A24', '#FF8A9B'] },

    // Mind — Psychology & Behavior
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: '2011', cover: 'assets/books/thinking-fast-and-slow.jpg', amazon: 'https://www.amazon.com/dp/0374533555', tone: ['#FBF8F5', '#1F1A24', '#FF8A9B'] },
    { title: 'Hooked: How to Build Habit-Forming Products', author: 'Nir Eyal', year: '2014', cover: 'assets/books/hooked.jpg', amazon: 'https://www.amazon.com/dp/1591847788', tone: ['#1F2D3D', '#FF6B5C', '#FBF8F5'] },
    { title: 'The Willpower Instinct', author: 'Kelly McGonigal', year: '2011', cover: 'https://images-na.ssl-images-amazon.com/images/P/1583335080.01.LZZZZZZZ.jpg', amazon: 'https://www.amazon.com/dp/1583335080', tone: ['#FFFAF0', '#FF8A6B', '#1F1A24'] },
    { title: 'The Courage to Be Disliked', author: 'Ichiro Kishimi & Fumitake Koga', year: '2013', cover: 'assets/books/courage-to-be-disliked.jpg', amazon: 'https://www.amazon.com/dp/1501197274', tone: ['#1F1A24', '#FF8A6B', '#FBF8F5'] },

    // Stories — Fiction
    { title: '1Q84', author: 'Haruki Murakami', year: '2009', cover: 'assets/books/1q84.jpg', amazon: 'https://www.amazon.com/dp/0307476464', tone: ['#0F2540', '#A38C5A', '#FFC2D4'] },
    { title: 'The Three-Body Problem', author: 'Liu Cixin', year: '2008', cover: 'assets/books/three-body-problem.jpg', amazon: 'https://www.amazon.com/dp/0765382032', tone: ['#0F2540', '#FF6B5C', '#1F1A24'] },
    { title: 'And Then There Were None', author: 'Agatha Christie', year: '1939', cover: 'https://images-na.ssl-images-amazon.com/images/P/0062073486.01.LZZZZZZZ.jpg', amazon: 'https://www.amazon.com/dp/0062073486', tone: ['#1F1A24', '#B85C42', '#F1EAD8'] },

    // World — Philosophy, Society & Life
    { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', year: '2011', cover: 'assets/books/sapiens.jpg', amazon: 'https://www.amazon.com/dp/0062316095', tone: ['#FBF8F5', '#1F1A24', '#B85C42'] },
    { title: 'Work, Consumerism and the New Poor', author: 'Zygmunt Bauman', year: '1998', cover: 'assets/books/work-consumerism-new-poor.jpg', amazon: 'https://www.amazon.com/dp/B00EQM23WG', tone: ['#5A1A2A', '#A38C5A', '#1F1A24'] },
    { title: 'The Wisdom of Life', author: 'Arthur Schopenhauer', year: '1851', cover: 'https://images-na.ssl-images-amazon.com/images/P/0486435504.01.LZZZZZZZ.jpg', amazon: 'https://www.amazon.com/dp/0486435504', tone: ['#3F2F1A', '#A38C5A', '#F1EAD8'] },
    { title: 'Principles: Life and Work', author: 'Ray Dalio', year: '2017', cover: 'assets/books/principles.jpg', amazon: 'https://www.amazon.com/dp/1501124021', tone: ['#1F1A24', '#FBF8F5', '#C8A852'] },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', year: '1976', cover: 'https://images-na.ssl-images-amazon.com/images/P/0198788606.01.LZZZZZZZ.jpg', amazon: 'https://www.amazon.com/dp/0198788606', tone: ['#1F1A24', '#C8A852', '#FBF8F5'] },

    // Non-English originals — grouped at the end
    { title: 'Is Art Really Useless?', author: 'Kowa Kiwa & Sanpuku Shun-en', year: '2021', cover: 'https://images-na.ssl-images-amazon.com/images/P/4761274891.09.LZZZZZZZ.jpg', amazon: 'https://www.amazon.co.jp/dp/4761274891', tone: ['#F1EAD8', '#B85C42', '#3F2F1A'] },
    { title: 'Houses With a Story', author: 'Yoshida Seiji', year: '2023', cover: 'assets/books/houses-with-a-story.jpg', amazon: 'https://www.amazon.com/dp/475625358X', tone: ['#1F3A2A', '#A38C5A', '#F1EAD8'] },
    { title: 'The Maverick Pig', author: 'Wang Xiaobo', year: '2025', cover: 'https://cdn.penguin.co.uk/dam-assets/books/9780241747315/9780241747315-jacket-large.jpg', amazon: 'https://www.amazon.com/dp/0241747317', tone: ['#FBF8F5', '#FF8A9B', '#1F1A24'] },
    { title: 'A Brief Stay on the Branches of the World', author: 'Li Yinhe', year: '2022', cover: 'assets/books/brief-stay-orange.png', amazon: 'https://www.amazon.com/dp/7530220454', tone: ['#F1EAD8', '#5A8AC8', '#1F3A2A'] }]

  },
  games: {
    label: 'Games',
    items: [
    { title: "Baldur's Gate 3", author: 'Larian Studios', year: '2023', cover: 'assets/games/baldurs-gate-3.jpg', amazon: 'https://en.wikipedia.org/wiki/Baldur%27s_Gate_3', tone: ['#1F1A24', '#B85C42', '#C8A852'] },
    { title: 'Hogwarts Legacy', author: 'Avalanche Software', year: '2023', cover: 'assets/games/hogwarts-legacy.png', amazon: 'https://en.wikipedia.org/wiki/Hogwarts_Legacy', tone: ['#1F1A24', '#A36A2A', '#3F2F1A'] },
    { title: 'The Legend of Zelda: Tears of the Kingdom', author: 'Nintendo', year: '2023', cover: 'assets/games/zelda-totk.jpg', amazon: 'https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Tears_of_the_Kingdom', tone: ['#1F1A24', '#C8A852', '#5A8AC8'] },
    { title: 'Animal Crossing: New Horizons', author: 'Nintendo', year: '2020', cover: 'assets/games/animal-crossing-nh.jpg', amazon: 'https://en.wikipedia.org/wiki/Animal_Crossing:_New_Horizons', tone: ['#FFD4B8', '#5A8AC8', '#1F3A2A'] },
    { title: 'Pokémon Pokopia', author: 'Koei Tecmo / Nintendo', year: '2026', cover: 'assets/games/pokemon-pokopia.png', amazon: 'https://en.wikipedia.org/wiki/Pok%C3%A9mon_Pokopia', tone: ['#FFD4B8', '#FF8A6B', '#1F1A24'] },
    { title: 'Pokémon Legends: Z-A', author: 'Game Freak', year: '2025', cover: 'assets/games/pokemon-legends-za.png', amazon: 'https://en.wikipedia.org/wiki/Pok%C3%A9mon_Legends:_Z-A', tone: ['#1F2D3D', '#C8A852', '#FBF8F5'] },
    { title: 'Pokémon Violet', author: 'Game Freak', year: '2022', cover: 'assets/games/pokemon-violet.png', amazon: 'https://en.wikipedia.org/wiki/Pok%C3%A9mon_Scarlet_and_Violet', tone: ['#3F1F4F', '#C896F0', '#1F1A24'] },
    { title: 'Pokémon Legends: Arceus', author: 'Game Freak', year: '2022', cover: 'assets/games/pokemon-legends-arceus.jpg', amazon: 'https://en.wikipedia.org/wiki/Pok%C3%A9mon_Legends:_Arceus', tone: ['#1F3A4F', '#C8A852', '#FBF8F5'] },
    { title: 'Story of Seasons: Grand Bazaar', author: 'Marvelous', year: '2025', cover: 'assets/games/sos-grand-bazaar-cover.png', amazon: 'https://www.nintendo.com/us/store/products/story-of-seasons-grand-bazaar-switch/', tone: ['#FFD4B8', '#FF8A6B', '#1F3A2A'] },
    { title: 'Story of Seasons: Friends of Mineral Town', author: 'Marvelous', year: '2020', cover: 'assets/games/sos-fomt-cover.jpg', amazon: 'https://www.nintendo.com/us/store/products/story-of-seasons-friends-of-mineral-town-switch/', tone: ['#FBF8F5', '#FF8A6B', '#1F3A2A'] },
    { title: 'Rune Factory: Guardians of Azuma', author: 'Marvelous', year: '2025', cover: 'assets/games/rune-factory-azuma-steam.jpg', amazon: 'https://en.wikipedia.org/wiki/Rune_Factory:_Guardians_of_Azuma', tone: ['#5A1A2A', '#C8A852', '#1F1A24'] },
    { title: 'Rune Factory 4', author: 'Marvelous', year: '2012', cover: 'assets/games/rune-factory-4.jpg', amazon: 'https://en.wikipedia.org/wiki/Rune_Factory_4', tone: ['#1F3A2A', '#FF8A9B', '#F4D9A0'] }]

  },
  sketchbook: {
    label: 'Sketchbook',
    items: [
    { title: 'London, United Kingdom', author: 'Mar 24, 2025', tone: ['#FBF8F5', '#A38C5A', '#1F1A24'] },
    { title: 'Lisbon, Portugal', author: 'Oct 12, 2024', tone: ['#FFD4B8', '#A38C5A', '#1F1A24'] },
    { title: 'Kyoto, Japan', author: 'Apr 03, 2024', tone: ['#F1EAD8', '#A38C5A', '#3F2F1A'] },
    { title: 'Mountain View, CA', author: 'Jan 15, 2024', tone: ['#FBF8F5', '#A38C5A', '#1F1A24'] },
    { title: 'Reykjavík, Iceland', author: 'Aug 22, 2023', tone: ['#E8E0D0', '#A38C5A', '#1F1A24'] },
    { title: 'Mexico City, Mexico', author: 'Jun 11, 2023', tone: ['#FFC2D4', '#FF8A6B', '#5A2E1F'] },
    { title: 'Hanoi, Vietnam', author: 'Feb 04, 2023', tone: ['#F4D9A0', '#1F3A2A', '#5A2E1F'] },
    { title: 'Marrakech, Morocco', author: 'Nov 18, 2022', tone: ['#FFB088', '#B85C42', '#3F2F1A'] },
    { title: 'Bergen, Norway', author: 'Aug 02, 2022', tone: ['#E8E0D0', '#5A8AC8', '#1F2D3D'] },
    { title: 'Taipei, Taiwan', author: 'May 21, 2022', tone: ['#FBF8F5', '#FF8A9B', '#1F1A24'] },
    { title: 'Oaxaca, Mexico', author: 'Jan 09, 2022', tone: ['#FFD4B8', '#B85C42', '#1F1A24'] },
    { title: 'Big Sur, CA', author: 'Sep 12, 2021', tone: ['#1F3A4F', '#FFB088', '#F1EAD8'] }]

  }
};

function ShelfGrid({ items, CardComponent }) {
  return (
    <div className="shelf-grid-wrap">
      <div className="shelf-grid-scroll" style={{ padding: "36px 40px 48px 20px" }}>
        {items.map((it, i) => <CardComponent key={i} item={it} />)}
      </div>
    </div>);

}

function BookCard({ item }) {
  const [c1, c2, c3] = item.tone;
  const [imgFailed, setImgFailed] = React.useState(false);
  const overlay =
  <div className="book-hover-overlay">
      <div className="bh-title">{item.title}</div>
      <div className="bh-author">{item.author}</div>
    </div>;


  const inner = item.cover && !imgFailed ?
  <div className="book-cover-img" style={{ background: `linear-gradient(155deg, ${c1} 0%, ${c2} 100%)` }}>
      <img
      src={item.cover}
      alt={`${item.title} cover`}
      draggable="false"
      onError={() => setImgFailed(true)}
      onLoad={(e) => {
        // Amazon serves a 1×1 placeholder when an ISBN has no jacket on file.
        // Treat that (or anything implausibly tiny) as a load failure so we
        // fall back to the typographic mock cover.
        const img = e.currentTarget;
        if (img.naturalWidth < 20 || img.naturalHeight < 20) setImgFailed(true);
      }} />
    
      {overlay}
    </div> :

  <div className="book-cover-mock" style={{ background: `linear-gradient(155deg, ${c1} 0%, ${c1} 60%, ${c2} 100%)` }}>
      <div className="cover-art" style={{ background: `radial-gradient(ellipse at 40% 35%, ${c2} 0%, transparent 60%), linear-gradient(180deg, transparent 50%, ${c3} 100%)` }}></div>
      <div className="cover-meta">
        <div className="ct" style={{ fontSize: "12px" }}>{item.title}</div>
        <div className="ca" style={{ fontSize: "8px" }}>{item.author}</div>
      </div>
      {overlay}
    </div>;


  const linkLabel = item.amazon ?
  item.amazon.includes('wikipedia.org') ? ' · view on Wikipedia' :
  item.amazon.includes('amazon.') ? ' · view on Amazon' : ' · learn more' :
  '';
  const title = `${item.title} — ${item.author}${linkLabel}`;

  if (item.amazon) {
    return (
      <a
        className="book-card"
        href={item.amazon}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="read"
        title={title}>
        {inner}
      </a>);
  }

  return (
    <div className="book-card" data-cursor="read" title={title}>
      {inner}
    </div>);

}

function SketchCard({ item }) {
  const [c1,, c3] = item.tone;
  return (
    <div className="sketch-card-v2" data-cursor="open" title={`${item.title} — ${item.author}`}>
      <div className="sketchbook-mini" style={{ background: `linear-gradient(135deg, ${c1} 0%, #F4ECD8 100%)` }}>
        <div className="sk-doodle" style={{ borderColor: c3 }}></div>
        <div className="sk-stamp" style={{ color: c3 }}>{item.title.split(',')[0]}</div>
      </div>
    </div>);

}

function ShelfTabContent({ tabKey }) {
  const tab = SHELF_TABS[tabKey];
  if (tabKey === 'sketchbook') {
    return <ShelfGrid items={tab.items} CardComponent={SketchCard} />;
  }
  return <ShelfGrid items={tab.items} CardComponent={BookCard} />;
}

function Shelf() {
  const [tab, setTab] = React.useState('books');
  const tabs = Object.keys(SHELF_TABS);

  return (
    <section className="shelf-section" id="about">
      <div className="shelf-layout">
        <aside className="shelf-nav">
          <div className="nav-section">ON MY SHELF</div>
          <div className="shelf-nav-tabs">
            {tabs.map((k, i) =>
            <button
              key={k}
              className={`item ${tab === k ? 'active' : ''}`}
              onClick={() => setTab(k)}>

                <span className="bar"></span>
                <span className="num">0{i + 1}</span>
                <span>{SHELF_TABS[k].label}</span>
              </button>
            )}
          </div>
        </aside>

        <div className="shelf-content">
          <ShelfTabContent tabKey={tab} />
        </div>
      </div>
    </section>);

}

// ==== Footer greeting pool =====
// Curated phrases rotated per page load. Each entry can be gated by:
//   h: [start, end]  hour range (end >= 24 wraps past midnight)
//   d: ['Mon', ...]  day-of-week
//   w: ['rain', ...] weather category (sun/cloud/rain/snow/storm/fog/night)
// Placeholders {time} {weather} {day} {location} get interpolated at pick
// time. Groups: A time-of-day, B weather-tinted, C activity, F day-of-week.
const FOOTER_GREETINGS = [
  // A — time-of-day grounded
  { t: "Late afternoon in {location} 🌅 — Angela's at her desk, {time}.", h: [14, 18] },
  { t: "Evening in {location}, {time}. Angela's watching the light go soft 🕯️", h: [17, 21] },
  { t: "{time} in {location} — Angela's still up, thanks for stopping by 🌙", h: [21, 29] },
  { t: "It's {time} in {location}, Angela is probably still drawing ✏️" },
  // B — weather-tinted (gated by real weather)
  { t: "Sweater weather in {location} {weather} cozy hours — Angela's bundled up, {time}.", w: ['cloud', 'rain', 'snow', 'fog'] },
  { t: "Sun's out, screens dim ☀️ — {location}, {time}, Angela's squinting.", h: [6, 18], w: ['sun'] },
  { t: "Rainy day kind of mood 🌧️ {location}, {time} — Angela's reading by the window.", w: ['rain', 'storm'] },
  { t: "Cloudy with a chance of pixels ☁️ {time} in {location} — Angela's pushing them.", w: ['cloud', 'fog'] },
  // C — activity / status
  { t: "{time} in {location}. Angela is currently sketching, sipping, maybe procrastinating 🎨" },
  { t: "{location}, {time} — Angela is probably making something she'll redo tomorrow 🔁" },
  { t: "Reading more than designing today 📖 — Angela's deep in a book in {location}, {time}." },
  { t: "Listening to lo-fi 🎧 + caffeinating in {location}, {time} — Angela's in the zone." },
  // F — day-of-week aware
  { t: "{day} kind of energy ✨ — {time} in {location}, Angela's riding it." },
  { t: "Mid-week magic ✨ — {time} in {location}, Angela's chasing it.", d: ['Tue', 'Wed', 'Thu'] },
  { t: "Friday energy 🎉 — {time} in {location}, Angela's signing off.", d: ['Fri'] }
];

// Map the live weather glyph (from Open-Meteo) to a category used by phrase
// filters. Returns null while weather hasn't loaded so weather-gated phrases
// are excluded on the first pick (they only appear after we confirm reality).
function weatherCategory(glyph) {
  if (!glyph) return null;
  if (glyph === '☀️' || glyph === '🌤️') return 'sun';
  if (glyph === '⛅' || glyph === '☁️') return 'cloud';
  if (glyph === '🌫️') return 'fog';
  if (glyph === '🌦️' || glyph === '🌧️') return 'rain';
  if (glyph === '🌨️') return 'snow';
  if (glyph === '⛈️') return 'storm';
  // Moon phases or generic moon — night, treat as "clear" for filter purposes.
  if (['🌙', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'].includes(glyph)) return 'night';
  return null;
}

function pickFooterGreeting(now, weatherGlyph, visitorCity) {
  const hour = now.getHours();
  const dayShort = now.toLocaleDateString('en-US', { weekday: 'short' });
  const dayFull = now.toLocaleDateString('en-US', { weekday: 'long' });
  const cat = weatherCategory(weatherGlyph);
  const inRange = (start, end) => {
    // end >= 24 means the window wraps past midnight (e.g. [21, 29] = 9pm–5am).
    if (end >= 24) return hour >= start || hour < (end - 24);
    return hour >= start && hour < end;
  };
  // Skip visitor-aware phrases when the visitor is local (same city as me).
  const hasVisitor = visitorCity && visitorCity.toLowerCase() !== 'mountain view';
  const pool = FOOTER_GREETINGS.filter(p => {
    if (p.h && !inRange(p.h[0], p.h[1])) return false;
    if (p.d && !p.d.includes(dayShort)) return false;
    if (p.w && (!cat || !p.w.includes(cat))) return false;
    if (p.v && !hasVisitor) return false;
    return true;
  });
  // Index 3 ("It's {time}... Angela is probably still drawing") is
  // unconstrained, so it's always a safe fallback.
  const pick = pool[Math.floor(Math.random() * pool.length)] || FOOTER_GREETINGS[3];
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return pick.t
    .replace('{time}', time)
    .replace('{weather}', weatherGlyph)
    .replace('{day}', dayFull)
    .replace('{location}', 'California')
    .replace('{visitorCity}', visitorCity || 'somewhere out there');
}

function Footer() {
  const [time, setTime] = React.useState('');
  const [glyph, setGlyph] = React.useState('☀️');
  const [weatherLoaded, setWeatherLoaded] = React.useState(false);
  const [visitorCity, setVisitorCity] = React.useState(null);
  const [visitorChecked, setVisitorChecked] = React.useState(false);
  const [greeting, setGreeting] = React.useState('');
  const lastUpdated = React.useMemo(() => {
    const d = new Date(document.lastModified || Date.now());
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, []);

  React.useEffect(() => {
    // Mountain View, CA — Open-Meteo current weather (no key, supports CORS)
    const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=37.3861&longitude=-122.0839&current=weather_code,is_day&daily=sunrise,sunset&timezone=America%2FLos_Angeles';

    // Map WMO weather codes -> day glyph & night glyph.
    // https://open-meteo.com/en/docs#weather_variable_documentation
    const codeToGlyphs = (code) => {
      // [day, night]
      if (code === 0) return ['☀️', '🌙']; // Clear
      if (code === 1) return ['🌤️', '🌙']; // Mainly clear
      if (code === 2) return ['⛅', '☁️']; // Partly cloudy
      if (code === 3) return ['☁️', '☁️']; // Overcast
      if (code === 45 || code === 48) return ['🌫️', '🌫️']; // Fog
      if (code >= 51 && code <= 57) return ['🌦️', '🌧️']; // Drizzle
      if (code >= 61 && code <= 67) return ['🌧️', '🌧️']; // Rain
      if (code >= 71 && code <= 77) return ['🌨️', '🌨️']; // Snow
      if (code >= 80 && code <= 82) return ['🌧️', '🌧️']; // Rain showers
      if (code >= 85 && code <= 86) return ['🌨️', '🌨️']; // Snow showers
      if (code === 95) return ['⛈️', '⛈️']; // Thunderstorm
      if (code === 96 || code === 99) return ['⛈️', '⛈️']; // Thunderstorm w/ hail
      return ['☀️', '🌙'];
    };

    // Moon-phase fallback for clear nights — pick a phase emoji from current date.
    const moonPhaseGlyph = () => {
      // Conway-style moon phase approximation
      const d = new Date();
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const day = d.getDate();
      let r = y % 100;
      r %= 19;
      if (r > 9) r -= 19;
      r = r * 11 % 30 + (m < 3 ? m + 12 : m) + day;
      if (m < 3) r -= 2;
      r -= (y < 2000 ? 4 : 8.3) | 0;
      const phase = (r % 30 + 30) % 30; // 0..29.99
      const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
      return phases[Math.floor(phase / 30 * 8) % 8];
    };

    const updateTime = () => {
      const t = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: '2-digit'
      });
      setTime(t);
    };

    // Local-time fallback: anything from ~30min before typical sunset to dawn is night.
    // Used only if the weather API fails. Conservative so 7:57pm reads as night.
    const localIsNight = () => {
      const hour = parseInt(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', hour12: false }), 10);
      return hour >= 19 || hour < 6;
    };

    const updateWeather = async () => {
      try {
        const res = await fetch(WEATHER_URL);
        const json = await res.json();
        const c = json && json.current;
        if (!c) throw new Error('no current');

        // Determine day/night from actual sunrise/sunset when available, else is_day flag.
        let isDay = !!c.is_day;
        const daily = json.daily;
        if (daily && Array.isArray(daily.sunrise) && Array.isArray(daily.sunset) && daily.sunrise[0] && daily.sunset[0]) {
          // Open-Meteo returns local-time ISO strings (no offset) when timezone is set.
          const now = Date.parse(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
          const sunrise = Date.parse(new Date(daily.sunrise[0]).toLocaleString('en-US'));
          const sunset = Date.parse(new Date(daily.sunset[0]).toLocaleString('en-US'));
          if (!Number.isNaN(now) && !Number.isNaN(sunrise) && !Number.isNaN(sunset)) {
            isDay = now >= sunrise && now < sunset;
          }
        }

        if (!isDay) {
          // Clear-ish night ⇒ moon phase. Cloudy/rainy night ⇒ weather glyph.
          if (c.weather_code === 0 || c.weather_code === 1) {
            setGlyph(moonPhaseGlyph());
          } else {
            const [, nightG] = codeToGlyphs(c.weather_code);
            setGlyph(nightG);
          }
        } else {
          const [dayG] = codeToGlyphs(c.weather_code);
          setGlyph(dayG);
        }
        setWeatherLoaded(true);
      } catch (_) {
        setGlyph(localIsNight() ? moonPhaseGlyph() : '☀️');
      }
    };

    updateTime();
    updateWeather();
    const tId = setInterval(updateTime, 30 * 1000);
    // Refresh weather every 15 minutes
    const wId = setInterval(updateWeather, 15 * 60 * 1000);
    return () => {
      clearInterval(tId);
      clearInterval(wId);
    };
  }, []);

  // Look up the visitor's city via free IP-geolocation (no key, CORS-friendly).
  // Fails silently — if the API errors or times out, visitor-aware phrases
  // simply don't get picked. Runs once per page load.
  React.useEffect(() => {
    let cancelled = false;
    const FALLBACK_TIMEOUT = 4000;
    const timer = setTimeout(() => {
      if (!cancelled) setVisitorChecked(true);
    }, FALLBACK_TIMEOUT);
    fetch('https://ipapi.co/json/')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (cancelled) return;
        clearTimeout(timer);
        if (data && data.city && !data.error) setVisitorCity(data.city);
        setVisitorChecked(true);
      })
      .catch(() => {
        if (!cancelled) {
          clearTimeout(timer);
          setVisitorChecked(true);
        }
      });
    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  // Pick a cute greeting once per page load. We delay freezing until both the
  // weather AND visitor lookups have settled (success or timeout), so the
  // final phrase can use whichever data made it back in time. Subsequent
  // refreshes never re-roll the message.
  const greetingFrozenRef = React.useRef(false);
  React.useEffect(() => {
    if (greetingFrozenRef.current) return;
    const realGlyph = weatherLoaded ? glyph : null;
    setGreeting(pickFooterGreeting(new Date(), realGlyph, visitorCity));
    if (weatherLoaded && visitorChecked) greetingFrozenRef.current = true;
  }, [glyph, weatherLoaded, visitorCity, visitorChecked]);

  return (
    <footer className="footer" id="contact">
      <div className="footer-row" style={{ alignItems: "flex-start", margin: "0px 60px 0px 0px" }}>
        <div className="footer-left">
          <div className="f-name" style={{ fontSize: "24px" }}>
            {visitorCity
              ? (visitorCity.toLowerCase() === 'mountain view'
                  ? <>Hello, <em style={{ fontStyle: 'italic' }}>neighbor</em>.</>
                  : <>Hello, you from <em style={{ fontStyle: 'italic' }}>{visitorCity}</em>.</>)
              : 'Hello, friend.'}
          </div>
          <div className="f-meta">
            <span>{greeting || `It is ${time} ${glyph} @ Mountain View, CA`}</span>
          </div>
          <div className="f-meta f-built">
            <span className="f-built-stamp">Last update {lastUpdated}</span>
          </div>
        </div>
        <div className="footer-right">
          <a href="mailto:xzm1008@gmail.com" className="f-link">xzm1008@gmail.com</a>
          <a href="https://www.linkedin.com/in/angela-zhongmin-xie/" target="_blank" rel="noopener noreferrer" className="f-link">LinkedIn</a>
          <a href="https://www.instagram.com/angelaaaxie/" target="_blank" rel="noopener noreferrer" className="f-link">Instagram</a>
        </div>
      </div>
    </footer>);

}

Object.assign(window, { Shelf, Footer, SHELF_TABS, ShelfGrid, BookCard, SketchCard });