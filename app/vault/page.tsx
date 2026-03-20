"use client";

import { useState, useEffect } from "react";
import { useNotes } from "@/hooks/useNotes";
import { SearchBar } from "@/components/SearchBar";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Lock, FileText, MoreVertical, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";

export default function VaultPage() {
  const { notes, isLoaded } = useNotes();
  const router = useRouter();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check if session is already unlocked (simple mock session)
    if (sessionStorage.getItem("vault_unlocked") === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN is 1234 for demo
    if (pin === "1234") {
      setIsUnlocked(true);
      sessionStorage.setItem("vault_unlocked", "true");
      setError(false);
    } else {
      setError(true);
      setPin("");
    }
  };

  const handleSelectNote = (id: string) => {
    router.push(`/dashboard/note/${id}`);
  };

  if (!isLoaded) return <div className="p-8">Loading...</div>;

  const privateNotes = notes.filter((n) => n.isPrivate);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {!isUnlocked ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-surface/50 border border-border rounded-3xl p-10 max-w-sm w-full text-center shadow-xl backdrop-blur-md"
            >
              <div className="w-20 h-20 bg-magenta/10 text-magenta rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Private Vault</h2>
              <p className="text-muted text-sm mb-8">Enter your PIN to access your private notes.</p>
              
              <form onSubmit={handleUnlock}>
                <div className="relative mb-6">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter PIN (e.g., 1234)"
                    className={`w-full bg-background border ${error ? 'border-red-500' : 'border-border'} text-foreground rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-magenta focus:border-transparent transition-all shadow-inner tracking-widest text-center`}
                    autoFocus
                  />
                  {error && <p className="text-red-500 text-xs mt-2 text-left px-2">Incorrect PIN. Try 1234.</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-foreground text-background font-semibold py-3 rounded-2xl hover:bg-magenta hover:text-white transition-all shadow-md active:scale-95"
                >
                  Unlock Vault
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-col h-full bg-background">
            {/* Top Header */}
            <header className="px-8 py-5 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold tracking-tight text-magenta flex items-center gap-2">
                  <Lock size={24} /> VAULT
                </h1>
              </div>
              <div className="flex-1 max-w-xl mx-8">
                <SearchBar notes={privateNotes} onSelect={handleSelectNote} />
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsUnlocked(false)}
                  className="text-sm text-muted hover:text-foreground font-medium px-4 py-2 border border-border rounded-full hover:bg-surface transition-colors"
                >
                  Lock Vault
                </button>
              </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-7xl mx-auto space-y-10">
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Confidential Notes</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {privateNotes.length === 0 ? (
                      <div className="col-span-full h-40 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-muted col-span-1">
                        <Lock size={24} className="mb-2 opacity-50" />
                        <p className="font-medium text-sm">No private notes found.</p>
                      </div>
                    ) : (
                      privateNotes.map((note, idx) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={note.id}
                          onClick={() => handleSelectNote(note.id)}
                          className="relative group h-64 rounded-2xl p-5 flex flex-col cursor-pointer transition-transform hover:-translate-y-1 shadow-[0_4px_20px_0_rgba(232,28,255,0.05)] hover:shadow-[0_8px_30px_0_rgba(232,28,255,0.15)] bg-surface border border-magenta/10 hover:border-magenta/30"
                        >
                          <div className="text-xs font-semibold text-magenta mb-3 flex justify-between items-center">
                            {format(note.createdAt, "MM/dd/yyyy")}
                            <Lock size={12} />
                          </div>
                          <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2">
                            {note.title || "Untitled"}
                          </h3>
                          <p className="text-sm text-muted line-clamp-4 flex-1">
                            {note.content || "Empty note"}
                          </p>
                          
                          <div className="flex items-center gap-2 mt-4 text-xs font-medium text-muted">
                            {format(note.updatedAt, "hh:mm a")}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
