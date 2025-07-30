export interface LogRequestBody {
  level: string;
  message: string;
  details?: unknown;
}
