# Project Overview

Design and build a **personal portfolio website** with the following core features, ensuring good practices are implemented for better discoverability:

- **Dashboard**: A centralized dashboard to manage blog posts and view dynamic project content.
- **Blog Management**: Create a dynamic blog management system that allows owner to create, read, update, and delete blogs (Owner Only).
- **Projects Showcase**: Include a section for personal projects (Public).
- Responsive UI and polished UX.

---

## Tech Stack

- **Frontend Framework**: NextJS
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with responsive utility classes) or other CSS frameworks
- **For notifications**: react-hot-toast

---

## 📌 Minimum Requirements

### Public Pages (Accessible to All Visitors – No Login Required)

- **Blog Management**
  - Public users should be able to view all blogs page and individual blog pages.
  - Use **ISR** for the "All Blogs" page to fetch new content without rebuilding the entire site.
  - Use ISR with `getStaticPaths` + `revalidate` for individual blog pages to generate content dynamically for each user request.
- **Project Showcase**
  - A section dedicated to personal projects with **thumbnail**, **project link**, **live site**, **description, and features**.
  - Use **ISR** to allow dynamic updates or fetching of project data.

### Private Pages (Only for Portfolio Owner)

- **Dashboard**
  - A dynamic **owner-only dashboard** where the owner can access a private dashboard to manage blogs, projects, and other content.

---

## Bonus (Optional)

This section is not required to meet the main requirements, but completing it can help you earn full marks.

- **Rich Text Editor**
  - Use a **rich text editor** to create, edit, and format blog/project content.
  - Include options like bold, italic, links, images, etc.
  - **Example Package:** React Quill

---

## ❄️ General UI/UX Enhancements

- Interactive UI: carousels, cards, skeletons and smooth transitions.
- Lazy-loading for heavy assets, no broken links or non-functional buttons.
- Accessibility-compliant components and semantic HTML.
- **Strict Error Handling (⚠️ Mandatory for Full Marks)**
  - Proper form validation with clear error messages (e.g., required fields, invalid email, password mismatch).
  - User-friendly messages for API/network errors and unauthorized actions.
  - Success/error feedback via toast/alerts (e.g., `react-hot-toast`).

## Submission Guidelines

### 1. Codebase

- Clean, modular code following best practices.
- Include a comprehensive `README.md` with:
  - Live deployment link
  - Project overview & features
  - Technology stack
  - Setup instructions
  - Any other relevant notes

### 2. GitHub Repository

- Separate repositories/mono for **Frontend** and **Backend**.
- Minimum **10 meaningful commits** per repo showing development progress.

### 3. Live Deployment

- Provide live URLs for both frontend and backend.

### 4. Demo Video

- 10-15 minute walkthrough of the project.

### 5. Credentials

- Provide admin login details (email & password) for testing.
