# Supremus Angel — Dynamic Form Visualizer

A full-stack web application built for the **Supremus Angel Developer Assessment**.  
Users build dynamic forms, see their data rendered live in a preview panel, and persist entries to MongoDB.

---

## Assessment Requirements Coverage

| Requirement | Status | Notes |
|---|---|---|
| Dynamic input fields — add & remove | ✅ | Inline in `CreateEntry.tsx` with `useState` |
| Real-time data render on screen | ✅ | `DataPreview` re-renders on every keystroke |
| Responsive — mobile, tablet, desktop | ✅ | Tailwind responsive grid (`lg:grid-cols-2`) |
| Hover effects / tooltips on rendered data | ✅ | Each preview row has hover highlight + `title` tooltip |
| Smooth animations & transitions | ✅ | `animate-slide-down` on new fields, `animate-fade-in` on preview |
| React.js + TypeScript (bonus) | ✅ | React 18 + TypeScript throughout |
| Styling — Bootstrap or Styled Components | ✅* | Tailwind CSS used (more modern utility-first alternative) |
| README with setup steps | ✅ | See below |
| Proper folder structure & coding standards | ✅ | Separated api / components / types / config / models / routes / controllers |

---

## Features

- **Dynamic form builder** — add and remove fields freely, each with label and value inputs
- **Live preview panel** — updates on every keystroke with a pulsing LIVE badge
- **Hover effects** — preview rows highlight on hover with tooltip showing field data
- **Smooth animations** — fields slide in when added, preview fades in when content appears
- **Save to MongoDB** — form data persisted via REST API
- **Saved entries grid** — all past entries loaded from database on page open
- **Toast notifications** — react-hot-toast for save success and error feedback
- **Forest-themed UI** — dark green brand, nature icons (lucide-react), responsive layout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Backend | Node.js + Express + TypeScript |
| Database | MongoDB + Mongoose |

---

## Project Structure

```
supremus-angel/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                      # MongoDB connection via Mongoose
│   │   ├── controllers/
│   │   │   └── formEntry.controller.ts    # CRUD handlers (get all, get by id, create, update, delete)
│   │   ├── models/
│   │   │   └── formEntry.model.ts         # Mongoose schema with IField and IFormEntry interfaces
│   │   ├── routes/
│   │   │   └── formEntry.routes.ts        # Express router — maps HTTP verbs to controllers
│   │   └── index.ts                       # App entry point — middleware, routes, DB connect, server start
│   ├── .env.example                       # Environment variable template
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── formData.api.ts            # All Axios calls in one place (getEntries, saveEntry)
│   │   ├── components/
│   │   │   ├── CreateEntry.tsx            # Form builder — all form state, handlers and JSX inline
│   │   │   ├── DataPreview.tsx            # Live preview panel — pure display, receives props
│   │   │   ├── SavedEntries.tsx           # Saved entries card grid — pure display, receives props
│   │   │   └── Navbar.tsx                 # Top navigation bar
│   │   ├── types/
│   │   │   └── index.ts                   # Shared TypeScript interfaces (Field, FormEntry, FormPayload)
│   │   ├── App.tsx                        # Root — loads entries from DB, renders CreateEntry + SavedEntries
│   │   ├── index.css                      # Tailwind directives + custom scrollbar
│   │   └── main.tsx                       # React DOM render entry point
│   ├── index.html
│   ├── tailwind.config.js                 # Custom animations (slide-down, fade-in)
│   ├── postcss.config.cjs
│   ├── vite.config.ts                     # Dev proxy /api → localhost:5000
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── package.json
│
└── README.md
```

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB** — local install or [MongoDB Atlas](https://www.mongodb.com/atlas) free tier

---

## Setup & Run

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd supremus-angel
```

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend — open a second terminal
cd frontend
npm install
```

### 3. Configure environment variables

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=....
MONGODB_URI=mongodb://................
CLIENT_URL=http://localhost:5173
```


### 4. Run development servers

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
API running at `http://localhost:5000`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
App running at `http://localhost:5173`

---

## API Reference

| Method | Endpoint | Description | Body |
|---|---|---|---|
| GET | `/api/entries` | Get all saved entries | — |
| GET | `/api/entries/:id` | Get single entry by ID | — |
| POST | `/api/entries` | Create a new entry | `{ title, fields[] }` |
| PUT | `/api/entries/:id` | Update an existing entry | `{ title, fields[] }` |
| DELETE | `/api/entries/:id` | Delete an entry | — |
| GET | `/health` | API health check | — |

**Example POST body:**
```json
{
  "title": "Employee Info",
  "fields": [
    { "label": "Name",       "value": "John Doe" },
    { "label": "Department", "value": "Engineering" },
    { "label": "Joined",     "value": "2024-01-15" }
  ]
}
```

---

## Build for Production

```bash
# 1. Build frontend
cd frontend
npm run build
# outputs to frontend/dist/

# 2. Build and start backend (serves frontend dist in production)
cd backend
npm run build
NODE_ENV=production node dist/index.js
```

> In production the Express server serves the React build statically — no separate frontend host needed.

---

## Architecture & Design Decisions

| Decision | Rationale |
|---|---|
| **Form state inline in `CreateEntry.tsx`** | Keeps all creation logic (state, handlers, JSX) in one file — easy to read and change without touching other components |
| **`DataPreview` as pure display component** | Receives `title` and `fields` as props, no logic — straightforward to test and reuse |
| **Axios isolated in `api/formData.api.ts`** | Components never contain URLs or HTTP calls — swap the backend without touching UI files |
| **Tailwind CSS** | Utility-first approach makes responsive layout and hover/animation states concise and co-located with JSX |
| **Custom animations in `tailwind.config.js`** | `animate-slide-down` for new fields and `animate-fade-in` for preview satisfy the smooth transitions requirement |
| **`react-hot-toast`** | Zero-config toast notifications with custom dark-themed styles — no extra state management needed |
| **Mongoose `timestamps: true`** | Automatically adds `createdAt` / `updatedAt` to every document without boilerplate |
| **Vite proxy `/api` → `:5000`** | Frontend calls `/api/entries` in dev and prod without CORS issues or hardcoded URLs |
| **TypeScript on both layers** | Catches type mismatches between frontend `FormPayload` and backend `IFormEntry` at compile time |
| **Separated backend folders** (`config` / `models` / `routes` / `controllers`) | Single responsibility per file — scalable as more resources are added |
