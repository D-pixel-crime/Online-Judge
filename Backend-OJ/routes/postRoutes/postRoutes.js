import express from "express";
import { registerNewUser } from "../../controllers/postControllers/registerNewUser.js";
import { loginUser } from "../../controllers/postControllers/loginUser.js";
import { authenticateUser } from "../../authenticate.js";
import { createProblem } from "../../controllers/postControllers/createProblem.js";
import { searchProblems } from "../../controllers/postControllers/searchProblems.js";

const postRouter = express.Router();

postRouter.post("/register", registerNewUser);

postRouter.post("/login", loginUser);

postRouter.post("/add-problem", authenticateUser, createProblem);

postRouter.post("/search-problems", authenticateUser, searchProblems);

export { postRouter };
