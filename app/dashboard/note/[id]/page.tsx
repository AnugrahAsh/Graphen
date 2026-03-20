"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useNotes } from "@/hooks/useNotes";
import { ArrowLeft, Save, Trash2, Lock, Unlock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function NoteEditor() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { notes, updateNote, deleteNote, togglePrivacy, isLoaded } = useNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const note = notes.find((n) => n.id === id);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  // Auto-save logic
  useEffect(() => {
    if (!isLoaded || !note) return;
    const timeoutId = setTimeout(() => {
      if (title !== note.title || content !== note.content) {
        updateNote(id, { title, content });
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [title, content, note, id, updateNote, isLoaded]);

  if (!isLoaded) return <div className="p-8">Loading Note...</div>;
  if (!note) return <div className="p-8">Note not found.</div>;

  const handleDelete = () => {
    deleteNote(id);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Editor Header */}
      <header className="px-8 py-5 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 -ml-2 rounded-full hover:bg-surface text-muted hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="text-sm text-muted">
              Last edited {format(note.updatedAt, "MMM d, yyyy 'at' hh:mm a")}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => togglePrivacy(id)}
            className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium ${
              note.isPrivate
                ? "bg-magenta/10 text-magenta hover:bg-magenta/20"
                : "hover:bg-surface text-muted hover:text-foreground"
            }`}
          >
            {note.isPrivate ? <Lock size={16} /> : <Unlock size={16} />}
            <span className="hidden sm:inline">{note.isPrivate ? "Private" : "Make Private"}</span>
          </button>
          
          <button
            onClick={() => updateNote(id, { title, content })}
            className="p-2 rounded-lg hover:bg-surface text-muted hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Save size={16} />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            onClick={handleDelete}
            className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors flex items-center gap-2 text-sm font-medium ml-2"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </header>

      {/* Editor Body */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="max-w-4xl mx-auto px-8 py-10 h-full flex flex-col">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="text-4xl font-bold bg-transparent border-none outline-none text-foreground placeholder-muted mb-6 w-full resize-none"
          />
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing your note here... (Markdown supported)"
            className="flex-1 w-full bg-transparent border-none outline-none text-lg text-foreground/90 placeholder-muted/50 resize-none leading-relaxed"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
