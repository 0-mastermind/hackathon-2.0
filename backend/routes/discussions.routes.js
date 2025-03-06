import { Router } from "express";
import {
  createDiscussion,
  updateLikes,
  addReply,
  deleteReply,
  deleteDiscussion,
  getAllDiscussions,
  getDiscussionById
} from "../controllers/discussions.controller.js";
import { multerUpload } from "../middlewares/multer.middleware.js";

const discussionsRouter = Router();

const fileUploads = multerUpload.fields([
  {
    name: "discussionImage",
    maxCount: 1,
  },
]);

// Create a new discussion
discussionsRouter.route("/:userId/create").post(fileUploads, createDiscussion);

// Like or unlike a discussion
discussionsRouter.route("/:userId/like").put(updateLikes);

// Add a reply to a discussion
discussionsRouter.route("/:discussionId/reply").post(addReply);

// Delete a reply from a discussion
discussionsRouter.route("/:discussionId/reply").delete(deleteReply);

// Delete a discussion
discussionsRouter.route("/:discussionId").delete(deleteDiscussion);

// Get a single discussion by ID
discussionsRouter.route("/:discussionId").get(getDiscussionById);

export default discussionsRouter;
