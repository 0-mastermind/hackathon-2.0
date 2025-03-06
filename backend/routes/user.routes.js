import { Router } from "express";
import { login, signUp } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(login);

export default userRouter;