
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { searchUsers } from "@/utils/searchUsers";

interface SearchBarProps {
  className?: string;
  isMobile?: boolean;
}

type UserResult = {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
};

export const SearchBar = ({ className = "", isMobile = false }: SearchBarProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserResult[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    const term = query.trim();
    const handle = setTimeout(async () => {
      if (!term) {
        setResults([]);
        setOpen(false);
        return;
      }
      const data = await searchUsers(term);
      setResults(data);
      setOpen(true);
      setActiveIndex(0);
    }, 250);
    return () => clearTimeout(handle);
  }, [query, user?.id]);

  // Click outside to close
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const onSelect = (u: UserResult) => {
    setOpen(false);
    setQuery("");
    if (u.username) {
      navigate(`/profile/${u.username}`);
    } else {
      navigate(`/profile/id/${u.id}`);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      onSelect(results[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.trim() && setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={isMobile ? t('nav.searchMobile') : t('nav.searchPlaceholder')}
        aria-expanded={open}
        aria-controls="search-results"
        className="pl-9"
      />

      {open && (
        <div className="absolute left-0 right-0 mt-2 z-50 rounded-md border border-border bg-popover text-popover-foreground shadow-md">
          {results.length > 0 ? (
            <ul id="search-results" role="listbox" className="max-h-80 overflow-auto py-1">
              {results.map((u, i) => (
                <li key={u.id} role="option" aria-selected={i === activeIndex}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => onSelect(u)}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${i === activeIndex ? 'bg-accent text-accent-foreground' : ''}`}
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={u.avatar_url || undefined} alt={`${u.display_name || u.username || 'user'} avatar`} />
                      <AvatarFallback>{(u.display_name || u.username || '?').slice(0,1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-col text-left">
                      <span className="truncate font-medium">
                        {u.display_name || u.username || 'Unknown'}
                      </span>
                      {u.username && (
                        <span className="truncate text-xs text-muted-foreground">@{u.username}</span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              {query.trim() ? t('common.noResults') ?? 'No results found' : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};