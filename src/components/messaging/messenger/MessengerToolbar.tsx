import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Phone, Video, MoreVertical, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessengerToolbarProps {
  title: string;
  subtitle?: string;
  avatarUrl?: string;
  onBack?: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  onInfo?: () => void;
  showBackButton?: boolean;
}

export const MessengerToolbar = ({
  title,
  subtitle,
  avatarUrl,
  onBack,
  onCall,
  onVideoCall,
  onInfo,
  showBackButton = false
}: MessengerToolbarProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3">
        {showBackButton && onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-8 w-8 p-0 rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>
            {getInitials(title)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">{title}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        {onCall && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCall}
            className="h-8 w-8 p-0 rounded-full"
          >
            <Phone className="h-4 w-4" />
          </Button>
        )}
        
        {onVideoCall && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onVideoCall}
            className="h-8 w-8 p-0 rounded-full"
          >
            <Video className="h-4 w-4" />
          </Button>
        )}
        
        {onInfo && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onInfo}
            className="h-8 w-8 p-0 rounded-full"
          >
            <Info className="h-4 w-4" />
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-full"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};