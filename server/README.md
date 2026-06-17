# NoteMind Server

Express + TypeScript API. See the root README for full architecture.

## Local setup

```bash
cp .env.example .env        # then fill in DATABASE_URL / API keys
npm install
# enable pgvector on your DB once (see prisma/init.sql), then:
npx prisma migrate dev --name init
npm run dev
```

API runs on `http://localhost:4000`. Health check: `GET /health`.

## Endpoints

| Method | Path                  | Description                          |
|--------|-----------------------|---------------------------------------|
| GET    | /api/notes            | List all notes                        |
| POST   | /api/notes            | Create a note (auto-embedded)         |
| PUT    | /api/notes/:id        | Update a note (re-embedded)           |
| DELETE | /api/notes/:id        | Delete a note                         |
| GET    | /api/notes/search?q=  | Semantic search across notes          |
| POST   | /api/notes/chat       | Ask a question, answered via RAG      |
