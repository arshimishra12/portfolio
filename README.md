# Arshi Mishra — Personal Portfolio Website

A modern, dark, cinematic, editorial, and game-menu inspired personal portfolio website for **Arshi Mishra** (First Year B.Tech Computer Science & Engineering student at MIT Manipal, Class of 2030).

Built with 100% Vanilla HTML5, CSS3, and JavaScript — zero dependencies, zero build tools, zero node_modules. Immediately deployable to **GitHub Pages**.

---

## 🌟 Key Features

- **Dark Cyberpunk & Editorial Aesthetic**: Deep navy/black palette (`#050814`) with glowing electric blue (`#0066ff`), cyan highlights (`#00f0ff`), and oversized display typography.
- **Game Menu Navigation HUD**: Interactive floating navigation with sound effects (Web Audio API synth) and active section tracking.
- **Interactive Custom Cursor**: Desktop cursor with dynamic `VIEW` and `OPEN` state triggers on hoverable elements (automatically disabled on touch devices).
- **Hero & Integrated Portrait**: Layered portrait photograph integrated with HUD elements and badges.
- **Project Detail Modal Viewer**: Interactive pop-up overlay showcasing high-resolution project images and creative descriptions.
- **Content Editing Friendly**: Clearly commented HTML code structured for easy updates.

---

## 📁 Repository Structure

```
Arshi-Portfolio/
│
├── index.html                # Main HTML file with all semantic sections
│
├── css/
│   ├── style.css             # Core design system tokens, typography & layouts
│   ├── animations.css        # Glow sweeps, scanlines & keyframe animations
│   └── responsive.css        # Mobile, tablet & desktop media queries
│
├── js/
│   ├── script.js             # Game menu, Web Audio synth, modal & custom cursor
│   └── animations.js         # Scroll reveal observer, 3D card tilt & mouse spotlight
│
├── assets/
│   ├── images/
│   │   └── arshi-portrait.jpg # Arshi Mishra's portrait photograph
│   ├── projects/
│   │   ├── project-01.jpg    # Fashion Editorial Flyer ("NEW COLLECTION")
│   │   ├── project-02.jpg    # "BLUEBERRY SMOOTHIE" Typography Poster
│   │   ├── project-03.jpg    # Cyberpunk Game UI Concept
│   │   └── project-04.jpg    # "BILLIE EILISH" Pop Icon Poster
│   └── icons/                # SVG icons for Figma, Canva, GitHub, LinkedIn, etc.
│
├── favicon.ico               # SVG/ICO Favicon
└── README.md                 # Setup & deployment guide
```

---

## 🚀 How to Deploy on GitHub Pages

1. Create a new repository on GitHub (e.g., `arshi-mishra-portfolio`).
2. Upload or push all files from this folder to the `main` branch.
3. On GitHub, go to your repository **Settings** → **Pages**.
4. Under **Build and deployment** → **Source**, select `Deploy from a branch`.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Your portfolio will be live at `https://<your-username>.github.io/<repository-name>/` in a few minutes!

---

## 📝 How to Edit Content

- **Personal Info / Bio / Education**: Edit the text inside [`index.html`](file:///C:/Users/ss/.gemini/antigravity/scratch/Arshi-Portfolio/index.html) under the `<!-- HERO SECTION -->` and `<!-- ABOUT SECTION -->` comments.
- **Social Media Links**: Update the `href` attributes in [`index.html`](file:///C:/Users/ss/.gemini/antigravity/scratch/Arshi-Portfolio/index.html) under `<!-- CONTACT SECTION -->`.
- **Projects & Modal Info**: Update project titles/descriptions inside `projectsData` object in [`js/script.js`](file:///C:/Users/ss/.gemini/antigravity/scratch/Arshi-Portfolio/js/script.js#L170).
- **Portrait or Project Images**: Replace files inside `assets/images/` or `assets/projects/` keeping the same filenames.
