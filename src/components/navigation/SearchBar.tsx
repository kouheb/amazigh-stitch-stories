
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  className?: string;
  isMobile?: boolean;
}

interface SearchResult {
  id: string;
  type: 'profile' | 'portfolio' | 'showcase';
  title: string;
  subtitle?: string;
  avatar?: string;
  description?: string;
}

export const SearchBar = ({ className = "", isMobile = false }: SearchBarProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300); // Debounce search

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setIsSearching(true);
    try {
      const searchResults: SearchResult[] = [];

      // Search profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, display_name, full_name, bio, avatar_url')
        .or(`display_name.ilike.%${searchQuery}%,full_name.ilike.%${searchQuery}%,bio.ilike.%${searchQuery}%`)
        .limit(5);

      if (!profilesError && profiles) {
        profiles.forEach(profile => {
          searchResults.push({
            id: profile.id,
            type: 'profile',
            title: profile.display_name || profile.full_name || 'Unknown User',
            subtitle: 'Profile',
            avatar: profile.avatar_url,
            description: profile.bio
          });
        });
      }

      // Search portfolio items
      const { data: portfolio, error: portfolioError } = await supabase
        .from('portfolio_items')
        .select('id, title, description, image_url, user_id')
        .or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`)
        .limit(5);

      if (!portfolioError && portfolio) {
        portfolio.forEach(item => {
          searchResults.push({
            id: item.id,
            type: 'portfolio',
            title: item.title,
            subtitle: 'Portfolio Item',
            avatar: item.image_url,
            description: item.description
          });
        });
      }

      // Search showcase items
      const { data: showcase, error: showcaseError } = await supabase
        .from('showcase_items')
        .select('id, title, description, thumbnail_url, user_id')
        .or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,type.ilike.%${searchQuery}%`)
        .limit(5);

      if (!showcaseError && showcase) {
        showcase.forEach(item => {
          searchResults.push({
            id: item.id,
            type: 'showcase',
            title: item.title,
            subtitle: 'Showcase Item',
            avatar: item.thumbnail_url,
            description: item.description
          });
        });
      }

      setResults(searchResults);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    switch (result.type) {
      case 'profile':
        navigate(`/profile/${result.id}`);
        break;
      case 'portfolio':
        navigate('/app?tab=portfolio');
        break;
      case 'showcase':
        navigate('/app?tab=showcase');
        break;
    }
    setShowResults(false);
    setQuery("");
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isMobile ? t('nav.searchMobile') : t('nav.searchPlaceholder')}
          className="pl-9 pr-10 bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
          onFocus={() => {
            if (results.length > 0) setShowResults(true);
          }}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto bg-white border shadow-lg">
          {isSearching ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {results.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={result.avatar} alt={result.title} />
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                        {result.title.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {result.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {result.subtitle}
                      </p>
                      {result.description && (
                        <p className="text-xs text-gray-400 truncate mt-1">
                          {result.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="p-4 text-center text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
            </div>
          ) : null}
        </Card>
      )}

      {/* Click outside to close results */}
      {showResults && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
};
