import express from "express";
import morgan from "morgan";
import { connectToDB } from "./database/db.js";
import { postRouter } from "./routes/postRoutes/postRoutes.js";
import { getRouter } from "./routes/getRoutes/getRoutes.js";

const app = express();
const port = 3000;

connectToDB();

app.use(morgan("short"));

app.use("/post", postRouter);
app.use("/get", getRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
