import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";
import { sendVerificationMail } from "../utils/sendEmail.js";


const getRandomColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};


export const signUp = async (req, res) => {
    try {
        const { name, email, password, accountType } = req.body;

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
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&chars=1&backgroundColor=${getRandomColor()}`
        });
        
        const verificationToken = await createdUser.generateVerificationToken();

        const userId = createdUser._id.toString();

        sendVerificationMail(name, email, verificationToken, userId);
        
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            userData: {
                userId: createdUser._id,
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
            );verificationFailed
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


export const connectWithUser = async (req, res) => {
    try {
        const { userId } = req.params; 
        const { targetUserId } = req.query; 

        if (userId === targetUserId) {
            return res.status(400).json({
                success: false,
                message: "You cannot connect with yourself",
            });
        }

        
        const sender = await User.findById(userId);
        const receiver = await User.findById(targetUserId);

        if (!sender || !receiver) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        
        const isConnected = sender.connectedUser.includes(targetUserId);

        if (isConnected) {
            sender.connectedUser = sender.connectedUser.filter(id => id.toString() !== targetUserId);
            await sender.save();
            await receiver.save();

            return res.status(200).json({
                success: true,
                message: "Disconnected successfully",
                senderConnections: sender.connectedUser,
            });
        } else {
            
            sender.connectedUser.push(targetUserId);
            await sender.save();
            await receiver.save();

            return res.status(200).json({
                success: true,
                message: "Connected successfully",
                senderConnections: sender.connectedUser,
            });
        }

    } catch (error) {
        console.error("Error toggling connection:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to process connection request",
            error: error.message,
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};
