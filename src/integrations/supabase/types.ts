export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          actor_role: string | null
          after_data: Json | null
          before_data: Json | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_role?: string | null
          after_data?: Json | null
          before_data?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_role?: string | null
          after_data?: Json | null
          before_data?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category: string | null
          content: string | null
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_published: boolean
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          tags: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          tags?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          tags?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      booking_addons: {
        Row: {
          booking_id: string
          created_at: string
          id: string
          name: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          booking_id: string
          created_at?: string
          id?: string
          name: string
          quantity?: number
          total_price: number
          unit_price: number
        }
        Update: {
          booking_id?: string
          created_at?: string
          id?: string
          name?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "booking_addons_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_events: {
        Row: {
          actor_id: string | null
          booking_id: string
          created_at: string
          event_type: string
          id: string
          message: string | null
          metadata: Json | null
        }
        Insert: {
          actor_id?: string | null
          booking_id: string
          created_at?: string
          event_type: string
          id?: string
          message?: string | null
          metadata?: Json | null
        }
        Update: {
          actor_id?: string | null
          booking_id?: string
          created_at?: string
          event_type?: string
          id?: string
          message?: string | null
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_events_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          addons_amount: number
          base_amount: number
          booking_date: string
          booking_number: string
          cancellation_reason: string | null
          cancelled_at: string | null
          checked_in_at: string | null
          completed_at: string | null
          coupon_code: string | null
          created_at: string
          currency: string
          customer_id: string
          customer_notes: string | null
          deleted_at: string | null
          digital_signature: string | null
          discount_amount: number
          guests: number
          guide_id: string | null
          horse_id: string | null
          id: string
          internal_notes: string | null
          is_private: boolean
          meeting_point: string | null
          paid_amount: number
          qr_check_in: string | null
          start_time: string | null
          status: Database["public"]["Enums"]["booking_status"]
          tax_amount: number
          total_amount: number
          trail_id: string
          updated_at: string
          vendor_id: string | null
        }
        Insert: {
          addons_amount?: number
          base_amount: number
          booking_date: string
          booking_number?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          checked_in_at?: string | null
          completed_at?: string | null
          coupon_code?: string | null
          created_at?: string
          currency?: string
          customer_id: string
          customer_notes?: string | null
          deleted_at?: string | null
          digital_signature?: string | null
          discount_amount?: number
          guests?: number
          guide_id?: string | null
          horse_id?: string | null
          id?: string
          internal_notes?: string | null
          is_private?: boolean
          meeting_point?: string | null
          paid_amount?: number
          qr_check_in?: string | null
          start_time?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          tax_amount?: number
          total_amount: number
          trail_id: string
          updated_at?: string
          vendor_id?: string | null
        }
        Update: {
          addons_amount?: number
          base_amount?: number
          booking_date?: string
          booking_number?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          checked_in_at?: string | null
          completed_at?: string | null
          coupon_code?: string | null
          created_at?: string
          currency?: string
          customer_id?: string
          customer_notes?: string | null
          deleted_at?: string | null
          digital_signature?: string | null
          discount_amount?: number
          guests?: number
          guide_id?: string | null
          horse_id?: string | null
          id?: string
          internal_notes?: string | null
          is_private?: boolean
          meeting_point?: string | null
          paid_amount?: number
          qr_check_in?: string | null
          start_time?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          tax_amount?: number
          total_amount?: number
          trail_id?: string
          updated_at?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_horse_id_fkey"
            columns: ["horse_id"]
            isOneToOne: false
            referencedRelation: "horses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_trail_id_fkey"
            columns: ["trail_id"]
            isOneToOne: false
            referencedRelation: "trails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_banners: {
        Row: {
          created_at: string
          ends_at: string | null
          id: string
          image_url: string
          is_active: boolean
          link_url: string | null
          position: string | null
          sort_order: number | null
          starts_at: string | null
          subtitle: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          ends_at?: string | null
          id?: string
          image_url: string
          is_active?: boolean
          link_url?: string | null
          position?: string | null
          sort_order?: number | null
          starts_at?: string | null
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          ends_at?: string | null
          id?: string
          image_url?: string
          is_active?: boolean
          link_url?: string | null
          position?: string | null
          sort_order?: number | null
          starts_at?: string | null
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      cms_pages: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_published: boolean
          seo_description: string | null
          seo_title: string | null
          slug: string
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      commissions: {
        Row: {
          booking_id: string
          commission_amount: number
          commission_rate: number
          created_at: string
          gross_amount: number
          id: string
          is_settled: boolean
          settled_at: string | null
          tax_amount: number | null
          vendor_id: string
          vendor_payout: number
        }
        Insert: {
          booking_id: string
          commission_amount: number
          commission_rate: number
          created_at?: string
          gross_amount: number
          id?: string
          is_settled?: boolean
          settled_at?: string | null
          tax_amount?: number | null
          vendor_id: string
          vendor_payout: number
        }
        Update: {
          booking_id?: string
          commission_amount?: number
          commission_rate?: number
          created_at?: string
          gross_amount?: number
          id?: string
          is_settled?: boolean
          settled_at?: string | null
          tax_amount?: number | null
          vendor_id?: string
          vendor_payout?: number
        }
        Relationships: [
          {
            foreignKeyName: "commissions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      coupon_redemptions: {
        Row: {
          booking_id: string
          coupon_id: string
          created_at: string
          customer_id: string
          discount_amount: number
          id: string
        }
        Insert: {
          booking_id: string
          coupon_id: string
          created_at?: string
          customer_id: string
          discount_amount: number
          id?: string
        }
        Update: {
          booking_id?: string
          coupon_id?: string
          created_at?: string
          customer_id?: string
          discount_amount?: number
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coupon_redemptions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupon_redemptions_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          applicable_trails: Json | null
          applicable_vendors: Json | null
          code: string
          created_at: string
          created_by: string | null
          customer_eligibility: string | null
          description: string | null
          expires_at: string | null
          id: string
          is_active: boolean
          max_discount: number | null
          min_booking_amount: number | null
          name: string
          per_customer_limit: number | null
          starts_at: string | null
          type: Database["public"]["Enums"]["coupon_type"]
          updated_at: string
          usage_count: number
          usage_limit: number | null
          value: number
        }
        Insert: {
          applicable_trails?: Json | null
          applicable_vendors?: Json | null
          code: string
          created_at?: string
          created_by?: string | null
          customer_eligibility?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_discount?: number | null
          min_booking_amount?: number | null
          name: string
          per_customer_limit?: number | null
          starts_at?: string | null
          type: Database["public"]["Enums"]["coupon_type"]
          updated_at?: string
          usage_count?: number
          usage_limit?: number | null
          value: number
        }
        Update: {
          applicable_trails?: Json | null
          applicable_vendors?: Json | null
          code?: string
          created_at?: string
          created_by?: string | null
          customer_eligibility?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_discount?: number | null
          min_booking_amount?: number | null
          name?: string
          per_customer_limit?: number | null
          starts_at?: string | null
          type?: Database["public"]["Enums"]["coupon_type"]
          updated_at?: string
          usage_count?: number
          usage_limit?: number | null
          value?: number
        }
        Relationships: []
      }
      horses: {
        Row: {
          age: number | null
          assigned_guide_id: string | null
          breed: string | null
          code: string
          color: string | null
          created_at: string
          created_by: string | null
          daily_feeding_cost: number | null
          deleted_at: string | null
          experience_level: string | null
          gender: string | null
          health_status: string | null
          height_cm: number | null
          id: string
          insurance_policy: string | null
          maintenance_cost: number | null
          medical_history: Json | null
          name: string
          notes: string | null
          photos: Json | null
          qr_code: string | null
          stable_id: string | null
          status: Database["public"]["Enums"]["horse_status"]
          temperament: string | null
          training_level: string | null
          updated_at: string
          vaccination_records: Json | null
          vendor_id: string
          videos: Json | null
          weight_kg: number | null
        }
        Insert: {
          age?: number | null
          assigned_guide_id?: string | null
          breed?: string | null
          code: string
          color?: string | null
          created_at?: string
          created_by?: string | null
          daily_feeding_cost?: number | null
          deleted_at?: string | null
          experience_level?: string | null
          gender?: string | null
          health_status?: string | null
          height_cm?: number | null
          id?: string
          insurance_policy?: string | null
          maintenance_cost?: number | null
          medical_history?: Json | null
          name: string
          notes?: string | null
          photos?: Json | null
          qr_code?: string | null
          stable_id?: string | null
          status?: Database["public"]["Enums"]["horse_status"]
          temperament?: string | null
          training_level?: string | null
          updated_at?: string
          vaccination_records?: Json | null
          vendor_id: string
          videos?: Json | null
          weight_kg?: number | null
        }
        Update: {
          age?: number | null
          assigned_guide_id?: string | null
          breed?: string | null
          code?: string
          color?: string | null
          created_at?: string
          created_by?: string | null
          daily_feeding_cost?: number | null
          deleted_at?: string | null
          experience_level?: string | null
          gender?: string | null
          health_status?: string | null
          height_cm?: number | null
          id?: string
          insurance_policy?: string | null
          maintenance_cost?: number | null
          medical_history?: Json | null
          name?: string
          notes?: string | null
          photos?: Json | null
          qr_code?: string | null
          stable_id?: string | null
          status?: Database["public"]["Enums"]["horse_status"]
          temperament?: string | null
          training_level?: string | null
          updated_at?: string
          vaccination_records?: Json | null
          vendor_id?: string
          videos?: Json | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "horses_stable_id_fkey"
            columns: ["stable_id"]
            isOneToOne: false
            referencedRelation: "stables"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "horses_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      login_history: {
        Row: {
          created_at: string
          device: string | null
          id: string
          ip_address: string | null
          location: string | null
          success: boolean
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          device?: string | null
          id?: string
          ip_address?: string | null
          location?: string | null
          success?: boolean
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          device?: string | null
          id?: string
          ip_address?: string | null
          location?: string | null
          success?: boolean
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          metadata: Json | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          metadata?: Json | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          metadata?: Json | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string
          currency: string
          customer_id: string
          id: string
          invoice_number: string | null
          metadata: Json | null
          paid_at: string | null
          provider: string
          provider_customer_id: string | null
          provider_payment_id: string | null
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string
          currency?: string
          customer_id: string
          id?: string
          invoice_number?: string | null
          metadata?: Json | null
          paid_at?: string | null
          provider?: string
          provider_customer_id?: string | null
          provider_payment_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string
          currency?: string
          customer_id?: string
          id?: string
          invoice_number?: string | null
          metadata?: Json | null
          paid_at?: string | null
          provider?: string
          provider_customer_id?: string | null
          provider_payment_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          country: string | null
          created_at: string
          date_of_birth: string | null
          deleted_at: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          full_name: string | null
          gender: string | null
          id: string
          internal_notes: string | null
          is_blacklisted: boolean
          is_vip: boolean
          last_login_at: string | null
          locale: string | null
          marketing_opt_in: boolean
          medical_notes: string | null
          phone: string | null
          riding_experience: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          deleted_at?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          internal_notes?: string | null
          is_blacklisted?: boolean
          is_vip?: boolean
          last_login_at?: string | null
          locale?: string | null
          marketing_opt_in?: boolean
          medical_notes?: string | null
          phone?: string | null
          riding_experience?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          deleted_at?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          internal_notes?: string | null
          is_blacklisted?: boolean
          is_vip?: boolean
          last_login_at?: string | null
          locale?: string | null
          marketing_opt_in?: boolean
          medical_notes?: string | null
          phone?: string | null
          riding_experience?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      refunds: {
        Row: {
          amount: number
          approved_by: string | null
          booking_id: string
          created_at: string
          id: string
          payment_id: string
          processed_at: string | null
          reason: string | null
          requested_by: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          approved_by?: string | null
          booking_id: string
          created_at?: string
          id?: string
          payment_id: string
          processed_at?: string | null
          reason?: string | null
          requested_by?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          approved_by?: string | null
          booking_id?: string
          created_at?: string
          id?: string
          payment_id?: string
          processed_at?: string | null
          reason?: string | null
          requested_by?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "refunds_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refunds_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          booking_id: string | null
          content: string | null
          created_at: string
          customer_id: string
          id: string
          is_published: boolean
          is_verified: boolean
          photos: Json | null
          rating: number
          title: string | null
          trail_id: string
          updated_at: string
          vendor_id: string | null
          vendor_replied_at: string | null
          vendor_reply: string | null
        }
        Insert: {
          booking_id?: string | null
          content?: string | null
          created_at?: string
          customer_id: string
          id?: string
          is_published?: boolean
          is_verified?: boolean
          photos?: Json | null
          rating: number
          title?: string | null
          trail_id: string
          updated_at?: string
          vendor_id?: string | null
          vendor_replied_at?: string | null
          vendor_reply?: string | null
        }
        Update: {
          booking_id?: string | null
          content?: string | null
          created_at?: string
          customer_id?: string
          id?: string
          is_published?: boolean
          is_verified?: boolean
          photos?: Json | null
          rating?: number
          title?: string | null
          trail_id?: string
          updated_at?: string
          vendor_id?: string | null
          vendor_replied_at?: string | null
          vendor_reply?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_trail_id_fkey"
            columns: ["trail_id"]
            isOneToOne: false
            referencedRelation: "trails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      stables: {
        Row: {
          address: string | null
          amenities: Json | null
          capacity: number | null
          city: string | null
          country: string | null
          created_at: string
          created_by: string | null
          deleted_at: string | null
          description: string | null
          emergency_contact: string | null
          facilities: Json | null
          id: string
          images: Json | null
          insurance_policy: string | null
          is_active: boolean
          latitude: number | null
          license_number: string | null
          longitude: number | null
          name: string
          operating_hours: Json | null
          slug: string
          updated_at: string
          vendor_id: string
          videos: Json | null
        }
        Insert: {
          address?: string | null
          amenities?: Json | null
          capacity?: number | null
          city?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          description?: string | null
          emergency_contact?: string | null
          facilities?: Json | null
          id?: string
          images?: Json | null
          insurance_policy?: string | null
          is_active?: boolean
          latitude?: number | null
          license_number?: string | null
          longitude?: number | null
          name: string
          operating_hours?: Json | null
          slug: string
          updated_at?: string
          vendor_id: string
          videos?: Json | null
        }
        Update: {
          address?: string | null
          amenities?: Json | null
          capacity?: number | null
          city?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          description?: string | null
          emergency_contact?: string | null
          facilities?: Json | null
          id?: string
          images?: Json | null
          insurance_policy?: string | null
          is_active?: boolean
          latitude?: number | null
          license_number?: string | null
          longitude?: number | null
          name?: string
          operating_hours?: Json | null
          slug?: string
          updated_at?: string
          vendor_id?: string
          videos?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "stables_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      support_messages: {
        Row: {
          attachments: Json | null
          author_id: string
          created_at: string
          id: string
          is_internal: boolean
          message: string
          ticket_id: string
        }
        Insert: {
          attachments?: Json | null
          author_id: string
          created_at?: string
          id?: string
          is_internal?: boolean
          message: string
          ticket_id: string
        }
        Update: {
          attachments?: Json | null
          author_id?: string
          created_at?: string
          id?: string
          is_internal?: boolean
          message?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          attachments: Json | null
          booking_id: string | null
          category: string | null
          created_at: string
          description: string
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"]
          resolution: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          ticket_number: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          attachments?: Json | null
          booking_id?: string | null
          category?: string | null
          created_at?: string
          description: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolution?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          ticket_number?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          attachments?: Json | null
          booking_id?: string | null
          category?: string | null
          created_at?: string
          description?: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolution?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          ticket_number?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      trail_availability: {
        Row: {
          block_reason: string | null
          created_at: string
          date: string
          id: string
          is_blocked: boolean
          price_override: number | null
          slots_booked: number
          slots_total: number
          start_time: string | null
          trail_id: string
          updated_at: string
        }
        Insert: {
          block_reason?: string | null
          created_at?: string
          date: string
          id?: string
          is_blocked?: boolean
          price_override?: number | null
          slots_booked?: number
          slots_total?: number
          start_time?: string | null
          trail_id: string
          updated_at?: string
        }
        Update: {
          block_reason?: string | null
          created_at?: string
          date?: string
          id?: string
          is_blocked?: boolean
          price_override?: number | null
          slots_booked?: number
          slots_total?: number
          start_time?: string | null
          trail_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trail_availability_trail_id_fkey"
            columns: ["trail_id"]
            isOneToOne: false
            referencedRelation: "trails"
            referencedColumns: ["id"]
          },
        ]
      }
      trails: {
        Row: {
          base_price: number
          bookings_count: number | null
          bring: Json | null
          cancellation_policy: string | null
          category: string | null
          city: string | null
          code: string
          country: string | null
          created_at: string
          created_by: string | null
          currency: string
          deleted_at: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["trail_difficulty"]
          distance_km: number | null
          duration_hours: number | null
          faqs: Json | null
          gallery: Json | null
          guide_required: boolean
          horse_requirement: number | null
          id: string
          images: Json | null
          included: Json | null
          is_instant: boolean
          is_private: boolean
          latitude: number | null
          location: string | null
          longitude: number | null
          max_group_size: number | null
          meeting_point: string | null
          min_age: number | null
          name: string
          not_included: Json | null
          original_price: number | null
          peak_pricing: Json | null
          rating_avg: number | null
          rating_count: number | null
          safety_rules: Json | null
          seasonal_pricing: Json | null
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          slug: string
          stable_id: string | null
          status: Database["public"]["Enums"]["trail_status"]
          tags: Json | null
          updated_at: string
          vendor_id: string | null
          videos: Json | null
          weather_restrictions: string | null
        }
        Insert: {
          base_price: number
          bookings_count?: number | null
          bring?: Json | null
          cancellation_policy?: string | null
          category?: string | null
          city?: string | null
          code: string
          country?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          deleted_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["trail_difficulty"]
          distance_km?: number | null
          duration_hours?: number | null
          faqs?: Json | null
          gallery?: Json | null
          guide_required?: boolean
          horse_requirement?: number | null
          id?: string
          images?: Json | null
          included?: Json | null
          is_instant?: boolean
          is_private?: boolean
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          max_group_size?: number | null
          meeting_point?: string | null
          min_age?: number | null
          name: string
          not_included?: Json | null
          original_price?: number | null
          peak_pricing?: Json | null
          rating_avg?: number | null
          rating_count?: number | null
          safety_rules?: Json | null
          seasonal_pricing?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          stable_id?: string | null
          status?: Database["public"]["Enums"]["trail_status"]
          tags?: Json | null
          updated_at?: string
          vendor_id?: string | null
          videos?: Json | null
          weather_restrictions?: string | null
        }
        Update: {
          base_price?: number
          bookings_count?: number | null
          bring?: Json | null
          cancellation_policy?: string | null
          category?: string | null
          city?: string | null
          code?: string
          country?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          deleted_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["trail_difficulty"]
          distance_km?: number | null
          duration_hours?: number | null
          faqs?: Json | null
          gallery?: Json | null
          guide_required?: boolean
          horse_requirement?: number | null
          id?: string
          images?: Json | null
          included?: Json | null
          is_instant?: boolean
          is_private?: boolean
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          max_group_size?: number | null
          meeting_point?: string | null
          min_age?: number | null
          name?: string
          not_included?: Json | null
          original_price?: number | null
          peak_pricing?: Json | null
          rating_avg?: number | null
          rating_count?: number | null
          safety_rules?: Json | null
          seasonal_pricing?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          stable_id?: string | null
          status?: Database["public"]["Enums"]["trail_status"]
          tags?: Json | null
          updated_at?: string
          vendor_id?: string | null
          videos?: Json | null
          weather_restrictions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trails_stable_id_fkey"
            columns: ["stable_id"]
            isOneToOne: false
            referencedRelation: "stables"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trails_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          granted_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          granted_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vendors: {
        Row: {
          address: string | null
          bank_account_name: string | null
          bank_account_number: string | null
          bank_ifsc: string | null
          bank_name: string | null
          bio: string | null
          business_name: string
          city: string | null
          commission_rate: number
          country: string | null
          cover_url: string | null
          created_at: string
          deleted_at: string | null
          email: string | null
          gst_number: string | null
          id: string
          is_active: boolean
          is_verified: boolean
          kyc_documents: Json | null
          kyc_status: Database["public"]["Enums"]["kyc_status"]
          legal_name: string | null
          logo_url: string | null
          owner_id: string
          phone: string | null
          rating_avg: number | null
          rating_count: number | null
          slug: string
          tax_id: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          bank_account_name?: string | null
          bank_account_number?: string | null
          bank_ifsc?: string | null
          bank_name?: string | null
          bio?: string | null
          business_name: string
          city?: string | null
          commission_rate?: number
          country?: string | null
          cover_url?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          gst_number?: string | null
          id?: string
          is_active?: boolean
          is_verified?: boolean
          kyc_documents?: Json | null
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          legal_name?: string | null
          logo_url?: string | null
          owner_id: string
          phone?: string | null
          rating_avg?: number | null
          rating_count?: number | null
          slug: string
          tax_id?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          bank_account_name?: string | null
          bank_account_number?: string | null
          bank_ifsc?: string | null
          bank_name?: string | null
          bio?: string | null
          business_name?: string
          city?: string | null
          commission_rate?: number
          country?: string | null
          cover_url?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          gst_number?: string | null
          id?: string
          is_active?: boolean
          is_verified?: boolean
          kyc_documents?: Json | null
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          legal_name?: string | null
          logo_url?: string | null
          owner_id?: string
          phone?: string | null
          rating_avg?: number | null
          rating_count?: number | null
          slug?: string
          tax_id?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string
          description: string | null
          id: string
          reference_id: string | null
          reference_type: string | null
          type: Database["public"]["Enums"]["wallet_txn_type"]
          user_id: string
          wallet_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          type: Database["public"]["Enums"]["wallet_txn_type"]
          user_id: string
          wallet_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          type?: Database["public"]["Enums"]["wallet_txn_type"]
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number
          bonus_balance: number
          created_at: string
          currency: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          bonus_balance?: number
          created_at?: string
          currency?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          bonus_balance?: number
          created_at?: string
          currency?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      wishlist: {
        Row: {
          created_at: string
          id: string
          trail_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          trail_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          trail_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_trail_id_fkey"
            columns: ["trail_id"]
            isOneToOne: false
            referencedRelation: "trails"
            referencedColumns: ["id"]
          },
        ]
      }
      withdrawals: {
        Row: {
          amount: number
          approved_by: string | null
          bank_snapshot: Json | null
          created_at: string
          currency: string
          id: string
          notes: string | null
          processed_at: string | null
          reference_id: string | null
          requested_by: string | null
          status: Database["public"]["Enums"]["withdrawal_status"]
          updated_at: string
          vendor_id: string
        }
        Insert: {
          amount: number
          approved_by?: string | null
          bank_snapshot?: Json | null
          created_at?: string
          currency?: string
          id?: string
          notes?: string | null
          processed_at?: string | null
          reference_id?: string | null
          requested_by?: string | null
          status?: Database["public"]["Enums"]["withdrawal_status"]
          updated_at?: string
          vendor_id: string
        }
        Update: {
          amount?: number
          approved_by?: string | null
          bank_snapshot?: Json | null
          created_at?: string
          currency?: string
          id?: string
          notes?: string | null
          processed_at?: string | null
          reference_id?: string | null
          requested_by?: string | null
          status?: Database["public"]["Enums"]["withdrawal_status"]
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdrawals_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "admin"
        | "vendor"
        | "stable_owner"
        | "guide"
        | "accountant"
        | "booking_manager"
        | "customer"
      booking_status:
        | "pending"
        | "confirmed"
        | "checked_in"
        | "completed"
        | "cancelled"
        | "refunded"
        | "no_show"
      coupon_type: "flat" | "percentage"
      horse_status: "active" | "training" | "resting" | "retired" | "medical"
      kyc_status: "pending" | "submitted" | "approved" | "rejected"
      payment_status:
        | "pending"
        | "authorized"
        | "paid"
        | "failed"
        | "refunded"
        | "partially_refunded"
      ticket_priority: "low" | "normal" | "high" | "urgent"
      ticket_status: "open" | "in_progress" | "waiting" | "resolved" | "closed"
      trail_difficulty: "easy" | "moderate" | "challenging"
      trail_status: "draft" | "active" | "paused" | "archived"
      wallet_txn_type:
        | "credit"
        | "debit"
        | "refund"
        | "bonus"
        | "referral"
        | "withdrawal"
      withdrawal_status: "pending" | "approved" | "paid" | "rejected"
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
      app_role: [
        "super_admin",
        "admin",
        "vendor",
        "stable_owner",
        "guide",
        "accountant",
        "booking_manager",
        "customer",
      ],
      booking_status: [
        "pending",
        "confirmed",
        "checked_in",
        "completed",
        "cancelled",
        "refunded",
        "no_show",
      ],
      coupon_type: ["flat", "percentage"],
      horse_status: ["active", "training", "resting", "retired", "medical"],
      kyc_status: ["pending", "submitted", "approved", "rejected"],
      payment_status: [
        "pending",
        "authorized",
        "paid",
        "failed",
        "refunded",
        "partially_refunded",
      ],
      ticket_priority: ["low", "normal", "high", "urgent"],
      ticket_status: ["open", "in_progress", "waiting", "resolved", "closed"],
      trail_difficulty: ["easy", "moderate", "challenging"],
      trail_status: ["draft", "active", "paused", "archived"],
      wallet_txn_type: [
        "credit",
        "debit",
        "refund",
        "bonus",
        "referral",
        "withdrawal",
      ],
      withdrawal_status: ["pending", "approved", "paid", "rejected"],
    },
  },
} as const
