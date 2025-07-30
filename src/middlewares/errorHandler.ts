import { Request, Response } from 'express';
import { CustomError } from '../types/error.types';

const sendError = (err: CustomError, res: Response) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const errorHandler = (err: CustomError, req: Request, res: Response) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  sendError(err, res);
};

export default errorHandler;
