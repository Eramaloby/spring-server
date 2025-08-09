import AppError from '../utils/AppError';
import { type UserData, User } from '../models/userModel';
import { hash } from 'bcrypt';

interface AuthenticateSuccessResult {
  message: string;
}

interface SignUpSuccessResult {
  message: string;
}

class UserService {
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

  signUp = async (userData: UserData) => {
    const candidate = await User.findByUsername(userData.username);
    if (candidate) {
      throw new AppError(`This username ${userData.username} already in use`, 409);
    }

    const hashedPassword = await hash(userData.password, 3);

    const userDataWithHashedPassword = { ...userData, password: hashedPassword };
    const user = await User.create(userDataWithHashedPassword);
  };
}

export const userService = new UserService();
