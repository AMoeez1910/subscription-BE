import { aj } from "../config/arcjet";
import { Request, Response, NextFunction } from "express";

const arcjetMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({
          success: false,
          message: "Rate limit exceeded",
        });
      }

      if (decision.reason.isBot()) {
        res.status(403).json({
          success: false,
          message: "Access denied for bots",
        });
      }
      res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    next(error);
  }
};
export default arcjetMiddleware;
