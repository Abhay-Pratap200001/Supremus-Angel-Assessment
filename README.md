<div align="center">

# 🌿 Supremus Angel — Dynamic Form Visualizer

### Build forms. Preview live. Save to MongoDB.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)

<br/>

> A full-stack MERN application built for the **Supremus Angel Developer Assessment**.
> Users build dynamic forms, watch data render live in a preview panel, and persist entries to MongoDB — all in one seamless interface.

<br/>

[🚀 Live Demo](https://supremus-angel-assessment.onrender.com) &nbsp;·&nbsp; [📁 Repository](https://github.com/Abhay-Pratap200001/Supremus-Angel-Assessment) &nbsp;·&nbsp; [🐛 Report Issue](https://github.com/Abhay-Pratap200001/Supremus-Angel-Assessment/issues)

</div>

---

## ✅ Assessment Requirements Coverage

| Requirement | Status | Implementation |
|:---|:---:|:---|
| Dynamic input fields — add & remove | ✅ | Inline in `CreateEntry.tsx` with `useState` |
| Real-time data render on screen | ✅ | `DataPreview` re-renders on every keystroke |
| Responsive — mobile, tablet, desktop | ✅ | Tailwind responsive grid (`lg:grid-cols-2`) |
| Hover effects / tooltips on rendered data | ✅ | Each preview row has hover highlight + `title` tooltip |
| Smooth animations & transitions | ✅ | `animate-slide-down` on new fields, `animate-fade-in` on preview |
| React.js + TypeScript *(bonus)* | ✅ | React 18 + TypeScript throughout both layers |
| Styling — Bootstrap or Styled Components | ✅ | Tailwind CSS used — more modern utility-first alternative |
| README with setup steps | ✅ | Full setup guide below |
| Proper folder structure & coding standards | ✅ | Separated `api` / `components` / `types` / `config` / `models` / `routes` / `controllers` |

---

## ✨ Features

| Feature | Description |
|:---|:---|
| 🧱 **Dynamic Form Builder** | Add and remove label-value field pairs freely — unlimited fields per entry |
| 👁️ **Live Preview Panel** | Dedicated panel updates on every keystroke with a pulsing **LIVE** badge |
| 💾 **Save to MongoDB** | Completed forms saved permanently via REST API |
| 🗂️ **Saved Entries Grid** | All past entries loaded from the database on page open |
| 🎨 **Hover Effects & Tooltips** | Preview rows highlight on hover and show full data as tooltip |
| 🎞️ **Smooth Animations** | Fields slide in when added; preview fades in when content appears |
| 🔔 **Toast Notifications** | Success and error feedback via `react-hot-toast` with custom dark theme |
| 🌿 **Forest-Themed UI** | Dark green brand, gradient cards, nature icons (Lucide React) |
| 📱 **Fully Responsive** | Works on mobile, tablet, and desktop with no layout breakage |
| 🔒 **TypeScript End-to-End** | Full type safety across frontend components and backend API layers |

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Frontend**
- ⚛️ React 18
- 🔷 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🔣 Lucide React (icons)
- 📡 Axios (HTTP client)
- 🔔 React Hot Toast
- 🔑 UUID

</td>
<td valign="top" width="50%">

**Backend**
- 🟢 Node.js
- 🚂 Express.js
- 🔷 TypeScript
- 🍃 MongoDB + Mongoose
- 🔒 CORS
- 🔧 Dotenv

**DevOps**
- ☁️ Render (deployment)
- 🐙 GitHub (source control)

</td>
</tr>
</table>

---

## 📁 Project Structure

```
supremus-angel/
│
├── 📂 backend/
│   ├── 📂 src/
│   │   ├── 📂 config/
│   │   │   └── db.ts                      # MongoDB connection via Mongoose
│   │   ├── 📂 controllers/
│   │   │   └── formEntry.controller.ts    # CRUD handlers — get all, get by id, create, update, delete
│   │   ├── 📂 models/
│   │   │   └── formEntry.model.ts         # Mongoose schema + IField / IFormEntry TypeScript interfaces
│   │   ├── 📂 routes/
│   │   │   └── formEntry.routes.ts        # Express router — maps HTTP verbs to controllers
│   │   └── index.ts                       # Entry point — middleware, routes, DB connect, server start
│   ├── package.json
│   └── tsconfig.json
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 api/
│   │   │   └── formData.api.ts            # All Axios calls in one place (getEntries, saveEntry)
│   │   ├── 📂 components/
│   │   │   ├── CreateEntry.tsx            # Form builder — form state, handlers and JSX all inline
│   │   │   ├── DataPreview.tsx            # Live preview panel — pure display component, props only
│   │   │   ├── SavedEntries.tsx           # Saved entries card grid — pure display, receives props
│   │   │   └── Navbar.tsx                 # Top navigation bar
│   │   ├── 📂 types/
│   │   │   └── index.ts                   # Shared TypeScript interfaces (Field, FormEntry, FormPayload)
│   │   ├── App.tsx                        # Root — loads entries from DB, renders layout
│   │   ├── index.css                      # Tailwind directives + custom scrollbar
│   │   └── main.tsx                       # React DOM render entry point
│   ├── tailwind.config.js                 # Custom animations (slide-down, fade-in)
│   ├── vite.config.ts                     # Dev proxy /api → localhost:5000
│   └── package.json
│
├── package.json                           # Root build + start scripts for Render
└── render.yaml                            # Render deployment blueprint
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB** — local install or [MongoDB Atlas](https://www.mongodb.com/atlas) free tier

---

### 1. Clone the repository

```bash
git clone https://github.com/Abhay-Pratap200001/Supremus-Angel-Assessment
cd Supremus-Angel-Assessment
```

### 2. Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend (open a second terminal)
cd frontend && npm install
```

### 3. Configure environment variables

Create `backend/.env` with the following:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/supremus-angel
CLIENT_URL=http://localhost:5173
```

### 4. Run development servers

```bash
# Terminal 1 — Backend (http://localhost:5000)
cd backend
npm run dev

# Terminal 2 — Frontend (http://localhost:5173)
cd frontend
npm run dev
```

---

## 📦 Build for Production

```bash
# Build frontend → outputs to frontend/dist/
cd frontend && npm run build

# Build + start backend (serves frontend build statically)
cd backend && npm run build
NODE_ENV=production node dist/index.js
```

> **Note:** In production, the Express server serves the compiled React build as static files — no separate frontend host is needed.

---

## 🔌 API Reference

Base URL: `/api/entries`

| Method | Endpoint | Description | Request Body |
|:---:|:---|:---|:---|
| `GET` | `/api/entries` | Fetch all saved entries | — |
| `GET` | `/api/entries/:id` | Fetch single entry by ID | — |
| `POST` | `/api/entries` | Create a new entry | `{ title, fields[] }` |
| `PUT` | `/api/entries/:id` | Update an existing entry | `{ title, fields[] }` |
| `DELETE` | `/api/entries/:id` | Delete an entry | — |
| `GET` | `/health` | Server health check | — |

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

## 🏗️ Architecture & Design Decisions

| Decision | Rationale |
|:---|:---|
| **Form state inline in `CreateEntry.tsx`** | Keeps all creation logic — state, handlers, JSX — in one file. Easy to read and modify without touching other components |
| **`DataPreview` as pure display component** | Receives `title` and `fields` as props with no internal logic. Straightforward to test and reuse anywhere |
| **Axios isolated in `api/formData.api.ts`** | Components never contain URLs or HTTP calls. Swap the backend without touching any UI file |
| **Tailwind CSS over Bootstrap** | Utility-first approach makes responsive layout and hover/animation states concise and co-located with JSX — no context switching to a CSS file |
| **Custom animations in `tailwind.config.js`** | `animate-slide-down` for new fields and `animate-fade-in` for preview content directly satisfies the smooth transitions requirement |
| **`react-hot-toast`** | Zero-config notifications with custom dark-themed styles — no extra state management or modal logic needed |
| **Mongoose `timestamps: true`** | Automatically adds `createdAt` / `updatedAt` to every document without any boilerplate code |
| **Vite proxy `/api` → `:5000`** | Frontend uses relative URLs (`/api/entries`) in both dev and production — no environment-specific URL config needed |
| **TypeScript on both layers** | Catches type mismatches between `FormPayload` (frontend) and `IFormEntry` (backend) at compile time, not runtime |
| **Separated backend folders** | `config` / `models` / `routes` / `controllers` — single responsibility per file, scalable as more resources are added |

---

## 🗺️ Flow Diagrams

### System Architecture — How the App Works

```mermaid
graph TD
    User(["👤 User / Browser"])

    User -->|"Clicks / Types"| FE
    FE -->|"Re-renders UI · Toast Notifications"| User

    subgraph FE["⚛️ React Frontend — Vite :5173"]
        direction TB
        subgraph COMP["Components"]
            APP["App.tsx — Root Component"]
            CE["CreateEntry.tsx — Form Builder"]
            DP["DataPreview.tsx — Live Preview"]
            SE["SavedEntries.tsx — Entries Grid"]
        end
        subgraph AXIOS["api/formData.api.ts · Axios HTTP Client"]
            GE["getEntries()"]
            SVE["saveEntry()"]
        end
    end

    FE -->|"HTTP Request · GET POST PUT DELETE\n/api/entries"| BE
    BE -->|"JSON Response · { success, data }"| FE

    subgraph BE["🟢 Express Backend — Node.js :5000"]
        direction TB
        RT["formEntry.routes.ts\n/api/entries"]
        CT["formEntry.controller.ts\nCRUD Logic + Validation"]
        MD["formEntry.model.ts\nMongoose Schema"]
        RT --> CT --> MD
    end

    MD -->|"Read / Write"| DB
    DB -->|"Documents"| MD

    subgraph DB["🍃 MongoDB Atlas — Cloud Database"]
        COL[("formEntries Collection")]
    end
```

---

### User Flow — Every Action Explained

```mermaid
flowchart TD
    A(["🌐 Open App"]) --> B["Page loads\nfetchEntries called"]
    B --> C["GET /api/entries\nfetch all saved data"]
    C --> D["SavedEntries grid renders\nwith all past entries"]
    B --> E["Form Builder ready\n1 empty field shown"]

    E --> F["User types Title"]
    F --> G["⚡ DataPreview updates\nin real time on every keystroke"]

    E --> H["Click ➕ Add Field"]
    H --> I["New field row slides in\nUUID assigned to field"]
    I --> J["Fill Label + Value\nLive preview updates instantly"]

    J --> K{"Remove this field?"}
    K -->|"Yes — click ✕"| L["Field removed from form"]
    L --> J
    K -->|"No"| M["Click 💾 Save to Database"]

    M --> N{"Validate input"}
    N -->|"❌ Empty title or\nno complete fields"| O["Error Toast shown\nto user"]
    O --> E

    N -->|"✅ Valid"| P["POST /api/entries\nAxios sends payload to backend"]
    P --> Q["Express controller validates\nand saves via Mongoose"]
    Q --> R["Entry stored in\nMongoDB Atlas"]
    R --> S["✅ Success Toast shown"]
    S --> T["Form resets to empty state"]
    T --> U["New entry card appears\nat top of grid instantly"]
    U --> D
```

---

## 🔮 Future Improvements

- 🔐 **User Authentication** — JWT-based login so each user sees only their own entries
- 🖱️ **Drag & Drop Fields** — Reorder fields using `dnd-kit`
- 📊 **Data Charts** — Render numeric field values as bar or pie charts
- 📤 **Export to CSV / PDF** — Download saved entries as a report
- ✏️ **Edit & Delete Saved Entries** — UI for the existing PUT and DELETE API endpoints
- 🔍 **Search & Filter** — Filter saved entries by title or field content
- 📄 **Pagination** — Cursor-based pagination for large entry sets

---

<div align="center">

Built with 💚 by **Abhay Pratap** for the Supremus Angel Developer Assessment

</div>
