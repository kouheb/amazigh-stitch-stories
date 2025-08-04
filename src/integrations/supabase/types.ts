export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      calls: {
        Row: {
          call_type: string
          caller_id: string
          created_at: string
          duration: number | null
          ended_at: string | null
          id: string
          recipient_id: string
          started_at: string
          status: string
          updated_at: string
        }
        Insert: {
          call_type: string
          caller_id: string
          created_at?: string
          duration?: number | null
          ended_at?: string | null
          id?: string
          recipient_id: string
          started_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          call_type?: string
          caller_id?: string
          created_at?: string
          duration?: number | null
          ended_at?: string | null
          id?: string
          recipient_id?: string
          started_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          last_message_at: string | null
          last_message_id: string | null
          participant_1_id: string
          participant_2_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          last_message_id?: string | null
          participant_1_id: string
          participant_2_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          last_message_id?: string | null
          participant_1_id?: string
          participant_2_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          email: string
          event_id: string
          full_name: string
          id: string
          phone: string | null
          registration_date: string
          special_requests: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          email: string
          event_id: string
          full_name: string
          id?: string
          phone?: string | null
          registration_date?: string
          special_requests?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          email?: string
          event_id?: string
          full_name?: string
          id?: string
          phone?: string | null
          registration_date?: string
          special_requests?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          current_attendees: number | null
          date_time: string
          description: string | null
          id: string
          image_url: string | null
          location: string
          max_attendees: number | null
          organizer: string | null
          price: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          current_attendees?: number | null
          date_time: string
          description?: string | null
          id?: string
          image_url?: string | null
          location: string
          max_attendees?: number | null
          organizer?: string | null
          price?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          current_attendees?: number | null
          date_time?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string
          max_attendees?: number | null
          organizer?: string | null
          price?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          file_name: string | null
          file_url: string | null
          id: string
          is_read: boolean
          message_type: string
          recipient_id: string
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_read?: boolean
          message_type?: string
          recipient_id: string
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_read?: boolean
          message_type?: string
          recipient_id?: string
          sender_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          title: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          category: string
          comments: number
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          likes: number
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
          views: number
        }
        Insert: {
          category: string
          comments?: number
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          likes?: number
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
          views?: number
        }
        Update: {
          category?: string
          comments?: number
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          likes?: number
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
          views?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          email: string | null
          experience_level: string | null
          full_name: string | null
          id: string
          region: string | null
          social_handle: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          experience_level?: string | null
          full_name?: string | null
          id: string
          region?: string | null
          social_handle?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          experience_level?: string | null
          full_name?: string | null
          id?: string
          region?: string | null
          social_handle?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      showcase_items: {
        Row: {
          client: string | null
          created_at: string
          description: string | null
          duration: string | null
          id: string
          likes: number | null
          organization: string | null
          status: string | null
          thumbnail_url: string | null
          title: string
          type: string
          updated_at: string
          user_id: string
          views: number | null
        }
        Insert: {
          client?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          likes?: number | null
          organization?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title: string
          type: string
          updated_at?: string
          user_id: string
          views?: number | null
        }
        Update: {
          client?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          likes?: number | null
          organization?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
          views?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_skills: {
        Row: {
          created_at: string
          id: string
          proficiency_level: string | null
          skill_name: string
          skill_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          proficiency_level?: string | null
          skill_name: string
          skill_type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          proficiency_level?: string | null
          skill_name?: string
          skill_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          books_count: number
          connections_count: number
          created_at: string
          experience_years: number | null
          followers_count: number
          following_count: number
          id: string
          likes_received: number
          messages_count: number
          notifications_count: number
          profile_views: number
          updated_at: string
          user_id: string
        }
        Insert: {
          books_count?: number
          connections_count?: number
          created_at?: string
          experience_years?: number | null
          followers_count?: number
          following_count?: number
          id?: string
          likes_received?: number
          messages_count?: number
          notifications_count?: number
          profile_views?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          books_count?: number
          connections_count?: number
          created_at?: string
          experience_years?: number | null
          followers_count?: number
          following_count?: number
          id?: string
          likes_received?: number
          messages_count?: number
          notifications_count?: number
          profile_views?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "artisan" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "artisan", "admin"],
    },
  },
} as const
