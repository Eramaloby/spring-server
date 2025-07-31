import { Request, Response, NextFunction } from 'express';
import { LoginSuccessResponse, LoginRequestBody, LoginErrorResponse } from '../types/auth.types';
import { authService } from '../services/authService';
import AppError from '../utils/AppError';

export const authUser = (
  req: Request<object, object, LoginRequestBody>,
  res: Response<LoginSuccessResponse | LoginErrorResponse>,
  next: NextFunction
) => {
  const { login, password } = req.body;

  let result;
  try {
    result = authService.authenticate(login, password);
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError('An unexpected error occurred.', 500));
    }
  }

  if (result) {
    return res.status(200).json(result);
  }
};
