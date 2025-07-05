import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/env";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

interface CustomRequestI extends Request {
  user?: typeof User.prototype;
}

const authorize = async (
  req: CustomRequestI,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET as string);
    const user = await User.findById((decoded as jwt.JwtPayload).userId);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
    next(error);
  }
};

export default authorize;
