import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/customError";

import { JWT_SECRET } from "../config/env";
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const session = await mongoose.startSession();
  // atomic transaction
  session.startTransaction();
  try {
    const { name, email, password } = req.body;
    const existingUser = await mongoose.model("User").findOne({ email });
    if (existingUser) {
      throw new CustomError("User already exists with this email", 409);
    }
    const salt = await bcrypt.genSalt(10);
    const saltedPassword = await bcrypt.hash(password, salt);
    const user = await User.create(
      [{ name, email, password: saltedPassword }],
      { session }
    );
    const token = jwt.sign({ userId: user[0]._id }, JWT_SECRET as string, {
      expiresIn: "1d",
    });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: user[0],
        token,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { email, password } = req.body;
    const user = await mongoose.model("User").findOne({ email });
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Invalid email or password", 401);
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET as string, {
      expiresIn: "1d",
    });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};
