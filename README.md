# sites

Personal static sites, hosted at [sites.eliandor.com](https://sites.eliandor.com).

## Structure

```
components/   shared HTML/CSS/JS snippets (hero, map, table, …)
sites/        one directory per site
```

Each site is a self-contained `index.html`. Data is kept in JSON files alongside the HTML and fetched at runtime — no build step.

## Adding a site

1. Create `sites/<name>/index.html`.
2. Pull in whatever components you need from `components/`.
3. Push to `main` — GitHub Pages deploys automatically.

## Stack

- [Tailwind CSS](https://tailwindcss.com) via CDN
- [Leaflet](https://leafletjs.com) for maps
- [Material Symbols](https://fonts.google.com/icons) for icons
- Vanilla JS for data rendering
