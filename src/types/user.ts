export interface UserState {
  accessToken: string | null;
  isLoggingIn: boolean;
}

export interface LoginResponse {
  accessToken: string;
}
