import pkg from 'jsonwebtoken';
import { config } from '../envconfig';
import type { UserDtoData } from '../dtos/user-dto';
import AppError from '../utils/AppError';

const { sign, verify } = pkg;

class TokenService {
  generateTokens = (payload: UserDtoData) => {
    const accessToken = sign({ ...payload }, config.JWT_ACCESS_SECRET, { expiresIn: '1m' });
    const refreshToken = sign({ ...payload }, config.JWT_REFRESH_SECRET, { expiresIn: '2m' });

    return { accessToken, refreshToken };
  };

  generateAccessToken = (payload: UserDtoData) => {
    const accessToken = sign({ ...payload }, config.JWT_ACCESS_SECRET, {
      expiresIn: '1m',
    });
    return accessToken;
  };

  getDecodedPayload = (refreshToken: string) => {
    return verify(refreshToken, config.JWT_REFRESH_SECRET) as UserDtoData;
  };

  validateRefreshToken = (refreshToken: string) => {
    if (!refreshToken) {
      throw new AppError('Refresh token was not found', 401);
    }

    return verify(refreshToken, config.JWT_REFRESH_SECRET) as UserDtoData;
  };

  validateAccessToken = (accessToken: string) => {
    if (!accessToken) {
      throw new AppError('Access token was not found', 401);
    }

    return verify(accessToken, config.JWT_ACCESS_SECRET) as UserDtoData;
  };
}

export const tokenService = new TokenService();
