import AppError from '../utils/AppError';
import { User } from '../models/userModel';
import { hash, compare } from 'bcrypt';

import { tokenService } from './tokenService';
import { UserDto } from '../dtos/user-dto';

interface UserSignUpArgs {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
}

class UserService {
  authenticate = async (login: string, password: string) => {
    if (!login || !password) {
      throw new AppError('Login and password are required.', 400);
    }

    const user = await User.findByUsername(login);

    if (!user) {
      throw new AppError('No user with this username', 400);
    }

    const isEqual = await compare(password, user.password);

    if (!isEqual) {
      throw new AppError('Wrong password!', 400);
    }

    const userDto = new UserDto({ username: user.username, id: user.id });
    const tokens = tokenService.generateTokens(userDto);

    return {
      ...tokens,
      user: userDto,
    };
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

  refresh = async (refreshToken: string) => {
    const payload = tokenService.getDecodedPayload(refreshToken);

    const user = await User.findById(payload.id);
    if (!user) {
      throw new AppError('No user with such token', 400);
    }

    return tokenService.generateAccessToken({ username: user.username, id: user.id });
  };
}

export const userService = new UserService();
