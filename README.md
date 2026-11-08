# The Dreamer's Journal

A React + TypeScript + Vite starter for a fantasy-themed digital art portfolio. It includes a closed illustrated cover, a CSS-based 3D hover effect, a two-page desktop reading layout, a single-page mobile layout, page navigation, artwork preview overlays, and editable sample content.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## Add your artwork

Create this folder:

```text
public/
  artworks/
    school-01.jpg
    school-02.jpg
    school-03.jpg
    school-04.jpg
    school-05.jpg
    school-06.jpg
    personal-01.jpg
    personal-02.jpg
    personal-03.jpg
```

Use those filenames or change the `file` values in `src/data/pages.ts`. If an image is not present, the portfolio displays a placeholder instead. You can use `.png`, `.jpg`, or `.webp`; make sure the path in `pages.ts` matches the filename.

## Personalize the text

Edit `src/data/pages.ts`. Replace `[Your Name]`, the sample biography, reflection, artwork titles and descriptions, email, and social links with your own details.

## Main files

- `src/App.tsx` — cover, book navigation, responsive layout, and interactions.
- `src/components/JournalPage.tsx` — reusable parchment page.
- `src/components/ArtworkCard.tsx` — artwork cards and enlarged preview.
- `src/data/pages.ts` — all sample page content and artwork paths.
- `src/styles/global.css` — colors, typography, book styling, and responsive behavior.

## Current implementation notes

- The cover is an illustrated CSS element with a 3D hover tilt; clicking it reveals the book. The page spread currently uses animated transitions, not a full realistic 3D page-curl simulation. This keeps the starter lightweight and easy to extend.
- The music control is a visual placeholder until you provide an audio file. No music plays automatically.
- Desktop shows two pages per spread. On narrow screens, it shows one page at a time. Use the arrows, keyboard arrow keys, or swipe horizontally on touch screens.
- This starter does not contain your actual artwork or personal information. Add those before publishing.
