import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  MoreVertical, 
  UserX, 
  Flag, 
  Archive, 
  Volume2, 
  VolumeX,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

interface ChatOptionsMenuProps {
  participantName: string;
  isNotificationsEnabled: boolean;
  onToggleNotifications: () => void;
  onBlockUser: () => void;
  onReportUser: () => void;
  onArchiveChat: () => void;
  onDeleteChat: () => void;
}

export const ChatOptionsMenu = ({
  participantName,
  isNotificationsEnabled,
  onToggleNotifications,
  onBlockUser,
  onReportUser,
  onArchiveChat,
  onDeleteChat
}: ChatOptionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuItemClick = (action: () => void, actionName: string) => {
    action();
    setIsOpen(false);
    toast.info(`${actionName} action completed`);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="hover:bg-gray-50"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem 
          onClick={() => handleMenuItemClick(onToggleNotifications, 'Toggle notifications')}
          className="flex items-center gap-2"
        >
          {isNotificationsEnabled ? (
            <>
              <VolumeX className="h-4 w-4" />
              Mute notifications
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4" />
              Enable notifications
            </>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleMenuItemClick(onArchiveChat, 'Archive chat')}
          className="flex items-center gap-2"
        >
          <Archive className="h-4 w-4" />
          Archive chat
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => handleMenuItemClick(onBlockUser, 'Block user')}
          className="flex items-center gap-2 text-orange-600 focus:text-orange-700"
        >
          <UserX className="h-4 w-4" />
          Block {participantName}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleMenuItemClick(onReportUser, 'Report user')}
          className="flex items-center gap-2 text-red-600 focus:text-red-700"
        >
          <Flag className="h-4 w-4" />
          Report {participantName}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => handleMenuItemClick(onDeleteChat, 'Delete chat')}
          className="flex items-center gap-2 text-red-600 focus:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
          Delete chat
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};