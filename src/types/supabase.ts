export type Receipt = {
  img_url: string | null;
  response: string | null;
};
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Receipt | undefined }
  | Receipt[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          receipt: Receipt[] | null;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          receipt?: Receipt[] | null;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          receipt?: Receipt[] | null;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      receipt: {
        Row: {
          created_at: string;
          id: number;
          img_url: string | null;
          result: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          img_url?: string | null;
          result?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          img_url?: string | null;
          result?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
