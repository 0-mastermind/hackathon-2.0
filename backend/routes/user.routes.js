import { Router } from "express";
import { login, signUp, updateProfile, verifyUserDetails } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(login);

userRouter.route("/verify").get(verifyUserDetails);
userRouter.route("/:userId/update").post(updateProfile);

export default userRouter;