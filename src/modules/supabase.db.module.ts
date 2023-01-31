import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type allOptional<Type> = {
  [Property in keyof Type]+?: Type[Property];
};

export type createType = usersTable;

export type usersTable = {
  email: string;
  name: string;
  password: string;
};

interface dbModel {
  public: {
    Tables: {
      users: {
        Row: {
          name: string;
        };
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
  supabase = createClient<dbModel>(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string
  );
}

function getClient(): SupabaseClient {
  if (!supabase) throw new Error("[supabase] db client is not connected");
  return supabase;
}

export default {
  connect,
  getClient,
};
