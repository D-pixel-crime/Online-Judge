import express from "express";
import morgan from "morgan";
import { connectToDB } from "./database/db.js";
import { postRouter } from "./routes/postRoutes/postRoutes.js";
import { getRouter } from "./routes/getRoutes/getRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

connectToDB();

app.use(
  cors({
    origin: process.env.OJ_FRONTEND_URI,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan("short"));

app.use("/post", postRouter);
app.use("/get", getRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
