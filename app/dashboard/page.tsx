"use client";

import { useNotes } from "@/hooks/useNotes";
import { SearchBar } from "@/components/SearchBar";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Lock, FileText, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { notes, addNote, isLoaded } = useNotes();
  const router = useRouter();

  if (!isLoaded) return <div className="p-8">Loading...</div>;

  const handleSelectNote = (id: string) => {
    router.push(`/dashboard/note/${id}`);
  };

  const createNote = () => {
    const newNote = addNote("Untitled Note", "");
    router.push(`/dashboard/note/${newNote.id}`);
  };

  const publicNotes = notes.filter((n) => !n.isPrivate);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Top Header */}
      <header className="px-8 py-5 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30">
        <h1 className="text-2xl font-bold tracking-tight">MY NOTES</h1>
        <div className="flex-1 max-w-xl mx-8">
          <SearchBar notes={notes} onSelect={handleSelectNote} />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={createNote}
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-xl font-semibold text-sm hover:opacity-90 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span className="text-lg leading-none">+</span> New Note
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Notes</h2>
              <div className="flex gap-4 text-sm text-muted font-medium border-b border-border">
                <button className="pb-2 border-b-2 border-primary text-foreground">All Notes</button>
                <button className="pb-2 border-b-2 border-transparent hover:text-foreground">Today</button>
                <button className="pb-2 border-b-2 border-transparent hover:text-foreground">This Week</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Always-visible create card */}
              <div
                onClick={createNote}
                className="h-64 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-muted hover:border-primary hover:text-primary transition-colors cursor-pointer bg-surface/30"
              >
                <FileText size={32} className="mb-2" />
                <p className="font-medium">{publicNotes.length === 0 ? 'Create your first note' : 'New Note'}</p>
              </div>

              {publicNotes.length > 0 && (
                publicNotes.map((note, idx) => {
                  const colors = [
                    "bg-[#F7EEB7] text-[#5C5632]", // yellow note
                    "bg-[#F6B8B8] text-[#5E3636]", // pink note
                    "bg-[#B8DEFC] text-[#36495E]", // blue note
                    "bg-[#D9F2B4] text-[#415C2A]"  // green note
                  ];
                  const colorClass = colors[idx % colors.length];

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={note.id}
                      onClick={() => handleSelectNote(note.id)}
                      className={`relative group h-64 rounded-2xl p-5 flex flex-col cursor-pointer transition-transform hover:-translate-y-1 shadow-sm hover:shadow-md ${colorClass} dark:opacity-90 dark:hover:opacity-100`}
                    >
                      <div className="text-xs font-semibold opacity-70 mb-3 flex justify-between items-center">
                        {format(note.createdAt, "MM/dd/yyyy")}
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-black/10 rounded-full" onClick={(e) => { e.stopPropagation(); /* actions menu */}}>
                          <MoreVertical size={14} />
                        </button>
                      </div>
                      <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2">
                        {note.title || "Untitled"}
                      </h3>
                      <p className="text-sm opacity-80 line-clamp-4 flex-1">
                        {note.content || "Empty note"}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-4 text-xs font-medium opacity-70">
                        {format(note.updatedAt, "hh:mm a, EEEE")}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
