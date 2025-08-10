import AppError from '../utils/AppError';
import { User } from '../models/userModel';
import { hash } from 'bcrypt';

import { tokenService } from './tokenService';
import { UserDto } from '../dtos/user-dto';

interface AuthenticateSuccessResult {
  message: string;
}

interface UserSignUpArgs {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
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

  signUp = async (userData: UserSignUpArgs) => {
    const candidate = await User.findByUsername(userData.username);
    if (candidate) {
      throw new AppError(`This username ${userData.username} already in use`, 409);
    }

    const hashedPassword = await hash(userData.password, 3);

    const user = await User.create(
      userData.username,
      hashedPassword,
      userData.firstName,
      userData.lastName,
      userData.age
    );

    const userDto = new UserDto({ username: user.username, id: user.id });
    const tokens = tokenService.generateTokens(userDto);

    return {
      ...tokens,
      user: userDto,
    };
  };
}

export const userService = new UserService();
