# My Portifolio

Personal site for Natnael Tegegne — portfolio, project showcase, and blog.

## Structure

| Folder      | What it is                                                                 |
| ----------- | -------------------------------------------------------------------------- |
| `frontend/` | React 19 + Vite site. Reads content from Sanity.                            |
| `studio/`   | Sanity Studio — where posts and projects are written. See its own README.   |
| `backend/`  | Express + MongoDB API. Currently unused by the frontend (see note below).   |

## Getting started

```bash
npm run install:all     # installs root, frontend, backend, and studio deps
```

Copy `frontend/.env.example` → `frontend/.env` and `studio/.env.example` →
`studio/.env`, then follow [`studio/README.md`](studio/README.md) to create the
Sanity project and fill in the IDs.

```bash
npm run dev:cms   # frontend (:5173) + Sanity Studio (:3333)
npm run client    # frontend only
npm run studio    # Studio only
npm run server    # Express backend only
```

## Routes

| Route          | Page                                                    |
| -------------- | ------------------------------------------------------- |
| `/`            | One-page portfolio: hero, about, projects, experience, contact |
| `/blog`        | Post index with category filtering                      |
| `/blog/:slug`  | Individual post                                         |

Because this is a client-routed SPA, the host must rewrite all paths to
`index.html` or a direct visit to `/blog/some-post` 404s. `frontend/vercel.json`
does this for Vercel; on Netlify you'd want a `_redirects` file instead.

## Deployment

Two independent Vercel projects from this one repo:

| Vercel project | Root directory | Domain                    |
| -------------- | -------------- | ------------------------- |
| portfolio      | `frontend`     | `<your-domain>`           |
| studio         | `studio`       | `studio.<your-domain>`    |

Each folder has its own `vercel.json`. Keeping them separate means a Sanity
upgrade can't break the portfolio build. Setup steps for the Studio project are
in [`studio/README.md`](studio/README.md).

## Where content lives

- **Blog posts and projects** — Sanity. Edit in the Studio, no deploy needed.
- **Hero, about, experience, contact copy** — still hardcoded in the components
  under `frontend/src/components/`.

## Note on the backend

`backend/` exposes `/api/projects` and `/api/contact` against MongoDB, but the
frontend does not call either one:

- Projects now come from Sanity.
- The contact form posts to a Google Apps Script (`VITE_API_URL`), not to
  `/api/contact`.

So the backend is currently dead code. Either point the contact form at it or
retire it — leaving it half-wired is the confusing option.
