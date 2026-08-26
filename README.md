# Chirag Kashyap — Portfolio

A single-page, scroll-driven 3D portfolio. Pure HTML/CSS/vanilla JS — **no build step, no dependencies, no framework**. Open `index.html` and it runs.

```
chirag-portfolio/
├── index.html
├── css/style.css
├── js/
│   ├── data.js          ← YOUR CONTENT: work samples + certificates
│   └── main.js
└── assets/
    ├── photos/          ← 1.jpg … 5.jpg   (the 3D scroll deck)
    ├── work/            ← sample screenshots
    └── certificates/    ← certificate scans
```

## Palette — clear white + soft blue

Every colour is a token in `:root` (`css/style.css`). Change one line, the whole site follows.

| Token | Value | Role |
|---|---|---|
| `--paper` | `#ffffff` | clear white base |
| `--paper-2` | `#f5f9fd` | faint blue wash (alternating sections) |
| `--paper-3` | `#eaf2fb` | soft blue panels, chips |
| `--wash` | `#dfebf9` | soothing blue tint |
| `--ink` | `#10233c` | deep navy body text (softer than black) |
| `--ink-2` / `--ink-3` | `#4a5f7a` / `#8397ae` | secondary / muted |
| `--accent` | `#3a75c4` | calm ocean blue |
| `--accent-2` | `#8ab6e8` | light bluish highlight |

Shadows are blue-tinted (`--shadow`) rather than grey, which is what keeps a white page from looking flat.

## Page structure

| # | Section | Notes |
|---|---|---|
| — | Hero | 3D letter entrance, rotating word cube, mouse-parallax plane |
| 01 | About | scroll-driven 3D photo deck + animated stats |
| 02 | Experience | progressive timeline fill |
| 03 | Selected work | 3 flagship projects, per-card 3D tilt |
| **04** | **Sample work** | **filterable gallery — WordPress / Shopify / Next.js / React** |
| 05 | Toolkit | skill matrix |
| **06** | **Certificates** | **image cards, click for full-size lightbox** |
| 07 | Education | |
| 08 | Contact | |

## Adding your samples — edit `js/data.js` only

The gallery, the filter chips **and their counts** are all generated from that one array at runtime. Add an entry:

```js
{
  title: 'Client Name — Storefront',
  category: 'shopify',              // wordpress | shopify | nextjs | react
  desc: 'One line about what you built.',
  tags: ['Liquid', 'Razorpay'],
  img: 'assets/work/shopify-1.jpg',
  url: 'https://example.com'        // '' hides the Visit button
}
```

Certificates work the same way via the `CERTIFICATES` array.

**Screenshots** go in `assets/work/` (16:10, ~1600×1000). **Certificate scans** go in `assets/certificates/` (any ratio; cards crop to 4:3, lightbox shows the full image). Each folder has a `README.txt` with the exact filenames currently expected.

Missing images degrade gracefully — soft blue placeholder cards with the category name — so nothing ever looks broken while you gather assets.

## Still to fill in

1. **Real names, descriptions and live URLs** for the 9 seeded work samples in `js/data.js` (currently "WordPress Sample 01" etc.).
2. **Screenshots** → `assets/work/`, **certificate scans** → `assets/certificates/`, **your photos** → `assets/photos/`.
3. **LinkedIn + GitHub URLs** — three `href="#"` placeholders marked `TODO` in the contact section of `index.html`.
4. Optional: an OG preview image (`<meta property="og:image">`) for link shares.

## Run locally

Double-click `index.html`, or serve it:

```powershell
python -m http.server 5173 --bind 0.0.0.0    # test on your phone at http://<your-lan-ip>:5173
npx serve .
```

## Deploy

**Vercel** — `npx vercel`, or drag the folder onto vercel.com/new.
**Netlify** — drag the folder onto app.netlify.com/drop.
Static site, no config needed either way.

## Tuning knobs

- Colours → `:root` in `css/style.css`.
- Scroll length of the photo deck → `.photos { height: 460vh }`. Longer = slower.
- Deck smoothing → `lerp(stackNow, stackTarget, 0.09)` in `js/main.js`. Lower = lazier.
- Card spacing/rotation → the `z / y / x / rY / rZ` numbers in `drawStack()`.
- Word-cube speed → the `2600` ms interval in `js/main.js`.
- Gallery tilt strength → `amp` in the tilt block (7° for gallery cards, 13° for featured).

## Accessibility

Respects `prefers-reduced-motion`: grain, cursor, deck animation and reveals switch off, and the photo deck flattens into a horizontal scroller so no content is lost. Lightbox closes on `Esc` or backdrop click.
