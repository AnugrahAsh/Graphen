"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Calendar, Lock, Plus, Settings, Trash2, LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";
import { ThemeToggle } from "./ThemeToggle";

export function Sidebar({ onAddNote }: { onAddNote?: () => void }) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "My Notes", icon: Book },
    { href: "/calendar", label: "Calendar", icon: Calendar },
    { href: "/vault", label: "Private Vault", icon: Lock },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-background flex flex-col h-screen fixed left-0 top-0 lg:static z-40 hidden lg:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0">
          G
        </div>
        <span className="font-semibold text-lg tracking-wide uppercase truncate">Graphen</span>
      </div>

      <div className="px-4 pb-6">
        <button 
          onClick={onAddNote}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-foreground text-background rounded-xl hover:opacity-90 transition-all font-medium border border-transparent hover:scale-[1.02] active:scale-95 shadow-sm"
        >
          <Plus size={18} />
          <span>Add new</span>
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                isActive 
                  ? "bg-surface text-foreground font-medium shadow-sm border border-border" 
                  : "text-muted hover:bg-surface hover:text-foreground border border-transparent"
              }`}
            >
              <Icon size={18} className={isActive ? "text-primary" : ""} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-border mt-auto flex items-center justify-between">
        <div className="flex items-center gap-4 text-muted">
          <form action={logout}>
            <button type="submit" className="hover:text-maroon transition-colors p-1 flex items-center gap-2" title="Sign Out">
              <LogOut size={18} />
            </button>
          </form>
          <button className="hover:text-foreground transition-colors p-1" title="Settings">
            <Settings size={18} />
          </button>
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
}
