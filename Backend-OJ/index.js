import express from "express";
import morgan from "morgan";
import { connectToDB } from "./database/db.js";

const app = express();
const port = 3000;

connectToDB();

app.use(morgan("short"));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
