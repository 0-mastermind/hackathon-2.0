import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";


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


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            accountType,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=${getRandomColor()}`
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user,
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

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

        user.token = token;
        await user.save(); 

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                accountType: user.accountType,
                token: user.token,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login failed, please try again",
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { description, collegeName, skill } = req.body;
        const id = req.user.id;

        if (!description || !collegeName || !skill) {
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
        userDetails.skill = skill;
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
