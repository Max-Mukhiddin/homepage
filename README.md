# Mukhiddin Solijonov — Portfolio

An original static portfolio for a **Full-Stack · DevOps · Agentic Engineer** based in **Gyeonggi-do · South Korea**.

## Phase 4 scope

Responsive navigation, Home/hero, global design tokens, framed portrait photography, About, Technical Stack, and the PawPal project case study. Built with semantic HTML, CSS Grid/Flexbox, and one vanilla JavaScript module. No external fonts, scripts, frameworks, packages, or build step.

Venturo, Enginx, Experience, Education, and Contact are intentionally not built. Their navigation destinations remain reserved where applicable. The active-navigation indicator style is prepared; scroll tracking is deferred until more sections exist.

The original implementation and its assets are retained only in Git history (initial commit `09a8ca9`).

## Run locally

From the project directory:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Stop the server with Ctrl+C. Use an HTTP server rather than opening the file directly so the JavaScript module loads consistently.

## Files

- `index.html`: metadata, navigation, hero, About, Technical Stack, and PawPal case-study content.
- `css/variables.css`: palette, typography, spacing, sizing tokens.
- `css/base.css`: reset, accessibility, base styles, reduced motion.
- `css/components.css`: navigation, buttons, hero, portraits, About, Expertise, and PawPal case-study layouts.
- `css/responsive.css`: tablet/mobile rules; navigation collapses at 1024px, hero stacks below 768px.
- `js/main.js`: mobile menu and scroll-dependent header state.
- `images/profile/`: hero portrait and About working portrait.
- `images/projects/`: original project screenshots and reserved media locations.
- `assets/resume/`: linked resume PDF.

## Real assets

Supply these files with the exact case-sensitive names:

- `images/profile/mukhiddin-hero.webp`: loaded by the hero with meaningful alt text. A reserved 4:5 frame prevents image-driven layout shift; `object-fit: contain` preserves the entire portrait without distortion or face/shoulder cropping. Desktop width is capped at 400px; mobile width at 384px.
- `images/profile/mukhiddin-about.webp`: displayed in the About section with meaningful alt text and a reserved square frame.
- `assets/resume/Mukhiddin-Solijonov-Resume.pdf`: the enabled resume link opens this PDF in a new tab with `noopener noreferrer`. It deliberately leaves saving to the browser PDF viewer instead of relying on a forced download.

All three files are present. The hero preserves the supplied 1103 × 1426 portrait crop, while the square About image uses a restrained rectangular frame and centered cover crop. Both supplied `.webp` files contain PNG-encoded data despite their filenames. Browsers currently decode both images successfully; the original assets have been left unchanged.

### PawPal media

- `images/projects/pawpal/pawpal-ai.webp`: displayed in the AI assistant feature.
- `images/projects/pawpal/pawpal-admin.webp`: displayed in the admin operations feature.
- `images/projects/pawpal/pawpal-home.png`: displayed as the dominant project overview visual.
- `images/projects/pawpal/pawpal-services.webp`: available but unused in this phase.

The supplied PawPal files with `.webp` extensions currently contain PNG-encoded image data. Browsers decode the used assets successfully; the originals remain unchanged.

The final public portfolio URL and an original social-preview image are still needed for `og:url` and `og:image`; their placeholders remain HTML comments.

## Confirmed links

- GitHub: https://github.com/Max-Mukhiddin
- Email: mukhiddinsolijonov101@gmail.com
- PawPal live product: https://pawpall.online

## Deployment

Serve the repository root as a static site. Styles and scripts use relative URLs for compatibility with GitHub Pages project paths. No backend or contact integration is included. GitHub Pages publishing settings have not been changed.
