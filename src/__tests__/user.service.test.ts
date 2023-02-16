import supabase, { usersTable } from "../modules/supabase.db.module";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });

interface GetByOptions {
  id: number;
  email: string;
}

const getUserBy = async <K extends keyof GetByOptions>(
  col: K,
  val: GetByOptions[K]
): Promise<usersTable> => {
  const db = supabase.getClient();
  console.log("quering from db...");
  const { data, error } = await db
    .from<string, usersTable>("users")
    .select<string, usersTable>()
    .eq(col, val);
  if (error) {
    throw new Error(
      `[supabase error] details:${error.details}, message:${error.message}`
    );
  }
  if (data.length > 1)
    throw new Error(
      `[supabase] db conflict - 2 user records with same id or email`
    );
  console.log("returned data: ", data);
  return data[0];
};

const addUser = async (user: usersTable): Promise<void> => {
  const db = supabase.getClient();
  const { error } = await db.from("users").insert(user);
  if (error)
    throw new Error(
      `[supabase error] details:${error.details}, message:${error.message}`
    );
};

const updateUser = async (
  id: number,
  updates: Partial<usersTable>
): Promise<void> => {
  const db = supabase.getClient();
  const { error } = await db.from("users").update(updates).eq("id", id);
  if (error)
    throw new Error(
      `[supabase error] details:${error.details}, message:${error.message}`
    );
};

//uncomment each function to test it
try {
  console.log("connecting to supabase...");
  supabase.connect();
  console.log("supabase connected succesfully");
  //getUserBy("id", 1);
  //addUser({ email: "tester2@gmail.com", name: "tester2", password: "123123" });
  //updateUser(2, { name: "tester3" });
} catch (e) {
  console.error("failed to connect to supabse with the following error: " + e);
}

/**
 * how to run as stand alone:
 * npx ts-node user.service.test.ts
 **/
