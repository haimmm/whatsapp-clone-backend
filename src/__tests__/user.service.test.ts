import supabase, { usersTable } from "../modules/supabase.db.module";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });
import {
  GetByOptions,
  getUserBy,
  addUser,
  updateUser,
} from "../services/user.service";

//uncomment each function to test it

(async () => {
  try {
    supabase.connect();
    const data = await getUserBy("id", 1);
    console.log("returned data: ", data);
    //addUser({ email: "tester2@gmail.com", name: "tester2", password: "123123" });
    //updateUser(2, { name: "tester3" });
  } catch (e) {
    console.error("user service failed: " + e);
  }
})();

/**
 * to run as stand alone run the following command from test's folder:
 * npx ts-node user.service.test.ts
 **/
