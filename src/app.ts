import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route";
import db from "./modules/supabase.db.module";
import { createSocket } from "./modules/socketIO.module";

const app = express();
dotenv.config();
const port = process.env.SERVER_PORT || 3031;
const socket = createSocket(app);

//global middlewares
app.use(express.json());

// app.get("/", (req, res) => {
//   console.log("inside default route");
//   res.status(200).send("hello!");
// });

//routes
app.use("/auth", authRoute);

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
socket.listen(port, () => {
  console.log(`express server listening on port ${port}...`);
});
