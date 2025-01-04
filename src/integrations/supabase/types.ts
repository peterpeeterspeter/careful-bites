export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          activity_date: string
          activity_minutes: number | null
          calories_burned: number | null
          created_at: string
          glucose_level: number | null
          id: string
          notes: string | null
          profile_id: string
          steps: number | null
        }
        Insert: {
          activity_date: string
          activity_minutes?: number | null
          calories_burned?: number | null
          created_at?: string
          glucose_level?: number | null
          id?: string
          notes?: string | null
          profile_id: string
          steps?: number | null
        }
        Update: {
          activity_date?: string
          activity_minutes?: number | null
          calories_burned?: number | null
          created_at?: string
          glucose_level?: number | null
          id?: string
          notes?: string | null
          profile_id?: string
          steps?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cooking_method_preferences: {
        Row: {
          created_at: string
          id: string
          method: string
          profile_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          method: string
          profile_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          method?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cooking_method_preferences_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cuisine_preferences: {
        Row: {
          created_at: string
          cuisine: string
          id: string
          profile_id: string | null
        }
        Insert: {
          created_at?: string
          cuisine: string
          id?: string
          profile_id?: string | null
        }
        Update: {
          created_at?: string
          cuisine?: string
          id?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cuisine_preferences_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dietary_preferences: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          restriction: Database["public"]["Enums"]["dietary_restriction"]
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          restriction: Database["public"]["Enums"]["dietary_restriction"]
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          restriction?: Database["public"]["Enums"]["dietary_restriction"]
        }
        Relationships: [
          {
            foreignKeyName: "dietary_preferences_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      food_intolerances: {
        Row: {
          created_at: string
          id: string
          intolerance: string
          profile_id: string
          severity: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          intolerance: string
          profile_id: string
          severity?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          intolerance?: string
          profile_id?: string
          severity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "food_intolerances_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredient_preferences: {
        Row: {
          created_at: string
          id: string
          ingredient: string
          preference_type: string
          profile_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ingredient: string
          preference_type: string
          profile_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ingredient?: string
          preference_type?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ingredient_preferences_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredient_substitutions: {
        Row: {
          created_at: string
          glycemic_index_difference: number | null
          health_benefits: string[] | null
          id: string
          original_ingredient: string
          substitute_ingredient: string
        }
        Insert: {
          created_at?: string
          glycemic_index_difference?: number | null
          health_benefits?: string[] | null
          id?: string
          original_ingredient: string
          substitute_ingredient: string
        }
        Update: {
          created_at?: string
          glycemic_index_difference?: number | null
          health_benefits?: string[] | null
          id?: string
          original_ingredient?: string
          substitute_ingredient?: string
        }
        Relationships: []
      }
      meal_plan_recipes: {
        Row: {
          created_at: string
          id: string
          meal_plan_id: string
          meal_type: string
          planned_date: string
          recipe_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          meal_plan_id: string
          meal_type: string
          planned_date: string
          recipe_id: string
        }
        Update: {
          created_at?: string
          id?: string
          meal_plan_id?: string
          meal_type?: string
          planned_date?: string
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_plan_recipes_meal_plan_id_fkey"
            columns: ["meal_plan_id"]
            isOneToOne: false
            referencedRelation: "meal_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_plan_recipes_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plans: {
        Row: {
          created_at: string
          end_date: string
          id: string
          name: string
          profile_id: string
          start_date: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          name: string
          profile_id: string
          start_date: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          name?: string
          profile_id?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_plans_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          activity_level: Database["public"]["Enums"]["activity_level"] | null
          age: number | null
          allergies: string[] | null
          available_cooking_time: string | null
          avatar_url: string | null
          bmi: number | null
          budget_preference: string | null
          cgm_user: boolean | null
          cooking_skill_level: string | null
          created_at: string
          current_weight_kg: number | null
          daily_calorie_target: number | null
          daily_glucose_target_range: Json | null
          diabetes_type: Database["public"]["Enums"]["diabetes_type"] | null
          diagnosis_date: string | null
          dietary_restrictions: string[] | null
          exercise_routine: Json | null
          family_size: number | null
          gender: Database["public"]["Enums"]["gender"] | null
          glucose_monitor_device: string | null
          grocery_frequency: string | null
          height_cm: number | null
          id: string
          insulin_pump_user: boolean | null
          insulin_regimen: string | null
          insulin_therapy: boolean | null
          kitchen_equipment: Json | null
          last_hba1c: number | null
          meal_prep_preference: string | null
          meals_per_day: number | null
          medication_schedule: Json | null
          medications: Json | null
          preferred_glucose_unit: string | null
          preferred_meal_times: Json | null
          preferred_stores: Json | null
          snacking_preferences: Json | null
          target_weight_kg: number | null
          username: string | null
          weight_goal_date: string | null
          weight_management_goal: string | null
        }
        Insert: {
          activity_level?: Database["public"]["Enums"]["activity_level"] | null
          age?: number | null
          allergies?: string[] | null
          available_cooking_time?: string | null
          avatar_url?: string | null
          bmi?: number | null
          budget_preference?: string | null
          cgm_user?: boolean | null
          cooking_skill_level?: string | null
          created_at?: string
          current_weight_kg?: number | null
          daily_calorie_target?: number | null
          daily_glucose_target_range?: Json | null
          diabetes_type?: Database["public"]["Enums"]["diabetes_type"] | null
          diagnosis_date?: string | null
          dietary_restrictions?: string[] | null
          exercise_routine?: Json | null
          family_size?: number | null
          gender?: Database["public"]["Enums"]["gender"] | null
          glucose_monitor_device?: string | null
          grocery_frequency?: string | null
          height_cm?: number | null
          id: string
          insulin_pump_user?: boolean | null
          insulin_regimen?: string | null
          insulin_therapy?: boolean | null
          kitchen_equipment?: Json | null
          last_hba1c?: number | null
          meal_prep_preference?: string | null
          meals_per_day?: number | null
          medication_schedule?: Json | null
          medications?: Json | null
          preferred_glucose_unit?: string | null
          preferred_meal_times?: Json | null
          preferred_stores?: Json | null
          snacking_preferences?: Json | null
          target_weight_kg?: number | null
          username?: string | null
          weight_goal_date?: string | null
          weight_management_goal?: string | null
        }
        Update: {
          activity_level?: Database["public"]["Enums"]["activity_level"] | null
          age?: number | null
          allergies?: string[] | null
          available_cooking_time?: string | null
          avatar_url?: string | null
          bmi?: number | null
          budget_preference?: string | null
          cgm_user?: boolean | null
          cooking_skill_level?: string | null
          created_at?: string
          current_weight_kg?: number | null
          daily_calorie_target?: number | null
          daily_glucose_target_range?: Json | null
          diabetes_type?: Database["public"]["Enums"]["diabetes_type"] | null
          diagnosis_date?: string | null
          dietary_restrictions?: string[] | null
          exercise_routine?: Json | null
          family_size?: number | null
          gender?: Database["public"]["Enums"]["gender"] | null
          glucose_monitor_device?: string | null
          grocery_frequency?: string | null
          height_cm?: number | null
          id?: string
          insulin_pump_user?: boolean | null
          insulin_regimen?: string | null
          insulin_therapy?: boolean | null
          kitchen_equipment?: Json | null
          last_hba1c?: number | null
          meal_prep_preference?: string | null
          meals_per_day?: number | null
          medication_schedule?: Json | null
          medications?: Json | null
          preferred_glucose_unit?: string | null
          preferred_meal_times?: Json | null
          preferred_stores?: Json | null
          snacking_preferences?: Json | null
          target_weight_kg?: number | null
          username?: string | null
          weight_goal_date?: string | null
          weight_management_goal?: string | null
        }
        Relationships: []
      }
      recipes: {
        Row: {
          calories_per_serving: number | null
          carbs_per_serving: number | null
          cholesterol_content: number | null
          cooking_time: number | null
          created_at: string
          created_by: string | null
          description: string | null
          fat_per_serving: number | null
          fiber_content: number | null
          glycemic_index: number | null
          glycemic_load: number | null
          id: string
          image_url: string | null
          instructions: string
          is_approved: boolean | null
          potassium_content: number | null
          preparation_time: number | null
          protein_per_serving: number | null
          servings: number | null
          sodium_content: number | null
          sugar_per_serving: number | null
          title: string
        }
        Insert: {
          calories_per_serving?: number | null
          carbs_per_serving?: number | null
          cholesterol_content?: number | null
          cooking_time?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          fat_per_serving?: number | null
          fiber_content?: number | null
          glycemic_index?: number | null
          glycemic_load?: number | null
          id?: string
          image_url?: string | null
          instructions: string
          is_approved?: boolean | null
          potassium_content?: number | null
          preparation_time?: number | null
          protein_per_serving?: number | null
          servings?: number | null
          sodium_content?: number | null
          sugar_per_serving?: number | null
          title: string
        }
        Update: {
          calories_per_serving?: number | null
          carbs_per_serving?: number | null
          cholesterol_content?: number | null
          cooking_time?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          fat_per_serving?: number | null
          fiber_content?: number | null
          glycemic_index?: number | null
          glycemic_load?: number | null
          id?: string
          image_url?: string | null
          instructions?: string
          is_approved?: boolean | null
          potassium_content?: number | null
          preparation_time?: number | null
          protein_per_serving?: number | null
          servings?: number | null
          sodium_content?: number | null
          sugar_per_serving?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_diet_styles: {
        Row: {
          created_at: string
          diet_style: Database["public"]["Enums"]["diet_style"]
          id: string
          profile_id: string
        }
        Insert: {
          created_at?: string
          diet_style: Database["public"]["Enums"]["diet_style"]
          id?: string
          profile_id: string
        }
        Update: {
          created_at?: string
          diet_style?: Database["public"]["Enums"]["diet_style"]
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_diet_styles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_health_conditions: {
        Row: {
          condition: Database["public"]["Enums"]["health_condition"]
          created_at: string
          id: string
          notes: string | null
          profile_id: string | null
          severity: string | null
        }
        Insert: {
          condition: Database["public"]["Enums"]["health_condition"]
          created_at?: string
          id?: string
          notes?: string | null
          profile_id?: string | null
          severity?: string | null
        }
        Update: {
          condition?: Database["public"]["Enums"]["health_condition"]
          created_at?: string
          id?: string
          notes?: string | null
          profile_id?: string | null
          severity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_health_conditions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      activity_level:
        | "sedentary"
        | "lightly_active"
        | "moderately_active"
        | "very_active"
        | "extra_active"
      available_cooking_time: "quick" | "medium" | "extended"
      cooking_skill_level: "beginner" | "intermediate" | "advanced"
      diabetes_type: "type1" | "type2" | "gestational" | "prediabetes" | "none"
      diet_style:
        | "standard"
        | "mediterranean"
        | "keto"
        | "paleo"
        | "vegetarian"
        | "vegan"
        | "halal"
        | "kosher"
      dietary_restriction:
        | "gluten_free"
        | "dairy_free"
        | "vegetarian"
        | "vegan"
        | "low_carb"
        | "low_sugar"
        | "low_sodium"
      gender: "male" | "female" | "other" | "prefer_not_to_say"
      grocery_frequency: "daily" | "weekly" | "biweekly" | "monthly"
      health_condition:
        | "kidney_disease"
        | "heart_disease"
        | "digestive_issues"
        | "none"
      meal_prep_preference: "daily" | "batch" | "meal_prep"
      weight_management_goal: "maintain" | "lose" | "gain"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
