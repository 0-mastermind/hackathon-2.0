import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.config.js";

const createPost = async (req, res) => {
  try {
    const { title } = req.body;
    const { postImage } = req.files;
    const userId = req.params.userId;

    if (!title && !postImage) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uploadedImage = await uploadOnCloudinary(postImage[0]?.path, "posts");

    const createdPost = await Post.create({
      title,
      image: {
        publicId: uploadedImage.public_id,
        url: uploadedImage.url,
      },
      userId,
    });

    return res.status(200).json({
      success: true,
      message: "Post Created Successfully!",
      createdPost,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error! While creating post",
    });
  }
};

const updateLikes = async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId } = req.query;

    // Validate user and post IDs
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(postId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user or post ID" });
    }

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Check if the user has already liked the post
    const existingLikeIndex = post.likes.findIndex(
      (like) => like.userId.toString() === userId
    );

    if (existingLikeIndex !== -1) {
      // User has already liked the post, so remove the like
      post.likes.splice(existingLikeIndex, 1);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Like removed",
      });
    } else {
      // User has not liked the post, so add a new like
      post.likes.push({
        userId,
        count: 1,
      });
      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post liked",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while updating likes" });
  }
};

// Add a reply to a post
const addReply = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;

    // Validate postId and userId
    if (
      !mongoose.Types.ObjectId.isValid(postId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID or user ID",
      });
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Add the reply to the post
    post.replies.push({
      content,
      userId,
    });

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Reply added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while adding reply",
    });
  }
};

// Delete a reply from a post
const deleteReply = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, replyId } = req.query;

    console.log(replyId, postId, userId);

    // Validate postId, replyId, and userId
    if (
      !mongoose.Types.ObjectId.isValid(postId) ||
      !mongoose.Types.ObjectId.isValid(replyId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID, reply ID, or user ID",
      });
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Find the reply in the post
    const replyIndex = post.replies.findIndex(
      (reply) =>
        reply._id.toString() === replyId && reply.userId.toString() === userId
    );

    if (replyIndex === -1) {
      return res.status(404).json({
        success: false,
        message:
          "Reply not found or you are not authorized to delete this reply",
      });
    }

    // Remove the reply
    post.replies.splice(replyIndex, 1);
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Reply deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting reply",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Validate postId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    // Find and delete the post
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting post",
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    // Validate postId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    // Find post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({ success: true, post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching post",
    });
  }
};

const getFollowedUserPosts = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from request params

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    // Find the user and get their connected users (followed users)
    const user = await User.findById(userId).select("connectedUser");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Fetch posts only from the users that the current user follows
    const posts = await Post.find({ userId: { $in: user.connectedUser } })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching posts",
    });
  }
};

export {
  createPost,
  updateLikes,
  deleteReply,
  addReply,
  deletePost,
  getPostById,
  getFollowedUserPosts,
};
