import express from "express";
import { fetchUserProfile } from "../../controllers/getControllers/fetchUserProfile.js";
import { authenticateUser } from "../../authenticate.js";
import { fetchProblems } from "../../controllers/getControllers/fetchProblems.js";
import { getProblemDetails } from "../../controllers/getControllers/getProblemDetails.js";

const getRouter = express.Router();

getRouter.get("/profile/:id", authenticateUser, fetchUserProfile);

getRouter.get("/all/problems", fetchProblems);

getRouter.get("/problem/:problemId", authenticateUser, getProblemDetails);

export { getRouter };
