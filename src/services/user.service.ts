import supabase, {
  usersTable,
  allOptional,
} from "../modules/supabase.db.module";

/* get by id or email */
interface GetByOptions {
  id: number;
  email: string;
}
export const getUserBy = async <K extends keyof GetByOptions>(
  col: K,
  val: GetByOptions[K]
): Promise<usersTable> => {
  const db = supabase.getClient();
  const { data, error } = await db
    .from<string, usersTable>("users")
    .select<string, usersTable>("")
    .eq(col, val);
  if (error) throw new Error(`[supabase] ${error}`);
  if (data.length > 1)
    throw new Error(
      `[supabase] db conflict - 2 user records with same id or email`
    );
  return data[0];
};

export const addUser = async (user: usersTable): Promise<void> => {
  const db = supabase.getClient();
  const { error } = await db.from("users").insert(user);
  if (error) throw new Error(`[supabase] ${error}`);
};

export const updateUser = async (
  id: number,
  updates: allOptional<usersTable>
): Promise<void> => {
  const db = supabase.getClient();
  const { error } = await db.from("users").update(updates).eq("id", id);
  if (error) throw new Error(`[supabase] ${error}`);
};
