import { Router } from "express";
import { prisma } from "../db";
import { getEmbedding, toVectorLiteral } from "../services/embeddings";
import { answerFromNotes, RetrievedNote } from "../services/chat";

export const notesRouter = Router();

/** Shared helper: embed `query` and pull back the closest notes. */
async function retrieveSimilarNotes(
  query: string,
  limit = 5
): Promise<RetrievedNote[]> {
  const embedding = await getEmbedding(query);
  const literal = toVectorLiteral(embedding);

  return prisma.$queryRaw<RetrievedNote[]>`
    SELECT id, title, content,
           1 - (embedding <=> ${literal}::vector) AS similarity
    FROM "Note"
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> ${literal}::vector
    LIMIT ${limit}
  `;
}

// GET /api/notes — list all notes (no embedding payload, it's large/internal)
notesRouter.get("/", async (_req, res) => {
  const notes = await prisma.note.findMany({
    select: { id: true, title: true, content: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(notes);
});

// POST /api/notes — create a note and embed it
notesRouter.post("/", async (req, res) => {
  const { title, content } = req.body as { title?: string; content?: string };
  if (!title || !content) {
    return res.status(400).json({ error: "title and content are required" });
  }

  const note = await prisma.note.create({ data: { title, content } });

  const embedding = await getEmbedding(`${title}\n${content}`);
  const literal = toVectorLiteral(embedding);
  await prisma.$executeRaw`
    UPDATE "Note" SET embedding = ${literal}::vector WHERE id = ${note.id}
  `;

  res.status(201).json(note);
});

// PUT /api/notes/:id — update a note and re-embed it
notesRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body as { title?: string; content?: string };
  if (!title || !content) {
    return res.status(400).json({ error: "title and content are required" });
  }

  const note = await prisma.note.update({
    where: { id },
    data: { title, content },
  });

  const embedding = await getEmbedding(`${title}\n${content}`);
  const literal = toVectorLiteral(embedding);
  await prisma.$executeRaw`
    UPDATE "Note" SET embedding = ${literal}::vector WHERE id = ${id}
  `;

  res.json(note);
});

// DELETE /api/notes/:id
notesRouter.delete("/:id", async (req, res) => {
  await prisma.note.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

// GET /api/notes/search?q=... — semantic search
notesRouter.get("/search", async (req, res) => {
  const q = req.query.q as string | undefined;
  if (!q) return res.status(400).json({ error: "q query param is required" });

  const results = await retrieveSimilarNotes(q, 5);
  res.json(results);
});

// POST /api/notes/chat — ask a question, answered using the most relevant notes
notesRouter.post("/chat", async (req, res) => {
  const { question } = req.body as { question?: string };
  if (!question) {
    return res.status(400).json({ error: "question is required" });
  }

  const relevant = await retrieveSimilarNotes(question, 4);
  const answer = await answerFromNotes(question, relevant);

  res.json({
    answer,
    sources: relevant.map((n) => ({ id: n.id, title: n.title })),
  });
});
