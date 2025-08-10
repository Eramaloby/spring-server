import { Request, Response, NextFunction } from 'express';
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

class UserController {
  signUpUser = async (
    req: Request<object, object, SignUpRequestBody>,
    res: Response<SignUpSuccessResponse | SignUpErrorResponse>,
    next: NextFunction
  ) => {
    try {
      const userData = await userService.signUp(req.body);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };

  authUser = async (
    req: Request<object, object, LoginRequestBody>,
    res: Response<LoginSuccessResponse | LoginErrorResponse>,
    next: NextFunction
  ) => {
    try {
      const { login, password } = req.body;
      const userData = await userService.authenticate(login, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };

  refresh = async () => {};
}

export const userController = new UserController();
