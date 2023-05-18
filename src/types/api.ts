export interface ApiError<T = string> {
  code: ErrorCodes;
  message: T;
}

export enum ErrorCodes {
  TOKEN_INVALID = "TOKEN_INVALID",
  TOKEN_REQUIRED = "TOKEN_REQUIRED",
  FIELD_REQUIRED = "FIELD_REQUIRED",
  FIELD_INVALID = "FIELD_INVALID",
  COMPLEX_ERROR = "COMPLEX_ERROR",
}

export interface DbResults {
  fieldCount: number;
  affectedRows: number;
  changedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
}
