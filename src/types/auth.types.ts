export interface LoginRequestBody {
  login: string;
  password: string;
}

export interface LoginSuccessResponse {
  user: { username: string };
  accessToken: string;
  message: string;
}

export interface LoginErrorResponse {
  message: string;
}
