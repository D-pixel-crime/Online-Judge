import { Router as router } from "express";
import colors from "colors";
import { registerNewUser } from "../../controllers/postControllers/registerNewUser";

router.post("/register", registerNewUser);
