import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Note } from "@/lib/types";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("graphen_notes");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse notes from local storage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("graphen_notes", JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  const addNote = (title: string, content: string, isPrivate: boolean = false) => {
    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      isPrivate,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (id: string, updates: Partial<Pick<Note, "title" | "content" | "isPrivate">>) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...updates, updatedAt: Date.now() }
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const togglePrivacy = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, isPrivate: !note.isPrivate, updatedAt: Date.now() }
          : note
      )
    );
  };

  return { notes, addNote, updateNote, deleteNote, togglePrivacy, isLoaded };
}
