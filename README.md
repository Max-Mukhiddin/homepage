# Mukhiddin Solijonov — Portfolio

An original static portfolio for a **Full-Stack · DevOps · Agentic Engineer** based in **Gyeonggi-do · South Korea**.

## Current scope

The site uses a persistent desktop profile sidebar beside an independently scrolling portfolio. At 1024px and below, the sidebar becomes a compact sticky top bar with an accessible navigation drawer and the page returns to normal document scrolling. The page contains Home, About, Skills, Projects, Strength, Career, Education, and Contact.

Built with semantic HTML, CSS Grid/Flexbox, and one vanilla JavaScript module. No external fonts, scripts, frameworks, packages, or build step. PawPal, Venturo, and Enginx are presented as text-first editorial case studies with verified responsibilities, technologies, and links.

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
- `js/main.js`: mobile menu, container-aware active section tracking, smooth anchor navigation, one-time IntersectionObserver reveals, and skill-line animation.
- `images/profile/`: hero portrait and About working portrait.
- `assets/resume/`: linked Korean and English resume PDFs.

## Real assets

The site uses these case-sensitive asset paths:

- `images/profile/mukhiddin-hero.webp`: displayed in the desktop sidebar and mobile navigation drawer with meaningful alt text. Its reserved frame and intrinsic dimensions prevent layout shift. A transparent, borderless wrapper and `object-fit: cover; object-position: center top` prevent side bars without stretching the portrait.
- `images/profile/mukhiddin-about.webp`: displayed in the About section with meaningful alt text and a reserved square frame.
- `assets/resume/Mukhiddin-Solijonov-Resume-KR.pdf`: the Korean resume link opens this PDF in a new tab with `noopener noreferrer`.
- `assets/resume/Mukhiddin-Solijonov-Resume-EN.pdf`: the English resume link opens this PDF in a new tab with `noopener noreferrer`. Both resume links deliberately leave saving to the browser PDF viewer instead of relying on a forced download.

All four files are present. The hero source remains 1103 × 1426, and the About source remains 1254 × 1254. The About image stays in normal document flow. Both profile files use lossless WebP encoding. Project screenshots were removed from the working tree because the redesigned Projects section is intentionally text-first.

The production URL is https://max-mukhiddin.github.io/homepage/. The canonical URL and `og:url` use this exact project-site URL. An original social-preview image is still needed before adding absolute `og:image` metadata.

Both displayed portraits retain intrinsic dimensions and meaningful alt text; the About portrait loads lazily.

## Accessibility and motion

Reveals and progress-line animations run once, using the desktop content pane or mobile viewport as appropriate. Reduced motion immediately exposes content and disables movement. With JavaScript unavailable, content remains visible and the mobile navigation remains available.

## Confirmed links

- GitHub: https://github.com/Max-Mukhiddin
- Email: mukhiddinsolijonov101@gmail.com
- PawPal live product: https://pawpall.online
- Venturo live product: https://venturo.network/

## Deployment

Serve the repository root as a static site. Styles and scripts use relative URLs for compatibility with GitHub Pages project paths. No backend or contact integration is included. GitHub Pages publishing settings have not been changed.
