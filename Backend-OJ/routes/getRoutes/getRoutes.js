import express from "express";
import { fetchUserProfile } from "../../controllers/getControllers/fetchUserProfile.js";
import { authenticateUser } from "../../authenticate.js";

const getRouter = express.Router();

getRouter.get("/profile/:id", authenticateUser, fetchUserProfile);

export { getRouter };
