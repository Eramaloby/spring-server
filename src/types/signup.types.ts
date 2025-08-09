export interface SignUpRequestBody {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
}

export interface SignUpSuccessResponse {
  message: string;
  user: { login: string; password: string };
}

export interface SignUpErrorResponse {
  message: string;
}
