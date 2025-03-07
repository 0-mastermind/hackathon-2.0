import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
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
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Post = model("Post", postSchema);
