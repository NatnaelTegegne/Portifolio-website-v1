# My Portifolio

Personal site for Natnael Tegegne — portfolio, project showcase, and blog.

## Structure

| Folder      | What it is                                                                 |
| ----------- | -------------------------------------------------------------------------- |
| `frontend/` | React 19 + Vite site. Reads content from Sanity.                            |
| `studio/`   | Sanity Studio — where posts, projects, and experience are written. See its own README. |
| `backend/`  | Express + MongoDB API. Currently unused by the frontend.                    |

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
| `/projects`    | Every visible project                                   |
| `/projects/:slug` | Project case study (only for projects with a body)   |

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

- **Blog posts, projects, and experience** — Sanity. Edit in the Studio, no
  deploy needed. A role with no end date shows as current in the timeline.
- **Hero, about, contact copy** — still hardcoded in the components under
  `frontend/src/components/`.

On a fresh dataset, import the starter content once from `studio/`:
`npm run seed` (projects) and `npm run seed:experience` (experience timeline).
See [`studio/README.md`](studio/README.md) for details.
