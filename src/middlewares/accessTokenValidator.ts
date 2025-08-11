import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import { tokenService } from '../services/tokenService';

const accessTokenValidator = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return next(new AppError('Access token not found.', 401));
  }
  try {
    tokenService.validateAccessToken(accessToken);
  } catch (error) {
    next(error);
  }

  next();
};

export default accessTokenValidator;
