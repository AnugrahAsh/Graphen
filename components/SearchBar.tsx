"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import { Note } from "@/lib/types";

export function SearchBar({ notes, onSelect }: { notes: Note[], onSelect: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Note[]>([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fuse = new Fuse(notes, {
      keys: ["title", "content"],
      threshold: 0.3,
      ignoreLocation: true,
    });

    const searchResults = fuse.search(query).map((res) => res.item);
    setResults(searchResults);
  }, [query, notes]);

  // Handle keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("global-search")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-muted" size={18} />
        <input
          id="global-search"
          type="text"
          placeholder="Search notes... (Ctrl+K)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-surface border border-border text-foreground rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted shadow-sm"
        />
      </div>

      {query && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden max-h-96 overflow-y-auto">
          {results.map((note) => (
            <button
              key={note.id}
              onClick={() => {
                onSelect(note.id);
                setQuery("");
              }}
              className="w-full text-left px-4 py-3 hover:bg-surface border-b border-border last:border-0 transition-colors"
            >
              <div className="font-medium text-foreground">{note.title || "Untitled"}</div>
              <div className="text-sm text-muted truncate mt-0.5">
                {note.content.substring(0, 80) || "No content"}...
              </div>
            </button>
          ))}
        </div>
      )}
      
      {query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-lg z-50 p-6 text-center text-muted">
          No notes found for "{query}"
        </div>
      )}
    </div>
  );
}
