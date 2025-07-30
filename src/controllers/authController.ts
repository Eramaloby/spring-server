import { Request, Response } from 'express';
import { LoginSuccessResponse, LoginRequestBody, LoginErrorResponse } from '../types/loginTypes';

export const authUser = (
  req: Request<object, object, LoginRequestBody>,
  res: Response<LoginSuccessResponse | LoginErrorResponse>
) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: 'Login and password are required.' });
  }

  const userLogin = 'admin';
  const userPassword = '1234';

  if (login === userLogin && password === userPassword) {
    return res.status(200).json({ message: 'Login successful.', user: { login, password } });
  } else {
    return res.status(400).json({ message: 'Wrong login or password!' });
  }
};
