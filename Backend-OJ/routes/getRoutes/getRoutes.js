import express from "express";
import { fetchUserProfile } from "../../controllers/getControllers/fetchUserProfile.js";
import { authenticateUser } from "../../authenticate.js";
import { fetchProblems } from "../../controllers/getControllers/fetchProblems.js";

const getRouter = express.Router();

getRouter.get("/profile/:id", authenticateUser, fetchUserProfile);

getRouter.get("/all/problems", authenticateUser, fetchProblems);

export { getRouter };
