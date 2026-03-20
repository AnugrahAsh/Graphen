<div align="center">

# Graphen

**The enterprise-grade note-taking workspace built for speed, security, and clarity.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06b6d4?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Auth-3ecf8e?logo=supabase)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-black?logo=framer)

</div>

---

## What Is Graphen?

Graphen is a modern, full-stack note-taking application that prioritises speed, organisation, and security. It blends a premium editorial design aesthetic with powerful real-time search, a coloured note system, a private vault, and a calendar timeline — all secured via Supabase authentication.

Think of it as the intersection of Notion's structure and Obsidian's speed, reimagined for an enterprise audience.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Note CRUD** | Create, read, update, and delete notes instantly |
| **Coloured Notes** | Assign pastel colours to notes for visual organisation |
| **Real-time Search** | Fuse.js powered fuzzy search across titles and content (Ctrl+K) |
| **Private Vault** | PIN-gated section for confidential notes |
| **Calendar View** | Timeline view of notes by date |
| **Markdown Support** | Write notes in Markdown with live preview |
| **Light / Dark Mode** | Persistent theme toggling via CSS variables |
| **Supabase Auth** | Secure email/password sign-up and login with session cookies |
| **Logout** | One-click session destruction from the sidebar |
| **Landing Page** | Animated marketing page with 3D model showcase (`star3d.glb`) |

---

## 🏗️ Architecture & Design Decisions

### Tech Stack

```
Frontend:      Next.js 16 (App Router) + React 19 + TypeScript
Styling:       Tailwind CSS v4 + CSS custom properties
Animation:     Framer Motion
3D Rendering:  Three.js + @react-three/fiber + @react-three/drei
Search:        Fuse.js (fuzzy, in-memory)
Auth:          Supabase (@supabase/ssr + @supabase/supabase-js)
Dates:         date-fns
Icons:         Lucide React
Markdown:      react-markdown
IDs:           uuid v4
```

### Application Structure

```
graphen/
├── app/
│   ├── page.tsx                  # Landing page (marketing)
│   ├── layout.tsx                # Root layout (fonts, ThemeProvider)
│   ├── globals.css               # CSS variables & design tokens
│   ├── login/
│   │   ├── page.tsx              # Login form UI
│   │   └── actions.ts            # Server Actions: login, signup, logout
│   ├── signup/
│   │   └── page.tsx              # Sign-up form UI
│   └── dashboard/
│       ├── layout.tsx            # Dashboard shell (Sidebar + main)
│       ├── page.tsx              # Notes grid with search
│       └── note/[id]/page.tsx    # Individual note editor
├── app/vault/page.tsx            # PIN-gated private notes
├── app/calendar/page.tsx         # Date-based note timeline
├── components/
│   ├── Sidebar.tsx               # Navigation + Add New + Logout
│   ├── SearchBar.tsx             # Fuse.js real-time search input
│   ├── ThemeProvider.tsx         # Dark/light context
│   └── ThemeToggle.tsx           # Theme switch button
├── hooks/
│   └── useNotes.ts               # LocalStorage-backed note state
├── lib/
│   └── types.ts                  # Note TypeScript interface
└── utils/supabase/
    ├── client.ts                 # Browser Supabase client
    ├── server.ts                 # Server Component Supabase client
    └── middleware.ts             # Session refresh + route guarding
```

### Design System

The visual identity follows a **brutalist editorial** aesthetic:

