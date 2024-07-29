import express from "express";
import { registerNewUser } from "../../controllers/postControllers/registerNewUser.js";
import { loginUser } from "../../controllers/postControllers/loginUser.js";
import { authenticateUser } from "../../authenticate.js";
import { createProblem } from "../../controllers/postControllers/createProblem.js";
import { searchProblems } from "../../controllers/postControllers/searchProblems.js";
import { deleteProblem } from "../../controllers/postControllers/deleteProblem.js";
import { editProblem } from "../../controllers/postControllers/editProblem.js";
import { runCode } from "../../controllers/postControllers/runCode.js";
import { submitCode } from "../../controllers/postControllers/submitCode.js";
import { storeSubmission } from "../../controllers/postControllers/storeSubmission.js";

const postRouter = express.Router();

postRouter.post("/register", registerNewUser);

postRouter.post("/login", loginUser);

postRouter.post("/add-problem", authenticateUser, createProblem);

postRouter.post("/search-problems", authenticateUser, searchProblems);

postRouter.delete(
  "/delete-problem/:problemId",
  authenticateUser,
  deleteProblem
);

postRouter.patch("/edit-problem/:problemId", authenticateUser, editProblem);

postRouter.post("/run", authenticateUser, runCode);

postRouter.post("/submit/:problemId", authenticateUser, submitCode);

postRouter.post("/store-submission", authenticateUser, storeSubmission);

export { postRouter };
