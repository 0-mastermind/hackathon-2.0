import mongoose, { Schema, model } from "mongoose";

const discussionSchema = new Schema({
  title: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  imageUrl: {
    type: String,
  },
  likes: {
    type: Number,
  },
  replies: [
    {
      content: {
        type: Sting,
      },
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      }
    }
  ]
}, {timestamps: true});

export const Discussion = model("Discussion", discussionSchema);