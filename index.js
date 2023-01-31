const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.SERVER_PORT || 3031;
const errorHandler = require("./errorHandler/errorHandler");
mongo = require("./services/mongodb.service");

app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/product", require("./routes/productRoutes"));

app.use(errorHandler);

//db connection
const dbName = process.env.MONGO_DB_NAME;
mongo
  .connect(dbName)
  .then(() => {
    console.log(`[Mongo] Connected to '${dbName}' db`);
  })
  .catch((err) => {
    console.log("Couldn't connect to mongoDb with error: ", error);
  });

app.listen(port, (err) => {
  console.log(`server is running on port ${port}`);
});
