# Sanity Studio

The content backend for the portfolio. This is where blog posts and projects are
written; the React app in `../frontend` reads from it.

## One-time setup

You need a Sanity account (free tier is plenty). These steps require a browser
login, so run them yourself.

```bash
cd studio
npm install          # already done if you ran install:all

npx sanity login     # opens a browser
npx sanity init      # choose "Create new project", dataset: production
```

`sanity init` will ask whether to overwrite `sanity.config.js` — **say no**. The
config here is already set up; init only needs to create the project for you.

Then copy the project ID it prints (also visible at
<https://www.sanity.io/manage>) into two files:

`studio/.env`

```
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_HOST=natnael-portfolio
```

`frontend/.env`

```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

### Allow the site to read the dataset

At <https://www.sanity.io/manage> → your project → **API**:

- **CORS origins** — add `http://localhost:5173` and your production domain,
  both with "Allow credentials" **off**; the site only reads public content.
  (Studio origins are different — see the table in the deploy section below.)
- **Dataset visibility** — keep `production` **public**. That is what lets the
  frontend read without a token. Never put a write token in the frontend.

## Daily use

```bash
npm run dev      # Studio at http://localhost:3333
```

## Deploying to studio.<your-domain>

The Studio deploys as its **own Vercel project**, separate from the portfolio.
Same repo, different root directory — so a CMS dependency upgrade can never
break the portfolio build.

`vercel.json` here already sets the build command, output directory, and the
SPA rewrite the Studio needs. What's left is the dashboard wiring:

**1. Create the project**

On [vercel.com/new](https://vercel.com/new), import this same repository, then:

| Setting          | Value                                  |
| ---------------- | -------------------------------------- |
| Project name     | e.g. `portfolio-studio`                |
| **Root Directory** | `studio`  ← the important one          |
| Framework preset | Other (`vercel.json` handles the rest) |

**2. Add environment variables**

`.env` is gitignored, so Vercel needs its own copy. Under Settings →
Environment Variables, for all environments:

```
SANITY_STUDIO_PROJECT_ID=yraltnc5
SANITY_STUDIO_DATASET=production
```

**3. Point the subdomain at it**

Under the project's Settings → Domains, add `studio.<your-domain>`. Vercel will
tell you which record to create with your DNS provider — a `CNAME` for
`studio` pointing at `cname.vercel-dns.com`.

**4. Allow the new origin to log in**

At [sanity.io/manage](https://www.sanity.io/manage) → project → API → CORS
origins, add `https://studio.<your-domain>` **with "Allow credentials" ON**.

This is the one setting people get wrong. The Studio signs you in, so it needs
credentialed requests. The portfolio only reads public content, so its origin
must have credentials **OFF**. Two origins, two different settings:

| Origin                      | Allow credentials |
| --------------------------- | ----------------- |
| `http://localhost:3333`     | ✅ on             |
| `https://studio.<domain>`   | ✅ on             |
| `http://localhost:5173`     | ❌ off            |
| `https://<your-domain>`     | ❌ off            |

Pushing to `main` now redeploys both projects independently.

### Alternative: free Sanity-hosted Studio

If you'd rather skip the subdomain, set `SANITY_STUDIO_HOST` in `.env` and run
`npx sanity deploy` to get `https://<host>.sanity.studio` for free. The two
approaches can coexist.

## Seeding the existing projects

The four projects that used to be hardcoded in `Projects.jsx` are in
`seed/projects.ndjson`. Import them once:

```bash
npm run seed
```

Re-running it will error on duplicate IDs; use
`npx sanity dataset import ./seed/projects.ndjson production --replace` if you
want to overwrite.

The seed leaves `publishedAt` empty since the original dates weren't recorded —
set them in the Studio if you want date-based ordering, otherwise the `order`
field controls the sequence.

## Content model

| Type       | Purpose                                                   |
| ---------- | --------------------------------------------------------- |
| `post`     | Blog posts. Rendered at `/blog` and `/blog/<slug>`.        |
| `project`  | Portfolio projects. Rendered in the Projects section.      |
| `category` | Tags for posts. Drives the filter pills on `/blog`.        |
| `author`   | Post bylines.                                             |

Two scheduling behaviours are built into the queries:

- A post with a **future `publishedAt`** stays hidden until that time passes.
- A project with **`hidden` checked** stays in the Studio but off the site.

Drafts are excluded from the site automatically — content appears only after you
hit **Publish**.

## Adding a new block type to post bodies

`schemaTypes/blockContent.js` defines what can go in a post body. Anything added
there needs a matching renderer in `frontend/src/components/PortableText.jsx`,
or it will silently render nothing.
