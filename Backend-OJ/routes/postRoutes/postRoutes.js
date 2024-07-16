import express from "express";
import { registerNewUser } from "../../controllers/postControllers/registerNewUser.js";
import { loginUser } from "../../controllers/postControllers/loginUser.js";
import { authenticateUser } from "../../authenticate.js";
import { createProblem } from "../../controllers/postControllers/createProblem.js";

const postRouter = express.Router();

postRouter.post("/register", registerNewUser);

postRouter.post("/login", loginUser);

postRouter.post("/add-problem", authenticateUser, createProblem);

export { postRouter };
