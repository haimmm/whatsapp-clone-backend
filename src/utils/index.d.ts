declare namespace Express {
  interface Request {
    //userId?: import("../modules/supabase.db.module").usersTable;
    userId: number;
  }
}
