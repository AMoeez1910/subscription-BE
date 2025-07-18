import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    let error: CustomError = { ...err };
    error.message = err.message;

    console.error(err);
    if (err.name === "CastError") {
      const message = `Resource not found.`;
      error = new Error(message) as CustomError;
      error.statusCode = 404;
    }

    if (err.code === 11000) {
      const message = `Duplicate field value entered.`;
      error = new Error(message) as CustomError;
      error.statusCode = 400;
    }

    if (err.name === "ValidationError" && err.errors) {
      const message = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
      error = new Error(message) as CustomError;
      error.statusCode = 400;
    }
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
