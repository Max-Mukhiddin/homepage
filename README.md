# Mukhiddin Solijonov — Portfolio

An original static portfolio for a **Full-Stack · DevOps · Agentic Engineer** based in **Gyeonggi-do · South Korea**.

## Current scope

The site uses a persistent desktop profile sidebar beside an independently scrolling portfolio. At 1024px and below, the sidebar becomes a compact sticky top bar with an accessible navigation drawer and the page returns to normal document scrolling. The page contains Home, About, Skills, Projects, Strength, Career, Education, and Contact.

Built with semantic HTML, CSS Grid/Flexbox, and one vanilla JavaScript module. No external fonts, scripts, frameworks, packages, or build step. PawPal remains the featured case study, Venturo is a secondary case study, and Enginx is a compact project entry.

The original implementation and its assets are retained only in Git history (initial commit `09a8ca9`).

## Run locally

From the project directory:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Stop the server with Ctrl+C. Use an HTTP server rather than opening the file directly so the JavaScript module loads consistently.

## Files

- `index.html`: application shell, profile sidebar, metadata, and all portfolio sections.
- `css/variables.css`: palette, typography, spacing, sizing tokens.
- `css/base.css`: reset, accessibility, base styles, reduced motion.
- `css/components.css`: desktop shell/sidebar, navigation, buttons, and all section layouts.
- `css/responsive.css`: tablet/mobile rules; the sidebar becomes a top navigation drawer at 1024px.
- `js/main.js`: mobile menu, container-aware active section tracking, smooth anchor navigation, and one-time IntersectionObserver reveals.
- `images/profile/`: hero portrait and About working portrait.
- `images/projects/`: original project screenshots and reserved media locations.
- `assets/resume/`: linked resume PDF.

## Real assets

The site uses these case-sensitive asset paths:

- `images/profile/mukhiddin-hero.webp`: displayed in the desktop sidebar and mobile navigation drawer with meaningful alt text. Its reserved frame and intrinsic dimensions prevent layout shift. A transparent, borderless wrapper and `object-fit: cover; object-position: center top` prevent side bars without stretching the portrait.
- `images/profile/mukhiddin-about.webp`: displayed in the About section with meaningful alt text and a reserved square frame.
- `assets/resume/Mukhiddin-Solijonov-Resume.pdf`: the enabled resume link opens this PDF in a new tab with `noopener noreferrer`. It deliberately leaves saving to the browser PDF viewer instead of relying on a forced download.

All three files are present. The hero source remains 1103 × 1426, and the About source remains 1254 × 1254. The About image stays in normal document flow. Both profile files now use actual lossless WebP encoding with decoded pixels verified identical to the supplied originals.

### PawPal media

- `images/projects/pawpal/pawpal-ai.webp`: displayed in the compact PawPal gallery.
- `images/projects/pawpal/pawpal-admin.webp`: displayed in the compact PawPal gallery.
- `images/projects/pawpal/pawpal-home.png`: displayed as the dominant project overview visual.
- `images/projects/pawpal/pawpal-services.webp`: displayed in the compact PawPal gallery.

The homepage PNG was losslessly compressed without changing dimensions or decoded pixels. Supporting screenshots retain their supplied encoding.

### Venturo media

- `images/projects/venturo/venturo-home.webp`: displayed in the project overview.
- `images/projects/venturo/venturo-checkout.webp`: displayed with the checkout engineering story.
- `images/projects/venturo/venturo-admin.webp`: displayed with the EJS administration section.

All three Venturo files now use actual lossless WebP encoding. Their source dimensions and decoded pixels are preserved. The overview screenshot links to the live product; checkout and admin screenshots remain unobstructed supporting visuals.

### Enginx media

- `images/projects/enginx/enginx-home.webp`: displayed as the single overview visual in the compact Enginx entry.

The Enginx file now uses actual lossless WebP encoding, preserving its 1190 × 834 dimensions and decoded pixels. Its focusable preview has no CTA because no repository or live URL has been verified.

The production URL is https://max-mukhiddin.github.io/homepage/. The canonical URL and `og:url` use this exact project-site URL. An original social-preview image is still needed before adding absolute `og:image` metadata.

All ten displayed images retain intrinsic dimensions and meaningful alt text; images below Home load lazily. No screenshot or portrait pixels were changed in this refactor.

## Accessibility and motion

Interactive screenshot links expose the same overlay states to keyboard focus as hover. Overlays contain only information also available in the page. Reveals run once, using the desktop content pane or mobile viewport as appropriate. Reduced motion immediately exposes content and disables movement. With JavaScript unavailable, content remains visible and the mobile navigation remains available.

## Confirmed links

- GitHub: https://github.com/Max-Mukhiddin
- Email: mukhiddinsolijonov101@gmail.com
- PawPal live product: https://pawpall.online
- Venturo live product: https://venturo.network/

## Deployment

Serve the repository root as a static site. Styles and scripts use relative URLs for compatibility with GitHub Pages project paths. No backend or contact integration is included. GitHub Pages publishing settings have not been changed.
