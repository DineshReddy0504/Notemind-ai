import { Note } from "../api";

interface Props {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: Props) {
  if (notes.length === 0) {
    return (
      <p className="text-sm text-muted">
        No notes yet — add one to start building your knowledge base.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {notes.map((note) => (
        <li
          key={note.id}
          className="bg-surface rounded-xl border border-gray-200 p-4 flex justify-between gap-4"
        >
          <div>
            <h3 className="font-medium">{note.title}</h3>
            <p className="text-sm text-muted mt-1 whitespace-pre-wrap">
              {note.content}
            </p>
          </div>
          <button
            onClick={() => onDelete(note.id)}
            className="text-xs text-muted hover:text-red-500 shrink-0"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
