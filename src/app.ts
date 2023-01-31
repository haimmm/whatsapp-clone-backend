import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route";
import db from "./modules/supabase.db.module";

const app = express();
dotenv.config();
const port = process.env.SERVER_PORT || 3031;

//global middlewares
app.use(express.json());

//routes
app.use("/auth", authRoute);

// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log("inside try");
//     throw new Error("my error!");
//   } catch (e) {
//     console.log("inside catch");
//     next(e);
//   }
// });

//connect to db
try {
  console.log("connecting to supabase...");
  db.connect();
  console.log("supabase connected succesfully");
} catch (e) {
  console.error("failed to connect to supabse with the following error: " + e);
}

//error handling
app.use(errorHandler);

//listening
app.listen(port, () => {
  console.log(`express server listening on port ${port}...`);
});
