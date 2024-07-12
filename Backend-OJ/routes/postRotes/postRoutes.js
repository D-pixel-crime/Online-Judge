import { Router as postRouter } from "express";
import { registerNewUser } from "../../controllers/postControllers/registerNewUser";
import { loginUser } from "../../controllers/postControllers/loginUser";

postRouter.post("/register", registerNewUser);

postRouter.post("/login", loginUser);
