export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface UserResponse {
  id: string;
  email: string;
  createdAt: Date;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: UserResponse;
  token: string;
}