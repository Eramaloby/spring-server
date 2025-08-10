import { UserDtoData } from '../dtos/user-dto';

export interface SignUpRequestBody {
  username: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  age: number;
}

export interface SignUpSuccessResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDtoData;
}

export interface SignUpErrorResponse {
  message: string;
}
