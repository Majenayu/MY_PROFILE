# P G Ayush Rai — Adventure Portfolio

A single-page portfolio that moves through six visual worlds: tactical mission control, a character system readout, a project capsule lab, a parchment-style recognition log, field notes, and a science communication portal.

The public portfolio is intentionally resilient: it renders from local content immediately and enriches projects and achievements from the existing Express/MongoDB API when those services are available.

## Stack

- **Backend**: Node.js and Express
- **Data services**: MongoDB with Mongoose, optional Cloudinary uploads
- **Frontend**: Semantic HTML, vanilla JavaScript, and custom CSS — no frontend build step
- **Motion**: CSS animations and IntersectionObserver

## Quick start

```bash
npm install
npm start
```

The server defaults to port `3000` (configurable via the `PORT` env var).

## Optional environment setup

Create a `.env` file if you want to use the admin/API data services:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

The landing page still works without MongoDB or Cloudinary because it has local fallback content.

## Project structure

```text
├── portfolio/
│   ├── index.html         # Public portfolio page
│   ├── style.css          # Six-world adventure design system
│   └── app.js             # Interactions, local data, API enrichment
├── public/                # Admin/supporting static pages
├── server.js              # Express server and existing API routes
├── package.json
└── README.md
```

## Public experience

- **Theme tracking** changes the accent color as each world enters the viewport.
- **Project carousel** browses the featured quest log without leaving the page.
- **Award detail view** expands a recognition entry into a full log.
- **Event filters** sort field notes by party.
- **Contact transmission** opens a pre-filled email in the visitor's mail client.

## Existing API

The server keeps the existing management endpoints for projects, achievements, courses, profile data, events, badges, and visitor stats. The public page calls the project and achievement endpoints when they respond successfully, otherwise it uses its local fallback archive.

## Author

**P G Ayush Rai**

- GitHub: [@Majenayu](https://github.com/Majenayu)
- LinkedIn: [P G Ayush Rai](https://www.linkedin.com/in/p-g-ayush-rai-8b90082a9/)
- Email: [pgayushrai@gmail.com](mailto:pgayushrai@gmail.com)