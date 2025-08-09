
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Check, X, User, MessageSquare, Calendar } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

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

export const NotificationDropdown = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<DBNotification[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    const load = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("id, user_id, title, message, type, is_read, created_at, read_at, action_url")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Load notifications error", error);
        return;
      }
      setNotifications((data as any) || []);
    };

    load();

    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => {
          setNotifications((prev) => [payload.new as DBNotification, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => {
          setNotifications((prev) => prev.map(n => n.id === (payload.new as any).id ? (payload.new as DBNotification) : n));
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => {
          setNotifications((prev) => prev.filter(n => n.id !== (payload.old as any).id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

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

  const removeNotification = async (id: string) => {
    const { error } = await supabase.from('notifications').delete().eq('id', id);
    if (error) return toast.error('Failed to remove');
    toast.success('Notification removed');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return MessageSquare;
      case 'event':
        return Calendar;
      case 'follow':
        return User;
      default:
        return Bell;
    }
  };

  const formatTime = (iso: string) => new Date(iso).toLocaleString();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-white" align="end">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>

        <ScrollArea className="max-h-80">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => {
                const IconComponent = getIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    onClick={() => !notification.is_read && markAsRead(notification.id)}
                    className={`p-3 hover:bg-gray-50 ${!notification.is_read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-4 w-4 text-orange-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{formatTime(notification.created_at)}</p>
                          </div>

                          <div className="flex gap-1 ml-2">
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
                              onClick={() => removeNotification(notification.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
