export interface User {
  username: string;
  fullName: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginFormData) => { success: boolean; message?: string };
  logout: () => void;
}
