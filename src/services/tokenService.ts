import pkg from 'jsonwebtoken';
import { config } from '../envconfig';
import type { UserDtoData } from '../dtos/user-dto';

const { sign } = pkg;

class TokenService {
  generateTokens = (payload: UserDtoData) => {
    const accessToken = sign({ ...payload }, config.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = sign({ ...payload }, config.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  };
}

export const tokenService = new TokenService();
