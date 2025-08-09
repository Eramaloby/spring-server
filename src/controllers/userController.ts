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

class UserController {
  authUser = (
    req: Request<object, object, LoginRequestBody>,
    res: Response<LoginSuccessResponse | LoginErrorResponse>
  ) => {
    const { login, password } = req.body;

    const result = userService.authenticate(login, password);

    return res.status(200).json(result);
  };

  signUpUser = (
    req: Request<object, object, SignUpRequestBody>,
    res: Response<SignUpSuccessResponse | SignUpErrorResponse>
  ) => {};
}

export const userController = new UserController();
