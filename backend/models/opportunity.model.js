import mongoose, { Schema, model } from "mongoose";

const opportunitySchema = new Schema({
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
  link: {
    type: String,
  },
  
  titleType: {
    type: String,
    enum: ["INTERNSHIP", "JOB"] 
  },
  requiredSkills: [
    {
      type: String,
      required: true,
    }
  ],
  companyName: {
    type: String,
    required: true,
  },
  qualificationsRequired: {
    type: String,
  },
  appliedUsers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  ]
}, {timestamps: true});

export const Opportunity = model("Opportunity", opportunitySchema);