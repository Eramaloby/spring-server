import { Request, Response, NextFunction } from 'express';
import { LoginSuccessResponse, LoginRequestBody, LoginErrorResponse } from '../types/login.types';
import { authenticate } from '../services/authService';

export const authUser = (
  req: Request<object, object, LoginRequestBody>,
  res: Response<LoginSuccessResponse | LoginErrorResponse>,
  next: NextFunction
) => {
  const { login, password } = req.body;

  const result = authenticate(login, password, next);

  if (result) {
    return res.status(200).json(result);
  }
};
