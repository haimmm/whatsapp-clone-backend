import supabase, { usersTable } from "../modules/supabase.db.module";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });
import {
  addSession,
  getSessionBy,
  removeSession,
  createNewCookie,
} from "../services/auth.service";

//uncomment each function to test it

(async () => {
  try {
    supabase.connect();
    const dummySession = {
      user_id: 1,
      access_token: "access_token_dummy",
      refresh_token: "refresh_token_dummy",
    };

    //const data = await addSession(dummySession);
    // const data = await getSessionBy("id", 1);
    const data = await removeSession(1);
    console.log("returned data: ", data);
  } catch (e) {
    console.error("user service failed: " + e);
  }
})();

/**
 * to run as stand alone run the following command from test's folder:
 * npx ts-node auth.service.test.ts
 **/
