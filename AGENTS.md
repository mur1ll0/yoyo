# AGENTS.md

## Project identity

Interactive Valentine's Day single-page application for a long-distance couple who met on Boo. React + Vite, deployed to GitHub Pages as a static SPA.

## Commands

```bash
npm run dev       # Vite dev server (default http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

## Architecture (critical: no router)

This project does **not** use react-router. View switching is manual via `useState` in `src/App.jsx:1` with the `VIEWS` constant (`LOGIN`, `DASHBOARD`, `GAME`). All views mount/dismount conditionally — never add a router library.

## GitHub Pages deployment

`vite.config.js` sets `base: '/yoyo/'`. All asset paths in production are prefixed with `/yoyo/`. The build output goes to `dist/` and is deployed as the GitHub Pages root for this repo.

## GSAP: mandatory cleanup pattern

Always use `useGsapTimeline` (`src/hooks/useGsapTimeline.js:1`) for timeline animations — it wraps every animation in `gsap.context()` and calls `.revert()` on unmount to prevent memory leaks and duplicate tweens on React StrictMode double-mount.

Import GSAP at **top level** of every file that animates, and register plugins once (e.g. `gsap.registerPlugin(ScrollTrigger)` in `Dashboard.jsx:6`). Never use `require()` inside callbacks — this is an ESM project.

## Audio: global context, user-gesture gated

`src/context/AudioContext.jsx:1` provides `useAudio()` hook with `play(url)`, `pause()`, `stop()`, `setVolume(n)`. The `play()` function auto-fades between tracks (fade-out current → swap src → fade-in new). Audio survives view transitions because the provider wraps the app in `main.jsx`.

**Browser autoplay policy**: `audio.play()` will fail silently unless called inside a user click/tap handler. The first `play()` call is tied to the padlock dial interaction (dragging or clicking arrow buttons to set the correct combination).

## Telegram notifications (client-side)

`src/hooks/useTelegramNotify.js:1` sends messages via Telegram Bot API using `fetch`. The webhook is client-side only — token and chat ID are bundled into the JS output. Requires two env vars:
- `VITE_TELEGRAM_BOT_TOKEN`
- `VITE_TELEGRAM_CHAT_ID`

## Environment variables

All env vars **must** be prefixed with `VITE_` (Vite requirement). Copy `.env.example` → `.env` and fill in real values before running:

| Variable | Purpose | Default |
|---|---|---|
| `VITE_LOGIN_PASSWORD` | 8-digit numeric combination for the portal lock | `12345678` |
| `VITE_TELEGRAM_BOT_TOKEN` | Telegram bot token | — |
| `VITE_TELEGRAM_CHAT_ID` | Target chat ID | — |

**Security note**: these values are shipped in the client bundle. Never put real secrets here that shouldn't be public. The Telegram token is visible to any visitor who inspects the JS bundle.

## Tailwind CSS (v3)

Custom cosmic/Boo color palette in `tailwind.config.js`:
- `cosmos-{50..950}` — deep space purples (50 = light, 950 = near-black)
- `neon-{pink,purple,blue,cyan}` — accent glows
- `midnight-{light,DEFAULT,dark}` — dark backgrounds

Utility classes: `glass-card` (frosted glass panel), `screen-container` (full-viewport wrapper).
Google Fonts (Inter, sans-serif only) loaded via `@import` in `src/index.css:1`. No serif fonts — the `font-display` token was removed.

## Static assets

All images, audio, and static files go in `public/assets/`. In production they resolve to `/yoyo/assets/...`. The directory structure:
```
public/assets/
  door.png, lock.png, meteor.png, space-bg.png   # AI-generated illustrations
  audio/unlock.mp3                                # Sound effects
```

## Login screen: combination lock (no text input)

The login screen has **no keyboard input** — the user spins 8 rotary dials on a brass padlock (`src/components/Padlock.jsx:1`) mounted on a heart-shaped door. Each dial shows digits 0–9 and increments/decrements via click on arrow buttons, mouse wheel, or vertical drag/swipe — numbers animate with a spinning/rolling effect. When all 8 digits match `VITE_LOGIN_PASSWORD`, the lock auto-unlocks.

The door is an SVG heart path split into left/right halves via `clipPath`. On unlock the padlock shackle lifts off, the body falls away, and the heart splits apart as light expands from within.

The password must be exactly 8 numeric digits. Text passwords are not supported.

## Component conventions

- All components use `.jsx` extension (no TypeScript)
- Screen-level components receive navigation callbacks as props (`onEnter`, `onBack`, `onPlayGame`)
- GSAP timelines that animate elements inside a component must use `useGsapTimeline` or wrap tweens in `gsap.context()` with cleanup
- Refs for GSAP targets use `useRef` and the callback-ref pattern for arrays (`sectionRefs.current[i] = el`)
