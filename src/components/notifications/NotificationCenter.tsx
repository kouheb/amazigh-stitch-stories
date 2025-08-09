
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
  Users,
  Award,
  Settings,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface DBNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
  read_at?: string | null;
  action_url?: string | null;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter = ({ isOpen, onClose }: NotificationCenterProps) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<DBNotification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    if (!user?.id) return;

    const load = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('id, user_id, title, message, type, is_read, created_at, read_at, action_url')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Load notifications error', error);
        return;
      }
      setNotifications((data as any) || []);
    };

    load();

    const channel = supabase
      .channel(`notifications-center:${user.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => setNotifications((prev) => [payload.new as DBNotification, ...prev])
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => setNotifications((prev) => prev.map(n => n.id === (payload.new as any).id ? (payload.new as DBNotification) : n))
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => setNotifications((prev) => prev.filter(n => n.id !== (payload.old as any).id))
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return MessageCircle;
      case 'like':
        return Heart;
      case 'follow':
        return Users;
      case 'event':
        return Calendar;
      case 'achievement':
        return Award;
      default:
        return Bell;
    }
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', id);
    if (error) return toast.error('Failed to mark as read');
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true, read_at: new Date().toISOString() } : n)));
  };

  const markAllAsRead = async () => {
    if (!user?.id) return;
    const nowIso = new Date().toISOString();
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true, read_at: nowIso })
      .eq('user_id', user.id)
      .eq('is_read', false);
    if (error) return toast.error('Failed to mark all as read');
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true, read_at: nowIso })));
  };

  const deleteNotification = async (id: string) => {
    const { error } = await supabase.from('notifications').delete().eq('id', id);
    if (error) return toast.error('Failed to delete');
  };

  const filteredNotifications = filter === 'unread'
    ? notifications.filter((n) => !n.is_read)
    : notifications;

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  if (!isOpen) return null;

  const formatTime = (iso: string) => new Date(iso).toLocaleString();

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
                      !notification.is_read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <IconComponent className={`h-4 w-4`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTime(notification.created_at)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        {!notification.is_read && (
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