- **Primary colour:** Maroon Red (`#800000`) — `var(--color-primary)`
- **Display font:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) — used for headings
- **Body font:** [Inter](https://fonts.google.com/specimen/Inter) — used for body copy
- **Theme tokens:** All colours wired via CSS variables in `globals.css` to support dark/light mode without flicker
- **Motion:** Entry animations via Framer Motion with staggered card delays

### Authentication Flow

```
Landing Page (/)
    │
    ├─ Not logged in → /signup (create account)
    │       └─ On success → /dashboard
    │
    └─ Already have account → /login
            └─ On success → /dashboard

Protected routes (/dashboard, /vault, /calendar):
    → Middleware checks Supabase session cookie
    → No session → redirected to /signup
```

### Data Flow (Current: LocalStorage)

```
useNotes() hook
  → reads/writes to localStorage key: "graphen_notes"
  → exported API: addNote, updateNote, deleteNote, togglePrivacy
  → consumed by: Dashboard, NoteEditor, Vault, Calendar pages
```

> **Note:** The Supabase database schema (`supabase_schema.sql`) is prepared for migrating notes to PostgreSQL with Row Level Security when ready.

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn
- A [Supabase](https://supabase.com) account (free tier works)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/graphen.git
cd graphen

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials (see below)

# 4. Start the dev server
npm run dev
```

Visit `http://localhost:3000`.

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_...
```

You can find these in your Supabase project under **Project Settings → API**.

> ⚠️ **Email Confirmations:** If signup redirects without logging you in, go to Supabase Dashboard → Authentication → Providers → Email and **disable "Confirm email"** (or check your inbox for the confirmation link).

### Setting Up the Database (Optional — for Supabase-backed notes)

Open the Supabase SQL Editor and run the contents of `supabase_schema.sql`. This creates a `notes` table with Row Level Security preconfigured so users can only access their own notes.

---

## 📖 How to Use Graphen

### Creating Notes

1. Log in or sign up at `/signup`
2. On the dashboard, click **"+ New Note"** (top-right) or the dashed card
3. The Sidebar's **"Add new"** button also creates a note and opens the editor immediately

### Editing Notes

- Click any note card to open it in full-screen editor
- Title and content are saved when you click **"Save"**
- Use the **🔒 / 🔓** button to toggle private status
- Change note colour from the **colour picker** in the editor toolbar

### Private Vault

- Navigate to **Vault** in the sidebar
- Enter PIN `1234` (default) to unlock
- Mark any note as private in the editor to move it here

### Search

- Press `Ctrl+K` anywhere in the dashboard
- Type to fuzzy-search across titles and content
- Results appear as a dropdown; click to open the note

### Calendar View

- Navigate to **Calendar** in the sidebar
- Days with notes show a coloured dot
- Click a day to see all notes created on that date

### Logout

- Click the **↩ logout icon** at the bottom of the sidebar
- Your session is destroyed and you are redirected to `/login`

---

## 🎨 Landing Page

The landing page (`/`) features:

- Animated hero section with scroll-triggered text
- Feature breakdown sections
- **3D Model Showcase** — renders `/public/star3d.glb` via Three.js canvas
- About, Vision, and Contact Us form sections
- Comprehensive footer with navigation

> The 3D model renderer is excluded from the Next.js auth middleware matcher to prevent binary asset interference with session cookies.

---

## 🛠️ Development Commands

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Production build (type-checks + compiles)
npm run start      # Serve the production build locally
npm run lint       # Run ESLint
```

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `next` | Full-stack React framework |
| `@supabase/ssr` | Server-side Supabase auth and session management |
| `@supabase/supabase-js` | Supabase database/auth client |
| `framer-motion` | Page and component animations |
| `three` + `@react-three/fiber` + `@react-three/drei` | 3D model rendering |
| `fuse.js` | Fuzzy search across notes |
| `date-fns` | Date formatting and comparison |
| `lucide-react` | Icon system |
| `react-markdown` | Markdown rendering in notes |
| `uuid` | Unique ID generation for notes |

---

## 🔐 Security Notes

- Auth sessions are stored in **HttpOnly cookies** via `@supabase/ssr` — not in `localStorage`
- The Next.js middleware validates sessions on **every request** to protected routes
- The Supabase database schema uses **Row Level Security (RLS)** — users can only query their own rows
- The vault PIN is a local client-side guard — for true security, vault access should be backed by a separate Supabase policy

---

## 📄 License

MIT © Graphen
