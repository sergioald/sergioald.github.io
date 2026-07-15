# sergioald.github.io

Source for my personal portfolio, published via GitHub Pages at
[sergioald.github.io](https://sergioald.github.io/).

Static HTML/CSS/JS — no build step, no framework, no dependencies to install.


## Live demos

Two portfolio projects are deployed as public interactive demos:

- Urban Drainage Sensor Data Toolkit: https://urban-drainage-sensor-data-toolkit.streamlit.app/
- Meander Morphology Classifier: https://meander-morphology-classifier.streamlit.app/

These demos use public-safe synthetic or example data so the workflows can be explored without cloning the repositories or setting up a local environment.

## Structure

```
index.html              Home page
about.html               About / background
projects.html             Full project index
projects/*.html            One case-study page per project
assets/css/style.css        All site styling (light + dark theme)
assets/js/main.js           Theme toggle (persisted + OS preference aware)
assets/img/*.svg             Per-project workflow diagrams
assets/img/favicon.svg        Site icon (+ PNG fallbacks for older browsers)
assets/img/og-image.png       Social share preview image (LinkedIn/X/Slack)
docs/live_demo_plan.md        Notes on the next live-demo deployment
```

## Design system

Visual identity is grounded in the subject matter (sensor instrumentation,
signal traces, engineering schematics) rather than generic dark-SaaS styling:

- **Type:** Big Shoulders (display/headlines), Instrument Sans (body),
  IBM Plex Mono (data readouts, nav, labels) — self-hosted as WOFF in
  `assets/fonts/`, no external font requests.
- **Color:** graphite/ink background, a single amber signal accent
  (`--signal`), with green/coral reserved for semantic "nominal" /
  "anomaly" states inside diagrams — not used decoratively elsewhere.
- **Background:** a fine graticule grid (graph-paper/oscilloscope texture)
  instead of gradient blobs.
- **Signature element:** the animated instrument-readout panel in the
  homepage hero (inline SVG, respects `prefers-reduced-motion`).
- All tokens live at the top of `assets/css/style.css` as CSS custom
  properties — start there when adjusting colors or type.

## Previewing locally

No build tools required — just serve the folder and open it in a browser:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Opening `index.html` directly (`file://`) also works, but a local server
avoids occasional relative-path quirks and matches how GitHub Pages serves it.

## Adding a new project case study

1. Duplicate an existing file in `projects/` as a starting point (e.g.
   `projects/tdms-sync-checker.html`) and update the title, description,
   problem/approach/what-it-demonstrates content, and links.
2. Add a matching workflow diagram to `assets/img/<project-slug>.svg`.
3. Add a card for it to `projects.html`, and to `index.html` if it belongs in
   the featured "Selected projects" section.
4. Keep the repo link pointing at the actual GitHub repository, and credit
   co-authors / link the canonical repo if the project is collaborative
   (see `projects/strandings-from-space.html` for the pattern).

## Deployment

Pushes to `main` publish automatically via GitHub Pages — there is no CI
build step. `.nojekyll` disables Jekyll processing since the site is already
plain HTML.
