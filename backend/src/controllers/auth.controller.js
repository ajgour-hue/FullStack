import mongoose from 'mongoose';
import userModel from "../models/user.model.js"

// register user controller function
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await userModel.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User with this email or username already exists",
                success: false
            });
        }

        // create user
        const user = await userModel.create({
            username,
            email,
            password
        });

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
         console.log(error); 
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
   
};