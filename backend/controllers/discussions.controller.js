import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.config.js";
import { Discussion } from "../models/discussion.model.js";

const createDiscussion = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { discussionImage } = req.files;
    const userId = req.params.userId;
    
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    let uploadedImage = {};
    if (discussionImage) {
      uploadedImage = await uploadOnCloudinary(discussionImage[0]?.path, "discussions");
    }

    const createdDiscussion = await Discussion.create({
      title,
      description,
      image: uploadedImage.public_id
        ? {
            publicId: uploadedImage.public_id,
            url: uploadedImage.url,
          }
        : {},
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "Discussion created successfully!",
      discussion: createdDiscussion,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating discussion",
    });
  }
};


const updateLikes = async (req, res) => {
  try {
    const { userId } = req.params;
    const { discussionId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(discussionId)) {
      return res.status(400).json({ success: false, message: "Invalid user or discussion ID" });
    }

    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({ success: false, message: "Discussion not found" });
    }  
    
    const likedIndex = discussion.likes.findIndex((like) => like.userId.toString() === userId);

    if (likedIndex !== -1) {
      discussion.likes.splice(likedIndex, 1); // Remove like
      await discussion.save();
      return res.status(200).json({ success: true, message: "Like removed" });
    } else {
      discussion.likes.push({ userId }); // Add like
      await discussion.save();
      return res.status(200).json({ success: true, message: "Discussion liked" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error while updating likes" });
  }
};


// Add a reply to a post
const addReply = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const { userId, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(discussionId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid discussion ID or user ID" });
    }

    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({ success: false, message: "Discussion not found" });
    }

    discussion.replies.push({ content, userId });
    await discussion.save();

    return res.status(201).json({ success: true, message: "Reply added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error while adding reply" });
  }
};

// Delete a reply from a post
const deleteReply = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const { userId, replyId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(discussionId) || !mongoose.Types.ObjectId.isValid(replyId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid IDs" });
    }

    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({ success: false, message: "Discussion not found" });
    }

    const replyIndex = discussion.replies.findIndex((reply) => reply._id.toString() === replyId && reply.userId.toString() === userId);
    if (replyIndex === -1) {
      return res.status(404).json({ success: false, message: "Reply not found or unauthorized" });
    }

    discussion.replies.splice(replyIndex, 1);
    await discussion.save();

    return res.status(200).json({ success: true, message: "Reply deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error while deleting reply" });
  }
};

const deleteDiscussion = async (req, res) => {
  try {
    const { discussionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(discussionId)) {
      return res.status(400).json({ success: false, message: "Invalid discussion ID" });
    }

    const deletedDiscussion = await Discussion.findByIdAndDelete(discussionId);
    if (!deletedDiscussion) {
      return res.status(404).json({ success: false, message: "Discussion not found" });
    }

    return res.status(200).json({ success: true, message: "Discussion deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error while deleting discussion" });
  }
};


const getDiscussionById = async (req, res) => {
  try {
    const { discussionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(discussionId)) {
      return res.status(400).json({ success: false, message: "Invalid discussion ID" });
    }

    const discussion = await Discussion.findById(discussionId).populate("userId", "name");
    if (!discussion) {
      return res.status(404).json({ success: false, message: "Discussion not found" });
    }

    return res.status(200).json({ success: true, discussion });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error while fetching discussion" });
  }
};


const getAllDiscussions = async (req, res) => {
  try {
    // Fetch all posts
    const discussion = await Discussion.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, discussion });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching posts",
    });
  }
};

export {
  createDiscussion,
  updateLikes,
  addReply,
  deleteReply,
  deleteDiscussion,
  getAllDiscussions,
  getDiscussionById,
};
