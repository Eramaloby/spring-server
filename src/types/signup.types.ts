export interface SignUpRequestBody {
  username: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  age: number;
}

export interface SignUpSuccessResponse {
  user: { username: string };
  accessToken: string;
  message: string;
}

export interface SignUpErrorResponse {
  message: string;
}
