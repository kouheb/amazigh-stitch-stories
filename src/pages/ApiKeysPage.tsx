import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ApiKey {
  id: string;
  user_id: string;
  name: string | null;
  prefix: string;
  hashed_key: string;
  created_at: string;
  updated_at: string;
  last_used_at: string | null;
  revoked: boolean;
}

export const ApiKeysPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    loadKeys();
  }, [user]);

  const loadKeys = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setKeys(data || []);
    } catch (err) {
      console.error("Failed to load API keys", err);
      toast.error("Failed to load API keys");
    } finally {
      setLoading(false);
    }
  };

  const generateRandomKey = async (length = 32) => {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    // URL-safe base64
    const base64 = btoa(String.fromCharCode(...bytes))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
    return `chat_${base64}`;
  };

  const sha256 = async (text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  const handleCreate = async () => {
    if (!user) return;
    if (!newKeyName.trim()) {
      toast.error("Please provide a name for the API key");
      return;
    }

    try {
      setCreating(true);
      // 1) Generate a key client-side and show it ONCE
      const rawKey = await generateRandomKey();
      const hashed = await sha256(rawKey);

      // 2) Store only the hash in DB
      const { error } = await supabase.from("api_keys").insert({
        user_id: user.id,
        name: newKeyName.trim(),
        prefix: "chat",
        hashed_key: hashed,
      });

      if (error) throw error;

      setGeneratedKey(rawKey);
      setNewKeyName("");
      toast.success("API key created. Copy and store it securely.");
      await loadKeys();
    } catch (err: any) {
      console.error("Create API key failed", err);
      toast.error(err?.message || "Failed to create API key");
    } finally {
      setCreating(false);
    }
  };

  const handleRevoke = async (key: ApiKey) => {
    try {
      const { error } = await supabase
        .from("api_keys")
        .update({ revoked: true })
        .eq("id", key.id);
      if (error) throw error;
      toast.success("API key revoked");
      await loadKeys();
    } catch (err) {
      console.error("Failed to revoke key", err);
      toast.error("Failed to revoke key");
    }
  };

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">API Keys</h1>
          <Button variant="ghost" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="keyName">Create new API key</Label>
            <div className="flex gap-2">
              <Input
                id="keyName"
                placeholder="Key name (e.g. Server integration)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
              <Button onClick={handleCreate} disabled={creating}>
                {creating ? "Creating..." : "Create"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Keys are shown only once. We store only a secure hash.
            </p>
          </div>

          {generatedKey && (
            <div className="p-3 rounded-md border bg-accent/40">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">New key (copy now)</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedKey);
                    toast.success("Copied");
                  }}
                >
                  Copy
                </Button>
              </div>
              <code className="break-all text-sm">{generatedKey}</code>
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h2 className="font-medium mb-3">Your API keys</h2>
          <Separator className="mb-3" />
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : keys.length === 0 ? (
            <p className="text-sm text-muted-foreground">No keys yet.</p>
          ) : (
            <div className="space-y-3">
              {keys.map((k) => (
                <div key={k.id} className="flex items-center justify-between p-3 rounded-md border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{k.name || "Untitled"}</span>
                      {k.revoked && <Badge variant="destructive">Revoked</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">Created {new Date(k.created_at).toLocaleString()}</p>
                    {k.last_used_at && (
                      <p className="text-xs text-muted-foreground">Last used {new Date(k.last_used_at).toLocaleString()}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!k.revoked && (
                      <Button variant="outline" size="sm" onClick={() => handleRevoke(k)}>Revoke</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h3 className="font-medium mb-2">Using your key</h3>
          <p className="text-sm text-muted-foreground">
            Include as an Authorization header when calling your secure endpoints or Edge Functions.
          </p>
          <div className="mt-3 p-3 rounded-md border bg-accent/40">
            <code className="text-sm break-all">Authorization: Bearer chat_xxxxxxxxx</code>
          </div>
        </Card>
      </section>
    </main>
  );
};
