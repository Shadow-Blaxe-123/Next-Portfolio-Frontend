# Personal Portfolio Website

This is my personal portfolio, to showcase my experience and achievements as a developer to the world.

---

## Project Overview

This is the **frontend part** of a personal portfolio website, providing:

* **Public Pages**: Home, About Section, Blog list, Individual blog pages, Projects list, individual project pages.
* **Private Pages**: Owner dashboard with CRUD operations for blogs and projects.
* **Dynamic content** using Next.js **ISR (Incremental Static Regeneration)**.
* **Responsive and dark-mode-first UI** for optimal user experience.

---

## Tech Stack

* **Frontend Framework**: Next.js (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS + Shadcn UI components
* **State & Forms**: React Hook Form, Zod (for validation)
* **Routing & Navigation**: Next.js navigation & layouts
* **Rich Text Editor**: Quill.js (for blogs/projects)
* **Notifications**: Sonner (`toast` for success/error)

---

## Features

### Public Pages

* **About Me** section with SSG for fast load.
* **Project List & Details** with thumbnails, live links, and descriptions.
* **Blog List & Details** pages using ISR (`getStaticProps` + `revalidate`) for dynamic updates.

### Private Pages

* **Login** (JWT-based) for portfolio owner.
* **Dashboard** to manage blogs and projects (CRUD).
* **Rich text editor** for content creation with formatting, images, and links.
* **Server-side protected routes** using `cookies` for authentication.

---

## Project Structure

```plaintext
src/
├─ app/                      # Next.js pages and layouts
|  ├─ login/                 # Login page
|  ├─ api/                   # Helper API
│  ├─ (private)/             # Owner dashboard (private)
│  |   └─ dashboard/         # Owner dashboard (private)
│  |     ├─ blogs/           # Private CRUD Blogs
│  |     └─ projects/        # Private CRUD projects
│  ├─ (public)/              # Public Routes
│      ├─ blogs/             # Public blog pages
│      └─ projects/          # Public project pages
├─ components/               # UI components & Shadcn components
│  ├─ ui/                    # Inputs, Buttons, Modals, Cards
│  ├─ modules/               # Cards, forms, particles background
├─ interface/                # TypeScript interfaces (Blog, Project, User)
├─ lib/                      # Helper functions (fetch, auth)
├─ schema/                   # Zod Schema
└─ provider/                 # Theme Provider
```

---

## Getting Started

1. **Clone the repository**

    ```bash
          git clone <repo-url>
          cd frontend
    ```

2. **Install dependencies**

    ```bash
        npm install
        # or
        yarn
    ```

3. **Run development server**

    ```bash
        npm run dev
        # or
        yarn dev
    ```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## Scripts

* `dev` – Run the development server.
* `build` – Build the production version.
* `start` – Start the production server.
* `lint` – Run ESLint checks.
* `format` – Run Prettier formatting.

---

## UI/UX Highlights

* **Dark-mode-first design** (always-on dark theme).
* **Shadcn UI components** for consistent styling (Cards, Buttons, Modals, Forms).
* **Responsive layout** for desktop and mobile devices.
* **Interactive elements**: Modals for updating/deleting blogs/projects, toast notifications for actions.
* **Rich Text Editor** (React Quill) for blog/project content.

---

## Authentication

* JWT-based authentication.
* Cookies (`accessToken`) are stored **httpOnly**.
* Private routes (dashboard, blog/project management) are protected server-side.
* Login errors and validation feedback handled via `toast`.

---

## Notifications

* Success and error messages via **Sonner toast**.
* Used for login success/failure, form submissions, CRUD operations
