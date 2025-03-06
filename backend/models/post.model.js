import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
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

export const Post = model("Post", postSchema);