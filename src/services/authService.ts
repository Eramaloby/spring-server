import { NextFunction } from 'express';
import AppError from '../utils/AppError';

export const authenticate = (
  login: string | undefined,
  password: string | undefined,
  next: NextFunction
) => {
  if (!login || !password) {
    return next(new AppError('Login and password are required.', 400));
  }

  const userLogin = 'admin';
  const userPassword = '1234';

  if (login === userLogin && password === userPassword) {
    return { message: 'Login successful.', user: { login, password } };
  } else {
    return next(new AppError('Wrong login or password!', 400));
  }
};
