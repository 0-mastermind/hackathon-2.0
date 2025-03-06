import { Router } from "express";
import {
  updateLikes,
  createPost,
  addReply,
  deleteReply,
  deletePost,
  getFollowedUserPosts,
} from "../controllers/post.controller.js";
import { multerUpload } from "../middlewares/multer.middleware.js";

const postRouter = Router();

const fileUploads = multerUpload.fields([
  {
    name: "postImage",
    maxCount: 1,
  },
]);

postRouter.route("/:userId/create").post(fileUploads, createPost);
postRouter.route("/:userId/addLike").post(updateLikes);
postRouter.route("/:postId/deletePost").post(deletePost);

postRouter.route("/getFollowedUserPosts").get(getFollowedUserPosts);

postRouter.route("/:postId/addReply").post(addReply);
postRouter.route("/:postId/deleteReply").delete(deleteReply);

export default postRouter;
