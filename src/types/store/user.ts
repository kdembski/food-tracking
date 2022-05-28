export interface UserState {
  accessToken: string | null;
  isLoggingIn: boolean;
  loginError: string | null;
}

export interface LoginResponse {
  accessToken: string;
}
