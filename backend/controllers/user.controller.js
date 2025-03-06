import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";
import { sendVerificationMail } from "../utils/sendEmail.js";


const getRandomColor = () => {
    const colors = ["red", "blue", "green", "purple", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
};

export const signUp = async (req, res) => {
    try {
        const { name, email, password, accountType, otp } = req.body;

        if (!name || !email || !password || !accountType) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }

        const createdUser = await User.create({
            name,
            email,
            password,
            accountType,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=${getRandomColor()}`
        });
        
        const verificationToken = await createdUser.generateVerificationToken();

        const userId = createdUser._id.toString();

        sendVerificationMail(name, email, verificationToken, userId);
        
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            userData: {
                userID: createdUser._id.toString(),
                success: true,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User registration failed, please try again!",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({
                message: "User don't exists",
                success: false,
            });
        }

        if (!user.verifiedUser) {
            const userId = user._id.toString();
            const name = user.name.toString();

            const verificationToken = await user.generateVerificationToken();

            sendVerificationMail(name, user.email, verificationToken, userId);
            return res.status(400).send({
                message:
                    "Email is not verified! We have sent you verification email please re-login after verification",
                success: false,
            });
        }

        const isPasswordCorrect = await user.checkPassword(password);

        if (!isPasswordCorrect) {
            return res.status(400).send({
                message: "Incorrect password!!",
                success: false,
            });
        }

        return res.status(200).send({
            message: "User Logged in successfully!!",
            userData: {
                userID: user._id.toString(),
                success: true,
            },
        });
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            message: "Error while login! Try to login with google",
            error,
            success: false,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { description, collegeName, skills } = req.body;
        const id = req.params.userId;

        if (!description || !collegeName || !skills) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        userDetails.description = description;
        userDetails.collegeName = collegeName;
        userDetails.skills = skills;
        await userDetails.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profileDetails: userDetails,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Profile update failed",
            error: error.message,
        });
    }
};

export const verifyUserDetails = async (req, res) => {
    try {
        const { id, token } = req.query;

        if (!id || !token) {
            return res.redirect(
                `${process.env.FRONTEND_BASE_URL}/verificationFailed`
            );
        }

        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);

        if (!verifiedToken) {
            return res.redirect(
                `${process.env.FRONTEND_BASE_URL}/verificationFailed`
            );
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    verifiedUser: true,
                },
            },
            {
                runValidators: true,
            }
        );

        if (!updatedUser) {
            return res.redirect(
                `${process.env.FRONTEND_BASE_URL}/verificationFailed`
            );
        }

        return res.redirect(`${process.env.FRONTEND_BASE_URL}/verified`);
    } catch (error) {
        if (error.message === "jwt expired") {
            return res.redirect(
                `${process.env.FRONTEND_BASE_URL}/tokenExpired`
            );
        }

        console.log(error);

        return res.status(500).send({
            message: "Error! while verifying user",
        });
    }
};