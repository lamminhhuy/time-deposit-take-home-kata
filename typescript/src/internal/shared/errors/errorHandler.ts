
import { Request, Response, NextFunction } from "express";
import { ErrorsResponse } from "./error";

export const errorHandler = (
  err: ErrorsResponse,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;

  const errorResponse = {
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  };
  console.error("Error detail:", err);
  res.status(statusCode).json(errorResponse);
};
