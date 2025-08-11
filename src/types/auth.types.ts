export interface LoginRequestBody {
  login: string;
  password: string;
}

export interface LoginSuccessResponse {
  accessToken: string;
  message: string;
}

export interface LoginErrorResponse {
  message: string;
}
