import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const EMBEDDING_MODEL = "text-embedding-3-small"; // 1536 dimensions

/**
 * Turns text into a 1536-dimension embedding vector.
 * Used both when saving a note and when running a search query, so that
 * similar meanings end up close together in vector space.
 */
export async function getEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  });

  return response.data[0].embedding;
}

/** Formats a JS number array as the literal pgvector expects in raw SQL. */
export function toVectorLiteral(embedding: number[]): string {
  return `[${embedding.join(",")}]`;
}
