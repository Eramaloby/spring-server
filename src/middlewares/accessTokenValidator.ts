import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import { tokenService } from '../services/tokenService';

const accessTokenValidator = (req: Request, _res: Response, next: NextFunction) => {
  const accessToken = (req.cookies as { accessToken?: string }).accessToken;

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
