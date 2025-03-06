import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import { multerUpload } from "../middlewares/multer.middleware.js";

const postRouter = Router();

const fileUploads = multerUpload.fields([
  {
      name: "postImage",
      maxCount: 1,
  },
]);


postRouter.route("/:userId/create").post(fileUploads, createPost); 

export default postRouter;