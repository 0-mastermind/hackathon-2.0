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
  image: {
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  likes: [
    {
      count: {
        type: Number,
      },
      userId: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  replies: [
    {
      content: {
        type: String,
      },
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      }
    }
  ]
}, {timestamps: true});

export const Discussion = model("Discussion", discussionSchema);