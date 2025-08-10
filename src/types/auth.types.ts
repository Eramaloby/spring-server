import { UserDtoData } from '../dtos/user-dto';
export interface LoginRequestBody {
  login: string;
  password: string;
}

export interface LoginSuccessResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDtoData;
}

export interface LoginErrorResponse {
  message: string;
}
