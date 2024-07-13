import express from "express";
import { registerNewUser } from "../../controllers/postControllers/registerNewUser.js";
import { loginUser } from "../../controllers/postControllers/loginUser.js";

const postRouter = express.Router();

postRouter.post("/register", registerNewUser);

postRouter.post("/login", loginUser);

export { postRouter };
