import mongoose, { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
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
    category:
    {
      type : String,
      enum : ["HACKATHON" , "DEBATE" , "WEBINAR" , "MEETUPS" , "WORKSHOPS"]
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
    link: {
      type: String,
    },
    eventData: {
      type: String,
    },
    appliedUsers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Event = model("Event", eventSchema);
