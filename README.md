# Angela Xie — Portfolio

A static single-page portfolio. No build step — JSX is transpiled in the browser
via Babel Standalone, so you can host the folder as-is on any static host.

## Deploy to GitHub Pages

1. Create a new GitHub repo and push the **contents of this folder** to the root
   (so `index.html` sits at the repo root).
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)** → Save
3. Wait ~1 min. Your site is live at `https://<you>.github.io/<repo>/`.

> For a custom domain (e.g. `angelaxie.com`), add it under Settings → Pages →
> Custom domain, and point a CNAME/ALIAS record at `<you>.github.io`.

## Notes

- **All assets are local** except book/game cover art, which loads from external
  CDNs (Amazon / publisher sites) — those need an internet connection to display.
- The site fetches live weather + visitor city from free public APIs for a small
  footer touch. These fail silently offline; nothing else depends on them.
- The password gate is **off** (`GATE_MODE = "off"` in `index.html`). To turn it
  on, set it to `"password"` and edit the `PASSWORD` constant nearby.

## Files

```
index.html        page shell + loading/gate logic
README.md         this file
css/
  main.css        all styles
js/
  *.jsx           React components (data, hero, work, about, shelf, bio, cursor, app, …)
media/
  *.mp4 / *.gif   project case-study videos
  *-poster.png    first-frame stills shown before each video plays
  *.png           static project images (mosaic, personalization graph)
assets/
  logo.png        wordmark / favicon
  angela-portrait.png
  leaf-peach-1*.png   tree-shadow canopy art
  books/ games/ sketches/   shelf cover art
```
