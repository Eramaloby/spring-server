import { Request, Response } from 'express';
import { LoginSuccessResponse, LoginRequestBody, LoginErrorResponse } from '../types/auth.types';
import { authService } from '../services/authService';

class AuthController {
  authUser = (
    req: Request<object, object, LoginRequestBody>,
    res: Response<LoginSuccessResponse | LoginErrorResponse>
  ) => {
    const { login, password } = req.body;

    const result = authService.authenticate(login, password);

    return res.status(200).json(result);
  };
}

export const authController = new AuthController();
