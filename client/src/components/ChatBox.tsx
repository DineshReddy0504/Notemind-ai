import { FormEvent, useState } from "react";
import { api } from "../api";

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [sources, setSources] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);
    try {
      const res = await api.chat(question.trim());
      setAnswer(res.answer);
      setSources(res.sources);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface rounded-xl border border-gray-200 p-5">
      <h2 className="font-display font-semibold text-lg mb-3">
        Ask your notes
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What did I write about...?"
          className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-amber text-ink text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {answer && (
        <div className="bg-accentSoft rounded-lg p-3 text-sm">
          <p className="whitespace-pre-wrap">{answer}</p>
          {sources.length > 0 && (
            <p className="mt-2 text-xs text-muted">
              Based on: {sources.map((s) => s.title).join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
