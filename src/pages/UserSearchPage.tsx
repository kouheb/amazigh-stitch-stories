import { useEffect } from "react";
import { UserSearch } from "@/components/search/UserSearch";

export const UserSearchPage = () => {
  useEffect(() => {
    // SEO basics
    document.title = "User Search | Connect with Creators";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Search user profiles, follow creators, and send direct messages securely.');
    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', window.location.origin + '/search');
    if (!canonical.parentNode) document.head.appendChild(canonical);
  }, []);

  return (
    <div>
      <header className="py-6">
        <h1 className="text-2xl font-semibold">User Search</h1>
      </header>
      <main>
        <UserSearch />
      </main>
    </div>
  );
};

export default UserSearchPage;
