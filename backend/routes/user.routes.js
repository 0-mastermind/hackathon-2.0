import { Router } from "express";
import { connectWithUser, getAllUsers, login, signUp, updateProfile, verifyUserDetails } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/register").post(signUp);
userRouter.route("/login").post(login);

userRouter.route("/verify").get(verifyUserDetails);
userRouter.route("/:userId/update").post(updateProfile);
userRouter.route("/:userId/connect").post(connectWithUser);
userRouter.route("/:userId/getAll").get(getAllUsers);

export default userRouter;