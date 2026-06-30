import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors?: Record<string, string[]>;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
    return;
  }

  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
    return;
  }

  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
}
