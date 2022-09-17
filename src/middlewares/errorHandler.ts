import { NextFunction, Response } from "express";
import { IRequest } from "../routes/core/base.type";
import { ErrorResponse } from "../routes/core/error";

export const errorHandler = (
  err: any,
  _req: IRequest,
  res: Response,
  _next: NextFunction
) => {
  let error = { ...err };

  console.log(err.message);
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val: any) => val.message)
      .toString();
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || err.message || "Server Error",
  });
};
