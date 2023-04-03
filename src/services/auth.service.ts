import supabase, { sessionsTable } from "../modules/supabase.db.module";
import { ServerError } from "../middlewares/errorHandler";
import { CookieOptions, Response } from "express";

/* get by id or token */
interface GetByOptions {
  id: number;
  token: string;
}

export async function addSession(session: sessionsTable) {
  const db = supabase.getClient();
  const { error } = await db.from("sessions").insert(session);
  if (error) throw new ServerError({ details: error });
}

export const getSessionBy = async <K extends keyof GetByOptions>(
  col: K,
  val: GetByOptions[K]
): Promise<sessionsTable> => {
  const db = supabase.getClient();
  const { data, error } = await db
    .from<string, sessionsTable>("sessions")
    .select<string, sessionsTable>()
    .eq(col, val);
  if (error) throw new ServerError({ details: error });
  if (data.length > 1)
    throw new ServerError({
      details: "critical conflict - quering for 1 session returned many",
    });
  return data[0];
};

export async function removeSession(id: number) {
  const db = supabase.getClient();
  const { error } = await db.from("sessions").delete().eq("id", id);
  if (error) throw new ServerError({ details: error });
}

export function createNewCookie(
  res: Response,
  name: string,
  data: string,
  maxAge: Date
) {
  const options: CookieOptions = {
    expires: maxAge,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.cookie(name, data, options);
}
