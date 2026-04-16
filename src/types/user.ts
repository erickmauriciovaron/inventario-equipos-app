export type UserRole = "admin" | "user";

export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
}

export interface SessionUser {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
}