export interface ApiError<T = string> {
  code: string;
  message: T;
}

export enum ErrorCodes {
  TOKEN_INVALID = "TOKEN_INVALID",
  TOKEN_REQUIRED = "TOKEN_REQUIRED",
  FIELD_REQUIRED = "FIELD_REQUIRED",
  FIELD_INVALID = "FIELD_INVALID",
  COMPLEX_ERROR = "COMPLEX_ERROR",
}
