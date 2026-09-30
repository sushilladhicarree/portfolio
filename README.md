# SUSHI. — Creative frontend portfolio

A personal portfolio for Sushil Adhikari, a frontend developer at Yarsa Himalaya in Pokhara, Nepal. The visual identity combines Spider-Man’s expressive comic energy with Batman’s darker world.

## Run locally

Use a Node.js version supported by Vite 7 (Node 20.19+ or 22.12+).

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Vite prints the selected port. The current preview uses http://127.0.0.1:5173/.

```sh
npm run build
npm run lint
npm run preview -- --host 127.0.0.1
```

## Experience

- React 19 with Vite and Framer Motion.
- A lazy-loaded Three.js / React Three Fiber split-mask bust, spherical webbing, cursor parallax, and orbiting particles.
- Spider-Man and Batman visual modes, saved locally; press **G** to switch.
- A real portrait and biography based on public profiles and employer information.
- Himali Green as the lead case study: confirmed design, web frontend, and Flutter contribution, including buyer and seller sections.
- Miti and Samyojak are clearly identified as company products rather than unverified personal credits.
- Project filters and accessible native dialogs.
- Web-shooter with adjustable strength, Bat-Signal, skill explorer, and a tilting multiverse identity card.
- Five collectible emblems. Type **thwip**, or enter the Konami code (up, up, down, down, left, right, left, right, B, A).
- Opt-in synthesized sound. No missing sound-file requests.
- Native cursors, mobile navigation, reduced-motion support, pause controls, and a Three.js fallback.
- Three.js rendering stops while the hero is outside the viewport. Rain runs only in Batman mode and cleans up correctly.

## Content and assets

Profile sources and ownership notes: [docs/PROFILE_RESEARCH.md](docs/PROFILE_RESEARCH.md).

The public portrait reference is saved at `public/images/sushil-reference.jpg`. It was obtained from Sushil’s supplied Facebook profile.

The image-generation service rejected all three attempts, including the masked illustration attempt. No AI-generated portrait has been saved or represented as completed. The site uses a real photo, custom Three.js geometry, and code-native illustrations. See [docs/IMAGE_ART_DIRECTION.md](docs/IMAGE_ART_DIRECTION.md) for the generation record and section art direction.

Project interface illustrations are portfolio interpretations, not screenshots of shipped product UI. Replace them with approved product screenshots as available.

The `past/` directory is the retained original static prototype. Lint covers the active app and build configuration, excluding this archived prototype.

## Editing

- Project content: `src/data/projects.js`
- Theme, sound, shortcuts and collectibles: `src/context/ThemeContext.jsx`
- 3D artwork: `src/components/ThreeDScene.jsx`
- Sections: `src/components/`
- Active global styles: `src/index.css` and `src/App.css`

The older per-component CSS files are retained but no longer imported. No deployment has been performed.
