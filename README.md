# P G Ayush Rai — Adventure Portfolio

A single-page cyberpunk-themed portfolio built as an interactive command console. Six visual worlds, role-specific dashboards, live video feeds, and a draggable achievement carousel — all rendered with zero frameworks.

## Live

**https://pgayushrai.onrender.com**

## Stack

| Layer | Tech |
|-------|------|
| Server | Node.js, Express |
| Data | MongoDB + Mongoose (optional) |
| Frontend | Semantic HTML, vanilla JS, custom CSS |
| Assets | MP4 video feeds, Cloudinary (optional) |
| Deploy | Railway |

## Features

- **Hero Console** — full-screen command-center with live MP4 video feed and animated HUD
- **Role Dashboards** — 6 switchable tabs (Cybersecurity, AI/ML, Full-Stack, Data/Cloud, GitHub, Leadership) each with unique theme color and layout
- **GitHub Section** — profile card, real stats (61 repos, 1,266 commits/year), and pinned repo showcase
- **Leadership Timelines** — horizontal proportional timelines for NCC, VectorFlow Club, and IEEE showing role progression from bottom to top
- **Achievement Carousel** — draggable card slider with images, auto-scroll, swipe support, and pagination dots
- **Project Capsules** — rotating project showcase with tech tags and links
- **Theme Tracking** — accent color shifts as you scroll between sections
- **Contact Form** — opens pre-filled email via mailto

## Quick Start

```bash
npm install
npm start
```

Server runs on port 3000 by default.

## Environment (optional)

Create a `.env` file to enable database-backed content:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

Without MongoDB, the portfolio serves local fallback data — all sections work.

## Structure

```
├── portfolio/
│   ├── index.html            # Single-page portfolio
│   ├── style.css             # Full design system (minified)
│   ├── app.js                # All interactions and data
│   └── hero-overrides.css    # Hero section tweaks
├── attached_assets/          # Videos, images, org logos
├── server.js                 # Express server + optional API
├── package.json
└── README.md
```

## About Me

**P G Ayush Rai** — B.Tech student at VVCE, Mysuru. Cybersecurity builder, AI/ML engineer, full-stack developer, and community leader.

- NCC Cadet Captain (Sep 2023 – Jan 2026)
- Vice President, VectorFlow Club (Feb 2026 – Present)
- IEEE Event Coordinator (Feb 2026 – Present)
- 1,266+ GitHub contributions/year across 61 repositories

## Links

- Portfolio: [majenayu.up.railway.app](https://majenayu.up.railway.app)
- GitHub: [@Majenayu](https://github.com/Majenayu)
- LinkedIn: [P G Ayush Rai](https://www.linkedin.com/in/p-g-ayush-rai-8b90082a9/)
- Email: pgayushrai@gmail.com
