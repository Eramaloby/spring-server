import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import { tokenService } from '../services/tokenService';

const accessTokenValidator = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  try {
    if (!accessToken) {
      throw new AppError('Access token not found', 401);
    }
    tokenService.validateAccessToken(accessToken);
  } catch {
    next(new AppError('Unauthorized', 401));
  }

  next();
};

export default accessTokenValidator;
