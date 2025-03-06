import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verifiedUser: {
      type: Boolean,
      default: false,
    },
    accountType: {
      type: String,
      enum: ["ALUMNI", "STUDENT"],
      required: true,
    },
    description: {
      type: String,
    },
    collegeName: {
      type: String,
    },
    skills: [
      {
        type: String,
      }
    ],
    connectedUser: [
      {
        type: mongoose.Types.ObjectId,
      }
    ],
    image: {
      type: String,
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateVerificationToken = async function() {
  try {
      return jwt.sign(
          {
              email: this.email,
              id: this._id.toString()
          },
          process.env.SECRET_KEY,
          {
              expiresIn: "10m"
          }
      )
  } catch (error) {
      console.log(error);
  }
}

export const User = model("User", userSchema);
