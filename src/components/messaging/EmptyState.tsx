import { Button } from "@/components/ui/button";
import { MessageCircle, Users } from "lucide-react";
import { QuickUserSearch } from "@/components/navigation/QuickUserSearch";

interface EmptyStateProps {
  onStartConversation?: (userId: string) => void;
}

export const EmptyState = ({ onStartConversation }: EmptyStateProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-muted rounded-full p-6 mb-6">
        <MessageCircle className="h-12 w-12 text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">No conversation selected</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Choose an existing conversation from the sidebar or start a new one by searching for a user.
      </p>
      
      <div className="w-full max-w-sm mb-4">
        <QuickUserSearch 
          onSelectUser={onStartConversation}
          placeholder="Search users to start chatting..."
        />
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span>Find people to connect with</span>
      </div>
    </div>
  );
};