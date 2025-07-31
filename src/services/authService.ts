import AppError from '../utils/AppError';

interface AuthenticateSuccessResult {
  message: string;
}

class AuthService {
  authenticate = (login: string, password: string): AuthenticateSuccessResult => {
    if (!login || !password) {
      throw new AppError('Login and password are required.', 400);
    }

    const userLogin = 'admin';
    const userPassword = '1234';

    if (login === userLogin && password === userPassword) {
      return { message: 'Login successful.' };
    } else {
      throw new AppError('Wrong login or password!', 400);
    }
  };
}

export const authService = new AuthService();
