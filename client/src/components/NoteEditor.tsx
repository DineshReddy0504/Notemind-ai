import { FormEvent, useState } from "react";

interface Props {
  onCreate: (title: string, content: string) => Promise<void>;
}

export default function NoteEditor({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    await onCreate(title.trim(), content.trim());
    setTitle("");
    setContent("");
    setSaving(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface rounded-xl border border-gray-200 p-5 space-y-3"
    >
      <h2 className="font-display font-semibold text-lg">New note</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something worth remembering..."
        rows={4}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
      />
      <button
        type="submit"
        disabled={saving}
        className="bg-accent text-white text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {saving ? "Saving & embedding..." : "Save note"}
      </button>
    </form>
  );
}
