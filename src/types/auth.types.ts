export interface LoginRequestBody {
  login: string;
  password: string;
}

export interface LoginSuccessResponse {
  message: string;
  user: { login: string; password: string };
}

export interface LoginErrorResponse {
  message: string;
}
