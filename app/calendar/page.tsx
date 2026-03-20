"use client";

import { useNotes } from "@/hooks/useNotes";
import { Sidebar } from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { format, isSameDay } from "date-fns";
import { Calendar as CalendarIcon, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CalendarPage() {
  const { notes, isLoaded } = useNotes();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  if (!isLoaded) return <div className="p-8">Loading...</div>;

  const publicNotes = notes.filter((n) => !n.isPrivate);

  const notesForSelectedDate = publicNotes.filter(n => 
    isSameDay(new Date(n.updatedAt), selectedDate) || isSameDay(new Date(n.createdAt), selectedDate)
  );

  const handleSelectNote = (id: string) => {
    router.push(`/dashboard/note/${id}`);
  };

  // Generate basic calendar days logic (mock for UI purposes)
  const currentMonth = format(selectedDate, "MMMM yyyy");
  
  // Fake the calendar boxes to look nice
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 15 + i);
    return d;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="px-8 py-5 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30">
          <h1 className="text-2xl font-bold tracking-tight uppercase flex items-center gap-2">
            <CalendarIcon size={24} /> Calendar
          </h1>
          <div className="text-lg font-medium tracking-wider">{currentMonth}</div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 flex gap-8 flex-col lg:flex-row">
          
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-6">Timeline View</h2>
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-3 mb-8">
              {days.map((day, idx) => {
                const hasNotes = publicNotes.some(n => isSameDay(new Date(n.createdAt), day));
                const isSelected = isSameDay(day, selectedDate);
                
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center border transition-all ${
                      isSelected 
                        ? "border-primary bg-primary text-white shadow-lg scale-110 z-10" 
                        : "border-border bg-surface hover:border-primary/50"
                    }`}
                  >
                    <span className="text-xs opacity-70 mb-1">{format(day, "E")}</span>
                    <span className="text-lg font-bold">{format(day, "d")}</span>
                    {hasNotes && (
                      <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? "bg-white" : "bg-primary"}`} />
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="bg-surface/50 border border-border rounded-3xl p-8 min-h-[400px]">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                Notes on {format(selectedDate, "MMMM d, yyyy")}
              </h3>
              
              <div className="space-y-4">
                {notesForSelectedDate.length === 0 ? (
                  <div className="text-center text-muted py-10 flex flex-col items-center">
                    <CalendarIcon size={32} className="mb-4 opacity-50" />
                    <p>No notes updated or created on this day.</p>
                  </div>
                ) : (
                  notesForSelectedDate.map((note, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={note.id}
                      onClick={() => handleSelectNote(note.id)}
                      className="bg-background border border-border rounded-2xl p-5 hover:border-primary cursor-pointer transition-colors shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg">{note.title || "Untitled"}</h4>
                        <span className="text-xs text-muted font-medium bg-surface px-2 py-1 rounded-md">
                          {format(note.updatedAt, "hh:mm a")}
                        </span>
                      </div>
                      <p className="text-muted text-sm line-clamp-2">{note.content}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
