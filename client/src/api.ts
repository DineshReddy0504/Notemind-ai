const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  similarity: number;
}

export interface ChatResponse {
  answer: string;
  sources: { id: string; title: string }[];
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  listNotes: () => request<Note[]>("/api/notes"),
  createNote: (title: string, content: string) =>
    request<Note>("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    }),
  updateNote: (id: string, title: string, content: string) =>
    request<Note>(`/api/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
    }),
  deleteNote: (id: string) =>
    request<void>(`/api/notes/${id}`, { method: "DELETE" }),
  search: (q: string) =>
    request<SearchResult[]>(`/api/notes/search?q=${encodeURIComponent(q)}`),
  chat: (question: string) =>
    request<ChatResponse>("/api/notes/chat", {
      method: "POST",
      body: JSON.stringify({ question }),
    }),
};
