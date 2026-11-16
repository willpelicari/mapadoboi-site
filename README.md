# mapadoboi.wiltonpelicari.com

The Mapa do Boi website, served as-is by GitHub Pages from `main` (no build step here).

- Landing pages (`index.html`, `en/`, `fr/`, `privacy/`, `support/`, `anuncie/`) are edited by hand here.
- `cut/`, `en/cut/`, `fr/cut/`, `sitemap.xml` and `.well-known/` come from `python3 tools/build_site.py` in the MapaDoBoi repo.
- `app/` is the web app: in `MapaDoBoi/mobile`, run
  `WEB_BASE_URL=/app npx expo export --platform web --output-dir ../../mapadoboi-site/app`,
  then move `app/404.html` to `404.html` here (it is the whole site's 404 page and sends app deep links back through `?/path`).
- `.nojekyll` must stay, or Pages drops `_expo/` and `.well-known/`.
- `analytics.js` is a copy of the one on www.wiltonpelicari.com.

The old address, www.wiltonpelicari.com/mapadoboi/..., redirects here.
