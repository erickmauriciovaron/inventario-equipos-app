import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { SessionUser, User, UserRole } from "../../types/user";
import {
  clearSession,
  createStoredUser,
  deleteStoredUser,
  getAllUsers,
  getCurrentSession,
  loginWithStoredUser,
  updateStoredUserRole,
} from "../utils/authStorage";

interface LoginPayload {
  username: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  password: string;
  fullName: string;
  role: UserRole;
}

interface AuthActionResult {
  success: boolean;
  message?: string;
}

interface AuthContextProps {
  user: SessionUser | null;
  users: User[];
  isAuthenticated: boolean;
  isAuthReady: boolean;
  login: (payload: LoginPayload) => AuthActionResult;
  logout: () => void;
  registerUser: (payload: RegisterPayload) => AuthActionResult;
  refreshUsers: () => void;
  changeUserRole: (userId: string, role: UserRole) => AuthActionResult;
  removeUser: (userId: string) => AuthActionResult;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const refreshUsers = () => {
    setUsers(getAllUsers());
  };

  useEffect(() => {
    const session = getCurrentSession();

    if (session) {
      setUser(session);
    }

    refreshUsers();
    setIsAuthReady(true);
  }, []);

  const login = (payload: LoginPayload): AuthActionResult => {
    const result = loginWithStoredUser(payload.username, payload.password);

    if (!result.success || !result.user) {
      return {
        success: false,
        message: result.message ?? "No fue posible iniciar sesión.",
      };
    }

    setUser(result.user);
    refreshUsers();

    return {
      success: true,
    };
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  const registerUser = (payload: RegisterPayload): AuthActionResult => {
    if (
      !payload.username.trim() ||
      !payload.password.trim() ||
      !payload.fullName.trim()
    ) {
      return {
        success: false,
        message: "Todos los campos son obligatorios.",
      };
    }

    const result = createStoredUser({
      username: payload.username.trim(),
      password: payload.password.trim(),
      fullName: payload.fullName.trim(),
      role: payload.role,
    });

    if (!result.success) {
      return {
        success: false,
        message: result.message ?? "No fue posible crear el usuario.",
      };
    }

    refreshUsers();

    return {
      success: true,
    };
  };

  const changeUserRole = (userId: string, role: UserRole): AuthActionResult => {
    const result = updateStoredUserRole(userId, role);

    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }

    const currentSession = getCurrentSession();
    setUser(currentSession);
    refreshUsers();

    return {
      success: true,
    };
  };

  const removeUser = (userId: string): AuthActionResult => {
    const result = deleteStoredUser(userId);

    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }

    const currentSession = getCurrentSession();
    setUser(currentSession);
    refreshUsers();

    return {
      success: true,
    };
  };

  const value: AuthContextProps = useMemo(
    () => ({
      user,
      users,
      isAuthenticated: !!user,
      isAuthReady,
      login,
      logout,
      registerUser,
      refreshUsers,
      changeUserRole,
      removeUser,
    }),
    [user, users, isAuthReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };