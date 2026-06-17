import { useEffect, useState } from "react";
import { api, Note } from "./api";
import NoteEditor from "./components/NoteEditor";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";
import ChatBox from "./components/ChatBox";

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    api.listNotes().then(setNotes);
  }, []);

  async function handleCreate(title: string, content: string) {
    const note = await api.createNote(title, content);
    setNotes((prev) => [note, ...prev]);
  }

  async function handleDelete(id: string) {
    await api.deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <h1 className="font-display font-bold text-2xl">NoteMind AI</h1>
          <p className="text-sm text-muted">
            Notes that you can search by meaning — and ask questions about.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <NoteEditor onCreate={handleCreate} />
          <NoteList notes={notes} onDelete={handleDelete} />
        </div>
        <div className="space-y-6">
          <SearchBar />
          <ChatBox />
        </div>
      </main>
    </div>
  );
}
