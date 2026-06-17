import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface RetrievedNote {
  id: string;
  title: string;
  content: string;
  similarity: number;
}

/**
 * Asks Claude to answer a question using only the provided notes as
 * context — a minimal Retrieval-Augmented Generation (RAG) pipeline.
 * If the notes don't contain the answer, Claude is instructed to say so
 * rather than guessing.
 */
export async function answerFromNotes(
  question: string,
  notes: RetrievedNote[]
): Promise<string> {
  const context = notes
    .map((n, i) => `[Note ${i + 1}: "${n.title}"]\n${n.content}`)
    .join("\n\n");

  const message = await anthropic.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 500,
    system:
      "You answer questions using ONLY the notes provided as context. " +
      "If the notes don't contain the answer, say you don't have enough " +
      "information in the notes rather than guessing. Cite which note " +
      "number(s) you used.",
    messages: [
      {
        role: "user",
        content: `Notes:\n\n${context}\n\nQuestion: ${question}`,
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  return textBlock && textBlock.type === "text" ? textBlock.text : "";
}
