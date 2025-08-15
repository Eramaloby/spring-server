import { Request, Response } from 'express';
import type {
  LoginSuccessResponse,
  LoginRequestBody,
  LoginErrorResponse,
} from '../types/auth.types';
import type {
  SignUpRequestBody,
  SignUpSuccessResponse,
  SignUpErrorResponse,
} from '../types/signup.types';
import { userService } from '../services/userService';
import AppError from '../utils/AppError';
import { RefreshErrorResponse, RefreshSuccessResponse } from '../types/refresh.types';
import { tokenService } from '../services/tokenService';

class UserController {
  signUpUser = async (
    req: Request<object, object, SignUpRequestBody>,
    res: Response<SignUpSuccessResponse | SignUpErrorResponse>
  ) => {
    const userData = await userService.signUp(req.body);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie('accessToken', userData.accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true });

    return res
      .status(200)
      .json({ accessToken: userData.accessToken, message: 'Sign up successful.' });
  };

  authUser = async (
    req: Request<object, object, LoginRequestBody>,
    res: Response<LoginSuccessResponse | LoginErrorResponse>
  ) => {
    const { login, password } = req.body;
    const userData = await userService.authenticate(login, password);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie('accessToken', userData.accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true });

    return res.status(200).json({
      user: { username: userData.user.username },
      accessToken: userData.accessToken,
      message: 'Login successful.',
    });
  };

  refresh = async (req: Request, res: Response<RefreshSuccessResponse | RefreshErrorResponse>) => {
    const refreshToken = (req.cookies as { refreshToken?: string }).refreshToken;

    if (!refreshToken) {
      throw new AppError('No refresh token provided', 401);
    }

    try {
      tokenService.validateRefreshToken(refreshToken);
    } catch {
      throw new AppError('Invalid refresh token', 401);
    }

    const accessToken = await userService.refresh(refreshToken);
    res.cookie('accessToken', accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true });

    return res.status(200).json({ accessToken, message: 'Access token refreshed successfully.' });
  };
}

export const userController = new UserController();
