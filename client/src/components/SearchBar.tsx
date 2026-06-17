import { FormEvent, useState } from "react";
import { api, SearchResult } from "../api";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      setResults(await api.search(query.trim()));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface rounded-xl border border-gray-200 p-5">
      <h2 className="font-display font-semibold text-lg mb-3">
        Semantic search
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by meaning, not just keywords..."
          className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-ink text-white text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <ul className="space-y-2">
        {results.map((r) => (
          <li
            key={r.id}
            className="border-l-4 pl-3 py-1"
            style={{
              borderColor: `rgba(76, 95, 213, ${Math.max(r.similarity, 0.15)})`,
            }}
          >
            <div className="flex justify-between items-baseline">
              <h4 className="font-medium text-sm">{r.title}</h4>
              <span className="text-xs text-muted">
                {Math.round(r.similarity * 100)}% match
              </span>
            </div>
            <p className="text-sm text-muted line-clamp-2">{r.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
