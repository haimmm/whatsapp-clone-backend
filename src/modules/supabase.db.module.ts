import { createClient, SupabaseClient } from "@supabase/supabase-js";

//     --- TABLES TYPES ---

export type usersTable = {
  id?: number; // auto created in db
  token?: string; // assigned on session creation
  email: string;
  name: string;
  password: string;
};

export type messagesTable = {
  id?: number;
  user_id: number;
  content: string;
  sent_at: Date;
  chat_id: number;
  type: "text" | "voice" | "image" | "video";
};

export type sessionsTable = {
  id?: number;
  user_id: number;
  access_token: string;
  refresh_token: string;
};

interface dbModel {
  public: {
    Tables: {
      users: {
        Row: usersTable;
        Insert: usersTable;
        Update: {
          name?: string;
          password?: string;
        };
      };
    };
  };
}

let supabase: SupabaseClient;

/*should be called once from main script */
function connect() {
  console.log("connecting to supabase...");
  supabase = createClient<dbModel>(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string
  );
  console.log("supabase connected succesfully");
}

function getClient(): SupabaseClient {
  if (!supabase) throw new Error("[supabase] db client is not connected");
  return supabase;
}

export default {
  connect,
  getClient,
};
