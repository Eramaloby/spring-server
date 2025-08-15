export interface RefreshRequestBody {
  login: string;
  password: string;
}

export interface RefreshSuccessResponse {
  accessToken: string;
  message: string;
}

export interface RefreshErrorResponse {
  message: string;
}
