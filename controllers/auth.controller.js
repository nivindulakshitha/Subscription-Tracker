import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRE, JWT_SECRET } from "../config/env.js";

import User from "../models/user.model.js";

export const signup = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;

        const isExistingUser = await User.findOne({ email })

        if (isExistingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const users = await User.create([{ name, email, password: hashedPassword }], { session });
        const token = jwt.sign({ userId: users[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            sucess: true,
            message: 'User created successfully',
            data: {
                token,
                user: users[0]
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

}

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        } 

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token,
                user
            }
        })

    } catch (error) {
        next(error);
    }
}

export const signout = async (req, res, next) => {

}