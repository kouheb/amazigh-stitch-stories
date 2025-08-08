
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  X, 
  Check, 
  MessageCircle, 
  Heart,
  Calendar,
  ShoppingBag,
  Users,
  Award,
  Settings
} from "lucide-react";

interface Notification {
  id: string;
  type: 'message' | 'like' | 'follow' | 'booking' | 'event' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  actionUrl?: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter = ({ isOpen, onClose }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const mockNotifications: Notification[] = [
    {
      id: "1",
      type: "message",
      title: "New message from Fatima",
      message: "I'd love to discuss your embroidery project...",
      timestamp: "2 minutes ago",
      read: false,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: "2",
      type: "like",
      title: "Someone liked your work",
      message: "Ahmed liked your 'Traditional Berber Carpet' post",
      timestamp: "1 hour ago",
      read: false,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: "3",
      type: "booking",
      title: "Booking confirmation",
      message: "Your consultation with Zahra is confirmed for tomorrow",
      timestamp: "3 hours ago",
      read: true
    },
    {
      id: "4",
      type: "follow",
      title: "New follower",
      message: "Sarah started following you",
      timestamp: "5 hours ago",
      read: true,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: "5",
      type: "event",
      title: "Event reminder",
      message: "Fez Artisan Festival starts tomorrow",
      timestamp: "1 day ago",
      read: true
    },
    {
      id: "6",
      type: "achievement",
      title: "Achievement unlocked!",
      message: "You've completed 10 projects this month",
      timestamp: "2 days ago",
      read: true
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return MessageCircle;
      case 'like':
        return Heart;
      case 'follow':
        return Users;
      case 'booking':
        return ShoppingBag;
      case 'event':
        return Calendar;
      case 'achievement':
        return Award;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'text-blue-600';
      case 'like':
        return 'text-red-600';
      case 'follow':
        return 'text-green-600';
      case 'booking':
        return 'text-orange-600';
      case 'event':
        return 'text-purple-600';
      case 'achievement':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-16">
      <Card className="w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Controls */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('unread')}
              >
                Unread ({unreadCount})
              </Button>
            </div>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-96">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredNotifications.map((notification) => {
                const IconComponent = getIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {notification.avatar ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback>
                            <IconComponent className={`h-4 w-4 ${getIconColor(notification.type)}`} />
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <IconComponent className={`h-4 w-4 ${getIconColor(notification.type)}`} />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.timestamp}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <Button variant="ghost" size="sm" className="w-full">
            <Settings className="h-4 w-4 mr-2" />
            Notification Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};
