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
      api_keys: {
        Row: {
          created_at: string
          hashed_key: string
          id: string
          last_used_at: string | null
          name: string | null
          prefix: string
          revoked: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          hashed_key: string
          id?: string
          last_used_at?: string | null
          name?: string | null
          prefix?: string
          revoked?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          hashed_key?: string
          id?: string
          last_used_at?: string | null
          name?: string | null
          prefix?: string
          revoked?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
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
      certificates: {
        Row: {
          code: string
          course_id: string
          created_at: string
          enrollment_id: string
          id: string
          instructor_id: string
          instructor_name: string | null
          issued_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          code: string
          course_id: string
          created_at?: string
          enrollment_id: string
          id?: string
          instructor_id: string
          instructor_name?: string | null
          issued_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          code?: string
          course_id?: string
          created_at?: string
          enrollment_id?: string
          id?: string
          instructor_id?: string
          instructor_name?: string | null
          issued_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          last_message_at: string | null
          participant_1_id: string
          participant_2_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          participant_1_id: string
          participant_2_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          participant_1_id?: string
          participant_2_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      course_modules: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          id: string
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_reviews: {
        Row: {
          comment: string | null
          course_id: string
          created_at: string
          id: string
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          course_id: string
          created_at?: string
          id?: string
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          course_id?: string
          created_at?: string
          id?: string
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          category: string | null
          created_at: string
          creator_id: string
          description: string | null
          id: string
          is_published: boolean
          price_cents: number | null
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          creator_id: string
          description?: string | null
          id?: string
          is_published?: boolean
          price_cents?: number | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          creator_id?: string
          description?: string | null
          id?: string
          is_published?: boolean
          price_cents?: number | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          course_id: string
          created_at: string
          id: string
          price_paid_cents: number | null
          status: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          price_paid_cents?: number | null
          status?: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          price_paid_cents?: number | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
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
          user_id: string
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
          user_id: string
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
          user_id?: string
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
          approval_status: string | null
          attendees_public: boolean
          category: string
          created_at: string
          created_by: string | null
          creator_email: string | null
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
          submission_date: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          approval_status?: string | null
          attendees_public?: boolean
          category: string
          created_at?: string
          created_by?: string | null
          creator_email?: string | null
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
          submission_date?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          approval_status?: string | null
          attendees_public?: boolean
          category?: string
          created_at?: string
          created_by?: string | null
          creator_email?: string | null
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
          submission_date?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      follow_relationships: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          enrollment_id: string
          id: string
          lesson_id: string
          updated_at: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          enrollment_id: string
          id?: string
          lesson_id: string
          updated_at?: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          enrollment_id?: string
          id?: string
          lesson_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_published: boolean
          module_id: string
          order_index: number
          quiz: Json | null
          title: string
          type: Database["public"]["Enums"]["lesson_type"]
          updated_at: string
          video_url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          module_id: string
          order_index?: number
          quiz?: Json | null
          title: string
          type: Database["public"]["Enums"]["lesson_type"]
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          module_id?: string
          order_index?: number
          quiz?: Json | null
          title?: string
          type?: Database["public"]["Enums"]["lesson_type"]
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_listing_images: {
        Row: {
          created_at: string
          id: string
          is_primary: boolean | null
          listing_id: string
          position: number | null
          thumbnail_url: string | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_primary?: boolean | null
          listing_id: string
          position?: number | null
          thumbnail_url?: string | null
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          is_primary?: boolean | null
          listing_id?: string
          position?: number | null
          thumbnail_url?: string | null
          url?: string
        }
        Relationships: []
      }
      marketplace_listings: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          category: string
          condition: string
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          location_city: string | null
          location_country: string | null
          price_cents: number
          primary_image_url: string | null
          primary_thumbnail_url: string | null
          rejection_reason: string | null
          seller_id: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          views: number | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          category: string
          condition: string
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          location_city?: string | null
          location_country?: string | null
          price_cents: number
          primary_image_url?: string | null
          primary_thumbnail_url?: string | null
          rejection_reason?: string | null
          seller_id: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          category?: string
          condition?: string
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          location_city?: string | null
          location_country?: string | null
          price_cents?: number
          primary_image_url?: string | null
          primary_thumbnail_url?: string | null
          rejection_reason?: string | null
          seller_id?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          file_name: string | null
          file_url: string | null
          id: string
          is_read: boolean
          message_type: string
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_read?: boolean
          message_type?: string
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_read?: boolean
          message_type?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          is_read: boolean
          message: string
          read_at: string | null
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
          read_at?: string | null
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
          read_at?: string | null
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
          username: string | null
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
          username?: string | null
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
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string
          endpoint: string
          id: string
          p256dh: string
          updated_at: string
          user_id: string
        }
        Insert: {
          auth: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh: string
          updated_at?: string
          user_id: string
        }
        Update: {
          auth?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh?: string
          updated_at?: string
          user_id?: string
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
      course_rating_stats: {
        Row: {
          avg_rating: number | null
          course_id: string | null
          review_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      _generate_certificate_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      can_access_course: {
        Args: { _course_id: string }
        Returns: boolean
      }
      can_edit_course: {
        Args: { _course_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      search_profiles: {
        Args: { q: string; limit_count?: number }
        Returns: {
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
          username: string | null
          website: string | null
        }[]
      }
      search_user_messages: {
        Args: { q: string; limit_count?: number; offset_count?: number }
        Returns: {
          id: string
          conversation_id: string
          sender_id: string
          is_read: boolean
          created_at: string
          content: string
          message_type: string
          file_url: string
          file_name: string
        }[]
      }
      verify_certificate: {
        Args: { _code: string }
        Returns: {
          id: string
          code: string
          issued_at: string
          student_id: string
          student_name: string
          course_id: string
          course_title: string
          instructor_id: string
          instructor_name: string
        }[]
      }
    }
    Enums: {
      app_role: "user" | "artisan" | "admin"
      lesson_type: "video" | "text" | "quiz"
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
      lesson_type: ["video", "text", "quiz"],
    },
  },
} as const
