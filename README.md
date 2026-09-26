# N M Zarif Rahman — Portfolio

Personal portfolio site built with plain HTML/CSS/JS and GSAP for scroll animations. No build step required.

## Run locally

Open `index.html` directly in a browser, or serve it so relative paths behave exactly as in production:

```bash
npx serve .
# or
python -m http.server 8000
```

## Structure

- `index.html` — all page content and sections
- `css/style.css` — theme, layout, responsive rules
- `js/main.js` — nav behavior, scroll-spy, stat counters, case-study accordion, GSAP reveals
- `assets/` — profile photo and downloadable CV

## Deploy

Push to GitHub, then import the repo into [Vercel](https://vercel.com) (framework preset: "Other", no build command, output directory: root). Every push to `main` redeploys automatically.
