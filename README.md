# NoteMind AI

A small full-stack notes app with AI-powered semantic search and a "chat with
your notes" feature. Built as a weekend project to touch every layer of the
stack: frontend, backend, database, AI integration, containerization, and CI/CD.
Setup In Progress

## Architecture

```
┌──────────────┐      REST       ┌──────────────┐
│  React (TS)  │ ───────────────▶│ Express (TS) │
│   Vercel     │ ◀─────────────── │   Render     │
└──────────────┘                 └──────┬───────┘
                                         │
                         ┌───────────────┼────────────────┐
                         ▼               ▼                ▼
                  OpenAI Embeddings  Anthropic Claude  Postgres + pgvector
                   (semantic search)   (RAG answers)        (Neon)
```

- **Frontend** — React + TypeScript + Vite + Tailwind. Lets you create/edit
  notes, run semantic search, and ask questions about your notes.
- **Backend** — Node + Express + TypeScript. REST API for notes CRUD,
  semantic search, and a RAG-style chat endpoint.
- **Database** — Postgres with the `pgvector` extension (hosted free on
  [Neon](https://neon.tech)). Each note's embedding is stored as a vector
  column for similarity search.
- **AI** — OpenAI's `text-embedding-3-small` turns note text into vectors.
  Anthropic's Claude answers questions using the most relevant notes as
  context (a lightweight Retrieval-Augmented Generation pipeline).
- **DevOps** — Dockerfile + docker-compose for local dev, GitHub Actions for
  CI (build verification on every push). Render and Vercel auto-deploy from
  GitHub, so pushing to `main` is your CD pipeline.

## Project structure

```
notemind-ai/
├── server/         # Express API
├── client/         # React frontend
├── docker-compose.yml
└── .github/workflows/ci.yml
```

## Step-by-step setup

See the full walkthrough in the chat where this was generated, or follow
`server/README.md` and `client/README.md` for the short version of each
half.

## Live demo

_Add your deployed URLs here once live:_
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.onrender.com`
